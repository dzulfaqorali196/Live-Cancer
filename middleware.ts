import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { isProtectedRoute } from "@/auth/protected-routes";

// Gunakan fungsi fetch di edge runtime
export const middleware = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  // Check if user has visited the intro page
  const hasVisitedIntro = request.cookies.get("hasVisitedIntro")?.value;

  // Handle /intro route
  if (pathname === "/intro") {
    if (!hasVisitedIntro) {
      const response = NextResponse.next();
      response.cookies.set("hasVisitedIntro", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
      return response;
    }
    return NextResponse.next();
  }

  // Redirect to /intro if the user hasn't visited it
  if (!hasVisitedIntro) {
    return NextResponse.redirect(new URL("/intro", request.url));
  }

  // Check protected routes
  if (isProtectedRoute(pathname)) {
    try {
      const session = await auth();
      if (!session) {
        // Preserve the original URL as callbackUrl
        const callbackUrl = encodeURIComponent(`${pathname}${search}`);
        return NextResponse.redirect(
          new URL(`/signin?callbackUrl=${callbackUrl}`, request.url)
        );
      }
    } catch (error) {
      console.error("Auth error in middleware:", error);
      // Fallback to redirect to signin
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
