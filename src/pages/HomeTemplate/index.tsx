import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

export default function HomeTemplate() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full z-50">
        <Navbar />
      </div>

      {/* khoảng trống bằng chiều cao của navbar */}
      <div className="h-20 md:h-[130px] lg:h-[110px]"></div>

      <div className="flex-1 w-full">
        <Outlet />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
