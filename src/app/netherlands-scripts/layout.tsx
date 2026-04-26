import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "オランダ代表 選手紹介ショート台本 | とやっちFC観戦部",
  description:
    "W杯2026 オランダ代表選手の60秒ショート動画用プレーンテキスト台本集。非公開資料。",
  robots: { index: false, follow: false },
};

export default function NetherlandsScriptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
