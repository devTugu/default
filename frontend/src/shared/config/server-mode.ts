export type ServerMode = 'dev' | 'prod';

const SERVER_MODE_VALUES: ServerMode[] = ['dev', 'prod'];

function inferServerModeFromNodeEnv(): ServerMode {
  return process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
}

/** Runtime deploy mode — use instead of NODE_ENV for product behavior (docs, debug surfaces). */
export function getServerMode(): ServerMode {
  const raw = process.env.NEXT_SERVER_MODE?.trim().toLowerCase();
  if (raw && SERVER_MODE_VALUES.includes(raw as ServerMode)) {
    return raw as ServerMode;
  }

  return inferServerModeFromNodeEnv();
}

export function isDevServerMode(): boolean {
  return getServerMode() === 'dev';
}

export function isProdServerMode(): boolean {
  return getServerMode() === 'prod';
}
