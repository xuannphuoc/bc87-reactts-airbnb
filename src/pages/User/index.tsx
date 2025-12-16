import { useEffect, useState } from "react";
import Body from "./body";
import {
  type User,
  type UserData,
} from "./../HomeTemplate/components/Navbar/index";
import { initFlowbite } from "flowbite";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store, type AppDispatch, type RootState } from "../../store/index.ts";

import { getUserReducer } from "./getUser.ts";
export default function User() {
  const [login, setLogin] = useState(false);
  const [userLogin, setUser] = useState<User | null>({
    user: {} as UserData,
    token: "",
  });
  const navigative = useNavigate();
  const distpatch = useDispatch<AppDispatch>();

  const [userCurrent, setUserCurrent] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");
    if (!storedUser) return;
    try {
      const parseJson = JSON.parse(storedUser);
      setUser(JSON.parse(storedUser));
      const { user } = parseJson;
      setUserCurrent(user);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect(() => {
  //   distpatch(getUserReducer());
  // });

  useEffect(() => {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }, []);

  const logout = () => {
    localStorage.removeItem("userLogin");
    sessionStorage.removeItem("userLogin");
    setLogin(false);
    setUser(null);
    setTimeout(() => {
      initFlowbite();
    }, 100);
    navigative("/");
  };

  const renderIcon = () => {
    return (
      <div
        className={`${
          login ? "block" : "hidden"
        } shadow-md rounded-full grid place-items-center cursor-pointer`}
      >
        <div
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          data-dropdown-trigger="hover"
          className="relative"
        >
          <div className="">
            {userLogin?.user && userLogin?.user.avatar !== "" ? (
              <img
                className="w-10 h-10 rounded-full hover:bg-amber-50"
                src={userLogin.user.avatar}
                alt=""
              />
            ) : (
              <img
                className="w-10 h-10 rounded-full hover:bg-amber-50"
                src="./images/avatar.png"
                alt=""
              />
            )}
          </div>
        </div>
        <div
          id="dropdownDelay"
          className="z-10 hidden bg-neutral-primary-medium border-0 rounded-xl shadow-lg w-36"
        >
          <ul
            className="p-2 text-sm text-body font-medium"
            aria-labelledby="dropdownDelayButton"
          >
            <li>
              <Link
                to={"/"}
                className="inline-flex items-center hover:bg-gray-100 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>

                <span className="ml-2"> Trang chủ </span>
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="inline-flex items-center hover:bg-gray-100 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                onClick={logout}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
                <span className="ml-2"> Đăng xuất </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div>
      <nav className="bg-[#FDFDFD] w-full top-0 start-0 border-b border-gray-200">
        {/* Container */}
        <div className="max-w-screen-2xl mx-auto p-2">
          <div className="grid grid-cols-12 items-center">
            {/* LEFT */}
            <div className="col-span-6 md:col-span-3">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                <i className="fa-solid fa-a text-pink-300"></i>
                <span className="text-pink-300">airbnb</span>
              </span>
            </div>

            {/* RIGHT */}
            <div className="col-span-6 md:col-span-3 md:col-start-10 flex justify-end">
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-black">
                  Trở thành chủ nhà
                </div>

                <div className="w-10 h-10 bg-gray-100 text-black rounded-full shadow-md flex items-center justify-center cursor-pointer">
                  <i className="fa-solid fa-globe text-gray-800"></i>
                </div>

                {/* Icon group */}
                <div className="py-1 px-2 rounded-4xl bg-gray-100">
                  <div className="flex gap-1">
                    <div className=" bg-white shadow-md rounded-full grid place-items-center cursor-pointer">
                      {renderIcon()}
                    </div>
                  </div>
                </div>

                <div
                  id="dropdonHover"
                  className="z-10 hidden bg-white rounded-lg shadow-sm w-35 mt-5"
                >
                  <ul className="py-2 text-sm text-black">
                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-100">
                        <i className="fa-solid fa-right-to-bracket text-green-700"></i>
                        <span> Đăng nhập </span>
                      </a>
                    </li>

                    <li>
                      <a className="block px-4 py-2 hover:bg-gray-100">
                        <i className="fa-solid fa-address-book text-blue-700"></i>
                        <span> Đăng ký</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Body user={userLogin?.user} />
    </div>
  );
}
