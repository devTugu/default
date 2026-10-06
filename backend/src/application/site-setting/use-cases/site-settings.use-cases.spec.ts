import { DEFAULT_SITE_SETTINGS } from '@domain/site-setting/entities/site-settings.entity';
import {
  GetPublicSiteSettingsUseCase,
  GetSiteSettingsUseCase,
  UpdateSiteSettingsUseCase,
} from './site-settings.use-cases';

describe('Site settings use cases', () => {
  const settingsEntity = {
    ...DEFAULT_SITE_SETTINGS,
    id: 1,
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  it('GetPublicSiteSettingsUseCase returns defaults when empty', async () => {
    const repo = { get: jest.fn().mockResolvedValue(null) };
    const result = await new GetPublicSiteSettingsUseCase(
      repo as never,
    ).execute();
    expect(result.header.siteName).toEqual(
      DEFAULT_SITE_SETTINGS.header.siteName,
    );
    expect(repo.get).toHaveBeenCalled();
  });

  it('GetPublicSiteSettingsUseCase maps repository entity', async () => {
    const repo = { get: jest.fn().mockResolvedValue(settingsEntity) };
    const result = await new GetPublicSiteSettingsUseCase(
      repo as never,
    ).execute();
    expect(result.id).toBe(1);
  });

  it('GetSiteSettingsUseCase returns defaults when empty', async () => {
    const repo = { get: jest.fn().mockResolvedValue(null) };
    const result = await new GetSiteSettingsUseCase(repo as never).execute();
    expect(result.id).toBe(DEFAULT_SITE_SETTINGS.id);
  });

  it('GetSiteSettingsUseCase maps repository entity', async () => {
    const repo = { get: jest.fn().mockResolvedValue(settingsEntity) };
    const result = await new GetSiteSettingsUseCase(repo as never).execute();
    expect(result.id).toBe(1);
    expect(result.updatedAt).toBe('2026-01-01T00:00:00.000Z');
  });

  it('UpdateSiteSettingsUseCase upserts and returns output', async () => {
    const repo = {
      upsert: jest.fn().mockResolvedValue(settingsEntity),
    };
    const result = await new UpdateSiteSettingsUseCase(repo as never).execute({
      theme: { brandColor: '#112233' },
    });
    expect(repo.upsert).toHaveBeenCalledWith({
      theme: { brandColor: '#112233' },
    });
    expect(result.id).toBe(1);
  });
});
