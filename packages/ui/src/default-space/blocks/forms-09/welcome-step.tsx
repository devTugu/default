// @ts-nocheck
"use client";

import { PartyPopper, Check } from "lucide-react";
import type { RegistrationData } from "./types";

type WelcomeStepProps = {
  data: RegistrationData;
};

const checklist = [
  "Personal details verified",
  "Identification submitted",
  "Business profile created",
  "Email address confirmed",
];

const WelcomeStep = ({ data }: WelcomeStepProps) => {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <PartyPopper className="size-6" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold text-foreground">
          Welcome to Space, {data.firstName || "there"}!
        </p>
        <p className="text-sm text-muted-foreground">
          Your account is ready. You're all set to get up and running in
          under a minute.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-2 rounded-xl border border-border bg-muted/30 p-4 text-left">
        {checklist.map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm">
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-3" />
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeStep;
