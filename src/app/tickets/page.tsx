import type { Metadata } from "next";
import TicketsClient from "@/components/TicketsClient";

export const metadata: Metadata = {
  title: "チケット比較 | 決勝トーナメント",
  description:
    "2026 FIFAワールドカップ決勝トーナメントのリセールチケットをStubHub・SeatGeek・Gametimeで比較。ラウンド32から決勝まで全32試合。",
};

export default function TicketsPage() {
  return <TicketsClient />;
}
