import { useDispatch, useSelector } from "react-redux";
import { type UserData } from "./../HomeTemplate/components/Navbar/index";
import { getRoomsDetail } from "./roomBooked";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store";
import { type DetailRoom } from "../HomeTemplate/components/Navbar/getRoom";
import { type PutUser } from "./putUser";
import { putUserReducer } from "./putUser";
type Props = {
  user?: UserData | null;
};

export default function Body({ user }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const storedUser =
    JSON.parse(localStorage.getItem("userLogin") || "null")?.user ||
    JSON.parse(sessionStorage.getItem("userLogin") || "null")?.user;

  const currentUser = user || storedUser || null;

  const [formUser, setFormUser] = useState<PutUser>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "USER",
  });

  const putUserState = useSelector((state: RootState) => state.putUserSlice);
  const { loading: updating, success, error: updateError } = putUserState;

  useEffect(() => {
    if (currentUser) {
      let formattedBirthday = "";
      if (currentUser.birthday) {
        const d = new Date(currentUser.birthday);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        formattedBirthday = `${year}-${month}-${day}`;
      }
      setFormUser({
        id: currentUser.id || 0,
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        birthday: formattedBirthday,
        gender: currentUser.gender ?? true,
        role: "USER",
      });
    }
  }, [currentUser]);
  console.log(formUser);
  const roomIds = useSelector(
    (state: RootState) =>
      state.getRoomByUserSlice.data?.map((r) => r.maPhong) || []
  );

  const roomsFromStore = useSelector(
    (state: RootState) => state.userRoomsSlice.rooms
  );
  const loading = useSelector(
    (state: RootState) => state.userRoomsSlice.loading
  );
  const error = useSelector((state: RootState) => state.userRoomsSlice.error);

  const [rooms, setRooms] = useState<DetailRoom[]>([]);

  useEffect(() => {
    if (roomIds.length > 0) {
      dispatch(getRoomsDetail(roomIds));
    }
  }, [roomIds, dispatch]);

  useEffect(() => {
    if (roomsFromStore.length > 0) {
      setRooms(roomsFromStore);
      localStorage.setItem("userRooms", JSON.stringify(roomsFromStore));
    }
  }, [roomsFromStore]);

  useEffect(() => {
    if (!roomsFromStore || roomsFromStore.length === 0) {
      const saved = localStorage.getItem("userRooms");
      if (saved) setRooms(JSON.parse(saved));
    }
  }, [roomsFromStore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit formUser:", formUser);
    dispatch(putUserReducer(formUser));
  };

  const renderAvatar = () => (
    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden">
      <img
        src={currentUser?.avatar || "./images/avatar.png"}
        alt="avatar"
        className="w-full h-full object-cover rounded-full"
      />
    </div>
  );

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* LEFT - Profile */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          <div className="border rounded-lg p-5 bg-white shadow-sm flex flex-col items-center">
            {renderAvatar()}
            <a
              href="#"
              className="hover:text-blue-500 underline mt-2 text-sm sm:text-base"
            >
              Cập nhật hình ảnh
            </a>

            <div className="mt-6 w-full">
              <h4 className="font-bold text-lg mb-1 text-center md:text-left">
                Xác minh danh tính
              </h4>
              <p className="text-sm text-gray-600 mb-3 text-center md:text-left">
                Xác thực danh tính của bạn với huy hiệu xác minh danh tính
              </p>
              <button className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium">
                Nhận huy hiệu
              </button>
            </div>

            <hr className="my-5 w-full" />

            <div className="w-full text-center md:text-left">
              <h5 className="font-semibold">
                {currentUser?.name || "..."} đã nhận
              </h5>
              <p className="text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
                <i className="fa-solid fa-check text-blue-500"></i> Địa chỉ
                email
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT - Info + Rooms */}
        <div className="md:w-3/4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Xin chào tôi là {currentUser?.name || "..."}
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Bắt đầu tham gia vào 2021
            </p>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="underline mt-2 inline-block hover:text-blue-400 sm:text-base cursor-pointer"
              type="button"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>

          {/* User Rooms */}
          <div className="m-2">
            <h2 className="text-xl font-semibold mb-4">Phòng bạn đã đặt</h2>

            {loading && <p>Đang tải phòng...</p>}
            {error && <p className="text-red-500">Lỗi: {error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {rooms.length > 0
                ? rooms.map((room: DetailRoom) => (
                    <div
                      key={room.id}
                      className="p-4 hover:shadow-md transition flex flex-col sm:flex-row gap-4"
                    >
                      <img
                        src={room.hinhAnh}
                        alt={room.tenPhong}
                        className="sm:w-48 h-40 object-cover rounded-md"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="font-semibold text-lg mb-2">
                          {room.tenPhong}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm mb-2">
                          <p>
                            <span className="font-semibold">Khách:</span>{" "}
                            {room.khach}
                          </p>
                          <p>
                            <span className="font-semibold">Phòng ngủ:</span>{" "}
                            {room.phongNgu}
                          </p>
                          <p>
                            <span className="font-semibold">Giường:</span>{" "}
                            {room.giuong}
                          </p>
                          <p>
                            <span className="font-semibold">Phòng tắm:</span>{" "}
                            {room.phongTam}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                            {room.mayGiat && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Máy giặt
                              </span>
                            )}
                            {room.banLa && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Bàn ủi
                              </span>
                            )}
                            {room.tivi && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Tivi
                              </span>
                            )}
                            {room.dieuHoa && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Điều hòa
                              </span>
                            )}
                            {room.wifi && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Wi-Fi
                              </span>
                            )}
                            {room.bep && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Bếp
                              </span>
                            )}
                            {room.doXe && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Đỗ xe
                              </span>
                            )}
                            {room.hoBoi && (
                              <span className="px-2 py-1 bg-gray-200 rounded">
                                Hồ bơi
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-base">
                            ${room.giaTien.toLocaleString()}/tháng
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                : !loading && <p>Chưa có phòng nào được đặt.</p>}
            </div>
          </div>
        </div>
      </div>

      {updating && (
        <p className="text-blue-500 mb-2">Đang cập nhật thông tin...</p>
      )}
      {success && (
        <p className="text-green-600 mb-2">Cập nhật thông tin thành công!</p>
      )}
      {updateError && (
        <p className="text-red-500 mb-2">
          Lỗi: {updateError.message || "Có lỗi xảy ra"}
        </p>
      )}
      {/* Modal */}
      <div
        id="popup-modal"
        tabIndex={-1}
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-2xl border shadow-sm p-4 md:p-6">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-6 text-lg font-semibold text-body">
                Chỉnh sửa thông tin cá nhân
              </h3>

              <form
                className="flex flex-col gap-4 text-left"
                onSubmit={handleSubmit}
              >
                <label className="flex flex-col text-sm">
                  Họ và tên
                  <input
                    type="text"
                    name="name"
                    value={formUser.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formUser.email}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  Số điện thoại
                  <input
                    type="text"
                    name="phone"
                    value={formUser.phone}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>

                <label className="flex flex-col text-sm">
                  Ngày sinh
                  <input
                    type="date"
                    name="birthday"
                    value={formUser.birthday}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    type="submit"
                    className="bg-red-400 hover:bg-red-600 cursor-pointer rounded-xl text-white px-4 py-2 focus:outline-none"
                  >
                    Chỉnh sửa hồ sơ
                  </button>
                  <button
                    type="button"
                    data-modal-hide="popup-modal"
                    className="rounded-xl bg-gray-200 hover:bg-gray-400 px-4 py-2 focus:outline-none"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
