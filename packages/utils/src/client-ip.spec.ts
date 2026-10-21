import { describe, expect, it } from 'vitest';
import {
  firstForwardedClientIp,
  normalizeClientIpAddress,
} from './client-ip';

describe('normalizeClientIpAddress', () => {
  it('maps IPv6 loopback to IPv4 loopback', () => {
    expect(normalizeClientIpAddress('::1')).toBe('127.0.0.1');
  });

  it('unwraps IPv4-mapped IPv6', () => {
    expect(normalizeClientIpAddress('::ffff:192.168.1.10')).toBe('192.168.1.10');
  });

  it('passes through public IPv4', () => {
    expect(normalizeClientIpAddress('203.0.113.5')).toBe('203.0.113.5');
  });
});

describe('firstForwardedClientIp', () => {
  it('uses left-most forwarded value', () => {
    expect(firstForwardedClientIp('203.0.113.1, 10.0.0.1')).toBe('203.0.113.1');
  });
});
