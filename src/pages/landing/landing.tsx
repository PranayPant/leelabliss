import { LoginButton } from "components/login-button";
import { useIsAuthenticated } from "hooks/auth";
import { Navigate } from "react-router-dom";

export default function LandingPage() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div>
      <h1>Welcome to Leelabliss</h1>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && <Navigate to="/home" />}
    </div>
  );
}
