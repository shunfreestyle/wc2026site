import type { Metadata } from "next";
import { getJapanMatchById } from "@/data/japan-matches";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = getJapanMatchById(id);

  if (!match) {
    return { title: "試合が見つかりません" };
  }

  const title = `${match.home.nameJa} ${match.home.score}-${match.away.score} ${match.away.nameJa}（${match.competition}）`;
  const description = `${match.date} ${match.venue}（${match.city}）で行われた${match.competition}、${match.home.nameJa} vs ${match.away.nameJa}の試合詳細。フォーメーション・得点経過・スタメン・交代情報。`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | SAMURAI FOOTBALL`,
      description,
      url: `https://samurai-football.jp/japan/matches/${id}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${title} | SAMURAI FOOTBALL`,
      description,
    },
    alternates: {
      canonical: `https://samurai-football.jp/japan/matches/${id}`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
