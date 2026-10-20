// @ts-nocheck
"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@default/ui/primitives/toggle-group";
import { LayoutGrid, List } from "lucide-react";
import { motion } from "motion/react";

const pressedClear =
  "data-pressed:bg-transparent! aria-pressed:bg-transparent! data-[state=on]:bg-transparent! hover:bg-muted/40";

const ToggleGroupDemo = () => {
  const [view, setView] = useState<string[]>(["grid"]);

  return (
    <div className="flex flex-col gap-1.5 w-full sm:w-auto">
      <ToggleGroup
        value={view}
        onValueChange={(val) => {
          if (val && val.length > 0) setView(val);
        }}
        className="bg-muted/40 border border-border p-1 rounded-xl gap-1 w-full sm:w-auto justify-start"
      >
        {[
          { id: "grid", label: "Grid", icon: LayoutGrid },
          { id: "list", label: "List", icon: List },
        ].map((item) => {
          const isActive = view.includes(item.id);
          return (
            <ToggleGroupItem
              key={item.id}
              value={item.id}
              className={`relative px-3.5 py-1.5 h-9 rounded-lg text-sm font-medium transition-colors hover:text-foreground text-muted-foreground cursor-pointer outline-none border-0 ${pressedClear} data-pressed:text-primary-foreground! aria-pressed:text-primary-foreground! data-[state=on]:text-primary-foreground!`}
            >
              <div className="flex items-center gap-2 relative z-10">
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </div>
              {isActive ? (
                <motion.div
                  layoutId="active-view-pill"
                  className="absolute inset-0 bg-primary rounded-lg z-0"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              ) : null}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupDemo;
