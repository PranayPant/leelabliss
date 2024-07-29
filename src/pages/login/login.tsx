import { LoginButton } from "components/login-button";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/auth";
import { isTokenValid } from "utils/auth";

export default function LoginPage() {
  const tokenExpiration = useAuthStore((state) => state.tokenInfo)?.exp;
  const isAuthenticated = isTokenValid(tokenExpiration);

  return (
    <div>
      {!isAuthenticated && (
        <>
          <h1>Log in</h1>
          <LoginButton />
        </>
      )}
      {isAuthenticated && <Navigate to="/home" />}
    </div>
  );
}
