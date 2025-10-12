import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main style={{ padding: 24, textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
      <h1>Qabum™ Marketplace</h1>
      <p>Este es el MVP oficial de demostración / This is the official MVP demo.</p>
      <button
        onClick={() => signIn("google")}
        style={{
          marginTop: 20,
          padding: "10px 18px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        Ingresar con Google / Sign in with Google
      </button>
    </main>
  );
}
