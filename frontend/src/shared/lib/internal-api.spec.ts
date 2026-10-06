import { describe, expect, it } from 'vitest';
import { mergeInternalHeaders } from './internal-api';

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
