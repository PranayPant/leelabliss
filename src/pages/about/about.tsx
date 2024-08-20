import { FileUpload } from "components/file-upload";
import styles from "./index.module.css";

export default function AboutPage() {
  return (
    <div className={styles["about-page"]}>
      <FileUpload />
    </div>
  );
}
