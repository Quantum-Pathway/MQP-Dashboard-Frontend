import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeAuthentication,
  selectAuthenticationInitialized,
} from "@store/auth-sso-slice";

function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const initialized = useSelector(selectAuthenticationInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeAuthentication());
    }
  }, [dispatch, initialized]);

  if (!initialized) {
    return (
      <div className="authentication-loading" role="status">
        Loading...
      </div>);
  }

  return children;
}

export default AuthBootstrap;