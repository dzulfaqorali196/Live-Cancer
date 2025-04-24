"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useForgotPasswordStep() {
  const [step, setStep] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cookieStep = Cookies.get("fp_step");
    if (cookieStep) {
      setStep(Number(cookieStep));
    }
  }, []);

  const updateStep = (newStep: number) => {
    if (isClient) {
      Cookies.set("fp_step", String(newStep), {
        expires: 0.01,
      });
      setStep(newStep);
    }
  };

  const resetStep = () => {
    if (isClient) {
      Cookies.remove("fp_step");
      setStep(1);
    }
  };

  return { step, updateStep, resetStep, isClient };
}
