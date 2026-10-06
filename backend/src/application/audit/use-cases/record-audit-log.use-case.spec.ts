import { RecordAuditLogUseCase } from './record-audit-log.use-case';

describe('RecordAuditLogUseCase', () => {
  it('swallows repository errors', async () => {
    const auditLogs = {
      save: jest.fn().mockRejectedValue(new Error('db down')),
      findAll: jest.fn(),
      deleteOlderThan: jest.fn(),
    };
    const useCase = new RecordAuditLogUseCase(auditLogs);
    await expect(
      useCase.execute({
        userId: 1,
        action: 'POST',
        resource: 'users',
        resourceId: '1',
        ipAddress: '127.0.0.1',
        metadata: null,
      }),
    ).resolves.toBeUndefined();
  });

  it('persists audit record', async () => {
    const auditLogs = {
      save: jest.fn().mockResolvedValue(undefined),
      findAll: jest.fn(),
      deleteOlderThan: jest.fn(),
    };
    const useCase = new RecordAuditLogUseCase(auditLogs);
    await useCase.execute({
      userId: null,
      action: 'LOGIN',
      resource: 'auth',
      resourceId: null,
      ipAddress: null,
      metadata: { path: '/api/v1/auth/login' },
    });
    expect(auditLogs.save).toHaveBeenCalled();
  });
});
