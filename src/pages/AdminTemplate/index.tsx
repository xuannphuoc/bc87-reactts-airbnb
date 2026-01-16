import type { RootState } from "../../store";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function AdminTemplate() {
  const data = useSelector((state: RootState) => state.authReducer.data);

  if (!data) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
