import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";

import "./media-gallery.css";
import { GalleryItem } from "./gallery-item";

export interface MediaGalleryItem {
  url: string;
}

export interface MediaGalleryProps {
  items: MediaGalleryItem[];
}

export function MediaGallery({ items }: MediaGalleryProps) {
  return (
    <LightGallery
      elementClassNames="gallery"
      plugins={[lgThumbnail, lgZoom, lgVideo]}
    >
      {items.map(({ url }) => (
        <a key={url} href={url}>
          <GalleryItem url={url} />
        </a>
      ))}
    </LightGallery>
  );
}
