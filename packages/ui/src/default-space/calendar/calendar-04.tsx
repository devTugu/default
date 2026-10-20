// @ts-nocheck
"use client";

import { faker } from "@faker-js/faker";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@default/ui/primitives/button";
import { Calendar } from "@default/ui/primitives/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@default/ui/primitives/dialog";

export const title = "Calendar with Range in Dialog";

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const from = faker.date.between({
  from: startOfMonth,
  to: new Date(now.getFullYear(), now.getMonth(), 15),
});
const to = faker.date.between({
  from: new Date(now.getFullYear(), now.getMonth(), 16),
  to: endOfMonth,
});

const CalendarDialog = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from,
    to,
  });

  return (
    <div className="flex items-center justify-center px-4">
      <Dialog>
        <DialogTrigger render={
          <Button variant="outline">Select Date Range</Button>
        } />
        <DialogContent className="max-w-fit!">
          <DialogHeader>
            <DialogTitle>Select Date Range</DialogTitle>
          </DialogHeader>
          <Calendar
            className="rounded-md border"
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarDialog;
