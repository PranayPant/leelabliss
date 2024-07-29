import {
  getGoogleUser,
  getIsAuthenticatingWithGoogle,
} from "helpers/auth/google";
import { useIsAuthenticated } from "hooks/auth";
import { useCallback, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "store/auth";

export function AuthenticationProvider() {
  const isAuthenticated = useIsAuthenticated();
  const isAuthenticating = getIsAuthenticatingWithGoogle();
  const resetAuth = useAuthStore((store) => store.clear);

  const fetchUserInfo = useCallback(async () => {
    await getGoogleUser();
  }, []);

  useEffect(() => {
    if (isAuthenticating) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, isAuthenticating]);

  !isAuthenticated && !isAuthenticating && resetAuth();

  return (
    <>
      {isAuthenticated && <Outlet />}
      {!isAuthenticated && !isAuthenticating && <Navigate to="/" />}
    </>
  );
}
