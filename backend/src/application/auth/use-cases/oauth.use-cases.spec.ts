import {
  CompleteOAuthLoginUseCase,
  GetOAuthAuthorizationUrlUseCase,
} from './oauth.use-cases';

describe('OAuth use cases', () => {
  describe('GetOAuthAuthorizationUrlUseCase', () => {
    it('returns authorization URL when enabled', async () => {
      const oauth = {
        isEnabled: jest.fn().mockReturnValue(true),
        getAuthorizationUrl: jest
          .fn()
          .mockResolvedValue('https://idp/authorize'),
      };
      const useCase = new GetOAuthAuthorizationUrlUseCase(oauth as never);

      const result = await useCase.execute('state-1');
      expect(result.url).toBe('https://idp/authorize');
    });

    it('throws when OAuth disabled', async () => {
      const oauth = { isEnabled: jest.fn().mockReturnValue(false) };
      const useCase = new GetOAuthAuthorizationUrlUseCase(oauth as never);

      await expect(useCase.execute('state-1')).rejects.toMatchObject({
        code: 'BAD_REQUEST',
      });
    });
  });

  describe('CompleteOAuthLoginUseCase', () => {
    const oauth = {
      isEnabled: jest.fn().mockReturnValue(true),
      exchangeCode: jest.fn().mockResolvedValue({
        provider: 'oidc',
        subject: 'sub-1',
        email: 'oauth@example.com',
      }),
    };
    const users = {
      findByOAuth: jest.fn().mockResolvedValue(null),
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest
        .fn()
        .mockResolvedValue({ id: 2, email: 'oauth@example.com' }),
      update: jest.fn(),
      findByEmailWithRolesAndPermissions: jest.fn().mockResolvedValue({
        id: 2,
        email: 'oauth@example.com',
        roleNames: ['ADMIN'],
        permissionCodes: ['USER_READ'],
        mfaEnabled: true,
      }),
    };
    const refreshTokens = { save: jest.fn() };
    const tokens = {
      issueMfaPendingToken: jest.fn().mockResolvedValue('mfa-token'),
      issueMfaEnrollmentPendingToken: jest
        .fn()
        .mockResolvedValue('enrollment-token'),
      issuePair: jest.fn(),
    };
    const permissionCache = { set: jest.fn() };
    const hasher = { hash: jest.fn().mockResolvedValue('hash') };
    const config = {
      get: jest.fn((key: string) => {
        if (key === 'MFA_REQUIRED_ROLES') return 'SUPER_ADMIN';
        if (key === 'PERMISSION_CACHE_TTL_SEC') return 60;
        return undefined;
      }),
    };

    it('returns MFA step-up when user has MFA enabled', async () => {
      const useCase = new CompleteOAuthLoginUseCase(
        oauth as never,
        users as never,
        refreshTokens as never,
        tokens as never,
        permissionCache as never,
        hasher as never,
        config as never,
      );

      const result = await useCase.execute('https://cb?code=1');
      expect(result).toEqual({ requiresMfa: true, mfaToken: 'mfa-token' });
    });
  });
});
