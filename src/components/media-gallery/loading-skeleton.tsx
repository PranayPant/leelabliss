import styles from "./loading-skeleton.module.css";

export function GalleryItemLoadingSkeleton() {
  return (
    <div className={styles["loading-gallery-item"]}>
      <img
        width={300}
        height={300}
        alt="bg"
        src="/images/gallery-item-bg.avif"
      />
      <div className={styles["bouncing-loader"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export function GalleryLoadingSkeleton() {
  const items = new Array(20)
    .fill(null)
    .map(() => <GalleryItemLoadingSkeleton />);
  return <div className={styles["loading-gallery"]}>{items}</div>;
}
