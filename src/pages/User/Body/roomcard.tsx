import type { RoomByUser } from "../getAPI/getRoomByUser.ts";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { getRoomsDetail, clearRooms } from "../getAPI/roomBooked.ts";
import { useEffect } from "react";

type Props = {
  data: RoomByUser[];
  loading: boolean;
};

export default function RoomCard({ data, loading }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!data.length) return;
    dispatch(clearRooms());
    data.forEach((booking) => {
      dispatch(getRoomsDetail(booking.maPhong));
    });
  }, [data, dispatch]);

  const rooms = useSelector((state: RootState) => state.userRoomsSlice.data);

  if (loading) return <p>Đang tải phòng...</p>;

  if (!rooms.length) return <p>Chưa có phòng nào được đặt</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="group p-4 border rounded-xl bg-white hover:shadow-md"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <img
              src={room.hinhAnh}
              alt={room.tenPhong}
              className="sm:w-48 h-40 object-cover rounded-md"
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <h3 className="font-semibold text-lg mb-2">{room.tenPhong}</h3>

                <div className="flex flex-wrap gap-3 text-sm mb-2">
                  <p>
                    <b>Khách:</b> {room.khach}
                  </p>
                  <p>
                    <b>Phòng ngủ:</b> {room.phongNgu}
                  </p>
                  <p>
                    <b>Giường:</b> {room.giuong}
                  </p>
                  <p>
                    <b>Phòng tắm:</b> {room.phongTam}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  {room.wifi && <span className="tag">WiFi</span>}
                  {room.mayGiat && <span className="tag">Máy giặt</span>}
                  {room.tivi && <span className="tag">Tivi</span>}
                  {room.dieuHoa && <span className="tag">Điều hòa</span>}
                </div>

                <p className="font-semibold">
                  ${room.giaTien.toLocaleString()}/tháng
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
