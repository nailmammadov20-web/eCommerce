import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no Credentials provider / db / bcrypt here so this file
// can be imported from middleware (Edge runtime) without pulling in Node-only
// dependencies. The full config (with the Credentials provider) lives in
// lib/auth.ts and is only used by route handlers / Server Components.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: "CUSTOMER" | "ADMIN" }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "CUSTOMER" | "ADMIN";
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
