import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./image-gallery.module.css";
import { GalleryContent } from "store/content";
import { getImgixUrl } from "store/content/util";

interface ImageGalleryProps {
  images: GalleryContent[];
}

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  return (
    <Gallery>
      <div className={styles["gallery"]}>
        {images.map(({ id, imagePath, height, width }) => {
          const thumbnailSrc = getImgixUrl({ imagePath, thumbnail: true });
          const originalSrc = getImgixUrl({ imagePath, thumbnail: false });
          return (
            <Item
              width={width}
              height={height}
              id={imagePath}
              key={id}
              original={originalSrc}
              thumbnail={thumbnailSrc}
            >
              {({ ref, open }) => (
                <img
                  id={id}
                  ref={ref}
                  onClick={open}
                  src={thumbnailSrc}
                  style={{
                    maxHeight: 300,
                    // gridColumn: index % 2 === 0 ? "span 2" : "auto",
                    // gridRow: index % 2 === 0 ? "span 2" : "auto",
                  }}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
}
