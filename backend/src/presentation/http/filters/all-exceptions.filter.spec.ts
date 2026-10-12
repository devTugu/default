import { HttpStatus } from '@nestjs/common';
import { ZodValidationException } from 'nestjs-zod';
import { z } from 'zod';
import { AllExceptionsFilter } from './all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  const logger = { error: jest.fn() };
  const filter = new AllExceptionsFilter(logger as never);

  function catchException(exception: unknown) {
    const json = jest.fn();
    const response = { status: jest.fn().mockReturnValue({ json }) };
    const request = {
      method: 'POST',
      url: '/api/v1/users',
      headers: { 'x-request-id': 'req-1' },
    };
    filter.catch(exception, {
      switchToHttp: () => ({
        getResponse: () => response,
        getRequest: () => request,
      }),
    } as never);
    return { response, json };
  }

  it('maps ZodValidationException to VALIDATION_ERROR with details', () => {
    const parsed = z
      .object({ password: z.string().min(8) })
      .safeParse({ password: 'short' });
    expect(parsed.success).toBe(false);
    if (parsed.success) return;

    const { response, json } = catchException(
      new ZodValidationException(parsed.error),
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        error: expect.objectContaining({
          code: 'VALIDATION_ERROR',
          message: expect.stringContaining('password'),
          details: expect.arrayContaining([
            expect.objectContaining({
              path: 'password',
              message: expect.any(String),
            }),
          ]),
        }),
      }),
    );
  });
});
