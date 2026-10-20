// @ts-nocheck
"use client";

import { useState } from "react";
import { Checkbox } from "@default/ui/primitives/checkbox";
import { Button } from "@default/ui/primitives/button";
import {
  Clock,
  Calendar,
  ChevronRight,
  ListChecks,
} from "lucide-react";

const schedule = [
  {
    time: "9:00",
    color: "bg-blue-500",
    title: "Design system review",
    subtitle: "Team standup · 30 min",
  },
  {
    time: "11:30",
    color: "bg-teal-400",
    title: "Client review — Relic launch",
    subtitle: "Video call · 60 min",
  },
  {
    time: "2:00",
    color: "bg-foreground/10",
    title: "Product sync",
    subtitle: "No meetings",
  },
  {
    time: "4:30",
    color: "bg-orange-400",
    title: "Presentation prep",
    subtitle: "Solo · 45 min",
  },
];

const meetings = [
  {
    day: "2",
    period: "PM",
    title: "Product sync",
    subtitle: "Mia, Lucas, Dev +1",
  },
  {
    day: "4",
    period: "PM",
    title: "1:1 with Kai Nakamura",
    subtitle: "Creative roadmap",
  },
  {
    day: "10",
    period: "AM",
    title: "Client walkthrough",
    subtitle: "Tomorrow · Relic Co.",
  },
];

const checklist = [
  { label: "Export icon set" },
  { label: "Reply to AlgoMinds email" },
  { label: "Update resume portfolio link" },
  { label: "Book flight for offsite" },
];

export function RightPanel() {
  const [checked, setChecked] = useState(() => checklist.map(() => false));

  const toggleChecklistItem = (index: number) => {
    setChecked((prev) =>
      prev.map((value, i) => (i === index ? !value : value)),
    );
  };

  return (
      <div className="bg-background border-sidebar-border hidden w-73.5 shrink-0 flex-col overflow-y-auto border-l xl:flex">
        <div className="border-b">
          <div className="flex items-center gap-2 border-b p-4">
            <Clock className="text-foreground size-4" />
            <span className="text-foreground text-sm font-medium">
              Today&apos;s schedule
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 py-5">
            {schedule.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <p className="text-muted-foreground w-[34px] shrink-0 text-right text-xs">
                  {item.time}
                </p>
                <div
                  className={`w-[3px] shrink-0 self-stretch rounded-full ${item.color}`}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-foreground truncate text-xs font-medium">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-b">
          <div className="flex items-center gap-2 border-b p-4">
            <Calendar className="text-foreground size-4" />
            <span className="text-foreground text-sm font-medium">
              Upcoming meetings
            </span>
          </div>
          <div className="flex flex-col gap-4 px-4 py-5">
            {meetings.map((meeting) => (
              <div key={meeting.title} className="flex items-center gap-3">
                <div className="border-border flex size-10 shrink-0 flex-col items-center justify-center rounded-lg border">
                  <p className="text-foreground text-sm font-medium leading-tight">
                    {meeting.day}
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight">
                    {meeting.period}
                  </p>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="text-foreground truncate text-sm font-medium">
                    {meeting.title}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {meeting.subtitle}
                  </p>
                </div>
                <Button variant="ghost" className="cursor-pointer">
                  <ChevronRight className="size-4 shrink-0" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 border-b p-4">
            <ListChecks className="text-foreground size-4" />
            <span className="text-foreground text-sm font-medium">
              Personal checklist
            </span>
          </div>
          <div className="flex flex-col gap-0.5 p-4">
            {checklist.map((item, index) => (
              <label
                key={item.label}
                className="flex items-center gap-2.5 py-1.5"
              >
                <Checkbox
                  checked={checked[index]}
                  onCheckedChange={() => toggleChecklistItem(index)}
                />
                <span
                  className={
                    checked[index]
                      ? "text-muted-foreground text-sm line-through"
                      : "text-foreground text-sm"
                  }
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
  );
}