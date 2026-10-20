// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@default/ui/primitives/button";
import { Input } from "@default/ui/primitives/input";
import { Separator } from "@default/ui/primitives/separator";
import {
  ArrowLeft,
  ChevronRight,
  Component,
  Download,
  Eye,
  Image,
  Layers,
  LayoutGrid,
  Palette,
  Plus,
  Square,
  Type,
  AlignLeft,
  Navigation,
  Camera,
  Shapes,
} from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  submenuId?: string;
};

type PanelConfig = {
  id: string;
  searchable?: boolean;
  items: MenuItem[];
};

const PANELS: Record<string, PanelConfig> = {
  root: {
    id: "root",
    items: [
      { id: "insert", label: "Insert", icon: Plus },
      { id: "layers", label: "Layers", icon: Layers },
      { id: "components", label: "Components", icon: Component, shortcut: "/", submenuId: "components" },
      { id: "assets", label: "Assets", icon: Image, shortcut: "@", submenuId: "assets" },
      { id: "export", label: "Export", icon: Download },
      { id: "preview", label: "Preview", icon: Eye },
    ],
  },
  components: {
    id: "components",
    searchable: true,
    items: [
      { id: "buttons", label: "Buttons", icon: Square, submenuId: "buttons" },
      { id: "forms", label: "Forms", icon: AlignLeft, submenuId: "forms" },
      { id: "navigation", label: "Navigation", icon: Navigation, submenuId: "navigation" },
      { id: "cards", label: "Cards", icon: LayoutGrid, submenuId: "cards" },
    ],
  },
  buttons: {
    id: "buttons",
    searchable: true,
    items: [
      { id: "btn-1", label: "Primary Button", icon: Square },
      { id: "btn-2", label: "Secondary Button", icon: Square },
      { id: "btn-3", label: "Ghost Button", icon: Square },
      { id: "btn-4", label: "Icon Button", icon: Square },
    ],
  },
  forms: {
    id: "forms",
    searchable: true,
    items: [
      { id: "form-1", label: "Input Field", icon: AlignLeft },
      { id: "form-2", label: "Dropdown Select", icon: AlignLeft },
      { id: "form-3", label: "Checkbox Group", icon: AlignLeft },
      { id: "form-4", label: "Toggle Switch", icon: AlignLeft },
    ],
  },
  navigation: {
    id: "navigation",
    searchable: true,
    items: [
      { id: "nav-1", label: "Navbar", icon: Navigation },
      { id: "nav-2", label: "Sidebar", icon: Navigation },
      { id: "nav-3", label: "Breadcrumb", icon: Navigation },
      { id: "nav-4", label: "Tabs", icon: Navigation },
    ],
  },
  cards: {
    id: "cards",
    searchable: true,
    items: [
      { id: "card-1", label: "Profile Card", icon: LayoutGrid },
      { id: "card-2", label: "Stats Card", icon: LayoutGrid },
      { id: "card-3", label: "Pricing Card", icon: LayoutGrid },
      { id: "card-4", label: "Blog Card", icon: LayoutGrid },
    ],
  },
  assets: {
    id: "assets",
    searchable: true,
    items: [
      { id: "icons", label: "Icons", icon: Shapes, submenuId: "icons" },
      { id: "illustrations", label: "Illustrations", icon: Palette, submenuId: "illustrations" },
      { id: "photos", label: "Photos", icon: Camera, submenuId: "photos" },
      { id: "typography", label: "Typography", icon: Type, submenuId: "typography" },
    ],
  },
  icons: {
    id: "icons",
    searchable: true,
    items: [
      { id: "icon-1", label: "Outline Style", icon: Shapes },
      { id: "icon-2", label: "Filled Style", icon: Shapes },
      { id: "icon-3", label: "Duotone Style", icon: Shapes },
      { id: "icon-4", label: "Animated Icons", icon: Shapes },
    ],
  },
  illustrations: {
    id: "illustrations",
    searchable: true,
    items: [
      { id: "ill-1", label: "Abstract Shapes", icon: Palette },
      { id: "ill-2", label: "Characters", icon: Palette },
      { id: "ill-3", label: "Scenes", icon: Palette },
    ],
  },
  photos: {
    id: "photos",
    searchable: true,
    items: [
      { id: "photo-1", label: "Nature", icon: Camera },
      { id: "photo-2", label: "Architecture", icon: Camera },
      { id: "photo-3", label: "People", icon: Camera },
    ],
  },
  typography: {
    id: "typography",
    searchable: true,
    items: [
      { id: "type-1", label: "Sans Serif", icon: Type },
      { id: "type-2", label: "Serif", icon: Type },
      { id: "type-3", label: "Monospace", icon: Type },
      { id: "type-4", label: "Display", icon: Type },
    ],
  },
};

type Direction = "forward" | "backward";

const SPRING = { type: "spring", bounce: 0.1, duration: 0.38 } as const;

const panelVariants = {
  enter: (dir: Direction) => ({
    x: dir === "forward" ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(50px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: Direction) => ({
    x: dir === "forward" ? "-100%" : "100%",
    opacity: 0,
    filter: "blur(50px)",
  }),
};

type Props = {
  defaultOpen?: boolean;
};

const DropdownMenu04 = ({ defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const [stack, setStack] = useState<string[]>(["root"]);
  const [direction, setDirection] = useState<Direction>("forward");
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const currentPanelId = stack[stack.length - 1];
  const currentPanel = PANELS[currentPanelId];
  const isRoot = stack.length === 1;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStack(["root"]);
        setSearch("");
        setDirection("forward");
      }, 300);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (open && currentPanel.searchable) {
      const t = setTimeout(() => searchRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [currentPanelId, open]);

  const navigate = (submenuId: string) => {
    setDirection("forward");
    setSearch("");
    setStack((prev) => [...prev, submenuId]);
  };

  const goBack = () => {
    setDirection("backward");
    setSearch("");
    setStack((prev) => prev.slice(0, -1));
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.submenuId) {
      navigate(item.submenuId);
    } else {
      setOpen(false);
    }
  };

  const filteredItems = currentPanel.items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-[320px] items-start justify-center px-4 py-8 w-full">
      <div ref={containerRef} className="relative">
        <Button
          variant="outline"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl cursor-pointer"
        >
          Open menu
        </Button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: -6, scale: 0.97, x: "-50%" }}
              transition={SPRING}
              className="absolute top-full mt-2 left-1/2 z-50 w-[calc(100vw-72px)] sm:w-72 bg-popover border border-border rounded-2xl shadow-lg overflow-hidden"
            >
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={currentPanelId}
                  custom={direction}
                  variants={panelVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={SPRING}
                >
                  {/* Submenu header: back button + search */}
                  {!isRoot && (
                    <>
                      <div className="flex items-center gap-1 px-2 py-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={goBack}
                          className="size-8 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
                        >
                          <ArrowLeft className="size-4" />
                        </Button>
                        {currentPanel.searchable && (
                          <Input
                            ref={searchRef}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search resources"
                            className="h-8 border-0 shadow-none bg-transparent dark:bg-transparent focus-visible:ring-0 px-1 text-sm placeholder:text-muted-foreground"
                          />
                        )}
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Items list */}
                  <motion.div layout className="max-h-72 overflow-y-auto transition duration-1000">
                    <AnimatePresence>
                      {filteredItems.length > 0 ? (
                        filteredItems.map((item, index) => (
                          <div key={item.id}>
                            <button
                              onClick={() => handleItemClick(item)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                            >
                              <item.icon className="size-4 text-muted-foreground shrink-0" />
                              <span className="flex-1 text-left">{item.label}</span>
                              {item.shortcut && (
                                <span className="text-xs text-muted-foreground font-mono">
                                  {item.shortcut}
                                </span>
                              )}
                              {item.submenuId && (
                                <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                              )}
                            </button>
                            {index < filteredItems.length - 1 && <Separator />}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-6 px-4">
                          No results found
                        </p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DropdownMenu04;
