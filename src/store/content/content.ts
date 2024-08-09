import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  FETCH_GALLERY_ENDPOINT,
  FETCH_PARTIAL_GALLERY_ENDPOINT,
  GET_S3_IMAGE_PATHS_ENDPOINT,
} from "constants/api";
import { nanoid } from "nanoid";
import { getImgixUrl } from "./util";

export interface GalleryContent {
  id: string;
  src: string;
  originalSrc?: string;
  height?: string;
  width?: string;
}

export interface ContentStore {
  isLoading: boolean;
  isError: boolean;
  content: GalleryContent[];
  init: VoidFunction;
  fetchPartial: VoidFunction;
}

export const contentStore = createStore<ContentStore>()((set, get) => {
  return {
    isLoading: false,
    isError: false,
    content: [],
    init: async () => {
      try {
        set({ isLoading: true });
        const content = (await (
          await fetch(GET_S3_IMAGE_PATHS_ENDPOINT)
        ).json()) as { key: string; height: string; width: string }[];
        set({
          content: content.map(({ key, height, width }) => ({
            src: getImgixUrl({ imagePath: key, thumbnail: true }),
            originalSrc: getImgixUrl({ imagePath: key, thumbnail: false }),
            height,
            width,
            id: nanoid(),
          })),
        });
      } catch (error) {
        console.log("Error initializing gallery:", error),
          set({ isError: true });
      } finally {
        set({ isLoading: false });
      }
    },
    fetchPartial: async () => {
      try {
        const partialContent = (await (
          await fetch(GET_S3_IMAGE_PATHS_ENDPOINT)
        ).json()) as { key: string; height: string; width: string }[];
        set({
          content: [
            ...get().content,
            ...partialContent.map(({ key, height, width }) => ({
              src: getImgixUrl({ imagePath: key, thumbnail: true }),
              originalSrc: getImgixUrl({ imagePath: key, thumbnail: false }),
              height,
              width,
              id: nanoid(),
            })),
          ],
        });
      } catch (error) {
        console.log("Error fetching partial gallery content:", error);
      }
    },
  };
});

function _useContentStore(): ContentStore;
function _useContentStore<T>(selector: (state: ContentStore) => T): T;
function _useContentStore<T>(selector?: (state: ContentStore) => T) {
  return useStore(contentStore, selector!);
}

export const useContentStore = _useContentStore;

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("content-store", contentStore);
}
