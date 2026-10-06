import { ExportUserDataUseCase, AnonymizeUserUseCase } from './gdpr.use-cases';

describe('ExportUserDataUseCase', () => {
  const users = { findById: jest.fn() };
  const auditLogs = { findAll: jest.fn() };
  const useCase = new ExportUserDataUseCase(users as never, auditLogs as never);

  beforeEach(() => jest.clearAllMocks());

  it('throws when user not found', async () => {
    users.findById.mockResolvedValue(null);
    await expect(useCase.execute(99)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('returns deepened export package shape', async () => {
    const createdAt = new Date('2024-01-01T00:00:00.000Z');
    const updatedAt = new Date('2024-06-01T00:00:00.000Z');
    const auditCreatedAt = new Date('2024-06-02T00:00:00.000Z');
    users.findById.mockResolvedValue({
      id: 1,
      email: 'admin@example.com',
      isActive: true,
      roleNames: ['SUPER_ADMIN'],
      permissionCodes: ['USER_READ', 'AUDIT_READ'],
      mfaEnabled: true,
      oauthProvider: 'oidc',
      createdAt,
      updatedAt,
    });
    auditLogs.findAll.mockResolvedValue({
      items: [
        {
          id: 10,
          action: 'LOGIN',
          resource: 'auth',
          resourceId: null,
          createdAt: auditCreatedAt,
          metadata: { path: '/auth/login', password: 'secret', token: 'x' },
        },
      ],
      total: 1,
      page: 1,
      limit: 100,
      totalPages: 1,
    });

    const result = await useCase.execute(1);

    expect(auditLogs.findAll).toHaveBeenCalledWith({
      userId: 1,
      page: 1,
      limit: 100,
    });
    expect(result).toMatchObject({
      user: {
        id: 1,
        email: 'admin@example.com',
        isActive: true,
        roleNames: ['SUPER_ADMIN'],
        permissionCodes: ['USER_READ', 'AUDIT_READ'],
        mfaEnabled: true,
        oauthProvider: 'oidc',
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
      },
      oauth: { provider: 'oidc', linked: true },
      auditEvents: [
        {
          id: 10,
          action: 'LOGIN',
          resource: 'auth',
          resourceId: null,
          createdAt: auditCreatedAt.toISOString(),
          metadata: { path: '/auth/login' },
        },
      ],
    });
    expect(typeof result.exportedAt).toBe('string');
    expect(result).not.toHaveProperty('oauthSubject');
  });
});

describe('AnonymizeUserUseCase', () => {
  const users = { findById: jest.fn(), anonymize: jest.fn() };
  const refreshTokens = { revokeAllForUser: jest.fn() };
  const useCase = new AnonymizeUserUseCase(
    users as never,
    refreshTokens as never,
  );

  beforeEach(() => jest.clearAllMocks());

  it('throws when user not found', async () => {
    users.findById.mockResolvedValue(null);
    await expect(useCase.execute(1)).rejects.toMatchObject({
      code: 'NOT_FOUND',
    });
  });

  it('rejects already anonymized users', async () => {
    users.findById.mockResolvedValue({
      id: 1,
      email: 'deleted-1@anonymized.local',
    });

    await expect(useCase.execute(1)).rejects.toMatchObject({
      code: 'CONFLICT',
    });
    expect(users.anonymize).not.toHaveBeenCalled();
  });

  it('anonymizes existing user and revokes refresh tokens', async () => {
    users.findById.mockResolvedValue({ id: 1, email: 'user@example.com' });
    users.anonymize.mockResolvedValue(undefined);
    refreshTokens.revokeAllForUser.mockResolvedValue(undefined);

    await useCase.execute(1);

    expect(users.anonymize).toHaveBeenCalledWith(1);
    expect(refreshTokens.revokeAllForUser).toHaveBeenCalledWith(1);
  });
});
