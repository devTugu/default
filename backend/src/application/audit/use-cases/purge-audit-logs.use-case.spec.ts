import { PurgeAuditLogsUseCase } from './purge-audit-logs.use-case';

describe('PurgeAuditLogsUseCase', () => {
  const auditLogs = { deleteOlderThan: jest.fn() };
  const config = { get: jest.fn() };
  const useCase = new PurgeAuditLogsUseCase(
    auditLogs as never,
    config as never,
  );

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-16T12:00:00.000Z'));
    config.get.mockImplementation((key: string, defaultValue: number) => {
      if (key === 'AUDIT_RETENTION_DAYS') return 90;
      return defaultValue;
    });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('deletes logs older than retention window', async () => {
    auditLogs.deleteOlderThan.mockResolvedValue(12);

    const deleted = await useCase.execute();

    expect(deleted).toBe(12);
    expect(auditLogs.deleteOlderThan).toHaveBeenCalledWith(
      new Date('2026-03-18T12:00:00.000Z'),
    );
  });
});
