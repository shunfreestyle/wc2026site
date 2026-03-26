"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Locale } from "@/types/i18n";

const LANGS: { code: Locale; flag: string; label: string }[] = [
  { code: "ja", flag: "🇯🇵", label: "JA" },
  { code: "en", flag: "🇺🇸", label: "EN" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, t, setLocale } = useLanguage();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGS.find((l) => l.code === locale);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/matches", label: t.nav.matches },
    { href: "/japan", label: t.nav.japan },
    { href: "/japan/uniform", label: t.nav.uniform },
    { href: "/articles", label: t.nav.articles },
    { href: "/quiz", label: t.nav.quiz },
  ];

  return (
    <header className="bg-gradient-to-r from-[#1A1A2E] via-[#0057A8] to-[#1A1A2E] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <span className="text-xl sm:text-2xl">⚽</span>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-none">SAMURAI FOOTBALL</h1>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest">
                <span className="text-[#E8192C]">USA</span> | <span className="text-[#00843D]">MEX</span> | <span className="text-white">CAN</span> 2026
              </p>
            </div>
          </Link>

          {/* Desktop nav + lang dropdown */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div ref={langRef} className="relative ml-3 border-l border-white/20 pl-3">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1 px-2 py-1 rounded text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>{currentLang?.flag}</span>
                <span>{currentLang?.label}</span>
                <span className="text-white/50 ml-0.5">{langOpen ? "▲" : "▼"}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1 min-w-[110px]">
                  {LANGS.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLocale(code); setLangOpen(false); }}
                      className={`flex items-center gap-2 w-full px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors cursor-pointer ${
                        locale === code ? "font-semibold text-[#003087]" : "text-gray-700"
                      }`}
                    >
                      <span>{flag}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="メニュー"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile lang switcher */}
            <div className="grid grid-cols-4 gap-1 px-4 pt-2 mt-1 border-t border-white/10">
              {LANGS.map(({ code, flag, label }) => (
                <button
                  key={code}
                  onClick={() => { setLocale(code); setMenuOpen(false); }}
                  className={`px-2 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    locale === code
                      ? "bg-white/20 text-white"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {flag} {label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
