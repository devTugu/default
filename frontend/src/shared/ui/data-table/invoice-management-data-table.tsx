'use client';

import { flexRender, type PaginationState } from '@tanstack/react-table';
import type { RowData } from '@tanstack/table-core';
import {
  getCoreRowModel,
  useLegacyTable as useReactTable,
  type LegacyColumnDef as ColumnDef,
} from '@tanstack/react-table/legacy';
import { Card } from '@default/ui/primitives/card';
import { Skeleton } from '@default/ui/primitives/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@default/ui/primitives/table';
import {
  DataTableInvoiceToolbar,
  type InvoiceFilterOption,
} from './data-table-invoice-toolbar';
import { DataTableInvoicePagination } from './data-table-invoice-pagination';
import {
  InvoiceTableSelectCell,
  InvoiceTableSelectHeader,
} from './invoice-management-row-selection';

interface InvoiceManagementDataTableProps<TData extends RowData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  totalCount: number;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
  isLoading?: boolean;
  emptyContent?: React.ReactNode;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: InvoiceFilterOption[];
  filterPlaceholder?: string;
  toolbarActions?: React.ReactNode;
  enableRowSelection?: boolean;
}

export function InvoiceManagementDataTable<TData extends RowData>({
  columns,
  data,
  totalCount,
  pageCount,
  pagination,
  onPaginationChange,
  isLoading,
  emptyContent,
  search,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
  toolbarActions,
  enableRowSelection = true,
}: InvoiceManagementDataTableProps<TData>) {
  const tableColumns = enableRowSelection
    ? ([
        {
          id: 'select',
          header: ({ table: tbl }) => <InvoiceTableSelectHeader table={tbl} />,
          cell: ({ row }) => <InvoiceTableSelectCell row={row} />,
          enableSorting: false,
          enableHiding: false,
        },
        ...columns,
      ] as ColumnDef<TData, unknown>[])
    : columns;

  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount,
    state: { pagination },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === 'function' ? updater(pagination) : updater;
      onPaginationChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    enableRowSelection,
    getRowId: (row, index) => {
      const withId = row as { id?: string | number };
      if (withId.id !== undefined) {
        return String(withId.id);
      }
      return String(index);
    },
  });

  const handlePageSizeChange = (size: number) => {
    onPaginationChange({ pageIndex: 0, pageSize: size });
  };

  const shownCount = isLoading ? 0 : data.length;

  return (
    <Card className="gap-6 border p-4 shadow-sm sm:p-6">
      <DataTableInvoiceToolbar
        pageSize={pagination.pageSize}
        onPageSizeChange={handlePageSizeChange}
        initialSearch={search}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        filterValue={filterValue}
        onFilterChange={onFilterChange}
        filterOptions={filterOptions}
        filterPlaceholder={filterPlaceholder}
      >
        {toolbarActions}
      </DataTableInvoiceToolbar>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
                <TableRow key={`sk-${rowIndex}`}>
                  {tableColumns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={tableColumns.length} className="p-0">
                  {emptyContent ?? (
                    <p className="text-muted-foreground py-12 text-center text-sm">
                      No results.
                    </p>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTableInvoicePagination
        table={table}
        totalCount={totalCount}
        shownCount={shownCount}
      />
    </Card>
  );
}
