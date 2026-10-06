import { VerifyMfaLoginUseCase } from './verify-mfa-login.use-case';

describe('VerifyMfaLoginUseCase', () => {
  const users = {
    findById: jest.fn(),
    findByEmailWithRolesAndPermissions: jest.fn(),
    getMfaSecretEncrypted: jest.fn(),
  };
  const refreshTokens = { save: jest.fn() };
  const tokens = {
    verifyMfaPending: jest
      .fn()
      .mockResolvedValue({ sub: 1, type: 'mfa_pending' }),
    issuePair: jest.fn().mockResolvedValue({
      accessToken: 'access',
      refreshToken: 'refresh',
      accessExpiresIn: 900,
      refreshExpiresAt: new Date(Date.now() + 86400000),
      jti: 'jti-1',
    }),
  };
  const permissionCache = { set: jest.fn() };
  const mfa = {
    decryptSecret: jest.fn().mockReturnValue('secret'),
    verifyToken: jest.fn().mockReturnValue(true),
  };
  const config = { get: jest.fn().mockReturnValue(60) };

  const useCase = new VerifyMfaLoginUseCase(
    users as never,
    refreshTokens as never,
    tokens as never,
    permissionCache as never,
    mfa as never,
    config as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('returns tokens on valid MFA code', async () => {
    users.findById.mockResolvedValue({ id: 1, email: 'a@b.com' });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      roleNames: ['ADMIN'],
      permissionCodes: ['USER_READ'],
    });
    users.getMfaSecretEncrypted.mockResolvedValue('encrypted');

    const result = await useCase.execute('mfa-token', '123456');
    expect(result.accessToken).toBe('access');
    expect(refreshTokens.save).toHaveBeenCalled();
  });

  it('throws on invalid MFA code', async () => {
    users.findById.mockResolvedValue({ id: 1, email: 'a@b.com' });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      roleNames: [],
      permissionCodes: [],
    });
    users.getMfaSecretEncrypted.mockResolvedValue('encrypted');
    mfa.verifyToken.mockReturnValue(false);

    await expect(useCase.execute('mfa-token', '000000')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
  });
});
