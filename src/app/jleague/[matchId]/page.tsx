import Link from "next/link";
import type { Metadata } from "next";
import {
  jMatches,
  getMatchById,
  getAllMatchIds,
  getScoreDisplay,
  getRecentForm,
  getTeamResult,
  TEAM_INFO,
  JLEAGUE_SEASON,
} from "@/data/jleague";
import type { MatchResult } from "@/data/jleague";
import { notFound } from "next/navigation";

/* ── Static generation ─────────────────────────── */
export function generateStaticParams() {
  return getAllMatchIds().map((matchId) => ({ matchId }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ matchId: string }>;
}): Promise<Metadata> {
  return params.then(({ matchId }) => {
    const match = getMatchById(matchId);
    if (!match) return { title: "試合詳細 | Jリーグ" };
    const score = getScoreDisplay(match);
    return {
      title: `${match.homeTeam} ${score} ${match.awayTeam} | ${JLEAGUE_SEASON.name}`,
      description: `${JLEAGUE_SEASON.name} 第${match.round}節 ${match.date} ${match.stadium}`,
    };
  });
}

/* ── Helpers ────────────────────────────────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${y}年${m}月${day}日（${dow}）`;
}

const resultBadge: Record<MatchResult, { label: string; bg: string }> = {
  W:     { label: "W",   bg: "bg-green-500" },
  L:     { label: "L",   bg: "bg-red-500" },
  D:     { label: "D",   bg: "bg-gray-400" },
  "PK+": { label: "PK+", bg: "bg-emerald-600" },
  "PK-": { label: "PK-", bg: "bg-orange-500" },
};

/* ── Page Component ────────────────────────────── */
export default async function JLeagueMatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = getMatchById(matchId);
  if (!match) notFound();

  const ht = TEAM_INFO[match.homeTeam];
  const at = TEAM_INFO[match.awayTeam];
  const score = getScoreDisplay(match);
  const isFinished = match.status === "finished";
  const hasPK =
    (match.pkHome !== undefined && match.pkAway !== undefined) ||
    match.pkWinner !== undefined;

  // Recent form for both teams
  const homeForm = getRecentForm(match.homeTeam, matchId, 5);
  const awayForm = getRecentForm(match.awayTeam, matchId, 5);

  // Prev/Next in same group
  const groupMatches = jMatches.filter((m) => m.group === match.group);
  const idx = groupMatches.findIndex((m) => m.id === matchId);
  const prevMatch = idx > 0 ? groupMatches[idx - 1] : null;
  const nextMatch = idx < groupMatches.length - 1 ? groupMatches[idx + 1] : null;

  // HT score display
  const htScore =
    isFinished && match.homeScore !== null && match.awayScore !== null
      ? `${match.homeScore} - ${match.awayScore}`
      : "- - -";
  const pkDisplay =
    match.pkHome !== undefined && match.pkAway !== undefined
      ? `PK ${match.pkHome} - ${match.pkAway}`
      : match.pkWinner
        ? `PK勝ち: ${match.pkWinner === "home" ? match.homeTeam : match.awayTeam}`
        : null;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* ═══════ NOTEBOOK HEADER ═══════ */}
      <div
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ht?.color || "#0A1A3C"} 0%, #0A1A3C 50%, ${at?.color || "#0A1A3C"} 100%)`,
        }}
      >
        {/* Notebook ruled lines effect */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 31px, #fff 31px, #fff 32px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/jleague"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              ← 試合一覧
            </Link>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 font-bold">
              {JLEAGUE_SEASON.name} 第{match.round}節
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 font-bold">
              {match.group}
            </span>
          </div>

          {/* Score Hero */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-10">
              {/* Home */}
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{ht?.emoji || "⚽"}</p>
                <p className="text-base sm:text-xl font-black">{match.homeTeam}</p>
                <p className="text-[10px] text-white/40 mt-0.5">ホーム</p>
              </div>

              {/* Score */}
              <div className="text-center shrink-0">
                {isFinished && match.homeScore !== null && match.awayScore !== null ? (
                  <>
                    <p className="text-4xl sm:text-6xl font-black tracking-tight">
                      {match.homeScore}
                      <span className="text-white/25 mx-2 sm:mx-3">-</span>
                      {match.awayScore}
                    </p>
                    {hasPK && pkDisplay && (
                      <p className="text-xs font-bold text-amber-300 mt-1">{pkDisplay}</p>
                    )}
                  </>
                ) : match.status === "scheduled" ? (
                  <div>
                    <p className="text-2xl sm:text-4xl font-black text-white/60">{match.kickoff}</p>
                    <p className="text-xs text-white/40 mt-1">キックオフ</p>
                  </div>
                ) : (
                  <p className="text-3xl sm:text-5xl font-black text-white/40">- - -</p>
                )}
                <p className="text-[10px] text-white/30 mt-2">
                  {isFinished ? "試合終了" : ""}
                </p>
              </div>

              {/* Away */}
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{at?.emoji || "⚽"}</p>
                <p className="text-base sm:text-xl font-black">{match.awayTeam}</p>
                <p className="text-[10px] text-white/40 mt-0.5">アウェイ</p>
              </div>
            </div>
          </div>

          {/* Match info */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-5 text-xs text-white/50">
            <span>📅 {formatDate(match.date)}</span>
            <span>⏱ {match.kickoff} KO</span>
            <span>🏟 {match.stadium}</span>
          </div>
        </div>
      </div>

      {/* ═══════ NOTEBOOK BODY ═══════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Recent Form ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
              直近5試合の戦績
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* Home team form */}
            <div className="p-4">
              <p className="text-xs font-bold mb-3" style={{ color: ht?.color || "#333" }}>
                {ht?.emoji} {match.homeTeam}
              </p>
              {homeForm.length === 0 ? (
                <p className="text-xs text-gray-400">データなし</p>
              ) : (
                <div className="space-y-1.5">
                  {homeForm.map((f) => {
                    const b = resultBadge[f.result];
                    return (
                      <div key={f.matchId} className="flex items-center gap-2 text-xs">
                        <span className={`${b.bg} text-white text-[10px] font-bold w-8 text-center py-0.5 rounded`}>
                          {b.label}
                        </span>
                        <span className="text-gray-500 w-12 shrink-0">{f.date.slice(5).replace("-", "/")}</span>
                        <span className="font-bold text-gray-700 truncate">vs {f.opponent}</span>
                        <span className="text-gray-400 ml-auto shrink-0">{f.score}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Away team form */}
            <div className="p-4">
              <p className="text-xs font-bold mb-3" style={{ color: at?.color || "#333" }}>
                {at?.emoji} {match.awayTeam}
              </p>
              {awayForm.length === 0 ? (
                <p className="text-xs text-gray-400">データなし</p>
              ) : (
                <div className="space-y-1.5">
                  {awayForm.map((f) => {
                    const b = resultBadge[f.result];
                    return (
                      <div key={f.matchId} className="flex items-center gap-2 text-xs">
                        <span className={`${b.bg} text-white text-[10px] font-bold w-8 text-center py-0.5 rounded`}>
                          {b.label}
                        </span>
                        <span className="text-gray-500 w-12 shrink-0">{f.date.slice(5).replace("-", "/")}</span>
                        <span className="font-bold text-gray-700 truncate">vs {f.opponent}</span>
                        <span className="text-gray-400 ml-auto shrink-0">{f.score}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Match Summary Note ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
              試合情報
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">大会</p>
                <p className="font-bold text-gray-800">{JLEAGUE_SEASON.name}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">節</p>
                <p className="font-bold text-gray-800">第{match.round}節 ({match.group})</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">日時</p>
                <p className="font-bold text-gray-800">{formatDate(match.date)} {match.kickoff}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">会場</p>
                <p className="font-bold text-gray-800">{match.stadium}</p>
              </div>
            </div>

            {isFinished && match.homeScore !== null && match.awayScore !== null && (
              <div className="mt-5 pt-4 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 mb-2">スコア詳細</p>
                <div className="flex items-center justify-center gap-6 text-center">
                  <div>
                    <p className="text-xs text-gray-500">{match.homeTeam}</p>
                    <p className="text-2xl font-black text-gray-900">{match.homeScore}</p>
                  </div>
                  <span className="text-gray-300 text-xl">-</span>
                  <div>
                    <p className="text-xs text-gray-500">{match.awayTeam}</p>
                    <p className="text-2xl font-black text-gray-900">{match.awayScore}</p>
                  </div>
                </div>
                {hasPK && pkDisplay && (
                  <p className="text-center text-xs text-amber-600 font-bold mt-2">{pkDisplay}</p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Formation / Members placeholder ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-emerald-500 inline-block" />
              フォーメーション・メンバー
            </h2>
          </div>
          <div className="p-8 text-center">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm text-gray-400 font-bold">準備中</p>
            <p className="text-xs text-gray-300 mt-1">フォーメーション・スターティングメンバー情報は順次追加予定</p>
          </div>
        </section>

        {/* ── Source note ── */}
        <p className="text-[10px] text-gray-400 text-center">
          {match.referenceNote}
        </p>
      </div>

      {/* ═══════ NAV ═══════ */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            {prevMatch ? (
              <Link
                href={`/jleague/${prevMatch.id}`}
                className="text-xs text-[#0A1A3C] hover:text-blue-700 font-medium transition-colors truncate"
              >
                ← {prevMatch.homeTeam} vs {prevMatch.awayTeam}
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/jleague"
              className="shrink-0 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              試合一覧
            </Link>
            {nextMatch ? (
              <Link
                href={`/jleague/${nextMatch.id}`}
                className="text-xs text-[#0A1A3C] hover:text-blue-700 font-medium transition-colors truncate text-right"
              >
                {nextMatch.homeTeam} vs {nextMatch.awayTeam} →
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
