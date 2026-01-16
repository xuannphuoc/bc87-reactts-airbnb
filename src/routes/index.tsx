import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import HomeTemplate from "../pages/HomeTemplate";
import DetailRoomPage from "../pages/HomeTemplate/ListLocal";
import HomePage from "../pages/HomeTemplate/HomePage";
import Room from "../pages/HomeTemplate/RoomDetail/room";
import { Route } from "react-router-dom";
import User from "./../pages/User";
import ManageRoom from "../pages/AdminTemplate/DashboardPage/ManageRoom";
import ManageUser from "../pages/AdminTemplate/DashboardPage/ManageUser";
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
      { path: "room/:id", element: Room },
      { path: "detail/:id/:location", element: DetailRoomPage },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "", element: DashboardPage },
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
  {
    path: "user",
    element: User,
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
