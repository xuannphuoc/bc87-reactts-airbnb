import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  setSelectedLocation,
  clearError,
  type Location,
  type LocationFormData,
} from "./slice";
import type { AppDispatch, RootState } from "./../../../../store/index";

export default function ManageLocation() {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const { locations, loading, error, selectedLocation } = useSelector(
    (state: RootState) => state.locationReducer
  );

  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState<LocationFormData>({
    tenViTri: "",
    tinhThanh: "",
    quocGia: "",
    hinhAnh: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLocations(locations);
  }, [locations]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (value) {
      const filtered = locations.filter(
        (location) =>
          location.tenViTri.toLowerCase().includes(value.toLowerCase()) ||
          location.tinhThanh.toLowerCase().includes(value.toLowerCase()) ||
          location.quocGia.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.tenViTri.trim()) {
      newErrors.tenViTri = "Tên vị trí là bắt buộc";
    } else if (formData.tenViTri.length < 3) {
      newErrors.tenViTri = "Tên vị trí phải có ít nhất 3 ký tự";
    }

    if (!formData.tinhThanh.trim()) {
      newErrors.tinhThanh = "Tỉnh thành là bắt buộc";
    }

    if (!formData.quocGia.trim()) {
      newErrors.quocGia = "Quốc gia là bắt buộc";
    }

    if (!formData.hinhAnh.trim()) {
      newErrors.hinhAnh = "URL hình ảnh là bắt buộc";
    } else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.hinhAnh)
    ) {
      newErrors.hinhAnh = "URL hình ảnh không hợp lệ";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
      hinhAnh: "",
    });
    setFormErrors({});
  };

  const handleAddLocation = async () => {
    if (!validateForm()) return;

    const result = await dispatch(createLocation(formData));

    if (createLocation.fulfilled.match(result)) {
      setShowAddModal(false);
      resetForm();
      alert("Thêm vị trí thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const handleEditLocation = async () => {
    if (!validateForm() || !selectedLocation) return;

    const result = await dispatch(
      updateLocation({ id: selectedLocation.id, data: formData })
    );

    if (updateLocation.fulfilled.match(result)) {
      setShowEditModal(false);
      resetForm();
      alert("Cập nhật vị trí thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const handleDeleteLocation = async () => {
    if (!selectedLocation) return;

    const result = await dispatch(deleteLocation(selectedLocation.id));

    if (deleteLocation.fulfilled.match(result)) {
      setShowDeleteModal(false);
      dispatch(setSelectedLocation(null));
      alert("Xóa vị trí thành công!");
    } else {
      alert("Lỗi: " + (result.payload as string));
    }
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (location: Location) => {
    dispatch(setSelectedLocation(location));
    setFormData({
      tenViTri: location.tenViTri,
      tinhThanh: location.tinhThanh,
      quocGia: location.quocGia,
      hinhAnh: location.hinhAnh,
    });
    setShowEditModal(true);
  };

  const openViewModal = (location: Location) => {
    dispatch(setSelectedLocation(location));
    setShowViewModal(true);
  };

  const openDeleteModal = (location: Location) => {
    dispatch(setSelectedLocation(location));
    setShowDeleteModal(true);
  };

  const Modal = ({ title, children, onClose }: any) => (
    <div className="fixed inset-0 bg-gray-900 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name as keyof LocationFormData]}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, [name]: e.target.value }));
          if (formErrors[name])
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }}
        className={`bg-gray-50 dark:bg-gray-700 border ${
          formErrors[name]
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-600"
        } text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full p-2.5 dark:placeholder-gray-400`}
        placeholder={placeholder}
      />
      {formErrors[name] && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <svg
                className="w-12 h-12 text-rose-600 dark:text-rose-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Quản lý Vị trí
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hệ thống Airbnb Admin
                </p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:bg-rose-600 dark:hover:bg-rose-700"
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
              Thêm vị trí
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block w-full pl-10 p-2.5 dark:placeholder-gray-400"
              placeholder="Tìm kiếm theo tên vị trí, tỉnh thành, quốc gia..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {loading && filteredLocations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Đang tải...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Hình ảnh</th>
                    <th className="px-6 py-3">Tên vị trí</th>
                    <th className="px-6 py-3">Tỉnh thành</th>
                    <th className="px-6 py-3">Quốc gia</th>
                    <th className="px-6 py-3 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLocations.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        Không tìm thấy vị trí nào
                      </td>
                    </tr>
                  ) : (
                    filteredLocations.map((location) => (
                      <tr
                        key={location.id}
                        className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {location.id}
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={location.hinhAnh}
                            alt={location.tenViTri}
                            className="w-16 h-16 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/64?text=No+Image";
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                          {location.tenViTri}
                        </td>
                        <td className="px-6 py-4">{location.tinhThanh}</td>
                        <td className="px-6 py-4">{location.quocGia}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openViewModal(location)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
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
                              onClick={() => openEditModal(location)}
                              className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
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
                              onClick={() => openDeleteModal(location)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
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
          <Modal title="Thêm vị trí mới" onClose={() => setShowAddModal(false)}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Tên vị trí"
                  name="tenViTri"
                  required
                  placeholder="Hồ Hoàn Kiếm"
                />
                <FormInput
                  label="Tỉnh thành"
                  name="tinhThanh"
                  required
                  placeholder="Hà Nội"
                />
                <FormInput
                  label="Quốc gia"
                  name="quocGia"
                  required
                  placeholder="Việt Nam"
                />
                <FormInput
                  label="URL hình ảnh"
                  name="hinhAnh"
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-gray-700">
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleAddLocation}
                disabled={loading}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
              >
                Thêm vị trí
              </button>
            </div>
          </Modal>
        )}

        {showEditModal && selectedLocation && (
          <Modal
            title="Chỉnh sửa vị trí"
            onClose={() => setShowEditModal(false)}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  label="Tên vị trí"
                  name="tenViTri"
                  required
                  placeholder="Hồ Hoàn Kiếm"
                />
                <FormInput
                  label="Tỉnh thành"
                  name="tinhThanh"
                  required
                  placeholder="Hà Nội"
                />
                <FormInput
                  label="Quốc gia"
                  name="quocGia"
                  required
                  placeholder="Việt Nam"
                />
                <FormInput
                  label="URL hình ảnh"
                  name="hinhAnh"
                  required
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-gray-700">
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleEditLocation}
                disabled={loading}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
              >
                Cập nhật
              </button>
            </div>
          </Modal>
        )}

        {showViewModal && selectedLocation && (
          <Modal
            title="Thông tin vị trí"
            onClose={() => setShowViewModal(false)}
          >
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={selectedLocation.hinhAnh}
                    alt={selectedLocation.tenViTri}
                    className="w-48 h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/192?text=No+Image";
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      ID
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {selectedLocation.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tên vị trí
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {selectedLocation.tenViTri}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Tỉnh thành
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {selectedLocation.tinhThanh}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Quốc gia
                    </p>
                    <p className="text-base text-gray-900 dark:text-white">
                      {selectedLocation.quocGia}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-gray-700">
              <button
                onClick={() => setShowViewModal(false)}
                className="text-white bg-rose-600 hover:bg-rose-700 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Đóng
              </button>
            </div>
          </Modal>
        )}

        {showDeleteModal && selectedLocation && (
          <Modal title="Xác nhận xóa" onClose={() => setShowDeleteModal(false)}>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600 dark:text-red-400"
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
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Xóa vị trí
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Bạn có chắc chắn muốn xóa vị trí{" "}
                    <strong>{selectedLocation.tenViTri}</strong>? Hành động này
                    không thể hoàn tác.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Hủy
              </button>
              <button
                onClick={handleDeleteLocation}
                disabled={loading}
                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
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
