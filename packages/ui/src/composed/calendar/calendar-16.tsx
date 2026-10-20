// @ts-nocheck
"use client";

import { useId, useState } from "react";
import { format } from "date-fns";
import { cn } from "@default/ui/lib/cn";
import { Button } from "@default/ui/primitives/button";
import { Calendar } from "@default/ui/primitives/calendar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@default/ui/primitives/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@default/ui/primitives/popover";
import { Separator } from "@default/ui/primitives/separator";
import { CalendarIcon, ClockIcon, ChevronDownIcon } from "lucide-react";

const formatTime12h = (timeStr: string) => {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes} ${ampm}`;
};

const addHoursToTime = (timeStr: string, hoursToAdd: number): string => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":").map(Number);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const newHour = (h + hoursToAdd) % 24;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(newHour)}:${pad(m)}`;
};

const getDurationHours = (start: string, end: string): number | null => {
  if (!start || !end) return null;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if (isNaN(sh) || isNaN(sm) || isNaN(eh) || isNaN(em)) return null;
  const startMin = sh * 60 + sm;
  const endMin = eh * 60 + em;
  const diffMin = endMin - startMin;
  if (diffMin <= 0) return null;
  return diffMin / 60;
};

const PRESETS = [
  { label: "1h", value: 1 },
  { label: "2h", value: 2 },
  { label: "4h", value: 4 },
];

const CalendarWithTimeRange = () => {
  const id = useId();
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );
  const [startTime, setStartTime] = useState("10:30");
  const [endTime, setEndTime] = useState("12:30");

  const isInvalid = !!(startTime && endTime && startTime > endTime);
  const currentDuration = getDurationHours(startTime, endTime);
  const isAllDayActive = startTime === "09:00" && endTime === "17:00";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "group/pick-date w-full max-w-full min-w-0 cursor-pointer justify-between border-input text-left font-normal transition-all duration-200 hover:bg-accent hover:text-accent-foreground sm:w-fit sm:min-w-80",
            !date && "text-muted-foreground",
          )}
          id={id}
          variant="outline"
        >
          <div className="flex min-w-0 items-center gap-2.5 truncate">
            <CalendarIcon
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-muted-foreground/80 transition-colors group-hover/pick-date:text-foreground"
            />
            {date ? (
              <span className="text-sm font-medium text-foreground">
                {format(date, "MMM d, yyyy")}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">
                Pick a date and time
              </span>
            )}
            {date && (startTime || endTime) && (
              <>
                <span className="select-none text-muted-foreground/30">|</span>
                <div className="flex items-center gap-1.5 text-muted-foreground/90">
                  <ClockIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                  <span className="text-xs font-normal">
                    {startTime ? formatTime12h(startTime) : "—"}
                    {" – "}
                    {endTime ? formatTime12h(endTime) : "—"}
                  </span>
                </div>
              </>
            )}
          </div>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 text-muted-foreground/60 transition-colors group-hover/pick-date:text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto p-0 flex flex-col sm:flex-row"
      >
        {/* Left Side: Calendar */}
        <div className="p-2.5">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="p-0"
          />
        </div>

        {/* Separator for mobile */}
        <Separator orientation="horizontal" className="sm:hidden" />

        {/* Separator for desktop */}
        <Separator orientation="vertical" className="hidden sm:block" />

        {/* Right Side: Time Range & Presets */}
        <div className="p-4 flex flex-col gap-4 w-full sm:max-w-70 justify-start">
          {/* Time range labels & inputs */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Time Range
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">
                  Start
                </span>
                <InputGroup>
                  <InputGroupInput
                    id="time-from"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-xs"
                  />
                  <InputGroupAddon>
                    <ClockIcon className="text-muted-foreground/75" />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">
                  End
                </span>
                <InputGroup className={cn(isInvalid && "border-destructive")}>
                  <InputGroupInput
                    id="time-to"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    aria-invalid={isInvalid}
                    className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none text-xs"
                  />
                  <InputGroupAddon>
                    <ClockIcon
                      className={cn(
                        "text-muted-foreground/75",
                        isInvalid && "text-destructive",
                      )}
                    />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Presets
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset) => {
                const isActive = currentDuration === preset.value;
                return (
                  <Button
                    key={preset.label}
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "h-8 text-xs font-normal transition-all w-full cursor-pointer",
                      isActive
                        ? "shadow-sm"
                        : "hover:bg-accent hover:text-accent-foreground text-muted-foreground/80",
                    )}
                    onClick={() => {
                      setEndTime(addHoursToTime(startTime, preset.value));
                    }}
                  >
                    {preset.label}
                  </Button>
                );
              })}
              <Button
                variant={isAllDayActive ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 text-xs font-normal transition-all w-full cursor-pointer",
                  isAllDayActive
                    ? "shadow-sm"
                    : "hover:bg-accent hover:text-accent-foreground text-muted-foreground/80",
                )}
                onClick={() => {
                  setStartTime("09:00");
                  setEndTime("17:00");
                }}
              >
                All Day
              </Button>
            </div>
          </div>

          {isInvalid && (
            <p className="text-xs text-destructive font-medium mt-1 leading-normal text-center animate-in fade-in duration-200">
              End time must be after start time
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarWithTimeRange;
