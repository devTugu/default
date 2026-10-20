// @ts-nocheck
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "./navbar";
import {
    ArrowRight,
    LucideIcon,
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
                heading: "",
                items: [
                    {
                        title: "Automation",
                        description: "Automate your workflow",

                        href: "#",
                    },
                    {
                        title: "Scalability",
                        description: "Scale your application effortlessly",

                        href: "#",
                    },
                    {
                        title: "Announcement",
                        description: "Keep your data backed up",

                        href: "#",
                    },
                    {
                        title: "Analytics",
                        description: "Track and measure your progress",

                        href: "#",
                    },
                    {
                        title: "Resource Library",
                        description: "Helpful resources anytime",

                        href: "#",
                    },
                ],
            },
            {
                heading: "",
                items: [
                    {
                        title: "Marketplace",
                        description: "Find and buy AI tools",

                        href: "#",
                    },
                    {
                        title: "Guides",
                        description: "Guides",
                        href: "#",
                    },
                    {
                        title: "API Integration",
                        description: "Integrate AI tools into your app",

                        href: "#",
                    },
                    {
                        title: "Partnerships",
                        description: "Get help when you need it",

                        href: "#",
                    },
                    {
                        title: "Data Security",
                        description: "Keep your data secure",

                        href: "#",
                    },
                ],
            },
            {
                heading: "",

                items: [
                    {
                        title: "Discovery",
                        description: "Explore the latest AI solutions",
                        href: "#",
                    },
                    {
                        title: "Support",
                        description: "Get assistance",
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
    { title: "Integration", href: "#" },

    { title: "Support", href: "#" },
    { title: "Docs", href: "#" },
    { title: "Pricing", href: "#" },
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
                "absolute top-full left-0 right-0 w-full bg-background border-b border-border shadow-xl shadow-primary/5 z-50 transition-all duration-300 ease-in-out overflow-hidden border-t",
                isVisible
                    ? "opacity-100 max-h-125 translate-y-0 pointer-events-auto"
                    : "opacity-0 max-h-0 -translate-y-2 pointer-events-none",
            )}
        >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 ">
                <div
                    ref={gridRef}
                    className={cn(
                        "grid gap-4 relative  ",
                        link.highlightCard ? "grid-cols-4" : `grid-cols-${totalCols}`,
                    )}
                >
                    <div className="absolute " />

                    {link.featureSections.map((section, i) => (
                        <div key={i}>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href || "#"}
                                        className="flex flex-col rounded-lg p-2.5 hover:bg-muted/80 transition-all group"
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
                        <div className="py-3 px-4 rounded-xl bg-muted flex flex-col items-start justify-between ">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-normal text-muted-foreground tracking-wide">
                                    More
                                </p>
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-foreground tracking-wide ">
                                        Discovery
                                    </p>
                                    <p className="text-xs font-normal text-muted-foreground tracking-wide ">
                                        Explore the latest AI solutions
                                    </p>
                                </div>
                            </div>
                            <div className="w-full">
                                <a
                                    href={link.highlightCard.href || "#"}
                                    className="group relative flex h-32 md:h-36 lg:h-40  flex-col justify-start overflow-hidden rounded-xl bg-muted p-4 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                                >
                                    {/* Background Image with Zoom Effect */}
                                    <div className="absolute inset-0 bg-[url('https://images.shadcnspace.com/assets/backgrounds/navbar-changelog-bg.webp')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-0.5 text-xs font-medium text-white">
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
