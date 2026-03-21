import Link from "next/link";
import { teams, getGroups, getTeamsByGroup } from "@/data/teams";
import { matches } from "@/data/matches";
import TeamCard from "@/components/TeamCard";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  const groups = getGroups();
  const featuredTeams = teams.filter((t) =>
    ["japan", "usa", "brazil", "argentina", "france", "spain", "germany", "england"].includes(t.id)
  );
  const upcomingMatches = matches.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white" style={{ background: "#1A1A2E" }}>
        {/* Decorative stripes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 right-[10%] h-[150%]"
            style={{ width: "120px", background: "#E8192C", opacity: 0.06, transform: "rotate(15deg)" }}
          />
          <div
            className="absolute -bottom-20 left-[5%] h-[150%]"
            style={{ width: "100px", background: "#00843D", opacity: 0.07, transform: "rotate(-12deg)" }}
          />
          <div
            className="absolute -top-10 left-[35%] h-[150%]"
            style={{ width: "60px", background: "#0057A8", opacity: 0.05, transform: "rotate(8deg)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-28 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-5xl sm:text-8xl">⚽</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-4">
              FIFA World Cup
              <span className="block mt-2">
                <span className="text-[#E8192C]">20</span>
                <span className="text-[#0057A8]">2</span>
                <span className="text-[#00843D]">6</span>
              </span>
            </h1>
            <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto mb-2 sm:mb-3">
              アメリカ・メキシコ・カナダ 3カ国共同開催
            </p>
            <p className="text-xs sm:text-sm text-white/60 mb-6 sm:mb-8">
              2026年6月11日 - 7月19日 | 48チーム | 16都市
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 justify-center">
              <Link
                href="/teams"
                className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 bg-[#E8192C] text-white font-bold rounded-full hover:bg-[#c81525] transition-colors shadow-lg text-sm sm:text-base"
              >
                出場チーム一覧
              </Link>
              <Link
                href="/matches"
                className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm sm:text-base"
              >
                試合日程を見る
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5F5F5] to-transparent" />
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12 sm:mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 grid grid-cols-4 gap-2 sm:gap-6">
          {[
            { value: "48", label: "出場チーム", icon: "🏆" },
            { value: "3", label: "開催国", icon: "🌎" },
            { value: "16", label: "開催都市", icon: "🏟️" },
            { value: "104", label: "試合数", icon: "📅" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1 block">{stat.icon}</span>
              <p className="text-xl sm:text-3xl font-extrabold text-[#E8192C]">{stat.value}</p>
              <p className="text-[10px] sm:text-sm text-gray-500 mt-0.5 sm:mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Teams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">注目チーム</h2>
            <p className="text-gray-500 mt-1">優勝候補と注目国をピックアップ</p>
          </div>
          <Link
            href="/teams"
            className="text-sm font-medium text-[#E8192C] hover:underline hidden sm:block"
          >
            全チームを見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/teams"
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            全チームを見る →
          </Link>
        </div>
      </section>

      {/* Group Overview */}
      <section className="bg-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">グループステージ</h2>
            <p className="text-gray-500 mt-1">全12グループの組み合わせ</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((group) => {
              const groupTeams = getTeamsByGroup(group);
              return (
                <div
                  key={group}
                  className="border border-gray-200 rounded-xl p-5 hover:border-[#E8192C]/30 hover:shadow-md transition-all"
                >
                  <h3 className="text-sm font-bold text-[#E8192C] mb-4 tracking-wider">
                    GROUP {group}
                  </h3>
                  <div className="space-y-3">
                    {groupTeams.map((team) => (
                      <Link
                        key={team.id}
                        href={`/teams/${team.id}`}
                        className="flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors"
                      >
                        <span className="text-xl">{team.flag}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {team.nameJa}
                          </p>
                        </div>
                        <span className="text-xs text-gray-600 font-medium">#{team.fifaRanking}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">試合日程</h2>
            <p className="text-gray-500 mt-1">注目の対戦カード</p>
          </div>
          <Link
            href="/matches"
            className="text-sm font-medium text-[#E8192C] hover:underline"
          >
            全日程を見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Host Cities */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold">開催都市</h2>
            <p className="text-gray-400 mt-1">3カ国16都市で開催</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { city: "ニューヨーク", country: "🇺🇸", venue: "メットライフ・スタジアム" },
              { city: "ロサンゼルス", country: "🇺🇸", venue: "ソフィ・スタジアム" },
              { city: "ダラス", country: "🇺🇸", venue: "AT&Tスタジアム" },
              { city: "マイアミ", country: "🇺🇸", venue: "ハード・ロック・スタジアム" },
              { city: "アトランタ", country: "🇺🇸", venue: "メルセデス・ベンツ・スタジアム" },
              { city: "ヒューストン", country: "🇺🇸", venue: "NRGスタジアム" },
              { city: "フィラデルフィア", country: "🇺🇸", venue: "リンカーン・ファイナンシャル" },
              { city: "シアトル", country: "🇺🇸", venue: "ルーメン・フィールド" },
              { city: "サンフランシスコ", country: "🇺🇸", venue: "リーバイス・スタジアム" },
              { city: "カンザスシティ", country: "🇺🇸", venue: "アロウヘッド・スタジアム" },
              { city: "ボストン", country: "🇺🇸", venue: "ジレット・スタジアム" },
              { city: "メキシコシティ", country: "🇲🇽", venue: "アステカ・スタジアム" },
              { city: "グアダラハラ", country: "🇲🇽", venue: "アクロン・スタジアム" },
              { city: "モンテレイ", country: "🇲🇽", venue: "BBVAスタジアム" },
              { city: "バンクーバー", country: "🇨🇦", venue: "BCプレイス" },
              { city: "トロント", country: "🇨🇦", venue: "BMOフィールド" },
            ].map((item) => (
              <div
                key={item.city}
                className="bg-white/5 backdrop-blur rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <span className="text-lg">{item.country}</span>
                <p className="font-semibold text-white mt-1">{item.city}</p>
                <p className="text-xs text-gray-300 mt-0.5">{item.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
