import { Inject, Injectable } from '@nestjs/common';
import { AppErrors } from '@application/exceptions/application.exception';
import { IMediaStoragePort } from '@application/ports/media-storage.port';
import { MEDIA_STORAGE_PORT } from '@shared/constants/tokens';

@Injectable()
export class UploadMediaUseCase {
  constructor(
    @Inject(MEDIA_STORAGE_PORT)
    private readonly storage: IMediaStoragePort,
  ) {}

  async execute(file: {
    buffer: Buffer;
    mimeType: string;
    filename: string;
  }): Promise<{ url: string }> {
    if (!this.storage.isEnabled()) {
      throw AppErrors.BAD_REQUEST(
        'Media upload is not configured. Use image URLs instead.',
      );
    }
    return this.storage.upload(file);
  }
}
