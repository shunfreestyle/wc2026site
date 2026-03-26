import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免責事項・著作権について | SAMURAI FOOTBALL",
  description:
    "SAMURAI FOOTBALLの免責事項、著作権・商標に関する方針、データ出典元一覧。",
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
