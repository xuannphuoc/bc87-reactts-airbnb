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
import { getRoomByUserReducer } from "./../../../User/getRoomByUser";
import { getUserReducer } from "./../../../User/getUser";
import { useContext } from "react";
import { BookingContext } from "./../../../../context/BookingContext";

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
  const context = useContext(BookingContext);

  if (!context) return null;
  const { booking, setBooking } = context;
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState<User | null>({
    user: {} as UserData,
    token: "",
  });
  const [showSearch, setShowSearch] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inputLocaton, setInputLocation] = useState("");

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      let lastY = window.scrollY;

      const handleScroll = () => {
        if (window.scrollY > lastY) {
          setShowSearch(false);
        } else {
          setShowSearch(true);
        }
        lastY = window.scrollY;
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  const handleLogin = (userData: User) => {
    setUser(userData);
    setLogin(true);
    localStorage.setItem("userLogin", JSON.stringify(userData));
    setTimeout(() => initFlowbite(), 100);
  };

  // give inputLocaton
  const handleSelectLocation = (locationName: string) => {
    setInputLocation(locationName);
    const dropdow = document.getElementById("dropdown");
    if (dropdow) dropdow.classList.add("hidden");
  };

  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state.LocationSlice);

  useEffect(() => {
    const timer = setTimeout(() => initFlowbite(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => initFlowbite(), 50);
    return () => clearTimeout(timer);
  }, [login, mobileOpen, isMobile]);

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
    sessionStorage.removeItem("userLogin");
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
      navigate(`detail/${idJson}/${inputLocaton}`);
    }
  };

  const handleUser = () => {
    if (user?.user?.id) {
      dispatch(getRoomByUserReducer(user.user.id));
      dispatch(getUserReducer(user.user.id));
    } else {
      console.log("vui long dang nhap");
    }
  };
  const renderIcon = () => {
    return (
      <div className={`${login ? "block" : "hidden"} relative`}>
        {/* Avatar */}
        <button
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          data-dropdown-trigger="hover"
          className="w-10 h-10 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <img
            className="w-full h-full object-cover"
            src={user?.user?.avatar || "./images/avatar.png"}
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
                className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded"
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
  };

  return (
    <div>
      <nav
        onClick={() => setShowSearch(true)}
        className="bg-[#FDFDFD] w-full  fixed top-0 start-0 border-b border-gray-200  "
      >
        <div>
          <div className="flex flex-wrap items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto md:grid md:grid-cols-12">
            {/* Left - Logo */}
            <div className="col-span-2 lg:col-span-3 flex items-center">
              <span className="text-2xl font-semibold text-pink-300 flex items-center gap-1">
                <i className="fa-solid fa-a"></i>
                airbnb
              </span>
            </div>

            <div className="hidden md:flex col-span-8 lg:col-span-6 justify-center">
              <ul className="flex space-x-6 font-medium text-gray-700">
                <li>
                  <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-black"
                  >
                    <span className="text-2xl">🏡</span> Nơi ở
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1 hover:text-black"
                  >
                    <span className="text-2xl">🪂</span> Trải nghiệm
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-1 hover:text-black"
                  >
                    <span className="text-2xl">🛎️</span> Dịch vụ
                  </a>
                </li>
              </ul>
            </div>

            {/* Right - Actions */}
            <div className="col-span-2 lg:col-span-3 flex items-center justify-end space-x-3">
              {/* Globe icon */}{" "}
              <span className=" hidden lg:block"> Đón tiếp khách </span>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-md hover:shadow-lg transition">
                <i className="fa-solid fa-globe text-gray-800 animate__headShake animate__animated animate__infinite	infinite animate__delay-2s"></i>
              </button>
              {/* Menu / Avatar */}
              <div className="flex items-center gap-2">
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

                {renderIcon()}
              </div>
              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 17 14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={`
    container mx-auto transition-all duration-300 justify-center 
    ${
      isMobile
        ? mobileOpen
          ? "flex"
          : "hidden"
        : showSearch
        ? "flex"
        : "hidden"
    }
  `}
          >
            <div
              className="
      w-full md:w-[90%] lg:w-[70%] xl:w-[55%]
      bg-white rounded-2xl md:rounded-full shadow-md 
      overflow-hidden 
      flex flex-col md:flex-row
      gap-3 md:gap-0
      p-4 md:p-0
    "
            >
              {/* Place */}
              <div
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="
        flex-1 relative flex items-center px-4 py-3 
        hover:bg-gray-100 md:bg-transparent rounded-xl md:rounded-none
        md:after:content-[''] md:after:absolute md:after:top-1/2 
        md:after:right-0 md:after:-translate-y-1/2 
        md:after:h-[60%] md:after:w-px md:after:bg-gray-300
        cursor-pointer
      "
              >
                <div className="w-full text-left">
                  <label className="block text-xs font-semibold text-gray-800">
                    Địa điểm
                  </label>
                  <input
                    value={inputLocaton}
                    onChange={(e) => setInputLocation(e.target.value)}
                    id="diaDiem"
                    type="text"
                    placeholder="Tìm kiếm điểm đến"
                    className="bg-transparent focus:ring-0 px-0 focus:outline-none border-none text-sm placeholder:text-gray-500 w-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div
                className="
        flex-1 relative flex items-center px-4 py-3 
        hover:bg-gray-100 md:bg-transparent rounded-xl md:rounded-none
        md:after:content-[''] md:after:absolute md:after:top-1/2 
        md:after:right-0 md:after:-translate-y-1/2 
        md:after:h-[60%] md:after:w-px md:after:bg-gray-300
      "
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-800">
                    Nhận phòng
                  </label>
                  <input
                    type="date"
                    className="bg-transparent focus:ring-0 p-0 focus:outline-none border-none text-sm w-full cursor-pointer"
                    onChange={(e) => {
                      const value = e.target.value;
                      const today = new Date().toISOString().split("T")[0];
                      if (value < today) {
                        alert(
                          "Ngày nhận phòng không được nhỏ hơn ngày hiện tại!"
                        );
                        return;
                      }
                      setBooking((prev) => ({
                        ...prev,
                        checkin: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div
                className="
        flex-1 relative flex items-center px-4 py-3 
        hover:bg-gray-100 md:bg-transparent rounded-xl md:rounded-none
        md:after:content-[''] md:after:absolute md:after:top-1/2 
        md:after:right-0 md:after:-translate-y-1/2 
        md:after:h-[60%] md:after:w-px md:after:bg-gray-300
      "
              >
                <div>
                  <label className="block text-xs font-semibold text-gray-800">
                    Trả phòng
                  </label>
                  <input
                    type="date"
                    className="bg-transparent focus:ring-0 p-0 focus:outline-none border-none text-sm w-full cursor-pointer"
                    onChange={(e) => {
                      const value = e.target.value;

                      if (booking.checkin && value < booking.checkin) {
                        alert(
                          "Ngày trả phòng không được nhỏ hơn ngày nhận phòng!"
                        );
                        return;
                      }
                      setBooking((prev) => ({
                        ...prev,
                        checkout: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Guests + Search Button */}
              <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-xl md:rounded-none flex-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-800">
                    Khách
                  </label>
                  <input
                    type="number"
                    min={1}
                    placeholder="Thêm khách"
                    className="bg-transparent focus:ring-0 focus:outline-none p-0 border-none text-sm placeholder:text-gray-500 cursor-pointer"
                    onChange={(e) =>
                      setBooking((prev) => ({
                        ...prev,
                        guests: Number(e.target.value),
                      }))
                    }
                  />
                </div>

                <button
                  onClick={senId}
                  className="cursor-pointer bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-700 transition"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
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
                      alt="hinhanh"
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
