import { useSession, signIn } from "next-auth/react";

export default function Admin() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading…</p>;
  if (!session) return <button onClick={() => signIn("google")}>Sign in with Google</button>;
  if (!(session as any).isAdmin) return <p>Access denied</p>;
  return <div style={{ padding: 24 }}>Admin OK</div>;
}
