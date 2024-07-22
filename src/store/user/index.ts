import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface UserAuth {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useUserAuth = create<UserAuth>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      }),
      {
        name: "user-auth-storage",
      }
    )
  )
);
