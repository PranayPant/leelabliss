import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { mountStoreDevtool } from "simple-zustand-devtools";
import {
  FETCH_GALLERY_ENDPOINT,
  FETCH_PARTIAL_GALLERY_ENDPOINT,
} from "constants/api";
import { nanoid } from "nanoid";

export interface GalleryContent {
  id: string;
  src: string;
  url?: string;
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
          await fetch(FETCH_GALLERY_ENDPOINT)
        ).json()) as GalleryContent[];
        set({ content: content.map((data) => ({ ...data, id: nanoid() })) });
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
          await fetch(FETCH_PARTIAL_GALLERY_ENDPOINT)
        ).json()) as GalleryContent[];
        set({
          content: [
            ...get().content,
            ...partialContent.map((data) => ({ ...data, id: nanoid() })),
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
