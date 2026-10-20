// @ts-nocheck
import React from "react";
import { LucideIcon, Sun, Moon, Star, Earth } from "lucide-react";
import { cn } from "@default/ui/lib/cn";

const orbitKeyframes = `
@keyframes orbit {
  0% {
    transform: rotate(var(--angle, 0deg)) translateY(var(--radius, 50px))
      rotate(calc(var(--angle, 0deg) * -1));
  }
  100% {
    transform: rotate(calc(var(--angle, 0deg) + 360deg))
      translateY(var(--radius, 50px))
      rotate(calc(var(--angle, 0deg) * -1 - 360deg));
  }
}
`;

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircleIcons({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;

  return (
    <>
      <style>{orbitKeyframes}</style>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / React.Children.count(children)) * index;
        return (
          <div
            style={{
              "--angle": `${angle}deg`,
              "--radius": `${radius}px`,
              position: "absolute",
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              transformOrigin: "center center",
              animation: `orbit ${calculatedDuration}s linear ${delay ? `-${delay}s` : "0s"} infinite ${reverse ? "reverse" : "normal"}`,
            } as React.CSSProperties}
            className={className}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}

type IconData = {
  IconComponent: LucideIcon;
  bgColor: string;
  textColor: string;
  label: string;
};

const circle1Icons: IconData[] = [
  { IconComponent: Sun, bgColor: "bg-orange-400/10", textColor: "text-orange-400", label: "Sun" },
  { IconComponent: Earth, bgColor: "bg-blue-500/10", textColor: "text-blue-500", label: "Earth" },
  { IconComponent: Star, bgColor: "bg-red-500/10", textColor: "text-red-500", label: "Star" },
  { IconComponent: Moon, bgColor: "bg-teal-400/10", textColor: "text-teal-400", label: "Moon" },
];

const circle2Icons: IconData[] = [
  { IconComponent: Earth, bgColor: "bg-blue-500/10", textColor: "text-blue-500", label: "Earth" },
  { IconComponent: Star, bgColor: "bg-red-500/10", textColor: "text-red-500", label: "Star" },
  { IconComponent: Moon, bgColor: "bg-teal-400/10", textColor: "text-teal-400", label: "Moon" },
  { IconComponent: Sun, bgColor: "bg-orange-400/10", textColor: "text-orange-400", label: "Sun" },
];

export default function OrbitingCirclesDemo() {
  return (
    <div className="relative flex min-h-96 w-full items-center justify-center overflow-hidden">
      <OrbitingCircleIcons>
        {circle1Icons.map(({ IconComponent, bgColor, textColor, label }) => (
          <div key={label} className={cn("p-2 rounded-full", bgColor, textColor)} aria-label={label}>
            <IconComponent className="size-6" />
          </div>
        ))}
      </OrbitingCircleIcons>

      <OrbitingCircleIcons radius={100} reverse speed={2}>
        {circle2Icons.map(({ IconComponent, bgColor, textColor, label }) => (
          <div key={label} className={cn("p-2 rounded-full", bgColor, textColor)} aria-label={label}>
            <IconComponent className="size-6" />
          </div>
        ))}
      </OrbitingCircleIcons>
    </div>
  );
}
