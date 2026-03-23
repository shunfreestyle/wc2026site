import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Teams — 48 Nations | SAMURAI FOOTBALL",
  description:
    "All 48 teams competing at the 2026 FIFA World Cup. Group stage draw, squads, coaches, and FIFA rankings.",
  alternates: {
    canonical: "https://samurai-football.jp/teams",
    languages: {
      ja: "https://samurai-football.jp/teams",
      en: "https://samurai-football.jp/teams",
      de: "https://samurai-football.jp/teams",
      fr: "https://samurai-football.jp/teams",
      es: "https://samurai-football.jp/teams",
      it: "https://samurai-football.jp/teams",
      pt: "https://samurai-football.jp/teams",
      nl: "https://samurai-football.jp/teams",
      pl: "https://samurai-football.jp/teams",
      ru: "https://samurai-football.jp/teams",
      tr: "https://samurai-football.jp/teams",
      "x-default": "https://samurai-football.jp/teams",
    },
  },
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
