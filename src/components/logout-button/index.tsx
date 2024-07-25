import { logoutGoogleUser } from "helpers/auth/google";
import { ReactEventHandler } from "react";

export function LogoutButton() {
  const navigate: ReactEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    logoutGoogleUser();
  };
  return (
    <div>
      <button onClick={navigate}>Logout</button>
    </div>
  );
}
