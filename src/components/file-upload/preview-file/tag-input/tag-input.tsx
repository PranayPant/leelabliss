import styles from "./tag-input.module.css";

export function TagInput() {
  return (
    <div className={styles["tags-input"]}>
      <ul></ul>
      <input type="text" name="tags" placeholder="Enter tag name" />
    </div>
  );
}
