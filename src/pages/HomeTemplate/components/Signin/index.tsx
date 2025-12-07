import { useState, useEffect } from "react";
import { type AppDispatch, type RootState } from "../../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./slice";
import { type StateInitial } from "./slice";
import { type User } from "../Navbar";
import { initFlowbite } from "flowbite";
interface SigninProps {
  onLoginSuccess: (user: User) => void;
}
export type Account = {
  email: string;
  password: string;
};
export default function Signin({ onLoginSuccess }: SigninProps) {
  const [acount, setCount] = useState({
    email: "",
    password: "",
  });
  const renderFlowbite = () => {
    setTimeout(() => {
      initFlowbite();
    }, 1);
  };
  const state = useSelector<RootState>((state) => state.LoginReducer);
  const { data } = state as StateInitial;
  const [remember, setRemember] = useState(false);
  useEffect(() => {
    if (data) {
      alert("Đăng nhập thành công");
      onLoginSuccess(data);
      if (remember) {
        localStorage.setItem("userLogin", JSON.stringify(data));
      } else {
        sessionStorage.setItem("userLogin", JSON.stringify(data));
      }
      const closeBtn = document.querySelector<HTMLButtonElement>(
        '#authentication-modal [data-modal-hide="authentication-modal"]'
      );
      closeBtn?.click();
    }
  }, [data]);

  const distpatch = useDispatch<AppDispatch>();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCount({
      ...acount,
      [name]: value,
    });
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, acount: Account) => {
    e.preventDefault();
    distpatch(Login(acount));
  };

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className=" hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <h3 className="text-xl font-semibold  ">Đăng nhập tài khoản</h3>
            <button
              onClick={renderFlowbite}
              type="button"
              className="end-2.5 text-gray-400 bg-transparent   rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3 hover:text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          {/* sign in  */}
          <div className="p-4 md:p-5">
            <form
              onSubmit={(e) => onSubmit(e, acount)}
              className="space-y-4"
              action="#"
            >
              <div>
                <label
                  htmlFor="taiKhoan"
                  className="block mb-2 text-sm font-medium "
                >
                  Tài khoản
                </label>
                <input
                  onChange={handleOnchange}
                  type="email"
                  name="email"
                  autoComplete="username"
                  className="bg-gray-50 border  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400 text-black"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium "
                >
                  Mật khẩu
                </label>
                <input
                  onChange={handleOnchange}
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 text-black"
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      checked={remember}
                      onChange={(e) => {
                        setRemember(e.target.checked);
                      }}
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300  dark:border-gray-500 dark:focus:ring-blue-600  "
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium "
                  >
                    Ghi nhớ mật khẩu
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Quên mật khẩu
                </a>
              </div>
              <button
                type="submit"
                className="cursor-pointer text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none  focus:ring-pink-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center grid place-items-center w-full"
              >
                Đăng nhập
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                <a
                  href="#"
                  data-modal-target="crypto-modal"
                  data-modal-toggle="crypto-modal"
                  data-modal-hide="authentication-modal"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Tạo tài khoản
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
