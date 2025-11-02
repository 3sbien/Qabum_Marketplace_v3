import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Solo el logo (sin texto Qabum™) */}
      <div className="mt-6 mb-4">
        <Image
          src="/qabum-logo.png"
          alt="Qabum logo"
          width={256}
          height={256}
          priority
          className="mx-auto md:translate-x-2"
        />
      </div>

      {/* Botón debajo del logo */}
      <a href="/api/auth/signin" className="btn-primary mt-2 inline-block">
        Ingresar con Google / Sign in with Google
      </a>
    </main>
  );
}
