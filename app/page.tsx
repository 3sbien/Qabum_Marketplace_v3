import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
        Qabum™
      </h1>

      <a href="/api/auth/signin" className="btn-primary mt-2 inline-block">
        Ingresar con Google / Sign in with Google
      </a>

      {/* Logo centrado (ligeramente ajustado a la derecha) */}
      <div className="mt-10 mb-2">
        <Image
          src="/qabum-logo.png"
          alt="Qabum logo"
          width={256}
          height={256}
          priority
          className="mx-auto md:translate-x-2"
        />
      </div>
      {/* Quitamos el párrafo aquí para no duplicar el texto; queda solo en el footer */}
    </main>
  );
}
