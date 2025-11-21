// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) token.provider = account.provider;

      if (profile && typeof (profile as any).email === "string") {
        (token as any).email = (profile as any).email;
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).provider = (token as any).provider;
      return session;
    },

    // CORRECCIÓN CRÍTICA
    // Esta versión es compatible con App Router y previene el error 500
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
