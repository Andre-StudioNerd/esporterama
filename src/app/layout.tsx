import type { Metadata } from "next";
import { Fjalla_One, Work_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/layout/ui/header";
import ScrollToTop from "@/layout/ui/scroll-to-top";

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Esporterama | Descubra o melhor do esporte",
  description: "Descubra o melhor do esporte",
  icons: {
    icon: "/favicon.png", // ou '/favicon.png', '/icon.svg', etc.
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fjallaOne.variable} ${workSans.variable} antialiased`}
      >
        <Providers>
          <ScrollToTop />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
