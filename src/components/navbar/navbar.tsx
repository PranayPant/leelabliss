import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useIsAuthenticated } from "hooks/auth";
import { LogoutButton } from "components/logout-button";
import { UserMenu } from "components/user-menu";

export function Navbar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <ul className={styles["navbar"]}>
      <li>
        <Link to="home">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
      {!isAuthenticated && (
        <li>
          <Link to="login">Login</Link>
        </li>
      )}
      {isAuthenticated && (
        <div className={styles["logout"]}>
          <UserMenu />
        </div>
      )}
    </ul>
  );
}
