import {
  useRef,
  ChangeEventHandler,
  useState,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import { TagInputState } from "./types";

export function useTagInput(): TagInputState {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    // Check if the key pressed is 'Enter'
    if (event.key === "Enter") {
      // Prevent the default action of the keypress
      // event (submitting the form)
      event.preventDefault();
      setTags((prev) => [...prev, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };
  const handleRemoveTag: MouseEventHandler<HTMLButtonElement> = ({
    target,
  }) => {
    const tagToRemove = (target as HTMLButtonElement).getAttribute("data-tag");
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return {
    tags,
    handleRemoveTag,
    inputProps: {
      onChange: handleInputChange,
      onKeyDown: handleInputKeydown,
    },
  };
}
