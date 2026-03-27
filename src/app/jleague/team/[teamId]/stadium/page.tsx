"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getJ1TeamById } from "@/data/j1-teams";
import { getStadiumByTeamId } from "@/data/j1-stadiums";

export default function StadiumDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { locale } = useLanguage();
  const team = getJ1TeamById(teamId);
  const stadium = getStadiumByTeamId(teamId);

  if (!team || !stadium) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500 text-lg">
          {locale === "en" ? "Stadium not found" : "スタジアム情報が見つかりません"}
        </p>
        <Link href="/jleague" className="text-[#003087] font-bold mt-4 inline-block hover:underline">
          {locale === "en" ? "Back to J1 League" : "J1リーグに戻る"}
        </Link>
      </div>
    );
  }

  const highlightIcons = ["1", "2", "3", "4", "5"];

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.color} 0%, ${team.colorSecondary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href={`/jleague/team/${team.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white mb-4 transition-colors"
          >
            &larr; {team.fullName}
          </Link>
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl bg-white/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9 9 0 0 1 3 12c0-1.638.437-3.173 1.2-4.5" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {locale === "en" ? stadium.nameEn : stadium.nameJa}
              </h1>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                {locale === "en" ? stadium.officialNameEn : stadium.officialNameJa}
              </p>
              <p className="text-white/80 text-sm mt-2 font-medium">
                {team.fullName} {locale === "en" ? "Home Stadium" : "ホームスタジアム"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              label: locale === "en" ? "Opened" : "開場",
              value: `${stadium.opened}${locale === "en" ? "" : "年"}`,
            },
            {
              label: locale === "en" ? "Capacity" : "収容人数",
              value: `${stadium.capacity.toLocaleString()}${locale === "en" ? "" : "人"}`,
            },
            {
              label: locale === "en" ? "Surface" : "ピッチ",
              value: locale === "en" ? stadium.surfaceEn : stadium.surface,
            },
            {
              label: locale === "en" ? "Home Team" : "ホームチーム",
              value: locale === "en" ? team.fullNameEn : team.fullName,
            },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.value}</p>
            </div>
          ))}
        </div>

        {/* History */}
        <section>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
            {locale === "en" ? "History" : "歴史"}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {locale === "en" ? stadium.historyEn : stadium.historyJa}
            </p>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
            {locale === "en" ? "Features" : "特徴"}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {locale === "en" ? stadium.featuresEn : stadium.featuresJa}
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
            {locale === "en" ? "5 Must-See Highlights" : "見どころ 5 選"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-1">
            {stadium.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
              >
                <div
                  className="shrink-0 w-10 sm:w-16 flex items-center justify-center text-white text-lg sm:text-2xl font-extrabold"
                  style={{ backgroundColor: team.color }}
                >
                  {highlightIcons[i]}
                </div>
                <div className="p-3 sm:p-5 min-w-0">
                  <h3 className="text-xs sm:text-base font-bold text-gray-900 mb-1 leading-snug">
                    {locale === "en" ? h.titleEn : h.titleJa}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-gray-600 leading-relaxed">
                    {locale === "en" ? h.descriptionEn : h.descriptionJa}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Access */}
        <section>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
            {locale === "en" ? "Access" : "アクセス"}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {locale === "en" ? stadium.accessEn : stadium.accessJa}
            </p>
          </div>
        </section>

        {/* Back links */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link
            href={`/jleague/team/${team.id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: team.color }}
          >
            &larr; {locale === "en" ? `Back to ${team.fullNameEn}` : `${team.fullName}に戻る`}
          </Link>
          <Link
            href="/jleague"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {locale === "en" ? "J1 League Top" : "J1リーグ一覧"}
          </Link>
        </div>
      </div>
    </>
  );
}
