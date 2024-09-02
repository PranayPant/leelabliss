import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useUploadStore } from "store/upload";
import { useImageUploadApi } from "./api";
import { handleImageDrop } from "./helpers";

export function useUpload(options?: DropzoneOptions) {
  const dropzoneApi = useDropzone({
    onDrop: handleImageDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 104857600, // 100MB,
    ...options,
  });

  const imageUploadApi = useImageUploadApi();

  return { dropzoneApi, imageUploadApi };
}
