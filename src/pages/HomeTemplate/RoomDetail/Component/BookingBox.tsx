import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { BookingContext } from "@/context/BookingContext";
import { bookRoomReducer } from "../getAPI/bookRoom.ts";

import type { DetailRoom } from "../../components/_Type/type";
import { readDemoSession } from "@/services/demoSession";
import { toast } from "react-hot-toast";

export default function BookingBox({ room }: { room: DetailRoom }) {
  const dispatch = useDispatch<AppDispatch>();
  const { booking, setBooking } = useContext(BookingContext)!;
  const [loading, setLoading] = useState(false);
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
    .toISOString().slice(0, 10);
  const checkin = booking.checkin.split("T")[0];
  const checkout = booking.checkout.split("T")[0];
  const nights = Math.max(0, (Date.parse(checkout) - Date.parse(checkin)) / 86_400_000 || 0);
  const serviceFee = 8;
  const guests = booking.guests;

  async function handleSubmit() {
    const userId = readDemoSession()?.user.id;
    if (!userId) {
      toast.error("Bạn cần đăng nhập để tiếp tục.");
      document.getElementById("open-login-modal")?.click();
      return;
    }
    if (checkin < localToday || nights < 1 || guests > room.khach) {
      toast.error("Kiểm tra ngày đặt phòng và số khách.");
      return;
    }
    setLoading(true);
    try {
      await dispatch(bookRoomReducer({
        maPhong: room.id,
        ngayDen: checkin + "T00:00:00",
        ngayDi: checkout + "T00:00:00",
        soLuongKhach: guests,
        maNguoiDung: userId,
      })).unwrap();
      toast.success("Đặt phòng thành công");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Đặt phòng thất bại");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="md:col-span-4">
      <h1 className="text-center font-bold text-2xl md:text-2xl">Đặt phòng</h1>

      <div className="w-full mt-4 shadow-lg rounded-2xl overflow-hidden">
        <div className="p-5">
          <p>
            <b className="text-xl font-semibold">${room.giaTien}</b>/ đêm
          </p>
          <div className="p-2">
            <div className="border rounded-2xl w-full h-auto">
              {/* date  */}
              <div className="grid grid-cols-2">
                <div className="col-span-1 p-2 flex justify-center items-center border-r">
                  <div className="ml-3 w-full">
                    <label className="text-sm" htmlFor="nhanPhong">
                      Nhận phòng
                    </label>
                    <input
                      name="ngayDen"
                      value={booking.checkin.split("T")[0]}
                      className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
                      id="nhanPhong"
                      min={localToday}
                      onChange={(e) => {
                        const value = e.target.value;
                        setBooking((prev) => ({
                          ...prev,
                          checkin: value,
                          checkout: value >= checkout ? "" : prev.checkout,
                        }));
                      }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="col-span-1 p-2 flex justify-center items-center">
                  <div className="ml-3 w-full">
                    <label className="text-sm" htmlFor="traPhong">
                      Trả phòng
                    </label>
                    <input
                      name="ngayDi"
                      value={booking.checkout.split("T")[0]}
                      className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
                      id="traPhong"
                      min={checkin || localToday}
                      onChange={(e) => setBooking((prev) => ({ ...prev, checkout: e.target.value }))}
                      type="date"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t">
                <div className="mt-2 m-4">
                  <label className="text-sm" htmlFor="">
                    Khách
                  </label>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span>
                      <span>{guests} khách</span>
                    </span>

                    <div className="flex justify-around items-center gap-3">
                      {/* minus  */}
                      <button
                        className="cursor-pointer"
                        aria-label="Giảm số khách"
                        disabled={guests <= 1}
                        onClick={() => setBooking((prev) => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                      >
                        <i className="fa-solid fa-minus text-red-600"></i>
                      </button>
                      <span>{guests}</span>
                      <button
                        className="cursor-pointer"
                        aria-label="Tăng số khách"
                        disabled={guests >= room.khach}
                        onClick={() => setBooking((prev) => ({ ...prev, guests: Math.min(room.khach, prev.guests + 1) }))}
                      >
                        <i className="fa-solid fa-plus text-green-600"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto mb-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            type="button"
            className="w-full cursor-pointer text-white rounded-md bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium text-sm px-4 py-2.5"
          >
            {loading ? "Đang đặt phòng..." : "Đặt phòng"}
          </button>
        </div>

        <div className="px-5 pb-5">
          <div className="flex justify-between items-center text-sm">
            <p>
              <u>
                {`$${room.giaTien}`} x {nights} đêm
              </u>
            </p>
            <p className="text-gray-700">${room.giaTien * nights}</p>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-gray-700">
              <u>Phí dịch vụ</u>
            </p>
            <p className="text-gray-700">${serviceFee * nights}</p>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between items-center font-semibold">
            <p>Tổng</p>
            <p>
              $
              {(room.giaTien + serviceFee) * nights}
            </p>
          </div>
        </div>
      </div>

      <hr className="bg-gray-100 mt-6" />
    </div>
  );
}
