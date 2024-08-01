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

export default function HomePage() {
  // const { inputValue, handleChange } = useComboBox();
  // const debouncedInputValue = useDebounce(inputValue, 100);
  const { isScrollDown } = useThrottledScroll(500);
  const { data, isLoading, isError } = useFetch<unknown>(
    FETCH_GALLERY_ENDPOINT,
    undefined,
    isScrollDown,
  );
  const [totalData, setTotalData] = useState([]);
  useEffect(() => {
    console.log("recal total data");
    // @ts-expect-error -- types testing
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
      {!!data && !isLoading && !isError && (
        <div className={styles["gallery"]}>
          <MediaGallery items={(totalData ?? []) as MediaGalleryItem[]} />
        </div>
      )}
      {/* {isLoading && <GalleryLoadingSkeleton />} */}
    </div>
  );
}
