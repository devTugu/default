import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
  const users = {
    getLoginLockState: jest.fn(),
    recordFailedLogin: jest.fn(),
    clearFailedLogin: jest.fn(),
    findByEmailWithRolesAndPermissions: jest.fn(),
  };
  const refreshTokens = { save: jest.fn() };
  const hasher = { compare: jest.fn(), hash: jest.fn() };
  const tokens = {
    issuePair: jest.fn().mockResolvedValue({
      accessToken: 'access',
      refreshToken: 'refresh',
      accessExpiresIn: 900,
      refreshExpiresAt: new Date(Date.now() + 86400000),
      jti: 'jti-1',
    }),
    issueMfaPendingToken: jest.fn().mockResolvedValue('mfa-token'),
    issueMfaEnrollmentPendingToken: jest
      .fn()
      .mockResolvedValue('enrollment-token'),
  };
  const permissionCache = { set: jest.fn() };
  const config = {
    get: jest.fn((key: string) => {
      if (key === 'PERMISSION_CACHE_TTL_SEC') return 60;
      if (key === 'MFA_REQUIRED_ROLES') return 'SUPER_ADMIN';
      if (key === 'LOGIN_MAX_FAILED_ATTEMPTS') return 5;
      if (key === 'LOGIN_LOCKOUT_MINUTES') return 15;
      return undefined;
    }),
  };

  const useCase = new LoginUseCase(
    users as never,
    refreshTokens as never,
    hasher,
    tokens as never,
    permissionCache as never,
    config as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('throws when user not found', async () => {
    users.getLoginLockState.mockResolvedValue(null);
    await expect(useCase.execute('a@b.com', 'pass')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
  });

  it('throws TOO_MANY_REQUESTS when account is locked', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: new Date(Date.now() + 60_000),
      failedLoginAttempts: 5,
    });

    await expect(useCase.execute('a@b.com', 'pass')).rejects.toMatchObject({
      code: 'TOO_MANY_REQUESTS',
      statusCode: 429,
    });
    expect(hasher.compare).not.toHaveBeenCalled();
  });

  it('records failed login and locks at max attempts', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: null,
      failedLoginAttempts: 4,
    });
    hasher.compare.mockResolvedValue(false);
    users.recordFailedLogin.mockResolvedValue(5);

    await expect(useCase.execute('a@b.com', 'wrong')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });

    expect(users.recordFailedLogin).toHaveBeenCalledWith(1, expect.any(Date));
  });

  it('returns tokens on valid credentials', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: null,
      failedLoginAttempts: 2,
    });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      passwordHash: 'hash',
      roleNames: ['ADMIN'],
      permissionCodes: ['USER_READ'],
      mfaEnabled: false,
    });
    hasher.compare.mockResolvedValue(true);

    const result = await useCase.execute('a@b.com', 'pass');
    expect('accessToken' in result && result.accessToken).toBe('access');
    expect(users.clearFailedLogin).toHaveBeenCalledWith(1);
    expect(refreshTokens.save).toHaveBeenCalled();
    expect(permissionCache.set).toHaveBeenCalled();
  });

  it('returns MFA step-up when mfaEnabled', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: null,
      failedLoginAttempts: 0,
    });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      email: 'a@b.com',
      passwordHash: 'hash',
      roleNames: ['ADMIN'],
      permissionCodes: [],
      mfaEnabled: true,
    });
    hasher.compare.mockResolvedValue(true);

    const result = await useCase.execute('a@b.com', 'pass');
    expect(result).toEqual({ requiresMfa: true, mfaToken: 'mfa-token' });
    expect(refreshTokens.save).not.toHaveBeenCalled();
  });

  it('returns enrollment required for privileged role without MFA', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: null,
      failedLoginAttempts: 0,
    });
    users.findByEmailWithRolesAndPermissions.mockResolvedValue({
      id: 1,
      email: 'admin@b.com',
      passwordHash: 'hash',
      roleNames: ['SUPER_ADMIN'],
      permissionCodes: [],
      mfaEnabled: false,
    });
    hasher.compare.mockResolvedValue(true);

    const result = await useCase.execute('admin@b.com', 'pass');
    expect(result).toEqual({
      requiresMfaEnrollment: true,
      enrollmentToken: 'enrollment-token',
    });
  });

  it('throws on invalid password', async () => {
    users.getLoginLockState.mockResolvedValue({
      userId: 1,
      passwordHash: 'hash',
      lockedUntil: null,
      failedLoginAttempts: 0,
    });
    hasher.compare.mockResolvedValue(false);
    users.recordFailedLogin.mockResolvedValue(1);

    await expect(useCase.execute('a@b.com', 'wrong')).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
    expect(users.recordFailedLogin).toHaveBeenCalledWith(1, undefined);
  });
});
