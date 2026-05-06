import type { Metadata } from "next";
import { Archivo_Black, Barlow, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const barlow = Barlow({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Dial Funghi — Salse e Funghi Trentini",
  description:
    "Dal 1992 a Pergine Valsugana. Fior di Funghi, porcini secchi, condimenti e box regalo dal bosco trentino alla tua tavola.",
  keywords: ["funghi", "porcini", "tartufo", "trentino", "salse", "condimenti", "dial funghi"],
  openGraph: {
    title: "Dial Funghi",
    description: "Dal bosco trentino alla tua tavola. Dal 1992.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${archivoBlack.variable} ${barlow.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
