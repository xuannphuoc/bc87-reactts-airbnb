import { Link } from "react-router-dom";
import type { UserData } from "../../_Type/type.tsx";
type Prop = {
  login: boolean;
  user: UserData | null;
  handleUser: () => void;
  logout: () => void;
};

export default function Avatar({ user, login, handleUser, logout }: Prop) {
  if (!user) return null;
  return (
    <div className={`${login ? "block" : "hidden"} relative`}>
      {/* Avatar */}
      <button
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="w-10 h-10 cursor-pointer  rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <img
          className="w-full h-full object-cover"
          src={user.avatar || "./images/avatar.png"}
          alt="user avatar"
        />
      </button>

      {/* Dropdown */}
      <div
        id="dropdownDelay"
        className="hidden absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
      >
        <ul className="py-2 text-sm text-gray-700 font-medium">
          <li>
            <Link
              to="/user"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded"
              onClick={handleUser}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              Xem hồ sơ
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="flex items-center cursor-pointer gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
