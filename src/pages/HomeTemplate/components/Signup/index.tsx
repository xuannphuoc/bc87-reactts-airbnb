import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../store/index";
import { SignUp } from "./slice";
import { type Account, type StateInitial } from "./slice";
export default function Signup() {
  const distpatch = useDispatch<AppDispatch>();
  const state = useSelector<RootState>((state) => state.SignUpReducer);
  const { data, loading, error } = state as StateInitial;

  useEffect(() => {
    if (data) {
      alert("Đăng ký thành công, mời bạn đăng nhập!");
      const closeBtn = document.querySelector<HTMLButtonElement>(
        '#crypto-modal [data-modal-hide="crypto-modal"]'
      );
      closeBtn?.click();
      document.querySelector("[modal-backdrop]")?.remove();
    } else if (error) {
      alert(`Lỗi ${error} 
        Đăng ký thất bại, vui lòng thử lại!`);
    }
  }, [data]);

  const [acount, setAcount] = useState<Account>({
    // id: 0,
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: false,
    role: "USER",
  });
  const handleOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "gender") {
      if (value === "Nam") {
        setAcount({
          ...acount,
          [name]: true,
        });
        return;
      } else if (value === "Nu") {
        setAcount({
          ...acount,
          [name]: false,
        });
        return;
      }
    }
    setAcount({
      ...acount,
      [name]: value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    acount: Account
  ) => {
    e.preventDefault();
    distpatch(SignUp(acount));
    e.currentTarget.reset();
  };
  return (
    <div
      id="crypto-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  "
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm ">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
            <div className="grid place-items-center w-full">
              {loading ? (
                <h3 className="text-xl text-center font-semibold ">
                  Đang đăng ký...
                </h3>
              ) : (
                <h3 className="text-xl text-center font-semibold  ">
                  Đang ký tài khoản
                </h3>
              )}
            </div>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-800 bg-transparent  rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center "
              data-modal-toggle="crypto-modal"
            >
              <svg
                className="w-3 h-3"
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
          <div className="p-4 md:p-5">
            {/* form sing up  */}
            <form
              onSubmit={(e) => handleSubmit(e, acount)}
              className="max-w-md mx-auto"
            >
              {/* Name  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={handleOnchange}
                  type="text"
                  name="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Họ tên
                </label>
              </div>
              {/* Email  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={handleOnchange}
                  type="email"
                  name="email"
                  autoComplete="username"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>
              {/* Password  */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onChange={handleOnchange}
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
              </div>
              {/* Phone number  */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={handleOnchange}
                    type="text"
                    name="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=""
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Số điện thoại
                  </label>
                </div>
                {/* Birthday  */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    onChange={handleOnchange}
                    type="text"
                    name="birthday"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="birthday"
                    className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ngày tháng năm sinh
                  </label>
                </div>
              </div>
              {/* gender  */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <div className="flex items-center mb-4">
                    <select
                      onChange={handleOnchange}
                      className="border-0 focus:outline-none focus:ring-0 focus:border-black w-full pb-2.5 pt-3 px-0 text-sm text-gray-900 bg-transparent border-b-1 border-gray-300 appearance-none peer"
                      name="gender"
                    >
                      <option value="">Giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                    </select>
                  </div>
                </div>
                {/* role  */}
                <div className="relative z-0 w-full mb-5 group hidden">
                  <input
                    type="text"
                    name="role"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-black peer"
                  />
                  <label
                    htmlFor="role"
                    className="peer-focus:font-medium absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Vai trò
                  </label>
                </div>
              </div>
              <div className="grid gap-2">
                <button
                  type="submit"
                  className=" cursor-pointer text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none  focus:ring-pink-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center grid place-items-center w-full "
                >
                  Đăng ký
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  <a
                    href="#"
                    data-modal-target="authentication-modal"
                    data-modal-toggle="authentication-modal"
                    data-modal-hide="crypto-modal"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Đăng nhập
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
