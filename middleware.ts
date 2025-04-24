import NextAuth from "next-auth";

import { auth } from "@/auth";
import { authConfig } from "@/auth/config";
import { isProtectedRoute } from "@/auth/protected-routes";
import { NextResponse } from "next/server";

export default NextAuth(authConfig).auth;

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  if (isProtectedRoute(pathname)) {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
