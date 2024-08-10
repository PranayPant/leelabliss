import { InputHTMLAttributes, MouseEventHandler } from "react";

export interface TagInputState {
  tags: string[];
  handleRemoveTag: MouseEventHandler<HTMLButtonElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
