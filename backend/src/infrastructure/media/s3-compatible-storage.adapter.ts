import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppErrors } from '@application/exceptions/application.exception';
import {
  IMediaStoragePort,
  MediaUploadResult,
} from '@application/ports/media-storage.port';

@Injectable()
export class S3CompatibleStorageAdapter implements IMediaStoragePort {
  private readonly logger = new Logger(S3CompatibleStorageAdapter.name);

  constructor(private readonly config: ConfigService) {}

  isEnabled(): boolean {
    return Boolean(this.config.get<string>('S3_BUCKET'));
  }

  async upload(file: {
    buffer: Buffer;
    mimeType: string;
    filename: string;
  }): Promise<MediaUploadResult> {
    const bucket = this.config.get<string>('S3_BUCKET');
    const region = this.config.get<string>('S3_REGION', 'auto');
    const accessKey = this.config.get<string>('S3_ACCESS_KEY');
    const secretKey = this.config.get<string>('S3_SECRET_KEY');
    const publicBaseUrl = this.config.get<string>('S3_PUBLIC_BASE_URL');

    if (!bucket || !accessKey || !secretKey) {
      throw AppErrors.BAD_REQUEST('S3 storage is not configured.');
    }

    try {
      const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');
      const client = new S3Client({
        region,
        credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
        ...(this.config.get<string>('S3_ENDPOINT') && {
          endpoint: this.config.get<string>('S3_ENDPOINT'),
          forcePathStyle: true,
        }),
      });

      const key = `uploads/${Date.now()}-${file.filename}`;
      await client.send(
        new PutObjectCommand({
          /* eslint-disable @typescript-eslint/naming-convention -- AWS SDK input shape */
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimeType,
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      );

      const url =
        publicBaseUrl?.replace(/\/$/, '') + `/${key}` ||
        `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

      return { url };
    } catch (error) {
      this.logger.warn(
        `S3 upload failed: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      throw AppErrors.BAD_REQUEST('Failed to upload file.');
    }
  }
}
