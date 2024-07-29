import { LoginButton } from "components/login-button";
import { useIsAuthenticated } from "hooks/auth";
import { Navigate } from "react-router-dom";
import styles from "./landing.module.css";

export default function LandingPage() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className={styles["container"]}>
      <div>
        <h1>Leelabliss</h1>
        {!isAuthenticated && <LoginButton />}
      </div>
      {isAuthenticated && <Navigate to="/home" />}
    </div>
  );
}
