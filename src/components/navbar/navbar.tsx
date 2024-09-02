import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { useIsAuthenticated } from "hooks/auth";
import { UserMenu } from "components/user-menu";
import { UploadButton } from "components/upload-button";

export function Navbar() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <ul className={styles["navbar"]}>
      {!isAuthenticated && (
        <li>
          <Link to="login">Login</Link>
        </li>
      )}
      {isAuthenticated && (
        <div className={styles["actions"]}>
          <div className={styles["upload-btn"]}>
            <UploadButton />
          </div>
          <UserMenu />
        </div>
      )}
    </ul>
  );
}
