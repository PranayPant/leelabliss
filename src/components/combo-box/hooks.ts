import { useState, useCallback, ChangeEvent } from "react";
import { ComboBoxState } from "./combo-box";

export function useComboBox(): ComboBoxState {
  const [inputValue, setInputValue] = useState<string>("");
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  return { inputValue, handleChange };
}
