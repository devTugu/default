import { afterEach, describe, expect, it } from 'vitest';
import { isDocsCatalogEnabled, isDocsPath } from './docs-catalog';

describe('docs-catalog', () => {
  const nodeEnv = process.env.NODE_ENV;
  const serverMode = process.env.NEXT_SERVER_MODE;

  afterEach(() => {
    process.env.NODE_ENV = nodeEnv;
    if (serverMode === undefined) {
      delete process.env.NEXT_SERVER_MODE;
    } else {
      process.env.NEXT_SERVER_MODE = serverMode;
    }
  });

  it('detects docs paths', () => {
    expect(isDocsPath('/docs')).toBe(true);
    expect(isDocsPath('/docs/blocks')).toBe(true);
    expect(isDocsPath('/dashboard')).toBe(false);
  });

  it('enables catalog in dev server mode', () => {
    process.env.NEXT_SERVER_MODE = 'dev';
    expect(isDocsCatalogEnabled()).toBe(true);
  });

  it('disables catalog in prod server mode', () => {
    process.env.NEXT_SERVER_MODE = 'prod';
    expect(isDocsCatalogEnabled()).toBe(false);
  });
});
