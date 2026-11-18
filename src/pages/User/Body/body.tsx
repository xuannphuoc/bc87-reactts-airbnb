import { readDemoSession } from "@/services/demoSession";
import { getUser } from "../getAPI/getUser";
import { type UserData } from "./../../HomeTemplate/components/_Type/type.tsx";
import { type AppDispatch, type RootState } from "../../../store";
import { type PutUser } from "../getAPI/putUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomByUser } from "../getAPI/getRoomByUser";
import { putUserReducer } from "../getAPI/putUser";
import Model from "./model.tsx";
import RoomCard from "./roomcard.tsx";
import UserPicture from "./userAvatar.tsx";
import Swal from "sweetalert2";
type Props = {
  user?: UserData | null;
};
export default function Body({ user }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [sessionUser] = useState(() => readDemoSession()?.user);
  const currentUser = user || sessionUser;
  const currentUserId = currentUser?.id;
  const [formUser, setFormUser] = useState<PutUser>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "USER",
  });

  useEffect(() => {
    if (!currentUser) return;
    const birthday = currentUser.birthday
      ? new Date(currentUser.birthday).toISOString().split("T")[0]
      : "";
    setFormUser({
      id: currentUser.id,
      name: currentUser.name ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.phone ?? "",
      birthday,
      gender: currentUser.gender ?? true,
      role: currentUser.role,
    });
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(putUserReducer(formUser)).unwrap();
      await dispatch(getUser(formUser.id));
    } catch (error) {
      void Swal.fire({ icon: "error", text: typeof error === "string" ? error : "Cập nhật thất bại" });
      return;
    }
    document.getElementById("flowbite-close-modal")?.click();
    Swal.fire({
      icon: "success",
      title: "Thành công!",
      text: "Thông tin cá nhân đã được cập nhật",
    });
  };

  // get the booked Room
  useEffect(() => {
    if (currentUserId) {
      dispatch(getRoomByUser(currentUserId));
    }
  }, [currentUserId, dispatch]);

  const { data, loading } = useSelector(
    (state: RootState) => state.roomByUserSlice
  );
  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row md:gap-8">
        {/* LEFT - Profile */}
        <div className="md:w-1/4 mb-6 md:mb-0">
          {currentUser && <UserPicture currentUser={currentUser} />}
        </div>

        {/* RIGHT - Info + Rooms */}
        <div className="md:w-3/4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              Xin chào tôi là {currentUser?.name}
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Bắt đầu tham gia vào 2021
            </p>
            <button
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="underline mt-2 inline-block hover:text-blue-400 sm:text-base cursor-pointer"
              type="button"
            >
              Chỉnh sửa hồ sơ
            </button>
          </div>

          {/* User Rooms */}
          <div className="m-2">
            <h2 className="text-xl font-semibold mb-4">Phòng bạn đã đặt</h2>
            <RoomCard data={data} loading={loading} />
          </div>
        </div>
      </div>

      <Model
        formUser={formUser}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
