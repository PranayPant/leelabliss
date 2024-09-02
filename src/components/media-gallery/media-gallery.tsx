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
  url: string;
  id: string;
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
      {items.map(({ id, url }) => (
        <img key={id} alt={"picture"} src={url} width={300} height={300} />
      ))}
    </LightGallery>
  );
}
