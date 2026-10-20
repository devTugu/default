import { describe, expect, it } from 'vitest';
import { buildProductionContentSecurityPolicy } from './production-csp';

describe('production-csp', () => {
  it('does not allow arbitrary https images', () => {
    const csp = buildProductionContentSecurityPolicy();
    expect(csp).toContain("img-src 'self' data: blob:");
    expect(csp).not.toMatch(/img-src[^;]*https:/);
  });

  it('includes baseline hardening directives', () => {
    const csp = buildProductionContentSecurityPolicy();
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
  });
});
