import Link from "next/link";
import type { Metadata } from "next";
import {
  jMatches,
  jMatchDetails,
  getMatchById,
  getAllMatchIds,
  getScoreDisplay,
  TEAM_INFO,
  JLEAGUE_SEASON,
} from "@/data/jleague";
import type { JPosition, JPlayer } from "@/data/jleague";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

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
      title: `${match.homeTeam} ${score} ${match.awayTeam} | ${match.league === "J1" ? JLEAGUE_SEASON.nameJ1 : JLEAGUE_SEASON.nameJ23}`,
      description: `${match.league === "J1" ? JLEAGUE_SEASON.nameJ1 : JLEAGUE_SEASON.nameJ23} 第${match.round}節 ${match.date} ${match.stadium}`,
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

const posStyle: Record<JPosition, { bg: string; text: string }> = {
  GK: { bg: "#FAEEDA", text: "#633806" },
  DF: { bg: "#EEF2FF", text: "#3730A3" },
  MF: { bg: "#DCFCE7", text: "#166534" },
  FW: { bg: "#FEE2E2", text: "#991B1B" },
};

/* shortName → teamId for back-link */
const SHORT_TO_ID: Record<string, string> = {
  "鹿島": "kashima", "水戸": "mito", "浦和": "urawa", "千葉": "chiba",
  "柏": "kashiwa", "FC東京": "fctokyo", "東京V": "verdy", "町田": "machida",
  "川崎F": "kawasaki", "横浜FM": "yokohamafm", "清水": "shimizu",
  "名古屋": "nagoya", "京都": "kyoto", "G大阪": "gosaka", "C大阪": "cosaka",
  "神戸": "kobe", "岡山": "okayama", "広島": "hiroshima", "福岡": "fukuoka",
  "長崎": "nagasaki",
};

const timelineIcon: Record<string, string> = {
  goal: "⚽",
  card: "🟨",
  sub:  "🔄",
  note: "📝",
  end:  "🏁",
};

/* ── Player Row ─────────────────────────────── */
function PlayerRow({ player, teamColor }: { player: JPlayer; teamColor?: string }) {
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
  const isFinished = match.status === "finished";
  const hasPK =
    (match.pkHome !== undefined && match.pkAway !== undefined) ||
    match.pkWinner !== undefined;

  // Determine the "focus team" from referer or default to home team
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const refTeamMatch = referer.match(/\/jleague\/team\/([^/?]+)/);
  const refTeamId = refTeamMatch ? refTeamMatch[1] : null;

  // Map teamId back to shortName
  const ID_TO_SHORT: Record<string, string> = {};
  for (const [short, id] of Object.entries(SHORT_TO_ID)) {
    ID_TO_SHORT[id] = short;
  }
  const focusShort = refTeamId ? ID_TO_SHORT[refTeamId] : null;

  // Use focus team if it's in this match, otherwise default to home team
  const navTeam =
    focusShort && (match.homeTeam === focusShort || match.awayTeam === focusShort)
      ? focusShort
      : match.homeTeam;

  // Get this team's matches sorted by date
  const teamMatches = jMatches
    .filter((m) => m.league === match.league && (m.homeTeam === navTeam || m.awayTeam === navTeam))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const idx = teamMatches.findIndex((m) => m.id === matchId);
  const prevMatch = idx > 0 ? teamMatches[idx - 1] : null;
  const nextMatch = idx < teamMatches.length - 1 ? teamMatches[idx + 1] : null;
  const navTeamId = SHORT_TO_ID[navTeam];

  const pkDisplay =
    match.pkHome !== undefined && match.pkAway !== undefined
      ? `PK ${match.pkHome} - ${match.pkAway}`
      : match.pkWinner
        ? `PK勝ち: ${match.pkWinner === "home" ? match.homeTeam : match.awayTeam}`
        : null;

  const detail = jMatchDetails.find(d => d.matchId === matchId);

  // Back link: prefer focus team's detail page
  const backTeamId = navTeamId || SHORT_TO_ID[match.homeTeam];
  const backHref = backTeamId ? `/jleague/team/${backTeamId}` : "/jleague";
  const backLabel = backTeamId ? `${navTeam} チーム詳細` : "試合一覧";

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* ═══════ NOTEBOOK HEADER ═══════ */}
      <div
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${ht?.color || "#0A1A3C"} 0%, #0A1A3C 50%, ${at?.color || "#0A1A3C"} 100%)`,
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
            <Link href={backHref} className="text-white/60 hover:text-white text-sm transition-colors">
              ← {backLabel}
            </Link>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 font-bold">
              {match.league === "J1" ? JLEAGUE_SEASON.nameJ1 : JLEAGUE_SEASON.nameJ23} 第{match.round}節
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 font-bold">
              {match.group}
            </span>
          </div>

          {/* Score Hero */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 sm:gap-10">
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{ht?.emoji || "⚽"}</p>
                <p className="text-base sm:text-xl font-black">{match.homeTeam}</p>
                <p className="text-[10px] text-white/40 mt-0.5">ホーム</p>
              </div>
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
              <div className="flex-1 text-center">
                <p className="text-3xl sm:text-4xl mb-1">{at?.emoji || "⚽"}</p>
                <p className="text-base sm:text-xl font-black">{match.awayTeam}</p>
                <p className="text-[10px] text-white/40 mt-0.5">アウェイ</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-5 text-xs text-white/50">
            <span>📅 {formatDate(match.date)}</span>
            <span>⏱ {match.kickoff} KO</span>
            <span>🏟 {match.stadium}</span>
          </div>
        </div>
      </div>

      {/* ═══════ NOTEBOOK BODY ═══════ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* ── Prev / Next Nav (team-based) ── */}
        <div className="flex items-center justify-between gap-2">
          {prevMatch ? (
            <Link
              href={`/jleague/${prevMatch.id}`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-xs font-bold text-gray-700 truncate max-w-[45%]"
            >
              <span className="text-gray-400">&larr;</span>
              <div className="truncate">
                <p className="text-[10px] text-gray-400">第{prevMatch.round}節</p>
                <p className="truncate">vs {prevMatch.homeTeam === navTeam ? prevMatch.awayTeam : prevMatch.homeTeam}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          <div className="text-center shrink-0">
            <p className="text-[10px] text-gray-400 font-bold">{navTeam}の試合</p>
            <p className="text-[10px] text-gray-300">第{match.round}節</p>
          </div>
          {nextMatch ? (
            <Link
              href={`/jleague/${nextMatch.id}`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-xs font-bold text-gray-700 truncate max-w-[45%]"
            >
              <div className="truncate text-right">
                <p className="text-[10px] text-gray-400">第{nextMatch.round}節</p>
                <p className="truncate">vs {nextMatch.homeTeam === navTeam ? nextMatch.awayTeam : nextMatch.homeTeam}</p>
              </div>
              <span className="text-gray-400">&rarr;</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ── Goal Scorers ── */}
        {detail && detail.goals && detail.goals.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                得点経過
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {detail.goals.map((g, i) => {
                const isHome = g.teamSide === "home";
                return (
                  <div key={i} className={`flex items-center gap-3 px-5 py-3 ${isHome ? "" : "flex-row-reverse"}`}>
                    <span className="text-base font-black w-10 text-center" style={{ color: isHome ? ht?.color : at?.color }}>
                      {g.minute}&apos;
                    </span>
                    <span className="text-lg">⚽</span>
                    <div className={isHome ? "flex-1" : "flex-1 text-right"}>
                      <span className="font-bold text-sm text-gray-900">
                        {g.playerName}
                      </span>
                      {g.assistName && (
                        <span className="text-xs text-gray-400 ml-2">(ast. {g.assistName})</span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{
                      backgroundColor: `${isHome ? ht?.color : at?.color}15`,
                      color: isHome ? ht?.color : at?.color,
                    }}>
                      {isHome ? match.homeTeam : match.awayTeam}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Match Stats ── */}
        {detail?.stats && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-blue-500 inline-block" />
                マッチスタッツ
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center text-xs font-bold text-gray-500 mb-1">
                <span className="w-12 text-right" style={{ color: ht?.color }}>{match.homeTeam}</span>
                <span className="flex-1" />
                <span className="w-12" style={{ color: at?.color }}>{match.awayTeam}</span>
              </div>
              {(
                [
                  ["ポゼッション", detail.stats.possession, "%"],
                  ["シュート", detail.stats.shots, ""],
                  ["枠内シュート", detail.stats.shotsOnTarget, ""],
                  ["コーナーキック", detail.stats.corners, ""],
                  ["ファウル", detail.stats.fouls, ""],
                  ["パス", detail.stats.passes, ""],
                  ["パス成功率", detail.stats.passAccuracy, "%"],
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
                        <span className="w-12 text-right font-bold text-gray-800">{h}{unit}</span>
                        <span className="flex-1 text-center text-[10px] text-gray-400">{label}</span>
                        <span className="w-12 font-bold text-gray-800">{a}{unit}</span>
                      </div>
                      <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-100">
                        <div className="rounded-full" style={{ width: `${hPct}%`, background: ht?.color || "#0A1A3C" }} />
                        <div className="rounded-full" style={{ width: `${100 - hPct}%`, background: at?.color || "#666" }} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ── Members (Starters + Bench + Sub info) ── */}
        {detail && (detail.homeLineup.players.length > 0 || detail.awayLineup.players.length > 0) ? (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                メンバー
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {[
                { team: match.homeTeam, lineup: detail.homeLineup, info: ht },
                { team: match.awayTeam, lineup: detail.awayLineup, info: at },
              ].map(({ team, lineup, info }) => {
                const starters = lineup.players.filter((p) => p.isStarter);
                const bench = lineup.players.filter((p) => !p.isStarter);
                return (
                  <div key={team} className="p-4">
                    <p className="text-xs font-bold mb-2 flex items-center gap-2" style={{ color: info?.color || "#333" }}>
                      {info?.emoji} {team}
                      <span className="text-gray-400 font-normal">({lineup.formation})</span>
                    </p>

                    <p className="text-[10px] text-gray-400 font-bold mb-1 mt-3">スターター</p>
                    <div className="space-y-0.5">
                      {starters.map((p) => (
                        <PlayerRow key={p.number} player={p} teamColor={info?.color} />
                      ))}
                    </div>

                    {bench.length > 0 && (
                      <>
                        <p className="text-[10px] text-gray-400 font-bold mb-1 mt-4">ベンチ</p>
                        <div className="space-y-0.5">
                          {bench.map((p) => (
                            <PlayerRow key={p.number} player={p} teamColor={info?.color} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          /* ── Placeholder when no lineup data ── */
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
        {detail?.cards && detail.cards.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
                警告・退場
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {detail.cards.map((c, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <span className="font-black text-gray-900 w-10 text-right">{c.minute}&apos;</span>
                  <span>{c.type === "yellow" ? "🟨" : "🟥"}</span>
                  <span className="font-bold text-gray-800">{c.playerName}</span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {c.teamSide === "home" ? match.homeTeam : match.awayTeam}
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
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">大会</p>
                <p className="font-bold text-gray-800">{match.league === "J1" ? JLEAGUE_SEASON.nameJ1 : JLEAGUE_SEASON.nameJ23}</p>
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
          </div>
        </section>

        {/* ── Timeline ── */}
        {detail?.timeline && detail.timeline.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
                タイムライン
              </h2>
            </div>
            <div className="p-4">
              <div className="relative border-l-2 border-gray-200 ml-6 space-y-0">
                {detail.timeline.map((ev, i) => {
                  const borderColor =
                    ev.teamSide === "home"
                      ? ht?.color || "#0A1A3C"
                      : ev.teamSide === "away"
                        ? at?.color || "#666"
                        : "#9CA3AF";
                  return (
                    <div key={i} className="relative pl-6 pb-4">
                      <div
                        className="absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: borderColor }}
                      />
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-black text-gray-500 w-8 shrink-0 pt-0.5">
                          {ev.minute}&apos;
                        </span>
                        <span className="text-sm shrink-0">{timelineIcon[ev.type] || "📝"}</span>
                        <p className="text-xs text-gray-700 leading-relaxed">{ev.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Source note ── */}
        <p className="text-[10px] text-gray-400 text-center">
          {match.referenceNote}
        </p>
      </div>
    </div>
  );
}
