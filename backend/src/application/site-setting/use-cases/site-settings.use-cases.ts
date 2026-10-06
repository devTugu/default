import { Inject, Injectable } from '@nestjs/common';
import { ISiteSettingRepository } from '@domain/site-setting/repositories/site-setting.repository.interface';
import { DEFAULT_SITE_SETTINGS } from '@domain/site-setting/entities/site-settings.entity';
import {
  SiteSettingsOutput,
  toSiteSettingsOutput,
} from '../dto/site-settings-output.mapper';
import { SITE_SETTING_REPOSITORY } from '@shared/constants/tokens';

function defaultSettingsOutput(): SiteSettingsOutput {
  return {
    id: DEFAULT_SITE_SETTINGS.id,
    hero: { ...DEFAULT_SITE_SETTINGS.hero },
    header: { ...DEFAULT_SITE_SETTINGS.header },
    footer: {
      ...DEFAULT_SITE_SETTINGS.footer,
      socialLinks: [...DEFAULT_SITE_SETTINGS.footer.socialLinks],
    },
    seo: {
      ...DEFAULT_SITE_SETTINGS.seo,
      keywords: { ...DEFAULT_SITE_SETTINGS.seo.keywords },
    },
    contactInfo: { ...DEFAULT_SITE_SETTINGS.contactInfo },
    theme: { ...DEFAULT_SITE_SETTINGS.theme },
    about: {
      ...DEFAULT_SITE_SETTINGS.about,
      values: [...DEFAULT_SITE_SETTINGS.about.values],
      stats: [...DEFAULT_SITE_SETTINGS.about.stats],
    },
    updatedAt: new Date().toISOString(),
  };
}

@Injectable()
export class GetPublicSiteSettingsUseCase {
  constructor(
    @Inject(SITE_SETTING_REPOSITORY)
    private readonly siteSettings: ISiteSettingRepository,
  ) {}

  async execute(): Promise<SiteSettingsOutput> {
    const settings = await this.siteSettings.get();
    if (!settings) {
      return defaultSettingsOutput();
    }
    return toSiteSettingsOutput(settings);
  }
}

@Injectable()
export class GetSiteSettingsUseCase {
  constructor(
    @Inject(SITE_SETTING_REPOSITORY)
    private readonly siteSettings: ISiteSettingRepository,
  ) {}

  async execute(): Promise<SiteSettingsOutput> {
    const settings = await this.siteSettings.get();
    if (!settings) {
      return defaultSettingsOutput();
    }
    return toSiteSettingsOutput(settings);
  }
}

@Injectable()
export class UpdateSiteSettingsUseCase {
  constructor(
    @Inject(SITE_SETTING_REPOSITORY)
    private readonly siteSettings: ISiteSettingRepository,
  ) {}

  async execute(input: {
    hero?: Partial<SiteSettingsOutput['hero']>;
    header?: Partial<SiteSettingsOutput['header']>;
    footer?: Partial<SiteSettingsOutput['footer']>;
    seo?: Partial<SiteSettingsOutput['seo']>;
    contactInfo?: Partial<SiteSettingsOutput['contactInfo']>;
    theme?: Partial<SiteSettingsOutput['theme']>;
    about?: Partial<SiteSettingsOutput['about']>;
  }): Promise<SiteSettingsOutput> {
    const settings = await this.siteSettings.upsert(input);
    return toSiteSettingsOutput(settings);
  }
}
