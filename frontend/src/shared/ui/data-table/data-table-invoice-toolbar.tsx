'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@default/ui/primitives/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@default/ui/primitives/select';
import { useDebounce } from '@/shared/hooks/useDebounce';

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 50] as const;

export type InvoiceFilterOption = {
  value: string;
  label: string;
};

interface DataTableInvoiceToolbarProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  searchPlaceholder?: string;
  initialSearch?: string;
  onSearchChange: (value: string) => void;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: InvoiceFilterOption[];
  filterPlaceholder?: string;
  children?: React.ReactNode;
}

export function DataTableInvoiceToolbar({
  pageSize,
  onPageSizeChange,
  searchPlaceholder,
  initialSearch = '',
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions,
  filterPlaceholder,
  children,
}: DataTableInvoiceToolbarProps) {
  const t = useTranslations('common');
  const [search, setSearch] = useState(initialSearch);
  const [prevInitialSearch, setPrevInitialSearch] = useState(initialSearch);
  const debounced = useDebounce(search, 400);
  const onSearchChangeRef = useRef(onSearchChange);

  if (initialSearch !== prevInitialSearch) {
    setPrevInitialSearch(initialSearch);
    setSearch(initialSearch);
  }

  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  useEffect(() => {
    onSearchChangeRef.current(debounced);
  }, [debounced]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t('show')}</span>
        <Select
          value={String(pageSize)}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="h-9 w-16 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)} className="cursor-pointer">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full min-w-[12rem] sm:w-64">
          <Search
            className="text-muted-foreground absolute left-3 top-1/2 size-3.5 -translate-y-1/2"
            aria-hidden
          />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder ?? t('search')}
            className="h-9 pl-9 focus-visible:ring-0"
          />
        </div>

        {filterOptions && filterOptions.length > 0 && onFilterChange ? (
          <Select
            value={filterValue}
            onValueChange={(value) => onFilterChange(value ?? '')}
          >
            <SelectTrigger className="h-9 w-32 cursor-pointer">
              <SelectValue placeholder={filterPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : null}

        {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
      </div>
    </div>
  );
}
