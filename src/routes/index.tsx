import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import HomeTemplate from "../pages/HomeTemplate";
import DetailRoomPage from "../pages/HomeTemplate/DetailRoomPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListRoomPage from "../pages/HomeTemplate/ListRoomPage";
import { Route } from "react-router-dom";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";
import ManageUser from "../pages/AdminTemplate/DashboardPage/ManageUser";
import ManageRoom from "../pages/AdminTemplate/DashboardPage/ManageRoom";
import ManageLocation from "../pages/AdminTemplate/DashboardPage/ManageLocation";
import ManageBooking from "../pages/AdminTemplate/DashboardPage/ManageBooking";

type Route = {
  path: string;
  element: React.JSXElementConstructor<any>;
  nested?: Route[];
};

const routes: Route[] = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      { path: "", element: HomePage },
      { path: "list-room", element: ListRoomPage },
      { path: "detail/:id", element: DetailRoomPage },
      { path: "profile", element: ProfilePage },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: DashboardPage },
      { path: "user", element: ManageUser },
      { path: "room", element: ManageRoom },
      { path: "location", element: ManageLocation },
      { path: "booking", element: ManageBooking },
    ],
  },
  {
    path: "auth",
    element: AuthPage,
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route path={item.path} element={<item.element />} />
          ))}
        </Route>
      );
    } else {
      return <Route path={route.path} element={<route.element />} />;
    }
  });
};
