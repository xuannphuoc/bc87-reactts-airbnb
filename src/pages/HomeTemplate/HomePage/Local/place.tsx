import { type Paganation } from "../Discover/discoverSlice";
import { useGotoDetail } from "@/pages/HomeTemplate/components/customHooks/useGotoDetail.tsx";
type Props = {
  place: Paganation;
};
export default function Place({ place }: Props) {
  const gotoDetal = useGotoDetail();
  return (
    <button onClick={() => gotoDetal(place.id, place.tenViTri)}>
      <div className="col-span-1 w-60 lg:h-30 cursor-pointer transition-all hover:translate-y-1 hover:scale-[1.02] hover:shadow-2xl   flex gap-4 items-center rounded-2xl  p-1  shadow-md wow  animate__animated animate__zoomIn  duration ">
        <div className="bg-center bg-cover   ">
          <img
            src={place.hinhAnh}
            className="w-20 h-20 sm:w-15 sm:h-15 rounded-2xl md:w-15 md:h-15 xl:w-20  xl:h-20 md:rounded lg:rounded-xl border border-gray-200"
            alt=""
          />
        </div>
        <div className="">
          <h3 className="font-bold ">{place.tenViTri}</h3>
          <p className="text-sm ">
            {place.tinhThanh}, {place.quocGia}
          </p>
        </div>
      </div>
    </button>
  );
}
