import { GET_S3_PRESIGNED_URL_ENDPOINT } from "constants/api";
import { useManualFetch } from "hooks/api";

export function useUpload(files: File[]) {
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

  const handleUpload = async () => {
    const signedUrlPromises = files.map((file) =>
      getPresignedUrl({
        url: GET_S3_PRESIGNED_URL_ENDPOINT,
        options: {
          method: "PUT",
          body: JSON.stringify({
            key: `images/${file.name}`,
            contentType: file.type,
          }),
        },
      }),
    );
    const signedUrlResponses = await Promise.all(signedUrlPromises);

    const uploadFilePromises = signedUrlResponses.map((response, index) =>
      uploadFile({
        url: response?.preSignedUrl ?? "",
        options: {
          method: "PUT",
          body: files[index],
          headers: {
            "content-type": files[index].type,
          },
        },
      }),
    );
    await Promise.all(uploadFilePromises);
  };

  return {
    isError: isPreSignedUrlError || isUploadError,
    isLoading: isPreSignedUrlLoading || isUploadLoading,
    handleUpload,
  };
}
