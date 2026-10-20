// @ts-nocheck
"use client";

import { motion } from "motion/react";
import { Separator } from "@default/ui/primitives/separator";
import { cn } from "@default/ui/lib/cn";

export interface AnimatedPulseSeparatorProps {
  /**
   * Duration of the pulse release animation, in seconds
   * @default 1.6
   */
  duration?: number;
  /**
   * Play the pulse once when it scrolls into view, or every time it re-enters
   * @default true
   */
  once?: boolean;
  /**
   * Additional classes for the outer wrapper
   */
  className?: string;
}

export function AnimatedPulseSeparator({
  duration = 1.6,
  once = true,
  className,
}: AnimatedPulseSeparatorProps) {
  return (
    <div className={cn("relative", className)}>
      <Separator className="border-border border-b border-dashed bg-transparent" />
      <motion.div
        className="absolute inset-0 origin-center border-b border-primary"
        initial={{ scaleX: 0, opacity: 0.8 }}
        whileInView={{ scaleX: 1, opacity: 0 }}
        viewport={{ once, amount: 1 }}
        transition={{ duration, ease: "easeOut" }}
      />
    </div>
  );
}

const AnimatedPulseDemo = () => {
  return (
    <div className="w-full max-w-sm">
      <AnimatedPulseSeparator />
    </div>
  );
};

export default AnimatedPulseDemo;
