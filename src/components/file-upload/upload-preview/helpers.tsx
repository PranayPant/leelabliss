import { TagInput } from "components/tag-input";
import styles from "./upload-preview.module.css";
import { type UploadFile, useUploadStore, uploadStore } from "store/upload";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

export function useUploadPreviewSlides() {
  const updateUploadFile = useUploadStore((store) => store.updateFile);
  const addFileTag = useUploadStore((store) => store.addFileTag);
  const removeFileTag = useUploadStore((store) => store.removeFileTag);
  const uploadStore = useUploadStore((store) => store);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { id, name, value },
  }) => {
    updateUploadFile(id, name as "title" | "description", value);
  };

  const handleRemoveTag: MouseEventHandler<HTMLButtonElement> = (event) => {
    const id = (event.target as HTMLButtonElement).id;
    const tag = (event.target as HTMLButtonElement)
      .closest("button")
      ?.getAttribute("data-tag");
    removeFileTag(id, tag ?? "");
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const key = event.key;
    if (key === "Enter") {
      const fileName = (event.target as HTMLInputElement).getAttribute("id");
      const value = (event.target as HTMLInputElement).value;
      console.log(fileName, value);
      addFileTag(fileName ?? "", value ?? "");
    }
  };

  return uploadStore.uploads.map(({ file }) => ({
    id: file?.name ?? "",
    data: (
      <div className={styles["upload-preview-container"]}>
        <div>
          <img src={file ? URL.createObjectURL(file) : ""} />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <span>
            <label htmlFor="title">Title</label>
            <input
              id={file?.name}
              name="title"
              placeholder="Enter a title"
              value={
                uploadStore.uploads.find(
                  (item) => item.file?.name === file?.name
                )!.title
              }
              onChange={handleInputChange}
            />
          </span>
          <span>
            <label htmlFor="description">Description</label>
            <input
              id={file?.name}
              name="description"
              placeholder="Enter a description"
              value={
                uploadStore.uploads.find(
                  (item) => item.file?.name === file?.name
                )!.description
              }
              onChange={handleInputChange}
            />
          </span>
          <span>
            <label htmlFor="tags">Add up to 10 tags</label>
            <TagInput
              tags={
                uploadStore.uploads.find(
                  (item) => item.file?.name === file?.name
                )!.tags
              }
              handleRemoveTag={handleRemoveTag}
              inputProps={{
                id: file?.name,
                name: "tags",
                onKeyDown: handleInputKeydown,
              }}
            />
          </span>
        </form>
      </div>
    ),
  }));
}

export function handleDrop(acceptedFiles: File[]) {
  const addFile = uploadStore.getState().addFile;
  acceptedFiles.forEach((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event: ProgressEvent<FileReader>) {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = function (event: Event) {
        const image = event.currentTarget as HTMLImageElement | undefined;
        const height = image?.naturalHeight ?? 0;
        const width = image?.naturalWidth ?? 0;
        addFile({
          file,
          title: "",
          description: "",
          width,
          height,
          tags: [],
        });
      };
    };
  });
}
