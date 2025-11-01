export default function Home() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold">Qabum™</h1>
      <a href="/api/auth/signin" className="mt-6 inline-block rounded bg-blue-600 px-6 py-2 text-white">
        Ingresar con Google / Sign in with Google
      </a>
    </main>
  );
}
