import { LogoutButton } from "components/logout-button";
import { CheckoutForm } from "components/payment-form";
import { useAuthStore } from "store/auth";
import styles from "./home.module.css";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={styles["container"]}>
      <h1>Home Page</h1>
      {user && <h2>Welcome {user?.name}</h2>}
      <>{/* <CheckoutForm /> */}</>
    </div>
  );
}
