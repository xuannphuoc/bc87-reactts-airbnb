import { useEffect, useState } from "react";
import RoomCard from "@/components/RoomCard";
import api from "@/services/apiServices";
import type { DetailRoom } from "@/pages/HomeTemplate/components/_Type/type";
import type { RoomByUser } from "../getAPI/getRoomByUser";

export default function BookedRooms({ data, loading }: { data: RoomByUser[]; loading: boolean }) {
  const [catalog, setCatalog] = useState<DetailRoom[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    api.get("/phong-thue", { signal: controller.signal })
      .then(({ data }) => setCatalog(data.content))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [data]);

  if (failed) return <p>Không tải được phòng đã đặt.</p>;
  if (loading || !catalog) return <p>Đang tải phòng...</p>;
  if (!data.length) return <p>Chưa có phòng nào được đặt.</p>;

  const rooms = new Map(catalog.map((room) => [room.id, room]));
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((booking) => {
        const room = rooms.get(booking.maPhong);
        return room && <RoomCard key={booking.id} room={room} compact />;
      })}
    </div>
  );
}
