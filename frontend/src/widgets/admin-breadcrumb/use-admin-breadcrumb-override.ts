'use client';

import { useEffect } from 'react';
import { useAdminBreadcrumbContext } from './admin-breadcrumb-context';
import type { AdminBreadcrumbItem } from './types';

/** Replace the auto-generated trail while this component is mounted. */
export function useAdminBreadcrumbOverride(items: AdminBreadcrumbItem[] | null) {
  const { setOverride } = useAdminBreadcrumbContext();

  useEffect(() => {
    setOverride(items);
    return () => setOverride(null);
  }, [items, setOverride]);
}
