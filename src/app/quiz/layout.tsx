import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サッカークイズ | 日本代表・W杯2026",
  description:
    "日本代表と2026年FIFAワールドカップに関するクイズに挑戦！サッカー知識を試そう。",
  alternates: {
    canonical: "https://samurai-football.jp/quiz",
  },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
