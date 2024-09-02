import { GET_S3_PRESIGNED_URL_ENDPOINT } from "constants/api";
import { UploadFile, uploadStore } from "./upload";

export async function uploadFilesHelper(files: UploadFile[]) {
  const taggings = files.map((file) => {
    const customTagsString = file.tags
      ?.map((tag) => tag.replace(/\s/, "_"))
      .join("+");
    const tagging = `tags=${customTagsString}&height=${file.height}&width=${file.width}&title=${file.title.replace(/\s/, "+")}&description=${file.description.replace(/\s/, "+")}`;
    return tagging;
  });
  const signedUrlPromises = files.map(async (file, index) => {
    const response = await fetch(GET_S3_PRESIGNED_URL_ENDPOINT, {
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
    });
    return (await response.json()) as {
      preSignedUrl: string;
    };
  });
  uploadStore.setState({
    uploads: uploadStore
      .getState()
      .uploads.map((upload) => ({ ...upload, uploadStatus: "pending" })),
  });
  const signedUrlResponses = await Promise.all(signedUrlPromises);

  const uploadFilePromises = signedUrlResponses.map(async (response, index) => {
    const res = await fetch(response?.preSignedUrl ?? "", {
      method: "PUT",
      body: files[index].file,
      headers: {
        "content-type": files[index].file?.type ?? "",
        "x-amz-meta-height": files[index].height?.toString() ?? "",
        "x-amz-meta-width": files[index].width?.toString() ?? "",
        "x-amz-tagging": taggings[index],
      },
    });
    return res;
  });

  const uploadFileResponses = await Promise.all(uploadFilePromises);

  uploadFileResponses.forEach((response) => {
    uploadStore.setState({
      uploads: uploadStore.getState().uploads.map((upload) => ({
        ...upload,
        uploadStatus: response.ok ? "success" : "error",
      })),
    });
  });
}
