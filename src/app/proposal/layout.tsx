import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "W杯2026 スポンサーシップ提案書 | とやっちFC",
  description:
    "FIFA ワールドカップ 2026 × 完全栄養食ブランド向けスポンサーシップ提案資料。サムライフットボール（月間PV○○万）を活用したタイアッププランのご案内。",
  robots: { index: false, follow: false },
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
