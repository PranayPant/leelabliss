import {
  getGoogleUser,
  getIsAuthenticatingWithGoogle,
} from "helpers/auth/google";
import { useIsAuthenticated } from "hooks/auth";
import { useCallback, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export function AuthenticationProvider() {
  const isAuthenticated = useIsAuthenticated();
  const isAuthenticating = getIsAuthenticatingWithGoogle();

  const fetchUserInfo = useCallback(async () => {
    await getGoogleUser();
  }, []);

  useEffect(() => {
    if (isAuthenticating) {
      fetchUserInfo();
    }
  }, [fetchUserInfo, isAuthenticating]);

  return (
    <>
      {isAuthenticated && <Outlet />}
      {!isAuthenticated && !isAuthenticating && <Navigate to="/" />}
    </>
  );
}
