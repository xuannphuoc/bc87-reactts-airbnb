import { useSelector } from "react-redux";
import { type RootState } from "./../../../store";
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
    <div className=" py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-10 mt-10">
          <div className="col-span-7">
            {/* title  */}
            <div className="">
              <h1 className="font-semibold text-2xl">
                Chỗ ở tại khu vực của bạn
              </h1>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  className="text-black border cursor-pointer rounded-4xl hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  Loại nơi ở
                </button>
                <button
                  type="button"
                  className="text-black border cursor-pointer rounded-4xl hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  Giá
                </button>
                <button
                  type="button"
                  className="text-black border cursor-pointer rounded-4xl hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  Đặt ngay
                </button>
                <button
                  type="button"
                  className="text-black border cursor-pointer rounded-4xl hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  Phòng và phòng ngủ
                </button>
                <button
                  type="button"
                  className="text-black border cursor-pointer rounded-4xl hover:bg-gray-100  focus:ring-4 focus:outline-none font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
                >
                  Bộ lọc khác
                </button>
              </div>
            </div>
            {/* detailroom  */}
            <div className="grid grid-cols-1 ">{renderRoom()}</div>
          </div>
          <div className="col-span-5 mt-20 ">
            <div className="">
              <iframe
                className="rounded-2xl w-full h-[800px]"
                // className="w-full min-h-max"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d68057.05799081174!2d106.58315837483451!3d10.725998926460514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d5dc62ab2d9%3A0xe55ef007ca0a1029!2sPEDRO%20Aeon%20Binh%20Tan!5e1!3m2!1svi!2s!4v1764504394234!5m2!1svi!2s"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
