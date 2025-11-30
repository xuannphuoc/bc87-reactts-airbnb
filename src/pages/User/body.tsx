import { type UserData } from "./../HomeTemplate/components/Navbar/index";
type Props = {
  user: UserData;
};

export default function Body({ user }: Props) {
  const renderAvatar = () => {
    return (
      <div className="">
        {user.avatar !== "" ? (
          <img
            className="w-30 h-30  rounded-full hover:bg-amber-50"
            src={user.avatar}
            alt=""
          />
        ) : (
          <img
            className="w-30 h-30 rounded-full hover:bg-amber-50"
            src="./images/avatar.png"
            alt=""
          />
        )}
      </div>
    );
  };
  return (
    <div className="container mx-auto mt-10 ">
      <div className="md:grid md:grid-cols-12 gap-10">
        {/* left  */}
        <div className="md:col-span-3 p-4 border rounded-lg">
          <div className="">
            <div className="grid place-items-center">
              {renderAvatar()}
              <a href="#">
                <u className="text-blue-500 cursor-pointer">
                  Cập nhật hình ảnh
                </u>
              </a>
            </div>
          </div>
          {/* authen  */}
          <div className="">
            <div className="pt-3">
              <i className="fa-solid fa-user-shield pt-1"></i>
              <h4 className="font-bold pt-1">Xác minh danh tính</h4>
              <p className="pt-1">
                Xác thực danh tính của bạn với huy hiệu xác minh danh tính
              </p>
              <div className="py-4">
                <button className=" cursor-pointer rounded-lg inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-linear-to-r from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="  px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
                    Nhận huy hiệu
                  </span>
                </button>
              </div>
            </div>
            <hr className="py-5" />
            <div className="">
              <div className="text-xl font-semibold">{user.name} đã nhận</div>
              <div className="">
                <p className="mt-2">
                  <i className="fa-solid fa-check text-[12px]"></i> Địa chỉ
                  email
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* right  */}
        <div className="md:col-span-9">
          <div className="">
            <h1 className="text-4xl font-semibold">
              Xin chào tôi là {user.name}
            </h1>
            <p className="pt-3 text-gray-400">Bắt đầu tham gia vào 2021</p>
            <div className="pt-3">
              <a className="" href="#">
                Chinh sửa hồ sơ
              </a>
            </div>
          </div>
          {/* listroom  */}
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}
