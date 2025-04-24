"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const getInitialStep = () => {
  try {
    if (typeof window !== 'undefined') {
      const cookieStep = Cookies.get("fp_step");
      return cookieStep ? Number(cookieStep) : 1;
    }
    return 1;
  } catch {
    return 1;
  }
};

export function useForgotPasswordStep() {
  const [step, setStep] = useState<number>(getInitialStep());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateStep = (newStep: number) => {
    if (!isClient) return;
    try {
      Cookies.set("fp_step", String(newStep), {
        expires: 0.01,
      });
      setStep(newStep);
    } catch (error) {
      console.error("Error updating step:", error);
      setStep(newStep);
    }
  };

  const resetStep = () => {
    if (!isClient) return;
    try {
      Cookies.remove("fp_step");
      setStep(1);
    } catch (error) {
      console.error("Error resetting step:", error);
      setStep(1);
    }
  };

  return { step, updateStep, resetStep, isClient };
}
