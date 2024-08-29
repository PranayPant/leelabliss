import { useUploadStore } from "store/upload";
import styles from "./upload-modal.module.css";
import { TagInput } from "components/tag-input";
import type {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEvent,
} from "react";

export function UploadSlide({ file }: { file: File | undefined }) {
  const uploads = useUploadStore((store) => store.uploads);
  const updateUploadFile = useUploadStore((store) => store.updateFile);
  const addFileTag = useUploadStore((store) => store.addFileTag);
  const removeFileTag = useUploadStore((store) => store.removeFileTag);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { id, name, value },
  }) => {
    updateUploadFile(id, name as "title" | "description", value);
  };

  const handleRemoveTag = (
    event: MouseEvent<HTMLButtonElement>,
    fileName: string,
  ) => {
    const tag = (event.target as HTMLButtonElement).getAttribute("data-tag");
    removeFileTag(fileName, tag ?? "");
  };

  const handleInputKeydown: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    event.stopPropagation();
    const key = event.key;
    if (key === "Enter") {
      const fileName = (event.target as HTMLInputElement).getAttribute("id");
      const value = (event.target as HTMLInputElement).value;
      addFileTag(fileName ?? "", value ?? "");
      (event.target as HTMLInputElement).value = "";
    }
  };
  return (
    <div className={styles["upload-slide"]}>
      <div>
        <img src={file ? URL.createObjectURL(file) : ""} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <span>
          <label htmlFor="title">Title</label>
          <input
            required
            id={file?.name}
            name="title"
            placeholder="Enter a title"
            value={
              uploads.find((item) => item.file?.name === file?.name)!.title
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
              uploads.find((item) => item.file?.name === file?.name)!
                .description
            }
            onChange={handleInputChange}
          />
        </span>
        <span>
          <label htmlFor="tags">Add up to 10 tags</label>
          <TagInput
            tags={uploads.find((item) => item.file?.name === file?.name)!.tags}
            handleRemoveTag={(e) => handleRemoveTag(e, file?.name ?? "")}
            inputProps={{
              id: file?.name,
              name: "tags",
              onKeyDown: handleInputKeydown,
            }}
          />
        </span>
      </form>
    </div>
  );
}
