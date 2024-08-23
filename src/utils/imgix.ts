import { IMGIX_SUBDOMAIN } from "constants/api";
import urlcat from "urlcat";

export function getImgixUrl({
  imagePath,
  thumbnail,
  width,
  height,
}: {
  imagePath: string;
  thumbnail?: boolean;
  width?: string;
  height?: string;
}) {
  const baseUrl = `https://${IMGIX_SUBDOMAIN}`;
  const imgixQueryParams = {
    auto: "format",
    q: thumbnail ? "10" : "50",
    w: thumbnail ? "300" : width,
    h: thumbnail ? "300" : height,
    crop: thumbnail ? "entropy" : undefined,
    fit: thumbnail ? "crop" : undefined,
  };
  return urlcat(baseUrl, imagePath, imgixQueryParams);
}
