import AdminTemplate from "../pages/AdminTemplate";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import HomeTemplate from "../pages/HomeTemplate";
import DetailRoomPage from "../pages/HomeTemplate/DetailRoomPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListRoomPage from "../pages/HomeTemplate/ListRoomPage";
import { Route } from "react-router-dom";
import ProfilePage from "../pages/HomeTemplate/ProfilePage";

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
    nested: [{ path: "dashboard", element: DashboardPage }],
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
