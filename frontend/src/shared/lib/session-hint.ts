const SESSION_COOKIE = 'session=1';
const EXPIRES_AT_KEY = 'tokenExpiresAt';

export const sessionHint = {
  setSession(expiresIn: number): void {
    if (typeof document === 'undefined') return;
    const expiresAt = Date.now() + expiresIn * 1000;
    sessionStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
  },

  clear(): void {
    if (typeof document === 'undefined') return;
    sessionStorage.removeItem(EXPIRES_AT_KEY);
    document.cookie = 'session=; path=/; max-age=0; SameSite=Lax';
  },

  hasSession(): boolean {
    if (typeof document === 'undefined') return false;
    return document.cookie.split(';').some((c) => c.trim() === SESSION_COOKIE);
  },

  getExpiresAt(): number | null {
    if (typeof window === 'undefined') return null;
    const raw = sessionStorage.getItem(EXPIRES_AT_KEY);
    return raw ? Number(raw) : null;
  },

  updateExpiresAt(expiresIn: number): void {
    this.setSession(expiresIn);
  },
};
