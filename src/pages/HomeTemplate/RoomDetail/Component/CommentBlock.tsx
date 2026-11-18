import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import type { Comments } from "../../ListLocal/getAPI/getComment.ts";
import Comment from "./Comment/comment";
import StarRating from "./Rate/Rating";
import { postComment } from "../getAPI/postComment";
import type { PostComment } from "../getAPI/postComment.ts";
import { getComment } from "../../ListLocal/getAPI/getComment";
import { readDemoSession } from "@/services/demoSession";
import { toast } from "react-hot-toast";

export default function CommentBlock({ comment, roomId }: { comment: Comments[]; roomId: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const [visibleCount, setVisibleCount] = useState(3);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const user = readDemoSession()?.user;
    if (!user) {
      toast.error("Bạn cần đăng nhập để tiếp tục.");
      document.getElementById("open-login-modal")?.click();
      return;
    }
    if (!content.trim() || !rating) {
      toast.error("Vui lòng nhập nội dung và chọn số sao.");
      return;
    }
    setLoading(true);
    const newComment: PostComment = {
      maPhong: roomId,
      maNguoiBinhLuan: user.id,
      ngayBinhLuan: new Date().toISOString(),
      noiDung: content.trim(),
      saoBinhLuan: rating,
    };
    try {
      await dispatch(postComment(newComment)).unwrap();
      setContent("");
      setRating(0);
      toast.success("Đã thêm bình luận");
      await dispatch(getComment(roomId));
    } catch {
      toast.error("Thêm bình luận thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="grid max-h-[400px] overflow-y-auto md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {comment?.slice(0, visibleCount).map((cmt) => (
          <Comment key={cmt.id} cmt={cmt} />
        ))}
      </div>

      {comment.length > 3 && <button
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
      </button>}

      <p className="text-2xl mb-2 font-medium"> Bình luận của bạn</p>

      <div className="flex gap-6 items-center">
        <textarea
          aria-label="Nội dung bình luận"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full sm:w-[400px] lg:w-[600px] h-[150px] rounded-2xl p-3 border"
        />

        <StarRating rating={rating} onChangeRating={setRating} />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="text-white bg-pink-500 cursor-pointer px-4 py-2 rounded-xl"
        >
          {loading ? "Đang thêm bình luận..." : "Thêm bình luận"}
        </button>
      </div>
    </>
  );
}
