// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@default/ui/primitives/input-otp";
import type {
  RegistrationData,
  UpdateRegistrationField,
} from "./types";

type VerifyEmailStepProps = {
  data: RegistrationData;
  update: UpdateRegistrationField;
};

const VerifyEmailStep = ({ data, update }: VerifyEmailStepProps) => {
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MailCheck className="size-6" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>
        <p className="text-sm font-semibold">
          {data.email || "your email address"}
        </p>
      </div>

      <InputOTP
        maxLength={6}
        value={data.otp}
        onChange={(value) => update("otp", value)}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPSlot key={index} index={index} className="size-11" />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <button
        type="button"
        disabled={cooldown > 0}
        onClick={() => setCooldown(30)}
        className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 disabled:cursor-not-allowed disabled:text-muted-foreground"
      >
        {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
      </button>
    </div>
  );
};

export default VerifyEmailStep;
