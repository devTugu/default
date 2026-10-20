'use client';

import type { RowData } from '@tanstack/table-core';
import type { LegacyReactTable as Table } from '@tanstack/react-table/legacy';
import { useTranslations } from 'next-intl';
import { InteractiveJumpPagination } from '@/shared/ui/interactive-jump-pagination';

interface DataTableInvoicePaginationProps<TData extends RowData> {
  table: Table<TData>;
  totalCount: number;
  shownCount: number;
}

export function DataTableInvoicePagination<TData extends RowData>({
  table,
  totalCount,
  shownCount,
}: DataTableInvoicePaginationProps<TData>) {
  const t = useTranslations('common');
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground text-sm">
        {t('showingEntries', { shown: shownCount, total: totalCount })}
      </p>
      <InteractiveJumpPagination
        page={pageIndex + 1}
        totalPages={totalPages}
        onPageChange={(page) => table.setPageIndex(page - 1)}
      />
    </div>
  );
}
