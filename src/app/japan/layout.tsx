import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japan National Team — Samurai Blue | SAMURAI FOOTBALL",
  description:
    "Japan national team (Samurai Blue) squad, players, and matches at the 2026 FIFA World Cup. Group F coverage.",
  alternates: {
    canonical: "https://samurai-football.jp/japan",
    languages: {
      ja: "https://samurai-football.jp/japan",
      en: "https://samurai-football.jp/japan",
      de: "https://samurai-football.jp/japan",
      fr: "https://samurai-football.jp/japan",
      es: "https://samurai-football.jp/japan",
      it: "https://samurai-football.jp/japan",
      pt: "https://samurai-football.jp/japan",
      nl: "https://samurai-football.jp/japan",
      pl: "https://samurai-football.jp/japan",
      ru: "https://samurai-football.jp/japan",
      tr: "https://samurai-football.jp/japan",
      "x-default": "https://samurai-football.jp/japan",
    },
  },
};

export default function JapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
