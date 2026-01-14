import { useState } from "react";
import { type Comments } from "../../../ListLocal/getAPI/getComment";
type Props = {
  cmt: Comments;
};
export default function Comment({ cmt }: Props) {
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
}
