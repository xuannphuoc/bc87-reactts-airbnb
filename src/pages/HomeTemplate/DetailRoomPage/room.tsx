import { type DetailRoom } from "./../../HomeTemplate/components/Navbar/getRoom";
import { type AppDispatch } from "./../../../store";
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
      <div className="grid grid-cols-12 gap-10 h-[200px]">
        <div className="col-span-5  cursor-pointer  ">
          <img
            className="w-full h-full rounded-2xl "
            src={room?.hinhAnh}
            alt=""
          />
        </div>
        <div className="col-span-7">
          <div className="">
            <p
              onClick={() => onClick(room?.id!)}
              className="font-sans text-lg hover:text-pink-400 cursor-pointer"
            >
              {room?.tenPhong}
            </p>
            <div className="w-15 border-b my-3 bg-gray-300"></div>
            <div>
              <p className="text-gray-600">
                {room?.khach} khách . {room?.phongNgu} phòng ngủ .{" "}
                {room?.giuong} giường . {room?.phongTam} phòng tắm
              </p>
              <p className="text-gray-600">
                {room?.wifi ? " wifi" : ""} {room?.bep ? ". bếp" : ""}{" "}
                {room?.tivi ? ". tivi" : ""} {room?.dieuHoa ? ". dieu hoa" : ""}
              </p>
            </div>
            <div className="mt-17 flex ">
              <span className="ml-auto">
                <b className="inline">${room?.giaTien} </b>/ tháng
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
