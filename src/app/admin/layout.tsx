import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin | TF Ambiental",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
