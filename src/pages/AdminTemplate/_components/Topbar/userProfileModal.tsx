interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone?: string;
    birthday?: string;
    avatar?: string;
    gender?: boolean;
    role?: string;
    id?: number;
  } | null;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  user,
}: UserProfileModalProps) {
  if (!isOpen || !user) return null;

  const handleEdit = () => {
    window.location.href = "/admin/profile/edit";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-inline-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-xl font-semibold text-white">
            Thông tin cá nhân
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={
                  user.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&size=120&background=random`
                }
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              />
              {user.role && (
                <span className="absolute bottom-0 right-0 px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">
                  {user.role}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-3">
              <label className="text-xs text-gray-500 uppercase font-semibold">
                Họ tên
              </label>
              <p className="text-gray-900 font-medium mt-1">{user.name}</p>
            </div>

            <div className="border-b pb-3">
              <label className="text-xs text-gray-500 uppercase font-semibold">
                Email
              </label>
              <p className="text-gray-900 font-medium mt-1">{user.email}</p>
            </div>

            {user.phone && (
              <div className="border-b pb-3">
                <label className="text-xs text-gray-500 uppercase font-semibold">
                  Số điện thoại
                </label>
                <p className="text-gray-900 font-medium mt-1">{user.phone}</p>
              </div>
            )}

            {user.birthday && (
              <div className="border-b pb-3">
                <label className="text-xs text-gray-500 uppercase font-semibold">
                  Ngày sinh
                </label>
                <p className="text-gray-900 font-medium mt-1">
                  {user.birthday}
                </p>
              </div>
            )}

            {user.gender !== undefined && (
              <div className="border-b pb-3">
                <label className="text-xs text-gray-500 uppercase font-semibold">
                  Giới tính
                </label>
                <p className="text-gray-900 font-medium mt-1">
                  {user.gender ? "Nam" : "Nữ"}
                </p>
              </div>
            )}

            {user.id && (
              <div className="pb-3">
                <label className="text-xs text-gray-500 uppercase font-semibold">
                  ID
                </label>
                <p className="text-gray-900 font-medium mt-1">{user.id}</p>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
