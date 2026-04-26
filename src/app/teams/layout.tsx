import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "出場国一覧（全48カ国）| 2026年FIFAワールドカップ",
  description:
    "2026年FIFAワールドカップ出場全48カ国の情報。グループステージ組み合わせ・監督・FIFAランキング・注目選手を網羅。",
  alternates: {
    canonical: "https://samurai-football.jp/teams",
  },
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
