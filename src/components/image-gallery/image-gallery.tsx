import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./image-gallery.module.css";
import { GalleryContent } from "store/content";

interface ImageGalleryProps {
  images: GalleryContent[];
}

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  return (
    <Gallery>
      <div className={styles["gallery"]}>
        {images.map(({ src, url, id }) => (
          <Item id={id} key={id} original={src ?? url} thumbnail={src ?? url}>
            {({ ref, open }) => (
              <img id={id} ref={ref} onClick={open} src={src ?? url} />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}
