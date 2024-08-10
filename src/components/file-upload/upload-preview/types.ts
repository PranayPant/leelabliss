import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

export type UploadPreviewState = {
  fileName: string;
  description: string;
  tags: string[];
  tagInput: string;
};

export type UploadPreviewStateHandlers = {
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  handleInputKeydown: KeyboardEventHandler<HTMLInputElement>;
  handleRemoveTag: MouseEventHandler<HTMLButtonElement>;
};
