export interface UploadFile {
  url: string;
  data: File;
  height: number | undefined;
  width: number | undefined;
  tags?: string[];
  imageTitle?: string;
  createdAt?: string;
  createdBy?: string;
}
