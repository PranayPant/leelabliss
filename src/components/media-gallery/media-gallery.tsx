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

export interface MediaGalleryItem {
  src: string;
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
      {items.map(({ src }) => (
        <a href={src}>
          <img
            className="img-responsive"
            alt="img1"
            src={src}
            style={{ width: "100%" }}
          />
        </a>
      ))}
    </LightGallery>
  );
}
