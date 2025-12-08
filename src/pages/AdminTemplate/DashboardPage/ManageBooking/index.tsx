import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  setSelectedBooking,
  clearSelectedBooking,
  type Booking,
} from "./slice";

interface FormData {
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
}

const Modal = ({ title, children, onClose }: any) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
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
  min,
  value,
  onChange,
  error,
}: any) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      type={type}
      name={name}
      min={min}
      value={value || ""}
      onChange={onChange}
      className={`bg-gray-50 border ${
        error ? "border-red-500" : "border-gray-300"
      } text-gray-900 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5`}
      placeholder={placeholder}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default function ManageBooking() {
  const dispatch = useDispatch<AppDispatch>();
  const { bookings, loading, error, selectedBooking } = useSelector(
    (state: RootState) => state.bookingReducer
  );

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    maPhong: 0,
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 1,
    maNguoiDung: 0,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi search

    if (value) {
      const filtered = bookings.filter(
        (booking) =>
          booking.id.toString().includes(value) ||
          booking.maPhong.toString().includes(value) ||
          booking.maNguoiDung.toString().includes(value)
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.maPhong || formData.maPhong <= 0)
      newErrors.maPhong = "Mã phòng là bắt buộc";
    if (!formData.maNguoiDung || formData.maNguoiDung <= 0)
      newErrors.maNguoiDung = "Mã người dùng là bắt buộc";
    if (!formData.ngayDen) newErrors.ngayDen = "Ngày đến là bắt buộc";
    if (!formData.ngayDi) newErrors.ngayDi = "Ngày đi là bắt buộc";
    if (
      formData.ngayDen &&
      formData.ngayDi &&
      formData.ngayDen >= formData.ngayDi
    )
      newErrors.ngayDi = "Ngày đi phải sau ngày đến";
    if (!formData.soLuongKhach || formData.soLuongKhach <= 0)
      newErrors.soLuongKhach = "Số lượng khách phải lớn hơn 0";

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      maPhong: 0,
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: 1,
      maNguoiDung: 0,
    });
    setFormErrors({});
  };

  const handleAddBooking = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(createBooking(formData)).unwrap();
      setShowAddModal(false);
      resetForm();
      alert("Thêm đặt phòng thành công!");
      dispatch(fetchBookings());
    } catch (err: any) {
      alert("Lỗi: " + err);
    }
  };

  const handleEditBooking = async () => {
    if (!validateForm() || !selectedBooking) return;

    try {
      await dispatch(
        updateBooking({
          id: selectedBooking.id,
          bookingData: { ...formData, id: selectedBooking.id },
        })
      ).unwrap();
      setShowEditModal(false);
      resetForm();
      alert("Cập nhật đặt phòng thành công!");
      dispatch(fetchBookings());
    } catch (err: any) {
      alert("Lỗi: " + err);
    }
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    try {
      await dispatch(deleteBooking(selectedBooking.id)).unwrap();
      setShowDeleteModal(false);
      dispatch(clearSelectedBooking());
      alert("Xóa đặt phòng thành công!");
      dispatch(fetchBookings());
    } catch (err: any) {
      alert("Lỗi: " + err);
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (booking: Booking) => {
    dispatch(setSelectedBooking(booking));
    setFormData({
      maPhong: booking.maPhong,
      ngayDen: booking.ngayDen.split("T")[0],
      ngayDi: booking.ngayDi.split("T")[0],
      soLuongKhach: booking.soLuongKhach,
      maNguoiDung: booking.maNguoiDung,
    });
    setShowEditModal(true);
  };

  const openViewModal = (booking: Booking) => {
    dispatch(setSelectedBooking(booking));
    setShowViewModal(true);
  };

  const openDeleteModal = (booking: Booking) => {
    dispatch(setSelectedBooking(booking));
    setShowDeleteModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

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
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Quản lý Đặt phòng
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
              Thêm đặt phòng
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
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
              placeholder="Tìm kiếm theo ID, mã phòng, mã người dùng..."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading && filteredBookings.length === 0 ? (
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
                    <th className="px-6 py-3">Mã phòng</th>
                    <th className="px-6 py-3">Ngày đến</th>
                    <th className="px-6 py-3">Ngày đi</th>
                    <th className="px-6 py-3">Số khách</th>
                    <th className="px-6 py-3">Mã người dùng</th>
                    <th className="px-6 py-3 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Không tìm thấy đặt phòng nào
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((booking) => (
                      <tr
                        key={booking.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4">{booking.maPhong}</td>
                        <td className="px-6 py-4">
                          {formatDate(booking.ngayDen)}
                        </td>
                        <td className="px-6 py-4">
                          {formatDate(booking.ngayDi)}
                        </td>
                        <td className="px-6 py-4">{booking.soLuongKhach}</td>
                        <td className="px-6 py-4">{booking.maNguoiDung}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openViewModal(booking)}
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
                              onClick={() => openEditModal(booking)}
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
                              onClick={() => openDeleteModal(booking)}
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

        {filteredBookings.length > 0 && (
          <div className="bg-white rounded-lg shadow mt-4 p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Hiển thị{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> đến{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredBookings.length)}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-medium">{filteredBookings.length}</span>{" "}
                kết quả
              </div>

              <nav aria-label="Page navigation">
                <ul className="inline-flex -space-x-px text-sm">
                  <li>
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-l-lg ${
                        currentPage === 1
                          ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      <svg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 1 1 5l4 4"
                        />
                      </svg>
                    </button>
                  </li>

                  {getPageNumbers().map((page, index) => (
                    <li key={index}>
                      {page === "..." ? (
                        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => paginate(page as number)}
                          className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                            currentPage === page
                              ? "text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700"
                              : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-r-lg ${
                        currentPage === totalPages
                          ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                          : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                      }`}
                    >
                      <svg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}

        {showAddModal && (
          <Modal
            title="Thêm đặt phòng mới"
            onClose={() => setShowAddModal(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Mã phòng"
                  name="maPhong"
                  type="number"
                  required
                  placeholder="Nhập mã phòng"
                  min="1"
                  value={formData.maPhong}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value) || 0;
                    setFormData((prev) => ({ ...prev, maPhong: value }));
                    if (formErrors.maPhong)
                      setFormErrors((prev) => ({ ...prev, maPhong: "" }));
                  }}
                  error={formErrors.maPhong}
                />
                <FormInput
                  label="Mã người dùng"
                  name="maNguoiDung"
                  type="number"
                  required
                  placeholder="Nhập mã người dùng"
                  min="1"
                  value={formData.maNguoiDung}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value) || 0;
                    setFormData((prev) => ({ ...prev, maNguoiDung: value }));
                    if (formErrors.maNguoiDung)
                      setFormErrors((prev) => ({ ...prev, maNguoiDung: "" }));
                  }}
                  error={formErrors.maNguoiDung}
                />
                <FormInput
                  label="Ngày đến"
                  name="ngayDen"
                  type="date"
                  required
                  value={formData.ngayDen}
                  onChange={(e: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      ngayDen: e.target.value,
                    }));
                    if (formErrors.ngayDen)
                      setFormErrors((prev) => ({ ...prev, ngayDen: "" }));
                  }}
                  error={formErrors.ngayDen}
                />
                <FormInput
                  label="Ngày đi"
                  name="ngayDi"
                  type="date"
                  required
                  value={formData.ngayDi}
                  onChange={(e: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      ngayDi: e.target.value,
                    }));
                    if (formErrors.ngayDi)
                      setFormErrors((prev) => ({ ...prev, ngayDi: "" }));
                  }}
                  error={formErrors.ngayDi}
                />
                <FormInput
                  label="Số lượng khách"
                  name="soLuongKhach"
                  type="number"
                  required
                  placeholder="Nhập số lượng khách"
                  min="1"
                  value={formData.soLuongKhach}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 1 : parseInt(e.target.value) || 1;
                    setFormData((prev) => ({ ...prev, soLuongKhach: value }));
                    if (formErrors.soLuongKhach)
                      setFormErrors((prev) => ({ ...prev, soLuongKhach: "" }));
                  }}
                  error={formErrors.soLuongKhach}
                />
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
                onClick={handleAddBooking}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Thêm đặt phòng
              </button>
            </div>
          </Modal>
        )}

        {showEditModal && selectedBooking && (
          <Modal
            title="Chỉnh sửa đặt phòng"
            onClose={() => setShowEditModal(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Mã phòng"
                  name="maPhong"
                  type="number"
                  required
                  placeholder="Nhập mã phòng"
                  min="1"
                  value={formData.maPhong}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value) || 0;
                    setFormData((prev) => ({ ...prev, maPhong: value }));
                    if (formErrors.maPhong)
                      setFormErrors((prev) => ({ ...prev, maPhong: "" }));
                  }}
                  error={formErrors.maPhong}
                />
                <FormInput
                  label="Mã người dùng"
                  name="maNguoiDung"
                  type="number"
                  required
                  placeholder="Nhập mã người dùng"
                  min="1"
                  value={formData.maNguoiDung}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 0 : parseInt(e.target.value) || 0;
                    setFormData((prev) => ({ ...prev, maNguoiDung: value }));
                    if (formErrors.maNguoiDung)
                      setFormErrors((prev) => ({ ...prev, maNguoiDung: "" }));
                  }}
                  error={formErrors.maNguoiDung}
                />
                <FormInput
                  label="Ngày đến"
                  name="ngayDen"
                  type="date"
                  required
                  value={formData.ngayDen}
                  onChange={(e: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      ngayDen: e.target.value,
                    }));
                    if (formErrors.ngayDen)
                      setFormErrors((prev) => ({ ...prev, ngayDen: "" }));
                  }}
                  error={formErrors.ngayDen}
                />
                <FormInput
                  label="Ngày đi"
                  name="ngayDi"
                  type="date"
                  required
                  value={formData.ngayDi}
                  onChange={(e: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      ngayDi: e.target.value,
                    }));
                    if (formErrors.ngayDi)
                      setFormErrors((prev) => ({ ...prev, ngayDi: "" }));
                  }}
                  error={formErrors.ngayDi}
                />
                <FormInput
                  label="Số lượng khách"
                  name="soLuongKhach"
                  type="number"
                  required
                  placeholder="Nhập số lượng khách"
                  min="1"
                  value={formData.soLuongKhach}
                  onChange={(e: any) => {
                    const value =
                      e.target.value === "" ? 1 : parseInt(e.target.value) || 1;
                    setFormData((prev) => ({ ...prev, soLuongKhach: value }));
                    if (formErrors.soLuongKhach)
                      setFormErrors((prev) => ({ ...prev, soLuongKhach: "" }));
                  }}
                  error={formErrors.soLuongKhach}
                />
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
                onClick={handleEditBooking}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Cập nhật
              </button>
            </div>
          </Modal>
        )}

        {showViewModal && selectedBooking && (
          <Modal
            title="Thông tin đặt phòng"
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
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID</p>
                    <p className="text-base text-gray-900">
                      {selectedBooking.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Mã phòng
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedBooking.maPhong}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Ngày đến
                    </p>
                    <p className="text-base text-gray-900">
                      {formatDate(selectedBooking.ngayDen)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ngày đi</p>
                    <p className="text-base text-gray-900">
                      {formatDate(selectedBooking.ngayDi)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Số lượng khách
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedBooking.soLuongKhach}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Mã người dùng
                    </p>
                    <p className="text-base text-gray-900">
                      {selectedBooking.maNguoiDung}
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

        {showDeleteModal && selectedBooking && (
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
                    Xóa đặt phòng
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Bạn có chắc chắn muốn xóa đặt phòng{" "}
                    <strong>ID: {selectedBooking.id}</strong>? Hành động này
                    không thể hoàn tác.
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
                onClick={handleDeleteBooking}
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
