import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  matchDetails,
  getMatchDetailById,
  getAllMatchDetailIds,
} from "@/data/jleague-match-details";
import type { MatchPlayer, MatchGoal } from "@/data/jleague-match-details";

/* ── Static generation ─────────────────────────── */
export function generateStaticParams() {
  return getAllMatchDetailIds().map((matchId) => ({ matchId }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ matchId: string }>;
}): Promise<Metadata> {
  return params.then(({ matchId }) => {
    const m = getMatchDetailById(matchId);
    if (!m) return { title: "試合詳細 | Jリーグ" };
    return {
      title: `${m.home} ${m.score.home}-${m.score.away} ${m.away} | ${m.category}リーグ ${m.matchday}`,
      description: `${m.category}リーグ ${m.matchday} ${m.date} ${m.stadium} - ${m.home} vs ${m.away}`,
    };
  });
}

/* ── Team colors ───────────────────────────────── */
const TEAM_COLORS: Record<string, { color: string; emoji: string }> = {
  "横浜FM": { color: "#003087", emoji: "🔵" },
  "町田":   { color: "#003DA5", emoji: "🔵" },
  "浦和":   { color: "#E8192C", emoji: "🔴" },
  "千葉":   { color: "#FFBE00", emoji: "🟡" },
  "FC東京": { color: "#003087", emoji: "🔵" },
  "鹿島":   { color: "#8B0000", emoji: "🔴" },
  "川崎F":  { color: "#00A0DE", emoji: "🔵" },
  "東京V":  { color: "#006400", emoji: "🟢" },
  "柏":     { color: "#FFD700", emoji: "🟡" },
  "水戸":   { color: "#003DA5", emoji: "🔵" },
  "神戸":   { color: "#8B0000", emoji: "🔴" },
  "広島":   { color: "#6B21A8", emoji: "🟣" },
  "G大阪":  { color: "#003087", emoji: "🔵" },
  "C大阪":  { color: "#E95098", emoji: "🩷" },
  "岡山":   { color: "#8B0000", emoji: "🔴" },
  "京都":   { color: "#6B21A8", emoji: "🟣" },
  "名古屋": { color: "#E8192C", emoji: "🔴" },
  "福岡":   { color: "#003087", emoji: "🔵" },
  "清水":   { color: "#FF6600", emoji: "🟠" },
  "長崎":   { color: "#003087", emoji: "🔵" },
  "秋田":   { color: "#003087", emoji: "🔵" },
  "富山":   { color: "#003087", emoji: "🔵" },
  "栃木C":  { color: "#FFD700", emoji: "🟡" },
  "八戸":   { color: "#003087", emoji: "🔵" },
  "藤枝":   { color: "#006400", emoji: "🟢" },
  "いわき": { color: "#003087", emoji: "🔵" },
  "仙台":   { color: "#FFD700", emoji: "🟡" },
  "大分":   { color: "#003087", emoji: "🔵" },
  "湘南":   { color: "#006400", emoji: "🟢" },
  "山形":   { color: "#003087", emoji: "🔵" },
  "甲府":   { color: "#003087", emoji: "🔵" },
  "宮崎":   { color: "#003087", emoji: "🔵" },
  "新潟":   { color: "#FF6600", emoji: "🟠" },
  "札幌":   { color: "#E8192C", emoji: "🔴" },
  "今治":   { color: "#003087", emoji: "🔵" },
  "大宮":   { color: "#FF6600", emoji: "🟠" },
  "横浜FC": { color: "#003087", emoji: "🔵" },
  "磐田":   { color: "#003087", emoji: "🔵" },
  "徳島":   { color: "#003087", emoji: "🔵" },
  "鳥栖":   { color: "#003087", emoji: "🔵" },
  "岐阜":   { color: "#006400", emoji: "🟢" },
  "高知":   { color: "#E8192C", emoji: "🔴" },
  "北九州": { color: "#FFD700", emoji: "🟡" },
  "讃岐":   { color: "#003087", emoji: "🔵" },
  "群馬":   { color: "#006400", emoji: "🟢" },
  "相模原": { color: "#006400", emoji: "🟢" },
  "山口":   { color: "#FF6600", emoji: "🟠" },
  "琉球":   { color: "#E8192C", emoji: "🔴" },
  "熊本":   { color: "#E8192C", emoji: "🔴" },
  "栃木SC": { color: "#FFD700", emoji: "🟡" },
  "金沢":   { color: "#E8192C", emoji: "🔴" },
  "福島":   { color: "#E8192C", emoji: "🔴" },
  "FC大阪": { color: "#003087", emoji: "🔵" },
  "長野":   { color: "#FF6600", emoji: "🟠" },
  "奈良":   { color: "#E8192C", emoji: "🔴" },
  "鹿児島": { color: "#003087", emoji: "🔵" },
  "松本":   { color: "#006400", emoji: "🟢" },
  "滋賀":   { color: "#003087", emoji: "🔵" },
  "愛媛":   { color: "#FF6600", emoji: "🟠" },
  "鳥取":   { color: "#006400", emoji: "🟢" },
};

const posStyle: Record<string, { bg: string; text: string }> = {
  GK: { bg: "#FAEEDA", text: "#633806" },
  DF: { bg: "#EEF2FF", text: "#3730A3" },
  MF: { bg: "#DCFCE7", text: "#166534" },
  FW: { bg: "#FEE2E2", text: "#991B1B" },
};

/* ── Helpers ────────────────────────────────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const dow = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${dow}）`;
}

function tc(team: string) {
  return TEAM_COLORS[team] || { color: "#333", emoji: "⚽" };
}

/* ── Player Row ─────────────────────────────── */
function PlayerRow({ player }: { player: MatchPlayer }) {
  const ps = posStyle[player.position];
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors text-xs">
      <span
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
        style={{ background: ps.bg, color: ps.text }}
      >
        {player.number}
      </span>
      <span className="font-bold text-gray-900 truncate flex-1">
        {player.name}
        {player.isCaptain && <span className="text-amber-500 ml-0.5">©</span>}
      </span>
      <span
        className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
        style={{ background: ps.bg, color: ps.text }}
      >
        {player.position}
      </span>
      {player.subOut && (
        <span className="text-[9px] text-red-400 shrink-0 font-bold">🔻{player.subOut}&apos;</span>
      )}
      {player.subIn && (
        <span className="text-[9px] text-green-500 shrink-0 font-bold">🔺{player.subIn}&apos;</span>
      )}
    </div>
  );
}

/* ── Page ────────────────────────────────────────── */
export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ matchId: string }>;
}) {
  const { matchId } = await params;
  const match = getMatchDetailById(matchId);
  if (!match) notFound();

  const ht = tc(match.home);
  const at = tc(match.away);

  // Find prev/next in same category
  const sameCategory = matchDetails
    .filter((m) => m.category === match.category)
    .sort((a, b) => a.matchId.localeCompare(b.matchId));
  const idx = sameCategory.findIndex((m) => m.matchId === matchId);
  const prev = idx > 0 ? sameCategory[idx - 1] : null;
  const next = idx < sameCategory.length - 1 ? sameCategory[idx + 1] : null;

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* ═══════ HEADER ═══════ */}
      <div
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ht.color} 0%, #0A1A3C 50%, ${at.color} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 31px, #fff 31px, #fff 32px)",
          }}
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/jleague" className="text-white/60 hover:text-white text-sm transition-colors">
              ← 順位表
            </Link>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 font-bold">
              {match.category}リーグ {match.matchday}
            </span>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-10">
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{ht.emoji}</p>
                <p className="text-base sm:text-xl font-black">{match.home}</p>
                <p className="text-[10px] text-white/40 mt-0.5">ホーム</p>
              </div>
              <div className="text-center shrink-0">
                <p className="text-4xl sm:text-6xl font-black tracking-tight">
                  {match.score.home}
                  <span className="text-white/25 mx-2 sm:mx-3">-</span>
                  {match.score.away}
                </p>
                <p className="text-[10px] text-white/30 mt-2">試合終了</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{at.emoji}</p>
                <p className="text-base sm:text-xl font-black">{match.away}</p>
                <p className="text-[10px] text-white/40 mt-0.5">アウェイ</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-5 text-xs text-white/50">
            <span>📅 {formatDate(match.date)}</span>
            <span>⏱ {match.kickoff} KO</span>
            <span>🏟 {match.stadium}</span>
            {match.attendance && <span>👥 {match.attendance.toLocaleString()}人</span>}
          </div>
        </div>
      </div>

      {/* ═══════ BODY ═══════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Prev / Next */}
        <div className="flex items-center justify-between gap-2">
          {prev ? (
            <Link
              href={`/jleague/match/${prev.matchId}`}
              className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
              <div>
                <p className="text-[10px] text-gray-400 font-medium leading-none">{prev.category}</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5 leading-none">{prev.home} vs {prev.away}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/jleague/match/${next.matchId}`}
              className="group inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-medium leading-none">{next.category}</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5 leading-none">{next.home} vs {next.away}</p>
              </div>
              <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </Link>
          ) : <div />}
        </div>

        {/* ── Goals ── */}
        {match.goals.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                得点経過
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {match.goals.map((g, i) => {
                const isHome = g.teamSide === "home";
                const teamColor = isHome ? ht.color : at.color;
                return (
                  <div key={i} className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 ${isHome ? "" : "flex-row-reverse"}`}>
                    <span className="text-sm sm:text-base font-black w-8 sm:w-10 text-center shrink-0" style={{ color: teamColor }}>
                      {g.minute}&apos;
                    </span>
                    <span className="text-base sm:text-lg shrink-0">
                      {g.isOwnGoal ? "🔴" : g.isPenalty ? "🅿️" : "⚽"}
                    </span>
                    <div className={`flex-1 min-w-0 ${isHome ? "" : "text-right"}`}>
                      <span className="font-bold text-xs sm:text-sm text-gray-900">
                        {g.playerName}
                        {g.isOwnGoal && <span className="text-red-500 ml-1">(OG)</span>}
                      </span>
                      {g.assistName && (
                        <span className="text-[10px] sm:text-xs text-gray-400 ml-1 sm:ml-2">(ast. {g.assistName})</span>
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full shrink-0" style={{
                      backgroundColor: `${teamColor}15`,
                      color: teamColor,
                    }}>
                      {isHome ? match.home : match.away}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Stats ── */}
        {match.stats && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-blue-500 inline-block" />
                マッチスタッツ
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center text-xs font-bold text-gray-500 mb-1">
                <span className="w-14 sm:w-16 text-right truncate" style={{ color: ht.color }}>{match.home}</span>
                <span className="flex-1" />
                <span className="w-14 sm:w-16 truncate" style={{ color: at.color }}>{match.away}</span>
              </div>
              {(
                [
                  ["ポゼッション", match.stats.possession, "%"],
                  ["シュート", match.stats.shots, ""],
                  ["枠内シュート", match.stats.shotsOnTarget, ""],
                  ["コーナーキック", match.stats.corners, ""],
                  ["ファウル", match.stats.fouls, ""],
                  ["パス", match.stats.passes, ""],
                  ["パス成功率", match.stats.passAccuracy, "%"],
                ] as [string, [number, number] | undefined, string][]
              )
                .filter(([, val]) => val !== undefined)
                .map(([label, val, unit]) => {
                  const [h, a] = val!;
                  const total = h + a || 1;
                  const hPct = (h / total) * 100;
                  return (
                    <div key={label}>
                      <div className="flex items-center text-xs mb-1">
                        <span className="w-14 sm:w-16 text-right font-bold text-gray-800">{h}{unit}</span>
                        <span className="flex-1 text-center text-[10px] text-gray-400">{label}</span>
                        <span className="w-14 sm:w-16 font-bold text-gray-800">{a}{unit}</span>
                      </div>
                      <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-100">
                        <div className="rounded-full" style={{ width: `${hPct}%`, background: ht.color }} />
                        <div className="rounded-full" style={{ width: `${100 - hPct}%`, background: at.color }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ── Lineups ── */}
        {match.homeLineup && match.awayLineup ? (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                メンバー
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {[
                { team: match.home, lineup: match.homeLineup, info: ht },
                { team: match.away, lineup: match.awayLineup, info: at },
              ].map(({ team, lineup, info }) => (
                <div key={team} className="p-4">
                  <p className="text-xs font-bold mb-2 flex items-center gap-2" style={{ color: info.color }}>
                    {info.emoji} {team}
                    <span className="text-gray-400 font-normal">({lineup.formation})</span>
                  </p>

                  <p className="text-[10px] text-gray-400 font-bold mb-1 mt-3">スターター</p>
                  <div className="space-y-0.5">
                    {lineup.starters.map((p) => (
                      <PlayerRow key={p.number} player={p} />
                    ))}
                  </div>

                  {lineup.subs.length > 0 && (
                    <>
                      <p className="text-[10px] text-gray-400 font-bold mb-1 mt-4">ベンチ</p>
                      <div className="space-y-0.5">
                        {lineup.subs.map((p) => (
                          <PlayerRow key={p.number} player={p} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                メンバー
              </h2>
            </div>
            <div className="p-8 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-sm text-gray-400 font-bold">準備中</p>
              <p className="text-xs text-gray-300 mt-1">スターティングメンバー情報は順次追加予定</p>
            </div>
          </section>
        )}

        {/* ── Cards ── */}
        {match.cards.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
                警告・退場
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {match.cards.map((c, i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 text-xs sm:text-sm">
                  <span className="font-black text-gray-900 w-8 sm:w-10 text-right">{c.minute}&apos;</span>
                  <span>{c.type === "yellow" ? "🟨" : "🟥"}</span>
                  <span className="font-bold text-gray-800">{c.playerName}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {c.teamSide === "home" ? match.home : match.away}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Match Info ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
              試合情報
            </h2>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">大会</p>
                <p className="font-bold text-gray-800 text-xs sm:text-sm">明治安田{match.category}リーグ 2026/27</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">節</p>
                <p className="font-bold text-gray-800 text-xs sm:text-sm">{match.matchday}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">日時</p>
                <p className="font-bold text-gray-800 text-xs sm:text-sm">{formatDate(match.date)} {match.kickoff}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">会場</p>
                <p className="font-bold text-gray-800 text-xs sm:text-sm">{match.stadium}</p>
              </div>
              {match.attendance && (
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">入場者数</p>
                  <p className="font-bold text-gray-800 text-xs sm:text-sm">{match.attendance.toLocaleString()}人</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Source ── */}
        <p className="text-[10px] text-gray-400 text-center">
          データ出典: Jリーグ公式、Yahoo スポーツナビ、Football LAB
        </p>
      </div>
    </div>
  );
}
