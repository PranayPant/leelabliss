import styles from "./tag-input.module.css";
import { TagInputState } from "./types";

export function TagInput({ tags, handleRemoveTag, inputProps }: TagInputState) {
  return (
    <div className={styles["tags-input"]}>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <button
              className="delete-button"
              data-tag={tag}
              onClick={handleRemoveTag}
            >
              ✖
            </button>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        name="tags"
        placeholder="Enter tag name"
        {...inputProps}
      />
    </div>
  );
}
