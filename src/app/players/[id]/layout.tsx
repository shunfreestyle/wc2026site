import type { Metadata } from "next";
import { getPlayerById } from "@/data/teams";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = getPlayerById(id);

  if (!result) {
    return {
      title: "選手が見つかりません",
    };
  }

  const { player, team } = result;
  const playerName = player.nameJa || player.name;
  const teamName = team.nameJa || team.name;
  const title = `${playerName} | ${teamName}選手 | SAMURAI FOOTBALL`;
  const description = `${playerName}（${player.name}）のプロフィール。${team.nameJa}代表、ポジション: ${player.position}、所属: ${player.club}。2026 FIFAワールドカップの選手情報を掲載。`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://samurai-football.jp/players/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://samurai-football.jp/players/${id}`,
    },
  };
}

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
