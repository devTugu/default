import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  const refreshTokens = {
    findByHash: jest.fn(),
    revokeById: jest.fn(),
  };
  const tokens = {
    decodeAccess: jest.fn(),
  };
  const blacklist = { revoke: jest.fn() };

  const useCase = new LogoutUseCase(
    refreshTokens as never,
    tokens as never,
    blacklist as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('blacklists access token and revokes refresh token', async () => {
    tokens.decodeAccess.mockReturnValue({ jti: 'jti-1', exp: 9999999999 });
    refreshTokens.findByHash.mockResolvedValue({ id: 5, revokedAt: null });

    await useCase.execute('access-token', 'refresh-token');

    expect(blacklist.revoke).toHaveBeenCalledWith('jti-1', 9999999999);
    expect(refreshTokens.revokeById).toHaveBeenCalledWith(5);
  });

  it('skips blacklist when access token missing', async () => {
    refreshTokens.findByHash.mockResolvedValue(null);
    await useCase.execute(undefined, 'refresh-token');
    expect(blacklist.revoke).not.toHaveBeenCalled();
  });
});
