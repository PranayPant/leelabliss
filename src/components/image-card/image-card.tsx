import styles from "./image-card.module.css";

export interface ImageCardProps {
  src: string;
  alt?: string;
}
export function ImageCard({ src, alt }: ImageCardProps) {
  return (
    <div className={styles["container"]}>
      <img src={src} alt={alt} />
    </div>
  );
}
