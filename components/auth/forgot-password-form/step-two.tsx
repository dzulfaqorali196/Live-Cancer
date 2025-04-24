"use client";

import { useState } from "react";
import { useForgotPasswordStep } from "@/hooks/use-forgot-password-step";
import Cookies from "js-cookie";
import HeaderForm from "@/components/auth/header";
import { OTPFormData } from "./types";
import FormFooter from "@/components/auth/footer";
import OTPForm from "./otp-form";

const ForgotPasswordStepTwo = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateStep } = useForgotPasswordStep();
  const email = Cookies.get("forgotPasswordEmail");

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email,
          otp: data.otp 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      updateStep(3);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <HeaderForm
          title="Verifikasi OTP"
          description="Masukkan kode OTP yang telah dikirim ke email Anda."
        />
        <div className="grid gap-6">
          <OTPForm onSubmit={onSubmit} isLoading={isLoading} />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <FormFooter />
      </div>
    </div>
  );
}

export default ForgotPasswordStepTwo; 