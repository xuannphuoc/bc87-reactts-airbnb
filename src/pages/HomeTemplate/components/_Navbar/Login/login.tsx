import { Link } from "react-router-dom";
export default function Login({ login }: { login: boolean }) {
  return (
    <div>
      {!login && (
        <div className="relative">
          <button
            id="dropdownHoverButton"
            data-dropdown-toggle="dropdownHover"
            className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <i className="fa-solid fa-user-plus text-gray-600"></i>
          </button>

          <div
            id="dropdownHover"
            className="hidden absolute right-0 mt-2 w-35 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
          >
            <ul className="py-2 text-sm text-gray-700 font-medium">
              <li>
                <button
                  data-modal-target="authentication-modal"
                  data-modal-toggle="authentication-modal"
                  className="block text-blue-400 w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <i className="fa-solid fa-arrow-left" />

                  <span className="ml-1">Đăng nhập</span>
                </button>
              </li>

              <li>
                <button
                  data-modal-target="crypto-modal"
                  data-modal-toggle="crypto-modal"
                  className="text-green-500 block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  <i className="fa-solid fa-registered" />
                  <span className="ml-1">Đăng ký</span>
                </button>
              </li>
              <Link to="/admin">
                <button className="text-red-500 block w-full text-left px-4 py-2 hover:bg-gray-100">
                  <i className="fa-solid fa-circle-user" /> admin
                </button>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
