import { useDropzone } from "react-dropzone";
import { Carousel } from "components/carousel";

import styles from "./index.module.css";
import { useUpload } from "./use-upload";
import { handleDrop, useUploadPreviewSlides } from "./upload-preview/helpers";

export function FileUpload() {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 104857600, // 100MB
  });

  const { isError, isLoading, handleUpload } = useUpload();

  const uploadSlides = useUploadPreviewSlides();

  return (
    <div className={styles["file-upload-root"]}>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {uploadSlides.length > 0 && (
        <div className={styles["upload-preview"]}>
          <Carousel slides={uploadSlides} />
        </div>
      )}
    </div>
  );
}
