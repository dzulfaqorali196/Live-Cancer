import { NextAuthConfig } from "next-auth";

export const authCallbacks: NextAuthConfig["callbacks"] = {
  async signIn({ account, profile, user, credentials }) {
    // Optional: Add logic to restrict logins (e.g., only allow certain domains)
    return true;
  },

  async redirect({ url, baseUrl }) {
    // Prevent open redirects
    return url.startsWith(baseUrl) ? url : baseUrl;
  },

  async session({ session, token }) {
    if (token && session.user) {
      session.user.id = token.sub as string;

      // Optional: Include more from token
      // session.user.role = token.role as string;
    }
    return session;
  },

  async jwt({ token, user, account, profile }) {
    if (user) {
      // `user` only available on sign-in
      token.role = "user"; // or fetch from DB
    }

    return token;
  },
};
