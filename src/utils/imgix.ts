import { IMGIX_SUBDOMAIN } from "constants/api";
import urlcat from "urlcat";

export function getImgixUrl({
  imagePath,
  thumbnail,
}: {
  imagePath: string;
  thumbnail?: boolean;
}) {
  const baseUrl = `https://${IMGIX_SUBDOMAIN}`;
  const imgixQueryParams = {
    auto: "format",
    q: thumbnail ? "10" : "50",
    w: thumbnail ? "300" : undefined,
    crop: thumbnail ? "entropy" : undefined,
    fit: thumbnail ? "crop" : undefined,
  };
  return urlcat(baseUrl, imagePath, imgixQueryParams);
}
