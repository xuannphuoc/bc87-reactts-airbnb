import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./../../../../store";
import { fetchUserInfo } from "./slice";
import { logoutUser } from "./../../AuthPage/slice";
import { useNavigate } from "react-router-dom";
import UserProfileModal from "./userProfileModal";

export default function Topbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector(
    (state: RootState) => state.userTbReducer
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOpenProfile = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/auth");
    }
  };

  const getAvatarUrl = () => {
    if (currentUser?.avatar) {
      return currentUser.avatar;
    }
    if (currentUser?.name) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        currentUser.name
      )}&background=random`;
    }
    return "https://flowbite.com/docs/images/people/profile-picture-5.jpg";
  };

  return (
    <>
      <div
        className=""
        style={{
          height: 60,
          borderBottom: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          fontWeight: 600,
        }}
      >
        Admin
        <div className="flex items-center">
          <div className="flex items-center ms-3 relative" ref={dropdownRef}>
            <div>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
                ) : (
                  <img
                    className="w-8 h-8 rounded-full object-cover"
                    src={getAvatarUrl()}
                    alt="user photo"
                  />
                )}
              </button>
            </div>

            <div
              className={`absolute right-0 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-56 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <div className="px-4 py-3 border-b border-gray-200">
                {loading ? (
                  <>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </>
                ) : currentUser ? (
                  <>
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {currentUser.email}
                    </p>
                    {currentUser.role && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        {currentUser.role}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-900">
                      Guest User
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      guest@example.com
                    </p>
                  </>
                )}
              </div>

              <ul className="p-2 text-sm text-gray-700 font-medium">
                <li>
                  <button
                    onClick={handleOpenProfile}
                    className="inline-flex items-center w-full p-2 hover:bg-gray-100 hover:text-gray-900 rounded text-left"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Thông tin cá nhân
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center w-full p-2 hover:bg-red-50 hover:text-red-600 rounded text-left"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <UserProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={currentUser}
      />
    </>
  );
}
