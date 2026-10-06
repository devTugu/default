'use client';

import { useCallback, useMemo, useState } from 'react';
import type { PaginationState } from '@tanstack/react-table';

const DEFAULT_PAGE_SIZE = 20;

export function useTablePagination(initialPageSize = DEFAULT_PAGE_SIZE) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });
  const [search, setSearch] = useState('');

  const queryParams = useMemo(
    () => ({
      page: pagination.pageIndex + 1,
      limit: pagination.pageSize,
      ...(search ? { search } : {}),
    }),
    [pagination.pageIndex, pagination.pageSize, search]
  );

  const onSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, []);

  return {
    pagination,
    setPagination,
    search,
    onSearchChange,
    queryParams,
  };
}
