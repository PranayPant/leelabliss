import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

export interface ImageGalleryItem {
  original: string;
  thumbnail: string;
  width: string;
  height: string;
}

export interface ImageGalleryProps {
  images: ImageGalleryItem[];
}

export function ImageGalleryComponent({ images }: ImageGalleryProps) {
  return (
    <Gallery>
      {images.map(({ original, thumbnail, width, height }) => (
        <Item
          original={original}
          thumbnail={thumbnail}
          width={width}
          height={height}
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={open}
              src={thumbnail}
              style={{ width: "100%" }}
            />
          )}
        </Item>
      ))}
    </Gallery>
  );
}
