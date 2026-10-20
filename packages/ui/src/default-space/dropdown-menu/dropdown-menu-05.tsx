// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@default/ui/primitives/avatar";
import { Input } from "@default/ui/primitives/input";
import { cn } from "@default/ui/lib/cn";

type Member = {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatar: string;
};

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Ben Thompson",
    email: "ben.thompson@company.com",
    initials: "BT",
    avatar: "https://images.shadcnspace.com/assets/profiles/ben.webp",
  },
  {
    id: "2",
    name: "Daniel Park",
    email: "daniel.park@company.com",
    initials: "DP",
    avatar: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    id: "3",
    name: "Sophia Carter",
    email: "sophia.carter@company.com",
    initials: "SC",
    avatar: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
  },
  {
    id: "4",
    name: "Priya Nair",
    email: "priya.nair@company.com",
    initials: "PN",
    avatar: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  },
  {
    id: "5",
    name: "Linda Moore",
    email: "linda.moore@company.com",
    initials: "LM",
    avatar: "https://images.shadcnspace.com/assets/profiles/linda.webp",
  },
];

const INITIAL_SELECTED = ["1", "2", "3"];

const SPRING = { type: "spring", bounce: 0.15, duration: 0.4 } as const;

type Props = {
  defaultOpen?: boolean;
};

const DropdownMenu05 = ({ defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState<string[]>(INITIAL_SELECTED);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

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
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 150);
      return () => clearTimeout(t);
    } else {
      setSearch("");
    }
  }, [open]);

  const toggleMember = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // Selected members first, unselected last — drives slide animation
  const orderedMembers = [
    ...MEMBERS.filter((m) => selected.includes(m.id)),
    ...MEMBERS.filter((m) => !selected.includes(m.id)),
  ];

  const filteredMembers = MEMBERS.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-[450px] items-start justify-center px-4 py-8 w-full">
      <div ref={containerRef} className="relative w-fit mx-auto">
        {/* Label */}
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-5">
          Team
        </p>

        {/* Avatar row */}
        <motion.div layout className="flex items-start gap-3 sm:gap-4 flex-wrap">
          {orderedMembers.map((member) => {
            const isSelected = selected.includes(member.id);
            return (
              <motion.div
                key={member.id}
                layout
                transition={SPRING}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="relative cursor-pointer group"
                  onClick={() => toggleMember(member.id)}
                >
                  <Avatar
                    className={cn(
                      "size-12 sm:size-14 transition-all duration-300",
                      isSelected
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "grayscale opacity-60 ring-2 ring-background"
                    )}
                  >
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-sm font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>

                  {/* Hover overlay: X for active, brighten for inactive */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                      isSelected ? "bg-black/30" : "bg-white/20"
                    )}
                  >
                    {isSelected && <X className="size-4 text-white" strokeWidth={2.5} />}
                  </div>

                  {/* Plus badge for inactive — visual only */}
                  <AnimatePresence>
                    {!isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
                        className="absolute -bottom-1 -right-1 size-5 bg-blue-500 rounded-full flex items-center justify-center shadow-sm pointer-events-none"
                      >
                        <Plus className="size-3 text-white" strokeWidth={2.5} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <span
                  className={cn(
                    "text-xs font-medium transition-colors duration-300",
                    isSelected ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {member.name.split(" ")[0]}
                </span>
              </motion.div>
            );
          })}

          {/* Add button + Dropdown anchored below it */}
          <motion.div layout transition={SPRING} className="static lg:relative flex flex-col items-center gap-2">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className={cn("size-12 sm:size-14 rounded-full border-2 border-dashed border-border hover:border-muted-foreground flex items-center justify-center transition-colors cursor-pointer", open && "border-primary")}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className={cn("size-4 text-primary")} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="plus"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Plus className={cn("size-4 text-muted-foreground")} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <span className="text-xs text-muted-foreground">Add</span>

            {/* Dropdown panel — centered on section on mobile, anchored to button on lg (1024px+) */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97, x: "-50%" }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                  exit={{ opacity: 0, y: -8, scale: 0.97, x: "-50%" }}
                  transition={SPRING}
                  layout
                  className="absolute top-full mt-3 left-1/2 z-50 w-[calc(100vw-72px)] sm:w-72 lg:w-80 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Search */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...SPRING, delay: 0.05 }}
                    className="flex items-center gap-2 px-4 py-3 border-b border-border"
                  >
                    <Search className="size-4 text-muted-foreground shrink-0" />
                    <Input
                      ref={searchRef}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search members..."
                      className="h-8 border-0 shadow-none bg-transparent dark:bg-transparent focus-visible:ring-0 px-0 text-sm placeholder:text-muted-foreground"
                    />
                  </motion.div>

                  {/* Member list */}
                  <div className="max-h-60 overflow-y-auto py-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member, index) => {
                        const isSelected = selected.includes(member.id);
                        return (
                          <motion.button
                            key={member.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...SPRING, delay: 0.08 + index * 0.06 }}
                            onClick={() => toggleMember(member.id)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent transition-colors cursor-pointer"
                          >
                            <Avatar
                              className={cn(
                                "size-9 shrink-0 transition-all duration-300",
                                !isSelected && "grayscale opacity-60"
                              )}
                            >
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-xs font-semibold">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 text-left min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {member.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {member.email}
                              </p>
                            </div>

                            <div
                              className={cn(
                                "size-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200",
                                isSelected
                                  ? "bg-foreground border-foreground"
                                  : "border-muted-foreground/40"
                              )}
                            >
                              {isSelected && (
                                <Check className="size-3 text-background" strokeWidth={3} />
                              )}
                            </div>
                          </motion.button>
                        );
                      })
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-6 px-4">
                        No members found
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default DropdownMenu05;
