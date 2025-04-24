"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useForgotPasswordStep } from "@/hooks/use-forgot-password-step";
import Cookies from "js-cookie";
import HeaderForm from "@/components/auth/header";
import { emailSchema } from "./yup-schemas";
import { EmailFormData } from "./types";
import FormFooter from "@/components/auth/footer";
import { Loader2 } from "lucide-react";
import { Routes } from "@/constants/routes";

const ForgotPasswordStepOne = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateStep } = useForgotPasswordStep();

  const form = useForm<EmailFormData>({
    resolver: yupResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }

      Cookies.set("forgotPasswordEmail", data.email);
      updateStep(2);
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
          description="Enter your email to receive an OTP."
        />
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
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
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Checking..." : "Continue"}
              </Button>
            </form>
          </Form>
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

export default ForgotPasswordStepOne; 