import type { Metadata } from "next";
import { getJ1TeamById } from "@/data/j1-teams";
import { getJ2J3TeamById } from "@/data/j2j3-teams";
import { getManagerByTeamId } from "@/data/j1-managers";

type Props = { params: Promise<{ teamId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { teamId } = await params;
  const j1Team = getJ1TeamById(teamId);
  const j2j3Team = getJ2J3TeamById(teamId);
  const team = j1Team || j2j3Team;
  const manager = getManagerByTeamId(teamId);

  if (!team) return { title: "監督情報が見つかりません" };

  const teamName = team.shortName;
  const managerName = manager?.nameJa ?? "監督";
  const title = `${managerName}（${teamName}監督）`;
  const description = `${teamName}の監督${managerName}のプロフィール・経歴・戦術スタイルを紹介。`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://samurai-football.jp/jleague/team/${teamId}/manager`,
    },
  };
}

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
