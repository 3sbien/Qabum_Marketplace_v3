import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const auth = NextAuth({
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

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/admin`;
    },
  },
});

export { auth as GET, auth as POST };
