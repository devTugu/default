import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  type LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Request, Response } from 'express';
import { ApplicationException } from '@application/exceptions/application.exception';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

interface ErrorBody {
  success: false;
  error: { code: string; message: string | object };
  timestamp: string;
  path: string;
  requestId: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request.headers[REQUEST_ID_HEADER] as string;

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message: string | object = 'Internal server error.';

    if (exception instanceof ApplicationException) {
      status = exception.statusCode;
      code = exception.code;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = exception.constructor.name.replace('Exception', '').toUpperCase();
      message = exception.getResponse();
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${status}`,
        exception instanceof Error ? exception.stack : String(exception),
        'AllExceptionsFilter',
      );
    }

    response.status(status).json({
      success: false,
      error: { code, message },
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId,
    } satisfies ErrorBody);
  }
}
