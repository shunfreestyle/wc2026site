import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "J2・J3リーグ 2026 | クラブ一覧",
  description:
    "2026年シーズンJ2リーグ・J3リーグの全クラブ情報。チーム一覧・監督・スタジアム情報を網羅。",
  alternates: {
    canonical: "https://samurai-football.jp/jleague/j2j3",
  },
};

export default function J2J3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
