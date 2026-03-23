import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Football Quiz — Japan & World Cup 2026 | SAMURAI FOOTBALL",
  description:
    "Test your knowledge of the Japan national team and the 2026 FIFA World Cup with our multilingual quiz.",
  alternates: {
    canonical: "https://samurai-football.jp/quiz",
    languages: {
      ja: "https://samurai-football.jp/quiz",
      en: "https://samurai-football.jp/quiz",
      de: "https://samurai-football.jp/quiz",
      fr: "https://samurai-football.jp/quiz",
      es: "https://samurai-football.jp/quiz",
      it: "https://samurai-football.jp/quiz",
      pt: "https://samurai-football.jp/quiz",
      nl: "https://samurai-football.jp/quiz",
      pl: "https://samurai-football.jp/quiz",
      ru: "https://samurai-football.jp/quiz",
      tr: "https://samurai-football.jp/quiz",
      "x-default": "https://samurai-football.jp/quiz",
    },
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
