import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本代表スカッドクイズ | W杯2026",
  description:
    "2026年FIFAワールドカップ日本代表メンバーに関するクイズ。レベル別に挑戦できるサッカークイズ。",
  alternates: {
    canonical: "https://samurai-football.jp/quiz/japan-squad",
  },
};

export default function JapanSquadQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
