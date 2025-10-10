import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session({ session }) {
      const allow = (process.env.ALLOWED_ADMINS || "")
        .split(",")
        .map(s => s.trim().toLowerCase());
      session.isAdmin = session.user?.email
        ? allow.includes(session.user.email.toLowerCase())
        : false;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
