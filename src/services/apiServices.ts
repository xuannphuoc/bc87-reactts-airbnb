import axios, { AxiosError, type AxiosAdapter } from "axios";
import seed from "./demo-data.json";

type RecordData = { id: number; [field: string]: unknown };
type Collection = keyof typeof seed;
type Database = Record<Collection, RecordData[]>;
type StoredDatabase = { records: Database; lastIds: Partial<Record<Collection, number>> };

const storageKey = "airbnb-demo-db-v1";
const publicPath = import.meta.env.BASE_URL;

function readDatabase(): StoredDatabase {
  const stored = localStorage.getItem(storageKey);
  if (stored) return JSON.parse(stored);

  const database: Database = structuredClone(seed);
  for (const records of Object.values(database)) {
    for (const record of records) {
      for (const field of ["hinhAnh", "avatar"]) {
        const value = record[field];
        if (typeof value === "string" && value.startsWith("images/")) {
          record[field] = publicPath + value;
        }
      }
    }
  }
  return { records: database, lastIds: {} };
}

function publicUser({ password, ...user }: RecordData) {
  void password;
  return user;
}

const adapter: AxiosAdapter = async (config) => {
  const url = new URL((config.url ?? "").replace(/^\//, ""), "https://demo.invalid/");
  const [resource, action, parameter] = url.pathname.slice(1).split("/");
  const method = config.method?.toUpperCase();
  const body = typeof config.data === "string" ? JSON.parse(config.data) : config.data;
  const response = (content: unknown, status = 200, message = "") => ({
    data: { content, message }, status, statusText: message, headers: {}, config,
  });
  const fail = (message: string, status = 400): never => {
    throw new AxiosError(message, "ERR_BAD_REQUEST", config, undefined, response(message, status, message));
  };

  let upload: string | undefined;
  if (body instanceof FormData) {
    const file = body.get("formFile");
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return fail("Vui lòng chọn tệp hình ảnh.");
    }
    upload = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  const database = readDatabase();
  const db = database.records;
  const save = (content: unknown) => {
    localStorage.setItem(storageKey, JSON.stringify(database));
    return response(content);
  };
  const find = (collection: Collection, id: number): RecordData => {
    const record = db[collection].find((item) => item.id === id);
    return record ?? fail("Không tìm thấy dữ liệu.", 404);
  };
  const create = (collection: Collection, fields: Record<string, unknown>) => {
    // Keep identifiers monotonic even when the newest record was deleted.
    const counters = database.lastIds;
    const id = Math.max(counters[collection] ?? 0, ...db[collection].map((item) => item.id), 0) + 1;
    const record = { ...fields, id };
    counters[collection] = id;
    db[collection].push(record);
    return record;
  };
  const currentUserId = () => {
    const session = localStorage.getItem("userLogin") ?? sessionStorage.getItem("userLogin");
    const login = session ? JSON.parse(session) : null;
    const admin = JSON.parse(localStorage.getItem("ADMIN_INFO") ?? "null");
    return Number(action === "me" ? admin?.id : login?.user?.id ?? admin?.id);
  };

  if (resource === "auth" && method === "POST") {
    if (action === "signin") {
      const user = db.users.find((item) =>
        item.email === body.email?.trim().toLowerCase() && item.password === body.password
      );
      if (!user) return fail("Email hoặc mật khẩu không đúng.", 401);
      return response({ user: publicUser(user), token: `demo-${user.id}` });
    }
    if (action === "signup") {
      const email = body.email.trim().toLowerCase();
      if (db.users.some((item) => item.email === email)) return fail("Email đã được sử dụng.");
      return save(publicUser(create("users", { ...body, email, role: "USER", avatar: publicPath + "images/avatar.png" })));
    }
  }

  if (!Object.hasOwn(db, resource)) return fail("Đường dẫn dữ liệu không tồn tại.", 404);
  const collection = resource as Collection;
  const records = db[collection];
  const id = Number(action || url.searchParams.get("id"));
  const expose = collection === "users" ? publicUser : (record: RecordData) => record;

  if (method === "GET") {
    switch (action) {
      case undefined: return response(records.map(expose));
      case "me": return response(publicUser(find("users", currentUserId())));
      case "search": {
        const query = decodeURIComponent(parameter ?? "").toLowerCase();
        return response(records.filter((item) => String(item.name).toLowerCase().includes(query)).map(expose));
      }
      case "phan-trang-tim-kiem": {
        const pageIndex = Math.max(1, Number(url.searchParams.get("pageIndex")) || 1);
        const pageSize = Math.max(1, Number(url.searchParams.get("pageSize")) || 10);
        const start = (pageIndex - 1) * pageSize;
        return response({ pageIndex, pageSize, totalRow: records.length, data: records.slice(start, start + pageSize).map(expose) });
      }
      case "lay-phong-theo-vi-tri":
        return response(records.filter((item) => item.maViTri === Number(url.searchParams.get("maViTri"))));
      case "lay-theo-nguoi-dung":
        return response(records.filter((item) => item.maNguoiDung === Number(parameter)));
      case "lay-binh-luan-theo-phong":
        return response(records.filter((item) => item.maPhong === Number(parameter)).reverse().map((item) => {
          const author = db.users.find((user) => user.id === item.maNguoiBinhLuan);
          return { ...item, tenNguoiBinhLuan: author?.name ?? "Người dùng", avatar: author?.avatar };
        }));
      default: return response(expose(find(collection, id)));
    }
  }

  if (method === "POST" && upload) {
    if (collection === "users" && action === "upload-avatar") {
      const user = find("users", currentUserId());
      user.avatar = upload;
      return save(publicUser(user));
    }
    const roomImage = collection === "phong-thue" && action === "upload-hinh-phong";
    const locationImage = collection === "vi-tri" && action === "upload-hinh-vitri";
    if (!roomImage && !locationImage) return fail("Đường dẫn tải ảnh không hợp lệ.");
    const record = find(collection, Number(url.searchParams.get(roomImage ? "maPhong" : "maViTri")));
    record.hinhAnh = upload;
    return save(record);
  }

  if (method === "POST" || method === "PUT") {
    const original = method === "PUT" ? find(collection, id) : undefined;
    const fields = { ...original, ...body };
    if (collection === "users") {
      fields.email = fields.email?.trim().toLowerCase();
      if (db.users.some((user) => user.id !== id && user.email === fields.email)) return fail("Email đã được sử dụng.");
      if (original && !body.password) fields.password = original.password;
    }
    if (collection === "phong-thue") {
      find("vi-tri", fields.maViTri);
      if (!fields.hinhAnh) fields.hinhAnh = publicPath + "images/B1.jpg";
    }
    if (collection === "dat-phong") {
      const room = find("phong-thue", fields.maPhong);
      find("users", fields.maNguoiDung);
      if (!(Date.parse(fields.ngayDi) > Date.parse(fields.ngayDen))) return fail("Ngày trả phòng phải sau ngày nhận phòng.");
      if (!Number.isInteger(fields.soLuongKhach) || fields.soLuongKhach < 1 || fields.soLuongKhach > Number(room.khach)) {
        return fail("Số khách vượt sức chứa hoặc không hợp lệ.");
      }
      const overlaps = records.some((booking) =>
        booking.id !== id &&
        booking.maPhong === fields.maPhong &&
        Date.parse(String(booking.ngayDen)) < Date.parse(fields.ngayDi) &&
        Date.parse(String(booking.ngayDi)) > Date.parse(fields.ngayDen)
      );
      if (overlaps) return fail("Phòng đã có lịch đặt trong khoảng ngày này.", 409);
    }
    if (collection === "binh-luan") {
      find("phong-thue", fields.maPhong);
      find("users", fields.maNguoiBinhLuan);
      if (!fields.noiDung?.trim() || !Number.isInteger(fields.saoBinhLuan) || fields.saoBinhLuan < 1 || fields.saoBinhLuan > 5) {
        return fail("Vui lòng nhập nội dung và chọn từ 1 đến 5 sao.");
      }
    }
    if (!original) return save(expose(create(collection, fields)));
    Object.assign(original, fields, { id });
    return save(expose(original));
  }

  if (method === "DELETE") {
    const record = find(collection, id);
    if (collection === "vi-tri" && db["phong-thue"].some((room) => room.maViTri === id)) {
      return fail("Vị trí này vẫn còn phòng.");
    }
    if (collection === "phong-thue") {
      db["dat-phong"] = db["dat-phong"].filter((booking) => booking.maPhong !== id);
      db["binh-luan"] = db["binh-luan"].filter((comment) => comment.maPhong !== id);
    }
    if (collection === "users") {
      db["dat-phong"] = db["dat-phong"].filter((booking) => booking.maNguoiDung !== id);
      db["binh-luan"] = db["binh-luan"].filter((comment) => comment.maNguoiBinhLuan !== id);
    }
    records.splice(records.indexOf(record), 1);
    return save(null);
  }

  return fail("Thao tác không được hỗ trợ.", 405);
};

export default axios.create({ adapter });
