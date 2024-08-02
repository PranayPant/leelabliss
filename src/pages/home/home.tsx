import { useFetch } from "hooks/api";
import styles from "./home.module.css";
import {
  MediaGallery,
  MediaGalleryItem,
} from "components/media-gallery/media-gallery";
import { FETCH_GALLERY_ENDPOINT } from "constants/api";
import { GalleryLoadingSkeleton } from "components/media-gallery/loading-skeleton";
import { ComboBox } from "components/combo-box";
import { useEffect, useMemo, useState } from "react";
import { filterContent } from "./filter";
import { useDebounce, useThrottle } from "@uidotdev/usehooks";
import { useComboBox } from "components/combo-box/hooks";
import { useThrottledScroll } from "hooks/dom";
import { ImageGalleryComponent } from "components/image-gallery/image-gallery";

export default function HomePage() {
  // const { inputValue, handleChange } = useComboBox();
  // const debouncedInputValue = useDebounce(inputValue, 100);
  const [totalData, setTotalData] = useState<
    Record<string, string | number | boolean>[]
  >(() => []);
  const { isScrollDown, scrollY } = useThrottledScroll(500);
  const { data, isLoading, isError, refetch } = useFetch(
    FETCH_GALLERY_ENDPOINT,
  );
  useEffect(() => {
    if (isScrollDown) {
      refetch();
    }
  }, [isScrollDown, scrollY, refetch]);
  useEffect(() => {
    setTotalData((prev) => [...prev, ...(data ?? [])]);
  }, [data]);
  // const filteredTotalData = useMemo(() => {
  //   return filterContent(totalData, debouncedInputValue);
  // }, [totalData, debouncedInputValue]);

  return (
    <div className={styles["container"]}>
      {/* <div className={styles["combo-box"]}>
        <ComboBox inputValue={inputValue} handleChange={handleChange} />
      </div> */}
      <div className={styles["gallery"]}>
        {/* <MediaGallery items={totalData as unknown as MediaGalleryItem[]} /> */}
        <ImageGalleryComponent images={totalData ?? []} />
      </div>

      {/* {isLoading && <GalleryLoadingSkeleton />} */}
    </div>
  );
}
