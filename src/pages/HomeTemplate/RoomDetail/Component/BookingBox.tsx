import { Modal } from "flowbite";
import { useContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { BookingContext } from "@/context/BookingContext";
import { bookRoomReducer } from "../getAPI/bookRoom.ts";
import type { FormBookRom } from "../getAPI/bookRoom.ts";

interface Props {
  room: any;
  form: FormBookRom;
  setForm: React.Dispatch<React.SetStateAction<FormBookRom>>;
  userData: any;
  istoday: string;
  loading: boolean;
}

export default function BookingBox({
  room,
  form,
  setForm,
  istoday,
  loading,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(BookingContext);
  if (!context) return null;
  const { booking, setBooking } = context;

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userString =
      localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");
    const parsed = userString ? JSON.parse(userString) : null;
    const user = parsed?.user ?? parsed;
    const userId = user?.id || user?.maNguoiDung;

    if (!userId) {
      alert("Bạn cần đăng nhập để tiếp tục!");
      const modalEl = document.getElementById("authentication-modal");
      if (modalEl) {
        const modal = new Modal(modalEl);
        modal.show();
      }
      return;
    }

    dispatch(
      bookRoomReducer({
        ...form,
        maNguoiDung: userId,
      })
    );
  };
  const money = useMemo(() => {
    const checkin = booking.checkin?.split("T")[0];
    const checkout = booking.checkout?.split("T")[0];

    if (!checkin || !checkout) {
      return {
        day: 1,
        moneyService: 0,
      };
    }

    const start = new Date(checkin);
    const end = new Date(checkout);
    const diffTime = end.getTime() - start.getTime();
    const day = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);

    return {
      day,
      moneyService: 8, // GIỮ Y CHANG LOGIC CŨ
    };
  }, [booking.checkin, booking.checkout]);
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
                    <label className="font-serif text-sm" htmlFor="nhanPhong">
                      Nhận phòng
                    </label>
                    <input
                      name="ngayDen"
                      value={booking.checkin.split("T")[0]}
                      className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value < istoday) {
                          alert(
                            "Ngày nhận phòng không được nhỏ hơn ngày hiện tại!"
                          );
                          return;
                        }
                        setForm({
                          ...form,
                          ngayDen: `${value}T00:00:00`,
                        });
                        setBooking((prev) => ({
                          ...prev,
                          checkin: `${value}T00:00:00`,
                        }));
                      }}
                      type="date"
                    />
                  </div>
                </div>
                <div className="col-span-1 p-2 flex justify-center items-center">
                  <div className="ml-3 w-full">
                    <label className="font-serif text-sm" htmlFor="traPhong">
                      Trả phòng
                    </label>
                    <input
                      name="ngayDi"
                      value={booking.checkout.split("T")[0]}
                      className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
                      onChange={(e) => {
                        const value = e.target.value;
                        const checkin = form.ngayDen?.split("T")[0];
                        if (checkin && value < checkin) {
                          alert(
                            "Ngày trả phòng không được nhỏ hơn ngày nhận phòng!"
                          );
                          return;
                        }
                        setForm({
                          ...form,
                          ngayDi: `${value}T00:00:00`,
                        });
                        setBooking((prev) => ({
                          ...prev,
                          checkout: `${value}T00:00:00`,
                        }));
                      }}
                      type="date"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t">
                <div className="mt-2 m-4">
                  <label className="font-serif text-sm" htmlFor="">
                    Khách
                  </label>
                  <div className="flex justify-between items-center w-full mt-2">
                    <span>
                      <span>{form.soLuongKhach} khách</span>
                    </span>

                    <div className="flex justify-around items-center gap-3">
                      {/* minus  */}
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          const newGuests =
                            form.soLuongKhach > 1 ? form.soLuongKhach - 1 : 1;

                          setForm({
                            ...form,
                            soLuongKhach: newGuests,
                          });

                          setBooking((prev: any) => ({
                            ...prev,
                            guests: newGuests,
                          }));
                        }}
                      >
                        <i className="fa-solid fa-minus text-red-600"></i>
                      </button>
                      <span>{form.soLuongKhach}</span>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          const newGuests = form.soLuongKhach + 1;

                          setForm({
                            ...form,
                            soLuongKhach: newGuests,
                          });

                          setBooking((prev: any) => ({
                            ...prev,
                            guests: newGuests,
                          }));
                        }}
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
                {`$${room.giaTien}`} x {money.day} đêm
              </u>
            </p>
            <p className="text-gray-700">${room.giaTien * money.day}</p>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-gray-700">
              <u>Phí dịch vụ</u>
            </p>
            <p className="text-gray-700">${money.moneyService * money.day}</p>
          </div>

          <hr className="my-3" />
          <div className="flex justify-between items-center font-semibold">
            <p>Tổng</p>
            <p>
              $
              {(room?.giaTien ?? 0 + money.moneyService) *
                money.day *
                form.soLuongKhach}
            </p>
          </div>
        </div>
      </div>

      <hr className="bg-gray-100 mt-6" />
    </div>
  );
}
