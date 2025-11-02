// app/layout.tsx
import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  metadataBase: new URL("https://qabum-marketplace-v3.vercel.app"),
  alternates: { canonical: "/" },
  title: "Qabum™",
  description: "Qabum™ – Ethical Reputational Commerce",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    // Si más adelante subes el apple-icon.png (180x180), descomenta:
    // apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Qabum™",
    description: "Qabum™ – Ethical Reputational Commerce",
    url: "/",
    siteName: "Qabum™",
    images: [{ url: "/qabum-logo.png", width: 512, height: 512 }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Qabum™",
    description: "Qabum™ – Ethical Reputational Commerce",
    images: ["/qabum-logo.png"],
  },
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fallbacks explícitos para navegadores tercos */}
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        {/* <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" /> */}
        <meta name="description" content="Qabum™ – Ethical Reputational Commerce" />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
