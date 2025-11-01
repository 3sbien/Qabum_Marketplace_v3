import "./globals.css";
import Footer from "./components/Footer";

export const metadata = {
  title: "Qabum™",
  description: "Ethical closed environment for commerce and reputation.",
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
