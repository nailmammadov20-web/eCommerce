import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const role = req.auth?.user?.role;
  const { pathname } = req.nextUrl;

  const requiresAuth = pathname.startsWith("/admin") || pathname.startsWith("/account");

  if (requiresAuth && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
