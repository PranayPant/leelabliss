import { useState } from "react";
import { GalleryItemLoadingSkeleton } from "./loading-skeleton";

export function GalleryItem({ url, alt }: { url: string; alt?: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(() => true);

  const handleOnLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div style={{ display: isLoading ? "block" : "none" }}>
        <GalleryItemLoadingSkeleton />
      </div>
      <img onLoad={handleOnLoad} alt={alt} src={url} />
    </>
  );
}
