import { initFlowbite } from "flowbite";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { type AppDispatch, type RootState } from "@/store/index";
import { getDataLocation } from "../getAPI/navbar.ts";
import Signup from "../Register/index.tsx";
import Signin from "../Login/index.tsx";
import type { UserData } from "../_Type/type.tsx";
import { Link } from "react-router-dom";
import { useGotoDetail } from "../customHooks/useGotoDetail.tsx";
import { getRoomByUser } from "../../../User/getAPI/getRoomByUser.ts";
import { clearUser, getUser } from "../../../User/getAPI/getUser.ts";
import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";
import Avatar from "./Avatar/avatar.tsx";
import SearchBar from "./SearchBar/searchbar.tsx";
import Login from "./Login/login.tsx";
export default function Navbar() {
  const dispatch: AppDispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inputLocaton, setInputLocation] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const state = useSelector((state: RootState) => state.LocationSlice);

  const context = useContext(BookingContext);
  if (!context) return null;
  const { booking, setBooking } = context;

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // get User
  const rawUser =
    localStorage.getItem("userLogin") || sessionStorage.getItem("userLogin");

  const id = rawUser
    ? JSON.parse(rawUser)?.user?.id ?? JSON.parse(rawUser)?.maNguoiDung
    : null;
  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, [id, dispatch]);

  const user = useSelector((state: RootState) => state.getUserSlice.data);
  const isLogin = !!user;

  console.log(user);
  //==================
  const gotoDetail = useGotoDetail();
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

  useEffect(() => {
    const timer = setTimeout(() => initFlowbite(), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => initFlowbite(), 50);
    return () => clearTimeout(timer);
  }, [isLogin, mobileOpen, isMobile]);

  useEffect(() => {
    dispatch(getDataLocation());
  }, [dispatch]);

  // login
  const handleLogin = (user: UserData) => {
    localStorage.setItem("userLogin", JSON.stringify(user));
    setTimeout(() => initFlowbite(), 100);
  };
  // logout
  const logout = () => {
    localStorage.removeItem("userLogin");
    sessionStorage.removeItem("userLogin");
    dispatch(clearUser());
    setTimeout(() => {
      initFlowbite();
    }, 100);
  };

  const handleUser = () => {
    if (user) {
      dispatch(getRoomByUser(user.id));
      dispatch(getUser(user.id));
    }
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
              {/* Globe icon */}
              <span className=" hidden lg:block"> Đón tiếp khách </span>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shadow-md hover:shadow-lg transition">
                <i className="fa-solid fa-globe text-gray-800 animate__headShake animate__animated animate__infinite	infinite animate__delay-2s"></i>
              </button>
              {/* Menu / Avatar */}
              <div className="flex items-center gap-2">
                <Login login={isLogin} />
                <Avatar
                  handleUser={handleUser}
                  login={isLogin}
                  logout={logout}
                  user={user}
                />
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

          <SearchBar
            isMobile={isMobile}
            mobileOpen={mobileOpen}
            showSearch={showSearch}
            inputLocation={inputLocaton}
            setInputLocation={setInputLocation}
            booking={booking}
            setBooking={setBooking}
            locations={state.data ?? []}
            gotoDetail={gotoDetail}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </div>
      </nav>

      <Signin onLoginSuccess={handleLogin} />
      <Signup />
    </div>
  );
}
