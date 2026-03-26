import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営者情報・編集方針 | SAMURAI FOOTBALL",
  description:
    "SAMURAI FOOTBALLの運営者情報、編集方針、サイトの目的について。",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
