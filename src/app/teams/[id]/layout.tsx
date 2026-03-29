import type { Metadata } from "next";
import { getTeamById } from "@/data/teams";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const team = getTeamById(id);

  if (!team) {
    return {
      title: "チームが見つかりません",
    };
  }

  const title = `${team.nameJa} | 出場チーム | SAMURAI FOOTBALL`;
  const description = `${team.nameJa}（${team.name}）の2026 FIFAワールドカップ情報。グループ${team.group}所属、FIFAランキング${team.fifaRanking}位。選手一覧・試合日程・チーム概要を掲載。`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://samurai-football.jp/teams/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://samurai-football.jp/teams/${id}`,
    },
  };
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
