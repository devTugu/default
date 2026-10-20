'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AdminBreadcrumbItem } from './types';

type AdminBreadcrumbContextValue = {
  override: AdminBreadcrumbItem[] | null;
  setOverride: (items: AdminBreadcrumbItem[] | null) => void;
};

const AdminBreadcrumbContext = createContext<AdminBreadcrumbContextValue | null>(
  null,
);

export function AdminBreadcrumbProvider({ children }: { children: ReactNode }) {
  const [override, setOverrideState] = useState<AdminBreadcrumbItem[] | null>(
    null,
  );

  const setOverride = useCallback((items: AdminBreadcrumbItem[] | null) => {
    setOverrideState(items);
  }, []);

  const value = useMemo(
    () => ({ override, setOverride }),
    [override, setOverride],
  );

  return (
    <AdminBreadcrumbContext.Provider value={value}>
      {children}
    </AdminBreadcrumbContext.Provider>
  );
}

export function useAdminBreadcrumbContext(): AdminBreadcrumbContextValue {
  const ctx = useContext(AdminBreadcrumbContext);
  if (!ctx) {
    throw new Error(
      'useAdminBreadcrumbContext must be used within AdminBreadcrumbProvider',
    );
  }
  return ctx;
}
