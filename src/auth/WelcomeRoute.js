import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectAuthenticationInitialized,
  selectIsAuthenticated,
} from "@store/auth-sso-slice";
import WelcomeRoot from "@components/Pages/Welcome/WelcomeRoot";

const WelcomeRoute = () => {
  const initialized = useSelector(selectAuthenticationInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  if (!initialized) {
    return (
      <div className="authentication-loading" role="status">
        Loading...
      </div>
    );
  }
  if (authenticated) {
    return <Navigate to="/" replace />;
  }
  return <WelcomeRoot />;
};
export default WelcomeRoute;
