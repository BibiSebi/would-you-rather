import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const ProtectedRoute = ({ guards, ...rest }) => {
  const location = useLocation();
  const guardArgs = rest;
  const canBeRendered = guards?.every((guard) => guard(guardArgs));

  if (guards.length && !canBeRendered) {
    return <Navigate to="login" state={{ from: location.pathname }} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
