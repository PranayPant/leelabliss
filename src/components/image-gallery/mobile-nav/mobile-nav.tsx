import styles from "./mobile-nav.module.css";

export function MobileNav() {
  return (
    <div className={styles["mobile-nav"]}>
      <div>
        <div>
          <input
            className="search"
            id="searchright"
            type="search"
            placeholder="Search"
          />
        </div>
        <label className="button searchbutton" htmlFor="searchright">
          <span className="mglass">&#9906;</span>
        </label>
      </div>
    </div>
  );
}
