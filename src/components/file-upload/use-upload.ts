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
    const signedUrlPromises = files.map((file) =>
      getPresignedUrl({
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
          }),
        },
      }),
    );
    const signedUrlResponses = await Promise.all(signedUrlPromises);

    const uploadFilePromises = signedUrlResponses.map((response, index) => {
      const taggingString = files[index].tags?.join("&");
      return uploadFile({
        url: response?.preSignedUrl ?? "",
        options: {
          method: "PUT",
          body: files[index].file,
          headers: {
            "content-type": files[index].file?.type ?? "",
            "x-amz-meta-height": files[index].height?.toString() ?? "",
            "x-amz-meta-width": files[index].width?.toString() ?? "",
            "x-amz-tagging": taggingString ?? "",
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
