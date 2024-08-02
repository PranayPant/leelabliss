import {
  getGoogleUser,
  getIsAuthenticatingWithGoogle,
} from "helpers/auth/google";
import { useIsAuthenticated } from "hooks/auth";
import { useCallback, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "store/auth";
import { useContentStore } from "store/content";

export function AuthenticationProvider() {
  const isAuthenticated = useIsAuthenticated();
  const isAuthenticating = getIsAuthenticatingWithGoogle();
  const resetAuth = useAuthStore((store) => store.clear);
  const initGallery = useContentStore((store) => store.init);

  const initialize = useCallback(async () => {
    try {
      await getGoogleUser();
    } catch (error) {
      console.log("Error initializing app:", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticating) {
      initialize();
    }
  }, [initialize, isAuthenticating]);

  useEffect(() => {
    if (isAuthenticated) {
      initGallery();
    }
  }, [isAuthenticated, initGallery]);

  !isAuthenticated && !isAuthenticating && resetAuth();

  return (
    <>
      {isAuthenticated && <Outlet />}
      {!isAuthenticated && !isAuthenticating && <Navigate to="/" />}
    </>
  );
}
