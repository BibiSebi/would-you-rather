import { Outlet } from "react-router-dom";
import LogIn from "../pages/LogIn";

const ProtectedRoute = ({ fallback = () => <LogIn />, guards, ...rest }) => {
  const guardArgs = rest;
  const canBeRendered = guards?.every((guard) => guard(guardArgs));

  if (guards.length && !canBeRendered) {
    return fallback();
  }

  return <Outlet />;
};

export default ProtectedRoute;
