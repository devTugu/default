import { create } from 'zustand';
import type { UserOutput } from '@/entities/user';

interface AuthState {
  user: UserOutput | null;
  roleNames: string[];
  permissionCodes: string[];
  setSession: (user: UserOutput) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  roleNames: [],
  permissionCodes: [],
  setSession: (user) =>
    set({
      user,
      roleNames: user.roles ?? [],
      permissionCodes: user.permissionCodes ?? [],
    }),
  clearSession: () =>
    set({ user: null, roleNames: [], permissionCodes: [] }),
}));
