// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  MessageSquare,
  Rocket,
  Mail,
  Briefcase,
  PenTool,
} from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@default/ui/primitives/card";
import { Input } from "@default/ui/primitives/input";
import { Field, FieldLabel } from "@default/ui/primitives/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@default/ui/primitives/select";
import { Textarea } from "@default/ui/primitives/textarea";
import { Progress } from "@default/ui/primitives/progress";
import { Badge } from "@default/ui/primitives/badge";
import { Separator } from "@default/ui/primitives/separator";
import { cn } from "@default/ui/lib/cn";

const steps = [
  { id: 1, title: "Account", icon: User, description: "Basic details" },
  {
    id: 2,
    title: "Profile",
    icon: MessageSquare,
    description: "Personal info",
  },
  { id: 3, title: "Finalize", icon: Rocket, description: "Review & launch" },
];

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    role: "developer",
  });

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const stepVariants = {
    initial: (dir: number) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -20 : 20,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    }),
  };

  return (
    <section className="py-10 lg:py-16 flex items-center justify-center">
      <div className="max-w-2xl xl:px-16 lg:px-8 px-4 mx-auto w-full">
        <form className="flex flex-col gap-6">
          <div className="relative space-y-6">
            <div className="flex justify-between relative">
              <div className="absolute top-8 left-8 right-8 h-0.5 bg-border z-0">
                <div
                  className="h-full bg-teal-400 transition-all duration-500"
                  style={{
                    width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              </div>
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;

                return (
                  <div
                    key={step.id}
                    className="relative flex flex-col items-center group"
                  >
                    <div className="bg-background p-3 z-10 rounded-full">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 bg-background z-10",
                          isActive && "ring-8 ring-primary/5",
                          isCompleted && " bg-teal-400 text-white",
                          !isActive &&
                            !isCompleted &&
                            "border-muted/30 text-muted-foreground bg-muted dark:bg-muted/50",
                        )}
                      >
                        {isCompleted ? (
                          <Check className="size-4" />
                        ) : (
                          <Icon
                            className={cn("size-4", isActive && "text-primary")}
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={cn(
                          "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground/60",
                        )}
                      >
                        {step.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="border-primary/10 overflow-hidden backdrop-blur-sm bg-background/80 relative pb-0 pt-6 gap-6">
            <CardHeader className="px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                    {currentStep === 1 && "Create your account"}
                    {currentStep === 2 && "Personalize your profile"}
                    {currentStep === 3 && "Review your information"}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {currentStep === 1 &&
                      "Start your journey by setting up your basic credentials."}
                    {currentStep === 2 &&
                      "Tell us a bit about who you are and what you do."}
                    {currentStep === 3 &&
                      "Make sure everything looks correct before submitting."}
                  </CardDescription>
                </motion.div>
              </AnimatePresence>
            </CardHeader>

            <CardContent className="px-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full flex flex-col gap-6"
                >
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <Field>
                        <FieldLabel
                          htmlFor="username"
                          className="text-sm font-semibold text-card-foreground"
                        >
                          Username
                        </FieldLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="username"
                            placeholder="Sunil Joshi"
                            value={formData.username}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                            className="pl-10 h-10 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
                          />
                        </div>
                      </Field>
                      <Field>
                        <FieldLabel
                          htmlFor="email"
                          className="text-sm font-semibold text-card-foreground"
                        >
                          Email Address
                        </FieldLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="suniljoshi@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="pl-10 h-10 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
                          />
                        </div>
                      </Field>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <Field>
                        <FieldLabel
                          htmlFor="role"
                          className="text-sm font-semibold text-card-foreground"
                        >
                          What is your role?
                        </FieldLabel>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData({ ...formData, role: value as string })
                          }
                        >
                          <SelectTrigger
                            id="role"
                            className="h-10 data-[size=default]:h-10 border-muted-foreground/20"
                          >
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-muted-foreground" />
                              <SelectValue placeholder="Select a role" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="developer">Developer</SelectItem>
                            <SelectItem value="designer">Designer</SelectItem>
                            <SelectItem value="manager">
                              Product Manager
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel
                          htmlFor="bio"
                          className="text-sm font-semibold text-card-foreground"
                        >
                          Short Bio
                        </FieldLabel>
                        <div className="relative">
                          <PenTool className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            id="bio"
                            placeholder="A few words about your professional journey..."
                            className="min-h-[120px] pl-10 pt-2.5 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all resize-none"
                            value={formData.bio}
                            onChange={(e) =>
                              setFormData({ ...formData, bio: e.target.value })
                            }
                          />
                        </div>
                      </Field>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="relative p-6 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 to-transparent overflow-hidden group">
                        <div className="space-y-6 relative z-10">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <span className="text-xs font-bold uppercase tracking-widest text-primary/70">
                                Final Review
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-primary/10 text-primary border-primary/20"
                            >
                              Ready to Submit
                            </Badge>
                          </div>

                          <div className="grid gap-2">
                            <div className="group/item">
                              <div className="flex items-center justify-between py-2 transition-transform group-hover/item:translate-x-1 duration-300">
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                  <User className="w-3.5 h-3.5 text-primary/60" />{" "}
                                  Username
                                </span>
                                <span className="text-sm font-bold bg-background px-4 py-1.5 rounded-xl border border-border/50 shadow-sm group-hover/item:border-primary/30 transition-colors text-foreground">
                                  @{formData.username || "not_set"}
                                </span>
                              </div>
                            </div>

                            <Separator className="bg-primary/10" />

                            <div className="group/item">
                              <div className="flex items-center justify-between py-2 transition-transform group-hover/item:translate-x-1 duration-300">
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-primary/60" />{" "}
                                  Email
                                </span>
                                <span className="text-sm font-semibold text-foreground">
                                  {formData.email || "not_set@example.com"}
                                </span>
                              </div>
                            </div>

                            <Separator className="bg-primary/10" />

                            <div className="group/item">
                              <div className="flex items-center justify-between py-2 transition-transform group-hover/item:translate-x-1 duration-300">
                                <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                  <Briefcase className="w-3.5 h-3.5 text-primary/60" />{" "}
                                  Primary Role
                                </span>
                                <Badge
                                  variant="outline"
                                  className="capitalize font-bold border-primary/30 bg-primary/5 text-primary px-3 shadow-none leading-normal"
                                >
                                  {formData.role}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-2xl border border-dashed border-border group hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-primary/20 transition-colors">
                          <Rocket className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-foreground">
                            Almost there!
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Your profile details look great. Once you click
                            "Confirm & Launch", your journey with our platform
                            officially begins.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </CardContent>

            <CardFooter className="p-6 flex items-center justify-between gap-4 bg-muted/20 border-t border-border">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 h-10 font-medium transition-all cursor-pointer"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>

              <div className="flex items-center gap-3">
                {currentStep < steps.length ? (
                  <Button
                    onClick={nextStep}
                    className="px-6 h-10 font-bold hover:bg-primary/80 transition-all hover:translate-y-[-2px] active:translate-y-0 group cursor-pointer"
                  >
                    Continue
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                ) : (
                  <Button className="px-6 h-10 font-bold bg-primary hover:bg-primary/80 transition-all hover:scale-102 active:scale-95 cursor-pointer">
                    Confirm & Launch
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card className="py-6">
            <CardContent className="px-6 flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1 bg-background shadow-sm border-border"
                  >
                    Step {currentStep} of {steps.length}
                  </Badge>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Complete your registration
                  </h2>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-muted-foreground">
                    Progress
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {Math.round(progress)}%
                  </p>
                </div>
              </div>
              <Progress
                value={progress}
                className="h-1 **:data-[slot=progress-indicator]:bg-teal-400"
              />
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  );
};

export default MultiStepForm;
