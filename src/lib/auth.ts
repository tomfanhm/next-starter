import { cache } from "react";

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { getDb } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(getDb()),
  providers: [
    GitHub,
    Google,
    // Add more providers as needed
  ],
  pages: {
    signIn: "/sign-in",
    // signUp: "/sign-up",  // Uncomment if you add a custom sign-up page
  },
  session: { strategy: "database" },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

// Deduplicate auth() calls within a single request (React `cache`).
export const getSession = cache(auth);
