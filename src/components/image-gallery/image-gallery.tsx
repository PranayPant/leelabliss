import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./image-gallery.module.css";
import { GalleryContent } from "store/content";
import { getImgixUrl } from "utils/imgix";
import { CSSProperties } from "react";

interface ImageGalleryProps {
  images: GalleryContent[];
}

const smallItemStyles: CSSProperties = {
  cursor: "pointer",
  maxHeight: 300,
};

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  return (
    <Gallery>
      <div className={styles["gallery"]}>
        {images.map(({ id, imagePath, height, width, title, description }) => {
          const originalSrc = getImgixUrl({
            imagePath,
            width,
            height,
            thumbnail: false,
          });
          const thumbnailSrc = getImgixUrl({
            imagePath,
            thumbnail: true,
          });
          return (
            <Item<HTMLImageElement>
              key={id}
              width={width}
              height={height}
              original={originalSrc}
              thumbnail={thumbnailSrc}
              alt={title ?? description}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={thumbnailSrc}
                  style={smallItemStyles}
                />
              )}
            </Item>
          );
        })}
      </div>
    </Gallery>
  );
}
