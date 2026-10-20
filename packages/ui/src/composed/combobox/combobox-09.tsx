// @ts-nocheck
"use client";

import { useId, useState, useEffect } from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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

const categories = [
  { value: "technology", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "travel", label: "Travel" },
];

const ComboboxMultipleCountBadgeDemo = () => {
  const id = useId();
  const [open, setOpen] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([
    "technology",
    "business",
    "education",
    "science",
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
{selectedValues.length > 0 ? (
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-secondary/80 rounded-md px-1.5 py-0.5 font-medium leading-none"
                  >
                    {selectedValues.length}
                  </Badge>
                  <span className="text-muted-foreground">
                    categories selected
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  Select categories...
                </span>
              )}
              <ChevronsUpDownIcon
                className="text-muted-foreground/60 ml-2 size-4 shrink-0"
                aria-hidden="true"
              />
            
</Button>
</PopoverTrigger>
        <PopoverContent
          className="data-open:zoom-in-100 data-open:slide-in-from-bottom-10! p-0 duration-400"
          align="start"
          initialFocus={false}
        >
          {mounted && (
            <Command className="w-full">
              <CommandInput placeholder="Search categories..." className="h-9" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => {
                    const isSelected = selectedValues.includes(category.value);
                    return (
                      <CommandItem
                        key={category.value}
                        value={category.value}
                        onSelect={() => toggleSelection(category.value)}
                        className="flex items-center justify-between [&>svg:last-of-type]:hidden"
                      >
                        <span className="truncate">{category.label}</span>
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

export default ComboboxMultipleCountBadgeDemo;
