import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Qabum™",
  description: "Qabum™ – Ethical Reputational Commerce",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "any" }
    ],
    shortcut: ["/favicon.png"],
    apple: ["/icon.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fallbacks explícitos para forzar favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="description" content="Qabum™ – Ethical Reputational Commerce" />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
