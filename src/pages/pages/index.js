import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Home() {
  const [lang, setLang] = useState("es");
  const t = {
    es: {
      title: "Qabum™ Marketplace",
      desc: "Este es el MVP oficial de demostración.",
      login: "Ingresar con Google"
    },
    en: {
      title: "Qabum™ Marketplace",
      desc: "This is the official MVP demo.",
      login: "Sign in with Google"
    }
  }[lang];

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button onClick={() => setLang("es")}>ES</button>
        <button onClick={() => setLang("en")}>EN</button>
      </div>

      <h1>{t.title}</h1>
      <p>{t.desc}</p>

      <button onClick={() => signIn("google")}>{t.login}</button>
    </main>
  );
}
