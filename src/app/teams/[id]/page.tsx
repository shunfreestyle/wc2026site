"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";
import { teams, getTeamById } from "@/data/teams";
import { getMatchesByTeam } from "@/data/matches";
import MatchCard from "@/components/MatchCard";
import PlayerAvatar from "@/components/PlayerAvatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTeamName, getCoachName, getTeamDescription, getCoachStyle, getCoachNationality, getBestResult, getPlayerDescription } from "@/utils/teamName";

export default function TeamDetailPage() {
  const { t, locale } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const team = getTeamById(id);

  if (!team) {
    notFound();
  }

  const teamMatches = getMatchesByTeam(id);

  const positionLabel = (pos: string) => {
    switch (pos) {
      case "GK": return { label: "GK", color: "bg-amber-100 text-amber-800" };
      case "DF": return { label: "DF", color: "bg-blue-100 text-blue-800" };
      case "MF": return { label: "MF", color: "bg-emerald-100 text-emerald-800" };
      case "FW": return { label: "FW", color: "bg-red-100 text-red-800" };
      default: return { label: pos, color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden text-white" style={{ background: "#1A1A2E" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-[10%] h-[150%]" style={{ width: "2px", background: "#E8192C", opacity: 0.35, transform: "rotate(15deg)" }} />
          <div className="absolute -bottom-20 left-[5%] h-[150%]" style={{ width: "2px", background: "#00843D", opacity: 0.3, transform: "rotate(-12deg)" }} />
          <div className="absolute -top-10 left-[35%] h-[150%]" style={{ width: "2px", background: "#0057A8", opacity: 0.25, transform: "rotate(8deg)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href="/teams"
            className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            ← {t.teams.pageTitle}
          </Link>
          <div className="flex items-center gap-5">
            <span className="text-6xl sm:text-8xl">{team.flag}</span>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {getTeamName(team, locale)}
              </h1>
              <p className="text-white/70 text-lg mt-1">{team.name}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Group {team.group}
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FIFA #{team.fifaRanking}
                </span>
                <span className="bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {team.confederation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Team Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 -mt-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t.teams.teamInfo}</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">{t.teams.wcAppearances}</dt>
                <dd className="text-sm font-semibold text-gray-900">{team.wcAppearances}回</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">{t.teams.bestResult}</dt>
                <dd className="text-sm font-semibold text-gray-900">{getBestResult(team, locale)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">{t.teams.confederation}</dt>
                <dd className="text-sm font-semibold text-gray-900">{team.confederation}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">{t.teams.overview}</h3>
            <p className="text-gray-700 leading-relaxed">{getTeamDescription(team, locale)}</p>
          </div>
        </div>

        {/* Coach Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E8192C] rounded-full" />
            {t.teams.coachTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{getCoachName(team, locale)}</h3>
              <p className="text-gray-600 mb-4">{team.coach.name}</p>
              <dl className="space-y-3">
                <div className="flex items-center gap-3">
                  <dt className="text-sm text-gray-600 w-20">国籍</dt>
                  <dd className="text-sm font-medium text-gray-900">{getCoachNationality(team.coach, locale)}</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="text-sm text-gray-600 w-20">年齢</dt>
                  <dd className="text-sm font-medium text-gray-900">{team.coach.age}歳</dd>
                </div>
                <div className="flex items-center gap-3">
                  <dt className="text-sm text-gray-600 w-20">{t.teams.coachStyle}</dt>
                  <dd className="text-sm font-medium text-gray-900">{getCoachStyle(team.coach, locale)}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                経歴
              </h4>
              <div className="flex flex-wrap gap-2">
                {team.coach.careerHistory.map((club, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full"
                  >
                    {club}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Players Section — Coming Soon */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-[#E8192C] rounded-full" />
            {t.teams.squad}
          </h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-5">
              <span className="text-3xl">🏟️</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">選手一覧は準備中です</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-6">
              W杯2026の最終メンバー発表後に<br />
              各選手の詳細プロフィールを公開予定です。
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              メンバー発表待ち
            </span>
          </div>
        </section>

        {/* Team Matches */}
        {teamMatches.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#E8192C] rounded-full" />
              {t.home.matchScheduleTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link
            href="/teams"
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            ← {t.teams.pageTitle}
          </Link>
          <Link
            href="/matches"
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            {t.home.seeAllMatches}
          </Link>
        </div>
      </div>
    </div>
  );
}
