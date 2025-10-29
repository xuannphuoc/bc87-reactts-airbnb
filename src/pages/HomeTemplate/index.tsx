import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
export default function HomeTemplate() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <Navbar />
      </div>
      <div className="col-span-12">
        <Outlet />
      </div>
      <div className="col-span-12">
        <Footer />
      </div>
    </div>
  );
}
