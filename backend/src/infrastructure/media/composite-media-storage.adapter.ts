import { Injectable } from '@nestjs/common';
import {
  IMediaStoragePort,
  MediaUploadResult,
} from '@application/ports/media-storage.port';
import { S3CompatibleStorageAdapter } from './s3-compatible-storage.adapter';
import { UrlPassthroughAdapter } from './url-passthrough.adapter';

@Injectable()
export class CompositeMediaStorageAdapter implements IMediaStoragePort {
  constructor(
    private readonly s3Adapter: S3CompatibleStorageAdapter,
    private readonly urlAdapter: UrlPassthroughAdapter,
  ) {}

  isEnabled(): boolean {
    return this.s3Adapter.isEnabled();
  }

  upload(file: {
    buffer: Buffer;
    mimeType: string;
    filename: string;
  }): Promise<MediaUploadResult> {
    if (this.s3Adapter.isEnabled()) {
      return this.s3Adapter.upload(file);
    }
    return this.urlAdapter.upload(file);
  }
}
