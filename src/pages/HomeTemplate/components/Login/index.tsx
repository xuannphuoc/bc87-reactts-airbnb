import { useState, useEffect } from "react";
import { type AppDispatch, type RootState } from "../../../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "./login.ts";
import { initFlowbite } from "flowbite";
import type { UserData } from "../_Type/type.tsx";
import { resetLogin } from "./login.ts";
interface SigninProps {
  onLoginSuccess: (user: UserData) => void;
}
export type Account = {
  email: string;
  password: string;
};
export default function Signin({ onLoginSuccess }: SigninProps) {
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
  });
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!account.email) {
      alert("Vui lòng nhập email!");
      return false;
    }

    if (!emailRegex.test(account.email)) {
      alert("Email không hợp lệ!");
      return false;
    }

    if (!account.password) {
      alert("Vui lòng nhập mật khẩu!");
      return false;
    }

    if (account.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }

    return true;
  };
  const [showError, SetShowError] = useState<string | null>(null);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.LoginReducer
  );

  const renderFlowbite = () => {
    setTimeout(() => {
      initFlowbite();
    }, 1);
  };

  useEffect(() => {
    if (error) {
      SetShowError(error);
      const timer = setTimeout(() => {
        SetShowError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const [remember, setRemember] = useState(false);
  useEffect(() => {
    if (data) {
      onLoginSuccess(data);
      setAccount({
        email: "",
        password: "",
      });
      if (remember) {
        localStorage.setItem("userLogin", JSON.stringify(data));
      } else {
        sessionStorage.setItem("userLogin", JSON.stringify(data));
      }
      const closeBtn = document.querySelector<HTMLButtonElement>(
        '#authentication-modal [data-modal-hide="authentication-modal"]'
      );

      const loginModel = document.getElementById("authentication-modal");
      loginModel?.classList.add("hidden");
      loginModel?.setAttribute("aria-hidden", "true");

      document
        .querySelectorAll("[modal-backdrop]")
        .forEach((el) => el.remove());
      document.body.classList.remove("overflow-hidden");

      closeBtn?.click();
      distpatch(resetLogin());
    }
  }, [data]);

  const distpatch = useDispatch<AppDispatch>();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>, account: Account) => {
    e.preventDefault();

    if (!validateForm()) return;

    distpatch(Login(account));
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
            <h3 className="text-xl font-semibold text-center ">
              Đăng nhập tài khoản
            </h3>
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
              id="form"
              onSubmit={(e) => onSubmit(e, account)}
              className="space-y-4"
              action="#"
            >
              {showError && (
                <p className="text-red-500 items-cente animate__backInUp animate__animated transition-all">
                  {error}
                </p>
              )}
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
                  value={account.email}
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
                  value={account.password}
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
                className={`cursor-pointer text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none  focus:ring-pink-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center grid place-items-center w-full
                    ${
                      loading
                        ? "bg-pink-300 cursor-not-allowed"
                        : "bg-pink-500 hover:bg-pink-600"
                    }
                  
                  `}
              >
                {loading ? "Đang đăng nhập" : "Đăng nhập"}
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
