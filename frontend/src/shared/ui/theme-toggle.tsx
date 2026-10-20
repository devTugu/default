'use client';

import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { useTheme } from '@/shared/ui/app-theme-provider';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { runThemeViewTransition } from '@/shared/ui/theme-view-transition';
import { Button } from '@default/ui/primitives/button';
import { cn } from '@/shared/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className={cn('size-9', className)}
        disabled
      >
        <Sun className="size-4 opacity-0" aria-hidden />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      className={cn(className)}
      onClick={() => {
        runThemeViewTransition(() => {
          flushSync(() => {
            setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          });
        });
      }}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
