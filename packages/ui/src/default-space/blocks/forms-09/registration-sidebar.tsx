// @ts-nocheck
"use client";

import { cn } from "@default/ui/lib/cn";
import { registrationSteps } from "./types";

type RegistrationSidebarProps = {
  currentStep: number;
  onStepClick: (id: number) => void;
};

const RegistrationSidebar = ({
  currentStep,
  onStepClick,
}: RegistrationSidebarProps) => {
  return (
    <div className="relative flex w-full shrink-0 flex-col overflow-hidden bg-blue-500/5 p-8 md:w-80">
      <div className="absolute -bottom-16 -left-16 size-56 rounded-full border-8 border-background" />
      <div className="absolute -bottom-24 left-10 size-40 rounded-full border-8 border-background" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <p className="text-lg font-bold text-foreground">
          New Account Registration
        </p>
      </div>

      <div className="relative z-10 my-10 flex flex-1 flex-col">
        {registrationSteps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isLast = index === registrationSteps.length - 1;

          return (
            <div key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => onStepClick(step.id)}
                  className="relative flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-background shadow-sm"
                >
                  <Icon
                    className={cn(
                      "size-4.5",
                      isActive || isCompleted
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  />
                </button>
                {!isLast && (
                  <div
                    className={cn(
                      "my-1 w-0.5 flex-1",
                      isCompleted ? "bg-primary" : "bg-border",
                    )}
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className="flex cursor-pointer flex-col gap-0.5 pt-1 pb-6 text-left"
              >
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive || isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span
                  className={cn(
                    "text-xs",
                    isActive || isCompleted
                      ? "text-muted-foreground"
                      : "text-muted-foreground/60",
                  )}
                >
                  {step.description}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegistrationSidebar;
