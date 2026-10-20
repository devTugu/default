// @ts-nocheck
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Megaphone,
  PenTool,
  Rocket,
  RotateCcw,
} from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Textarea } from "@default/ui/primitives/textarea";
import { cn } from "@default/ui/lib/cn";

const EASE = [0.65, 0, 0.35, 1] as const;

type FormData = {
  name: string;
  email: string;
  role: string;
  message: string;
};

const ROLES = [
  { id: "founder", label: "Founder", icon: Rocket },
  { id: "designer", label: "Designer", icon: PenTool },
  { id: "developer", label: "Developer", icon: Code2 },
  { id: "marketer", label: "Marketer", icon: Megaphone },
];

const STEPS = [
  { eyebrow: "Introduction", title: "What should we call you?" },
  { eyebrow: "Contact", title: "What's your email address?" },
  { eyebrow: "Details", title: "What best describes you?" },
  { eyebrow: "Finishing up", title: "Anything you'd like to add?" },
];

const stepVariants = {
  initial: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
  animate: {
    x: 0,
    opacity: 1,
    pointerEvents: "auto" as const,
    transition: { duration: 0.35, ease: EASE },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -24 : 24,
    opacity: 0,
    pointerEvents: "none" as const,
    transition: { duration: 0.25, ease: EASE },
  }),
};

const OnboardingForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const totalSteps = STEPS.length;
  const current = STEPS[step - 1];

  const isStepValid =
    step === 1
      ? formData.name.trim().length > 0
      : step === 2
        ? formData.email.trim().includes("@")
        : step === 3
          ? formData.role.length > 0
          : true;

  const goNext = () => {
    if (!isStepValid) return;
    if (step < totalSteps) {
      setDirection(1);
      setStep((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const goBack = () => {
    if (step === 1) return;
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setDirection(-1);
    setStep(1);
    setIsSubmitted(false);
    setFormData({ name: "", email: "", role: "", message: "" });
  };

  return (
    <section className="flex items-center justify-center bg-muted/30 dark:bg-background py-10 lg:py-20 px-4">
      <div className="w-full max-w-xl">
        <Card className="relative gap-0 rounded-2xl border border-border bg-background p-0 ring-0">
          {!isSubmitted && (
            <div className="absolute right-6 top-6 z-10 flex size-12 shrink-0 items-center justify-center sm:right-8 sm:top-8">
              <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-muted"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-foreground"
                  style={{ pathLength: 0 }}
                  animate={{ pathLength: step / totalSteps }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </svg>
              <span className="font-mono text-xs font-medium text-foreground tabular-nums">
                0{step}
              </span>
            </div>
          )}
          <CardContent className="flex flex-col gap-6 sm:gap-8 p-6 sm:p-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, pointerEvents: "auto" }}
                  exit={{ opacity: 0, y: -12, pointerEvents: "none" }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative flex flex-col items-center gap-6 overflow-hidden py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="relative z-10 flex size-12 items-center justify-center"
                  >
                    <motion.span
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{
                        duration: 1.6,
                        repeat: 2,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                      className="absolute inset-0 rounded-full border border-foreground/30"
                    />
                    <div className="flex size-12 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="size-6" />
                    </div>
                  </motion.div>

                  <div className="relative z-10 flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <p className="text-3xl font-semibold tracking-tight text-foreground">
                        Thanks, {formData.name || "friend"}!
                      </p>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        We've received your details and will be in touch
                        shortly.
                      </p>
                    </div>

                    <div className="w-full max-w-sm mx-auto divide-y divide-border rounded-xl border border-border bg-muted/30 text-left">
                      {[
                        { label: "Name", value: formData.name },
                        { label: "Email", value: formData.email },
                        {
                          label: "Role",
                          value: ROLES.find((r) => r.id === formData.role)
                            ?.label,
                        },
                      ]
                        .filter((row) => row.value)
                        .map((row) => (
                          <div
                            key={row.label}
                            className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-3 px-4 py-3 text-sm"
                          >
                            <span className="text-muted-foreground shrink-0">
                              {row.label}
                            </span>
                            <span className="font-medium text-foreground sm:text-right wrap-break-word">
                              {row.value}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="relative z-10"
                  >
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      className="dark:bg-background rounded-full px-6 cursor-pointer"
                    >
                      <RotateCcw className="size-3.5" />
                      Start Over
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={(e) => {
                    e.preventDefault();
                    goNext();
                  }}
                  className="flex flex-col gap-6 sm:gap-8"
                >
                  <div className="flex flex-col gap-3 max-w-md pt-6 sm:pt-0">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {current.eyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                      {current.title}
                    </h2>
                  </div>

                  <div>
                    {step === 1 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">
                          First name works great.
                        </p>
                        <Input
                          autoFocus
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Your name"
                          className="h-10 rounded-lg border-border bg-transparent shadow-none focus-visible:ring-1"
                        />
                      </div>
                    )}

                    {step === 2 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">
                          We'll send your confirmation here.
                        </p>
                        <Input
                          autoFocus
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          placeholder="you@example.com"
                          className="h-10 rounded-lg border-border bg-transparent shadow-none focus-visible:ring-1"
                        />
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid grid-cols-2 gap-3">
                        {ROLES.map((role) => {
                          const isSelected = formData.role === role.id;
                          return (
                            <button
                              key={role.id}
                              type="button"
                              onClick={() =>
                                setFormData((p) => ({ ...p, role: role.id }))
                              }
                              className={cn(
                                "relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border p-5 text-sm font-medium transition-colors cursor-pointer",
                                isSelected
                                  ? "border-dashed border-foreground text-foreground"
                                  : "border-border text-muted-foreground hover:border-foreground/40",
                              )}
                            >
                              {isSelected && (
                                <motion.div
                                  layoutId="role-highlight"
                                  className="absolute inset-0 bg-foreground/5"
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 32,
                                  }}
                                />
                              )}
                              <role.icon className="relative z-10 size-5" />
                              <span className="relative z-10">
                                {role.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {step === 4 && (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">
                          Optional - share anything that helps us follow up.
                        </p>
                        <Textarea
                          autoFocus
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          placeholder="Write a short message..."
                          className="min-h-30 rounded-lg border-border bg-transparent shadow-none focus-visible:ring-1 resize-none"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={goBack}
                      disabled={step === 1}
                      className="h-10 dark:bg-background rounded-full px-6 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="size-3.5" />
                      Back
                    </Button>

                    <motion.div
                      whileTap={isStepValid ? { scale: 0.97 } : undefined}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <Button
                        type="submit"
                        disabled={!isStepValid}
                        className="rounded-full px-6 h-10 bg-foreground text-background hover:bg-foreground/80 cursor-pointer disabled:cursor-not-allowed"
                      >
                        {step === totalSteps ? "Submit" : "Continue"}
                        <ArrowRight className="size-3.5" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OnboardingForm;
