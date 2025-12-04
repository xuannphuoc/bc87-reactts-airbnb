import type { RootState } from "../../store";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
// import { useEffect } from "react";
// import Navbar from "./_components/Navbar";

export default function AdminTemplate() {
  const data = useSelector((state: RootState) => state.authReducer.data);
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(tryAutoLogin());
  // }, [dispatch]);

  if (!data) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Topbar />
        <div style={{ padding: 20 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
