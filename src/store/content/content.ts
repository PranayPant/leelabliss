import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { GET_S3_IMAGE_PATHS_ENDPOINT } from "constants/api";
import { nanoid } from "nanoid";

export interface GalleryContent {
  imagePath: string;
  mediaType: string;
  width: string;
  height: string;
  createdAt: string;
  description: string;
  tags: string;
  title: string;
  id?: string;
}

export interface ContentStore {
  isLoading: boolean;
  isError: boolean;
  content: GalleryContent[];
  paginationKey: Record<string, string> | undefined;
  init: VoidFunction;
  fetchPartial: VoidFunction;
  reset: VoidFunction;
}

export type FetchGalleryContentResponse = {
  items: GalleryContent[];
  lastEvaluatedKey: Record<string, string>;
};

export const contentStore = createStore<ContentStore>()((set, get) => {
  return {
    isLoading: false,
    isError: false,
    content: [],
    paginationKey: undefined,
    reset: () => {
      set({
        isError: false,
        isLoading: false,
        content: [],
        paginationKey: undefined,
      });
    },
    init: async () => {
      try {
        set({ isLoading: true });
        const { items, lastEvaluatedKey } = (await (
          await fetch(GET_S3_IMAGE_PATHS_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
              limit: 20,
              ascending: false,
              lastEvaluatedKey: get().paginationKey,
            }),
          })
        ).json()) as FetchGalleryContentResponse;
        set({
          content: items.map((item) => ({ ...item, id: nanoid() })),
          paginationKey: lastEvaluatedKey,
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
        const { items, lastEvaluatedKey } = (await (
          await fetch(GET_S3_IMAGE_PATHS_ENDPOINT, {
            method: "POST",
            body: JSON.stringify({
              limit: 3,
              ascending: false,
              lastEvaluatedKey: get().paginationKey,
            }),
          })
        ).json()) as FetchGalleryContentResponse;
        set({
          content: [
            ...get().content,
            ...items.map((item) => ({ ...item, id: nanoid() })),
          ],
          paginationKey: lastEvaluatedKey,
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
