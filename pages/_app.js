import { SessionProvider } from "next-auth/react";
import "../src/styles/globals.css";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <a href="/"><img src="/Qabum%20logo.png" alt="Qabum" style={{ height: 32 }} /></a>
      </header>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
