import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../decorators/public.decorator';
import { GetPublicSiteSettingsUseCase } from '@application/site-setting/use-cases/site-settings.use-cases';

@ApiTags('Site Settings (Public) v1')
@Controller({ path: 'site-settings', version: '1' })
export class SiteSettingPublicV1Controller {
  constructor(
    private readonly getPublicSiteSettings: GetPublicSiteSettingsUseCase,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get public site settings' })
  get() {
    return this.getPublicSiteSettings.execute();
  }
}
