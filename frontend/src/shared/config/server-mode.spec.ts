import { afterEach, describe, expect, it } from 'vitest';
import {
  getServerMode,
  isDevServerMode,
  isProdServerMode,
} from './server-mode';

describe('server-mode', () => {
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

  it('defaults to dev when NODE_ENV is not production', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.NEXT_SERVER_MODE;
    expect(getServerMode()).toBe('dev');
    expect(isDevServerMode()).toBe(true);
  });

  it('defaults to prod when NODE_ENV is production', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.NEXT_SERVER_MODE;
    expect(getServerMode()).toBe('prod');
    expect(isProdServerMode()).toBe(true);
  });

  it('honors explicit NEXT_SERVER_MODE over NODE_ENV', () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_SERVER_MODE = 'dev';
    expect(getServerMode()).toBe('dev');
  });

  it('falls back when NEXT_SERVER_MODE is invalid', () => {
    process.env.NODE_ENV = 'production';
    process.env.NEXT_SERVER_MODE = 'staging';
    expect(getServerMode()).toBe('prod');
  });
});
