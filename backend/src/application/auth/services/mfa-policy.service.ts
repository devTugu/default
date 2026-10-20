import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DEFAULT_SITE_SETTINGS } from '@domain/site-setting/entities/site-settings.entity';
import { ISiteSettingRepository } from '@domain/site-setting/repositories/site-setting.repository.interface';
import { SITE_SETTING_REPOSITORY } from '@shared/constants/tokens';
import { resolveMfaRequiredRolesFromPolicy } from '../lib/mfa-required-roles';

@Injectable()
export class MfaPolicyService {
  constructor(
    @Inject(SITE_SETTING_REPOSITORY)
    private readonly siteSettings: ISiteSettingRepository,
    private readonly config: ConfigService,
  ) {}

  async getRequiredRoles(): Promise<string[]> {
    const settings = await this.siteSettings.get();
    const enforce =
      settings?.security.enforcePrivilegedMfa ??
      DEFAULT_SITE_SETTINGS.security.enforcePrivilegedMfa;
    return resolveMfaRequiredRolesFromPolicy(
      enforce,
      this.config.get<string>('MFA_REQUIRED_ROLES'),
    );
  }
}
