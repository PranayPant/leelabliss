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
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
      const fileObjectUrl = URL.createObjectURL(file);
      setFiles((prev) => [...prev, { name: file.name, url: fileObjectUrl }]);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  return (
    <div className={styles["file-upload-root"]}>
      <div {...getRootProps({ className: styles["dropzone-container"] })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {files.length > 0 && (
        <ul className={styles["file-list"]}>
          {files.map((file) => (
            <li key={file.name}>
              <img width={100} height={100} src={file.url} alt="" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
