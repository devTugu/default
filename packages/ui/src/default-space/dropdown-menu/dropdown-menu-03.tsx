// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
  AvatarGroupCount,
} from "@default/ui/primitives/avatar";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { Separator } from "@default/ui/primitives/separator";
import { Check, CheckCircle2, ChevronDown, X } from "lucide-react";
import { cn } from "@default/ui/lib/cn";

type User = {
  name: string;
  fallback: string;
  avatar: string;
  bgColor: string;
  role: string;
  time: string;
};

type Action = "approved" | "rejected";

const USERS: User[] = [
  {
    name: "Marcus Blake",
    fallback: "MB",
    avatar: "https://images.shadcnspace.com/assets/profiles/rough.webp",
    bgColor: "bg-primary",
    role: "Editor",
    time: "2m ago",
  },
  {
    name: "Daniel Park",
    fallback: "DP",
    avatar: "https://images.shadcnspace.com/assets/profiles/albert.webp",
    bgColor: "bg-destructive",
    role: "Viewer",
    time: "5m ago",
  },
  {
    name: "Sophia Carter",
    fallback: "SC",
    avatar: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
    bgColor: "bg-accent",
    role: "Editor",
    time: "12m ago",
  },
  {
    name: "Priya Nair",
    fallback: "PN",
    avatar: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
    bgColor: "bg-secondary",
    role: "Admin",
    time: "1h ago",
  },
];

const VISIBLE = 2;
const EXTRA = USERS.length - VISIBLE;
const PRIMARY_USER = "@marcusblake";

const SPRING = { type: "spring", bounce: 0.2, duration: 0.5 } as const;

const rowVariants = {
  visible: { opacity: 1, x: 0, y: 0 },
  exit: (action: Action) =>
    action === "approved"
      ? { x: 80, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }
      : { x: -80, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } },
};

type Props = {
  defaultOpen?: boolean;
};

const DropdownMenu03 = ({ defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);
  const [actions, setActions] = useState<Record<string, Action>>({});
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [showEmpty, setShowEmpty] = useState(false);
  const [listMinWidth, setListMinWidth] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const listAreaRef = useRef<HTMLDivElement>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure list area height when dropdown opens (all items visible)
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        if (listAreaRef.current) {
          setListMinWidth(listAreaRef.current.offsetWidth);
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setListMinWidth(undefined);
    }
  }, [open]);

  // Delay empty state until exit animations finish (350ms exit + buffer)
  useEffect(() => {
    if (!open) {
      setShowEmpty(false);
      return;
    }
    if (dismissed.length === USERS.length) {
      const timer = setTimeout(() => setShowEmpty(true), 400);
      return () => clearTimeout(timer);
    }
  }, [dismissed.length, open]);

  // Auto-close after empty state is shown, then reset
  useEffect(() => {
    if (showEmpty && open) {
      const closeTimer = setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setActions({});
          setDismissed([]);
          setShowEmpty(false);
        }, 500);
      }, 1000);
      return () => clearTimeout(closeTimer);
    }
  }, [showEmpty, open]);

  const handleAction = (name: string, action: Action) => {
    if (actions[name]) return;
    setActions((prev) => ({ ...prev, [name]: action }));
    setTimeout(() => setDismissed((prev) => [...prev, name]), 450);
  };

  const visibleUsers = USERS.filter((u) => !dismissed.includes(u.name));
  const allDone = visibleUsers.length === 0;

  const handleApproveAll = () => {
    visibleUsers.forEach((user, i) => {
      setTimeout(() => handleAction(user.name, "approved"), i * 120);
    });
  };

  const handleRejectAll = () => {
    visibleUsers.forEach((user, i) => {
      setTimeout(() => handleAction(user.name, "rejected"), i * 120);
    });
  };

  return (
    <div className="flex items-start justify-center w-full">
      <div ref={ref} className="w-full max-w-sm">
        <motion.div
          layout
          transition={SPRING}
          className={cn(
            "w-full bg-popover border border-border overflow-hidden",
            open ? "rounded-2xl" : "rounded-full"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {!open ? (
              /* ── Trigger ── */
              <motion.div
                key="trigger"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setOpen(true)}
                  className="flex items-center justify-between gap-3 px-3 py-2 h-auto rounded-full cursor-pointer w-full"
                >

                  <div className="flex items-center gap-2">
                    <AvatarGroup>
                      {USERS.slice(0, VISIBLE).map((user) => (
                        <motion.div
                          key={user.name}
                          layoutId={`avatar-${user.name}`}
                          transition={SPRING}
                        >
                          <Avatar className="ring-2 ring-background">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className={cn("text-xs", user.bgColor)}>
                              {user.fallback}
                            </AvatarFallback>
                          </Avatar>
                        </motion.div>
                      ))}
                      <AvatarGroupCount>+{EXTRA}</AvatarGroupCount>
                    </AvatarGroup>
                    <div className="flex flex-col text-left">
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">{PRIMARY_USER}</span>{" "}
                        <span className="text-muted-foreground">
                          and {USERS.length - 1} others
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">wants to collaborate</p>
                    </div>

                  </div>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </motion.div>
            ) : (
              /* ── Dropdown content ── */
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-2 px-4 sm:px-5 py-3">
                  <p className="text-base font-semibold text-popover-foreground truncate">
                    New Requests
                  </p>
                  <div className="flex items-center gap-1">
                    <AnimatePresence>
                      {!allDone && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="hidden sm:flex items-center gap-1"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleApproveAll}
                              className="text-xs text-teal-400 hover:text-teal-400 hover:bg-teal-400/10 cursor-pointer h-7 px-2"
                            >
                              Approve All
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleRejectAll}
                              className="text-xs text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer h-7 px-2"
                            >
                              Reject All
                            </Button>
                          </motion.div>
                          {/*  */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="sm:hidden flex items-center gap-2"
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleApproveAll}
                              className="rounded-full cursor-pointer size-6 border-teal-400 text-teal-400 hover:bg-teal-400/10 hover:text-teal-400"
                            >
                              <Check className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleRejectAll}
                              className="rounded-full cursor-pointer size-6 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <X className="size-4" />
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setOpen(false)}
                      className="size-7 cursor-pointer text-muted-foreground hover:text-foreground items-center"
                    >
                      <ChevronDown className="size-4 rotate-180" />
                    </Button>
                  </div>
                </div>
                <Separator />

                {/* List area — locked width prevents shrink on empty */}
                <div
                  ref={listAreaRef}
                  style={{ minWidth: showEmpty ? listMinWidth : undefined }}
                >

                  {/* Empty state */}
                  <AnimatePresence>
                    {showEmpty && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center py-8 px-5 gap-2"
                      >
                        <CheckCircle2 className="size-8 text-teal-400" />
                        <p className="text-sm font-medium text-popover-foreground">
                          All caught up!
                        </p>
                        <p className="text-xs text-muted-foreground">
                          No pending requests
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* User list */}
                  <AnimatePresence initial={false}>
                    {visibleUsers.map((user, index) => (
                      <motion.div
                        key={user.name}
                        layout
                        custom={actions[user.name]}
                        variants={rowVariants}
                        animate="visible"
                        exit="exit"
                        transition={SPRING}
                        className={cn(
                          "transition-colors duration-300",
                          actions[user.name] === "approved" && "bg-teal-400/10",
                          actions[user.name] === "rejected" && "bg-red-500/10"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5">
                          {/* Avatar + name + role + time */}
                          <div className="flex items-center gap-3 min-w-0">
                            <motion.div
                              layoutId={`avatar-${user.name}`}
                              transition={SPRING}
                            >
                              <Avatar className="size-9 shrink-0">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className={cn("text-xs", user.bgColor)}>
                                  {user.fallback}
                                </AvatarFallback>
                              </Avatar>
                            </motion.div>
                            <motion.div
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ ...SPRING, delay: index * 0.05 }}
                              className="flex flex-col min-w-0"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-popover-foreground truncate">
                                  {user.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs font-normal py-0 h-5 shrink-0"
                                >
                                  {user.role}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {user.time}
                              </span>
                            </motion.div>
                          </div>

                          {/* Approve / Reject — icon only on mobile, text on sm+ */}
                          <motion.div
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ ...SPRING, delay: index * 0.05 }}
                            className="flex items-center gap-2 shrink-0"
                          >
                            <motion.div whileTap={!actions[user.name] ? { scale: 0.94 } : {}}>
                              <Button
                                variant="outline"
                                size="icon"
                                disabled={!!actions[user.name]}
                                onClick={() => handleAction(user.name, "approved")}
                                className="rounded-full cursor-pointer size-8 border-teal-400 text-teal-400 hover:bg-teal-400/10 hover:text-teal-400"
                              >
                                <Check className="size-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileTap={!actions[user.name] ? { scale: 0.94 } : {}}>
                              <Button
                                variant="outline"
                                size="icon"
                                disabled={!!actions[user.name]}
                                onClick={() => handleAction(user.name, "rejected")}
                                className="rounded-full cursor-pointer size-8 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <X className="size-4" />
                              </Button>
                            </motion.div>
                          </motion.div>
                        </div>
                        {index < visibleUsers.length - 1 && <Separator />}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default DropdownMenu03;
