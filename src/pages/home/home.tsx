import styles from "./home.module.css";

import { useThrottledScroll } from "hooks/dom";
import { ImageGalleryComponent } from "components/image-gallery/image-gallery";
import { GalleryContent, useContentStore } from "store/content";
import { useEffect } from "react";
import { withSearch } from "providers/search";
import { useInfiniteHits, useSearchBox } from "react-instantsearch";
import { useInput } from "hooks/search";
import { ComboBox } from "components/combo-box";

function HomePageComponent() {
  const { scrollDepth } = useThrottledScroll(100);
  const reset = useContentStore((store) => store.reset);
  const galleryItems = useContentStore((store) => store.content);
  const fetchPartialContent = useContentStore((store) => store.fetchPartial);
  const {
    items: refinedItems,
    showMore,
    isLastPage,
  } = useInfiniteHits<GalleryContent>();
  const { query, refine } = useSearchBox();
  const { debouncedValue, value: inputValue, handleChange } = useInput(300);

  useEffect(() => {
    if (scrollDepth >= 0.9) {
      if (!query) {
        fetchPartialContent();
      } else if (!isLastPage) {
        showMore();
      }
    }
  }, [scrollDepth, fetchPartialContent, query, showMore, isLastPage]);

  useEffect(() => {
    refine(debouncedValue);
  }, [debouncedValue, refine]);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <div className={styles["container"]}>
      <div className={styles["gallery"]}>
        <div className={styles["search"]}>
          <ComboBox inputValue={inputValue} handleChange={handleChange} />
        </div>
        <ImageGalleryComponent images={query ? refinedItems : galleryItems} />
      </div>
    </div>
  );
}

const HomePage = withSearch(HomePageComponent);

export default HomePage;
