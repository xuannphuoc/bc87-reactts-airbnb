export default function Navbar() {
  return (
    <div>
      <nav className="bg-[#FFFFFF]  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="">
          <div className="md:grid md:grid-cols-12 flex  items-center justify-between mx-auto p-3">
            {/* left  */}
            <div className="col-span-3">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <i className="fa-solid fa-a text-pink-300"></i>
                <span className="text-pink-300">airbnb</span>
              </span>
            </div>
            {/* middle   */}
            <div className="col-span-6 hidden lg:block justify-self-center">
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 gap-0  lg:gap-10 md:p-0 mt-4 font-medium border  rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black  rounded-sm md:bg-transparent "
                      aria-current="page"
                    >
                      <span className="text-2xl">🏠</span> Nơi lưu trú
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black  rounded-sm md:bg-transparent "
                    >
                      <span className="text-2xl">🎈</span> Trải nghiệm
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-3 text-gray hover:text-black  rounded-sm md:bg-transparent "
                    >
                      <span className="text-2xl">🛎️</span> Dịch vụ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* right  */}
            <div className="col-span-3 justify-self-end ">
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                {/* button right  */}
                <div className="hidden md:block">
                  <div className="flex justify-between items-center gap-2">
                    <div className="text-white">Đón tiếp khách</div>
                    <div className="text-white">
                      <i className="fa-solid fa-globe"></i>
                    </div>
                    <div className="w-20 bg-white rounded-3xl flex justify-around items-center py-2 px-2 gap-2 ">
                      <div className="text-[25px] md:text-xl">
                        <i className="fa-solid fa-bars  text-gray-600"></i>
                      </div>
                      <div className="">demo</div>
                    </div>
                  </div>
                </div>
                {/* ==  */}
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
          <div className=" container mx-auto z-21  grid grid-cols-12 my-4">
            <div className="col-span-3"></div>
            <div className="col-span-6 ">
              <div className="p-4 bg-gray-100 rounded-4xl grid grid-cols-10 ">
                <div className="col-span-2 px-4  border-r-[1px] ">Địa điểm</div>
                <div className="col-span-2  px-4 border-r-[1px]  ">
                  Nhận phòng
                </div>
                <div className="col-span-2  px-4 border-r-[1px]">Trả phòng</div>
                <div className="col-span-2  px-4 ">Khách</div>
                <div className="col-span-2  px-4 ">Địa điểm</div>
              </div>
            </div>
            <div className="col-span-3"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
