import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const ProtectedRoute = ({ guards, ...rest }) => {
  const guardArgs = rest;
  const canBeRendered = guards?.every((guard) => guard(guardArgs));

  if (guards.length && !canBeRendered) {
    return <Navigate to="log-in" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
