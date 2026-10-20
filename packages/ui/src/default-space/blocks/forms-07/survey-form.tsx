// @ts-nocheck
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { ArrowLeft, ArrowRight, Check, Mail, RotateCcw } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import { Card, CardContent } from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Label } from "@default/ui/primitives/label";
import { RadioGroup, RadioGroupItem } from "@default/ui/primitives/radio-group";
import { cn } from "@default/ui/lib/cn";

const EASE = [0.65, 0, 0.35, 1] as const;

type FormData = {
  category: string;
  urgency: string;
  area: string;
  email: string;
};

type Option = { id: string; label: string };

type Step =
  | {
      type: "select";
      eyebrow: string;
      title: string;
      field: "category" | "urgency" | "area";
      options: Option[];
    }
  | {
      type: "input";
      eyebrow: string;
      title: string;
      field: "email";
      placeholder: string;
    };

const STEPS: Step[] = [
  {
    type: "select",
    eyebrow: "Issue",
    title: "What can we help you with?",
    field: "category",
    options: [
      { id: "billing", label: "Billing question" },
      { id: "technical", label: "Technical issue" },
      { id: "feature", label: "Feature request" },
      { id: "access", label: "Account access" },
    ],
  },
  {
    type: "select",
    eyebrow: "Urgency",
    title: "How urgent is this?",
    field: "urgency",
    options: [
      { id: "critical", label: "Critical - blocking my work" },
      { id: "high", label: "High - affecting my workflow" },
      { id: "medium", label: "Medium - minor inconvenience" },
      { id: "low", label: "Low - just a question" },
    ],
  },
  {
    type: "select",
    eyebrow: "Product area",
    title: "Which part of the product is affected?",
    field: "area",
    options: [
      { id: "dashboard", label: "Dashboard" },
      { id: "billing-payments", label: "Billing & payments" },
      { id: "integrations", label: "Integrations" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    type: "input",
    eyebrow: "Contact",
    title: "Where should we send updates?",
    field: "email",
    placeholder: "you@example.com",
  },
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

const SurveyForm = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: "",
    urgency: "",
    area: "",
    email: "",
  });

  const totalSteps = STEPS.length;
  const current = STEPS[step - 1];

  const isStepValid =
    current.type === "select"
      ? formData[current.field].length > 0
      : formData.email.trim().includes("@");

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
    setFormData({ category: "", urgency: "", area: "", email: "" });
  };

  const summaryRows = [
    {
      label: "Issue",
      value: STEPS[0].type === "select"
        ? STEPS[0].options.find((o) => o.id === formData.category)?.label
        : undefined,
    },
    {
      label: "Urgency",
      value: STEPS[1].type === "select"
        ? STEPS[1].options.find((o) => o.id === formData.urgency)?.label
        : undefined,
    },
    {
      label: "Product area",
      value: STEPS[2].type === "select"
        ? STEPS[2].options.find((o) => o.id === formData.area)?.label
        : undefined,
    },
    { label: "Email", value: formData.email },
  ];

  return (
    <section className="flex items-center justify-center bg-muted/30 dark:bg-background py-10 lg:py-20 px-4">
      <div className="w-full max-w-xl">
        <Card className="gap-0 rounded-2xl border border-border bg-background p-0 ring-0">
          <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
            {!isSubmitted && (
              <div className="flex items-center justify-end">
                <span className="flex items-center font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
                  <NumberFlow value={step} format={{ minimumIntegerDigits: 2 }} />
                  <span className="mx-1">/</span>0{totalSteps}
                </span>
              </div>
            )}

            <AnimatePresence mode="popLayout" initial={false}>
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0, pointerEvents: "auto" }}
                  exit={{ opacity: 0, x: -24, pointerEvents: "none" }}
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

                  <div className="relative z-10 flex flex-col gap-1.5">
                    <p className="text-3xl font-semibold tracking-tight text-foreground">
                      We&apos;re on it!
                    </p>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Our support team will review your request and follow up
                      at {formData.email || "your inbox"} shortly.
                    </p>
                  </div>

                  <div className="relative z-10 w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-muted/30 text-left">
                    {summaryRows
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
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      {current.eyebrow}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                      {current.title}
                    </h2>
                  </div>

                  <div>
                    {current.type === "select" ? (
                      <RadioGroup
                        value={formData[current.field]}
                        onValueChange={(value) =>
                          setFormData((p) => ({
                            ...p,
                            [current.field]: value,
                          }))
                        }
                        className="grid gap-3"
                      >
                        {current.options.map((option) => {
                          const isChecked =
                            formData[current.field] === option.id;
                          return (
                            <Label
                              key={option.id}
                              htmlFor={`${current.field}-${option.id}`}
                              className={cn(
                                "flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all",
                                isChecked
                                  ? "border-primary border-dashed bg-primary/5"
                                  : "border-border border-solid hover:bg-muted/20",
                              )}
                            >
                              <RadioGroupItem
                                id={`${current.field}-${option.id}`}
                                value={option.id}
                              />
                              <span className="text-sm font-medium text-foreground">
                                {option.label}
                              </span>
                            </Label>
                          );
                        })}
                      </RadioGroup>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <p className="text-sm text-muted-foreground">
                          We&apos;ll send status updates on your request here.
                        </p>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
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
                            placeholder={current.placeholder}
                            className="h-10 rounded-lg border-border bg-transparent pl-9 shadow-none focus-visible:ring-1"
                          />
                        </div>
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

export default SurveyForm;
