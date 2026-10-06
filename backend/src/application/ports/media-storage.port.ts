export interface MediaUploadResult {
  url: string;
}

export interface IMediaStoragePort {
  upload(file: {
    buffer: Buffer;
    mimeType: string;
    filename: string;
  }): Promise<MediaUploadResult>;
  isEnabled(): boolean;
}
