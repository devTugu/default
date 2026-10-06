import { Module } from '@nestjs/common';
import { SiteSettingPublicV1Controller } from '../controllers/v1/public/site-settings.controller';
import { SiteSettingAdminV1Controller } from '../controllers/v1/admin/site-settings.controller';
import {
  GetPublicSiteSettingsUseCase,
  GetSiteSettingsUseCase,
  UpdateSiteSettingsUseCase,
} from '@application/site-setting/use-cases/site-settings.use-cases';

@Module({
  controllers: [SiteSettingPublicV1Controller, SiteSettingAdminV1Controller],
  providers: [
    GetPublicSiteSettingsUseCase,
    GetSiteSettingsUseCase,
    UpdateSiteSettingsUseCase,
  ],
})
export class SiteSettingPresentationModule {}
