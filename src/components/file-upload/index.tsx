import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        //const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
      const fileObjectUrl = URL.createObjectURL(file);
      console.log(file);
      setFiles((prev) => [
        ...prev,
        { name: file.name, url: fileObjectUrl, type: file.type },
      ]);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });
  const [files, setFiles] = useState<
    { name: string; url: string; type: string }[]
  >([]);

  return (
    <div className={styles["file-upload-root"]}>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
        {files.length > 0 && (
          <ul className={styles["file-list"]}>
            {files.map((file) => (
              <li key={file.name}>
                <figure className={styles['upload-content']}>
                  {file.type.startsWith("image") && (
                    <img width={250} height={200} src={file.url} alt="" />
                  )}
                  {file.type.startsWith("video") && (
                    <video width={250} src={file.url} controls />
                  )}
                  {/* <figcaption>{file.name}</figcaption> */}
                </figure>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
