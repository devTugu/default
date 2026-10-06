'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Input } from '@/shared/ui/input';
import { useDebounce } from '@/shared/hooks/useDebounce';

interface DataTableToolbarProps {
  placeholder?: string;
  initialSearch?: string;
  onSearchChange: (value: string) => void;
  children?: React.ReactNode;
}

export function DataTableToolbar({
  placeholder,
  initialSearch = '',
  onSearchChange,
  children,
}: DataTableToolbarProps) {
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder ?? t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
