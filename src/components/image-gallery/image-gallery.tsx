import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import styles from "./image-gallery.module.css";
import { GalleryContent } from "store/content";
import { ReactEventHandler, useState } from "react";

interface ImageGalleryProps {
  images: GalleryContent[];
}

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  const [dimensions, setDimensions] = useState<{
    [id in string]:
      | {
          width: number | undefined;
          height: number | undefined;
        }
      | undefined;
  }>({});
  const handleOnLoad: ReactEventHandler<HTMLImageElement> = ({
    currentTarget,
  }) => {
    const id = currentTarget.getAttribute("id")!;
    const height = currentTarget.naturalHeight;
    const width = currentTarget.naturalWidth;
    setDimensions((prev) => ({
      ...prev,
      [id]: {
        height,
        width,
      },
    }));
  };
  return (
    <Gallery>
      <div className={styles["gallery"]}>
        {images.map(({ src, url, id }) => (
          <Item
            width={dimensions[id]?.width}
            height={dimensions[id]?.height}
            id={id}
            key={id}
            original={src ?? url}
            thumbnail={src ?? url}
          >
            {({ ref, open }) => (
              <img
                id={id}
                ref={ref}
                onClick={open}
                onLoad={handleOnLoad}
                src={src ?? url}
                style={{
                  maxHeight: 300,
                  // gridColumn: index % 2 === 0 ? "span 2" : "auto",
                  // gridRow: index % 2 === 0 ? "span 2" : "auto",
                }}
              />
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
}
