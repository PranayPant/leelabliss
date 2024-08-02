import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./image-gallery.module.css";

export interface ImageGalleryItem {
  original: string;
  thumbnail: string;
  width: string;
  height: string;
  id: string;
}

export interface ImageGalleryProps {
  images: any[];
}

const smallItemStyles: React.CSSProperties = {
  cursor: "pointer",
  objectFit: "cover",
  width: "100%",
  maxHeight: "100%",
};

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  return (
    <Gallery>
      <div className={styles["gallery"]}>
        {images.map((image) => (
          <Item
            id={image.id}
            key={image.id}
            original={image.url}
            thumbnail={image.url}
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={image.url}
                style={{ width: "100%" }}
              />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}
