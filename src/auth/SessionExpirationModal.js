import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  selectExpirationWarningVisible,
  selectSecondsRemaining,
} from "../store/auth-sso-slice";

function SessionExpirationModal() {
  const dispatch = useDispatch();
  const visible = useSelector(selectExpirationWarningVisible);
  const secondsRemaining = useSelector(selectSecondsRemaining);

  if (!visible) {
    return null;
  }
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
      className="session-modal-backdrop"
    >
      <div className="session-modal">
        <h2 id="session-warning-title">Session expiring</h2>

        <p>
          Your session will expire in <strong>{secondsRemaining}</strong>{" "}
          seconds.
        </p>

        <p>
          You will be logged out automatically. Sign in again to continue using
          the application.
        </p>

        <button
          type="button"
          onClick={() =>
            dispatch(
              logout({
                reason: "manual",
              }),
            )
          }
        >
          Sign out now
        </button>
      </div>
    </div>
  );
}

export default SessionExpirationModal;