import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@store/auth-sso-slice';

/* Logs out from Keycloak and redirects to Keycloak login */
const Logout = ({ onHidden }) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const fs = useSelector((state) => state.accessibilities.font_size);
  const navbar_fs = +fs * 1.1;

  
  const logoutHandler = async () => {
    if (isLoggingOut) {
      return;
    }
    setIsLoggingOut(true);
    try {
      await dispatch(logout({ reason: "manual" })).unwrap();
    } catch (error) {
      console.error(
        "Keycloak logout failed: ",
        error
      );
      setIsLoggingOut(false);
    }
    
  };

  return (
    <React.Fragment>
      <button
        className="logout_btn"
        type="button"
        onClick={logoutHandler}
        disabled={isLoggingOut}
        style={{ fontSize: navbar_fs }}
        aria-label="Log out"
      >
          <span className="logout_icon" aria-hidden="true"></span>
        {onHidden && (
          <span className="link_text">
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </span>
        )}
        </button>
    </React.Fragment>
  );
};

export default Logout;

