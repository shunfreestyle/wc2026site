"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { j1Teams, getJ1TeamsByDivision } from "@/data/j1-teams";
import type { J1Team } from "@/data/j1-teams";

function TeamCard({ team }: { team: J1Team }) {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      {/* Color accent bar */}
      <div
        className="h-1.5"
        style={{ background: `linear-gradient(90deg, ${team.color} 60%, ${team.colorSecondary} 100%)` }}
      />

      <div className="p-5">
        {/* Header: Team name */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
            {team.fullName}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">{team.fullNameEn}</p>
        </div>

        {/* Info grid */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center">📍</span>
            <span>{team.prefecture} {team.city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center">🏟</span>
            <span className="truncate">{team.stadium}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center">📅</span>
            <span>創設 {team.founded}年</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center">👔</span>
            <span>{team.manager}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/stamen?team=${team.id}`}
            className="flex-1 flex items-center justify-center text-xs font-bold h-10 rounded-lg border-2 transition-colors"
            style={{
              borderColor: team.color,
              color: team.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = team.color;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = team.color;
            }}
          >
            スタメンメーカー
          </Link>
          <Link
            href={`/jleague/team/${team.id}`}
            className="flex-1 flex items-center justify-center text-xs font-bold h-10 rounded-lg text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: team.color }}
          >
            チーム詳細
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function JLeaguePage() {
  const { locale } = useLanguage();
  const eastTeams = getJ1TeamsByDivision("EAST");
  const westTeams = getJ1TeamsByDivision("WEST");

  return (
    <>
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#003087] to-[#1A1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-white/60 mb-2">
                MEIJI YASUDA J1 HYAKUNEN SŌZŌ LEAGUE
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {locale === "en" ? "J1 League" : "J1リーグ"}
                <span className="text-white/40 ml-3 text-xl sm:text-2xl font-bold">2026</span>
              </h1>
              <p className="text-white/70 mt-2 text-sm sm:text-base max-w-xl">
                {locale === "en"
                  ? "20 clubs competing in the top division of Japanese football. The Original 10 clubs reunite in J1 for the first time in 21 years."
                  : "日本サッカーの頂点を争う20クラブ。2026年はオリジナル10が21年ぶりにJ1で揃い踏み。"}
              </p>
              <Link href="/jleague/j2j3" className="text-xs font-bold text-white/50 hover:text-white/80 transition-colors mt-3 inline-block">
                {locale === "en" ? "J2·J3 League →" : "J2·J3リーグへ →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* EAST Division */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#003087] text-white text-sm font-bold px-4 py-1.5 rounded-lg tracking-wide">
              EAST
            </span>
            <span className="text-sm text-gray-500">{locale === "en" ? "10 Clubs" : "10クラブ"}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {eastTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>

        {/* WEST Division */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#E8192C] text-white text-sm font-bold px-4 py-1.5 rounded-lg tracking-wide">
              WEST
            </span>
            <span className="text-sm text-gray-500">{locale === "en" ? "10 Clubs" : "10クラブ"}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {westTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>

        {/* Original 10 highlight */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl sm:text-2xl font-bold">
              {locale === "en" ? "Original 10 — All reunited in J1" : "オリジナル10 ─ 21年ぶりJ1全クラブ揃い踏み"}
            </h2>
          </div>
          <p className="text-white/70 text-sm mb-5 max-w-3xl">
            {locale === "en"
              ? "The 9 surviving clubs from the 10 that founded the J.League in 1993 are all competing in J1 for the first time since 2005. JEF United Chiba's return to J1 after 17 years completed the reunion."
              : "1993年のJリーグ開幕時に参加した10クラブのうち、現存する9クラブが2005年以来21年ぶりにJ1に勢揃い。ジェフユナイテッド千葉の17年ぶりJ1復帰により実現しました。"}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {j1Teams
              .filter((t) => t.isOriginal10)
              .map((team) => (
                <Link
                  key={team.id}
                  href={`/jleague/team/${team.id}`}
                  className="bg-white/10 hover:bg-white/20 rounded-lg p-2.5 text-center transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-full mx-auto mb-1.5"
                    style={{ backgroundColor: team.color }}
                  />
                  <p className="text-[11px] font-bold leading-tight">{team.shortName}</p>
                </Link>
              ))}
          </div>
        </section>

        {/* J2/J3 Link */}
        <section className="mb-10">
          <Link
            href="/jleague/j2j3"
            className="group block bg-gradient-to-r from-[#2C3E50] to-[#34495E] rounded-2xl p-6 sm:p-8 text-white hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white/50 tracking-widest mb-1">MEIJI YASUDA J2·J3 HYAKUNEN SŌZŌ LEAGUE</p>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {locale === "en" ? "J2·J3 Centenary Vision League" : "J2·J3 百年構想リーグ"}
                </h2>
                <p className="text-white/60 text-sm mt-1">
                  {locale === "en"
                    ? "40 clubs in 4 groups — EAST-A, EAST-B, WEST-A, WEST-B"
                    : "4グループ40クラブ ─ EAST-A / EAST-B / WEST-A / WEST-B"}
                </p>
              </div>
              <svg className="w-6 h-6 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </div>
          </Link>
        </section>

        {/* Data source */}
        <p className="text-xs text-gray-400 mt-8 text-center">
          {locale === "en"
            ? "Source: J.LEAGUE Official (jleague.jp) / Club official sites — Data as of March 2026"
            : "出典: Jリーグ公式サイト (jleague.jp) / 各クラブ公式サイト ─ 2026年3月時点"}
        </p>
      </div>
    </>
  );
}
