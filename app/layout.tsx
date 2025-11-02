import "./globals.css";
import Footer from "./components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Qabum™",
  description: "Qabum™ – Ethical Reputational Commerce",
  icons: {
    icon: [{ url: "/icon.png?v=3", type: "image/png" }],
    shortcut: ["/icon.png?v=3"],
    apple: ["/icon.png?v=3"],
  },
  openGraph: {
    title: "Qabum™",
    description: "Qabum™ – Ethical Reputational Commerce",
    url: "https://qabum-marketplace-v3.vercel.app",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
