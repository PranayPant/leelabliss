import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useIsAuthenticated } from "hooks/auth";

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
    </ul>
  );
}
