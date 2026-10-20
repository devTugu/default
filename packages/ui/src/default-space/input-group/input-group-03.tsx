// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@default/ui/primitives/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { Link2, Globe, Lock, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type Visibility = "public" | "private";

const InputGroupDemo = () => {
  const [link] = useState("https://shadcnspace.com/share/9x4k2p");
  const [visibility, setVisibility] = useState<Visibility>("private");
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      return;
    }
    setCopied(true);
    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    resetTimeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <InputGroup className="h-10 rounded-xl pl-1 pr-1">
        <InputGroupAddon align="inline-start" className="pl-3">
          <Link2 className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput readOnly value={link} className="pl-1" />
        <InputGroupAddon align="inline-end" className="gap-1 pr-1">
          <Select
            value={visibility}
            onValueChange={(value) => value && setVisibility(value as Visibility)}
          >
            <SelectTrigger
              size="sm"
              className="h-7 gap-1 rounded-md border-0 bg-transparent px-2 text-xs shadow-none focus-visible:ring-0 cursor-pointer"
            >
              {visibility === "public" ? (
                <Globe className="size-3.5" />
              ) : (
                <Lock className="size-3.5" />
              )}
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="public">
                <Globe className="size-3.5" /> Public
              </SelectItem>
              <SelectItem value="private">
                <Lock className="size-3.5" /> Private
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="h-4 w-px bg-border" />
          <InputGroupButton
            size="icon-sm"
            aria-label="Copy link"
            onClick={handleCopy}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                  transition={{ duration: 0.2, ease: "backOut" }}
                  className="flex items-center justify-center"
                >
                  <Check className="size-3.5 text-teal-400" />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Copy className="size-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p className="text-xs text-muted-foreground px-1">
        {visibility === "public"
          ? "Anyone with the link can view this."
          : "Only people you invite can view this."}
      </p>
    </div>
  );
};

export default InputGroupDemo;
