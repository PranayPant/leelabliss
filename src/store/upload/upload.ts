import { mountStoreDevtool } from "simple-zustand-devtools";
import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { uploadFilesHelper } from "./helpers";

export type UploadFile = {
  file: File | undefined;
  title: string;
  description: string;
  width: number;
  height: number;
  tags: string[];
  uploadStatus: "idle" | "pending" | "success" | "error";
};

export interface UploadStore {
  uploads: UploadFile[];
  shouldShowModal: boolean;
  addFile: (file: UploadFile) => void;
  removeFile: (fileName: File["name"]) => void;
  updateFile: (
    fileName: File["name"],
    property: "title" | "description",
    value: string,
  ) => void;
  addFileTag: (fileName: string, tag: string) => void;
  removeFileTag: (fileName: string, tag: string) => void;
  uploadFiles: VoidFunction;
  setStore: (
    store: Partial<Pick<UploadStore, "uploads" | "shouldShowModal">>,
  ) => void;
}

export const uploadStore = createStore<UploadStore>()((set, get) => {
  return {
    uploads: [],
    shouldShowModal: false,
    addFile: (upload) => set({ uploads: [...get().uploads, upload] }),
    removeFile: (fileName) =>
      set({
        uploads: [
          ...get().uploads.filter((upload) => upload.file?.name !== fileName),
        ],
      }),

    updateFile: (fileName, property, value) => {
      const uploads = get().uploads;
      const targetIndex = uploads.findIndex(
        (item) => item.file?.name === fileName,
      );
      uploads[targetIndex][property] = value;
      set({
        uploads,
      });
    },

    addFileTag: (fileName, tag) => {
      const uploads = get().uploads;
      const targetIndex = uploads.findIndex(
        (item) => item.file?.name === fileName,
      );
      uploads[targetIndex].tags = [...uploads[targetIndex].tags, tag];
      set({
        uploads,
      });
    },

    removeFileTag: (fileName, tag) => {
      const uploads = get().uploads;
      const targetIndex = uploads.findIndex(
        (item) => item.file?.name === fileName,
      );
      console.log(fileName, tag, targetIndex);
      uploads[targetIndex].tags = uploads[targetIndex].tags.filter(
        (currentTag) => currentTag !== tag,
      );
      set({
        uploads,
      });
    },

    uploadFiles: async () => {
      const files = get().uploads;
      await uploadFilesHelper(files);
    },
    setStore: (store) => set(store),
  };
});

function _useUploadStore(): UploadStore;
function _useUploadStore<T>(selector: (state: UploadStore) => T): T;
function _useUploadStore<T>(selector?: (state: UploadStore) => T) {
  return useStore(uploadStore, selector!);
}

export const useUploadStore = _useUploadStore;

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("upload-store", uploadStore);
}
