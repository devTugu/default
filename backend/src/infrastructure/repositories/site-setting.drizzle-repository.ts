import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import {
  ISiteSettingRepository,
  UpdateSiteSettingsData,
} from '@domain/site-setting/repositories/site-setting.repository.interface';
import {
  DEFAULT_SITE_SETTINGS,
  SiteSettings,
} from '@domain/site-setting/entities/site-settings.entity';
import { IOrganizationContext } from '@application/ports/organization-context.port';
import { ORGANIZATION_CONTEXT } from '@shared/constants/tokens';
import {
  DRIZZLE,
  type DrizzleDatabase,
} from '../database/drizzle/drizzle.tokens';
import { siteSettings } from '../database/drizzle/schema';
import { SiteSettingMapper } from '../database/drizzle/mappers/site-setting.mapper';

const SINGLETON_ID = 1;

@Injectable()
export class SiteSettingDrizzleRepository implements ISiteSettingRepository {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDatabase,
    @Inject(ORGANIZATION_CONTEXT)
    private readonly orgContext: IOrganizationContext,
  ) {}

  async get(): Promise<SiteSettings | null> {
    const entity = await this.db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, SINGLETON_ID),
    });
    return entity ? SiteSettingMapper.toDomain(entity) : null;
  }

  async upsert(data: UpdateSiteSettingsData): Promise<SiteSettings> {
    const existing = await this.db.query.siteSettings.findFirst({
      where: eq(siteSettings.id, SINGLETON_ID),
    });

    const base = existing ?? {
      id: SINGLETON_ID,
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
      updatedAt: new Date(),
    };

    const next = {
      hero: data.hero ? { ...base.hero, ...data.hero } : base.hero,
      header: data.header ? { ...base.header, ...data.header } : base.header,
      footer: data.footer ? { ...base.footer, ...data.footer } : base.footer,
      seo: data.seo ? { ...base.seo, ...data.seo } : base.seo,
      contactInfo: data.contactInfo
        ? { ...base.contactInfo, ...data.contactInfo }
        : base.contactInfo,
      theme: data.theme ? { ...base.theme, ...data.theme } : base.theme,
      about: data.about
        ? {
            ...base.about,
            ...data.about,
            values: data.about.values ?? base.about.values ?? [],
            stats: data.about.stats ?? base.about.stats ?? [],
          }
        : base.about,
    };

    const organizationId = await this.orgContext.getCurrentOrganizationId();

    if (existing) {
      await this.db
        .update(siteSettings)
        .set({
          ...next,
          organizationId: organizationId ?? existing.organizationId,
        })
        .where(eq(siteSettings.id, SINGLETON_ID));
    } else {
      await this.db.insert(siteSettings).values({
        id: SINGLETON_ID,
        organizationId: organizationId ?? null,
        ...next,
      });
    }

    const saved = await this.get();
    if (!saved) throw new Error('SITE_SETTINGS_UPSERT_FAILED');
    return saved;
  }
}
