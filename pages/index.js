import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Qabum™ Marketplace</h1>
      <p>Este es el MVP oficial de demostración / This is the official MVP demo.</p>
      <button onClick={() => signIn("google")}>Ingresar / Sign in with Google</button>
    </main>
  );
}
