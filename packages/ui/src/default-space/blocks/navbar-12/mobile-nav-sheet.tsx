// @ts-nocheck
"use client";

import Logo from "../../assets/logo/logo";
import { X } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@default/ui/primitives/sheet";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@default/ui/primitives/accordion";
import type { NavLink } from "./navbar-12-data";

export interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: NavLink[];
}

export function MobileNavSheet({
  open,
  onOpenChange,
  navLinks,
}: MobileNavSheetProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-96 p-0 border-l-0"
        showCloseButton={false}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <a href="#" onClick={close}>
              <Logo />
            </a>
            <SheetClose
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg size-10 cursor-pointer"
                />
              }
            >
              <X className="size-4" />
            </SheetClose>
          </div>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <hr className="border-border" />
          <ScrollArea className="flex-1 min-h-0">
            <div className="flex flex-col p-4 sm:p-6">
              <Accordion multiple className="w-full">
                {navLinks.map((link) =>
                  link.megaMenu ? (
                    <AccordionItem key={link.name} value={link.name}>
                      <AccordionTrigger className="text-base hover:no-underline!">
                        {link.name}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-4">
                          {link.megaMenu.columns.map((column) => (
                            <div
                              key={column.title}
                              className="flex flex-col gap-2"
                            >
                              <span className="block text-xs font-semibold uppercase tracking-wide text-foreground">
                                {column.title}
                              </span>
                              <ul className="flex flex-col gap-2">
                                {column.links.map((item) => (
                                  <li key={item.name}>
                                    <a
                                      href={item.href}
                                      onClick={close}
                                      className="text-sm text-muted-foreground hover:text-foreground no-underline!"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <div key={link.name} className="border-b">
                      <a
                        href={link.href}
                        onClick={close}
                        className="flex items-center py-2.5 text-base font-medium text-foreground"
                      >
                        {link.name}
                      </a>
                    </div>
                  ),
                )}
              </Accordion>
            </div>
          </ScrollArea>
          <div className="flex flex-col gap-4 px-4 sm:px-6 py-5">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} default
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
