export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="font-medium">Qabum™</div>
            <p className="mt-2 leading-relaxed">
              Qabum™ no constituye una entidad financiera ni promueve productos financieros.
              Toda actividad ocurre dentro de su plataforma privada bajo acuerdos éticos entre partes independientes.
            </p>
          </div>
          <div>
            <div className="font-medium">Follow</div>
            <ul className="mt-2 space-y-1">
              <li><a href="https://www.instagram.com/qabum_tm" className="hover:underline">@qabum_tm en Instagram</a></li>
              <li><a href="https://x.com/qabum_tm" className="hover:underline">@qabum_tm en X</a></li>
              <li><a href="https://www.facebook.com/share/1My9xB9Gx1/" className="hover:underline">Facebook</a></li>
            </ul>
          </div>
          <div>
            <div className="font-medium">Newsletter</div>
            <p className="mt-2">Suscríbete para actualizaciones.</p>
            <a
              href="http://eepurl.com/i32xtY"
              className="inline-block mt-3 rounded-2xl px-4 py-2 border"
            >
              Join the newsletter
            </a>
          </div>
        </div>
        <div className="mt-8 text-xs text-neutral-500">
          © {new Date().getFullYear()} Qabum™. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
