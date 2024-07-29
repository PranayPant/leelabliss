import { useAuthStore } from "store/auth";
import styles from "./user-menu.module.css";
import { ReactEventHandler, useState } from "react";
import { useOutsideClick } from "hooks/dom";
import { LogoutButton } from "components/logout-button";

export interface UserMenuProps {
  userName: string;
  profileImg: string;
}

export function UserMenuComponent({ userName, profileImg }: UserMenuProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleMenu: ReactEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setShowMenu(!showMenu);
  };
  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));
  return (
    <div ref={ref} className={styles["container"]}>
      <button onClick={toggleMenu} className={styles["top"]}>
        <img src={profileImg} alt="avatar" />
      </button>
      {showMenu && (
        <ul>
          <li>
            <LogoutButton />
          </li>
          <li>{userName}</li>
        </ul>
      )}
    </div>
  );
}

export function UserMenu() {
  const user = useAuthStore((state) => state.user);
  return (
    <UserMenuComponent
      userName={user?.name ?? ""}
      profileImg={user?.picture ?? ""}
    />
  );
}
