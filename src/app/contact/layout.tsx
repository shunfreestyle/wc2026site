import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | SAMURAI FOOTBALL",
  description: "SAMURAI FOOTBALLへのお問い合わせフォーム。ご質問・ご意見・ご要望はこちらからお送りください。",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
