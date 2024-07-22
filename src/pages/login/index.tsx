import { Navigate } from "react-router-dom";
import { useUserAuth } from "store/user";
import { getRedirectUrl } from "utils/auth";

export default function Login() {
  const isLoggedIn = useUserAuth((state) => state.isLoggedIn);
  if (!isLoggedIn) {
    const url = getRedirectUrl();
    console.log(url);
    window.location.href = url;
  } else {
    <Navigate to="home" />;
  }
  return <h1>Logging in...</h1>;
}
