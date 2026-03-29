import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本代表ユニフォーム",
  description:
    "2026 FIFAワールドカップ各国代表ユニフォームまとめ。日本代表をはじめ出場国のホーム・アウェイユニフォームを紹介。購入リンク付き。",
  openGraph: {
    title: "日本代表ユニフォーム | SAMURAI FOOTBALL",
    description:
      "2026 FIFAワールドカップ各国代表ユニフォームまとめ。日本代表をはじめ出場国のホーム・アウェイユニフォームを紹介。",
    url: "https://samurai-football.jp/japan/uniform",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "日本代表ユニフォーム | SAMURAI FOOTBALL",
    description:
      "2026 FIFAワールドカップ各国代表ユニフォームまとめ。購入リンク付き。",
  },
  alternates: {
    canonical: "https://samurai-football.jp/japan/uniform",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
