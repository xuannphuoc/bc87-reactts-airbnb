import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import HomeTemplate from "../pages/HomeTemplate";
import DetailRoomPage from "../pages/HomeTemplate/DetailRoomPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import Room from "../pages/HomeTemplate/RoomDetail";
import { Route } from "react-router-dom";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";
import User from "./../pages/User";
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
      { path: "detail/:id", element: DetailRoomPage },
      { path: "profile", element: ProfilePage },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [{ path: "dashboard", element: DashboardPage }],
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
