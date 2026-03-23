'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { japanMatches, getJapanMatchById } from "@/data/japan-matches";
import type { JapanMatch, MatchPlayer } from "@/data/japan-matches";
import { useLanguage } from "@/contexts/LanguageContext";

/* ── Helpers ────────────────────────────────────── */
function formatDate(dateStr: string, loc: string) {
  const d = new Date(dateStr + "T00:00:00");
  if (loc === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' });
  }
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${y}年${m}月${day}日（${dow}）`;
}

const posColor: Record<string, string> = {
  GK: "bg-amber-500",
  DF: "bg-blue-500",
  MF: "bg-emerald-500",
  FW: "bg-red-500",
};

/* ── Formation Pitch ───────────────────────────── */
function FormationPitch({ match, locale }: { match: JapanMatch; locale: string }) {
  if (match.formationPositions.length === 0) {
    return (
      <div className="rounded-2xl bg-gray-100 p-8 text-center text-gray-400">
        {locale === 'en' ? "Loading data" : "データ取得中"}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: "3 / 4" }}>
      {/* Pitch background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-[#2d8a4e] to-[#1a6b35]">
        {/* Pitch lines */}
        <div className="absolute inset-2 border-2 border-white/30 rounded-lg" />
        {/* Center line */}
        <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-white/30" />
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/30" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
        {/* Penalty area top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-t-0 border-white/25 rounded-b-lg" />
        {/* Goal area top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-t-0 border-white/20 rounded-b" />
        {/* Penalty area bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-40 h-16 border-2 border-b-0 border-white/25 rounded-t-lg" />
        {/* Goal area bottom */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-8 border-2 border-b-0 border-white/20 rounded-t" />
        {/* Grass stripes */}
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, #fff 30px, #fff 31px)",
        }} />
      </div>

      {/* Players */}
      {match.formationPositions.map((p, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
        >
          <div className="w-8 h-8 mx-auto rounded-full bg-[#003087] border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
            {p.number}
          </div>
          <p className="mt-0.5 text-[10px] sm:text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap">
            {p.nameJa}
          </p>
        </div>
      ))}

      {/* Formation label */}
      <div className="absolute top-3 right-4 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white font-bold">
        {match.formation}
      </div>
    </div>
  );
}

/* ── Player row ────────────────────────────────── */
function PlayerRow({ player, locale }: { player: MatchPlayer; locale: string }) {
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
      <span className="w-8 h-8 rounded-full bg-[#003087] text-white flex items-center justify-center text-xs font-bold shrink-0">
        {player.number}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 truncate">
          {locale === 'en' ? player.name : player.nameJa}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {locale === 'en' ? player.nameJa : player.name}
        </p>
      </div>
      <span className={`${posColor[player.position]} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>
        {player.position}
      </span>
    </div>
  );
}

/* ── Page Component ────────────────────────────── */
export default function MatchDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { locale } = useLanguage();

  const match = getJapanMatchById(id);
  if (!match) return null;

  const isJapanHome = match.home.flag === "🇯🇵";
  const japanScore = isJapanHome ? match.home.score : match.away.score;
  const opponentScore = isJapanHome ? match.away.score : match.home.score;
  const result =
    japanScore > opponentScore ? "WIN" : japanScore < opponentScore ? "LOSE" : "DRAW";
  const resultColor = result === "WIN" ? "text-green-500" : result === "LOSE" ? "text-red-500" : "text-gray-500";
  const resultBg = result === "WIN" ? "bg-green-500" : result === "LOSE" ? "bg-red-500" : "bg-gray-400";
  const resultLabel =
    locale === 'en'
      ? result
      : result === "WIN" ? "勝利" : result === "LOSE" ? "敗北" : "引分";

  // Find previous / next match
  const idx = japanMatches.findIndex((m) => m.id === id);
  const prevMatch = idx < japanMatches.length - 1 ? japanMatches[idx + 1] : null;
  const nextMatch = idx > 0 ? japanMatches[idx - 1] : null;

  const teamName = (team: { name: string; nameJa: string }) =>
    locale === 'en' ? team.name : team.nameJa;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══════ HERO ═══════ */}
      <section
        className="relative text-white"
        style={{
          background: "linear-gradient(135deg, #001845 0%, #003087 50%, #001845 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/japan/matches" className="text-blue-200 hover:text-white text-sm transition-colors">
              ← {locale === 'en' ? "Match List" : "試合一覧"}
            </Link>
          </div>

          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20 mb-4">
              {match.competition}
            </span>

            <div className="flex items-center justify-center gap-6 sm:gap-12 mb-4">
              {/* Home */}
              <div className="text-center flex-1">
                <p className="text-4xl sm:text-5xl mb-2">{match.home.flag}</p>
                <p className="text-sm sm:text-lg font-bold">{teamName(match.home)}</p>
              </div>

              {/* Score */}
              <div className="text-center">
                <p className="text-4xl sm:text-6xl font-black">
                  {match.home.score}
                  <span className="text-white/30 mx-2">-</span>
                  {match.away.score}
                </p>
                <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold ${resultBg} text-white`}>
                  {resultLabel}
                </span>
              </div>

              {/* Away */}
              <div className="text-center flex-1">
                <p className="text-4xl sm:text-5xl mb-2">{match.away.flag}</p>
                <p className="text-sm sm:text-lg font-bold">{teamName(match.away)}</p>
              </div>
            </div>

            <div className="text-sm text-blue-200/70 space-y-1">
              <p>📅 {formatDate(match.date, locale)}</p>
              <p>🏟️ {match.venue}（{match.city}）</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ GOALS ═══════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-7 rounded-full" style={{ background: "#003087" }} />
          {locale === 'en' ? "Goals" : "得点経過"}
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {match.goals.length === 0 ? (
            <p className="p-6 text-center text-gray-400">
              {locale === 'en' ? "No goals" : "得点なし"}
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {match.goals.map((g, i) => {
                const isJapanGoal = g.team === (isJapanHome ? "home" : "away");
                return (
                  <div key={i} className="flex items-center gap-4 px-5 py-3">
                    <span className={`text-lg font-black w-14 text-right ${isJapanGoal ? "text-[#003087]" : "text-gray-400"}`}>
                      {g.minute}&apos;
                    </span>
                    <span className="text-lg">⚽</span>
                    <span className={`font-bold ${isJapanGoal ? "text-gray-900" : "text-gray-500"}`}>
                      {g.player}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {g.team === "home" ? teamName(match.home) : teamName(match.away)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ FORMATION ═══════ */}
      <section className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="inline-block w-1.5 h-7 rounded-full" style={{ background: "#003087" }} />
            {locale === 'en' ? "Formation" : "フォーメーション"}
            <span className="text-gray-400 font-normal text-sm">（{match.formation}）</span>
          </h2>
          <FormationPitch match={match} locale={locale} />
        </div>
      </section>

      {/* ═══════ STARTING & BENCH ═══════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Starting */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-7 rounded-full" style={{ background: "#003087" }} />
              {locale === 'en' ? "Starting XI" : "スターティングメンバー"}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
              {match.starting.length === 0 ? (
                <p className="p-4 text-center text-gray-400 text-sm">
                  {locale === 'en' ? "Loading data" : "データ取得中"}
                </p>
              ) : (
                <div className="space-y-0.5">
                  {match.starting.map((p) => (
                    <PlayerRow key={p.number} player={p} locale={locale} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bench */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="inline-block w-1.5 h-7 rounded-full bg-gray-400" />
              {locale === 'en' ? "Bench" : "ベンチメンバー"}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
              {match.bench.length === 0 ? (
                <p className="p-4 text-center text-gray-400 text-sm">
                  {locale === 'en' ? "Loading data" : "データ取得中"}
                </p>
              ) : (
                <div className="space-y-0.5">
                  {match.bench.map((p) => (
                    <PlayerRow key={p.number} player={p} locale={locale} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SUBSTITUTIONS ═══════ */}
      <section className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="inline-block w-1.5 h-7 rounded-full" style={{ background: "#BC002D" }} />
            {locale === 'en' ? "Substitutions" : "交代"}
          </h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {match.substitutions.length === 0 ? (
              <p className="p-6 text-center text-gray-400 text-sm">
                {locale === 'en' ? "Loading data" : "データ取得中"}
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {match.substitutions.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3">
                    <span className="text-sm font-black text-gray-900 w-12 text-right">
                      {s.minute}&apos;
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 text-sm">▲</span>
                      <span className="text-sm font-bold text-gray-900">{s.playerIn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400 text-sm">▼</span>
                      <span className="text-sm text-gray-500">{s.playerOut}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ HIGHLIGHTS ═══════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="inline-block w-1.5 h-7 rounded-full" style={{ background: "#003087" }} />
          {locale === 'en' ? "Match Highlights" : "マッチハイライト"}
        </h2>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <ul className="space-y-3">
            {match.highlights.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                <span className="text-[#003087] font-bold shrink-0">
                  {i + 1}.
                </span>
                {h}
              </li>
            ))}
          </ul>
          {match.highlightUrl && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <a
                href={match.highlightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors"
              >
                {locale === 'en' ? "Watch Highlights (YouTube)" : "🎬 ハイライトを見る（YouTube）"}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ NAV ═══════ */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {prevMatch ? (
              <Link
                href={`/japan/matches/${prevMatch.id}`}
                className="text-sm text-[#003087] hover:text-[#BC002D] font-medium transition-colors"
              >
                ← {teamName(prevMatch.home)} {prevMatch.home.score}-{prevMatch.away.score} {teamName(prevMatch.away)}
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/japan/matches"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {locale === 'en' ? "Match List" : "試合一覧"}
            </Link>
            {nextMatch ? (
              <Link
                href={`/japan/matches/${nextMatch.id}`}
                className="text-sm text-[#003087] hover:text-[#BC002D] font-medium transition-colors"
              >
                {teamName(nextMatch.home)} {nextMatch.home.score}-{nextMatch.away.score} {teamName(nextMatch.away)} →
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
