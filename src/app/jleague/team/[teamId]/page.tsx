"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getJ1TeamById } from "@/data/j1-teams";

export default function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { locale } = useLanguage();
  const team = getJ1TeamById(teamId);

  if (!team) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500 text-lg">
          {locale === "en" ? "Team not found" : "チームが見つかりません"}
        </p>
        <Link href="/jleague" className="text-[#003087] font-bold mt-4 inline-block hover:underline">
          ← {locale === "en" ? "Back to J1 League" : "J1リーグに戻る"}
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.color} 0%, ${team.colorSecondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href="/jleague"
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white mb-4 transition-colors"
          >
            ← {locale === "en" ? "J1 League" : "J1リーグ"}
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold bg-white/20 backdrop-blur-sm"
            >
              {team.shortName.slice(0, 2)}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                {team.fullName}
              </h1>
              <p className="text-white/70 text-sm mt-1">{team.fullNameEn}</p>
              {team.isOriginal10 && (
                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 tracking-wide">
                  ORIGINAL 10
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team info summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: locale === "en" ? "Prefecture" : "拠点", value: `${team.prefecture} ${team.city}`, link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(team.stadium)}`, external: true, cta: locale === "en" ? "Open Map" : "地図を見る" },
            { label: locale === "en" ? "Founded" : "創設", value: `${team.founded}年` },
            { label: locale === "en" ? "Stadium" : "スタジアム", value: team.stadium, link: `/jleague/team/${team.id}/stadium`, cta: locale === "en" ? "View details" : "詳しく見る" },
            { label: locale === "en" ? "Manager" : "監督", value: team.manager, link: `/jleague/team/${team.id}/manager`, cta: locale === "en" ? "View profile" : "プロフィール" },
          ].map((item) => {
            if (!item.link) {
              return (
                <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.value}</p>
                </div>
              );
            }
            const cardInner = (
              <>
                <div
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: team.color }}
                />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">
                  {item.value}
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold tracking-wide opacity-70 group-hover:opacity-100 transition-all"
                  style={{ color: team.color }}
                >
                  {item.cta}
                  {item.external ? (
                    <svg className="w-3.5 h-3.5 translate-y-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </span>
              </>
            );
            const cardClass = "group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-lg hover:border-transparent hover:ring-2 transition-all duration-200 overflow-hidden";
            const cardStyle = { "--tw-ring-color": team.color } as React.CSSProperties;
            return item.external ? (
              <a key={item.label} href={item.link} target="_blank" rel="noopener noreferrer" className={cardClass} style={cardStyle}>
                {cardInner}
              </a>
            ) : (
              <Link key={item.label} href={item.link} className={cardClass} style={cardStyle}>
                {cardInner}
              </Link>
            );
          })}
        </div>

        {/* Coming soon section */}
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 p-10 sm:p-16 text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
            {locale === "en" ? "Coming Soon" : "準備中"}
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            {locale === "en"
              ? "Detailed team information including squad, season results, and match history is currently being prepared."
              : "選手一覧・シーズン成績・試合履歴など、詳しいチーム情報を現在準備中です。"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/stamen?team=${team.id}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: team.color }}
            >
              {locale === "en" ? "Try Starting Lineup Maker" : "スタメンメーカーで遊ぶ"} ⚽
            </Link>
            <a
              href={team.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {locale === "en" ? "Official Site" : "公式サイト"} ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
