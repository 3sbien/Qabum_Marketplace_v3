import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session }) {
      const allow = (process.env.ALLOWED_ADMINS || "")
        .split(",").map(s => s.trim().toLowerCase());
      (session as any).isAdmin = session.user?.email
        ? allow.includes(session.user.email.toLowerCase())
        : false;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
