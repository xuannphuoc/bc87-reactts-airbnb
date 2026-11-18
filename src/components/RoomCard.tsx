import { Link } from "react-router-dom";
import type { DetailRoom } from "@/pages/HomeTemplate/components/_Type/type";

const amenities = [
  ["wifi", "WiFi"],
  ["bep", "Bếp"],
  ["tivi", "Tivi"],
  ["dieuHoa", "Điều hòa"],
  ["mayGiat", "Máy giặt"],
] as const;

export default function RoomCard({ room, compact = false }: {
  room: DetailRoom;
  compact?: boolean;
}) {
  return (
    <article className={compact ? "rounded-xl border bg-white p-4" : "border-b border-gray-200 py-8"}>
      <div className={compact ? "flex flex-col gap-4" : "grid gap-6 md:grid-cols-2"}>
        <Link to={`/room/${room.id}`} aria-label={room.tenPhong}>
          <img
            className="h-48 w-full rounded-xl object-cover"
            src={room.hinhAnh || import.meta.env.BASE_URL + "images/B1.jpg"}
            alt={room.tenPhong}
          />
        </Link>
        <div className="flex flex-col justify-between gap-4">
          <div>
            <Link className="text-lg font-semibold hover:text-pink-600" to={`/room/${room.id}`}>
              {room.tenPhong}
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong} giường · {room.phongTam} phòng tắm
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {amenities.filter(([field]) => room[field]).map(([, label]) => label).join(" · ")}
            </p>
          </div>
          <p><strong>${room.giaTien.toLocaleString()}</strong> / đêm</p>
        </div>
      </div>
    </article>
  );
}
