"use client";

import dynamic from "next/dynamic";

function LoadingSpinner() {
  return (
    <div className="flex h-[400px] w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}

const ForgotPasswordForm = dynamic(
  () => import("@/components/auth/forgot-password-form"),
  { 
    loading: LoadingSpinner,
    ssr: false 
  }
);

export default function ForgotPasswordWrapper() {
  return <ForgotPasswordForm />;
} 