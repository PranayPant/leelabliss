import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";
import { useUpload } from "./helpers";

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const fileObjectUrl = URL.createObjectURL(file);
      setFiles((prev) => [
        ...prev,
        {
          url: fileObjectUrl,
          data: file,
        },
      ]);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 104857600, // 100MB
  });
  const [files, setFiles] = useState<
    {
      url: string;
      data: File;
    }[]
  >([]);

  const fileObjects = files.map((file) => file.data);
  const { isError, isLoading, handleUpload } = useUpload(fileObjects);

  return (
    <div className={styles["file-upload-root"]}>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
        {files.length > 0 && (
          <>
            <ul className={styles["file-list"]}>
              {files.map((file) => (
                <li key={file.data.name}>
                  <figure className={styles["upload-content"]}>
                    {file.data.type.startsWith("image") && (
                      <img width={250} height={200} src={file.url} alt="" />
                    )}
                    {file.data.type.startsWith("video") && (
                      <video width={250} src={file.url} controls />
                    )}
                    {/* <figcaption>{file.name}</figcaption> */}
                  </figure>
                </li>
              ))}
            </ul>

            <button onClick={handleUpload}>Upload first file</button>
          </>
        )}
      </div>
    </div>
  );
}
