"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPasswordStep } from "@/hooks/use-forgot-password-step";
import { useEffect, useState } from "react";
import { ForgotPasswordStepOne } from "./step-one";
import { ForgotPasswordStepTwo } from "./step-two";
import { ForgotPasswordStepThree } from "./step-three";

export function ForgotPasswordForm() {
  const { step, isClient } = useForgotPasswordStep();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isClient) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {step === 1 && <ForgotPasswordStepOne />}
      {step === 2 && <ForgotPasswordStepTwo />}
      {step === 3 && <ForgotPasswordStepThree />}
    </>
  );
}
