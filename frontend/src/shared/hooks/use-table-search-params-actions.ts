'use client';

import { useCallback } from 'react';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { PaginationState } from '@tanstack/react-table';
import type { FilterParamConfig } from './table-search-params.parse';

export function useTableSearchParamActions(params: {
  searchParams: ReadonlyURLSearchParams;
  searchParam: string;
  filterParams: Record<string, FilterParamConfig>;
  replaceParams: (updates: Record<string, string | null>) => void;
}) {
  const { searchParams, searchParam, filterParams, replaceParams } = params;

  const setPagination = useCallback(
    (next: PaginationState) => {
      replaceParams({
        page: String(next.pageIndex + 1),
        limit: String(next.pageSize),
      });
    },
    [replaceParams],
  );

  const onSearchChange = useCallback(
    (value: string) => {
      const currentSearch = searchParams.get(searchParam) ?? '';
      const updates: Record<string, string | null> = {
        [searchParam]: value || null,
      };
      if (value !== currentSearch) {
        updates.page = '1';
      }
      replaceParams(updates);
    },
    [replaceParams, searchParam, searchParams],
  );

  const setFilter = useCallback(
    (key: string, value: string) => {
      const config = filterParams[key];
      const currentValue = searchParams.get(key) ?? config?.defaultValue ?? '';
      const updates: Record<string, string | null> = {
        [key]: value === (config?.defaultValue ?? '') ? null : value,
      };
      if (value !== currentValue) {
        updates.page = '1';
      }
      replaceParams(updates);
    },
    [filterParams, replaceParams, searchParams],
  );

  return { setPagination, onSearchChange, setFilter };
}
