// @ts-nocheck
"use client";

import { type CSSProperties } from "react";
import { type LucideIcon, Palette, Code2, MessageSquare, Database, Layers, Rocket, ShieldCheck, Sparkles, Cloud } from "lucide-react";
import { cn } from "@default/ui/lib/cn";

const stackOrbitStyles = `
@keyframes stack-ring-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes stack-ring-counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes stack-ring-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes stack-ring-counter-spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.stack-node {
  transform: translate(-50%, -50%) translate(var(--sx), 0px);
}
.group:hover .stack-node-center {
  transform: translate(-50%, -50%);
}
.group:hover .stack-node-outer {
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(var(--radius))
    rotate(calc(var(--angle) * -1));
}
.stack-ring {
  animation-play-state: paused;
}
.group:hover .stack-ring {
  animation: stack-ring-spin 10s linear infinite;
}
.stack-icon-counter {
  animation-play-state: paused;
}
.group:hover .stack-icon-counter {
  animation: stack-ring-counter-spin 10s linear infinite;
}
.stack-ring-2 {
  animation-play-state: paused;
}
.group:hover .stack-ring-2 {
  animation: stack-ring-spin-reverse 14s linear infinite;
}
.stack-icon-counter-2 {
  animation-play-state: paused;
}
.group:hover .stack-icon-counter-2 {
  animation: stack-ring-counter-spin-reverse 14s linear infinite;
}
`;

type StackNode = {
  IconComponent: LucideIcon;
  label: string;
  bgColor: string;
  textColor: string;
  stackX: number;
  angle: number;
  zIndex: number;
};

const RADIUS_INNER = 88;
const RADIUS_OUTER = 128;
const MORE_STACK_X = 56;

const CENTER_NODE: StackNode = {
  IconComponent: Layers,
  label: "Layers",
  bgColor: "bg-primary",
  textColor: "text-primary-foreground",
  stackX: 0,
  angle: 0,
  zIndex: 30,
};

const OUTER_NODES: StackNode[] = [
  { IconComponent: Palette, label: "Design", bgColor: "bg-orange-400", textColor: "text-white", stackX: -42, angle: -45, zIndex: 10 },
  { IconComponent: Code2, label: "Code", bgColor: "bg-secondary", textColor: "text-secondary-foreground", stackX: -21, angle: 45, zIndex: 20 },
  { IconComponent: MessageSquare, label: "Chat", bgColor: "bg-teal-400", textColor: "text-white", stackX: 21, angle: 225, zIndex: 20 },
  { IconComponent: Database, label: "Database", bgColor: "bg-red-500", textColor: "text-white", stackX: 42, angle: 135, zIndex: 10 },
];

const OUTER_RING_2_NODES: StackNode[] = [
  { IconComponent: Rocket, label: "Rocket", bgColor: "bg-blue-500", textColor: "text-white", stackX: MORE_STACK_X, angle: 0, zIndex: 5 },
  { IconComponent: ShieldCheck, label: "Shield", bgColor: "bg-sky-400", textColor: "text-white", stackX: MORE_STACK_X, angle: 90, zIndex: 5 },
  { IconComponent: Sparkles, label: "Sparkles", bgColor: "bg-amber-300", textColor: "text-black", stackX: MORE_STACK_X, angle: 180, zIndex: 5 },
  { IconComponent: Cloud, label: "Cloud", bgColor: "bg-teal-400", textColor: "text-white", stackX: MORE_STACK_X, angle: 270, zIndex: 5 },
];

export default function OrbitingCirclesStackDemo() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center">
      <style>{stackOrbitStyles}</style>
      <div className="group relative flex size-64 items-center justify-center rounded-full border border-dashed border-border dark:border-muted">
        {/* Inner guide circle */}
        <div className="absolute size-44 rounded-full border border-dashed border-border dark:border-muted" />

        {/* Center node */}
        <div
          className="stack-node stack-node-center absolute top-1/2 left-1/2 z-30 transition-transform duration-500 ease-out"
          style={{ "--sx": `${CENTER_NODE.stackX}px` } as CSSProperties}
        >
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-full border-2 border-border",
              CENTER_NODE.bgColor,
              CENTER_NODE.textColor,
            )}
            aria-label={CENTER_NODE.label}
          >
            <CENTER_NODE.IconComponent className="size-4" />
          </div>
        </div>

        {/* Inner ring: spins clockwise */}
        <div className="stack-ring absolute inset-0">
          {OUTER_NODES.map(({ IconComponent, label, bgColor, textColor, stackX, angle, zIndex }) => (
            <div
              key={label}
              className="stack-node stack-node-outer absolute top-1/2 left-1/2 transition-transform duration-500 ease-out"
              style={
                {
                  "--sx": `${stackX}px`,
                  "--angle": `${angle}deg`,
                  "--radius": `${RADIUS_INNER}px`,
                  zIndex,
                } as CSSProperties
              }
            >
              <div className="stack-icon-counter">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 border-border",
                    bgColor,
                    textColor,
                  )}
                  aria-label={label}
                >
                  <IconComponent className="size-4" />
                </div>
              </div>
            </div>
          ))}

          <div
            className="stack-node absolute top-1/2 left-1/2 opacity-100 transition-opacity duration-300 ease-out group-hover:pointer-events-none group-hover:opacity-0"
            style={{ "--sx": `${MORE_STACK_X}px`, zIndex: 6 } as CSSProperties}
          >
            <div
              className="flex size-9 items-center justify-center rounded-full border-2 border-border bg-muted text-xs font-medium text-muted-foreground"
              aria-label="4 more integrations"
            >
              +4
            </div>
          </div>
        </div>

        {/* Outer ring: hidden until hover, then spreads out and spins counter-clockwise */}
        <div className="stack-ring-2 absolute inset-0">
          {OUTER_RING_2_NODES.map(({ IconComponent, label, bgColor, textColor, stackX, angle, zIndex }) => (
            <div
              key={label}
              className="stack-node stack-node-outer absolute top-1/2 left-1/2 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
              style={
                {
                  "--sx": `${stackX}px`,
                  "--angle": `${angle}deg`,
                  "--radius": `${RADIUS_OUTER}px`,
                  zIndex,
                } as CSSProperties
              }
            >
              <div className="stack-icon-counter-2">
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-full border-2 border-border",
                    bgColor,
                    textColor,
                  )}
                  aria-label={label}
                >
                  <IconComponent className="size-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
