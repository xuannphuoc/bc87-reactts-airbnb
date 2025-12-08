import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { type Comments } from "../ListLocal/getComment.ts";
import { useState } from "react";
import StarRating from "../RoomDetail/Rating";
import { postComment } from "./postComment";
import { type PostComment } from "./postComment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { bookRoomReducer } from "./bookRoom";
import { type FormBookRom } from "./bookRoom";
import { initFlowbite, Modal } from "flowbite";
import { useContext } from "react";
import { BookingContext } from "../../../context/BookingContext.tsx";
type Props = {
  cmt: Comments;
};
const CommentComponent = ({ cmt }: Props) => {
  const dateString = cmt.ngayBinhLuan;
  const date = new Date(dateString);

  const [isExpended, setIsExpended] = useState(false);
  const maxLength = 200;
  const isLong = cmt.noiDung.length > maxLength;
  const displayText = isExpended
    ? cmt.noiDung
    : cmt.noiDung.slice(0, maxLength) + " ...";

  const showStar = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isActive = i <= cmt.saoBinhLuan;

      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 text-yellow-400 ${
            isActive ? "opacity-100" : "opacity-20"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <div className="col-span-1 my-5 border-b border-gray-200">
      <div className="">
        <div className="flex gap-4 items-center ">
          <div className="">
            {cmt.avatar ? (
              <div className="">
                <img
                  className="w-15 h-15 rounded-full "
                  src={cmt.avatar}
                  alt=""
                />
              </div>
            ) : (
              <img
                className="w-15 h-15 rounded-full hover:bg-amber-50"
                src="./../images/avatar.png"
                alt=""
              />
            )}
          </div>
          <div className="">
            <p className="font-semibold">{cmt.tenNguoiBinhLuan}</p>
            <div className="py-2">{date.toLocaleDateString("vi-VN")}</div>
          </div>
        </div>
        <div className="pb-3">
          <span>{displayText}</span>
          {isLong && (
            <button
              className="text-blue-600 ml-1 hover:underline"
              onClick={() => setIsExpended(!isExpended)}
            >
              {isExpended ? "Thu gọn" : "Xem chi tiết"}
            </button>
          )}
          <div className="">{showStar()}</div>
        </div>
      </div>
    </div>
  );
};

export default function Room() {
  const istoday = new Date().toISOString().split("T")[0];
  const context = useContext(BookingContext);
  if (!context) return null;

  const { booking } = context;

  const roomData = useSelector((state: RootState) => state.getDataRoomSlice);
  const comment = useSelector((state: RootState) => state.commentSlice.data);
  const [showPopupSucess, setShowPopupSucess] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const bookRoomState = useSelector((state: RootState) => state.bookRoomSlice);

  useEffect(() => {
    if (bookRoomState.data) {
      alert("Đặt phòng thành công!");
      distpatch({ type: "bookRoomSlice/reset" });
    }
  }, [bookRoomState.data]);
  // comment
  const postCommentState = useSelector(
    (state: RootState) => state.postCommentReducer
  );
  useEffect(() => {
    if (postCommentState?.data) {
      alert("Thêm bình luận thành công!");
    }
    setData((prev) => ({
      ...prev,
      noiDung: "",
      saoBinhLuan: 0,
    }));
  }, [postCommentState?.data]);

  // get maPhong
  const { id: maPhong } = useParams();
  //  get user

  const userString =
    localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");

  const user = userString ? JSON.parse(userString) : null;
  const userData = user?.user ?? null;

  // get Room
  let room = null;
  if (roomData.data) {
    room = roomData.data;
  } else {
    const stored = sessionStorage.getItem("dataRoom");
    if (stored) {
      room = JSON.parse(stored);
    }
  }
  const distpatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (roomData.data && comment && comment.length > 0) {
      sessionStorage.setItem("dataRoom", JSON.stringify(roomData.data));
      sessionStorage.setItem("dataComment", JSON.stringify(comment));
    }
  }, [roomData.data, comment]);
  useEffect(() => {
    if (!comment || comment.length === 0) {
      const stored = sessionStorage.getItem("dataComment");
      if (stored) {
        const dataStored = JSON.parse(stored);
        distpatch({
          type: "commentSlice/setComment",
          payload: dataStored,
        });
      }
    }
  }, []);
  const renderComment = () => {
    return comment
      ?.slice(0, visibleCount)
      .map((cmt: Comments) => <CommentComponent key={cmt.id} cmt={cmt} />);
  };
  const [form, setForm] = useState<FormBookRom>({
    maPhong: Number(maPhong),
    ngayDen: booking.checkin.split("T")[0],
    ngayDi: booking.checkout.split("T")[0],
    soLuongKhach: booking.guests,
    maNguoiDung: userData?.id ?? 0,
  });
  // comment
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}T00:00:00`;
  const [data, setData] = useState<PostComment>({
    maPhong: Number(maPhong),
    maNguoiBinhLuan: userData?.id ?? 0,
    ngayBinhLuan: formattedDate,
    noiDung: "",
    saoBinhLuan: 0,
  });

  // post form
  useEffect(() => {
    initFlowbite();
  }, []);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userString =
      localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");

    const user = userString ? JSON.parse(userString) : null;
    console.log(user);
    const userData = user?.user ?? null;
    if (!userData) {
      alert("Bạn cần đăng nhập để tiếp tục!");

      // mở modal đăng nhập
      const modalEl = document.getElementById("authentication-modal");
      if (modalEl) {
        const modal = new Modal(modalEl, {
          placement: "center",
          backdrop: "dynamic",
          closable: true,
        });
        modal.show();
      } else {
        document
          .getElementById("authentication-modal")
          ?.classList.add("hidden");
      }

      return;
    }
    distpatch(bookRoomReducer(form));
  };
  // calc money

  const [money, setMoney] = useState({
    usd: room?.giaTien,
    day: 0,
    moneyService: 3,
  });
  useEffect(() => {
    if (form.ngayDen && form.ngayDi) {
      const startDate = new Date(form.ngayDen);
      const endDate = new Date(form.ngayDi);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      const diffDay =
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

      setMoney((prev) => ({
        ...prev,
        day: diffDay > 0 ? diffDay : 0,
      }));
    }
  }, [form.ngayDen, form.ngayDi]);

  return (
    <div className="container mx-auto my-10 p-5">
      <hr className="my-2" />
      <div className="">
        {room && (
          <div className="w-full">
            {/* Tên phòng */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3">
              {room.tenPhong}
            </h1>

            {/* Hình ảnh */}
            <div className="w-full">
              <img
                src={room.hinhAnh}
                alt=""
                className="rounded-2xl w-full max-h-[450px] object-cover"
              />
            </div>

            {/* Thông tin chủ nhà */}
            <div className="mt-6 sm:mt-8">
              <h1 className="text-base sm:text-lg">
                Toàn bộ căn hộ, chủ nhà <b>{userData?.name}</b>
              </h1>

              <p className="text-gray-700 text-sm sm:text-base mt-2 leading-relaxed">
                {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong}{" "}
                giường · {room.phongTam} phòng tắm
              </p>
            </div>
          </div>
        )}
        {room && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {/* LEFT CONTENT (giữ nguyên logic) */}
            <div className="md:col-span-8">
              <hr className="text-gray-600" />
              <div className="my-6 md:my-10">
                <div className="flex gap-3 md:gap-5 items-center mb-6 md:mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-7 md:h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  {/* content  */}
                  <div className="">
                    <h4 className="text-md md:text-base">Toàn bộ nhà</h4>
                    <p className="text-gray-700 text-sm md:text-sm">
                      Bạn sẽ có chung cư cao cấp cho riêng mình
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5 items-center mb-6 md:mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-7 md:h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                      />
                    </svg>
                  </div>
                  {/* content  */}
                  <div className="">
                    <h4 className="text-md md:text-base">Vệ sinh tăng cường</h4>
                    <p className="text-gray-700 text-sm md:text-sm">
                      Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                      cường 5 bước Aribnb.
                    </p>
                    <a
                      href="font-bold"
                      className="text-sm md:text-sm underline"
                    >
                      Hiển thị thêm
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5 items-center mb-6 md:mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-7 md:h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                  {/* content  */}
                  <div className="">
                    <h4 className="text-md md:text-base">
                      Phong là chủ nhà siêu cấp
                    </h4>
                    <p className="text-gray-700 text-sm md:text-sm">
                      Chủ nhà siêu cấp là chủ nhà có kinh nghiệm, được đánh giá
                      cao và là những người cám kết mang lại quãng thời gian ở
                      tuyệt vời cho khách
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5 items-center mb-6 md:mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 md:w-7 md:h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                  </div>
                  {/* content  */}
                  <div className="font-semibold">
                    <h4 className="text-md md:text-base">
                      Miễn phí hủy trong 48h
                    </h4>
                  </div>
                </div>
              </div>

              <hr />

              <div className="my-4 md:my-6">
                <div className="">
                  <h1 className="mb-3 md:mb-4 font-semibold text-lg">
                    Tiện nghi
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                      {room.bep ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-kitchen-set"></i>{" "}
                          <span>Bếp</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.tivi ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-tv"></i> <span>Tivi</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.dieuHoa ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-wind"></i>{" "}
                          <span>Điều hòa</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.doXe ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-car"></i>{" "}
                          <span>Bãi đỗ xe</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.hoBoi ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-water"></i>{" "}
                          <span>Hồ bơi</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>

                    <div>
                      {room.banUi ? (
                        <div className="mb-2">
                          <i className="fa-brands fa-pied-piper-hat"></i>{" "}
                          <span>Bàn ủi</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.banLa ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-feather"></i>{" "}
                          <span>Bàn là</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.phongNgu ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-bed"></i>{" "}
                          <span>Phòng ngủ</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.phongTam ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-restroom"></i>{" "}
                          <span>Phòng tắm</span>
                        </div>
                      ) : (
                        ""
                      )}
                      {room.wifi ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-wifi"></i> <span>Wifi</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <hr className="mt-4" />
                </div>
              </div>
            </div>

            {/* BOOK Room (giữ nguyên logic và handlers) */}
            <div className="md:col-span-4">
              <h1 className="text-center font-bold text-2xl md:text-2xl">
                Đặt phòng
              </h1>

              <div className="w-full mt-4 shadow-lg rounded-2xl overflow-hidden">
                <div className="p-5">
                  <p>
                    <b className="text-xl font-semibold">${room.giaTien}</b>/
                    đêm
                  </p>
                  <div className="p-2">
                    <div className="border rounded-2xl w-full h-auto">
                      {/* date  */}
                      <div className="grid grid-cols-2">
                        <div className="col-span-1 p-2 flex justify-center items-center border-r">
                          <div className="ml-3 w-full">
                            <label
                              className="font-serif text-sm"
                              htmlFor="nhanPhong"
                            >
                              Nhận phòng
                            </label>
                            <input
                              name="ngayDen"
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
                              }}
                              value={booking.checkin}
                              id="nhanPhong"
                              className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
                              type="date"
                            />
                          </div>
                        </div>
                        <div className="col-span-1 p-2 flex justify-center items-center">
                          <div className="ml-3 w-full">
                            <label
                              className="font-serif text-sm"
                              htmlFor="traPhong"
                            >
                              Trả phòng
                            </label>
                            <input
                              name="ngayDi"
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
                              }}
                              value={booking.checkout}
                              id="traPhong"
                              className="border-0 p-0 focus:ring-0 focus:outline-none w-full text-sm"
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
                              khách
                            </span>

                            <div className="flex justify-around items-center gap-3">
                              {/* minus  */}
                              <button
                                className="cursor-pointer"
                                onClick={() => {
                                  const newGuests =
                                    form.soLuongKhach > 1
                                      ? form.soLuongKhach - 1
                                      : 1;

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
                    className="w-full text-white rounded-md bg-linear-to-r from-purple-500 to-pink-500 hover:opacity-95 focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium text-sm px-4 py-2.5"
                  >
                    Đặt phòng
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
                    <p className="text-gray-700">
                      ${money.moneyService * money.day}
                    </p>
                  </div>

                  <hr className="my-3" />
                  <div className="flex justify-between items-center font-semibold">
                    <p>Tổng</p>
                    <p>
                      $
                      {room.giaTien * money.day +
                        money.moneyService * money.day}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="bg-gray-100 mt-6" />
            </div>
          </div>
        )}
      </div>
      {/* modal  */}
      {showPopupSucess && (
        <div
          id="success-modal"
          className="fixed inset-0 flex items-center  justify-center z-50  "
        >
          <div className="bg-gray-200 opacity-90 p-6 rounded-lg text-center w-80">
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              Đặt phòng thành công!
            </h3>
            <button
              onClick={() => {
                setShowPopupSucess(false);
                distpatch({ type: "bookRoomReducer/reset" });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {renderComment()}
      </div>

      <button
        type="button"
        onClick={() =>
          visibleCount < comment.length
            ? setVisibleCount(comment.length)
            : setVisibleCount(3)
        }
        className="flex items-center mb-5 rounded-md cursor-pointer hover:bg-gray-100 text-body bg-neutral-primary border border-default hover:bg-neutral-secondary-soft hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-3.5 focus:outline-none"
      >
        {visibleCount < comment.length
          ? "Hiển thị tất cả các bình luận"
          : "Thu gọn "}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 animate__fadeOutDown animate__animated animate__infinite animate__slow 2s"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
          />
        </svg>
      </button>

      <p className="text-2xl mb-2 font-medium"> Bình luận của bạn</p>
      {/* input comment  */}
      <div className="flex gap-6 items-center">
        <div className="">
          {user?.hinhAnh ? (
            <img src={user?.hinhAnh} alt="" />
          ) : (
            <img
              className="w-15 h-15 rounded-full hover:bg-amber-50"
              src="./../images/avatar.png"
              alt=""
            />
          )}
        </div>
        <div className="">
          <textarea
            onChange={(e) =>
              setData((prev) => ({ ...prev, noiDung: e.target.value }))
            }
            value={data.noiDung}
            name=""
            className="w-full sm:w-[400px] lg:w-[600px] h-[150px] rounded-2xl p-3 border"
          ></textarea>
          <StarRating
            onChangeRating={(value: number) =>
              setData((prev) => ({ ...prev, saoBinhLuan: value }))
            }
          />
          <button
            onClick={() => {
              if (!userData) {
                alert("Bạn cần đăng nhập để tiếp tục!");
                const modalEl = document.getElementById("authentication-modal");
                if (modalEl) {
                  const modal = new Modal(modalEl, {
                    placement: "center",
                    backdrop: "dynamic",
                    closable: true,
                  });
                  modal.show();
                }
                return;
              }
              distpatch(postComment(data));
            }}
            type="button"
            className="block text-white bg-linear-to-r rounded-xl from-pink-400 via-pink-500 to-pink-600 hover:bg-linear-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
          >
            Thêm bình luận
          </button>
        </div>
      </div>
    </div>
  );
}
