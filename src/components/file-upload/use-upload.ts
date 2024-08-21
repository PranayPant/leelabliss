import { GET_S3_PRESIGNED_URL_ENDPOINT } from "constants/api";
import { useManualFetch } from "hooks/api";
import { UploadFile } from "store/upload";

export function useUpload() {
  const {
    isError: isPreSignedUrlError,
    isLoading: isPreSignedUrlLoading,
    trigger: getPresignedUrl,
  } = useManualFetch<{
    preSignedUrl: string;
  }>();
  const {
    isError: isUploadError,
    isLoading: isUploadLoading,
    trigger: uploadFile,
  } = useManualFetch();

  const handleUpload = async (files: UploadFile[]) => {
    const taggings = files.map((file) => {
      const customTagsString = file.tags
        ?.map((tag) => tag.replace(/\s/, "_"))
        .join("+");
      const tagging = `tags=${customTagsString}&height=${file.height}&width=${file.width}&title=${file.title.replace(/\s/, "+")}&description=${file.description.replace(/\s/, "+")}`;
      return tagging;
    });
    const signedUrlPromises = files.map((file, index) => {
      return getPresignedUrl({
        url: GET_S3_PRESIGNED_URL_ENDPOINT,
        options: {
          method: "PUT",
          body: JSON.stringify({
            key: `images/${file.file?.name}`,
            contentType: file.file?.type,
            metadata: {
              height: file.height?.toString() ?? "",
              width: file.width?.toString() ?? "",
            },
            tagging: taggings[index],
          }),
        },
      });
    });
    const signedUrlResponses = await Promise.all(signedUrlPromises);

    const uploadFilePromises = signedUrlResponses.map((response, index) => {
      return uploadFile({
        url: response?.preSignedUrl ?? "",
        options: {
          method: "PUT",
          body: files[index].file,
          headers: {
            "content-type": files[index].file?.type ?? "",
            "x-amz-meta-height": files[index].height?.toString() ?? "",
            "x-amz-meta-width": files[index].width?.toString() ?? "",
            "x-amz-tagging": taggings[index],
          },
        },
      });
    });
    await Promise.all(uploadFilePromises);
  };

  return {
    isError: isPreSignedUrlError || isUploadError,
    isLoading: isPreSignedUrlLoading || isUploadLoading,
    handleUpload,
  };
}
