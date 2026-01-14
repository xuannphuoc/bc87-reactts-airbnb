import type { PutUser } from "../getAPI/putUser.ts";
type Props = {
  formUser: PutUser;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
};
export default function Model({ formUser, handleChange, handleSubmit }: Props) {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-2xl border shadow-sm p-4 md:p-6">
          <button
            type="button"
            id="flowbite-close-modal"
            className="absolute top-3 right-2.5 text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-6 text-lg font-semibold text-body">
              Chỉnh sửa thông tin cá nhân
            </h3>

            <form
              className="flex flex-col gap-4 text-left"
              onSubmit={handleSubmit}
            >
              {/* Họ và tên */}
              <label className="flex flex-col text-sm">
                Họ và tên
                <input
                  type="text"
                  name="name"
                  value={formUser.name}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {!formUser.name && (
                  <span className="text-red-500 text-xs mt-1">
                    Tên không được để trống
                  </span>
                )}
              </label>

              {/* Email */}
              <label className="flex flex-col text-sm">
                Email
                <input
                  type="email"
                  name="email"
                  value={formUser.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formUser.email &&
                  !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formUser.email) && (
                    <span className="text-red-500 text-xs mt-1">
                      Email không hợp lệ
                    </span>
                  )}
              </label>

              {/* Số điện thoại */}
              <label className="flex flex-col text-sm">
                Số điện thoại
                <input
                  type="text"
                  name="phone"
                  value={formUser.phone}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {formUser.phone && !/^\d{10}$/.test(formUser.phone) && (
                  <span className="text-red-500 text-xs mt-1">
                    Số điện thoại phải đủ 10 số và chỉ chứa số
                  </span>
                )}
              </label>

              {/* Ngày sinh */}
              <label className="flex flex-col text-sm">
                Ngày sinh
                <input
                  type="date"
                  name="birthday"
                  value={formUser.birthday}
                  onChange={handleChange}
                  className="border rounded px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-red-400 hover:bg-red-600 cursor-pointer rounded-xl text-white px-4 py-2 focus:outline-none"
                  disabled={
                    !formUser.name ||
                    !formUser.email ||
                    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formUser.email) ||
                    !/^\d{10}$/.test(formUser.phone)
                  }
                >
                  Cập nhật thông tin
                </button>
                <button
                  type="button"
                  data-modal-hide="popup-modal"
                  className="rounded-xl bg-gray-200 hover:bg-gray-400 px-4 py-2 focus:outline-none"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
