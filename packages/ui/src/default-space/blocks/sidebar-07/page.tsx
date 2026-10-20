// @ts-nocheck
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SidebarProvider, SidebarTrigger } from "@default/ui/primitives/sidebar";
import {
  AppSidebar,
  navData,
} from "./app-sidebar";
import { X, ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@default/ui/primitives/breadcrumb";
import { Separator } from "@default/ui/primitives/separator";

interface MegaPanelProps {
  menuTitle: string;
  onClose: () => void;
  onSelectParent: (title: string) => void;
}

function MegaPanel({ menuTitle, onClose, onSelectParent }: MegaPanelProps) {
  const activeNavItem = navData.find((item) => item.title === menuTitle);
  if (!activeNavItem || !activeNavItem.megaGroups) return null;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className="absolute inset-y-0 left-0 z-50 w-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-2xl p-6 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-sidebar-border pb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors cursor-pointer text-sm font-semibold"
        >
          <ChevronLeft size={16} />
          {menuTitle}
        </button>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent text-left">
        {activeNavItem.megaGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">
              {group.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {group.items.map((item, iIdx) => (
                <li key={iIdx}>
                  <a
                    href={item.href}
                    onClick={() => {
                      onSelectParent(menuTitle);
                      onClose();
                    }}
                    className="text-xs text-sidebar-foreground/80 hover:text-sidebar-foreground hover:underline transition-colors block leading-tight py-1"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const Page = () => {
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>(
    navData.find((i) => !i.isSection && i.title)?.title ?? "",
  );

  return (
    <SidebarProvider
      className="bg-muted/30"
      style={
        {
          "--sidebar-width": "280px",
          "--sidebar-width-icon": "64px",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        openMegaMenu={openMegaMenu}
        setOpenMegaMenu={setOpenMegaMenu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      {/* ---------------- Main ---------------- */}
      <div className="flex flex-1 flex-col relative overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4 self-center!"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div>

        {/* Mega Panel overlay */}
        <AnimatePresence>
          {openMegaMenu && (
            <MegaPanel
              menuTitle={openMegaMenu}
              onClose={() => setOpenMegaMenu(null)}
              onSelectParent={setActiveItem}
            />
          )}
        </AnimatePresence>
      </div>
    </SidebarProvider>
  );
};

export default Page;
