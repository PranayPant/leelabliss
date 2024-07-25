import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";
import { GoogleToken, GoogleUser } from "types/auth";
import { readStoreFromLocalStorage } from "utils/localStorage";
import { mountStoreDevtool } from "simple-zustand-devtools";

export interface UserAuth {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isAuthenticationError: boolean;
  user: GoogleUser | undefined;
  accessToken: string | undefined;
  tokenInfo: GoogleToken | undefined;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAuthenticationError: (isAuthenticationError: boolean) => void;
  setUser: (user: GoogleUser) => void;
  setAccessToken: (token: string) => void;
  setTokenInfo: (tokenInfo: GoogleToken) => void;
}

export const authStore = createStore<UserAuth>()(
  devtools(
    persist(
      (set) => {
        const localStorage = readStoreFromLocalStorage();
        const tokenExpiration = localStorage?.tokenInfo?.exp;

        return {
          isAuthenticating: false,
          isAuthenticated:
            !!tokenExpiration && parseInt(tokenExpiration) * 1000 > Date.now(),
          isAuthenticationError: false,
          user: localStorage?.user,
          accessToken: localStorage?.accessToken,
          tokenInfo: localStorage?.tokenInfo,
          setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
          setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
          setIsAuthenticationError: (isAuthenticationError) =>
            set({ isAuthenticationError }),
          setUser: (user) => set({ user }),
          setAccessToken: (accessToken) => set({ accessToken }),
          setTokenInfo: (tokenInfo) => set({ tokenInfo }),
        };
      },
      {
        name: "user-auth",
      }
    )
  )
);

function _useAuthStore(): UserAuth;
function _useAuthStore<T>(selector: (state: UserAuth) => T): T;
function _useAuthStore<T>(selector?: (state: UserAuth) => T) {
  return useStore(authStore, selector!);
}

export const useAuthStore = _useAuthStore;

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("auth-store", authStore);
}
