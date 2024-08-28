import { uploadStore } from "store/upload";

export function handleImageDrop(acceptedFiles: File[]) {
  const addFile = uploadStore.getState().addFile;
  acceptedFiles.forEach((file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (event: ProgressEvent<FileReader>) {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = function (event: Event) {
        const image = event.currentTarget as HTMLImageElement | undefined;
        const height = image?.naturalHeight ?? 0;
        const width = image?.naturalWidth ?? 0;
        addFile({
          file,
          title: file?.name,
          description: "",
          width,
          height,
          tags: [],
          uploadStatus: "idle",
        });
      };
    };
  });
}
