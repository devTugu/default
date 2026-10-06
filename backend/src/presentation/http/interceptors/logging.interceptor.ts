import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  type LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      url: string;
      headers: Record<string, string>;
    }>();
    const started = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `${req.method} ${req.url} ${Date.now() - started}ms`,
          'HTTP',
          { requestId: req.headers[REQUEST_ID_HEADER] },
        );
      }),
    );
  }
}
