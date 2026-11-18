import AdminDialog from "../AdminDialog";

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

  return (
    <AdminDialog title="Thông tin cá nhân" onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={
                user.avatar || import.meta.env.BASE_URL + "images/avatar.png"
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
              <p className="text-gray-900 font-medium mt-1">{user.birthday}</p>
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

      <div className="border-t border-slate-200 px-6 py-4 text-right">
        <button type="button" onClick={onClose} className="admin-primary">
          Đóng
        </button>
      </div>
    </AdminDialog>
  );
}
