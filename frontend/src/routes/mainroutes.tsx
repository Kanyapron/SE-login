import { lazy } from "react";
import { useRoutes, RouteObject} from "react-router-dom";
import Loadable from "../components/third-patry/Loadable"

const Login = Loadable(lazy(() => import("../page/authentication/Login/Login")));
const Register = Loadable(lazy(() => import("../page/authentication/Register/Register")));

const AdminPage = Loadable(lazy(() => import("../page/Admin/Admin")));
const UserPage = Loadable(lazy(() => import("../page/User/User")));
const Zookeeper = Loadable(lazy(() => import("../page/Zookeeper/Zookeeper")));
const Veterinarian = Loadable(lazy(() => import("../page/Veterinarian/Veterinarian")));

const AdminRoutes = (): RouteObject[] => [
  {
    path: "/", element: <AdminPage />, 
  },                                          
  {
    path: "/admin",
    children: [
      { index: true, element: <AdminPage /> },
    ],
  },
];

const UserRoutes = (): RouteObject[] => [
  {
    path: "/", element: <UserPage />, 
  },                                          
  {
    path: "/user",
    children: [
      { index: true, element: <UserPage /> },
    ],
  },
];

const ZookeeperRoutes = (): RouteObject[] => [
  {
    path: "/", element: <Zookeeper />, 
  },                                          
  {
    path: "/zookeeper",
    children: [
      { index: true, element: <Zookeeper /> },
    ],
  },
];

const VeterinarianRoutes = (): RouteObject[] => [
  {
    path: "/", element: <Veterinarian />, 
  },                                          
  {
    path: "/veterinarian",
    children: [
      { index: true, element: <Veterinarian /> },
    ],
  },
];

const MainRoutes = (): RouteObject[] => [
  {
    path: "/",
    children: [
      { index: true, element: <Login /> },
      {path: "/register", element: <Register/>},
      { path: "*", element: <Login /> },
    ],
  },
];

function ConfigRoutes() {
  const isLoggedIn = localStorage.getItem('isLogin') === 'true';
  const userRole = localStorage.getItem('userRole');
  //const RoleID = localStorage.getItem('RoleID');

  console.log("isLoggedIn:", isLoggedIn);
  console.log("userRole:", userRole);
  //console.log("RoleID:", RoleID);

  let routes: RouteObject[] = [];

  if (isLoggedIn) {
    switch (userRole) {
      case 'Admin':
        routes = AdminRoutes();
        break;
      case 'User':
        routes = UserRoutes();
        break;
      case 'Zookeeper':
        routes = ZookeeperRoutes();
        break;
      case 'Veterinarian':
        routes = VeterinarianRoutes();
        break;
      default:
        routes = MainRoutes();
        break;
    }
  } 
  else {
    routes = MainRoutes();
  }

  return useRoutes(routes);
}
export default ConfigRoutes;
