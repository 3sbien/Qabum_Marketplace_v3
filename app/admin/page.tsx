export default function AdminPage() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-semibold mb-4">Qabum Admin – MVP</h1>
      <p className="mb-2">
        Esta es la página de administración básica de Qabum Marketplace v3.
      </p>
      <p className="mb-6">
        Primero necesitábamos que <code>/admin</code> existiera y compilara sin
        errores. Más adelante aquí añadiremos el acceso con Google y el panel
        real de subtiendas y ventas.
      </p>
    </main>
  );
}
