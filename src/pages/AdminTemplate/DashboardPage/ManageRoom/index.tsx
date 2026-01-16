import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./../../../../store/index";
import {
  fetchRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  uploadRoomImage,
  clearError,
  type Room,
} from "./silce";
import { Modal, Spinner } from "flowbite-react";
import { HiPlus, HiPencil, HiTrash, HiPhotograph, HiX } from "react-icons/hi";

interface FormErrors {
  tenPhong?: string;
  khach?: string;
  phongNgu?: string;
  giuong?: string;
  phongTam?: string;
  moTa?: string;
  giaTien?: string;
  maViTri?: string;
}

export default function ManageRoom() {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, isLoading, error } = useSelector(
    (state: RootState) => state.roomReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deletingRoomId, setDeletingRoomId] = useState<number | null>(null);
  const [uploadingRoomId, setUploadingRoomId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [formData, setFormData] = useState({
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
    hinhAnh: "",
  });

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "tenPhong":
        if (!value || value.trim() === "") {
          return "Tên phòng không được để trống";
        }
        if (value.length < 3) {
          return "Tên phòng phải có ít nhất 3 ký tự";
        }
        if (value.length > 100) {
          return "Tên phòng không được vượt quá 100 ký tự";
        }
        break;

      case "khach":
        if (value === "" || value === null || value === undefined) {
          return "Số khách không được để trống";
        }
        if (Number(value) < 1) {
          return "Số khách phải lớn hơn 0";
        }
        if (Number(value) > 50) {
          return "Số khách không được vượt quá 50";
        }
        break;

      case "phongNgu":
        if (value === "" || value === null || value === undefined) {
          return "Số phòng ngủ không được để trống";
        }
        if (Number(value) < 0) {
          return "Số phòng ngủ không được nhỏ hơn 0";
        }
        if (Number(value) > 20) {
          return "Số phòng ngủ không được vượt quá 20";
        }
        break;

      case "giuong":
        if (value === "" || value === null || value === undefined) {
          return "Số giường không được để trống";
        }
        if (Number(value) < 1) {
          return "Số giường phải lớn hơn 0";
        }
        if (Number(value) > 30) {
          return "Số giường không được vượt quá 30";
        }
        break;

      case "phongTam":
        if (value === "" || value === null || value === undefined) {
          return "Số phòng tắm không được để trống";
        }
        if (Number(value) < 1) {
          return "Số phòng tắm phải lớn hơn 0";
        }
        if (Number(value) > 20) {
          return "Số phòng tắm không được vượt quá 20";
        }
        break;

      case "moTa":
        if (!value || value.trim() === "") {
          return "Mô tả không được để trống";
        }
        if (value.length < 10) {
          return "Mô tả phải có ít nhất 10 ký tự";
        }
        if (value.length > 1000) {
          return "Mô tả không được vượt quá 1000 ký tự";
        }
        break;

      case "giaTien":
        if (value === "" || value === null || value === undefined) {
          return "Giá tiền không được để trống";
        }
        if (Number(value) < 0) {
          return "Giá tiền phải lớn hơn hoặc bằng 0";
        }
        if (Number(value) > 100000000) {
          return "Giá tiền không được vượt quá 100,000,000";
        }
        break;

      case "maViTri":
        if (value === "" || value === null || value === undefined) {
          return "Mã vị trí không được để trống";
        }
        if (Number(value) < 1) {
          return "Mã vị trí phải lớn hơn 0";
        }
        break;

      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (
        key !== "hinhAnh" &&
        !key.startsWith("may") &&
        !key.startsWith("ban") &&
        key !== "tivi" &&
        key !== "dieuHoa" &&
        key !== "wifi" &&
        key !== "bep" &&
        key !== "doXe" &&
        key !== "hoBoi" &&
        key !== "banUi"
      ) {
        const error = validateField(
          key,
          formData[key as keyof typeof formData]
        );
        if (error) {
          errors[key as keyof FormErrors] = error;
          isValid = false;
        }
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleOpenModal = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        tenPhong: room.tenPhong,
        khach: room.khach,
        phongNgu: room.phongNgu,
        giuong: room.giuong,
        phongTam: room.phongTam,
        moTa: room.moTa,
        giaTien: room.giaTien,
        mayGiat: room.mayGiat,
        banLa: room.banLa,
        tivi: room.tivi,
        dieuHoa: room.dieuHoa,
        wifi: room.wifi,
        bep: room.bep,
        doXe: room.doXe,
        hoBoi: room.hoBoi,
        banUi: room.banUi,
        maViTri: room.maViTri,
        hinhAnh: room.hinhAnh,
      });
    } else {
      setEditingRoom(null);
      setFormData({
        tenPhong: "",
        khach: 1,
        phongNgu: 1,
        giuong: 1,
        phongTam: 1,
        moTa: "",
        giaTien: 0,
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        banUi: false,
        maViTri: 1,
        hinhAnh: "",
      });
    }
    setFormErrors({});
    setTouched({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRoom(null);
    setFormErrors({});
    setTouched({});
    dispatch(clearError());
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const newValue =
      type === "checkbox" ? checked : type === "number" ? Number(value) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (touched[name]) {
      const error = validateField(name, newValue);
      setFormErrors({
        ...formErrors,
        [name]: error,
      });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true,
    });

    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    try {
      if (editingRoom) {
        await dispatch(
          updateRoom({ id: editingRoom.id, roomData: formData })
        ).unwrap();
      } else {
        await dispatch(createRoom(formData)).unwrap();
      }
      handleCloseModal();
      dispatch(fetchRooms());
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingRoomId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingRoomId) {
      try {
        await dispatch(deleteRoom(deletingRoomId)).unwrap();
        setShowDeleteModal(false);
        setDeletingRoomId(null);
        dispatch(fetchRooms());
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  const handleImageClick = (roomId: number) => {
    setUploadingRoomId(roomId);
    setImageFile(null);
    setImagePreview("");
    setShowImageModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Vui lòng chọn file ảnh hợp lệ (JPEG, PNG, GIF, WebP)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Kích thước file không được vượt quá 5MB");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (uploadingRoomId && imageFile) {
      try {
        const formData = new FormData();
        formData.append("formFile", imageFile);
        await dispatch(
          uploadRoomImage({ roomId: uploadingRoomId, formData })
        ).unwrap();
        setShowImageModal(false);
        setUploadingRoomId(null);
        setImageFile(null);
        setImagePreview("");
        dispatch(fetchRooms());
      } catch (err) {
        console.error("Error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-white rounded-lg shadow mb-6 p-6">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <svg
                className="w-12 h-12 text-rose-600 dark:text-rose-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                  Quản Lý Phòng
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Hệ thống Airbnb Admin
                </p>
              </div>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Thêm Phòng
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <HiX className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="xl" color="pink" />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto lg:h-[50vh] xl:h-[65vh] ">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hình ảnh
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tên phòng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Khách
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phòng ngủ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Giá tiền
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Vị trí
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rooms.map((room) => (
                    <tr
                      key={room.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {room.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {room.hinhAnh ? (
                          <img
                            src={room.hinhAnh}
                            alt={room.tenPhong}
                            className="h-14 w-14 rounded-lg object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                            <HiPhotograph className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {room.tenPhong}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {room.khach} người
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {room.phongNgu} phòng
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${room.giaTien}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {room.maViTri}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleImageClick(room.id)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Tải ảnh"
                          >
                            <HiPhotograph className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenModal(room)}
                            className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <HiPencil className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(room.id)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Modal show={showModal} onClose={handleCloseModal} size="4xl">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingRoom ? "Chỉnh sửa phòng" : "Thêm phòng mới"}
            </h3>
            <button
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
            >
              <HiX className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Thông tin cơ bản
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="tenPhong"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên phòng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="tenPhong"
                      name="tenPhong"
                      value={formData.tenPhong}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.tenPhong && formErrors.tenPhong
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.tenPhong && formErrors.tenPhong && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.tenPhong}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="giaTien"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Giá tiền ($/đêm) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="giaTien"
                      name="giaTien"
                      value={formData.giaTien}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.giaTien && formErrors.giaTien
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.giaTien && formErrors.giaTien && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.giaTien}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Chi tiết phòng
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label
                      htmlFor="khach"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số khách <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="khach"
                      name="khach"
                      value={formData.khach}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.khach && formErrors.khach
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.khach && formErrors.khach && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.khach}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phongNgu"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phòng ngủ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="phongNgu"
                      name="phongNgu"
                      value={formData.phongNgu}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.phongNgu && formErrors.phongNgu
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.phongNgu && formErrors.phongNgu && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.phongNgu}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="giuong"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số giường <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="giuong"
                      name="giuong"
                      value={formData.giuong}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.giuong && formErrors.giuong
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.giuong && formErrors.giuong && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.giuong}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phongTam"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phòng tắm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="phongTam"
                      name="phongTam"
                      value={formData.phongTam}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`bg-gray-50 border ${
                        touched.phongTam && formErrors.phongTam
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                    />
                    {touched.phongTam && formErrors.phongTam && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.phongTam}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="maViTri"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mã vị trí <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="maViTri"
                  name="maViTri"
                  value={formData.maViTri}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`bg-gray-50 border ${
                    touched.maViTri && formErrors.maViTri
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                />
                {touched.maViTri && formErrors.maViTri && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.maViTri}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="moTa"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mô tả <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="moTa"
                  name="moTa"
                  rows={4}
                  value={formData.moTa}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Nhập mô tả chi tiết về phòng..."
                  className={`bg-gray-50 border ${
                    touched.moTa && formErrors.moTa
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400`}
                />
                {touched.moTa && formErrors.moTa && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {formErrors.moTa}
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tiện nghi
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "mayGiat", label: "Máy giặt" },
                    { id: "banLa", label: "Bàn là" },
                    { id: "tivi", label: "Tivi" },
                    { id: "dieuHoa", label: "Điều hòa" },
                    { id: "wifi", label: "Wifi" },
                    { id: "bep", label: "Bếp" },
                    { id: "doXe", label: "Đỗ xe" },
                    { id: "hoBoi", label: "Hồ bơi" },
                    { id: "banUi", label: "Bàn ủi" },
                  ].map((amenity) => (
                    <div key={amenity.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity.id}
                        name={amenity.id}
                        checked={
                          formData[
                            amenity.id as keyof typeof formData
                          ] as boolean
                        }
                        onChange={handleInputChange}
                        className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 dark:focus:ring-rose-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={amenity.id}
                        className="ml-2 text-sm text-gray-900 dark:text-gray-300"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && <Spinner size="sm" className="mr-2" />}
                {editingRoom ? "Cập nhật" : "Thêm phòng"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        show={showDeleteModal}
        size="md"
        onClose={() => setShowDeleteModal(false)}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
              <HiTrash className="h-6 w-6 text-red-600 dark:text-red-500" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Xác nhận xóa phòng
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa phòng này không? Hành động này không thể
              hoàn tác.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isLoading}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isLoading && <Spinner size="sm" className="mr-2" />}
                Xóa phòng
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        show={showImageModal}
        onClose={() => setShowImageModal(false)}
        size="lg"
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Tải ảnh phòng
            </h3>
            <button
              onClick={() => setShowImageModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chọn ảnh <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiPhotograph className="w-10 h-10 mb-2 text-gray-400 dark:text-gray-500" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click để tải ảnh</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF hoặc WEBP (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <HiX className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowImageModal(false)}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleImageUpload}
              disabled={!imageFile || isLoading}
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Spinner size="sm" className="mr-2" />}
              Tải lên
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
