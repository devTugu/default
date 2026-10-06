import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';
import type { Request } from 'express';
import { RecordAuditLogUseCase } from '@application/audit/use-cases/record-audit-log.use-case';
import { JwtPayload } from '@shared/types/pagination';

const AUDITED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly recordAudit: RecordAuditLogUseCase) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const method = request.method.toUpperCase();

    if (!AUDITED_METHODS.has(method) && !this.isAuthAuditRoute(request)) {
      return next.handle();
    }

    const auditMeta = this.resolveAuditMeta(request, method);

    return next.handle().pipe(
      tap(() => {
        void this.recordAudit.execute({
          userId: auditMeta.userId,
          action: auditMeta.action,
          resource: auditMeta.resource,
          resourceId: auditMeta.resourceId,
          ipAddress: this.resolveIp(request),
          metadata: auditMeta.metadata,
        });
      }),
      catchError((error: unknown) => {
        void this.recordFailure(request, method, auditMeta, error);
        return throwError(() => error);
      }),
    );
  }

  private async recordFailure(
    request: Request,
    method: string,
    auditMeta: ReturnType<AuditInterceptor['resolveAuditMeta']>,
    error: unknown,
  ): Promise<void> {
    if (!(error instanceof HttpException)) return;

    const status = error.getStatus();
    const path = request.path.toLowerCase();

    if (status === 401 && path.includes('/auth/login')) {
      await this.recordAudit.execute({
        userId: null,
        action: 'LOGIN_FAILED',
        resource: 'auth',
        resourceId: null,
        ipAddress: this.resolveIp(request),
        metadata: {
          path: request.path,
          method,
          email: (request.body as { email?: string })?.email ?? null,
        },
      });
      return;
    }

    if (status === 403) {
      await this.recordAudit.execute({
        userId: auditMeta.userId,
        action: 'FORBIDDEN',
        resource: auditMeta.resource,
        resourceId: auditMeta.resourceId,
        ipAddress: this.resolveIp(request),
        metadata: {
          path: request.path,
          method,
          requiredPermissions: error.message,
        },
      });
    }
  }

  private isAuthAuditRoute(request: Request): boolean {
    const path = request.path.toLowerCase();
    return path.includes('/auth/login') || path.includes('/auth/logout');
  }

  private resolveAuditMeta(
    request: Request,
    method: string,
  ): {
    userId: number | null;
    action: string;
    resource: string;
    resourceId: string | null;
    metadata: Record<string, unknown> | null;
  } {
    const path = request.path;
    const segments = path.split('/').filter(Boolean);
    const resource =
      segments.find((s) =>
        [
          'users',
          'roles',
          'permissions',
          'auth',
          'site-settings',
          'media',
        ].includes(s),
      ) ?? 'unknown';
    const user = request.user as JwtPayload | undefined;
    const userId = user?.sub ?? null;

    let action = method;
    if (path.includes('/auth/login')) action = 'LOGIN';
    if (path.includes('/auth/logout')) action = 'LOGOUT';

    const idSegment = segments[segments.length - 1];
    const resourceId = idSegment && /^\d+$/.test(idSegment) ? idSegment : null;

    return {
      userId,
      action,
      resource,
      resourceId,
      metadata: { path, method },
    };
  }

  private resolveIp(request: Request): string | null {
    const forwarded = request.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0]?.trim() ?? null;
    }
    return request.ip ?? null;
  }
}
