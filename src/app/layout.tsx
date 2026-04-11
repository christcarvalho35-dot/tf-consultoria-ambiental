import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/site.webmanifest",
  title: "TF Ambiental | TF Consultoria Ambiental",
  description:
    "Licenciamento ambiental, inventário florestal, georreferenciamento e estudos ambientais em todo o Brasil.",
  keywords:
    "licenciamento ambiental, inventário florestal, georreferenciamento, EIA RIMA, CAR, Goiás, Minas Gerais, São Paulo, Mato Grosso, Tocantins, Pará, Rio Grande do Norte, consultoria ambiental, Brasil",
  openGraph: {
    title: "TF Ambiental | TF Consultoria Ambiental",
    description:
      "Soluções ambientais completas com atuação em todo o Brasil. Licenciamento, florestal, geotecnologias e mais.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
