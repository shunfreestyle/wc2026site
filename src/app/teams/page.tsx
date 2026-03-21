import { teams, getGroups, getTeamsByGroup } from "@/data/teams";
import TeamCard from "@/components/TeamCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "出場チーム一覧",
  description: "2026年FIFAワールドカップ出場48チームの情報",
};

export default function TeamsPage() {
  const groups = getGroups();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          出場チーム一覧
        </h1>
        <p className="text-gray-500 mt-2">
          全48チームをグループ別に表示しています
        </p>
      </div>

      {/* All Teams by Group */}
      {groups.map((group) => {
        const groupTeams = getTeamsByGroup(group);
        return (
          <section key={group} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#E8192C] text-white text-sm font-bold px-4 py-1.5 rounded-lg">
                GROUP {group}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {groupTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Confederation Stats */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">大陸連盟別出場チーム数</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: "UEFA (欧州)", count: teams.filter((t) => t.confederation === "UEFA").length, color: "bg-blue-500" },
            { name: "CONMEBOL (南米)", count: teams.filter((t) => t.confederation === "CONMEBOL").length, color: "bg-green-500" },
            { name: "CONCACAF (北中米)", count: teams.filter((t) => t.confederation === "CONCACAF").length, color: "bg-red-500" },
            { name: "AFC (アジア)", count: teams.filter((t) => t.confederation === "AFC").length, color: "bg-yellow-500" },
            { name: "CAF (アフリカ)", count: teams.filter((t) => t.confederation === "CAF").length, color: "bg-orange-500" },
          ].map((conf) => (
            <div key={conf.name} className="text-center p-4 rounded-xl bg-gray-50">
              <div className={`w-3 h-3 ${conf.color} rounded-full mx-auto mb-2`} />
              <p className="text-2xl font-bold text-gray-900">{conf.count}</p>
              <p className="text-xs text-gray-500 mt-1">{conf.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
