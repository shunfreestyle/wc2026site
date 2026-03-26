import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | SAMURAI FOOTBALL",
  description: "SAMURAI FOOTBALLのプライバシーポリシー。個人情報の取り扱いについて。",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
