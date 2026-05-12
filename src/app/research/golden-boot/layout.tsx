import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "W杯2026 得点王候補リサーチ | とやっちFC観戦部",
  description:
    "2026 FIFAワールドカップ 得点王候補のAIリサーチ資料。GS組み合わせから逆算した独自視点の分析。非公開。",
  robots: { index: false, follow: false },
};

export default function GoldenBootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
