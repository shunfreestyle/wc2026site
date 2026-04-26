import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本代表（サムライブルー）| 2026年W杯メンバー・試合日程",
  description:
    "2026年FIFAワールドカップに挑む日本代表（サムライブルー）の選手一覧・試合日程・グループF情報。最新の招集メンバーや戦術分析も。",
  alternates: {
    canonical: "https://samurai-football.jp/japan",
  },
};

export default function JapanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
