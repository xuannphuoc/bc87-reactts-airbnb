import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { useState, useEffect, useContext } from "react";
import { resetComment, type PostComment } from "./getAPI/postComment";
import { useParams } from "react-router-dom";
import { resetBookRoom, type FormBookRom } from "./getAPI/bookRoom";
import { initFlowbite } from "flowbite";
import { BookingContext } from "../../../context/BookingContext";
import BookingBox from "./Component/BookingBox";
import CommentBlock from "./Component/CommentBlock";
import { toast } from "react-hot-toast";
export default function Room() {
  const istoday = new Date().toISOString().split("T")[0];

  const context = useContext(BookingContext);
  if (!context) return null;
  const { booking, setBooking } = context;

  const dispatch = useDispatch<AppDispatch>();

  const roomData = useSelector((state: RootState) => state.detailRoomSlice);
  const comment = useSelector((state: RootState) => state.commentSlice.data);
  const postCommentState = useSelector(
    (state: RootState) => state.postCommentReducer
  );
  const bookRoomState = useSelector((state: RootState) => state.bookRoomSlice);

  const { id: maPhong } = useParams();

  const userString =
    localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");
  const parsed = userString ? JSON.parse(userString) : null;
  const userData = parsed?.user;

  let room = null;
  if (roomData.data) {
    room = roomData.data;
  } else {
    const stored = sessionStorage.getItem("dataRoom");
    if (stored) room = JSON.parse(stored);
  }

  useEffect(() => {
    if (roomData.data && comment?.length > 0) {
      sessionStorage.setItem("dataRoom", JSON.stringify(roomData.data));
      sessionStorage.setItem("dataComment", JSON.stringify(comment));
    }
  }, [roomData.data, comment]);

  useEffect(() => {
    if (
      (!comment || comment.length === 0) &&
      sessionStorage.getItem("dataComment")
    ) {
      dispatch({
        type: "commentSlice/setComment",
        payload: JSON.parse(sessionStorage.getItem("dataComment")!),
      });
    }
  }, []);

  const [form, setForm] = useState<FormBookRom>({
    maPhong: Number(maPhong),
    ngayDen: booking.checkin,
    ngayDi: booking.checkout,
    soLuongKhach: booking.guests,
    maNguoiDung: userData?.id ?? 0,
  });

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}T00:00:00`;

  const [data, setData] = useState<PostComment>({
    maPhong: Number(maPhong),
    maNguoiBinhLuan: userData?.id,
    ngayBinhLuan: formattedDate,
    noiDung: "",
    saoBinhLuan: 0,
  });

  useEffect(() => {
    if (postCommentState?.data) {
      dispatch({
        type: "commentSlice/addComment",
        payload: postCommentState.data,
      });

      setData((prev) => ({
        ...prev,
        noiDung: "",
        saoBinhLuan: 0,
      }));
    }
  }, [postCommentState?.data]);

  useEffect(() => {
    if (bookRoomState.data) {
      setForm({
        maPhong: Number(maPhong),
        ngayDen: istoday + "T00:00:00",
        ngayDi: istoday + "T00:00:00",
        soLuongKhach: 1,
        maNguoiDung: userData?.id ?? 0,
      });

      setBooking({
        checkin: istoday + "T00:00:00",
        checkout: istoday + "T00:00:00",
        guests: 1,
      });

      dispatch({ type: "bookRoomSlice/reset" });
    }
  }, [bookRoomState.data]);

  useEffect(() => {
    initFlowbite();
  }, []);
  // alert booking
  useEffect(() => {
    if (bookRoomState.data) {
      toast.success("Đặt phòng thành công");
      dispatch(resetBookRoom());
    }
    if (bookRoomState.error) {
      toast.error("Đăt phòng thất bại");
      dispatch(resetBookRoom());
    }
  });
  // alert Comment
  useEffect(() => {
    if (postCommentState.data) {
      toast.success("Bạn đã comment");
      dispatch(resetComment());
    }
    if (postCommentState.error) {
      toast.error("");
      dispatch(resetComment());
    }
  });
  return (
    <div className="container mx-auto my-10 p-5">
      {room && (
        <>
          <h1 className="text-3xl font-semibold mb-3">{room.tenPhong}</h1>

          <img
            src={room.hinhAnh}
            alt=""
            className="rounded-2xl w-full max-h-[450px] object-cover"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-6">
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
            <BookingBox
              loading={bookRoomState.loading}
              room={room}
              form={form}
              setForm={setForm}
              userData={userData}
              istoday={istoday}
            />
          </div>
          <CommentBlock
            loading={postCommentState.loading}
            comment={comment}
            data={data}
            setData={setData}
            userData={userData}
          />
        </>
      )}
    </div>
  );
}
