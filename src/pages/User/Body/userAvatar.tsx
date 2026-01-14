import type { UserData } from "@/pages/HomeTemplate/components/_Type/type.tsx";
import { getUser } from "../getAPI/getUser.ts";
import type { AppDispatch, RootState } from "@/store/index.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { putAvatar } from "./../getAPI/uploadAvatar.ts";
type Props = {
  currentUser: UserData;
};
export default function UserPicture({ currentUser }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("formFile", file);

    try {
      await dispatch(putAvatar(formData)).unwrap();

      dispatch(getUser(currentUser.id));

      setToast({
        type: "success",
        message: "Cập nhật ảnh đại diện thành công 🎉",
      });
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({
        type: "error",
        message: "Cập nhật thất bại 😢",
      });
      setTimeout(() => setToast(null), 3000);
    }
  };

  const { data: uploadedUser, loading } = useSelector(
    (state: RootState) => state.putAvatarSlice
  );
  useEffect(() => {
    if (uploadedUser?.avatar) {
      setPreview(null);
      setFile(null);
    }
  }, [uploadedUser]);
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm flex flex-col items-center">
      {toast && (
        <div
          className={`
      fixed top-4 right-4 z-50
      px-4 py-3 rounded-lg shadow-lg text-white
      transition-all duration-500
      animate-slide-down
      ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
    `}
        >
          {toast.message}
        </div>
      )}{" "}
      {/* Avatar  */}
      <div className="relative group w-40 h-40 rounded-full overflow-hidden cursor-pointer">
        <img
          src={
            preview ||
            uploadedUser?.avatar ||
            currentUser.avatar ||
            "/images/avatar.png"
          }
          alt="avatar"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm">
          Thay ảnh
        </div>

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
      {preview ? (
        <button
          disabled={loading}
          onClick={handleUpload}
          className={`px-4 mt-2 py-2 rounded-lg text-white transition
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-pink-500 hover:bg-pink-600"
    }
  `}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật ảnh"}
        </button>
      ) : null}
      <div className="mt-6 w-full">
        <h4 className="font-bold text-lg mb-1 text-center md:text-left">
          Xác minh danh tính
        </h4>
        <p className="text-sm text-gray-600 mb-3 text-center md:text-left">
          Xác thực danh tính của bạn với huy hiệu xác minh danh tính
        </p>
        <button className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium">
          Nhận huy hiệu
        </button>
      </div>
      <hr className="my-5 w-full" />
      <div className="w-full text-center md:text-left">
        <h5 className="font-semibold">{currentUser?.name || "..."} đã nhận</h5>
        <p className="text-sm mt-1 flex items-center justify-center md:justify-start gap-1">
          <i className="fa-solid fa-check text-blue-500"></i> Địa chỉ email:{" "}
          {currentUser.email}
        </p>
      </div>
    </div>
  );
}
