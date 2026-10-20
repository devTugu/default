// @ts-nocheck
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "./navbar";
import {
  ArrowRight,
  ArrowRightLeft,
  BarChart3,
  CloudUpload,
  Compass,
  FileText,
  Headphones,
  LucideIcon,
  Maximize,
  Store,
  Zap,
} from "lucide-react";
import { cn } from "@default/ui/lib/cn";

// -- Types --

export type NavigationItem = {
  title: string;
  description?: string;
  icon?: LucideIcon;
  href?: string;
};

export type FeatureSection = {
  heading: string;
  items: NavigationItem[];
};

export type HighlightCard = {
  title: string;
  description: string;
  href?: string;
};

export type NavigationLink = {
  title: string;
  href: string;
  hasDropdown?: boolean;
  featureSections?: FeatureSection[];
  highlightCard?: HighlightCard;
};

// -- Data --

const navigationLinks: NavigationLink[] = [
  {
    title: "Features",
    href: "#",
    hasDropdown: true,
    featureSections: [
      {
        heading: "Features",
        items: [
          {
            title: "Backup",
            description: "Keep your data backed up",
            icon: CloudUpload,
            href: "#",
          },
          {
            title: "Guides",
            description: "Learn how to use AI tools",
            icon: FileText,
            href: "#",
          },
          {
            title: "Analytics",
            description: "Track and measure your progress",
            icon: BarChart3,
            href: "#",
          },
        ],
      },
      {
        heading: "Content",
        items: [
          {
            title: "Marketplace",
            description: "Find and buy AI tools",
            icon: Store,
            href: "#",
          },
          {
            title: "API Integration",
            description: "Integrate AI tools into your app",
            icon: ArrowRightLeft,
            href: "#",
          },
          {
            title: "Scalability",
            description: "Scale your application effortlessly",
            icon: Maximize,
            href: "#",
          },
        ],
      },
      {
        heading: "",
        items: [
          {
            title: "Automation",
            description: "Automate your workflow",
            icon: Zap,
            href: "#",
          },
          {
            title: "Discovery",
            description: "Explore the latest AI solutions",
            icon: Compass,
            href: "#",
          },
          {
            title: "Support",
            description: "Get assistance",
            icon: Headphones,
            href: "#",
          },
        ],
      },
    ],
    highlightCard: {
      title: "Guides",
      description: "Learn how to use AI tools",
      href: "#",
    },
  },
  { title: "Support", href: "#" },
  { title: "Resources", href: "#" },
  { title: "Docs", href: "#" },
  { title: "Career", href: "#" },
];

// -- Sub-Components (Mega Menu) --

const MegaMenuPanel = ({
  link,
  isVisible,
}: {
  link: NavigationLink;
  isVisible: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const handleColumnEnter = (index: number) => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setHoveredIndex(index);
  };

  const handleColumnLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => setHoveredIndex(null), 150);
  };

  const updateIndicator = useCallback((index: number | null) => {
    if (index === null || !columnRefs.current[index] || !gridRef.current)
      return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const colRect = columnRefs.current[index]!.getBoundingClientRect();
    setIndicator({ left: colRect.left - gridRect.left, width: colRect.width });
  }, []);

  useEffect(() => {
    updateIndicator(hoveredIndex);
  }, [hoveredIndex, updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator(hoveredIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredIndex, updateIndicator]);

  if (!link.featureSections) return null;
  const totalCols = link.featureSections.length + (link.highlightCard ? 1 : 0);

  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 w-full bg-background border-b border-border shadow-xl shadow-primary/5 z-50 transition-all duration-300 ease-in-out overflow-hidden border-t border-dashed",
        isVisible
          ? "opacity-100 max-h-125 translate-y-0 pointer-events-auto"
          : "opacity-0 max-h-0 -translate-y-2 pointer-events-none",
      )}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <div
          ref={gridRef}
          className={cn(
            "grid gap-8 relative",
            link.highlightCard ? "grid-cols-4" : `grid-cols-${totalCols}`,
          )}
        >
          <div
            className={cn(
              "absolute top-9 h-px z-10 pointer-events-none bg-linear-to-r from-blue-500 via-red-500 to-teal-400 transition-[left,width,opacity] duration-500 ease-in-out",
              hoveredIndex !== null ? "opacity-100" : "opacity-0",
            )}
            style={{ left: indicator.left, width: indicator.width }}
          />

          {link.featureSections.map((section, i) => (
            <div
              key={i}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
              className="space-y-4"
              onMouseEnter={() => handleColumnEnter(i)}
              onMouseLeave={handleColumnLeave}
            >
              <p className="text-sm font-normal text-muted-foreground tracking-wide h-5">
                {section.heading}
              </p>
              <div className="h-px w-full bg-border" />
              <div className="space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.title}
                    href={item.href || "#"}
                    className="flex flex-col gap-0.5 rounded-lg p-2.5 hover:bg-muted/80 transition-all group"
                  >
                    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      {item.title}
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      />
                    </span>
                    <span className="text-xs text-muted-foreground font-normal leading-relaxed">
                      {item.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}

          {link.highlightCard && (
            <div
              ref={(el) => {
                columnRefs.current[totalCols - 1] = el;
              }}
              className="flex flex-col gap-4"
              onMouseEnter={() => handleColumnEnter(totalCols - 1)}
              onMouseLeave={handleColumnLeave}
            >
              <p className="text-sm font-normal text-muted-foreground tracking-wide h-5 shrink-0">
                Change Log
              </p>
              <div className="h-px w-full bg-border shrink-0" />
              <a
                href={link.highlightCard.href || "#"}
                className="group relative flex grow flex-col justify-start overflow-hidden rounded-2xl bg-muted p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 bg-[url('https://images.shadcnspace.com/assets/backgrounds/navbar-changelog-bg.webp')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                    {link.highlightCard.title}
                    <ArrowRight
                      size={14}
                      className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed line-clamp-2">
                    {link.highlightCard.description}
                  </p>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -- Entry Point Component --

const NavbarBlock = () => {
  return (
    <Navbar navigationLinks={navigationLinks} MegaMenuPanel={MegaMenuPanel} />
  );
};

export default NavbarBlock;
