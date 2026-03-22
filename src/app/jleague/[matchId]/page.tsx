import Link from "next/link";
import type { Metadata } from "next";
import {
  jMatches,
  getMatchById,
  getAllMatchIds,
  getScoreDisplay,
  getRecentForm,
  getMatchDetail,
  TEAM_INFO,
  JLEAGUE_SEASON,
} from "@/data/jleague";
import type { MatchResult, JPosition, JLineup, JPlayer } from "@/data/jleague";
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

const resultBadge: Record<MatchResult, { label: string; bg: string }> = {
  W:     { label: "W",   bg: "bg-green-500" },
  L:     { label: "L",   bg: "bg-red-500" },
  D:     { label: "D",   bg: "bg-gray-400" },
  "PK+": { label: "PK+", bg: "bg-emerald-600" },
  "PK-": { label: "PK-", bg: "bg-orange-500" },
};

const posStyle: Record<JPosition, { bg: string; text: string }> = {
  GK: { bg: "#FAEEDA", text: "#633806" },
  DF: { bg: "#EEF2FF", text: "#3730A3" },
  MF: { bg: "#DCFCE7", text: "#166534" },
  FW: { bg: "#FEE2E2", text: "#991B1B" },
};

/* Split formation string into pitch lines (reversed: FW first visually) */
function splitFormation(lineup: JLineup) {
  const starters = lineup.players.filter((p) => p.isStarter);
  const nums = [1, ...lineup.formation.split("-").map(Number)];
  const lines: (typeof starters)[] = [];
  let idx = 0;
  for (const n of nums) {
    lines.push(starters.slice(idx, idx + n));
    idx += n;
  }
  return lines.reverse(); // FW line first (top of pitch)
}

const timelineIcon: Record<string, string> = {
  goal: "⚽",
  card: "🟨",
  sub:  "🔄",
  note: "📝",
  end:  "🏁",
};

/* ── Formation Pitch ─────────────────────────── */
function FormationPitch({
  lineup,
  teamColor,
  teamName,
}: {
  lineup: JLineup;
  teamColor: string;
  teamName: string;
}) {
  const lines = splitFormation(lineup);
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold px-2 py-1 rounded" style={{ background: teamColor, color: "#fff" }}>
          {teamName}
        </span>
        <span className="text-xs text-gray-500 font-bold">{lineup.formation}</span>
      </div>
      <div className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
        {/* Pitch bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d8a4e] to-[#1a6b35]" />
        {/* Pitch lines */}
        <div className="absolute inset-2 border-2 border-white/25 rounded-lg" />
        <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-white/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-white/25" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-12 border-2 border-t-0 border-white/20 rounded-b-lg" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-12 border-2 border-b-0 border-white/20 rounded-t-lg" />
        {/* Grass stripes */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 28px, #fff 28px, #fff 29px)",
        }} />

        {/* Players by line */}
        <div className="absolute inset-0 flex flex-col justify-around py-6 px-2">
          {lines.map((line, li) => (
            <div key={li} className="flex justify-around">
              {line.map((p) => (
                <div key={p.number} className="text-center w-12">
                  <div
                    className="w-7 h-7 mx-auto rounded-full border-2 border-white shadow-md flex items-center justify-center text-white text-[10px] font-black"
                    style={{ background: teamColor }}
                  >
                    {p.number}
                  </div>
                  <p className="mt-0.5 text-[9px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight whitespace-nowrap">
                    {p.name.split(" ").pop()}
                    {p.isCaptain && <span className="text-amber-300">©</span>}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Formation label */}
        <div className="absolute top-2 right-3 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded text-[9px] text-white font-bold">
          {lineup.formation}
        </div>
      </div>
    </div>
  );
}

/* ── Player Row ─────────────────────────────── */
function PlayerRow({ player }: { player: JPlayer }) {
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
        <span className="text-[9px] text-red-400 shrink-0">▼{player.subOut}&apos;</span>
      )}
      {player.subIn && (
        <span className="text-[9px] text-green-500 shrink-0">▲{player.subIn}&apos;</span>
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

  const homeForm = getRecentForm(match.homeTeam, matchId, 5);
  const awayForm = getRecentForm(match.awayTeam, matchId, 5);

  const groupMatches = jMatches.filter((m) => m.group === match.group);
  const idx = groupMatches.findIndex((m) => m.id === matchId);
  const prevMatch = idx > 0 ? groupMatches[idx - 1] : null;
  const nextMatch = idx < groupMatches.length - 1 ? groupMatches[idx + 1] : null;

  const pkDisplay =
    match.pkHome !== undefined && match.pkAway !== undefined
      ? `PK ${match.pkHome} - ${match.pkAway}`
      : match.pkWinner
        ? `PK勝ち: ${match.pkWinner === "home" ? match.homeTeam : match.awayTeam}`
        : null;

  const detail = getMatchDetail(matchId);

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
            <Link href="/jleague" className="text-white/60 hover:text-white text-sm transition-colors">
              ← 試合一覧
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

        {/* ── Recent Form ── */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
            <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-[#0A1A3C] inline-block" />
              直近5試合の戦績
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { team: match.homeTeam, form: homeForm, info: ht },
              { team: match.awayTeam, form: awayForm, info: at },
            ].map(({ team, form, info }) => (
              <div key={team} className="p-4">
                <p className="text-xs font-bold mb-3" style={{ color: info?.color || "#333" }}>
                  {info?.emoji} {team}
                </p>
                {form.length === 0 ? (
                  <p className="text-xs text-gray-400">データなし</p>
                ) : (
                  <div className="space-y-1.5">
                    {form.map((f) => {
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
            ))}
          </div>
        </section>

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

        {detail ? (
          <>
            {/* ── Goals ── */}
            {detail.goals && detail.goals.length > 0 && (
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
                      <div key={i} className="flex items-center gap-3 px-5 py-3">
                        <span className={`text-base font-black w-10 text-right ${isHome ? "text-[#0A1A3C]" : "text-gray-400"}`}>
                          {g.minute}&apos;
                        </span>
                        <span className="text-lg">⚽</span>
                        <div className="flex-1">
                          <span className={`font-bold text-sm ${isHome ? "text-gray-900" : "text-gray-600"}`}>
                            {g.playerName}
                          </span>
                          {g.assistName && (
                            <span className="text-xs text-gray-400 ml-2">(ast. {g.assistName})</span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">
                          {isHome ? match.homeTeam : match.awayTeam}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* ── Formation ── */}
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-emerald-500 inline-block" />
                  フォーメーション
                </h2>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-6">
                <FormationPitch
                  lineup={detail.homeLineup}
                  teamColor={ht?.color || "#0A1A3C"}
                  teamName={match.homeTeam}
                />
                <FormationPitch
                  lineup={detail.awayLineup}
                  teamColor={at?.color || "#333"}
                  teamName={match.awayTeam}
                />
              </div>
            </section>

            {/* ── Members ── */}
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
                          <PlayerRow key={p.number} player={p} />
                        ))}
                      </div>

                      <p className="text-[10px] text-gray-400 font-bold mb-1 mt-4">ベンチ</p>
                      <div className="space-y-0.5">
                        {bench.map((p) => (
                          <PlayerRow key={p.number} player={p} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Cards ── */}
            {detail.cards && detail.cards.length > 0 && (
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

            {/* ── Stats ── */}
            {detail.stats && (
              <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-blue-500 inline-block" />
                    スタッツ
                  </h2>
                </div>
                <div className="p-5 space-y-3">
                  {/* Team headers */}
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
                      ["イエローカード", detail.stats.yellowCards, ""],
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
                            <span className="w-12 text-right font-bold text-gray-800">
                              {h}{unit}
                            </span>
                            <span className="flex-1 text-center text-[10px] text-gray-400">{label}</span>
                            <span className="w-12 font-bold text-gray-800">
                              {a}{unit}
                            </span>
                          </div>
                          <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-100">
                            <div
                              className="rounded-full transition-all"
                              style={{ width: `${hPct}%`, background: ht?.color || "#0A1A3C" }}
                            />
                            <div
                              className="rounded-full transition-all"
                              style={{ width: `${100 - hPct}%`, background: at?.color || "#666" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            {/* ── Timeline ── */}
            {detail.timeline && detail.timeline.length > 0 && (
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
                          {/* Dot */}
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
          </>
        ) : (
          /* ── Placeholder ── */
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
        )}

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
