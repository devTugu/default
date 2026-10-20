// @ts-nocheck
"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  LucideIcon,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { cn } from "@default/ui/lib/cn";

const spotlightOrbitKeyframes = `
@keyframes spotlight-orbit {
  0% {
    transform: rotate(var(--angle, 0deg)) translateY(var(--radius, 140px))
      rotate(calc(var(--angle, 0deg) * -1));
  }
  100% {
    transform: rotate(calc(var(--angle, 0deg) + 360deg))
      translateY(var(--radius, 140px))
      rotate(calc(var(--angle, 0deg) * -1 - 360deg));
  }
}
`;

type Feature = {
  IconComponent: LucideIcon;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  { IconComponent: Zap, title: "Fast", description: "Optimized rendering keeps every interaction instant." },
  { IconComponent: ShieldCheck, title: "Secure", description: "Built-in guards protect data at every layer." },
  { IconComponent: Palette, title: "Themable", description: "Swap tokens once, restyle the entire interface." },
  { IconComponent: Rocket, title: "Scalable", description: "Grows from a prototype to a production workload." },
  { IconComponent: Sparkles, title: "Delightful", description: "Small, purposeful motion makes the UI feel alive." },
];

const RADIUS = 140;
const DURATION = 26;
const CYCLE_MS = 2600;

export default function OrbitingCirclesSpotlightDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % FEATURES.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, []);

  const activeFeature = FEATURES[active];

  return (
    <div className="relative flex min-h-96 w-full items-center justify-center overflow-hidden">
      <style>{spotlightOrbitKeyframes}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 size-full"
      >
        <circle
          className="stroke-black/10 stroke-1 dark:stroke-white/10"
          cx="50%"
          cy="50%"
          r={RADIUS}
          fill="none"
        />
      </svg>


      <div className="relative z-10 flex w-40 flex-col items-center gap-1.5 text-center">
        {FEATURES.map((feature, index) => (
          <div
            key={feature.title}
            className={cn(
              "absolute flex flex-col items-center gap-1.5 transition-all duration-700 ease-in-out",
              index === active
                ? "scale-100 opacity-100 delay-150"
                : "scale-95 opacity-0",
            )}
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <feature.IconComponent className="size-5" />
            </span>
            <p className="text-sm font-semibold text-foreground">
              {feature.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
       
        <div className="invisible flex flex-col items-center gap-1.5">
          <span className="flex size-11 items-center justify-center rounded-full">
            <activeFeature.IconComponent className="size-5" />
          </span>
          <p className="text-sm font-semibold">{activeFeature.title}</p>
          <p className="text-xs">{activeFeature.description}</p>
        </div>
      </div>

      {FEATURES.map((feature, index) => {
        const angle = (360 / FEATURES.length) * index;
        const isActive = index === active;
        return (
          <div
            key={feature.title}
            style={
              {
                "--angle": `${angle}deg`,
                "--radius": `${RADIUS}px`,
                position: "absolute",
                animation: `spotlight-orbit ${DURATION}s linear 0s infinite normal`,
              } as CSSProperties
            }
          >
            <div
              className={cn(
                "flex size-11 items-center justify-center rounded-full border bg-background transition-all duration-500",
                isActive
                  ? "scale-110 border-primary text-primary ring-4 ring-primary/15"
                  : "border-border text-muted-foreground",
              )}
            >
              <feature.IconComponent className="size-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
