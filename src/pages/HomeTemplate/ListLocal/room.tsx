import { type DetailRoom } from "../components/Navbar/getRoom";
import { type AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { getDataRoom } from "./getDetailRoom";
import { getComment } from "./getComment";

type Props = {
  room: DetailRoom | null;
};
import { useNavigate } from "react-router-dom";
export default function Room({ room }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (id: number) => {
    navigate(`/room/${id}`);
    dispatch(getDataRoom(id));
    dispatch(getComment(id));
  };

  return (
    <div className="container mx-auto border-b border-gray-200 py-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 md:h-[200px]">
        {/* IMAGE */}
        <div className="col-span-5 cursor-pointer">
          <img
            className="w-full h-[200px] md:h-full object-cover rounded-2xl"
            src={room?.hinhAnh}
            alt=""
          />
        </div>

        {/* CONTENT */}
        <div className="col-span-7 flex flex-col justify-between">
          <div>
            <p
              onClick={() => onClick(room?.id!)}
              className="font-sans text-xl md:text-lg hover:text-pink-400 cursor-pointer"
            >
              {room?.tenPhong}
            </p>

            <div className="border-b my-3 bg-gray-300"></div>

            <div className="space-y-1">
              <p className="text-gray-600 text-sm md:text-base">
                {room?.khach} khách · {room?.phongNgu} phòng ngủ ·{" "}
                {room?.giuong} giường · {room?.phongTam} phòng tắm
              </p>

              <p className="text-gray-600 text-sm md:text-base">
                {room?.wifi ? "wifi" : ""} {room?.bep ? "· bếp" : ""}{" "}
                {room?.tivi ? "· tivi" : ""} {room?.dieuHoa ? "· điều hòa" : ""}
              </p>
            </div>
          </div>

          {/* PRICE */}
          <div className="mt-4 md:mt-0 flex">
            <span className="ml-auto text-base md:text-lg">
              <b>${room?.giaTien}</b> / tháng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
