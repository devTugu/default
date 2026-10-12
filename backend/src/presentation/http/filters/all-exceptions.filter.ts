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
import { ZodValidationException } from 'nestjs-zod';
import { Request, Response } from 'express';
import { ApplicationException } from '@application/exceptions/application.exception';
import { REQUEST_ID_HEADER } from '../middleware/request-id.middleware';

interface ValidationDetail {
  path: string;
  message: string;
}

interface ErrorBody {
  success: false;
  error: {
    code: string;
    message: string | object;
    details?: ValidationDetail[];
  };
  timestamp: string;
  path: string;
  requestId: string;
}

function zodIssueDetails(error: unknown): ValidationDetail[] {
  if (!error || typeof error !== 'object' || !('issues' in error)) {
    return [];
  }
  const issues = error.issues;
  if (!Array.isArray(issues)) return [];

  return issues.map((issue) => {
    const item = issue as { path?: unknown[]; message?: string };
    const path = Array.isArray(item.path)
      ? item.path.map(String).join('.')
      : '';
    return {
      path,
      message: typeof item.message === 'string' ? item.message : 'Invalid',
    };
  });
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
    let details: ValidationDetail[] | undefined;

    if (exception instanceof ZodValidationException) {
      status = HttpStatus.BAD_REQUEST;
      code = 'VALIDATION_ERROR';
      details = zodIssueDetails(exception.getZodError());
      const first = details[0];
      message = first
        ? first.path
          ? `${first.path}: ${first.message}`
          : first.message
        : 'Validation failed';
    } else if (exception instanceof ApplicationException) {
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
      error: details ? { code, message, details } : { code, message },
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId,
    } satisfies ErrorBody);
  }
}
