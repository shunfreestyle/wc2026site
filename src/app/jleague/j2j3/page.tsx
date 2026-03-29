"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { j2j3Teams, getJ2J3TeamsByDivision } from "@/data/j2j3-teams";
import type { J2J3Team } from "@/data/j2j3-teams";

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function TeamCard({ team }: { team: J2J3Team }) {
  const accent = isLightColor(team.color) ? team.colorSecondary : team.color;
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      <div
        className="h-1.5 shrink-0"
        style={{ background: `linear-gradient(90deg, ${team.color} 60%, ${team.colorSecondary} 100%)` }}
      />
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="min-w-0 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
            {team.fullName}
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{team.fullNameEn}</p>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm flex-1">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center text-xs">📍</span>
            <span>{team.prefecture} {team.city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center text-xs">🏟</span>
            <span className="truncate">{team.stadium}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-gray-400 w-4 text-center text-xs">👔</span>
            <span>{team.manager}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            href={`/stamen?team=${team.id}`}
            className="flex-1 flex items-center justify-center text-xs font-bold h-10 rounded-lg border-2 transition-colors whitespace-nowrap"
            style={{ borderColor: accent, color: accent }}
          >
            スタメンメーカー
          </Link>
          <Link
            href={`/jleague/team/${team.id}`}
            className="flex-1 flex items-center justify-center text-xs font-bold h-10 rounded-lg text-white transition-opacity hover:opacity-90 whitespace-nowrap"
            style={{ backgroundColor: accent }}
          >
            チーム詳細
          </Link>
        </div>
      </div>
    </div>
  );
}

const DIVISIONS: { key: J2J3Team["division"]; label: string; labelEn: string; color: string }[] = [
  { key: "EAST-A", label: "EAST-A", labelEn: "EAST-A", color: "#003087" },
  { key: "EAST-B", label: "EAST-B", labelEn: "EAST-B", color: "#1a5276" },
  { key: "WEST-A", label: "WEST-A", labelEn: "WEST-A", color: "#E8192C" },
  { key: "WEST-B", label: "WEST-B", labelEn: "WEST-B", color: "#922B21" },
];

export default function J2J3Page() {
  const { locale } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1A1A2E] via-[#2C3E50] to-[#1A1A2E] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest text-white/60 mb-2">
                MEIJI YASUDA J2·J3 HYAKUNEN KŌSŌ LEAGUE
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {locale === "en" ? "J2·J3 League" : "J2·J3リーグ"}
                <span className="text-white/40 ml-3 text-xl sm:text-2xl font-bold">2026</span>
              </h1>
              <p className="text-white/70 mt-2 text-sm sm:text-base max-w-xl">
                {locale === "en"
                  ? "40 clubs across 4 groups competing in the Centenary Vision League. Former J1 powerhouses and ambitious regional clubs battle for promotion."
                  : "百年構想リーグとして4グループ40クラブが競う。元J1の強豪と野心的な地方クラブがJ1昇格を目指す。"}
              </p>
              <Link href="/jleague" className="inline-flex items-center gap-1.5 text-xs font-bold text-white/60 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mt-4 transition-all">
                <span className="text-[10px]">←</span>
                {locale === "en" ? "J1 League" : "J1リーグへ"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {DIVISIONS.map((div) => {
          const teams = getJ2J3TeamsByDivision(div.key);
          return (
            <section key={div.key} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-white text-sm font-bold px-4 py-1.5 rounded-lg tracking-wide"
                  style={{ backgroundColor: div.color }}
                >
                  {div.key}
                </span>
                <span className="text-sm text-gray-500">{locale === "en" ? "10 Clubs" : "10クラブ"}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            </section>
          );
        })}

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
