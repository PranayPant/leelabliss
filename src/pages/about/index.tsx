import { FileUpload } from "components/file-upload";
import styles from './index.module.css'

export default function About() {
  return (
    <div className={styles['about-page']}>
      <h1>About Page</h1>
      <FileUpload />
    </div>
  );
}
