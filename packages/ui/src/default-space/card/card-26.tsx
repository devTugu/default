// @ts-nocheck
"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import {
  Bell,
  BellOff,
  Calendar,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { cn } from "@default/ui/lib/cn";

const MotionCard = motion.create(Card);

export interface NotificationItem {
  app: string;
  title: string;
  message: string;
  icon: LucideIcon;
  tone: "blue" | "teal" | "orange" | "red";
}

export interface NotificationStackCardProps {
  notifications?: NotificationItem[];
  interval?: number;
}

interface FeedEntry {
  id: number;
  item: number;
  arrivedAt: number;
  unread: boolean;
}

const defaultNotifications: NotificationItem[] = [
  {
    app: "Messages",
    title: "Priya Sharma",
    message: "Hey! Are we still on for the 3pm sync today?",
    icon: MessageCircle,
    tone: "blue",
  },
  {
    app: "Calendar",
    title: "Design Review",
    message: "Starts in 15 minutes · Room 4B",
    icon: Calendar,
    tone: "orange",
  },
  {
    app: "Security",
    title: "New sign-in detected",
    message: "Chrome on Windows · Mumbai, IN",
    icon: ShieldCheck,
    tone: "red",
  },
  {
    app: "Wallet",
    title: "Payment received",
    message: "You received $1,240.00 from Acme Inc.",
    icon: CreditCard,
    tone: "teal",
  },
  {
    app: "Reminders",
    title: "Renew domain",
    message: "shadcnspace.com expires in 3 days",
    icon: Bell,
    tone: "blue",
  },
];

const TONE_ICON: Record<NotificationItem["tone"], string> = {
  blue: "from-blue-500 to-sky-400",
  teal: "from-teal-400 to-sky-400",
  orange: "from-orange-400 to-amber-300",
  red: "from-red-500 to-orange-400",
};

const MAX_FEED = 4;
const PEEK_COUNT = 3;
const CARD_HEIGHT = 96; // h-24
const LIST_GAP = 8;
const PEEK_Y = 10;
const PEEK_SCALE = 0.05;
const DISMISS_OFFSET = 90;
const DISMISS_VELOCITY = 500;
const spring = { type: "spring", stiffness: 380, damping: 32 } as const;
const tween = { duration: 0.2, ease: "easeOut" } as const;

function timeAgo(from: number, now: number) {
  const seconds = Math.max(0, Math.round((now - from) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

interface NotificationCardProps {
  item: NotificationItem;
  entry: FeedEntry;
  position: number;
  expanded: boolean;
  reduce: boolean;
  now: number;
  onDismiss: () => void;
}

function NotificationCard({
  item,
  entry,
  position,
  expanded,
  reduce,
  now,
  onDismiss,
}: NotificationCardProps) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const dragOpacity = useTransform(x, [-160, 0, 160], [0, 1, 0]);

  const isFront = position === 0;
  const interactive = expanded || isFront;
  const hidden = !expanded && position >= PEEK_COUNT;
  const Icon = item.icon;

  const target = expanded
    ? { y: position * (CARD_HEIGHT + LIST_GAP), scale: 1 }
    : { y: position * PEEK_Y, scale: 1 - position * PEEK_SCALE };

  return (
    <MotionCard
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y: -CARD_HEIGHT / 2, scale: 0.92 }
      }
      animate={{ ...target, opacity: hidden ? 0 : 1 }}
      exit={
        exitX !== 0
          ? { x: exitX, opacity: 0, transition: { duration: 0.25 } }
          : {
              opacity: 0,
              scale: 0.9,
              transition: reduce ? tween : { duration: 0.2, delay: position * 0.04 },
            }
      }
      transition={reduce ? tween : spring}
      style={{ x, zIndex: MAX_FEED + 1 - position }}
      drag={interactive ? "x" : false}
      dragSnapToOrigin
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (
          Math.abs(info.offset.x) > DISMISS_OFFSET ||
          Math.abs(info.velocity.x) > DISMISS_VELOCITY
        ) {
          setExitX(info.offset.x < 0 ? -420 : 420);
          onDismiss();
        }
      }}
      inert={!interactive}
      className={cn(
        "absolute inset-x-0 top-0 h-24 origin-bottom gap-0 rounded-2xl p-0 will-change-transform",
        interactive
          ? "cursor-grab touch-pan-y active:cursor-grabbing"
          : "pointer-events-none",
      )}
    >
      <motion.div style={{ opacity: dragOpacity }} className="h-full">
        <motion.div
          animate={{ opacity: expanded || isFront ? 1 : 0 }}
          transition={tween}
          className="h-full"
        >
          <CardContent className="flex h-full items-center gap-3 p-4">
            <motion.div
              initial={reduce ? false : { scale: 0.4, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 18,
                delay: 0.1,
              }}
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white ring-1 ring-white/20 ring-inset",
                TONE_ICON[item.tone],
              )}
            >
              <Icon className="size-5" aria-hidden />
            </motion.div>

            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {item.app}
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
                  {timeAgo(entry.arrivedAt, now)}
                  {entry.unread && (
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full rounded-full bg-blue-500 opacity-60 motion-safe:animate-ping" />
                      <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
                      <span className="sr-only">Unread</span>
                    </span>
                  )}
                </span>
              </div>
              <p className="truncate text-sm font-semibold text-foreground">
                {item.title}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                {item.message}
              </p>
            </div>
          </CardContent>
        </motion.div>
      </motion.div>
    </MotionCard>
  );
}

export default function NotificationStackCardDemo({
  notifications = defaultNotifications,
  interval = 3500,
}: NotificationStackCardProps) {
  const reduce = useReducedMotion() ?? false;
  const count = notifications.length;

  const nextId = useRef(PEEK_COUNT);
  const cursor = useRef(PEEK_COUNT % Math.max(count, 1));

  const [now, setNow] = useState(() => Date.now());
  const [expanded, setExpanded] = useState(false);
  const [feed, setFeed] = useState<FeedEntry[]>(() => {
    const seededAt = Date.now();
    const agoSeconds = [0, 90, 240];
    return Array.from({ length: Math.min(PEEK_COUNT, count) }, (_, i) => ({
      id: i,
      item: PEEK_COUNT - 1 - i,
      arrivedAt: seededAt - agoSeconds[i] * 1000,
      unread: i < 2,
    }));
  });

  // New notifications keep arriving while the stack is collapsed.
  useEffect(() => {
    if (expanded || count === 0) return;
    const timer = setInterval(() => {
      const arrivedAt = Date.now();
      const entry: FeedEntry = {
        id: nextId.current++,
        item: cursor.current,
        arrivedAt,
        unread: true,
      };
      cursor.current = (cursor.current + 1) % count;
      setNow(arrivedAt);
      setFeed((current) => [entry, ...current].slice(0, MAX_FEED));
    }, interval);
    return () => clearInterval(timer);
  }, [expanded, count, interval]);

  if (count === 0) return null;

  const expand = () => {
    setExpanded(true);
    setNow(Date.now());
    setFeed((current) => current.map((entry) => ({ ...entry, unread: false })));
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setExpanded(false);
    }
  };

  const dismiss = (id: number) =>
    setFeed((current) => current.filter((entry) => entry.id !== id));

  const unreadCount = feed.filter((entry) => entry.unread).length;
  const peeking = Math.min(feed.length, PEEK_COUNT);
  const height = expanded
    ? Math.max(1, feed.length) * (CARD_HEIGHT + LIST_GAP) - LIST_GAP
    : CARD_HEIGHT + Math.max(0, peeking - 1) * PEEK_Y;

  return (
    <div className="flex w-full items-start justify-center p-8">
      <div className="flex w-full max-w-sm flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">
              Notifications
            </p>
            <Badge className="tabular-nums">
              {unreadCount > 0 ? `${unreadCount} new` : `${feed.length} total`}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFeed([])}
            disabled={feed.length === 0}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>

        <motion.div
          role="region"
          aria-label="Notifications"
          tabIndex={0}
          onClick={expand}
          onMouseEnter={expand}
          onMouseLeave={() => setExpanded(false)}
          onFocus={expand}
          onBlur={handleBlur}
          initial={false}
          animate={{ height }}
          transition={reduce ? tween : spring}
          className="relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <AnimatePresence initial={false}>
            {feed.map((entry, position) => (
              <NotificationCard
                key={entry.id}
                item={notifications[entry.item]}
                entry={entry}
                position={position}
                expanded={expanded}
                reduce={reduce}
                now={now}
                onDismiss={() => dismiss(entry.id)}
              />
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {feed.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={tween}
                className="absolute inset-0 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border text-sm text-muted-foreground"
              >
                <BellOff className="size-4" aria-hidden />
                You&apos;re all caught up
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
