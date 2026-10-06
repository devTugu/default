import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestId = request.headers[REQUEST_ID_HEADER] as string;
    return next.handle().pipe(
      map((data: unknown) => ({
        success: true,
        data: data ?? null,
        timestamp: new Date().toISOString(),
        path: request.url,
        requestId,
      })),
    );
  }
}
