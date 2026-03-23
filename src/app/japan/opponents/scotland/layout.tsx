import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scotland National Team | SAMURAI FOOTBALL",
  description:
    "Scotland national team squad, players, and match info for the 2026 FIFA World Cup. Manager, FIFA ranking, and full squad list.",
  alternates: {
    canonical: "https://samurai-football.jp/japan/opponents/scotland",
    languages: {
      ja: "https://samurai-football.jp/japan/opponents/scotland",
      en: "https://samurai-football.jp/japan/opponents/scotland",
      "x-default": "https://samurai-football.jp/japan/opponents/scotland",
    },
  },
};

export default function ScotlandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
