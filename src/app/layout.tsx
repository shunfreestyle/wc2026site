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
    default: "サムライフットボール | Jリーグ & 日本サッカー情報サイト",
    template: "%s | サムライフットボール",
  },
  description:
    "Jリーグ（J1・J2・J3）の試合日程カレンダー、クラブ情報、日本サッカーの最新情報をお届けする情報サイト。",
  keywords: [
    "サムライフットボール",
    "Jリーグ",
    "J1リーグ",
    "J2リーグ",
    "J3リーグ",
    "日本サッカー",
    "試合日程",
    "天皇杯",
    "ルヴァンカップ",
    "日本代表",
  ],
  openGraph: {
    siteName: "サムライフットボール",
    type: "website",
    url: "https://samurai-football.jp",
    title: "サムライフットボール | Jリーグ & 日本サッカー情報サイト",
    description:
      "Jリーグの試合日程カレンダー、クラブ情報、日本サッカーの最新情報をお届けする情報サイト。",
    locale: "ja_JP",
    images: [
      {
        url: "https://samurai-football.jp/og-image.png",
        width: 1200,
        height: 630,
        alt: "サムライフットボール",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@samuraifootball",
    title: "サムライフットボール — Jリーグ & 日本サッカー情報サイト",
    description: "Jリーグの試合日程カレンダー、クラブ情報、日本サッカーの最新情報をお届けする情報サイト。",
    images: ["https://samurai-football.jp/og-image.png"],
  },
  alternates: {
    canonical: "https://samurai-football.jp",
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
  manifest: "/manifest.json",
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
