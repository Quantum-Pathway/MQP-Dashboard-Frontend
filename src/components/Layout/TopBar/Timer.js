import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  logout,
  selectIsAuthenticated,
  selectTokenExpiresAt,
  showExpirationWarning,
  updateExpirationCountdown
} from "@store/auth-sso-slice";

const WARNING_SECONDS = 10;

function formatTimePart(value) {
  return String(value).padStart(2, "0");
}

/** 
 * Displays the remaining Keycloak session time. 
 * At 10 seconds remaining, the session-expiration modal is shown. 
 * At zero seconds, the user is logged out through Keycloak. 
 */
const Timer = () => {
  const dispatch = useDispatch();
  const fs = useSelector((state) => state.accessibilities.font_size);
  const authenticated = useSelector(selectIsAuthenticated);
  const tokenExpiresAt = useSelector(selectTokenExpiresAt);
  const [currentTime, setCurrentTime] = useState(Date.now());

  const warningTriggeredRef = useRef(false);
  const logoutTriggeredRef = useRef(false);

  useEffect(() => {
    warningTriggeredRef.current = false;
    logoutTriggeredRef.current = false;
    if (!authenticated || !tokenExpiresAt) {
      return undefined;
    }
    setCurrentTime(Date.now());
    
    // display Timer
    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [authenticated, tokenExpiresAt]);

  const expirationTimestamp = Number(tokenExpiresAt);
  const remainingSeconds =
    authenticated &&
      Number.isFinite(expirationTimestamp) ? Math.max(
        0,
        Math.ceil((expirationTimestamp - currentTime) / 1000)
      )
      : 0;
  
  useEffect(() => {
    /* 
    * Reset the guards whenever a new Keycloak token or 
    * session expiration timestamp is received. 
    */
    warningTriggeredRef.current = false;
    logoutTriggeredRef.current = false;
  }, [tokenExpiresAt]);

  useEffect(() => {
    if (!authenticated || !tokenExpiresAt) {
      return;
    }
    if (
      remainingSeconds > 0 &&
      remainingSeconds <= WARNING_SECONDS
    ) {
      dispatch(updateExpirationCountdown(remainingSeconds));
      if (!warningTriggeredRef.current) {
        warningTriggeredRef.current = true;
        dispatch(showExpirationWarning(remainingSeconds));
        
      }
    }

    if (
      remainingSeconds === 0 &&
      !logoutTriggeredRef.current
    ) {
      logoutTriggeredRef.current = true;
      dispatch(logout({ reason: "expired" }));
    }
  }, [authenticated, tokenExpiresAt, remainingSeconds, dispatch]);

  if (!authenticated || !tokenExpiresAt) {
    return null;
  }
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = Math.floor(remainingSeconds % 60);

  return (
    <div
      id="timer"
      style={{ fontSize: +fs }}
      title="Session expiration"
      aria-label={`Session expires in ${minutes} minutes and ${seconds} seconds`}
    >
      <span className="timer_icon" aria-hidden="true"></span>
      <span>
        {formatTimePart(minutes)} : {formatTimePart(seconds)}
      </span>
    </div>
  );
};

export default Timer;
