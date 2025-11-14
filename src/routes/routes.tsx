import Dashboard from "@/pages/app/dashboard";
import { Signin } from "@/pages/auth";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "@/utils/constants";
import { Navigate } from "react-router-dom";

interface AppRoute {
  path: string;
  element: React.ReactNode;
  children?: [
    {
      path: string;
      element: React.ReactNode;
    }
  ];
}

const { ROOT, SIGNIN } = PUBLIC_PATHS;
const { DASHBOARD } = PRIVATE_PATHS;


export const PUBLIC_ROUTES: AppRoute[] = [
  {
    path: ROOT,
    element: <Signin />,
  },
  {
    path: SIGNIN,
    element: <Signin />,
  },
  {
    path: "*",
    element: <Navigate to={ROOT} replace />,
  },
];

export const PRIVATE_ROUTES: AppRoute[] = [
  {
    path: DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <Navigate to={DASHBOARD} replace />,
  },
];