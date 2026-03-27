"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getJ1TeamById } from "@/data/j1-teams";
import { getManagerByTeamId } from "@/data/j1-managers";

export default function ManagerDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const { locale } = useLanguage();
  const team = getJ1TeamById(teamId);
  const manager = getManagerByTeamId(teamId);

  if (!team || !manager) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-gray-500 text-lg">
          {locale === "en" ? "Manager not found" : "監督情報が見つかりません"}
        </p>
        <Link href="/jleague" className="text-[#003087] font-bold mt-4 inline-block hover:underline">
          {locale === "en" ? "Back to J1 League" : "J1リーグに戻る"}
        </Link>
      </div>
    );
  }

  const birthYear = manager.birthDate.split("-")[0];
  const age = new Date().getFullYear() - parseInt(birthYear);

  const sections = [
    {
      titleJa: "選手キャリア",
      titleEn: "Playing Career",
      contentJa: manager.playingCareerJa,
      contentEn: manager.playingCareerEn,
    },
    {
      titleJa: "監督キャリア",
      titleEn: "Managerial Career",
      contentJa: manager.managerialCareerJa,
      contentEn: manager.managerialCareerEn,
    },
    {
      titleJa: "戦術・スタイル",
      titleEn: "Tactics & Style",
      contentJa: manager.styleJa,
      contentEn: manager.styleEn,
    },
  ];

  const achievements = locale === "en" ? manager.achievementsEn : manager.achievementsJa;

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

          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
                {locale === "en" ? "Manager" : "監督"}
              </p>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {manager.nameJa}
              </h1>
              <p className="text-white/60 text-sm mt-1">{manager.nameEn}</p>
              <p className="text-white/80 text-sm mt-2 font-medium">
                {locale === "en" ? team.fullNameEn : team.fullName}
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
              label: locale === "en" ? "Nationality" : "国籍",
              value: locale === "en" ? manager.nationalityEn : manager.nationality,
            },
            {
              label: locale === "en" ? "Birth Year" : "生年",
              value: `${birthYear}${locale === "en" ? ` (${age})` : `年（${age}歳）`}`,
            },
            {
              label: locale === "en" ? "Birthplace" : "出身地",
              value: locale === "en" ? manager.birthPlaceEn : manager.birthPlace,
            },
            {
              label: locale === "en" ? "Current Club" : "現所属",
              value: locale === "en" ? team.fullNameEn : team.fullName,
            },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-1 leading-snug">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Career Sections */}
        {sections.map((section) => (
          <section key={section.titleJa}>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
              {locale === "en" ? section.titleEn : section.titleJa}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {locale === "en" ? section.contentEn : section.contentJa}
              </p>
            </div>
          </section>
        ))}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
              {locale === "en" ? "Achievements" : "主な実績"}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 px-6 py-4 ${i > 0 ? "border-t border-gray-50" : ""}`}
                >
                  <span
                    className="shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: team.color }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium text-gray-800">{a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

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
