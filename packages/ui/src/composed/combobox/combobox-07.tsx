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

const tags = [
  { value: "design", label: "Design" },
  { value: "web-dev", label: "Web Dev" },
  { value: "mobile", label: "Mobile" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
  { value: "branding", label: "Branding" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
];

const ComboboxMultipleDemo = () => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([
    "design",
    "web-dev",
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

  return (
    <div className="w-full max-w-xs">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
<Button
              id={id}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="border-input bg-background hover:bg-background h-auto min-h-10 w-full justify-between px-3 py-2 font-normal focus-visible:ring-1 cursor-pointer"
            >
<div className="flex flex-wrap items-center gap-1.5">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const tag = tags.find((t) => t.value === val);

                    return tag ? (
                      <Badge
                        key={val}
                        variant="secondary"
                        className="bg-secondary/50 hover:bg-secondary/80 flex items-center gap-1 rounded-md px-1.5 py-1 font-medium transition-colors leading-0"
                      >
                        {tag.label}
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
                  })
                ) : (
                  <span className="text-muted-foreground">Select tags...</span>
                )}
              </div>
              <ChevronsUpDownIcon
                className="text-muted-foreground/60 ml-2 size-4 shrink-0"
                aria-hidden="true"
              />
            
</Button>
</PopoverTrigger>
        <PopoverContent className="data-open:zoom-in-100 data-open:slide-in-from-bottom-10! p-0 duration-400" align="start" initialFocus={false}>
          {mounted && (
            <Command className="w-full">
              <CommandInput placeholder="Search tags..." className="h-9" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {tags.map((tag) => {
                    const isSelected = selectedValues.includes(tag.value);
                    return (
                      <CommandItem
                        key={tag.value}
                        value={tag.value}
                        onSelect={() => toggleSelection(tag.value)}
                        className="flex items-center justify-between [&>svg:last-of-type]:hidden"
                      >
                        <span className="truncate">{tag.label}</span>
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

export default ComboboxMultipleDemo;
