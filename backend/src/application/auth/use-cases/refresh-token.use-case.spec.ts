import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
  const users = {
    findById: jest.fn(),
    findByEmailWithRolesAndPermissions: jest.fn(),
  };
  const refreshTokens = {
    findByUserAndHash: jest.fn(),
    revokeAllForUser: jest.fn(),
    revokeById: jest.fn(),
    save: jest.fn(),
  };
  const tokens = {
    verifyRefresh: jest.fn(),
    issuePair: jest.fn(),
  };
  const permissionCache = { set: jest.fn() };
  const config = { get: jest.fn().mockReturnValue(60) };

  const useCase = new RefreshTokenUseCase(
    users as never,
    refreshTokens as never,
    tokens as never,
    permissionCache as never,
    config as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('throws on invalid refresh token', async () => {
    tokens.verifyRefresh.mockRejectedValue(new Error('invalid'));
    await expect(useCase.execute('bad-token')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
  });

  it('rotates tokens when valid', async () => {
    tokens.verifyRefresh.mockResolvedValue({ sub: 1, type: 'refresh' });
    refreshTokens.findByUserAndHash.mockResolvedValue({
      id: 10,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000),
    });
    users.findById.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      isActive: true,
    });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      roleNames: ['ADMIN'],
      permissionCodes: ['USER_READ'],
    });
    tokens.issuePair.mockResolvedValue({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
      accessExpiresIn: 900,
      refreshExpiresAt: new Date(Date.now() + 86400000),
    });

    const result = await useCase.execute('valid-refresh');
    expect(result.accessToken).toBe('new-access');
    expect(refreshTokens.revokeById).toHaveBeenCalledWith(10);
    expect(refreshTokens.save).toHaveBeenCalled();
  });

  it('revokes all sessions on refresh token reuse', async () => {
    tokens.verifyRefresh.mockResolvedValue({ sub: 1, type: 'refresh' });
    refreshTokens.findByUserAndHash.mockResolvedValue(null);

    await expect(useCase.execute('stolen-token')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
    expect(refreshTokens.revokeAllForUser).toHaveBeenCalledWith(1);
  });

  it('revokes all sessions when token expired', async () => {
    tokens.verifyRefresh.mockResolvedValue({ sub: 1, type: 'refresh' });
    refreshTokens.findByUserAndHash.mockResolvedValue({
      id: 10,
      revokedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    });

    await expect(useCase.execute('expired-token')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
    expect(refreshTokens.revokeAllForUser).toHaveBeenCalledWith(1);
  });

  it('throws when user inactive', async () => {
    tokens.verifyRefresh.mockResolvedValue({ sub: 1, type: 'refresh' });
    refreshTokens.findByUserAndHash.mockResolvedValue({
      id: 10,
      revokedAt: null,
      expiresAt: new Date(Date.now() + 86400000),
    });
    users.findById.mockResolvedValue({ id: 1, isActive: false });

    await expect(useCase.execute('valid-refresh')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
  });
});
