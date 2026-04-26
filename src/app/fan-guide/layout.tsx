import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "W杯2026 現地観戦 完全ガイド | SAMURAI FOOTBALL",
  description:
    "FIFA ワールドカップ 2026 現地観戦の完全ガイド。FIFA公式ドキュメントに基づくスタジアムルール、持ち込み禁止物、チケット規則、ファンゾーン情報を網羅。",
  robots: { index: false, follow: false },
};

export default function FanGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
