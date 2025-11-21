import Image from "next/image";

export default function AdminPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
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

      <h1 className="text-3xl font-semibold mb-4">Qabum Admin – MVP</h1>

      <p className="mb-4">
        Esta es la página de administración básica de Qabum Marketplace v3.
        Primero necesitábamos que <code>/admin</code> existiera y compilara sin
        errores. Más adelante aquí añadiremos el panel real de subtiendas y
        ventas.
      </p>

      <a
        href="/api/auth/signin"
        className="btn-primary mt-2 inline-block"
      >
        Ingresar con Google / Sign in with Google
      </a>
    </main>
  );
}
