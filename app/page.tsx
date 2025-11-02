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

      {/* Logo centrado */}
      <div className="mt-8 mb-6">
        <Image
          src="/qabum-logo.png"
          alt="Qabum logo"
          width={256}
          height={256}
          priority
        />
      </div>

      <p className="mt-2 max-w-3xl text-sm md:text-base text-gray-600">
        Qabum™ does not constitute a financial entity or promote financial products. All
        activity occurs within its private platform under ethical agreements between
        independent parties. Qabum™ no constituye una entidad financiera ni promociona
        productos financieros. Toda la actividad se desarrolla dentro de su plataforma
        privada, bajo acuerdos éticos entre partes independientes.
      </p>
    </main>
  );
}
