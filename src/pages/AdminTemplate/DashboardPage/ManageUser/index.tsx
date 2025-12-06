import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  clearSuccess,
} from "./slice";
import type { AppDispatch, RootState } from "./../../../../store/index";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar?: string;
  gender: boolean;
  role: string;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  birthday: string;
  gender: string;
  role: string;
}

export default function ManageUser() {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error, success } = useSelector(
    (state: RootState) => state.userReducer
  );

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "USER",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value) {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.phone?.includes(value)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const validateForm = (isEdit: boolean = false): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email là bắt buộc";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (!isEdit && !formData.password)
      newErrors.password = "Mật khẩu là bắt buộc";
    else if (formData.password && formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (!formData.name) newErrors.name = "Họ tên là bắt buộc";
    if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc";
    else if (!/^[0-9]{10,11}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";
    if (!formData.gender) newErrors.gender = "Vui lòng chọn giới tính";
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      name: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "USER",
    });
    setFormErrors({});
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    const userData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone,
      birthday: formData.birthday || "01/01/2000",
      gender: formData.gender === "true",
      role: formData.role,
    };

    const result = await dispatch(createUser(userData));

    if (createUser.fulfilled.match(result)) {
      setShowAddModal(false);
      resetForm();
      alert("Thêm người dùng thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const handleEditUser = async () => {
    if (!validateForm(true) || !selectedUser) return;

    const userData = {
      id: selectedUser.id,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      birthday: formData.birthday || "01/01/2000",
      gender: formData.gender === "true",
      role: formData.role,
    };

    const result = await dispatch(updateUser(userData));

    if (updateUser.fulfilled.match(result)) {
      setShowEditModal(false);
      resetForm();
      alert("Cập nhật người dùng thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    const result = await dispatch(deleteUser(selectedUser.id));

    if (deleteUser.fulfilled.match(result)) {
      setShowDeleteModal(false);
      setSelectedUser(null);
      alert("Xóa người dùng thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: "",
      name: user.name,
      phone: user.phone,
      birthday: user.birthday || "",
      gender: user.gender.toString(),
      role: user.role,
    });
    setShowEditModal(true);
  };
  const openViewModal = (user: User) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const Modal = ({ title, children, onClose }: any) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const FormInput = ({
    label,
    name,
    type = "text",
    required = false,
    placeholder = "",
  }: any) => (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name as keyof FormData]}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, [name]: e.target.value }));
          if (formErrors[name])
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }}
        className={`bg-gray-50 border ${
          formErrors[name] ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
        placeholder={placeholder}
      />
      {formErrors[name] && (
        <p className="mt-2 text-sm text-red-600">{formErrors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <svg
                className="w-12 h-12 text-rose-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Quản lý Người dùng
                </h1>
                <p className="text-sm text-gray-500">Hệ thống Airbnb Admin</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Thêm người dùng
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">Thao tác thành công!</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 p-2.5"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading && filteredUsers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
              <p className="mt-2 text-gray-600">Đang tải...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Họ tên</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Số điện thoại</th>
                    <th className="px-6 py-3">Giới tính</th>
                    <th className="px-6 py-3">Vai trò</th>
                    <th className="px-6 py-3 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Không tìm thấy người dùng nào
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {user.id}
                        </td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              user.gender
                                ? "bg-blue-100 text-blue-800"
                                : "bg-pink-100 text-pink-800"
                            }`}
                          >
                            {user.gender ? "Nam" : "Nữ"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              user.role === "ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openViewModal(user)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Xem"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => openEditModal(user)}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="Sửa"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="text-red-600 hover:text-red-800"
                              title="Xóa"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showAddModal && (
          <Modal
            title="Thêm người dùng mới"
            onClose={() => setShowAddModal(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                />
                <FormInput
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                />
                <FormInput
                  label="Họ và tên"
                  name="name"
                  required
                  placeholder="Nguyễn Văn A"
                />
                <FormInput
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  required
                  placeholder="0912345678"
                />
                <FormInput label="Ngày sinh" name="birthday" type="date" />
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Giới tính <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                      if (formErrors.gender)
                        setFormErrors((prev) => ({ ...prev, gender: "" }));
                    }}
                    className={`bg-gray-50 border ${
                      formErrors.gender ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                  {formErrors.gender && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Vai trò
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
                  >
                    <option value="USER">Người dùng</option>
                    <option value="ADMIN">Quản trị viên</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleAddUser}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Thêm người dùng
              </button>
            </div>
          </Modal>
        )}

        {showEditModal && selectedUser && (
          <Modal
            title="Chỉnh sửa người dùng"
            onClose={() => setShowEditModal(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                />
                <FormInput
                  label="Họ và tên"
                  name="name"
                  required
                  placeholder="Nguyễn Văn A"
                />
                <FormInput
                  label="Số điện thoại"
                  name="phone"
                  type="tel"
                  required
                  placeholder="0912345678"
                />
                <FormInput label="Ngày sinh" name="birthday" type="date" />
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Giới tính <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }));
                      if (formErrors.gender)
                        setFormErrors((prev) => ({ ...prev, gender: "" }));
                    }}
                    className={`bg-gray-50 border ${
                      formErrors.gender ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                  </select>
                  {formErrors.gender && (
                    <p className="mt-2 text-sm text-red-600">
                      {formErrors.gender}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Vai trò
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5"
                  >
                    <option value="USER">Người dùng</option>
                    <option value="ADMIN">Quản trị viên</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleEditUser}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cập nhật
              </button>
            </div>
          </Modal>
        )}

        {showViewModal && selectedUser && (
          <Modal
            title="Thông tin người dùng"
            onClose={() => setShowViewModal(false)}
          >
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-rose-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID</p>
                    <p className="text-base text-gray-900">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Họ tên</p>
                    <p className="text-base text-gray-900">
                      {selectedUser.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-base text-gray-900">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Số điện thoại
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedUser.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Ngày sinh
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedUser.birthday || "Chưa cập nhật"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Giới tính
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedUser.gender ? "Nam" : "Nữ"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vai trò</p>
                    <p className="text-base text-gray-900">
                      {selectedUser.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Đóng
              </button>
            </div>
          </Modal>
        )}

        {showDeleteModal && selectedUser && (
          <Modal title="Xác nhận xóa" onClose={() => setShowDeleteModal(false)}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Xóa người dùng
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Bạn có chắc chắn muốn xóa người dùng{" "}
                    <strong>{selectedUser.name}</strong>? Hành động này không
                    thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteUser}
                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Xóa
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
