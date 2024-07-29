import styles from "./loading-skeleton.module.css";
import "./media-gallery.css";

export function GalleryLoadingSkeleton() {
  const items = new Array(20).fill(null).map(() => (
    <div className={styles["item"]}>
      <img alt="bg" src="/images/gallery-item-bg.avif" />
      <div className={styles["bouncing-loader"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ));
  return <div className="gallery">{items}</div>;
}
