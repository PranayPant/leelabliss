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
    q: thumbnail ? "10" : "50",
    w: thumbnail ? "300" : undefined,
    h: thumbnail ? "300" : undefined,
    fit: "crop",
  };
  const fullUrl = urlcat(baseUrl, imagePath, imgixQueryParams);

  console.log(fullUrl);

  return fullUrl;
}
