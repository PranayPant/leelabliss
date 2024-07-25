import { authorizeWithGoogle } from "helpers/auth/google";
import { ReactEventHandler } from "react";

export function LoginButton() {
  const navigate: ReactEventHandler<HTMLButtonElement> = () => {
    authorizeWithGoogle();
  };
  return (
    <div>
      <button onClick={navigate}>Login with Google</button>
    </div>
  );
}
