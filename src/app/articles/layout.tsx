import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "記事一覧 | SAMURAI FOOTBALL",
  description:
    "日本代表・W杯・Jリーグに関する最新記事・コラムをお届け。試合レビュー、選手紹介、戦術分析など幅広くカバー。",
  alternates: {
    canonical: "https://samurai-football.jp/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
