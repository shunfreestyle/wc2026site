import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "イングランド代表 | 2026年W杯グループF対戦相手",
  description:
    "2026年FIFAワールドカップで日本と同組のイングランド代表情報。監督・FIFAランキング・選手一覧・過去の対戦成績。",
  alternates: {
    canonical: "https://samurai-football.jp/japan/opponents/england",
  },
};

export default function EnglandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
