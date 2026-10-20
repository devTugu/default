// @ts-nocheck
"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  memo,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@default/ui/primitives/tabs";
import { cn } from "@default/ui/lib/cn";
import { InputGroup, InputGroupInput } from "@default/ui/primitives/input-group";
import { Button } from "@default/ui/primitives/button";
import { Switch } from "@default/ui/primitives/switch";
import { MessageGroup, Message, MessageContent } from "@default/ui/primitives/message";
import { Bubble, BubbleContent } from "@default/ui/primitives/bubble";
import { Marker, MarkerContent } from "@default/ui/primitives/marker";
import {
  MessageCircle,
  AudioLines,
  ArrowUp,
  CircleStop,
  Loader2,
  Mic,
  Video,
  Settings,
  Lock,
  Bell,
  Globe,
} from "lucide-react";

const ANSWER = `It's a collection of ready-made shadcn/ui components and templates you can copy into your React or Next.js project.`;
const ANSWER_WORDS = ANSWER.split(" ");

const WAVE_BARS = [
  12, 8, 4, 20, 8, 20, 8, 8, 12, 8, 24, 8, 20, 28, 20, 32, 24, 8, 12, 8, 8, 20,
  8, 20, 8, 8, 12, 20, 12, 20, 28, 8, 28, 12, 20, 20, 12, 8, 4, 20, 8, 20, 8, 8,
  12, 12, 8, 4, 20, 8, 20, 8, 8, 12, 8, 24, 8, 28, 32, 24, 8, 12, 8, 8, 20, 8,
  20, 8, 12, 20, 12, 20, 28, 8, 28, 12, 20, 20, 12, 4, 20, 8, 20, 8, 8, 12,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

const waveBarVariants = {
  recording: (index: number) => ({
    scaleY: [0.55, 1, 0.55],
    transition: {
      duration: 1.1,
      repeat: Infinity,
      ease: "easeInOut",
      delay: index * 0.015,
    },
  }),
  idle: {
    scaleY: 0.3,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

type ChatStatus = "idle" | "thinking" | "answered";

interface ChatInputProps {
  onSend: (value: string) => void;
  disabled: boolean;
}

const ChatInput = memo(({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("What is default?");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <InputGroup className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 h-auto shadow-xs">
      <InputGroupInput
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="How can I help you today?"
        className="w-full bg-transparent dark:bg-transparent border-0 h-auto p-0 shadow-none outline-none focus-visible:ring-0 text-xs text-foreground placeholder:text-muted-foreground disabled:opacity-60 focus-visible:border-0"
      />
      <Button
        type="button"
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        size="icon-xs"
        className="rounded-full size-5 p-0 hover:bg-primary/80 cursor-pointer"
        aria-label="Send message"
      >
        {disabled ? (
          <Loader2 className="size-3 animate-spin text-primary-foreground" />
        ) : (
          <ArrowUp className="size-3 text-primary-foreground" />
        )}
      </Button>
    </InputGroup>
  );
});

ChatInput.displayName = "ChatInput";

function ChatPanel() {
  const [sentQuestion, setSentQuestion] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSend = (question: string) => {
    if (status === "thinking") return;

    setSentQuestion(question);
    setStatus("thinking");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setStatus("answered"),
      2200 + Math.random() * 600,
    );
  };

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex w-full flex-col gap-8 p-5"
    >
      <MessageGroup className="flex min-h-28 w-full flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          {sentQuestion && (
            <motion.div
              key={sentQuestion}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex w-full"
            >
              <Message align="end">
                <MessageContent>
                  <Bubble variant="muted" className="rounded-full">
                    <BubbleContent className="text-sm text-foreground px-3 py-1.5 rounded-full">
                      {sentQuestion}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full px-4">
          <AnimatePresence mode="wait">
            {status === "thinking" && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-1.5"
              >
                <Marker className="flex items-center gap-2">
                  <Loader2 className="size-3 animate-spin text-muted-foreground" />
                  <MarkerContent>
                    <motion.span
                      className="bg-clip-text text-sm font-medium text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, var(--muted-foreground) 40%, var(--foreground) 50%, var(--muted-foreground) 60%)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                      }}
                      animate={{ backgroundPosition: ["150% 0", "-50% 0"] }}
                      transition={{
                        duration: 1.3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Thinking...
                    </motion.span>
                  </MarkerContent>
                </Marker>
              </motion.div>
            )}
            {status === "answered" && (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Message align="start">
                  <MessageContent>
                    <Bubble variant="ghost" className="max-w-full">
                      <BubbleContent className="text-sm leading-5 text-foreground p-0">
                        <motion.span
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="inline"
                        >
                          {ANSWER_WORDS.map((word, index) => (
                            <Fragment key={index}>
                              <motion.span
                                variants={wordVariants}
                                className="inline-block"
                              >
                                {word}
                              </motion.span>{" "}
                            </Fragment>
                          ))}
                        </motion.span>
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MessageGroup>

      <ChatInput onSend={handleSend} disabled={status === "thinking"} />
    </motion.div>
  );
}

function VoicePanel() {
  const [recording, setRecording] = useState(true);

  return (
    <motion.div
      key="voice"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full p-5 flex flex-col items-center gap-3"
    >
      <div className="flex h-10 w-full items-center justify-center rounded-lg bg-muted px-3">
        <div className="flex items-center justify-center gap-px w-full overflow-hidden">
          {WAVE_BARS.map((height, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={waveBarVariants}
              animate={recording ? "recording" : "idle"}
              className="w-0.5 shrink-0 rounded-full bg-muted-foreground/80"
              style={{
                height,
                originY: 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <Button
        type="button"
        onClick={() => setRecording((prev) => !prev)}
        size="sm"
        className="rounded-full h-7 px-3 text-xs gap-1.5 flex items-center justify-center hover:bg-primary/80 cursor-pointer"
        aria-label={recording ? "Stop voice input" : "Start voice input"}
      >
        {recording ? (
          <CircleStop className="size-3 text-primary-foreground" />
        ) : (
          <Mic className="size-3 text-primary-foreground" />
        )}
        <span>{recording ? "Stop" : "Start"}</span>
      </Button>
    </motion.div>
  );
}

function VideoPanel() {
  const [active, setActive] = useState(true);

  return (
    <motion.div
      key="video"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full p-5 flex flex-col items-center gap-3"
    >
      <div className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-muted px-3">
        <Video
          className={cn(
            "size-3.5",
            active ? "text-primary animate-pulse" : "text-muted-foreground/60",
          )}
        />
        <span className="text-xs text-muted-foreground font-medium">
          {active ? "Video feed active" : "Camera off"}
        </span>
      </div>

      <Button
        type="button"
        onClick={() => setActive((prev) => !prev)}
        size="sm"
        className="rounded-full h-7 px-3 text-xs gap-1.5 flex items-center justify-center hover:bg-primary/80 cursor-pointer"
        aria-label={active ? "Stop video feed" : "Start video feed"}
      >
        {active ? (
          <CircleStop className="size-3 text-primary-foreground" />
        ) : (
          <Video className="size-3 text-primary-foreground" />
        )}
        <span>{active ? "Stop" : "Start"}</span>
      </Button>
    </motion.div>
  );
}

function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [developerMode, setDeveloperMode] = useState(false);

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Notifications
          </span>
        </div>
        <Switch
          size="sm"
          checked={notifications}
          onCheckedChange={setNotifications}
          className="cursor-pointer"
        />
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            Secure Mode
          </span>
        </div>
        <Switch
          size="sm"
          checked={developerMode}
          onCheckedChange={setDeveloperMode}
          className="cursor-pointer"
        />
      </div>

      <div className="h-px bg-border" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="size-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">Language</span>
        </div>
        <span className="text-[10px] font-medium text-muted-foreground">
          English
        </span>
      </div>
    </motion.div>
  );
}

const TABS_CONFIG = [
  { value: "chat", label: "Chat", icon: MessageCircle },
  { value: "voice", label: "Voice", icon: AudioLines },
  { value: "video", label: "Video", icon: Video },
  { value: "settings", label: "Settings", icon: Settings },
];

const TabsDemo = () => {
  const [tab, setTab] = useState("chat");

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full max-w-92 flex flex-col items-center gap-8"
      >
        <TabsList className="h-auto! gap-1 rounded-full bg-muted p-1 flex w-full items-center justify-between">
          {TABS_CONFIG.map(({ value: itemValue, label, icon: Icon }) => {
            const isActive = tab === itemValue;
            return (
              <TabsTrigger
                key={itemValue}
                value={itemValue}
                className={cn(
                  "rounded-full border-none py-1.5 text-sm font-medium text-muted-foreground dark:data-active:bg-background data-active:bg-background data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-xs cursor-pointer transition-all duration-300 flex items-center justify-center flex-1",
                  isActive ? "px-4" : "px-3",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                      animate={{ width: "auto", opacity: 1, marginLeft: 6 }}
                      exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-nowrap text-sm font-medium inline-block"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="relative w-full overflow-hidden">
          <TabsContent
            value={tab}
            className="border border-border bg-card rounded-2xl shadow-xs outline-none p-0 mt-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              {tab === "chat" && <ChatPanel key="chat" />}
              {tab === "voice" && <VoicePanel key="voice" />}
              {tab === "video" && <VideoPanel key="video" />}
              {tab === "settings" && <SettingsPanel key="settings" />}
            </AnimatePresence>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabsDemo;
