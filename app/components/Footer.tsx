export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8 text-sm text-gray-600 text-center">
        <p className="mb-4">
          Qabum™ does not constitute a financial entity or promote financial products.
          All activity occurs within its private platform under ethical agreements between independent parties.
          Qabum™ no constituye una entidad financiera ni promociona productos financieros.
          Toda la actividad se desarrolla dentro de su plataforma privada, bajo acuerdos éticos entre partes independientes.
        </p>

        {/* Enlaces a redes: solo nombres y centrados */}
        <nav className="flex items-center justify-center gap-6">
          <a href="https://instagram.com/qabum_tm" target="_blank" rel="noreferrer noopener">Instagram</a>
          <a href="https://x.com/qabum_tm" target="_blank" rel="noreferrer noopener">X</a>
          <a href="https://www.tiktok.com/@qabum_tm" target="_blank" rel="noreferrer noopener">TikTok</a>
          <a href="https://www.facebook.com/share/1My9xB9Gx1/" target="_blank" rel="noreferrer noopener">Facebook</a>
        </nav>
      </div>
    </footer>
  );
}
