import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { devtools, persist } from "zustand/middleware";
import { GoogleUser } from "types/auth";
import { readStoreFromLocalStorage } from "utils/localStorage";
import { mountStoreDevtool } from "simple-zustand-devtools";

export interface UserAuth {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  isAuthenticationError: boolean;
  user: GoogleUser | undefined;
  accessToken: string | undefined;
  setIsAuthenticating: (isAuthenticating: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsAuthenticationError: (isAuthenticationError: boolean) => void;
  setUser: (user: GoogleUser) => void;
  setAccessToken: (token: string) => void;
}

export const authStore = createStore<UserAuth>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticating:
          readStoreFromLocalStorage()?.isAuthenticating ?? false,
        isAuthenticated: readStoreFromLocalStorage()?.isAuthenticated ?? false,
        isAuthenticationError:
          readStoreFromLocalStorage()?.isAuthenticationError ?? false,
        user: readStoreFromLocalStorage()?.user ?? undefined,
        accessToken: readStoreFromLocalStorage()?.accessToken ?? undefined,
        setIsAuthenticating: (isAuthenticating) => set({ isAuthenticating }),
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        setIsAuthenticationError: (isAuthenticationError) =>
          set({ isAuthenticationError }),
        setUser: (user) => set({ user }),
        setAccessToken: (accessToken) => set({ accessToken }),
      }),
      {
        name: "user-auth-storage",
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
