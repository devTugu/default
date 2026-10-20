// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@default/ui/lib/cn";

const spring = { type: "spring", stiffness: 220, damping: 18 } as const;

const BASE_SIZE = 96;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export interface DotProps {
  className?: string;
  followCursor?: boolean;
  size?: number;
}

const Dot = ({
  className,
  followCursor = false,
  size = BASE_SIZE,
}: DotProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduceMotion || followCursor) return;
    let timer: ReturnType<typeof setTimeout>;
    const glance = () => {
      const center = Math.random() < 0.25;
      setLook(
        center
          ? { x: 0, y: 0 }
          : { x: randomBetween(-1, 1), y: randomBetween(-0.7, 0.7) },
      );
      timer = setTimeout(glance, randomBetween(1200, 2800));
    };
    timer = setTimeout(glance, 800);
    return () => clearTimeout(timer);
  }, [reduceMotion, followCursor]);

  useEffect(() => {
    if (reduceMotion || !followCursor) return;
    const onMove = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const strength = Math.min(distance / 160, 1);
      setLook({ x: (dx / distance) * strength, y: (dy / distance) * strength });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, followCursor]);

  useEffect(() => {
    if (reduceMotion) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(
        () => {
          setBlink(true);
          timer = setTimeout(() => {
            setBlink(false);
            schedule();
          }, 140);
        },
        randomBetween(2000, 5000),
      );
    };
    schedule();
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const bodyAnimation = reduceMotion ? undefined : { rotate: [0, 15, 0] };
  const bodyTransition = {
    duration: 0.6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatDelay: 2.5,
  } as const;

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Animated dot"
      style={{ width: size, height: size }}
      className={cn("relative", className)}
    >
      <motion.svg
        viewBox="0 0 100 100"
        animate={bodyAnimation}
        transition={bodyTransition}
        aria-hidden="true"
        className="size-full origin-center fill-orange-400 stroke-orange-400"
      >
        <circle cx="50" cy="50" r="26" />
        <circle cx="74.0" cy="50.0" r="16" />
        <circle cx="62.0" cy="70.8" r="16" />
        <circle cx="38.0" cy="70.8" r="16" />
        <circle cx="26.0" cy="50.0" r="16" />
        <circle cx="38.0" cy="29.2" r="16" />
        <circle cx="62.0" cy="29.2" r="16" />
      </motion.svg>
      <div
        className={cn(
          "absolute left-1/2 top-1/2 flex size-24 items-center justify-center",
          "",
        )}
        style={{
          transform: `translate(-50%, -50%) scale(${size / BASE_SIZE})`,
        }}
      >
        <motion.div
          className="flex items-center gap-2"
          animate={{
            x: look.x * 6,
            y: look.y * 5,
            scaleY: blink ? 0.1 : 1,
          }}
          transition={{ ...spring, scaleY: { duration: 0.1 } }}
        >
          <svg
            viewBox="0 0 10 10"
            aria-hidden="true"
            className="size-3 fill-none stroke-gray-950"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2L7 5L3 8" />
          </svg>
          <svg
            viewBox="0 0 10 10"
            aria-hidden="true"
            className="size-3 fill-none stroke-gray-950"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 2L3 5L7 8" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

const Dots01 = () => (
  <>
    <Dot size={96} followCursor />
  </>
);

export default Dots01;
