import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPlayers, getPlayerById } from "@/data/teams";
import PlayerAvatar from "@/components/PlayerAvatar";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllPlayers().map(({ player }) => ({ id: player.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = getPlayerById(id);
  if (!result) return { title: "選手が見つかりません" };
  return {
    title: `${result.player.nameJa} | FIFA World Cup 2026`,
    description: `${result.team.nameJa}代表 ${result.player.nameJa}の選手プロフィール`,
  };
}

const positionFullName: Record<string, string> = {
  GK: "ゴールキーパー",
  DF: "ディフェンダー",
  MF: "ミッドフィールダー",
  FW: "フォワード",
};

const positionColor: Record<string, string> = {
  GK: "bg-amber-100 text-amber-800 border-amber-200",
  DF: "bg-blue-100 text-blue-800 border-blue-200",
  MF: "bg-emerald-100 text-emerald-800 border-emerald-200",
  FW: "bg-red-100 text-red-800 border-red-200",
};

export default async function PlayerDetailPage({ params }: Props) {
  const { id } = await params;
  const result = getPlayerById(id);

  if (!result) {
    notFound();
  }

  const { player, team } = result;

  // Find teammates (same team, different player)
  const teammates = team.players.filter((p) => p.id !== player.id).slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden text-white" style={{ background: "#1A1A2E" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 right-[10%] h-[150%]" style={{ width: "2px", background: "#E8192C", opacity: 0.35, transform: "rotate(15deg)" }} />
          <div className="absolute -bottom-20 left-[5%] h-[150%]" style={{ width: "2px", background: "#00843D", opacity: 0.3, transform: "rotate(-12deg)" }} />
          <div className="absolute -top-10 left-[35%] h-[150%]" style={{ width: "2px", background: "#0057A8", opacity: 0.25, transform: "rotate(8deg)" }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link
            href={`/teams/${team.id}`}
            className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-6 transition-colors"
          >
            ← {team.flag} {team.nameJa}
          </Link>
          <div className="flex items-center gap-6">
            <PlayerAvatar player={player} size="lg" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-3xl font-extrabold text-white/30">#{player.number}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {player.nameJa}
              </h1>
              <p className="text-white/70 text-lg mt-1">{player.name}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${positionColor[player.position]}`}>
                  {positionFullName[player.position]}
                </span>
                {player.isCaptain && (
                  <span className="bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
                    キャプテン
                  </span>
                )}
                {player.isNew && (
                  <span className="bg-emerald-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full">
                    初招集
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 -mt-6 mb-10">
          {[
            { label: "代表キャップ", value: `${player.caps}試合`, icon: "🏟️" },
            { label: "代表得点", value: `${player.goals}ゴール`, icon: "⚽" },
            { label: "身長", value: `${player.height}cm`, icon: "📏" },
            { label: "年齢", value: `${player.age}歳`, icon: "🎂" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center"
            >
              <span className="text-xl block mb-1">{stat.icon}</span>
              <p className="text-xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#E8192C] rounded-full" />
                選手プロフィール
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">氏名</dt>
                  <dd className="text-sm font-medium text-gray-900">{player.nameJa}</dd>
                  <dd className="text-xs text-gray-500">{player.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">生年月日</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Date(player.birthDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                  <dd className="text-xs text-gray-500">{player.age}歳</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">ポジション</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${positionColor[player.position]}`}>
                      {player.position}
                    </span>{" "}
                    {positionFullName[player.position]}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">所属クラブ</dt>
                  <dd className="text-sm font-medium text-gray-900">{player.club}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">身長</dt>
                  <dd className="text-sm font-medium text-gray-900">{player.height}cm</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">背番号</dt>
                  <dd className="text-sm font-medium text-gray-900">#{player.number}</dd>
                </div>
              </dl>
            </section>

            {/* Playing Style */}
            {player.description && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#E8192C] rounded-full" />
                  プレースタイル
                </h2>
                <p className="text-gray-700 leading-relaxed">{player.description}</p>
              </section>
            )}

            {/* International Record */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#E8192C] rounded-full" />
                代表成績
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#E8192C]">{player.caps}</p>
                  <p className="text-xs text-gray-600 mt-1">出場試合</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#E8192C]">{player.goals}</p>
                  <p className="text-xs text-gray-600 mt-1">得点数</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#E8192C]">
                    {player.caps > 0 ? (player.goals / player.caps).toFixed(2) : "0.00"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">得点率</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Info */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">所属代表チーム</h3>
              <Link
                href={`/teams/${team.id}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <span className="text-3xl">{team.flag}</span>
                <div>
                  <p className="font-bold text-gray-900">{team.nameJa}</p>
                  <p className="text-xs text-gray-500">Group {team.group} | FIFA #{team.fifaRanking}</p>
                </div>
              </Link>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-sm font-bold text-gray-900 mb-4">チームメイト</h3>
                <div className="space-y-3">
                  {teammates.map((mate) => (
                    <Link
                      key={mate.id}
                      href={`/players/${mate.id}`}
                      className="flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                    >
                      <PlayerAvatar player={mate} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">{mate.nameJa}</p>
                        <p className="text-xs text-gray-500">#{mate.number} {mate.position}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                {team.players.length > 6 && (
                  <Link
                    href={`/teams/${team.id}`}
                    className="block text-center text-xs font-medium text-[#E8192C] hover:underline mt-4 pt-3 border-t border-gray-100"
                  >
                    全選手を見る →
                  </Link>
                )}
              </section>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
          <Link
            href={`/teams/${team.id}`}
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            ← {team.nameJa}に戻る
          </Link>
          <Link
            href="/teams"
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            全チーム一覧 →
          </Link>
        </div>
      </div>
    </div>
  );
}
