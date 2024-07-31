import { useFetch } from "hooks/api";
import styles from "./home.module.css";
import {
  MediaGallery,
  MediaGalleryItem,
} from "components/media-gallery/media-gallery";
import { FETCH_GALLERY_ENDPOINT } from "constants/api";
import { GalleryLoadingSkeleton } from "components/media-gallery/loading-skeleton";
import { ComboBox } from "components/combo-box";
import { useMemo } from "react";
import { filterContent } from "./filter";
import { useDebounce } from "@uidotdev/usehooks";
import { useComboBox } from "components/combo-box/hooks";

export default function HomePage() {
  const { data, isLoading, isError } = useFetch<unknown>(
    FETCH_GALLERY_ENDPOINT,
  );
  const { inputValue, handleChange } = useComboBox();

  const debouncedInputValue = useDebounce(inputValue, 100);

  const filteredData = useMemo(() => {
    return filterContent(data, debouncedInputValue);
  }, [data, debouncedInputValue]);

  return (
    <div className={styles["container"]}>
      {/* <div className={styles["combo-box"]}>
        <ComboBox inputValue={inputValue} handleChange={handleChange} />
      </div> */}
      {!!data && !isLoading && !isError && (
        <div className={styles["gallery"]}>
          <MediaGallery items={(filteredData ?? []) as MediaGalleryItem[]} />
        </div>
      )}
      {isLoading && <GalleryLoadingSkeleton />}
    </div>
  );
}
