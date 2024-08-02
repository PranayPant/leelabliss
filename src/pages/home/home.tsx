import styles from "./home.module.css";

import { useThrottledScroll } from "hooks/dom";
import { ImageGalleryComponent } from "components/image-gallery/image-gallery";
import { useContentStore } from "store/content";
import { useEffect } from "react";

export default function HomePage() {
  const { isScrollDown, scrollY } = useThrottledScroll(100);
  const galleryItems = useContentStore((store) => store.content);
  const fetchPartialContent = useContentStore((store) => store.fetchPartial);

  useEffect(() => {
    if (isScrollDown) {
      fetchPartialContent();
    }
  }, [isScrollDown, scrollY, fetchPartialContent]);

  return (
    <div className={styles["container"]}>
      <div className={styles["gallery"]}>
        <ImageGalleryComponent images={galleryItems} />
      </div>
    </div>
  );
}
