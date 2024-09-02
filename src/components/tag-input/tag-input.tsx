import {
  InputHTMLAttributes,
  KeyboardEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./tag-input.module.css";

export function TagInput({
  inputProps,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
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

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("data-tags", JSON.stringify(tags));
    }
  }, [tags]);

  return (
    <div className={styles["tags-input"]}>
      <input
        ref={ref}
        type="text"
        placeholder="Enter tag name"
        onKeyDown={handleInputKeydown}
        {...inputProps}
      />
      <ul>
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
