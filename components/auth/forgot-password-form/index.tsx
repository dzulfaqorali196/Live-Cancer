"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForgotPasswordStep } from "@/hooks/use-forgot-password-step";
import HeaderForm from "@/components/auth/header";
import { emailSchema, otpSchema, newPasswordSchema } from "./yup-schemas";
import { EmailFormData, OtpFormData, NewPasswordFormData } from "./types";
import FormFooter from "@/components/auth/footer";
import { FaClock } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { Routes } from "@/constants/routes";

// Cookies helper functions
const getCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

const setCookie = (name: string, value: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=${value};path=/`;
  }
};

const removeCookie = (name: string) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
};

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { step, updateStep, resetStep } = useForgotPasswordStep();

  const emailForm = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const newPasswordForm = useForm<NewPasswordFormData>({
    resolver: yupResolver(newPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (
    data: EmailFormData | OtpFormData | NewPasswordFormData
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      if (step === 1) {
        const emailData = data as EmailFormData;
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailData.email }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }

        setCookie("forgotPasswordEmail", emailData.email);
        updateStep(2);
      } else if (step === 2) {
        const otpData = data as OtpFormData;
        const response = await fetch("/api/auth/validate-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: getCookie("forgotPasswordEmail"),
            otp: otpData.otp,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Invalid OTP");
        }

        updateStep(3);
      } else if (step === 3) {
        const passwordData = data as NewPasswordFormData;
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: getCookie("forgotPasswordEmail"),
            newPassword: passwordData.newPassword,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update password");
        }

        removeCookie("forgotPasswordEmail");
        resetStep();
        router.push(Routes.SIGNIN);
      }
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
          title="Forgot Password"
          description={
            step === 1
              ? "Enter your email to receive an OTP."
              : step === 2
              ? "Enter the OTP sent to your email."
              : "Set a new password."
          }
        />
        <div className="grid gap-6">
          {step === 1 && (
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Checking..." : "Continue"}
                </Button>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...otpForm}>
              <form
                onSubmit={otpForm.handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-4 "
              >
                <div className="flex flex-row items-center gap-2 text-sm text-muted-foreground">
                  <FaClock />
                  <span>Expired in XX sec.</span>
                </div>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={() => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Controller
                          control={otpForm.control}
                          name="otp"
                          render={({ field: { onChange, value } }) => (
                            <InputOTP
                              maxLength={6}
                              value={value}
                              onChange={onChange}
                            >
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Checking..." : "Continue"}
                </Button>
              </form>
            </Form>
          )}

          {step === 3 && (
            <Form {...newPasswordForm}>
              <form
                onSubmit={newPasswordForm.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={newPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={newPasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Submitting..." : "Continue"}
                </Button>
              </form>
            </Form>
          )}
        </div>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Remember your password?</span>{" "}
          <a href={Routes.SIGNIN} className="text-primary hover:underline">
            Sign in here
          </a>
        </div>
        <FormFooter />
      </div>
    </div>
  );
}
