"use client";

import { useState, useMemo } from "react";
import { matches, getStages } from "@/data/matches";
import MatchCard from "@/components/MatchCard";
import StageNavigation from "@/components/StageNavigation";
import { useLanguage } from '@/contexts/LanguageContext';

const FEATURED_COUNTRIES = [
  { id: "japan",        nameJa: "日本",           nameEn: "Japan",        flag: "🇯🇵" },
  { id: "brazil",       nameJa: "ブラジル",       nameEn: "Brazil",       flag: "🇧🇷" },
  { id: "france",       nameJa: "フランス",       nameEn: "France",       flag: "🇫🇷" },
  { id: "germany",      nameJa: "ドイツ",         nameEn: "Germany",      flag: "🇩🇪" },
  { id: "argentina",    nameJa: "アルゼンチン",   nameEn: "Argentina",    flag: "🇦🇷" },
  { id: "spain",        nameJa: "スペイン",       nameEn: "Spain",        flag: "🇪🇸" },
  { id: "england",      nameJa: "イングランド",   nameEn: "England",      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: "netherlands",  nameJa: "オランダ",       nameEn: "Netherlands",  flag: "🇳🇱" },
  { id: "portugal",     nameJa: "ポルトガル",     nameEn: "Portugal",     flag: "🇵🇹" },
  { id: "mexico",       nameJa: "メキシコ",       nameEn: "Mexico",       flag: "🇲🇽" },
  { id: "canada",       nameJa: "カナダ",         nameEn: "Canada",       flag: "🇨🇦" },
  { id: "korea",        nameJa: "韓国",           nameEn: "South Korea",  flag: "🇰🇷" },
  { id: "australia",    nameJa: "オーストラリア", nameEn: "Australia",     flag: "🇦🇺" },
  { id: "morocco",      nameJa: "モロッコ",       nameEn: "Morocco",      flag: "🇲🇦" },
  { id: "saudi-arabia", nameJa: "サウジアラビア", nameEn: "Saudi Arabia",  flag: "🇸🇦" },
] as const;

// Japan's potential knockout matches (Group F)
const JAPAN_POTENTIAL_MATCHES = new Set([74, 76, 89, 91]);

function formatDate(dateStr: string, loc: string) {
  const date = new Date(dateStr + "T00:00:00");
  if (loc === 'en') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  }
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${month}月${day}日（${weekdays[date.getDay()]}）`;
}

function groupByDate(list: typeof matches) {
  const map: Record<string, typeof matches> = {};
  for (const m of list) {
    if (!map[m.date]) map[m.date] = [];
    map[m.date].push(m);
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

const stageConfig: Record<string, { badge: string; bg: string; text: string; border: string }> = {
  "グループステージ": { badge: "グループステージ", bg: "#EEF2FF", text: "#3730A3", border: "#C7D2FE" },
  "ラウンド32":       { badge: "ラウンド32",       bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  "ラウンド16":       { badge: "ラウンド16",       bg: "#FFF3CD", text: "#92400E", border: "#FDE68A" },
  "準々決勝":         { badge: "準々決勝",         bg: "#FEF3C7", text: "#78350F", border: "#FCD34D" },
  "準決勝":           { badge: "準決勝",           bg: "#FDF4FF", text: "#6B21A8", border: "#E9D5FF" },
  "3位決定戦":        { badge: "3位決定戦",         bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  "決勝":             { badge: "FINAL",            bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
};

const stageConfigEn: Record<string, { badge: string; bg: string; text: string; border: string }> = {
  "グループステージ": { badge: "Group Stage",    bg: "#EEF2FF", text: "#3730A3", border: "#C7D2FE" },
  "ラウンド32":       { badge: "Round of 32",    bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  "ラウンド16":       { badge: "Round of 16",    bg: "#FFF3CD", text: "#92400E", border: "#FDE68A" },
  "準々決勝":         { badge: "Quarter-finals",  bg: "#FEF3C7", text: "#78350F", border: "#FCD34D" },
  "準決勝":           { badge: "Semi-finals",     bg: "#FDF4FF", text: "#6B21A8", border: "#E9D5FF" },
  "3位決定戦":        { badge: "Third Place",     bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  "決勝":             { badge: "FINAL",           bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
};

export default function MatchesClient() {
  const { locale } = useLanguage();
  const [selectedCountries, setSelectedCountries] = useState<Set<string>>(new Set());
  const [filterOpen, setFilterOpen] = useState(false);

  const activeStageConfig = locale === 'en' ? stageConfigEn : stageConfig;

  const toggleCountry = (id: string) => {
    setSelectedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const clearFilter = () => setSelectedCountries(new Set());

  const japanSelected = selectedCountries.has("japan");

  const filteredMatches = useMemo(() => {
    if (selectedCountries.size === 0) return matches;
    return matches.filter((m) => {
      // Direct team match
      if (selectedCountries.has(m.homeTeamId) || selectedCountries.has(m.awayTeamId)) return true;
      // Japan's potential knockout matches
      if (japanSelected && JAPAN_POTENTIAL_MATCHES.has(m.matchNumber)) return true;
      return false;
    });
  }, [selectedCountries, japanSelected]);

  const filteredStages = useMemo(() => {
    const allStages = getStages();
    if (selectedCountries.size === 0) return allStages;
    return allStages.filter((stage) =>
      filteredMatches.some((m) => m.stage === stage)
    );
  }, [filteredMatches, selectedCountries]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === 'en' ? "Match Schedule & Results" : "試合日程・結果"}
        </h1>
        <p className="text-gray-500 mt-2">
          {locale === 'en'
            ? "104 matches (72 group stage + 32 knockout)"
            : "全104試合（グループステージ72試合 + 決勝トーナメント32試合）"}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {locale === 'en'
            ? "Times shown in local timezone and JST"
            : "時刻は現地時間（タイムゾーン）と日本時間（JST）の両方を表示しています"}
        </p>
      </div>

      {/* Country Filter – compact pill */}
      <div className="relative mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity inline-flex items-center gap-1.5"
            style={selectedCountries.size > 0
              ? { background: "#DBEAFE", color: "#1E40AF", border: "1px solid #93C5FD" }
              : { background: "#F3F4F6", color: "#374151", border: "1px solid #D1D5DB" }
            }
          >
            <span>🔍</span>
            <span>{locale === 'en' ? "Country" : "国で絞り込み"}</span>
            {selectedCountries.size > 0 && (
              <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5">
                {selectedCountries.size}
              </span>
            )}
            <svg
              className={`w-3 h-3 transition-transform ${filterOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {selectedCountries.size > 0 && (
            <button
              onClick={clearFilter}
              className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors"
            >
              {locale === 'en' ? "Clear" : "リセット"}
            </button>
          )}
        </div>

        {filterOpen && (
          <div className="absolute z-20 top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 w-full max-w-md">
            <div className="flex flex-wrap gap-1.5">
              {FEATURED_COUNTRIES.map((c) => {
                const active = selectedCountries.has(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggleCountry(c.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{locale === 'en' ? c.nameEn : c.nameJa}</span>
                  </button>
                );
              })}
            </div>
            {/* Japan potential knockout notice */}
            {japanSelected && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-800 leading-relaxed">
                {locale === 'en' ? (
                  <>
                    <span className="font-bold">🇯🇵 Potential knockout matches</span> also shown.
                    1st: M76→M89, 2nd: M74→M91.
                  </>
                ) : (
                  <>
                    <span className="font-bold">🇯🇵 決勝T進出時の対戦候補</span>も表示。
                    F組1位: M76→M89、F組2位: M74→M91。
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stage Navigation */}
      <StageNavigation
        items={filteredStages.map((stage) => {
          const cfg = activeStageConfig[stage] || { badge: stage, bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
          return {
            stage,
            badge: cfg.badge,
            bg: cfg.bg,
            text: cfg.text,
            border: cfg.border,
            count: filteredMatches.filter((m) => m.stage === stage).length,
          };
        })}
      />

      {/* Matches by Stage */}
      {filteredStages.map((stage) => {
        const stageMatches = filteredMatches.filter((m) => m.stage === stage);
        const cfg = activeStageConfig[stage] || { badge: stage, bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" };
        const byDate = groupByDate(stageMatches);

        return (
          <section key={stage} id={`stage-${stage}`} className="mb-14 scroll-mt-32">
            <div className="flex items-center gap-3 mb-8">
              <span
                style={{ background: cfg.bg, color: cfg.text, border: `1px solid ${cfg.border}` }}
                className="text-sm font-bold px-4 py-1.5 rounded-full"
              >
                {cfg.badge}
              </span>
              <span className="text-sm text-gray-500">
                {locale === 'en' ? `${stageMatches.length} matches` : `${stageMatches.length}試合`}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {byDate.map(([date, dayMatches]) => (
              <div key={date} className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: cfg.text }} />
                  {formatDate(date, locale)}
                  <span className="text-xs text-gray-400 font-normal">
                    {locale === 'en' ? `(${dayMatches.length} matches)` : `（${dayMatches.length}試合）`}
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dayMatches
                    .sort((a, b) => a.localTime.localeCompare(b.localTime))
                    .map((match) => {
                      const isPotential = japanSelected && JAPAN_POTENTIAL_MATCHES.has(match.matchNumber);
                      return (
                        <div key={match.id} className={`relative ${isPotential ? "ring-2 ring-amber-300 ring-offset-1 rounded-xl" : ""}`}>
                          {isPotential && (
                            <span className="absolute -top-2 left-3 z-10 text-[11px] font-bold px-2 py-0.5 bg-amber-400 text-amber-900 rounded-full shadow-sm">
                              {locale === 'en' ? "🇯🇵 Potential match" : "🇯🇵 進出時の可能性"}
                            </span>
                          )}
                          <MatchCard match={match} />
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </section>
        );
      })}

      {/* No results */}
      {filteredMatches.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⚽</p>
          <p className="font-bold">
            {locale === 'en' ? "No matches found" : "該当する試合がありません"}
          </p>
          <p className="text-sm mt-1">
            {locale === 'en' ? "Try changing the filter" : "フィルターを変更してお試しください"}
          </p>
        </div>
      )}

      {/* Tournament Format */}
      {selectedCountries.size === 0 && (
        <>
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? "Tournament Format" : "大会形式"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(locale === 'en' ? [
                { stage: "Group Stage", desc: "12 groups x 4 teams", period: "6/11 - 6/27", count: "72 matches" },
                { stage: "Round of 32", desc: "Top 2 per group + 8 best 3rd", period: "6/28 - 7/3", count: "16 matches" },
                { stage: "Round of 16", desc: "Best 16", period: "7/4 - 7/7", count: "8 matches" },
                { stage: "QF to Final", desc: "Best 8 to Champion", period: "7/9 - 7/19", count: "8 matches" },
              ] : [
                { stage: "グループステージ", desc: "12グループ × 4チーム", period: "6/11 - 6/27", count: "72試合" },
                { stage: "ラウンド32", desc: "各グループ上位2位 + 3位8チーム", period: "6/28 - 7/3", count: "16試合" },
                { stage: "ラウンド16", desc: "ベスト16", period: "7/4 - 7/7", count: "8試合" },
                { stage: "準々決勝〜決勝", desc: "ベスト8 → 優勝", period: "7/9 - 7/19", count: "8試合" },
              ]).map((item) => (
                <div key={item.stage} className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 text-sm">{item.stage}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">{item.period}</p>
                    <p className="text-sm font-semibold text-[#E8192C] mt-1">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {locale === 'en' ? "Timezone Reference" : "タイムゾーン早見表"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {(locale === 'en' ? [
                { tz: "EDT (UTC-4)", cities: "New York, Miami, Atlanta, Boston, Philadelphia, Toronto", jst: "+13 hours" },
                { tz: "CDT (UTC-5)", cities: "Dallas, Houston, Kansas City", jst: "+14 hours" },
                { tz: "CST (UTC-6)", cities: "Mexico City, Guadalajara, Monterrey", jst: "+15 hours" },
                { tz: "PDT (UTC-7)", cities: "Los Angeles, San Francisco, Seattle, Vancouver", jst: "+16 hours" },
              ] : [
                { tz: "EDT (UTC-4)", cities: "ニューヨーク, マイアミ, アトランタ, ボストン, フィラデルフィア, トロント", jst: "+13時間" },
                { tz: "CDT (UTC-5)", cities: "ダラス, ヒューストン, カンザスシティ", jst: "+14時間" },
                { tz: "CST (UTC-6)", cities: "メキシコシティ, グアダラハラ, モンテレイ", jst: "+15時間" },
                { tz: "PDT (UTC-7)", cities: "ロサンゼルス, サンフランシスコ, シアトル, バンクーバー", jst: "+16時間" },
              ]).map((item) => (
                <div key={item.tz} className="bg-gray-50 rounded-xl p-4">
                  <p className="font-bold text-gray-900">{item.tz}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.cities}</p>
                  <p className="text-xs text-[#E8192C] font-semibold mt-2">
                    {locale === 'en' ? `JST: local time ${item.jst}` : `JST: 現地時間 ${item.jst}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
