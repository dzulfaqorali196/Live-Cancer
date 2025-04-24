"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface SignOutButtonProps {
  redirectUrl?: string;
}

export function SignOutButton({ redirectUrl = "/home" }: SignOutButtonProps) {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: redirectUrl });
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };
  return (
    <Button onClick={handleSignOut} variant="destructive">
      Sign Out
    </Button>
  );
}
