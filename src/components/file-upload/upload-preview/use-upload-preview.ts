import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useState,
} from "react";
import { UploadPreviewState } from "./types";
import { UploadFile } from "../types";

export function useUploadPreview(files: UploadFile[]) {
  const previewState = files.map(() => ({
    fileName: "",
    description: "",
    tagInput: "",
    tags: [],
  }));

  console.log(files, previewState);

  const [previews, setPreviews] = useState<UploadPreviewState[]>(previewState);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { id: fileName, name, value },
  }) => {
    if (!fileName || !name || !value) return;
    setPreviews((prev) => [
      ...prev.filter((preview) => preview.fileName !== fileName),
      {
        ...prev.find((preview) => preview.fileName === fileName),
        [name]: value,
      } as UploadPreviewState,
    ]);
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      const { id: fileName, name, value } = event.target as HTMLInputElement;
      event.preventDefault();
      setPreviews((prev) => [
        ...prev.filter((preview) => preview.fileName !== fileName),
        {
          ...prev.find((preview) => preview.fileName === fileName),
          [name]: value,
        } as UploadPreviewState,
      ]);
    }
  };

  const handleRemoveTag: MouseEventHandler<HTMLButtonElement> = ({
    target,
  }) => {
    const tag = (target as HTMLButtonElement).getAttribute("data-tag");
    const fileName = (target as HTMLButtonElement).closest("input")?.id;
    setPreviews((prev) => [
      ...prev.filter((preview) => preview.fileName !== fileName),
      {
        ...prev.find((preview) => preview.fileName === fileName),
        tags: prev
          .find((preview) => preview.fileName === fileName)!
          .tags.filter((prevTag) => prevTag !== tag),
      } as UploadPreviewState,
    ]);
  };

  return {
    previews,
    handleInputChange,
    handleInputKeydown,
    handleRemoveTag,
  };
}
