import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'スタメンメーカー',
  description:
    '日本代表28名でスタメンを組んでシェアしよう！フォーメーション選択から選手配置まで簡単操作。',
  openGraph: {
    title: 'スタメンメーカー | SAMURAI FOOTBALL',
    description:
      '日本代表28名でスタメンを組んでシェアしよう！フォーメーション選択から選手配置まで簡単操作。',
    url: 'https://samurai-football.jp/stamen',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'スタメンメーカー | SAMURAI FOOTBALL',
    description:
      '日本代表28名でスタメンを組んでシェアしよう！フォーメーション選択から選手配置まで簡単操作。',
  },
  alternates: {
    canonical: 'https://samurai-football.jp/stamen',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
