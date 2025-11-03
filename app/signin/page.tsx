// app/signin/page.tsx
"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

/**
 * Página silenciosa:
 * - Se monta y llama a Google de inmediato
 * - No muestra UI ni intermedios
 */
export default function SilentSignIn() {
  useEffect(() => {
    // Redirige directo a Google, y al volver cae en tu home (/)
    signIn("google", { callbackUrl: "/" });
  }, []);

  // Opcional: un fallback mínimo por si el navegador tarda 1s
  return null;
}
