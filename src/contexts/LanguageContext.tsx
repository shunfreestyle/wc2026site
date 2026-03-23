"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Locale, Translations } from "@/types/i18n";
import { translations } from "@/i18n/translations";

const STORAGE_KEY = "sf-locale";

const VALID_LOCALES: Locale[] = ["ja", "en", "de", "fr", "es", "it", "pt", "nl", "pl", "ru", "tr"];

function detectLocale(): Locale {
  if (typeof window === "undefined") return "ja";
  const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (saved && VALID_LOCALES.includes(saved)) return saved;
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("pt")) return "pt";
  if (lang.startsWith("nl")) return "nl";
  if (lang.startsWith("pl")) return "pl";
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("tr")) return "tr";
  if (lang.startsWith("en")) return "en";
  return "ja";
}

interface LanguageContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "ja",
  t: translations["ja"],
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ja");

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
