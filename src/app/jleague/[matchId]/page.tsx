import { jMatches, getJMatchById } from "@/data/jleague";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FormationView from "@/components/jleague/FormationView";
import StatBar from "@/components/jleague/StatBar";
import MatchTimeline from "@/components/jleague/MatchTimeline";
import Link from "next/link";

type Props = {
  params: Promise<{ matchId: string }>;
};

export async function generateStaticParams() {
  return jMatches.map((m) => ({ matchId: m.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { matchId } = await params;
  const m = getJMatchById(matchId);
  if (!m) return { title: "試合が見つかりません" };
  return {
    title: `${m.homeTeam.name} vs ${m.awayTeam.name} | ${m.league}第${m.round}節 | SAMURAI FOOTBALL`,
    description: `${m.league}第${m.round}節 ${m.homeTeam.name} vs ${m.awayTeam.name}の試合詳細。スコア・得点者・スタメン・試合データ。`,
  };
}

export default async function JMatchDetailPage({ params }: Props) {
  const { matchId } = await params;
  const m = getJMatchById(matchId);
  if (!m) notFound();

  const hc = m.homeTeam.color;
  const ac = m.awayTeam.color;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero: スコアカード */}
      <div className="text-white py-8 px-4" style={{ background: "linear-gradient(135deg, #0A1A3C, #1a3570)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
              {m.league} 第{m.round}節
            </span>
            <span className="text-xs text-white/50">{m.date}</span>
            <span className="text-xs text-white/50">{m.stadium}</span>
            {m.attendance && <span className="text-xs text-white/40">{m.attendance.toLocaleString()}人</span>}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <div className="text-3xl mb-1">{m.homeTeam.emblemEmoji || "🏟️"}</div>
              <p className="text-sm font-bold text-white/90">{m.homeTeam.name}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.12)" }}>
                <span className="text-4xl font-black">{m.homeScore}</span>
                <span className="text-2xl text-white/40">-</span>
                <span className="text-4xl font-black">{m.awayScore}</span>
              </div>
              {m.htHomeScore !== undefined && (
                <p className="text-[10px] text-white/40 mt-1">HT {m.htHomeScore}-{m.htAwayScore}</p>
              )}
            </div>
            <div className="flex-1 text-center">
              <div className="text-3xl mb-1">{m.awayTeam.emblemEmoji || "🏟️"}</div>
              <p className="text-sm font-bold text-white/90">{m.awayTeam.name}</p>
            </div>
          </div>

          <p className="text-center text-[10px] text-white/30 mt-4">
            {m.referenceNote}
            {m.officialUrl && (
              <a href={m.officialUrl} target="_blank" rel="noopener noreferrer" className="ml-1 underline text-white/40 hover:text-white/60">
                公式ページ →
              </a>
            )}
          </p>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* 得点経過 */}
        {m.goals && m.goals.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: "#3C3489" }} />
              得点経過
            </h2>
            <div className="space-y-2">
              {m.goals.map((g, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs font-bold text-gray-400 w-8 shrink-0">{g.minute}&apos;</span>
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: g.teamSide === "home" ? hc : ac }} />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-900">{g.playerName}</span>
                    {g.assistName && <span className="text-xs text-gray-400 ml-1">（A: {g.assistName}）</span>}
                    {g.isPenalty && <span className="text-xs text-gray-400 ml-1">PK</span>}
                    {g.isOwn && <span className="text-xs text-gray-400 ml-1">OG</span>}
                  </div>
                  <span className="text-xs font-bold shrink-0" style={{ color: g.teamSide === "home" ? hc : ac }}>
                    {g.teamSide === "home" ? m.homeTeam.shortName : m.awayTeam.shortName}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 試合データ */}
        {m.stats && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: "#3C3489" }} />
              試合データ
            </h2>
            <div className="flex items-center justify-between text-[10px] font-bold mb-3">
              <span style={{ color: hc }}>{m.homeTeam.shortName}</span>
              <span className="text-gray-300">vs</span>
              <span style={{ color: ac }}>{m.awayTeam.shortName}</span>
            </div>
            <StatBar label="ポゼッション" home={m.stats.possession[0]} away={m.stats.possession[1]} homeColor={hc} awayColor={ac} isPercent />
            <StatBar label="シュート数" home={m.stats.shots[0]} away={m.stats.shots[1]} homeColor={hc} awayColor={ac} />
            <StatBar label="枠内シュート" home={m.stats.shotsOnTarget[0]} away={m.stats.shotsOnTarget[1]} homeColor={hc} awayColor={ac} />
            {m.stats.passes && <StatBar label="パス数" home={m.stats.passes[0]} away={m.stats.passes[1]} homeColor={hc} awayColor={ac} />}
            {m.stats.passAccuracy && <StatBar label="パス成功率" home={m.stats.passAccuracy[0]} away={m.stats.passAccuracy[1]} homeColor={hc} awayColor={ac} isPercent />}
            <StatBar label="コーナーキック" home={m.stats.corners[0]} away={m.stats.corners[1]} homeColor={hc} awayColor={ac} />
            <StatBar label="ファウル数" home={m.stats.fouls[0]} away={m.stats.fouls[1]} homeColor={hc} awayColor={ac} />
            <StatBar label="イエローカード" home={m.stats.yellowCards[0]} away={m.stats.yellowCards[1]} homeColor={hc} awayColor={ac} />
          </section>
        )}

        {/* スターティングメンバー */}
        {(m.homeFormation || m.awayFormation) && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: "#3C3489" }} />
              スターティングメンバー
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {m.homeFormation && <FormationView formation={m.homeFormation} teamColor={hc} teamName={m.homeTeam.shortName} />}
              {m.awayFormation && <FormationView formation={m.awayFormation} teamColor={ac} teamName={m.awayTeam.shortName} />}
            </div>
          </section>
        )}

        {/* 試合展開タイムライン */}
        {m.timeline && m.timeline.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full" style={{ background: "#3C3489" }} />
              試合展開
            </h2>
            <MatchTimeline events={m.timeline} />
          </section>
        )}

        <div className="pt-2">
          <Link href="/jleague" className="text-sm text-blue-600 hover:underline">← J1リーグ一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}
