'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { buildTableQueryParams } from './table-query-params.util';
import {
  applySearchParamUpdates,
  parseTableFilters,
  parseTablePagination,
  type FilterParamConfig,
} from './table-search-params.parse';
import { useTableSearchParamActions } from './use-table-search-params-actions';

const DEFAULT_PAGE_SIZE = 20;

interface UseTableSearchParamsOptions {
  defaultPageSize?: number;
  searchParam?: string;
  filterParams?: Record<string, FilterParamConfig>;
}

export function useTableSearchParams(
  options: UseTableSearchParamsOptions = {},
) {
  const {
    defaultPageSize = DEFAULT_PAGE_SIZE,
    searchParam = 'search',
    filterParams = {},
  } = options;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { page, limit, pagination } = useMemo(
    () => parseTablePagination(searchParams, defaultPageSize),
    [searchParams, defaultPageSize],
  );
  const search = searchParams.get(searchParam) ?? '';
  const filters = useMemo(
    () => parseTableFilters(searchParams, filterParams),
    [filterParams, searchParams],
  );

  const replaceParams = useCallback(
    (updates: Record<string, string | null>) => {
      const nextQs = applySearchParamUpdates(searchParams, updates);
      if (nextQs === searchParams.toString()) return;
      router.replace(nextQs ? `${pathname}?${nextQs}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const actions = useTableSearchParamActions({
    searchParams,
    searchParam,
    filterParams,
    replaceParams,
  });

  const queryParams = useMemo(
    () =>
      buildTableQueryParams({
        page,
        limit,
        search,
        filters,
        filterParams,
      }),
    [page, limit, search, filters, filterParams],
  );

  return {
    pagination,
    search,
    filters,
    queryParams,
    ...actions,
  };
}
