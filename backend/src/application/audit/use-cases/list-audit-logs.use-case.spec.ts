import { ListAuditLogsUseCase } from './list-audit-logs.use-case';
import { RecordAuditLogUseCase } from './record-audit-log.use-case';

describe('ListAuditLogsUseCase', () => {
  it('records meta-audit when listing logs', async () => {
    const auditLogs = {
      findAll: jest.fn().mockResolvedValue({
        items: [
          {
            id: 1,
            createdAt: new Date(),
            userId: 1,
            action: 'CREATE',
            resource: 'users',
            resourceId: '1',
            ipAddress: null,
            metadata: null,
          },
        ],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      }),
      save: jest.fn(),
      deleteOlderThan: jest.fn(),
    };
    const recordAuditLog = {
      execute: jest.fn().mockResolvedValue(undefined),
    };

    const useCase = new ListAuditLogsUseCase(
      auditLogs,
      recordAuditLog as unknown as RecordAuditLogUseCase,
    );

    await useCase.execute({ page: 1, limit: 20 }, 42);

    expect(recordAuditLog.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 42,
        action: 'AUDIT_LOG_READ',
        resource: 'audit_logs',
      }),
    );
  });
});
