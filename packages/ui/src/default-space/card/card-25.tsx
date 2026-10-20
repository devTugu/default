// @ts-nocheck
"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { Heart, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Badge } from "@default/ui/primitives/badge";
import { Button } from "@default/ui/primitives/button";
import { cn } from "@default/ui/lib/cn";

const MotionCard = motion.create(Card);

export interface Track {
  title: string;
  artist: string;
  genre: string;
  duration: string;
  progress: number;
  gradient: string;
  src?: string;
}

export interface ProductStackCardProps {
  tracks?: Track[];
  interval?: number;
}

const AUDIO_BASE = "https://images.shadcnspace.com/assets/audio";

const defaultTracks: Track[] = [
  {
    title: "Midnight Drive",
    artist: "Nova Collective",
    genre: "Ambient",
    duration: "0:09",
    progress: 0,
    gradient: "from-blue-500 to-sky-400",
    src: `${AUDIO_BASE}/hero-42-audio-01.mp3`,
  },
  {
    title: "Golden Hour",
    artist: "Ember Lane",
    genre: "Cinematic",
    duration: "0:10",
    progress: 0,
    gradient: "from-amber-300 to-orange-400",
    src: `${AUDIO_BASE}/hero-42-audio-02.mp3`,
  },
  {
    title: "Glass Horizon",
    artist: "Wade Tempo",
    genre: "Acoustic",
    duration: "0:18",
    progress: 0,
    gradient: "from-sky-400 to-teal-400",
    src: `${AUDIO_BASE}/hero-42-audio-03.mp3`,
  },
  {
    title: "Static Bloom",
    artist: "Reyna Cross",
    genre: "Ambient",
    duration: "0:09",
    progress: 0,
    gradient: "from-teal-400 to-blue-500",
    src: `${AUDIO_BASE}/hero-42-audio-01.mp3`,
  },
  {
    title: "Paper Moon",
    artist: "Silas Grey",
    genre: "Cinematic",
    duration: "0:10",
    progress: 0,
    gradient: "from-orange-400 to-red-500",
    src: `${AUDIO_BASE}/hero-42-audio-02.mp3`,
  },
];

const DISC_RINGS = ["inset-2", "inset-4", "inset-6", "inset-8"];
const STACK_Y = 15;
const STACK_SCALE = 0.06;
const FLY_X = 360;
const FLY_ROTATE = 14;
const DRAG_SENSITIVITY = 280;
const DISTANCE_DIVISOR = 120;
const VELOCITY_DIVISOR = 600;
const settleSpring = {
  type: "spring",
  stiffness: 200,
  damping: 30,
  mass: 1,
} as const;
const reducedTween = { duration: 0.25, ease: "easeOut" } as const;

function wrap(value: number, total: number) {
  return ((value % total) + total) % total;
}

function loadTrack(
  audio: HTMLAudioElement,
  loadedIndex: RefObject<number | null>,
  index: number,
  src: string,
) {
  if (loadedIndex.current === index) return;
  loadedIndex.current = index;
  audio.src = src;
  audio.currentTime = 0;
}

function toSeconds(duration: string) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}

function formatTime(value: number) {
  const total = Math.max(0, Math.floor(value));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function EqualizerBars({ active }: { active: boolean }) {
  return (
    <div className="flex h-3 items-end gap-0.5" aria-hidden>
      {[0, 1, 2, 3].map((bar) => (
        <motion.span
          key={bar}
          className="w-0.5 rounded-full bg-white"
          animate={
            active
              ? { height: ["30%", "100%", "50%", "80%", "30%"] }
              : { height: "30%" }
          }
          transition={
            active
              ? {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: bar * 0.12,
                }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

interface StackCardProps {
  track: Track;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isFront: boolean;
  reduce: boolean;
  isPlaying: boolean;
  playhead: { current: number; duration: number | null };
  liked: boolean;
  onToggleLike: () => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function StackCard({
  track,
  index,
  total,
  progress,
  isFront,
  reduce,
  isPlaying,
  playhead,
  liked,
  onToggleLike,
  onTogglePlay,
  onPrev,
  onNext,
}: StackCardProps) {
  // Signed distance from the front slot: < 0 flies off, > 0 sits behind.
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  });

  const x = useTransform(offset, (o) => (o < 0 ? o * FLY_X : 0));
  const rotate = useTransform(offset, (o) => (o < 0 ? o * FLY_ROTATE : 0));
  const y = useTransform(offset, (o) => (o > 0 ? -o * STACK_Y : 0));
  const scale = useTransform(offset, (o) => (o > 0 ? 1 - o * STACK_SCALE : 1));
  const opacity = useTransform(offset, [-1, 0, 2, 2.5], [0, 1, 1, 0]);
  const zIndex = useTransform(offset, (o) =>
    o <= 0 ? 100 : Math.round(90 - o * 10),
  );
  const scrim = useTransform(offset, [0, 1, 2], [0, 0.35, 0.6]);

  const spinning = isFront && isPlaying;
  const ambient = spinning && !reduce;

  const duration = (isFront && playhead.duration) || toSeconds(track.duration);
  const start = (track.progress / 100) * duration;
  const current = isFront ? Math.min(duration, playhead.current) : start;
  const percent = (current / duration) * 100;

  return (
    <MotionCard
      style={{ x, y, rotate, scale, opacity, zIndex }}
      inert={!isFront}
      className={cn(
        "col-start-1 row-start-1 origin-top gap-0 rounded-3xl bg-card p-2 will-change-transform",
        !isFront && "pointer-events-none",
      )}
    >
      <div
        className={cn(
          "relative flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br",
          track.gradient,
        )}
      >
        <motion.span
          aria-hidden
          className="absolute -top-10 -left-8 size-32 rounded-full bg-white/35 blur-2xl"
          animate={ambient ? { x: [0, 28, 0], y: [0, 18, 0] } : { x: 0, y: 0 }}
          transition={
            ambient
              ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
        />
        <motion.span
          aria-hidden
          className="absolute -right-6 -bottom-12 size-36 rounded-full bg-black/25 blur-2xl"
          animate={
            ambient ? { x: [0, -24, 0], y: [0, -14, 0] } : { x: 0, y: 0 }
          }
          transition={
            ambient
              ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.6 }
          }
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-white/10"
        />

        <div aria-hidden className="relative size-32">
          <div
            className="absolute inset-0 rounded-full bg-black/85 ring-1 ring-white/10 motion-safe:animate-spin"
            style={{
              animationDuration: "6s",
              animationPlayState: spinning ? "running" : "paused",
            }}
          >
            {DISC_RINGS.map((inset) => (
              <span
                key={inset}
                className={cn(
                  "absolute rounded-full border border-white/10",
                  inset,
                )}
              />
            ))}
            <span className="absolute top-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-white/60" />
            <div
              className={cn(
                "absolute inset-10 rounded-full bg-linear-to-br ring-2 ring-black/40",
                track.gradient,
              )}
            >
              <span className="absolute top-1/2 left-1/2 size-1.5 -translate-1/2 rounded-full bg-black/85" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-transparent via-white/15 to-transparent" />
        </div>

        <Badge className="absolute top-3 left-3 border-0 bg-white/20 text-white backdrop-blur-md">
          {track.genre}
        </Badge>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/25 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md">
          {isFront && <EqualizerBars active={ambient} />}
          {isFront ? (isPlaying ? "Playing" : "Paused") : "Up next"}
        </div>
      </div>

      <CardContent className="flex flex-col gap-4 px-2 pt-4 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-base font-semibold tracking-tight text-foreground">
              {track.title}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {track.artist}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-lg"
            className="shrink-0 cursor-pointer rounded-full"
            aria-label={
              liked
                ? `Remove ${track.title} from favorites`
                : `Add ${track.title} to favorites`
            }
            aria-pressed={liked}
            onClick={onToggleLike}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <motion.span
              className="flex"
              animate={
                liked && !reduce ? { scale: [1, 1.35, 1] } : { scale: 1 }
              }
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  liked && "fill-destructive text-destructive",
                )}
              />
            </motion.span>
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-foreground transition-[width] duration-300 ease-linear motion-reduce:transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground tabular-nums">
            <span>{formatTime(current)}</span>
            <span>-{formatTime(duration - current)}</span>
          </div>
        </div>

        <div
          className="flex items-center justify-center gap-4"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon-lg"
            className="cursor-pointer rounded-full"
            aria-label="Previous track"
            onClick={onPrev}
          >
            <SkipBack className="size-4 fill-current" />
          </Button>
          <Button
            size="icon-lg"
            className="size-12 cursor-pointer rounded-full"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={onTogglePlay}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={isPlaying ? "pause" : "play"}
                className="flex"
                initial={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isPlaying ? (
                  <Pause className="size-5 fill-current" />
                ) : (
                  <Play className="size-5 translate-x-px fill-current" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            className="cursor-pointer rounded-full"
            aria-label="Next track"
            onClick={onNext}
          >
            <SkipForward className="size-4 fill-current" />
          </Button>
        </div>
      </CardContent>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-background"
        style={{ opacity: scrim }}
      />
    </MotionCard>
  );
}

export default function ProductStackCardDemo({
  tracks = defaultTracks,
  interval = 5000,
}: ProductStackCardProps) {
  const reduce = useReducedMotion() ?? false;
  const progress = useMotionValue(0);
  const startProgress = useRef(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const loadedIndex = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(() => new Set([1]));

  const count = tracks.length;
  const activeSrc = tracks[activeIndex]?.src;

  useMotionValueEvent(progress, "change", (value) => {
    const next = wrap(Math.round(value), count);
    if (next !== activeIndex) {
      setActiveIndex(next);
      setElapsed(0);
      setAudioTime(0);
      setAudioDuration(null);
    }
  });

  // Swap the song once the stack settles on a new card, not mid-swipe.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isPlaying || !activeSrc) {
      audio.pause();
      return;
    }
    if (isPanning) return;
    const timer = setTimeout(() => {
      loadTrack(audio, loadedIndex, activeIndex, activeSrc);
      audio.play().catch(() => setIsPlaying(false));
    }, 150);
    return () => clearTimeout(timer);
  }, [activeIndex, activeSrc, isPlaying, isPanning]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    // Start playback inside the click so browsers allow the audio.
    if (audio && activeSrc) {
      loadTrack(audio, loadedIndex, activeIndex, activeSrc);
      audio.play().catch(() => setIsPlaying(false));
    }
  };

  const settleTo = (target: number) => {
    controls.current?.stop();
    controls.current = animate(
      progress,
      target,
      reduce ? reducedTween : settleSpring,
    );
  };

  const step = (direction: 1 | -1) =>
    settleTo(Math.round(progress.get()) + direction);

  // Tracks without audio fall back to a timed rotation.
  useEffect(() => {
    if (activeSrc || !isPlaying || isHovered || isPanning || count < 2) return;
    const timer = setTimeout(() => {
      controls.current?.stop();
      controls.current = animate(
        progress,
        Math.round(progress.get()) + 1,
        reduce ? reducedTween : settleSpring,
      );
    }, interval);
    return () => clearTimeout(timer);
  }, [
    activeIndex,
    activeSrc,
    isPlaying,
    isHovered,
    isPanning,
    count,
    interval,
    progress,
    reduce,
  ]);

  useEffect(() => {
    if (activeSrc || !isPlaying) return;
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [activeSrc, isPlaying]);

  if (count === 0) return null;

  const handlePanStart = () => {
    controls.current?.stop();
    startProgress.current = progress.get();
    setIsPanning(true);
  };

  const handlePan = (_: PointerEvent, info: PanInfo) => {
    progress.set(progress.get() - info.delta.x / DRAG_SENSITIVITY);
  };

  const handlePanEnd = (_: PointerEvent, info: PanInfo) => {
    setIsPanning(false);
    const shift = Math.round(
      -info.offset.x / DISTANCE_DIVISOR - info.velocity.x / VELOCITY_DIVISOR,
    );
    settleTo(
      Math.round(startProgress.current) + Math.max(-2, Math.min(2, shift)),
    );
  };

  const toggleLike = (trackIndex: number) => {
    setLiked((current) => {
      const nextSet = new Set(current);
      if (nextSet.has(trackIndex)) nextSet.delete(trackIndex);
      else nextSet.add(trackIndex);
      return nextSet;
    });
  };

  const activeTrack = tracks[activeIndex];
  const playhead = activeSrc
    ? { current: audioTime, duration: audioDuration }
    : {
        current:
          (activeTrack.progress / 100) * toSeconds(activeTrack.duration) +
          elapsed,
        duration: null,
      };

  return (
    <div className="flex w-full items-center justify-center p-8">
      <motion.div
        role="region"
        aria-roledescription="carousel"
        aria-label="Music player"
        className="grid w-full max-w-xs cursor-grab touch-pan-y pt-10 select-none active:cursor-grabbing"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {tracks.map((track, trackIndex) => (
          <StackCard
            key={`${track.title}-${trackIndex}`}
            track={track}
            index={trackIndex}
            total={count}
            progress={progress}
            isFront={trackIndex === activeIndex}
            reduce={reduce}
            isPlaying={isPlaying}
            playhead={playhead}
            liked={liked.has(trackIndex)}
            onToggleLike={() => toggleLike(trackIndex)}
            onTogglePlay={togglePlay}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        ))}
      </motion.div>

      <audio
        ref={audioRef}
        preload="none"
        className="hidden"
        onLoadedMetadata={(event) => {
          if (loadedIndex.current !== activeIndex) return;
          setAudioDuration(event.currentTarget.duration || null);
        }}
        onTimeUpdate={(event) => {
          if (loadedIndex.current !== activeIndex) return;
          setAudioTime(event.currentTarget.currentTime);
        }}
        onEnded={() => step(1)}
      />

      <p className="sr-only" aria-live="polite">
        {`${isPlaying ? "Now playing" : "Paused"}: ${activeTrack.title} by ${activeTrack.artist}`}
      </p>
    </div>
  );
}
