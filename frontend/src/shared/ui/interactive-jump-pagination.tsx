'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Hash } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@default/ui/primitives/button';
import { Input } from '@default/ui/primitives/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@default/ui/primitives/pagination';
import { cn } from '@/shared/lib/utils';

type InteractiveJumpPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
};

export function InteractiveJumpPagination({
  page,
  totalPages,
  onPageChange,
  className,
}: InteractiveJumpPaginationProps) {
  const t = useTranslations('common');
  const safeTotal = Math.max(1, totalPages);
  const safePage = Math.min(Math.max(1, page), safeTotal);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const commitPage = (next: number) => {
    const clamped = Math.max(1, Math.min(safeTotal, next));
    onPageChange(clamped);
    setInputValue(String(clamped));
    setIsEditing(false);
  };

  const handleInputSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsed = Number.parseInt(inputValue, 10);
    if (Number.isNaN(parsed)) {
      setInputValue(String(safePage));
      setIsEditing(false);
      return;
    }
    commitPage(parsed);
  };

  return (
    <Pagination className={cn('mx-0 w-auto justify-end', className)}>
      <PaginationContent className="bg-background gap-2 rounded-xl border border-border p-1.5">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (safePage > 1) {
                commitPage(safePage - 1);
              }
            }}
            className={cn(
              'rounded-lg hover:bg-secondary/80',
              safePage <= 1 && 'pointer-events-none opacity-40',
            )}
            aria-disabled={safePage <= 1}
          />
        </PaginationItem>

        <div className="flex min-w-[140px] items-center justify-center px-2">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.button
                key="viewer"
                type="button"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                onClick={() => {
                  setInputValue(String(safePage));
                  setIsEditing(true);
                }}
                className="group flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1 transition-colors hover:bg-secondary/50"
              >
                <span className="text-sm font-semibold tabular-nums">{safePage}</span>
                <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                  {t('paginationOfTotal', { total: safeTotal })}
                </span>
                <Hash className="text-muted-foreground group-hover:text-primary size-3 transition-colors" />
              </motion.button>
            ) : (
              <motion.form
                key="editor"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleInputSubmit}
                className="flex items-center gap-1.5"
              >
                <Input
                  autoFocus
                  className="h-7 w-12 px-1 py-0 text-center text-xs tabular-nums focus-visible:ring-1"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  onBlur={() => setIsEditing(false)}
                  type="text"
                  inputMode="numeric"
                  aria-label={t('paginationJumpLabel')}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="sm"
                  className="h-7 cursor-pointer px-2 text-[10px] font-bold tracking-tighter uppercase"
                >
                  {t('paginationGo')}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <PaginationItem className="hidden sm:block">
          <div className="bg-border mx-1 h-4 w-px" />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (safePage < safeTotal) {
                commitPage(safePage + 1);
              }
            }}
            className={cn(
              'rounded-lg hover:bg-secondary/80',
              safePage >= safeTotal && 'pointer-events-none opacity-40',
            )}
            aria-disabled={safePage >= safeTotal}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
