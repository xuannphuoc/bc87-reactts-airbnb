import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { type Comments } from "../DetailRoomPage/getComment";
import { useState } from "react";
import StarRating from "../RoomDetail/Rating";
import { postComment } from "./postComment";
import { type PostComment } from "./postComment";
import { useEffect } from "react";
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
  const roomData = useSelector((state: RootState) => state.getDataRoomSlice);
  const comment = useSelector((state: RootState) => state.commentSlice.data);
  const distpatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<PostComment>({
    maPhong: 0,
    maNguoiBinhLuan: 0,
    ngayBinhLuan: "",
    noiDung: "",
    saoBinhLuan: 0,
  });
  console.log(comment);
  useEffect(() => {
    if (roomData.data && comment && comment.length > 0) {
      sessionStorage.setItem("dataRoom", JSON.stringify(roomData.data));
      sessionStorage.setItem("dataComment", JSON.stringify(comment));
    }
  }, [roomData.data, comment]);

  let room = null;
  if (roomData.data) {
    room = roomData.data;
  } else {
    const stored = sessionStorage.getItem("dataRoom");
    if (stored) {
      room = JSON.parse(stored);
    }
  }

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

  console.log(room);
  // getUser
  let userJson = null;

  const userStringLocal = localStorage.getItem("userLogin");
  const userStringSession = sessionStorage.getItem("userLogin");
  if (userStringLocal) {
    userJson = JSON.parse(userStringLocal);
  } else if (userStringSession) {
    userJson = JSON.parse(userStringSession);
  }

  const renderComment = () => {
    return comment?.map((cmt: Comments) => {
      return <CommentComponent key={cmt.id} cmt={cmt} />;
    });
  };
  return (
    <div className="container mx-auto my-10">
      <hr className="my-2" />
      <div className="">
        {room && (
          <div className="">
            <h1 className="text-2xl mb-2 font-semibold">{room.tenPhong}</h1>
            <div
              className="
            // grid place-items-center
            "
            >
              <img
                src={room.hinhAnh}
                alt=""
                className="rounded-2xl max-w-full max-h-full"
              />
            </div>
            <div className="my-10">
              <h1 className="text-lg ">
                Toàn bộ căn hộ, chủ nhà <b>{userJson?.name}</b>
              </h1>
              <div className="mt-2">
                <p className="text-gray-700 text-sm">
                  {room.khach} khách . {room.phongNgu} phòng ngủ . {room.giuong}{" "}
                  gường . {room.phongTam} phòng tắm
                </p>
              </div>
            </div>
          </div>
        )}
        {room && (
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8">
              <hr className="text-gray-600" />
              <div className="my-10">
                <div className="flex gap-5 items-center mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
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
                    <h4 className="text-md">Toàn bộ nhà</h4>
                    <p className="text-gray-700 text-sm">
                      Bạn sẽ có chung cư cao cấp cho riêng mình
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-center mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
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
                    <h4 className="text-md">Vệ sinh tăng cường</h4>
                    <p className="text-gray-700 text-sm">
                      Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng
                      cường 5 bước Aribnb.
                    </p>
                    <a href="font-bold">Hiển thị thêm</a>
                  </div>
                </div>
                <div className="flex gap-5 items-center mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
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
                    <h4 className="text-md">Phong là chủ nhà siêu cấp</h4>
                    <p className="text-gray-700 text-sm">
                      Chủ nhà siêu cấp là chủ nhà có kinh nghiệm, được đánh giá
                      cao và là những người cám kết mang lại quãng thời gian ở
                      tuyệt vời cho khách
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-center mb-7">
                  {/* icon  */}
                  <div className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
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
                    <h4 className="text-md">Miễn phí hủy trong 48h</h4>
                  </div>
                </div>
              </div>
              <hr />
              <div className="my-2">
                <div className="">
                  <h1 className="mb-2 font-semibold">Tiện nghi</h1>
                  <div className="flex gap-10">
                    <div className="col-span-1">
                      {room.bep ? (
                        <div className="mb-2">
                          <i className="fa-solid fa-kitchen-set"></i>{" "}
                          <span>Bếp</span>
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
                      {room.tivi ? (
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
                          <span>Bãi đổ xe</span>
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
                    <div className="col-span-1">
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

                  <hr />
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className=""></div>
            </div>
            <hr className="bg-gray-100" />
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {renderComment()}
      </div>
      <button
        type="button"
        className="flex   items-center mb-5 rounded-md cursor-pointer hover:bg-gray-100 text-body bg-neutral-primary border border-default hover:bg-neutral-secondary-soft hover:text-heading focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-3.5 focus:outline-none"
      >
        Hiển thị tất cả các bình luận
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 animate__fadeOutDown animate__animated  animate__infinite	infinite animate__slow	2s"
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
          {userJson?.hinhAnh ? (
            <img src={userJson?.hinhAnh} alt="" />
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
            className="w-[600px] h-[150px] rounded-2xl"
          ></textarea>
          <StarRating
            onChangeRating={(value: number) =>
              setData((prev) => ({ ...prev, saoBinhLuan: value }))
            }
          />
          <button
            onClick={() => {
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
