import { useSelector } from "react-redux";
import { type RootState } from "../../../store";
import Room from "./room";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DetailRoomPage() {
  const data = useSelector((state: RootState) => state.RoomSlice.data);
  console.log(data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.length > 0) {
      sessionStorage.setItem("dataRoom", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      const stored = sessionStorage.getItem("dataRoom");
      if (stored) {
        const dataStored = JSON.parse(stored);
        if (Array.isArray(dataStored)) {
          dispatch({ type: "RoomSlice/setData", payload: dataStored });
        }
      }
    }
  }, [data, dispatch]);

  const renderRoom = () => {
    if (!Array.isArray(data)) return null;
    return data?.map((room) => <Room key={room.id} room={room} />);
  };

  return (
    <div className="py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-10">
          {/* MAP ON TOP */}
          <div className="w-full">
            <iframe
              className="rounded-2xl w-full h-[400px] md:h-[600px]"
              src={`https://www.google.com/maps?q${encodeURIComponent(
                "Cần Thơ"
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
              <button className="text-black border hover:bg-gray-100 text-sm px-4 py-2.5 rounded-xl">
                Loại nơi ở
              </button>
              <button className="text-black border hover:bg-gray-100 text-sm px-4 py-2.5 rounded-xl">
                Giá
              </button>
              <button className="text-black border hover:bg-gray-100 text-sm px-4 py-2.5 rounded-xl">
                Đặt ngay
              </button>
              <button className="text-black border hover:bg-gray-100 text-sm px-4 py-2.5 rounded-xl">
                Phòng và phòng ngủ
              </button>
              <button className="text-black border hover:bg-gray-100 text-sm px-4 py-2.5 rounded-xl">
                Bộ lọc khác
              </button>
            </div>

            {/* detailroom */}
            <div className="grid grid-cols-1 mt-6">{renderRoom()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
