// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@default/ui/lib/cn";
import { NavItem } from "./app-sidebar";
import { ChevronDown } from "lucide-react";

// Icon Tooltip wrapper
function Tooltip({ children, label, collapsed }: { children: React.ReactNode; label: string; collapsed: boolean }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className={cn("relative flex items-center w-full", collapsed ? "justify-center" : "")}
      onMouseEnter={() => collapsed && setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && collapsed && (
        <div
          className={cn(
            "absolute left-full ml-3 z-50 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium shadow-xl",
            "bg-popover text-popover-foreground border border-border",
            "animate-in fade-in-0 slide-in-from-left-2 duration-150"
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export function NavMain({
  items,
  collapsed,
  openMegaMenu,
  setOpenMegaMenu,
  activeItem,
  setActiveItem,
}: {
  items: NavItem[];
  collapsed: boolean;
  openMegaMenu: string | null;
  setOpenMegaMenu: (title: string | null) => void;
  activeItem: string;
  setActiveItem: (title: string) => void;
}) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <nav
      className="flex flex-col gap-0.5"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {items.map((item, idx) => {
        if (item.isSection && item.label) {
          if (collapsed) return null;
          return (
            <p
              key={idx}
              className="mt-5 mb-1 first:mt-0 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 select-none text-left"
              onMouseEnter={() => setHoveredIdx(null)}
            >
              {item.label}
            </p>
          );
        }

        const hasMega = !!item.megaGroups?.length;
        const isActive = openMegaMenu
          ? openMegaMenu === item.title
          : activeItem === item.title;

        return (
          <React.Fragment key={idx}>
            <Tooltip label={item.title ?? ""} collapsed={collapsed}>
              <button
                id={`sidebar07-nav-${(item.title ?? "").toLowerCase().replace(/\s+/g, "-")}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => {
                  if (hasMega) {
                    setOpenMegaMenu(openMegaMenu === item.title ? null : (item.title ?? null));
                  } else {
                    setActiveItem(item.title!);
                    setOpenMegaMenu(null);
                  }
                }}
                className={cn(
                  "group/item relative flex items-center gap-3 rounded-xl transition-colors duration-200 cursor-pointer",
                  collapsed ? "h-10 w-10 justify-center p-0" : "w-full px-3 py-2.5 text-sm font-medium",
                  isActive
                    ? "text-sidebar-accent-foreground font-semibold"
                    : "text-sidebar-foreground/75 hover:text-sidebar-accent-foreground"
                )}
              >
                {/* Smooth hover background slider */}
                {hoveredIdx === idx && !isActive && (
                  <motion.div
                    layoutId="sidebar07-hover-bg"
                    className="absolute inset-0 bg-sidebar-accent/50 rounded-xl z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Smooth active background slider */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar07-active-bg"
                    className="absolute inset-0 bg-sidebar-accent rounded-xl z-0 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Animated left accent bar */}
                {!collapsed && (isActive && (
                  <motion.span
                    layoutId="sidebar07-active-bar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ))}

                {/* Icon */}
                {item.icon && (
                  <item.icon
                    size={16}
                    className={cn(
                      "shrink-0 transition-all duration-200 relative z-10",
                      isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/50 group-hover/item:text-sidebar-accent-foreground",
                      ""
                    )}
                  />
                )}

                {/* Label */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 truncate text-left whitespace-nowrap overflow-hidden relative z-10"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Chevron pointing right for mega-menu indicator */}
                {!collapsed && hasMega && (
                  <ChevronDown size={14} className={cn(
                    "text-sidebar-foreground/50 transition-transform relative z-10 shrink-0 ml-auto group-hover/item:text-sidebar-accent-foreground",
                    openMegaMenu === item.title ? "-rotate-90 text-sidebar-accent-foreground" : ""
                  )} />
                )}
              </button>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
