import { UserAuth } from "store/auth";

export function readStoreFromLocalStorage(): UserAuth | undefined {
  return JSON.parse(window.localStorage.getItem("state") ?? "{}");
}
