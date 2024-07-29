import styles from "./home.module.css";
import { MediaGallery } from "components/media-gallery/media-gallery";

const MOCK_IMAGES = new Array(20).fill(null).map((_, index) => {
  const [width, height] = [500 + index + 1, 700 + index + 1];
  const url = `https://picsum.photos/${height}/${width}`;
  return {
    src: url,
  };
});

export default function HomePage() {
  return (
    <div className={styles["container"]}>
      <h1>Memories</h1>
      <MediaGallery items={MOCK_IMAGES} />
    </div>
  );
}
