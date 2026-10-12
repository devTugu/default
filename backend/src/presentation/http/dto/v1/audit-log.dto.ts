import { ListAuditLogsQuerySchema } from '@default/types/audit-log';
import { createZodDto } from 'nestjs-zod';

export class ListAuditLogsQueryDto extends createZodDto(
  ListAuditLogsQuerySchema,
) {}
