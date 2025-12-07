import { getDataPaga } from "./discoverSlice";
import { useDispatch, useSelector } from "react-redux";
import { type Paganation } from "./discoverSlice";
import Place from "./../../components/Local/place";
import { type AppDispatch, type RootState } from "./../../../../../store/index";
import { useEffect } from "react";
export default function Discover() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataPaga());
  }, []);
  const state = useSelector((state: RootState) => state.getDataPageSlice);

  // render đở ở đây mốt quay lại làm tiếp khúc sau
  const renderPlace = () => {
    const data = state.dataPaga?.data;
    if (data && Array.isArray(data)) {
      return data.map((place: Paganation) => (
        <Place key={place.id} place={place} />
      ));
    }
    if (state.loading) {
      return <p className="text-gray-500 text-center">Đang tải dữ liệu...</p>;
    }

    return <p className="text-gray-500 text-center">Không có dữ liệu</p>;
  };

  return (
    <div className="mx-4">
      <h1 className="text-black/90 text-xl md:text-2xl lg:text-3xl font-bold mb-5">
        Khám phá những điểm đến gần đây
      </h1>
      <div className="grid overflow-x-auto  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-5 mx-4  ">
        {renderPlace()}
      </div>
      <h1 className="text-black/90 text-xl md:text-2xl lg:text-3xl font-bold mb-5 mt-5">
        Ở bất cứ đâu
      </h1>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="">
            <div className="mb-2">
              <img
                src="./images/B1.jpg"
                alt=""
                className="w-60 h-55 sm:w-90 sm:h-85 rounded-2xl"
              />
            </div>
            <p className="text-gray-900 text-lg font-semibold">Tòan bộ nhà</p>
          </div>
          <div className="">
            <div className="mb-2">
              <img
                src="./images/B3.jpg"
                alt=""
                className="w-60 h-55 sm:w-90 sm:h-85 rounded-2xl"
              />
            </div>
            <p className="text-gray-900 text-lg font-semibold">Chỗ ở độc đáo</p>
          </div>
          <div className="">
            <div className="mb-2">
              <img
                src="./images/B2.png"
                alt=""
                className="w-60 h-55 sm:w-90 sm:h-85 rounded-2xl"
              />
            </div>
            <p className="text-gray-900 text-lg font-semibold">
              Trang trại và thiên nhiên
            </p>
          </div>
          <div className="">
            <div className="mb-2">
              <img
                src="./images/B4.jpg"
                alt=""
                className="w-60 h-55 sm:w-90 sm:h-85 rounded-2xl"
              />
            </div>
            <p className="text-gray-900 text-lg font-semibold">
              Cho phép mang theo thú cưng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
