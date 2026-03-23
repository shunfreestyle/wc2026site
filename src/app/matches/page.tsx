import type { Metadata } from "next";
import MatchesClient from "@/components/MatchesClient";

export const metadata: Metadata = {
  title: "試合日程・結果",
  description: "2026年FIFAワールドカップ全104試合の日程と結果",
};

export default function MatchesPage() {
  return <MatchesClient />;
}
