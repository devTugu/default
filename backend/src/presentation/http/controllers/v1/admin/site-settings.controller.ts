import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GetSiteSettingsUseCase,
  UpdateSiteSettingsUseCase,
} from '@application/site-setting/use-cases/site-settings.use-cases';
import { Permissions } from '../../../decorators/permissions.decorator';
import { UpdateSiteSettingsDto } from '../../../dto/v1/site-settings.dto';

@ApiTags('Site Settings (Admin) v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'admin/site-settings', version: '1' })
export class SiteSettingAdminV1Controller {
  constructor(
    private readonly getSiteSettings: GetSiteSettingsUseCase,
    private readonly updateSiteSettings: UpdateSiteSettingsUseCase,
  ) {}

  @Get()
  @Permissions('SITE_SETTING_READ')
  @ApiOperation({ summary: 'Get site settings (admin)' })
  get() {
    return this.getSiteSettings.execute();
  }

  @Patch()
  @Permissions('SITE_SETTING_UPDATE')
  @ApiOperation({ summary: 'Update site settings' })
  update(@Body() dto: UpdateSiteSettingsDto) {
    return this.updateSiteSettings.execute(dto);
  }
}
