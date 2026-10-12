import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { PaginationState } from '@tanstack/react-table';

export interface FilterParamConfig {
  defaultValue?: string;
  omitFromQuery?: string[];
}

export function parseTablePagination(
  searchParams: ReadonlyURLSearchParams,
  defaultPageSize: number,
): { page: number; limit: number; pagination: PaginationState } {
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const limit = Math.max(
    1,
    Number(searchParams.get('limit') ?? String(defaultPageSize)),
  );

  return {
    page,
    limit,
    pagination: {
      pageIndex: page - 1,
      pageSize: limit,
    },
  };
}

export function parseTableFilters(
  searchParams: ReadonlyURLSearchParams,
  filterParams: Record<string, FilterParamConfig>,
): Record<string, string> {
  const values: Record<string, string> = {};
  Object.entries(filterParams).forEach(([key, config]) => {
    values[key] = searchParams.get(key) ?? config.defaultValue ?? '';
  });
  return values;
}

export function applySearchParamUpdates(
  searchParams: ReadonlyURLSearchParams,
  updates: Record<string, string | null>,
): string {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
  });
  return params.toString();
}
