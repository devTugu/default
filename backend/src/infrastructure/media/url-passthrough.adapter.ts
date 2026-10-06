import { Injectable } from '@nestjs/common';
import { AppErrors } from '@application/exceptions/application.exception';
import {
  IMediaStoragePort,
  MediaUploadResult,
} from '@application/ports/media-storage.port';

@Injectable()
export class UrlPassthroughAdapter implements IMediaStoragePort {
  isEnabled(): boolean {
    return false;
  }

  upload(_file: {
    buffer: Buffer;
    mimeType: string;
    filename: string;
  }): Promise<MediaUploadResult> {
    return Promise.reject(
      AppErrors.BAD_REQUEST(
        'Direct upload is disabled. Provide an image URL instead.',
      ),
    );
  }
}
