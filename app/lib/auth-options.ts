import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

process.env.NEXTAUTH_URL ??= process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://127.0.0.1:3000";
process.env.NEXTAUTH_SECRET ??= process.env.SESSION_SECRET;

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
