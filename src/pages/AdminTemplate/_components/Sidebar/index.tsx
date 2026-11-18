import { Link, NavLink } from "react-router-dom";
import {
  HiArrowLeft,
  HiCalendar,
  HiChartBar,
  HiHome,
  HiLocationMarker,
  HiUsers,
} from "react-icons/hi";

const menu = [
  { title: "Tổng quan", path: "/admin", icon: HiChartBar },
  { title: "Người dùng", path: "/admin/user", icon: HiUsers },
  { title: "Vị trí", path: "/admin/location", icon: HiLocationMarker },
  { title: "Phòng", path: "/admin/room", icon: HiHome },
  { title: "Đặt phòng", path: "/admin/booking", icon: HiCalendar },
];

export default function Sidebar() {
  return (
    <aside className="shrink-0 border-b border-slate-200 bg-white md:flex md:w-56 md:flex-col md:border-r md:border-b-0">
      <Link
        to="/admin"
        className="hidden items-center gap-3 px-5 py-5 font-semibold md:flex"
      >
        <span className="grid size-9 place-items-center rounded-lg bg-indigo-700 text-white">
          <HiHome size={19} />
        </span>
        Quản trị lưu trú
      </Link>
      <nav
        aria-label="Quản trị"
        className="flex gap-1 overflow-x-auto p-2 md:flex-col md:px-3"
      >
        {menu.map(({ path, icon: Icon, title }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-800" : "text-slate-600 hover:bg-slate-100"}`
            }
          >
            <Icon size={18} aria-hidden="true" /> {title}
          </NavLink>
        ))}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 md:mt-4 md:border-t md:border-slate-200 md:pt-4"
        >
          <HiArrowLeft size={18} aria-hidden="true" /> Trang khách
        </Link>
      </nav>
    </aside>
  );
}
