'use client';

import { motion } from 'framer-motion';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className }: PageTransitionProps) => {
  const mounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
