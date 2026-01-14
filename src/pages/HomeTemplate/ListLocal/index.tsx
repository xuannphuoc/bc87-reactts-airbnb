import { useSelector } from "react-redux";
import { type RootState } from "../../../store";
import Room from "./room/room";
import { useParams } from "react-router-dom";

export default function DetailRoomPage() {
  const { location } = useParams();
  const { data, loading } = useSelector(
    (state: RootState) => state.listDataRoomSlice
  );
  if (loading) {
    return <p className="text-center mt-10">Đang tải phòng...</p>;
  }
  const filterBtn =
    "text-gray-700 bg-white border border-gray-300 text-sm px-4 py-2.5 rounded-full \
   transition-all duration-300 ease-out \
   hover:-translate-y-0.5 hover:shadow-md \
   hover:border-pink-400 hover:text-pink-600 \
   active:scale-95 cursor-pointer";
  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10">
          {/* MAP ON TOP */}
          <div className="w-full">
            <iframe
              className="rounded-2xl w-full h-[400px] md:h-[600px]"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                location || "Hồ Chí Minh"
              )}&output=embed`}
              loading="lazy"
            ></iframe>
          </div>

          {/* ROOM LIST BELOW */}
          <div>
            {/* title */}
            <h1 className="font-semibold text-2xl">
              Chỗ ở tại khu vực của bạn
            </h1>

            <div className="mt-2 flex gap-3 flex-wrap">
              <button className={filterBtn}>🏠 Loại nơi ở</button>

              <button className={filterBtn}>💰 Giá</button>

              <button className={filterBtn}>⚡ Đặt ngay</button>

              <button className={filterBtn}>🛏️ Phòng & phòng ngủ</button>

              <button className={filterBtn}>🎯 Bộ lọc khác</button>
            </div>

            {/* detailroom */}
            {Array.isArray(data) && data.length > 0 ? (
              <div className="grid grid-cols-1 mt-6">
                {data.map((room) => {
                  return <Room key={room.id} room={room} />;
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-6">
                Phòng chưa được cập nhật
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
