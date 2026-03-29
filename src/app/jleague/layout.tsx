import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "J1リーグ 2026 | SAMURAI FOOTBALL",
  description:
    "2026シーズンのJ1リーグ全チーム情報。順位表、チームデータ、注目選手など、Jリーグの最新情報をまとめてチェック。",
  alternates: {
    canonical: "https://samurai-football.jp/jleague",
  },
};

export default function JLeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
