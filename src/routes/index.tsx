import DashboardLayout from "@/layout/dashboardLayout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { useRoutes, useLocation } from "react-router-dom";

const PublicRouteWrapper = () => {
  const routes = useRoutes(PUBLIC_ROUTES);
  return routes;
};
const PrivateRouteWrapper = () => {
  const routes = useRoutes(PRIVATE_ROUTES);
  return routes;
};

const Pages = () => {
  const location = useLocation();
  const path = location.pathname;

  // condition based on URL
  if (path === "/signin") {
    return <PublicRouteWrapper key={path} />;
  } else if (path === "/users") {
    return (
      <DashboardLayout>
        <PrivateRouteWrapper key={path} />
      </DashboardLayout>
    );
  } else return (
    <DashboardLayout>
      <PrivateRouteWrapper key={path} />
    </DashboardLayout>
  );

  // condition based on real life authentication
  // const user = localStorage.getItem("lendsqrUser");
  // return user ? (
  //   <DashboardLayout>
  //     <PrivateRouteWrapper key={location.pathname} />
  //   </DashboardLayout>
  // ) : (
  //   <PublicRouteWrapper key={location.pathname} />
  // );
};

export default Pages;
