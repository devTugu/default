// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ScrollArea } from "@default/ui/primitives/scroll-area";
import {
  Bell,
  MessageSquare,
  UserPlus,
  Heart,
  GitPullRequest,
} from "lucide-react";

type NotifType = "message" | "follow" | "like" | "pr" | "alert";

interface Notif {
  id: number;
  type: NotifType;
  text: string;
  time: string;
  unread: boolean;
}

const iconMap: Record<
  NotifType,
  { icon: React.ComponentType<{ className?: string }>; className: string }
> = {
  message: { icon: MessageSquare, className: "bg-blue-500/15 text-blue-500" },
  follow: { icon: UserPlus, className: "bg-teal-400/15 text-teal-400" },
  like: { icon: Heart, className: "bg-orange-400/15 text-orange-400" },
  pr: { icon: GitPullRequest, className: "bg-sky-400/15 text-sky-400" },
  alert: { icon: Bell, className: "bg-amber-300/15 text-amber-300" },
};

const notifications: Notif[] = [
  {
    id: 1,
    type: "message",
    text: "Sarah C. sent you a message",
    time: "Just now",
    unread: true,
  },
  {
    id: 2,
    type: "pr",
    text: "Alex M. requested your review on PR #482",
    time: "5m ago",
    unread: true,
  },
  {
    id: 3,
    type: "like",
    text: "James W. liked your comment",
    time: "20m ago",
    unread: true,
  },
  {
    id: 4,
    type: "follow",
    text: "Emma D. started following you",
    time: "1h ago",
    unread: false,
  },
  {
    id: 5,
    type: "alert",
    text: "Deploy to production succeeded",
    time: "2h ago",
    unread: false,
  },
  {
    id: 6,
    type: "message",
    text: "Ken M. mentioned you in #general",
    time: "3h ago",
    unread: false,
  },
  {
    id: 7,
    type: "pr",
    text: "Your PR #479 was merged",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 8,
    type: "like",
    text: "Linda M. liked your post",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 9,
    type: "follow",
    text: "Davis B. started following you",
    time: "2 days ago",
    unread: false,
  },
];

export default function AnimatedNotificationFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  useEffect(() => {
    const viewport = containerRef.current?.querySelector<HTMLDivElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    if (!viewport) return;
    const onScroll = () => {
      const max = viewport.scrollHeight - viewport.clientHeight;
      rawProgress.set(max > 0 ? viewport.scrollTop / max : 0);
    };
    viewport.addEventListener("scroll", onScroll);
    return () => viewport.removeEventListener("scroll", onScroll);
  }, [rawProgress]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-sm overflow-hidden rounded-xl border"
    >
      <div className="relative border-b px-4 py-3">
        <p className="text-sm font-medium">Notifications</p>
        <p className="text-muted-foreground text-xs">3 unread</p>
        <motion.div
          className="bg-primary absolute inset-x-0 bottom-0 h-0.5 origin-left"
          style={{ scaleX: progress }}
        />
      </div>

      <ScrollArea className="h-80">
        <div className="flex flex-col p-2">
          {notifications.map(({ id, type, text, time, unread }, i) => {
            const { icon: Icon, className } = iconMap[type];
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
                whileHover={{ x: 4 }}
                className="hover:bg-muted flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${className}`}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground text-sm leading-snug">{text}</p>
                  <p className="text-muted-foreground text-xs">{time}</p>
                </div>
                {unread && (
                  <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
                )}
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
