// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@default/ui/primitives/input-group";
import { SendHorizontal, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@default/ui/lib/cn";

const MAX_LENGTH = 280;
const RADIUS = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type Status = "idle" | "sending" | "sent";

const InputGroupDemo = () => {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const sendTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const progress = Math.min(value.length / MAX_LENGTH, 1);
  const isNearLimit = value.length >= MAX_LENGTH * 0.9 && value.length < MAX_LENGTH;
  const isOverLimit = value.length >= MAX_LENGTH;
  const isSendDisabled = !value.trim() || isOverLimit || status !== "idle";
  const isDimmed = (!value.trim() || isOverLimit) && status === "idle";

  const handleSend = () => {
    if (!value.trim() || status !== "idle") return;
    setStatus("sending");
    sendTimeoutRef.current = setTimeout(() => {
      setStatus("sent");
      setValue("");
      resetTimeoutRef.current = setTimeout(() => setStatus("idle"), 1400);
    }, 900);
  };

  useEffect(() => {
    return () => {
      if (sendTimeoutRef.current) clearTimeout(sendTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <InputGroup className="flex-col items-stretch rounded-2xl p-0">
        <InputGroupTextarea
          placeholder="Write your message..."
          value={value}
          maxLength={MAX_LENGTH}
          disabled={status !== "idle"}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="min-h-24 max-h-56 resize-none overflow-y-auto px-3.5 pt-3.5"
        />
        <InputGroupAddon
          align="block-end"
          className="w-full justify-between border-t border-border px-3 py-2"
        >
          <InputGroupText className="gap-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="-rotate-90"
            >
              <circle
                cx="10"
                cy="10"
                r={RADIUS}
                strokeWidth="2"
                className="fill-none stroke-border"
              />
              <motion.circle
                cx="10"
                cy="10"
                r={RADIUS}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                className={cn(
                  "fill-none",
                  isOverLimit
                    ? "stroke-destructive"
                    : isNearLimit
                      ? "stroke-amber-300"
                      : "stroke-primary",
                )}
                animate={{ strokeDashoffset: CIRCUMFERENCE - progress * CIRCUMFERENCE }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </svg>
            <span
              className={cn(
                "text-xs tabular-nums",
                isOverLimit
                  ? "text-destructive"
                  : isNearLimit
                    ? "text-amber-300"
                    : "text-muted-foreground",
              )}
            >
              {value.length}/{MAX_LENGTH}
            </span>
          </InputGroupText>

          <InputGroupButton
            size="sm"
            disabled={isSendDisabled}
            onClick={handleSend}
            className={cn(
              "gap-1.5 rounded-full px-3.5 transition-colors cursor-pointer disabled:opacity-100",
              isDimmed && "opacity-50",
              status === "sent"
                ? "bg-teal-400 text-white hover:bg-teal-400"
                : "bg-primary text-primary-foreground hover:bg-primary/80! hover:text-primary-foreground!",
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "idle" && (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <SendHorizontal className="size-3.5" />
                  Send
                </motion.span>
              )}
              {status === "sending" && (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5"
                >
                  <Loader2 className="size-3.5 animate-spin" />
                  Sending
                </motion.span>
              )}
              {status === "sent" && (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                  className="flex items-center gap-1.5"
                >
                  <Check className="size-3.5" />
                  Sent
                </motion.span>
              )}
            </AnimatePresence>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default InputGroupDemo;