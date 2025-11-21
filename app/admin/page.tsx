"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Verificando acceso…</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold mb-4">Qabum Admin</h1>
        <p className="mb-4">
          Para acceder al panel necesitas iniciar sesión con Google.
        </p>
        <button
          onClick={() => signIn("google")}
          className="btn-primary mt-2 inline-block"
        >
          Ingresar con Google
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-semibold mb-2">Qabum Admin – MVP</h1>
      <p className="mb-4">
        Has iniciado sesión como{" "}
        <span className="font-medium">{session.user?.email}</span>.
      </p>
      <p className="mb-6">
        Aquí irá el panel real para crear, editar y gestionar subtiendas.
      </p>
      <button onClick={() => signOut()} className="btn-secondary">
        Cerrar sesión
      </button>
    </main>
  );
}
