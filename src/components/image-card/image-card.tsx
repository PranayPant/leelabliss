export interface ImageCardProps {
  src: string;
  alt?: string;
}
export function ImageCard({ src, alt }: ImageCardProps) {
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  );
}
