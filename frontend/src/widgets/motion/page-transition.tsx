'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from 'motion/react';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

/** Subtle route change motion — does not remount `{children}` (avoids data flash). */
export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const pathname = usePathname();
  const controls = useAnimation();
  const prefersReducedMotion = usePrefersReducedMotion();
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (previousPathRef.current === pathname) {
      return;
    }
    previousPathRef.current = pathname;
    if (prefersReducedMotion) {
      return;
    }
    void controls.start(
      { opacity: [0.94, 1], y: [6, 0] },
      { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
    );
  }, [pathname, controls, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} initial={false} animate={controls}>
      {children}
    </motion.div>
  );
};
