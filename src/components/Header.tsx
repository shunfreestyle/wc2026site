"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "ホーム" },
  { href: "/teams", label: "出場チーム" },
  { href: "/matches", label: "試合日程" },
  { href: "/japan", label: "🇯🇵 日本代表" },
  { href: "/japan/uniform", label: "ユニフォーム" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#1A1A2E] via-[#0057A8] to-[#1A1A2E] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
            <span className="text-xl sm:text-2xl">⚽</span>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight leading-none">FIFA World Cup</h1>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest">
                <span className="text-[#E8192C]">USA</span> | <span className="text-[#00843D]">MEX</span> | <span className="text-white">CAN</span> 2026
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition-colors"
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
          </nav>
        </div>
      )}
    </header>
  );
}
