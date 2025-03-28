import { AUTH_CONFIG } from "@/configs/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = AUTH_CONFIG.protectedRoutes.some((path) =>
    pathname.startsWith(path),
  );
  const isAuthPath = AUTH_CONFIG.authRoutes.some((path) =>
    pathname.startsWith(path),
  );
  const isApiPath = pathname.startsWith("/api/");

  const session = request.cookies.get(AUTH_CONFIG.cookie.name);
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // response.headers.set(
  //   "Content-Security-Policy",
  //   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
  // );

  // Handle protected routes
  if (isProtectedPath && !session) {
    const loginUrl = new URL(AUTH_CONFIG.redirects.onAuthError, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Handle auth routes (prevent logged-in users from accessing login)
  if (isAuthPath && session) {
    return NextResponse.redirect(
      new URL(AUTH_CONFIG.redirects.afterLogin, request.url),
    );
  }

  // Handle API routes
  if (isApiPath) {
    if (session) {
      response.cookies.set(
        AUTH_CONFIG.cookie.name,
        session.value,
        AUTH_CONFIG.cookie.options,
      );
    }
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
