import type { Metadata } from "next";
import { getJ1TeamById } from "@/data/j1-teams";
import { getJ2J3TeamById } from "@/data/j2j3-teams";
import { getStadiumByTeamId } from "@/data/j1-stadiums";

type Props = { params: Promise<{ teamId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { teamId } = await params;
  const j1Team = getJ1TeamById(teamId);
  const j2j3Team = getJ2J3TeamById(teamId);
  const team = j1Team || j2j3Team;
  const stadium = getStadiumByTeamId(teamId);

  if (!team) return { title: "スタジアム情報が見つかりません" };

  const teamName = team.shortName;
  const stadiumName = stadium?.nameJa ?? "ホームスタジアム";
  const title = `${stadiumName}（${teamName}のホーム）`;
  const description = `${teamName}のホームスタジアム「${stadiumName}」の情報。収容人数・アクセス・施設情報を紹介。`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://samurai-football.jp/jleague/team/${teamId}/stadium`,
    },
  };
}

export default function StadiumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
