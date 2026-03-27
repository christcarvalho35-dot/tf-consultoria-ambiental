import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TF Ambiental | TF Consultoria Ambiental",
  description:
    "Licenciamento ambiental, inventário florestal, georreferenciamento e estudos ambientais em Aparecida de Goiânia e região.",
  keywords:
    "licenciamento ambiental, inventário florestal, georreferenciamento, EIA RIMA, CAR, Goiás, consultoria ambiental",
  openGraph: {
    title: "TF Ambiental | TF Consultoria Ambiental",
    description:
      "Soluções ambientais completas em Aparecida de Goiânia/GO. Licenciamento, florestal, geotecnologias e mais.",
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
