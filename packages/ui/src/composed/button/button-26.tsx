// @ts-nocheck
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@default/ui/primitives/button";
import { cn } from "@default/ui/lib/cn";

const COUPON_CODE = "SHADSPACE20";

const CouponRevealButtonDemo = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex min-h-12 items-center justify-center p-4">
      <AnimatePresence mode="wait" initial={false}>
        {!revealed ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex items-stretch"
          >
            <Button
              type="button"
              className="h-11 cursor-pointer rounded-r-none rounded-l-md px-5 text-sm font-semibold shadow-none"
              onClick={() => setRevealed(true)}
            >
              Reveal Coupon Code
            </Button>
            <div
              className={cn(
                "relative h-11 w-28 rounded-r-md border border-dashed border-primary",
                "before:absolute before:-bottom-px before:-left-1.5 before:size-3 before:rotate-45 before:border before:border-primary before:bg-background",
              )}
              aria-hidden
            />
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-11 items-stretch overflow-hidden rounded-md border border-dashed border-primary bg-background"
          >
            <span className="flex items-center bg-primary px-4 text-sm font-bold tracking-wide text-primary-foreground">
              {COUPON_CODE}
            </span>
            <span className="flex items-center px-4 text-sm text-muted-foreground">
              Here&apos;s your coupon code!
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mr-1 size-9 shrink-0 cursor-pointer rounded-md"
              aria-label="Copy coupon code"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="size-4 text-teal-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CouponRevealButtonDemo;
