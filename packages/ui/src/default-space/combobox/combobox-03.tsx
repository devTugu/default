// @ts-nocheck
"use client";

import { useId, useState, useEffect } from "react";

import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";

import { Button } from "@default/ui/primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@default/ui/primitives/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@default/ui/primitives/popover";

import { cn } from "@default/ui/lib/cn";

const organizations = [
  {
    value: "vercel",
    label: "Vercel",
  },
  {
    value: "github",
    label: "GitHub",
  },
  {
    value: "openai",
    label: "OpenAI",
  },
  {
    value: "stripe",
    label: "Stripe",
  },
];

const ComboboxWithAddButtonDemo = () => {
  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("vercel");
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
              className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] cursor-pointer"
            >
              <span
                className={cn("truncate", !value && "text-muted-foreground")}
              >
                {value ? (
                  organizations.find((org) => org.value === value)?.label
                ) : (
                  <span className="text-muted-foreground">
                    Select organization
                  </span>
                )}
              </span>
              <ChevronsUpDownIcon
                className="text-muted-foreground/80 shrink-0 size-4 opacity-50"
                aria-hidden="true"
              />
            </Button>
          }
        />
        <PopoverContent className="border-input w-full p-0" align="start" initialFocus={false}>
          {mounted && (
            <Command>
              <CommandInput placeholder="Find organization..." />
              <CommandList>
                <CommandEmpty>No organization found.</CommandEmpty>
                <CommandGroup>
                  {organizations.map((org) => (
                    <CommandItem
                      key={org.value}
                      value={org.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className="[&>svg:last-of-type]:hidden"
                    >
                      {org.label}
                      {value === org.value && (
                        <CheckIcon
                          className="ml-auto size-4"
                          aria-hidden="true"
                        />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-normal cursor-pointer"
                  >
                    <PlusIcon className="-ms-2 opacity-60" aria-hidden="true" />
                    New organization
                  </Button>
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboboxWithAddButtonDemo;
