import { InputHTMLAttributes } from "react";

export interface TagInputProps {
  tags: string[];
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}
