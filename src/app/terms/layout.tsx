import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 | SAMURAI FOOTBALL",
  description:
    "SAMURAI FOOTBALLの利用規約。当サイトをご利用いただく際の条件について。",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
