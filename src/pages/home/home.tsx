import { useFetch } from "hooks/api";
import styles from "./home.module.css";
import {
  MediaGallery,
  MediaGalleryItem,
} from "components/media-gallery/media-gallery";
import { FETCH_GALLERY_ENDPOINT } from "constants/api";
import { GalleryLoadingSkeleton } from "components/media-gallery/loading-skeleton";

export default function HomePage() {
  const { data, isLoading, isError } = useFetch<unknown>(
    FETCH_GALLERY_ENDPOINT,
  );
  return (
    <div className={styles["container"]}>
      <h1>Memories</h1>
      {!!data && !isLoading && !isError && (
        <MediaGallery items={data as MediaGalleryItem[]} />
      )}
      {isLoading && <GalleryLoadingSkeleton />}
    </div>
  );
}
