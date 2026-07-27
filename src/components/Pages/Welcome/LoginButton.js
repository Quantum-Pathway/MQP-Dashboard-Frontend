import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthenticationLoading } from "@store/auth-sso-slice";

const LoginButton = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const loading = useSelector(selectAuthenticationLoading);
  const [redirecting, setRedirecting] = useState(false);

  const requestedPath =
    typeof location.state?.from === "string"
      ? location.state.from
      : "/";
  
  useEffect(() => {
    const handlePageShow = () => {
      setRedirecting(false);
    }
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    }
  }, []);

  const loginHandler = async () => {
    if (redirecting) {
      return;
    }
    setRedirecting(true);

    dispatch(
      login({
        redirectPath: requestedPath,
      }),
    
    ).catch((error) => {
      console.error("Unable to start Keycloak login: ", error);
      setRedirecting(false);
    });
  };
  return (
    <React.Fragment>
      <div className="my-5 text-center">
        <button
          className="welcome-login-button"
          type="button"
          onClick={loginHandler}
          disabled={redirecting}
        >
          {redirecting ? "Redirecting..." : "Sign In"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default LoginButton;
