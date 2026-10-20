// @ts-nocheck
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import NumberFlow from "@number-flow/react";
import { cn } from "@default/ui/lib/cn";

interface Slider05Props {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export default function Slider05({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  className,
}: Slider05Props) {
  const [value, setValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(400);
  
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  
  const numBars = 44; // Adjusted to match the visual density of the screenshot
  const padding = 16;

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const isActive = isHovering || isDragging;
  const progress = (value - min) / (max - min);

  const calculateValue = (x: number, width: number) => {
    const innerWidth = width - padding * 2;
    const pct = Math.max(0, Math.min(1, (x - padding) / innerWidth));
    return Math.round(min + pct * (max - min));
  };

  const getX = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    return Math.max(0, Math.min(rect.width, clientX - rect.left));
  };

  const handleUpdate = (e: React.MouseEvent | React.TouchEvent, shouldUpdateValue = false) => {
    const x = getX(e);
    mouseX.set(x);

    if (containerRef.current) {
      const newValue = calculateValue(x, containerRef.current.offsetWidth);
      setHoverValue(newValue);
      if (shouldUpdateValue || isDragging) {
        if (newValue !== value) {
          setValue(newValue);
          onChange?.(newValue);
        }
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    handleUpdate(e, true);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  const tooltipLeft = useTransform(smoothMouseX, [0, containerWidth], ["0%", "100%"]);

  return (
    <div className={cn("group relative flex flex-col items-center w-full max-w-sm mx-auto py-12", className)}>
      {/* Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -55, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", damping: 15, stiffness: 400 }}
            className="absolute z-20 bg-secondary text-secondary-foreground p-1 px-3 rounded-xl text-xl pointer-events-none w-fit text-center flex items-center justify-center border border-border"
            style={{
              left: tooltipLeft,
              translateX: "-50%",
            }}
          >
            <NumberFlow value={hoverValue ?? value} />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={containerRef}
        className={cn(
          "relative flex items-end w-full px-4 bg-background rounded-xl border border-border cursor-pointer select-none touch-none transition-all duration-300 ease-out overflow-hidden",
          isActive ? "h-21 pb-4" : "h-9 pb-3"
        )}
        onMouseMove={(e) => handleUpdate(e)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverValue(null);
        }}
        onMouseDown={handleMouseDown}
        onTouchMove={(e) => handleUpdate(e)}
        onTouchStart={handleMouseDown}
      >
        <div className="flex items-end w-full gap-0.75">
          {Array.from({ length: numBars }).map((_, i) => (
            <Bar
              key={i}
              index={i}
              mouseX={smoothMouseX}
              numBars={numBars}
              progress={progress}
              isActive={isActive}
              containerWidth={containerWidth}
              padding={padding}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Bar({ 
  index, 
  mouseX, 
  numBars, 
  progress, 
  isActive,
  containerWidth,
  padding
}: { 
  index: number, 
  mouseX: any, 
  numBars: number, 
  progress: number,
  isActive: boolean,
  containerWidth: number,
  padding: number
}) {
  const barProgress = index / (numBars - 1);
  const isFilled = barProgress <= progress;

  const height = useTransform(mouseX, (val: number) => {
    const normalHeight = 10;
    const hoverBaseHeight = 50;
    const dipHeight = 20;
    
    if (!isActive) return normalHeight;

    const innerWidth = containerWidth - padding * 2;
    const barX = padding + barProgress * innerWidth;
    const distance = Math.abs(val - barX);
    const maxDistance = 140;

    let targetHeight = hoverBaseHeight;

    if (distance < maxDistance) {
      const relDist = distance / maxDistance;
      const dip = (Math.cos(relDist * Math.PI) + 1) / 2;
      targetHeight = hoverBaseHeight - dip * (hoverBaseHeight - dipHeight);
    }

    if (isFilled) {
      const activeRangeProgress = barProgress / Math.max(progress, 0.01);
      const activeArc = Math.sin(activeRangeProgress * Math.PI) * 6;
      targetHeight += activeArc;
    }

    return targetHeight;
  });

  const smoothHeight = useSpring(height, { damping: 35, stiffness: 300 });

  return (
    <motion.div
      style={{ height: smoothHeight }}
      className={cn(
        "flex-1 rounded-full transition-colors duration-500",
        isFilled 
          ? "bg-foreground z-10" 
          : "bg-foreground/15"
      )}
    />
  );
}
