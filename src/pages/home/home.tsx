import { LogoutButton } from "components/logout-button";
import { CheckoutForm } from "components/payment-form";
import { useAuthStore } from "store/auth";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <h1>Home Page</h1>
      {user && <h2>Welcome {user?.name}</h2>}
      <>
        {/* <CheckoutForm /> */}
        <LogoutButton />
      </>
    </div>
  );
}
