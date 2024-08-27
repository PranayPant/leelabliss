import { FileUpload } from "components/file-upload";
import styles from "./index.module.css";

export default function UploadPage() {
  return (
    <div className={styles["upload-page"]}>
      <FileUpload />
    </div>
  );
}
