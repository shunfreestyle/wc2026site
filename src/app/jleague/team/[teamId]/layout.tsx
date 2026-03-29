import type { Metadata } from "next";
import { getJ1TeamById } from "@/data/j1-teams";
import { getJ2J3TeamById } from "@/data/j2j3-teams";

type Props = {
  params: Promise<{ teamId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { teamId } = await params;
  const j1 = getJ1TeamById(teamId);
  const j2j3 = getJ2J3TeamById(teamId);
  const team = j1 || j2j3;

  if (!team) {
    return { title: "チームが見つかりません" };
  }

  const league = j1 ? "J1" : "J2/J3";
  const title = `${team.fullName}（${team.fullNameEn}）- ${league}リーグ 2026`;
  const description = `${team.fullName}の選手一覧・試合結果・シーズン成績。${team.stadium}を本拠地とする${team.prefecture}${team.city}のクラブ。`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | SAMURAI FOOTBALL`,
      description,
      url: `https://samurai-football.jp/jleague/team/${teamId}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${title} | SAMURAI FOOTBALL`,
      description,
    },
    alternates: {
      canonical: `https://samurai-football.jp/jleague/team/${teamId}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
