import { Module } from '@nestjs/common';
import { MediaAdminV1Controller } from '../controllers/v1/admin/media.controller';
import { UploadMediaUseCase } from '@application/media/use-cases/upload-media.use-case';

@Module({
  controllers: [MediaAdminV1Controller],
  providers: [UploadMediaUseCase],
})
export class MediaPresentationModule {}
