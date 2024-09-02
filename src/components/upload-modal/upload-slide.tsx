import { useUploadStore } from "store/upload";
import styles from "./upload-modal.module.css";
import { TagInput } from "components/tag-input";

export function UploadSlide({ file }: { file: File | undefined }) {
  const isSubmittingForm = useUploadStore((store) => store.uploads).some(
    (upload) => upload.uploadStatus === "pending",
  );
  return (
    <div className={styles["upload-slide"]}>
      <div>
        <img src={file ? URL.createObjectURL(file) : ""} />
      </div>
      <form id={file?.name} onSubmit={(e) => e.preventDefault()}>
        <span>
          <label htmlFor="title">Title</label>
          <input
            required
            name="title"
            placeholder="Enter a title"
            defaultValue={file?.name}
            disabled={isSubmittingForm}
          />
        </span>
        <span>
          <label htmlFor="description">Description</label>
          <input
            name="description"
            placeholder="Enter a description"
            disabled={isSubmittingForm}
          />
        </span>
        <span>
          <label htmlFor="tags">Add up to 10 tags</label>
          <TagInput
            inputProps={{
              name: "tags",
              disabled: isSubmittingForm,
            }}
          />
        </span>
      </form>
    </div>
  );
}
