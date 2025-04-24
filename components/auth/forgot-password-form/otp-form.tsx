"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "./yup-schemas";
import { OTPFormData } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface OTPFormProps {
  onSubmit: (data: OTPFormData) => void;
  isLoading?: boolean;
}

export default function OTPForm({ onSubmit, isLoading }: OTPFormProps) {
  const form = useForm<OTPFormData>({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Masukkan kode OTP"
                  maxLength={6}
                  className="text-center tracking-[1em] font-bold text-lg"
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Verifikasi"}
        </Button>
      </form>
    </Form>
  );
} 