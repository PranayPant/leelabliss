import { Outlet } from "react-router-dom";
import { useAuthStore } from "store/auth";
import { getIsAuthenticatingWithGoogle } from "helpers/auth/google";
import Login from "pages/login";
import { isTokenValid } from "utils/auth";

export function AuthenticationProvider() {
  const tokenExpiration = useAuthStore((state) => state.tokenInfo)?.exp;
  const isAuthenticating = getIsAuthenticatingWithGoogle();
  const isAuthenticated = isTokenValid(tokenExpiration);

  return (
    <>
      {isAuthenticated && <Outlet />}
      {!isAuthenticated && <Login />}
    </>
  );
}
