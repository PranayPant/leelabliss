import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";
import { GoogleToken, GoogleUser } from "types/auth";
import { readStoreFromLocalStorage } from "utils/localStorage";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { isTokenValid } from "utils/auth";

export interface UserAuth {
  isAuthenticationError: boolean;
  user: GoogleUser | undefined;
  accessToken: string | undefined;
  tokenInfo: GoogleToken | undefined;
  checkIsAuthenticated: () => boolean;
  setIsAuthenticationError: (isAuthenticationError: boolean) => void;
  setUser: (user: GoogleUser) => void;
  setAccessToken: (token: string) => void;
  setTokenInfo: (tokenInfo: GoogleToken) => void;
  clear: VoidFunction;
}

export const authStore = createStore<UserAuth>()(
  devtools(
    persist(
      (set, get) => {
        const localStorage = readStoreFromLocalStorage();

        return {
          isAuthenticationError: false,
          user: localStorage?.user,
          accessToken: localStorage?.accessToken,
          tokenInfo: localStorage?.tokenInfo,
          checkIsAuthenticated: () => isTokenValid(get().tokenInfo?.exp),
          setIsAuthenticationError: (isAuthenticationError) =>
            set({ isAuthenticationError }),
          setUser: (user) => set({ user }),
          setAccessToken: (accessToken) => set({ accessToken }),
          setTokenInfo: (tokenInfo) => set({ tokenInfo }),
          clear: () =>
            set({
              isAuthenticationError: false,
              user: undefined,
              accessToken: undefined,
              tokenInfo: undefined,
            }),
        };
      },
      {
        name: "user-auth",
        partialize: ({ user, accessToken, tokenInfo }) => ({
          user,
          accessToken,
          tokenInfo,
        }),
      },
    ),
  ),
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
