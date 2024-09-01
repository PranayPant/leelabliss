import styles from "./upload-modal.module.css";
import { TagInput } from "components/tag-input";

export function UploadSlide({ file }: { file: File | undefined }) {
  return (
    <div className={styles["upload-slide"]}>
      <div>
        <img src={file ? URL.createObjectURL(file) : ""} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <span>
          <label htmlFor="title">Title</label>
          <input required name="title" placeholder="Enter a title" />
        </span>
        <span>
          <label htmlFor="description">Description</label>
          <input name="description" placeholder="Enter a description" />
        </span>
        <span>
          <label htmlFor="tags">Add up to 10 tags</label>
          <TagInput
            inputProps={{
              name: "tags",
            }}
          />
        </span>
      </form>
    </div>
  );
}
