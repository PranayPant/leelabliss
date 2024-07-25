import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "store/auth";

export function AuthenticationProvider({ children }: { children?: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {isAuthenticated && children}
      {!isAuthenticated && <Navigate to="/login" />}
      <Outlet />
    </>
  );
}
