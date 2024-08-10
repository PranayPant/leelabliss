import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";
import { useUpload } from "./use-upload";
import { UploadFile } from "./types";
import { Carousel } from "components/carousel";
import { useUploadPreview } from "./upload-preview/use-upload-preview";
import { getUploadPreviewSlides } from "./upload-preview";

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const fileObjectUrl = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (event: ProgressEvent<FileReader>) {
        const image = new Image();
        image.src = event.target?.result as string;
        image.onload = function (event: Event) {
          const image = event.currentTarget as HTMLImageElement | undefined;
          const height = image?.height;
          const width = image?.width;
          setFiles((prev) => [
            ...prev,
            {
              url: fileObjectUrl,
              data: file,
              height,
              width,
            },
          ]);
        };
      };
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 104857600, // 100MB
  });
  const [files, setFiles] = useState<UploadFile[]>([]);

  const { isError, isLoading, handleUpload } = useUpload();

  const uploadPreviewState = useUploadPreview(files);


  const previewSlides = getUploadPreviewSlides(uploadPreviewState);

  const handleUploadImages = () => {
    handleUpload(files);
    setFiles([]);
  };

  return (
    <div className={styles["file-upload-root"]}>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <div className={styles["upload-preview"]}>
          <Carousel slides={previewSlides} />
        </div>
      )}
    </div>
  );
}
