import { Link } from "react-router-dom";
import styles from "./index.module.css";

export function Navbar() {
  return (
    <ul className={styles["navbar"]}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="about">About</Link>
      </li>
    </ul>
  );
}
