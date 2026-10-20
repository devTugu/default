// @ts-nocheck
"use client";

import { cn } from "@default/ui/lib/cn";
import { steps } from "./types";

type StepHeaderProps = {
  currentStep: number;
  onStepClick: (id: number) => void;
};

const getPositionPercent = (index: number) =>
  (index / (steps.length - 1)) * 100;

const StepHeader = ({ currentStep, onStepClick }: StepHeaderProps) => {
  const progressValue = ((currentStep - 1) / (steps.length - 1)) * 100;
  const activeStep = steps.find((step) => step.id === currentStep);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 md:hidden">
        <span className="text-sm font-semibold text-primary">
          {activeStep?.title}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground">
          Step {currentStep} of {steps.length}
        </span>
      </div>

      <div className="relative hidden h-5 md:block">
        {steps.map((step, index) => {
          const isFirst = index === 0;
          const isLast = index === steps.length - 1;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              style={{
                left: `${getPositionPercent(index)}%`,
                transform: isFirst
                  ? "translateX(0)"
                  : isLast
                    ? "translateX(-100%)"
                    : "translateX(-50%)",
              }}
              className="absolute top-0 cursor-pointer whitespace-nowrap text-sm font-medium transition-colors"
            >
              <span
                className={cn(
                  isActive
                    ? "text-primary font-semibold"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative flex h-3.5 items-center">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-teal-400/40 transition-all"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              aria-current={isActive ? "step" : undefined}
              style={{
                left: `${getPositionPercent(index)}%`,
                transform: "translateX(-50%)",
              }}
              className="absolute z-10 cursor-pointer"
            >
              <span
                className={cn(
                  "block size-3.5 rounded-full border-2 bg-teal-400 transition-colors",
                  isCompleted && "border-teal-400 bg-teal-400",
                  isActive && "border-teal-400/10",
                  !isActive && !isCompleted && "border-border",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepHeader;
