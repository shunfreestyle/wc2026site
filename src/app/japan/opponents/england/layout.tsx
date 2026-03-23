import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "England National Team | SAMURAI FOOTBALL",
  description:
    "England national team squad, players, and match info for the 2026 FIFA World Cup. Manager, FIFA ranking, and full squad list.",
  alternates: {
    canonical: "https://samurai-football.jp/japan/opponents/england",
    languages: {
      ja: "https://samurai-football.jp/japan/opponents/england",
      en: "https://samurai-football.jp/japan/opponents/england",
      "x-default": "https://samurai-football.jp/japan/opponents/england",
    },
  },
};

export default function EnglandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
