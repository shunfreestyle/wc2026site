import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent, { ConsentScripts } from "@/components/CookieConsent";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HtmlLangSync from "@/components/HtmlLangSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SAMURAI FOOTBALL | Unofficial 2026 World Cup Fan Site",
    template: "%s | SAMURAI FOOTBALL",
  },
  description:
    "Unofficial fan site covering Japan national team and the 2026 FIFA World Cup. Player profiles, match schedules, and team info. Not affiliated with FIFA or JFA.",
  keywords: [
    "Japan national team",
    "Samurai Blue",
    "2026 World Cup",
    "FIFA World Cup",
    "日本代表",
    "サムライブルー",
    "ワールドカップ",
  ],
  openGraph: {
    siteName: "SAMURAI FOOTBALL",
    type: "website",
    url: "https://samurai-football.jp",
    title: "SAMURAI FOOTBALL | Unofficial 2026 FIFA World Cup Fan Site",
    description:
      "Unofficial fan site covering Japan national team and all 48 nations at the 2026 FIFA World Cup. Not affiliated with FIFA or JFA.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMURAI FOOTBALL — Unofficial Fan Site",
    description: "Unofficial fan site covering Japan national team and the 2026 FIFA World Cup. Not affiliated with FIFA or JFA.",
  },
  alternates: {
    canonical: "https://samurai-football.jp",
    languages: {
      ja: "https://samurai-football.jp",
      en: "https://samurai-football.jp",
      "x-default": "https://samurai-football.jp",
    },
  },
  verification: {
    google: "OVov4qyr90K3Eb29v_zwIWa8R78SCkd6lBfMXKrGS24",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f9fa]">
        <LanguageProvider>
          <HtmlLangSync />
          <ConsentScripts />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
