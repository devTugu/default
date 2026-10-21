import { describe, expect, it } from 'vitest';
import {
  isUpstreamConnectionError,
  mergeInternalHeaders,
} from './internal-api';

describe('mergeInternalHeaders', () => {
  it('preserves Authorization from a Headers instance', () => {
    const input = new Headers();
    input.set('Authorization', 'Bearer test-token');
    input.set('Content-Type', 'application/json');

    const merged = mergeInternalHeaders(input);

    expect(merged.get('Authorization')).toBe('Bearer test-token');
    expect(merged.get('Content-Type')).toBe('application/json');
    expect(merged.get('Accept')).toBe('application/json');
  });

  it('preserves Authorization from a plain object', () => {
    const merged = mergeInternalHeaders({
      Authorization: 'Bearer plain-token',
    });

    expect(merged.get('Authorization')).toBe('Bearer plain-token');
    expect(merged.get('Accept')).toBe('application/json');
  });
});

describe('isUpstreamConnectionError', () => {
  it('detects ECONNREFUSED fetch failures', () => {
    const error = new TypeError('fetch failed', {
      cause: Object.assign(new Error('connect'), { code: 'ECONNREFUSED' }),
    });
    expect(isUpstreamConnectionError(error)).toBe(true);
  });

  it('ignores unrelated errors', () => {
    expect(isUpstreamConnectionError(new Error('nope'))).toBe(false);
  });
});
