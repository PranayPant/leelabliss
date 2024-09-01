import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEvent,
  useRef,
  useState,
} from "react";
import styles from "./tag-input.module.css";

export function TagInput({
  inputProps,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    event.stopPropagation();
    const key = event.key;
    if (key === "Enter") {
      const input = event.target as HTMLInputElement;
      const value = input.value;
      setTags((prev) => [...prev, value]);
      input.value = "";
    }
  };
  const handleRemoveTag = (event: MouseEvent<HTMLButtonElement>) => {
    const currentTag = (event.target as HTMLButtonElement).getAttribute(
      "data-tag",
    );
    setTags((prev) => prev.filter((tag) => tag !== currentTag));
  };

  return (
    <div className={styles["tags-input"]}>
      <input
        type="text"
        name="tags"
        placeholder="Enter tag name"
        onKeyDown={handleInputKeydown}
        {...inputProps}
      />
      <ul ref={ref}>
        {tags?.map((tag) => (
          <li key={tag}>
            <button type="button" data-tag={tag} onClick={handleRemoveTag}>
              ✖
            </button>
            <span>{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
