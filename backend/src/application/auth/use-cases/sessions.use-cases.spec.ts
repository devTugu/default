import {
  ListAuthSessionsUseCase,
  RevokeAuthSessionUseCase,
  RevokeOtherAuthSessionsUseCase,
} from './sessions.use-cases';

describe('auth sessions use cases', () => {
  const createdAt = new Date('2026-01-01T00:00:00.000Z');
  const expiresAt = new Date('2026-02-01T00:00:00.000Z');

  const refreshTokens = {
    listActiveForUser: jest.fn(),
    revokeByIdForUser: jest.fn(),
    revokeAllExceptHash: jest.fn(),
  };

  const recordRefresh = {
    hashRefreshToken: jest.fn((raw: string) => `hash-${raw}`),
  };

  beforeEach(() => jest.clearAllMocks());

  describe('ListAuthSessionsUseCase', () => {
    const useCase = new ListAuthSessionsUseCase(
      refreshTokens as never,
      recordRefresh as never,
    );

    it('maps active sessions and marks current device', async () => {
      refreshTokens.listActiveForUser.mockResolvedValue([
        {
          id: 1,
          tokenHash: 'hash-current',
          ipAddress: '127.0.0.1',
          userAgent: 'Mozilla/5.0',
          createdAt,
          lastSeenAt: createdAt,
          expiresAt,
        },
        {
          id: 2,
          tokenHash: 'hash-other',
          ipAddress: null,
          userAgent: null,
          createdAt,
          lastSeenAt: null,
          expiresAt,
        },
      ]);

      const result = await useCase.execute(10, 'current');

      expect(recordRefresh.hashRefreshToken).toHaveBeenCalledWith('current');
      expect(result.items).toHaveLength(2);
      expect(result.items[0]?.current).toBe(true);
      expect(result.items[1]?.current).toBe(false);
      expect(result.items[1]?.lastSeenAt).toBe(createdAt.toISOString());
    });

    it('lists sessions without current marker when refresh token omitted', async () => {
      refreshTokens.listActiveForUser.mockResolvedValue([]);

      const result = await useCase.execute(10);

      expect(recordRefresh.hashRefreshToken).not.toHaveBeenCalled();
      expect(result.items).toEqual([]);
    });
  });

  describe('RevokeAuthSessionUseCase', () => {
    const useCase = new RevokeAuthSessionUseCase(refreshTokens as never);

    it('revokes session for user', async () => {
      refreshTokens.revokeByIdForUser.mockResolvedValue(true);
      await useCase.execute(10, 3);
      expect(refreshTokens.revokeByIdForUser).toHaveBeenCalledWith(10, 3);
    });

    it('throws when session not found', async () => {
      refreshTokens.revokeByIdForUser.mockResolvedValue(false);
      await expect(useCase.execute(10, 99)).rejects.toMatchObject({
        message: 'Session not found.',
      });
    });
  });

  describe('RevokeOtherAuthSessionsUseCase', () => {
    const useCase = new RevokeOtherAuthSessionsUseCase(
      refreshTokens as never,
      recordRefresh as never,
    );

    it('revokes all sessions except current hash', async () => {
      await useCase.execute(10, 'keep-me');
      expect(recordRefresh.hashRefreshToken).toHaveBeenCalledWith('keep-me');
      expect(refreshTokens.revokeAllExceptHash).toHaveBeenCalledWith(
        10,
        'hash-keep-me',
      );
    });
  });
});
