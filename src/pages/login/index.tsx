import { LoginButton } from "components/login-button";
import { getGoogleUser } from "helpers/auth/google";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/auth";

export default function Login() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const fetchUserInfo = async () => {
    await getGoogleUser();
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
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
