"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useLanguage } from "@/contexts/LanguageContext";

const GA_ID = "G-CBL9ZRXVZB";
const ADSENSE_ID = "ca-pub-8002835345271569";

export function useConsent() {
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    const v = localStorage.getItem("sf-cookie-consent");
    setConsented(v === "accepted");
  }, []);

  return consented;
}

export function ConsentScripts() {
  const consented = useConsent();

  if (!consented) return null;

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("sf-cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("sf-cookie-consent", "accepted");
    setVisible(false);
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-t border-gray-700 px-4 py-4 sm:py-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-gray-300 leading-relaxed">
          {locale === "en"
            ? "This site uses cookies (Google AdSense, Google Analytics, etc.). By continuing to use this site, you consent to the use of cookies. See our "
            : "当サイトではCookie（Google AdSense・Google Analytics等）を使用しています。サイトの利用を続けることで、Cookieの使用に同意したものとみなします。詳しくは"}
          <Link
            href="/privacy"
            className="text-[#6ea8fe] hover:underline mx-1"
          >
            {locale === "en" ? "Privacy Policy" : "プライバシーポリシー"}
          </Link>
          {locale === "en" ? "for details." : "をご覧ください。"}
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 bg-[#003087] text-white text-sm font-semibold rounded-lg hover:bg-[#0050c8] transition-colors cursor-pointer"
        >
          {locale === "en" ? "Accept" : "同意する"}
        </button>
      </div>
    </div>
  );
}
