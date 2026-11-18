import "./admin.css";
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
    <div className="admin-shell flex min-h-dvh flex-col md:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="mx-auto w-full max-w-[92rem] flex-1 px-4 py-6 sm:px-7 lg:px-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
