import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEventHandler, useCallback, useState } from "react";

export function useInput(inputDelay?: number) {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, inputDelay ?? 500);
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [],
  );
  return { value, debouncedValue, handleChange };
}
