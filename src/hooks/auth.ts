import { useAuthStore } from "store/auth";
import { isTokenValid } from "utils/auth";

export function useIsAuthenticated() {
  const tokenExpiration = useAuthStore((state) => state.tokenInfo)?.exp;
  const accessToken = useAuthStore((state) => state.accessToken);
  return !!accessToken && isTokenValid(tokenExpiration);
}
