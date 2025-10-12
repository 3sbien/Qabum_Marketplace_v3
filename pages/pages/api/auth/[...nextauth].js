import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const allowed = (process.env.ALLOWED_ADMINS || "")
        .split(",").map(s => s.trim().toLowerCase());
      session.isAdmin = allowed.includes(session.user?.email?.toLowerCase());
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
