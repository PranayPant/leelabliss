import { LoginButton } from "components/login-button";
import {
  getGoogleUser,
  getIsAuthenticatingWithGoogle,
} from "helpers/auth/google";
import { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/auth";
import { isTokenValid } from "utils/auth";

export default function LoginPage() {
  const tokenExpiration = useAuthStore((state) => state.tokenInfo)?.exp;
  const isAuthenticated = isTokenValid(tokenExpiration);
  const user = useAuthStore((state) => state.user);

  const fetchUserInfo = useCallback(async () => {
    await getGoogleUser();
  }, []);

  useEffect(() => {
    if (getIsAuthenticatingWithGoogle()) {
      fetchUserInfo();
    }
  }, [fetchUserInfo]);
  return (
    <div>
      {!isAuthenticated && (
        <>
          <h1>Log in</h1>
          <LoginButton />
        </>
      )}
      {isAuthenticated && !!user && <Navigate to="/home" />}
    </div>
  );
}
