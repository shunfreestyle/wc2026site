import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    default: "SAMURAI FOOTBALL | Follow Samurai Blue at 2026 World Cup",
    template: "%s | SAMURAI FOOTBALL",
  },
  description:
    "The ultimate guide to Japan national team (Samurai Blue) and the 2026 FIFA World Cup. Player profiles, match schedules, and team info in 11 languages.",
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
    title: "SAMURAI FOOTBALL | 2026 FIFA World Cup",
    description:
      "Follow Samurai Blue and all 48 nations at the 2026 FIFA World Cup.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMURAI FOOTBALL",
    description: "Follow Samurai Blue at the 2026 FIFA World Cup",
  },
  alternates: {
    canonical: "https://samurai-football.jp",
    languages: {
      ja: "https://samurai-football.jp",
      en: "https://samurai-football.jp",
      "x-default": "https://samurai-football.jp",
    },
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8002835345271569"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CBL9ZRXVZB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CBL9ZRXVZB');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#f8f9fa]">
        <LanguageProvider>
          <HtmlLangSync />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
