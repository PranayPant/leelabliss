import { LoginButton } from "components/login-button";
import { getGoogleUser } from "helpers/auth/google";
import { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/auth";

export default function Login() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthenticating = useAuthStore((state) => state.isAuthenticating);
  const setIsAuthenticating = useAuthStore(
    (state) => state.setIsAuthenticating
  );
  const fetchUserInfo = useCallback(async () => {
    await getGoogleUser();
    //setIsAuthenticating(false);
  }, [setIsAuthenticating]);

  useEffect(() => {
    isAuthenticating && fetchUserInfo();
  }, [isAuthenticating, fetchUserInfo]);

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
