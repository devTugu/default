'use client';

import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useIsMounted } from '@/shared/hooks/use-is-mounted';
import { usePrefersReducedMotion } from '@/shared/hooks/use-prefers-reduced-motion';

const fadeInVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
}

export const FadeIn = ({
  children,
  delay = 0,
  className,
  ...props
}: FadeInProps) => {
  const mounted = useIsMounted();
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration: 0.35, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
