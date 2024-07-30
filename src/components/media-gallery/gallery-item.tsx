import styles from "./gallery-item.module.css";

export function GalleryItem({ url, alt }: { url: string; alt?: string }) {
  return (
    <div className={styles["gallery-item"]}>
      <img alt={alt} src={url} />
    </div>
  );
}
