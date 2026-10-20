// @ts-nocheck
"use client";

import { useId, useState, useEffect } from "react";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@default/ui/primitives/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@default/ui/primitives/popover";
import { cn } from "@default/ui/lib/cn";

const skills = [
  { value: "typescript", label: "TypeScript" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "tailwindcss", label: "Tailwind CSS" },
  { value: "nodejs", label: "Node.js" },
  { value: "graphql", label: "GraphQL" },
  { value: "python", label: "Python" },
  { value: "docker", label: "Docker" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "figma", label: "Figma" },
];

const ComboboxMultipleExpandableDemo = () => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([
    "typescript",
    "react",
    "nextjs",
    "tailwindcss",
    "figma",
  ]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setMounted(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [open]);

  const toggleSelection = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const removeSelection = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  const maxShownItems = 2;
  const visibleItems = expanded
    ? selectedValues
    : selectedValues.slice(0, maxShownItems);
  const hiddenCount = selectedValues.length - visibleItems.length;

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="border-input bg-background hover:bg-background h-auto min-h-10 w-full justify-between px-3 py-2 font-normal focus-visible:ring-1 cursor-pointer"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedValues.length > 0 ? (
                  <>
                    {visibleItems.map((val) => {
                      const skill = skills.find((s) => s.value === val);

                      return skill ? (
                        <Badge
                          key={val}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary/80 flex items-center gap-1 rounded-md px-1.5 py-1 font-medium transition-colors leading-0"
                        >
                          {skill.label}
                          <span
                          role="button"
                          className="flex items-center justify-center rounded-full size-5 cursor-pointer hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSelection(val);
                          }}
                        >
                          <XIcon className="size-3" />
                        </span>
                        </Badge>
                      ) : null;
                    })}
                    {hiddenCount > 0 || expanded ? (
                      <Badge
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded((prev) => !prev);
                        }}
                        className="bg-background/50 hover:bg-background border-dashed cursor-pointer rounded-md px-1.5 py-2 h-5 font-medium transition-colors leading-0"
                      >
                        {expanded ? "Show Less" : `+${hiddenCount} more`}
                      </Badge>
                    ) : null}
                  </>
                ) : (
                  <span className="text-muted-foreground">
                    Select skills...
                  </span>
                )}
              </div>
              <ChevronsUpDownIcon
                className="text-muted-foreground/60 ml-2 size-4 shrink-0"
                aria-hidden="true"
              />
            </Button>
          }
        />
        <PopoverContent
          className="data-open:zoom-in-0! origin-center p-0 duration-500"
          align="start"
          initialFocus={false}
        >
          {mounted && (
            <Command className="w-full">
              <CommandInput placeholder="Search skills..." className="h-9" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {skills.map((skill) => {
                    const isSelected = selectedValues.includes(skill.value);
                    return (
                      <CommandItem
                        key={skill.value}
                        value={skill.value}
                        onSelect={() => toggleSelection(skill.value)}
                        className="flex items-center justify-between [&>svg:last-of-type]:hidden"
                      >
                        <span className="truncate">{skill.label}</span>
                        <CheckIcon
                          className={cn(
                            "size-4 transition-opacity",
                            isSelected ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboboxMultipleExpandableDemo;
