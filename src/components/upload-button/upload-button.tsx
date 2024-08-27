import { useUpload } from "hooks/upload";

export function UploadButton() {
  const {
    dropzoneApi: { getInputProps, getRootProps },
  } = useUpload({ noDrag: true });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button>Upload</button>
    </div>
  );
}
