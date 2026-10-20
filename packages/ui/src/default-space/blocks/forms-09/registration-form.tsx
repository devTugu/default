// @ts-nocheck
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowLeft, Rocket } from "lucide-react";
import { Button } from "@default/ui/primitives/button";
import {
  registrationSteps,
  initialRegistrationData,
  type RegistrationData,
  type UpdateRegistrationField,
} from "./types";
import RegistrationSidebar from "./registration-sidebar";
import PersonalDetailsStep from "./personal-details-step";
import IdentificationDetailsStep from "./identification-details-step";
import BusinessDetailsStep from "./business-details-step";
import VerifyEmailStep from "./verify-email-step";
import WelcomeStep from "./welcome-step";

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(initialRegistrationData);

  const update: UpdateRegistrationField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const goToStep = (id: number) => setCurrentStep(id);
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, registrationSteps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const activeStep = registrationSteps.find((step) => step.id === currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === registrationSteps.length;
  const Icon = activeStep?.icon;

  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-6xl xl:px-16 lg:px-8 px-4 mx-auto w-full">
        <div className="flex min-h-170 flex-col overflow-hidden rounded-2xl border border-border md:flex-row">
          <RegistrationSidebar
            currentStep={currentStep}
            onStepClick={goToStep}
          />

          <div className="flex flex-1 flex-col bg-background p-6 sm:p-10">
            <div className="flex items-center gap-3">
              {Icon && (
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-primary">
                  <Icon className="size-5" />
                </span>
              )}
              <div>
                <p className="text-lg font-bold text-foreground">
                  {isFirstStep
                    ? "Provide Your Personal Details"
                    : activeStep?.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeStep?.description}.
                </p>
              </div>
            </div>

            <div className="mt-8 flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  {currentStep === 1 && (
                    <PersonalDetailsStep data={data} update={update} />
                  )}
                  {currentStep === 2 && (
                    <IdentificationDetailsStep data={data} update={update} />
                  )}
                  {currentStep === 3 && (
                    <BusinessDetailsStep data={data} update={update} />
                  )}
                  {currentStep === 4 && (
                    <VerifyEmailStep data={data} update={update} />
                  )}
                  {currentStep === 5 && <WelcomeStep data={data} />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
              {!isFirstStep && !isLastStep ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="h-10 gap-2 cursor-pointer"
                >
                  <ArrowLeft className="size-4" />
                  Previous
                </Button>
              ) : (
                <span />
              )}

              {!isLastStep ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-10 gap-2 cursor-pointer bg-blue-500 hover:bg-blue-500/80"
                >
                  Continue
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="h-10 w-full gap-2 cursor-pointer bg-blue-500 hover:bg-blue-500/80"
                >
                  <Rocket className="size-4" />
                  Go to Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
