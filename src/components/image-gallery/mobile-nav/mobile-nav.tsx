import { ChangeEventHandler } from "react";
import styles from "./mobile-nav.module.css";

export interface MobileNavProps {
  inputValue: string | undefined;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
}

export function MobileNav({ inputValue, handleInputChange }: MobileNavProps) {
  return (
    <div className={styles["mobile-nav"]}>
      <div>
        <div>
          <input
            id="searchright"
            type="search"
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="searchright">
          <span>&#9906;</span>
        </label>
      </div>
    </div>
  );
}
