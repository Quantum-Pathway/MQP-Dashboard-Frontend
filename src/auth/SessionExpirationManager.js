import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectAuthentication,
  showExpirationWarning,
  updateExpirationCountdown,
} from "@store/auth-sso-slice";

const WARNING_SECONDS = 10;

function SessionExpirationManager() {
  const dispatch = useDispatch();
  const { authenticated, tokenExpiresAt } = useSelector(selectAuthentication);

  useEffect(() => {
    if (!authenticated || !tokenExpiresAt) {
      return undefined;
    }
    let logoutStarted = false;
    const updateTimer = () => {
      const milisecondsRemaining = tokenExpiresAt - Date.now();
      const secondsRemaining = Math.max(0, Math.ceil(milisecondsRemaining / 1000));
      if (secondsRemaining <= 0) {
        if (!logoutStarted) {
          logoutStarted = true;
          dispatch(logout({ reason: "expired" }));
        }
        return;
      }
      if (secondsRemaining <= WARNING_SECONDS) {
        dispatch(showExpirationWarning(secondsRemaining));
        dispatch(updateExpirationCountdown(secondsRemaining));
      }
    }
    updateTimer();
    const internalID = window.setInterval(updateTimer, 1000);
    return () => {
      window.clearInterval(internalID);
    }
  }, [authenticated, tokenExpiresAt, dispatch]);
  return null;
}
export default SessionExpirationManager;
