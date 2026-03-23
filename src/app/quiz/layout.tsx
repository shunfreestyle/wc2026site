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
