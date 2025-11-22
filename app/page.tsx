"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Home() {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "https://qabum.com",
    });
  };

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="mt-6 mb-4 animate-float-slow animate-fade-in-up">
        <Image
          src="/qabum-logo.png"
          alt="Qabum logo"
          width={256}
          height={256}
          priority
          className="mx-auto md:translate-x-2"
        />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="btn-primary mt-2 inline-block animate-fade-in-up"
      >
        Ingresar con Google / Sign in with Google
      </button>
    </main>
  );
}
