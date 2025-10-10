export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Roboto, sans-serif" }}>
      <h1>Welcome to Qabum™ Marketplace</h1>
      <p>This is the official MVP demo built for investor-grade presentation.</p>
      <p>To proceed, please login with Google or access the admin dashboard if authorised.</p>
    </div>
  );
}
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Welcome to Qabum™ Marketplace</h1>
      <p>This is the official MVP demo built for investor-grade presentation.</p>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </main>
  );
}
