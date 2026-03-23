"use client";

import { teams, getGroups, getTeamsByGroup } from "@/data/teams";
import TeamCard from "@/components/TeamCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTeamName } from "@/utils/teamName";

export default function TeamsPage() {
  const { t, locale } = useLanguage();
  const groups = getGroups();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {t.teams.pageTitle}
        </h1>
        <p className="text-gray-500 mt-2">
          {t.teams.pageSub}
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
        <h2 className="text-xl font-bold text-gray-900 mb-6">{t.teams.confederationTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: t.teams.uefa, count: teams.filter((tm) => tm.confederation === "UEFA").length, color: "bg-blue-500" },
            { name: t.teams.conmebol, count: teams.filter((tm) => tm.confederation === "CONMEBOL").length, color: "bg-green-500" },
            { name: t.teams.concacaf, count: teams.filter((tm) => tm.confederation === "CONCACAF").length, color: "bg-red-500" },
            { name: t.teams.afc, count: teams.filter((tm) => tm.confederation === "AFC").length, color: "bg-yellow-500" },
            { name: t.teams.caf, count: teams.filter((tm) => tm.confederation === "CAF").length, color: "bg-orange-500" },
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
