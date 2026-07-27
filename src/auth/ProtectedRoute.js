import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthenticationInitialized,
  selectIsAuthenticated,
} from "@store/auth-sso-slice";

const ProtectedRoute = () => {
  const location = useLocation();
  const initialized = useSelector(selectAuthenticationInitialized);
  const authenticated = useSelector(selectIsAuthenticated);

  if (!initialized) {
    return (
      <div className="authentication-loading" role="status">
        Loading...
      </div>
    );
  }
  if (!authenticated) {
    const requestedPath = [
      location.pathname,
      location.search,
      location.hash
    ].join("");

    return (
      <Navigate
        to="/welcome"
        replace
        state={{ from: requestedPath }}
      />
    );
  }
  return <Outlet />;
};
export default ProtectedRoute;
