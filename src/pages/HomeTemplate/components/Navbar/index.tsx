import { initFlowbite } from "flowbite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { type AppDispatch, type RootState } from "./../../../../store/index";
import { getDataLocation } from "./slice";
import Signup from "./../Signup";
import Signin from "../Signin";
import User from "../../../User";
import { Link } from "react-router-dom";
import { getDataRoom } from "./getRoom";
import { useNavigate } from "react-router-dom";
export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}
export interface User {
  user: UserData;
  token: string;
}

export default function Navbar() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<User | null>({
    user: {} as UserData,
    token: "",
  });

  const [inputLocaton, setInputLocation] = useState("");

  const handleLogin = (userData: User) => {
    setUser(userData);
    setLogin(true);
    setTimeout(() => {
      initFlowbite();
    }, 100);
  };
  // give inputLocaton
  const handleSelectLocation = (locationName: string) => {
    setInputLocation(locationName);
    const dropdow = document.getElementById("dropdown");
    if (dropdow) dropdow.classList.add("hidden");
  };

  // map location
  const location = useSelector((state: RootState) => state.LocationSlice.data);
  console.log(location);

  const map: Record<string, string> = {
    "Quận 1": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/1scrTViw3facDcjHA",
    "Hòn Rùa": "https://maps.app.goo.gl/1scrTViw3facDcjHA",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
    "Cái Răng": "https://maps.app.goo.gl/LFGv8JpFQWS8PbMo7",
  };

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.LocationSlice);

  useEffect(() => {
    const timer = setTimeout(() => initFlowbite(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(getDataLocation());
  }, [dispatch]);

  useEffect(() => {
    const dataStringLocal = localStorage.getItem("userLogin");
    const dataStringSession = sessionStorage.getItem("userLogin");
    if (dataStringLocal) {
      const dataJson = JSON.parse(dataStringLocal);
      setUser(dataJson);
      setLogin(true);
    } else if (dataStringSession) {
      const dataJson = JSON.parse(dataStringSession);
      setUser(dataJson);
      setLogin(true);
    }
  }, []);

  // logout
  const logout = () => {
    localStorage.removeItem("userLogin");
    setLogin(false);
    setUser(null);
    setTimeout(() => {
      initFlowbite();
    }, 100);
  };

  const dataId = (id: number) => {
    localStorage.setItem("id", JSON.stringify(id));
  };
  const navigate = useNavigate();
  const senId = () => {
    const idSring = localStorage.getItem("id");
    if (idSring) {
      const idJson = JSON.parse(idSring);
      dispatch(getDataRoom(idJson));
      navigate(`detail/${idJson}`);
    }
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
            {user?.user && user?.user.avatar !== "" ? (
              <img
                className="w-10 h-10 rounded-full hover:bg-amber-50"
                src={user.user.avatar}
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
                to={"/user"}
                className="inline-flex items-center hover:bg-gray-100 w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="ml-2"> Xem hồ sơ </span>
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
      <nav className="bg-[#FDFDFD] w-full  fixed top-0 start-0 border-b border-gray-200  ">
        <div>
          <div className="md:grid md:grid-cols-12 flex items-center justify-between mx-auto p-2 max-w-screen-2xl ">
            {/* left */}
            <div className="lg:col-span-3 md:col-span-2">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <i className="fa-solid fa-a text-pink-300"></i>
                <span className="text-pink-300">airbnb</span>
              </span>
            </div>
            {/* middle */}
            <div className="lg:col-span-6 md:col-span-8 hidden md:block justify-self-center">
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 gap-0 lg:gap-10 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black rounded-sm md:bg-transparent "
                      aria-current="page"
                    >
                      <span className="text-2xl">🏡</span> Nơi lưu trú
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black rounded-sm md:bg-transparent "
                    >
                      <span className="text-2xl">🪂</span> Trải nghiệm
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black rounded-sm md:bg-transparent "
                    >
                      <span className="text-2xl">🛎️</span> Dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* right */}
            <div className="justify-self-end md:col-span-2 lg:col-span-3 mr-5">
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="hidden md:block">
                  <div className="flex  items-center gap-4">
                    <div className="text-black md:hidden lg:block">
                      Đón tiếp khách
                    </div>
                    <div className="w-10 h-10 bg-gray-100 text-black rounded-full shadow-md flex items-center justify-center cursor-pointer">
                      <i className="fa-solid fa-globe text-gray-800"></i>
                    </div>
                    {/* icon avatar  */}
                    <div className="py-1 px-2 rounded-4xl bg-gray-100">
                      <div className="flex justify-around gap-1">
                        {!login && (
                          <div className=" h-10 w-10 bg-white hover:bg-white/30 shadow-md rounded-full grid place-items-center cursor-pointer  ">
                            <div
                              id="dropdownHoverButton"
                              data-dropdown-toggle="dropdownHover"
                              data-dropdown-trigger="hover"
                              className=""
                            >
                              <i className="fa-solid fa-bars text-gray-800  "></i>
                            </div>
                          </div>
                        )}

                        {renderIcon()}
                      </div>
                    </div>

                    <div
                      id="dropdownHover"
                      className="z-10  hidden bg-white  rounded-lg shadow-sm w-35 mt-5 "
                    >
                      <ul
                        className="py-2 text-sm text-black "
                        aria-labelledby="dropdownHoverButton"
                      >
                        <li>
                          <a
                            data-modal-target="authentication-modal"
                            data-modal-toggle="authentication-modal"
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100  "
                          >
                            <i className="fa-solid fa-right-to-bracket text-green-700"></i>
                            <span> Đăng nhập </span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100  "
                            data-modal-target="crypto-modal"
                            data-modal-toggle="crypto-modal"
                          >
                            <i className="fa-solid fa-address-book text-blue-700 "></i>
                            <span> Đăng ký</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="items-center justify-center container mx-auto  hidden md:flex">
            <div className="sm:flex bg-[#FFFFFF] rounded-full shadow-sm overflow-hidden items-stretch hidden md:w-[90%] lg:w-[70%] xl:w-[55%] mb-2">
              {/* Địa điểm */}
              <div className="relative">
                <div
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className={`
                  }w-full rounded-full relative flex items-center px-6 py-3 hover:bg-gray-100 transition after:content-[''] after:absolute after:top-1/2 after:right-0 after:translate-y-[-50%] after:h-[60%] after:w-px after:bg-gray-300`}
                >
                  <div className="w-full text-left">
                    <label className="block text-sm font-semibold text-gray-800">
                      Địa điểm
                    </label>
                    <input
                      value={inputLocaton}
                      onChange={(e) => setInputLocation(e.target.value)}
                      id="diaDiem"
                      type="text"
                      placeholder="Tìm kiếm điểm đến"
                      className="bg-transparent focus:ring-0 focus:outline-none border-none text-sm placeholder:text-gray-500 w-full p-0 m-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              {/* Nhận phòng */}
              <div
                id="nhanPhong"
                className={`
               
                  rounded-full relative flex-[0.8] items-center px-6 py-3 hover:bg-gray-100 transition after:content-[''] after:absolute after:top-1/2 after:right-0 after:translate-y-[-50%] after:h-[60%] after:w-px after:bg-gray-300`}
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Nhận phòng
                  </label>
                  <input
                    type="date"
                    className="bg-transparent focus:ring-0 focus:outline-none border-none text-sm placeholder:text-gray-500 w-full p-0 m-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Trả phòng */}
              <div
                id="traPhong"
                className="rounded-full relative flex-[0.8] items-center px-6 py-3 hover:bg-gray-100 transition after:content-[''] after:absolute after:top-1/2 after:right-0 after:translate-y-[-50%] after:h-[60%] after:w-px after:bg-gray-300"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-800">
                    Trả phòng
                  </label>
                  <input
                    type="date"
                    className="bg-transparent focus:ring-0 focus:outline-none border-none text-sm placeholder:text-gray-500 w-full p-0 m-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Khách */}
              <div
                id="khách"
                className="flex-[1.2] items-center px-6 py-3 hover:bg-gray-100 rounded-full transition"
              >
                <div className="flex items-center justify-around md:gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800">
                      Khách
                    </label>
                    <span className="text-sm text-gray-500">Thêm khách</span>
                  </div>
                  <button
                    onClick={senId}
                    className="cursor-pointer bg-pink-600 text-white rounded-full w-10 h-10 text-sm font-semibold hover:bg-pink-700 transition "
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Dropdown menu */}
      <div
        id="dropdown"
        className="z-99 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[250px] mt-2 absolute"
      >
        <ul
          className="py-2 text-sm text-gray-700 overflow-y-auto h-[400px]"
          aria-labelledby="dropdownDefaultButton"
        >
          {state.data?.map((location) => (
            <li
              onClick={() => dataId(location.id)}
              key={location.id}
              className="cursor-pointer"
            >
              <a className="block px-4 py-2 hover:bg-gray-100">
                <div
                  className="grid grid-cols-3 w-50"
                  onClick={() => handleSelectLocation(location.tenViTri)}
                >
                  <div className="col-span-1 ">
                    <img
                      src={location.hinhAnh}
                      alt=""
                      className="w-10 h-10 rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <h5 className="font-bold">{location.tinhThanh}</h5>
                    <p className="text-gray-500">
                      {location.tenViTri}, {location.quocGia}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Signin onLoginSuccess={handleLogin} />
      <Signup />
    </div>
  );
}
