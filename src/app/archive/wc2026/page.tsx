import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIFA W杯 2026 アーカイブ",
  description:
    "2026年FIFAワールドカップ（アメリカ・メキシコ・カナダ）の全試合結果、トーナメント表、出場国情報をまとめたアーカイブページ。",
  alternates: {
    canonical: "https://samurai-football.jp/archive/wc2026",
  },
};

const SECTIONS = [
  {
    title: "試合結果",
    links: [
      { href: "/matches", label: "全104試合 日程・結果", desc: "グループステージからファイナルまで" },
      { href: "/bracket", label: "トーナメント表", desc: "決勝トーナメントの対戦表" },
    ],
  },
  {
    title: "日本代表",
    links: [
      { href: "/japan", label: "日本代表ページ", desc: "サムライブルーの戦績" },
      { href: "/japan/matches", label: "日本代表 全試合", desc: "グループステージ〜の詳細" },
    ],
  },
  {
    title: "出場国・チーム",
    links: [
      { href: "/teams", label: "出場48カ国一覧", desc: "グループ別の出場国情報" },
    ],
  },
  {
    title: "スタジアム・開催都市",
    links: [
      { href: "/fan-guide", label: "観戦ガイド", desc: "開催都市・スタジアム情報" },
    ],
  },
  {
    title: "ニュース・記事",
    links: [
      { href: "/articles", label: "ニュース記事一覧", desc: "大会期間中の記事アーカイブ" },
    ],
  },
];

export default function WC2026ArchivePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-gray-400 tracking-widest mb-2">ARCHIVE</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          FIFA W杯 2026
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          2026年6月11日〜7月19日にアメリカ・メキシコ・カナダで開催されたFIFAワールドカップの記録をまとめたアーカイブです。
        </p>
        <div className="flex justify-center gap-3 mt-4 text-xs text-gray-400">
          <span>48カ国</span>
          <span>|</span>
          <span>16都市</span>
          <span>|</span>
          <span>104試合</span>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
                >
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#003087] transition-colors">
                    {link.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Back to home */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← ホームに戻る
        </Link>
      </div>
    </div>
  );
}
