'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

const DASHBOARD_PREFIX = '/dashboard';
const COMPLETE_MS = 280;
const TICK_MS = 120;

function isDashboardNavigation(href: string, currentPath: string): boolean {
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      return false;
    }
    if (!url.pathname.startsWith(DASHBOARD_PREFIX)) {
      return false;
    }
    if (url.pathname === currentPath && url.search === window.location.search) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

type NavigationProgressBarProps = {
  /** Renders as a line on the top edge of the admin topbar card. */
  embedded?: boolean;
};

export function NavigationProgressBar({
  embedded = false,
}: NavigationProgressBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathnameRef = useRef(pathname);
  const skipPathnameFinishRef = useRef(true);

  const clearTimers = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (completeRef.current) {
      clearTimeout(completeRef.current);
      completeRef.current = null;
    }
  }, []);

  const finishProgress = useCallback(() => {
    clearTimers();
    setProgress(100);
    completeRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, COMPLETE_MS);
  }, [clearTimers]);

  const startProgress = useCallback(() => {
    if (prefersReducedMotion) {
      clearTimers();
      setVisible(true);
      setProgress(100);
      completeRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 150);
      return;
    }
    clearTimers();
    setVisible(true);
    setProgress(12);
    tickRef.current = setInterval(() => {
      setProgress((value) => {
        if (value >= 88) {
          return value;
        }
        const step = value < 40 ? 8 : value < 70 ? 4 : 2;
        return Math.min(88, value + step);
      });
    }, TICK_MS);
  }, [clearTimers, prefersReducedMotion]);

  useEffect(() => {
    pathnameRef.current = pathname;
    if (skipPathnameFinishRef.current) {
      skipPathnameFinishRef.current = false;
      return;
    }
    finishProgress();
  }, [pathname, searchKey, finishProgress]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const anchor = target.closest('a');
      if (!anchor?.href || anchor.target === '_blank' || anchor.hasAttribute('download')) {
        return;
      }
      if (!isDashboardNavigation(anchor.href, pathnameRef.current)) {
        return;
      }
      startProgress();
    };

    const onPopState = () => {
      if (pathnameRef.current.startsWith(DASHBOARD_PREFIX)) {
        startProgress();
      }
    };

    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState);
      clearTimers();
    };
  }, [clearTimers, startProgress]);

  if (!visible && progress === 0) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-hidden
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className={cn(
        'pointer-events-none h-0.5 overflow-hidden bg-transparent',
        embedded
          ? 'absolute inset-x-0 top-0 z-10 rounded-t-xl'
          : 'absolute inset-x-0 top-0 z-[60]',
      )}
    >
      <div
        className={cn(
          'h-full origin-left bg-primary transition-[width,opacity] ease-out',
          prefersReducedMotion ? 'duration-75' : 'duration-200',
          progress >= 100 ? 'opacity-0' : 'opacity-100',
        )}
        style={{ width: `${progress}%` }}
      />
      {!prefersReducedMotion ? (
        <div
          className="navigation-progress-shimmer pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          style={{ left: `${Math.max(0, progress - 8)}%` }}
        />
      ) : null}
    </div>
  );
}
