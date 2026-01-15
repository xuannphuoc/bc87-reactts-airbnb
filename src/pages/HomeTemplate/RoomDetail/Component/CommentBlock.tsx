import { Modal } from "flowbite";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import type { Comments } from "../../ListLocal/getAPI/getComment.ts";
import Comment from "./Comment/comment";
import StarRating from "./Rate/Rating";
import { postComment } from "../getAPI/postComment";
import type { PostComment } from "../getAPI/postComment.ts";
interface Props {
  comment: Comments[];
  data: PostComment;
  setData: React.Dispatch<React.SetStateAction<PostComment>>;
  userData: any;
  loading: boolean;
}

export default function CommentBlock({
  comment,
  data,
  setData,
  userData,
  loading,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCount, setVisibleCount] = useState(3);

  return (
    <>
      <div className="grid max-h-[400px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {comment?.slice(0, visibleCount).map((cmt) => (
          <Comment key={cmt.id} cmt={cmt} />
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          visibleCount < comment.length
            ? setVisibleCount(comment.length)
            : setVisibleCount(3)
        }
        className="flex items-center mb-5 rounded-md cursor-pointer hover:bg-gray-100"
      >
        {visibleCount < comment.length
          ? "Hiển thị tất cả các bình luận"
          : "Thu gọn "}
      </button>

      <p className="text-2xl mb-2 font-medium"> Bình luận của bạn</p>

      <div className="flex gap-6 items-center">
        <textarea
          value={data.noiDung}
          onChange={(e) =>
            setData((prev) => ({ ...prev, noiDung: e.target.value }))
          }
          className="w-full sm:w-[400px] lg:w-[600px] h-[150px] rounded-2xl p-3 border"
        />

        <StarRating
          onChangeRating={(value) =>
            setData((prev) => ({ ...prev, saoBinhLuan: value }))
          }
        />

        <button
          onClick={() => {
            if (!userData) {
              alert("Bạn cần đăng nhập để tiếp tục!");
              const modalEl = document.getElementById("authentication-modal");
              if (modalEl) {
                const modal = new Modal(modalEl);
                modal.show();
              }
              return;
            }
            dispatch(postComment(data));
          }}
          className="text-white bg-pink-500 cursor-pointer px-4 py-2 rounded-xl"
        >
          {loading ? "Đang thêm bình luận..." : "Thêm bình luận"}
        </button>
      </div>
    </>
  );
}
