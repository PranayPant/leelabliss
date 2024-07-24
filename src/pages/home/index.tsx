import { LogoutButton } from "components/logout-button";
import { useAuthStore } from "store/auth";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <div>
      <h1>Home Page</h1>
      {user && <h2>Welcome {user?.name}</h2>}
      {isAuthenticated && <LogoutButton />}
    </div>
  );
}
