"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ticketMatches, type TicketMatch } from "@/data/ticket-links";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Stage config ─────────────────────────────────────────
const STAGES = [
  { key: "ラウンド32", ja: "ラウンド32", en: "Round of 32", bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA" },
  { key: "ラウンド16", ja: "ラウンド16", en: "Round of 16", bg: "#FFF3CD", text: "#92400E", border: "#FDE68A" },
  { key: "準々決勝", ja: "準々決勝", en: "Quarterfinals", bg: "#FEF3C7", text: "#78350F", border: "#FCD34D" },
  { key: "準決勝", ja: "準決勝", en: "Semifinals", bg: "#FDF4FF", text: "#6B21A8", border: "#E9D5FF" },
  { key: "3位決定戦", ja: "3位決定戦", en: "Third Place", bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  { key: "決勝", ja: "決勝", en: "Final", bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
];

// Potential knockout matches by team (same as MatchesClient)
const POTENTIAL_MATCHES_BY_TEAM: Record<string, number[]> = {
  "japan":        [74, 75, 76, 89, 90, 91, 97, 98, 101, 102, 103, 104],
  "netherlands":  [74, 75, 76, 89, 90, 91, 97, 98, 101, 102, 103, 104],
  "brazil":       [74, 75, 76, 91, 89, 90, 98, 97, 101, 102, 103, 104],
  "morocco":      [74, 75, 76, 91, 89, 90, 98, 97, 101, 102, 103, 104],
  "france":       [77, 78, 90, 91, 97, 98, 101, 102, 103, 104],
  "germany":      [74, 77, 90, 91, 97, 98, 101, 102, 103, 104],
  "spain":        [83, 87, 93, 95, 98, 100, 102, 101, 103, 104],
  "saudi-arabia": [83, 87, 93, 95, 98, 100, 102, 101, 103, 104],
  "argentina":    [87, 83, 95, 93, 100, 98, 102, 101, 103, 104],
  "portugal":     [84, 88, 93, 96, 100, 98, 102, 101, 103, 104],
  "england":      [80, 84, 92, 93, 98, 99, 101, 102, 103, 104],
  "mexico":       [79, 73, 92, 90, 98, 97, 101, 102, 103, 104],
  "korea":        [79, 73, 92, 90, 98, 97, 101, 102, 103, 104],
  "canada":       [85, 73, 96, 90, 100, 97, 101, 102, 103, 104],
  "usa":          [81, 82, 86, 94, 96, 99, 100, 102, 101, 103, 104],
  "australia":    [81, 82, 86, 94, 96, 99, 100, 102, 101, 103, 104],
};

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
  { id: "usa",          nameJa: "アメリカ",       nameEn: "USA",          flag: "🇺🇸" },
  { id: "australia",    nameJa: "オーストラリア", nameEn: "Australia",     flag: "🇦🇺" },
  { id: "morocco",      nameJa: "モロッコ",       nameEn: "Morocco",      flag: "🇲🇦" },
  { id: "saudi-arabia", nameJa: "サウジアラビア", nameEn: "Saudi Arabia",  flag: "🇸🇦" },
] as const;

function formatDate(dateStr: string, loc: string) {
  const date = new Date(dateStr + "T00:00:00");
  if (loc === "en") {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
  }
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${month}月${day}日（${weekdays[date.getDay()]}）`;
}

// ── Ticket button ────────────────────────────────────────
function TicketButton({ href, label, color, hoverColor }: {
  href: string; label: string; color: string; hoverColor: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-90 hover:shadow-md active:scale-95"
      style={{ background: color }}
      onMouseEnter={(e) => (e.currentTarget.style.background = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.background = color)}
    >
      {label}
    </a>
  );
}

// ── Match ticket card ────────────────────────────────────
function TicketCard({ match, locale }: { match: TicketMatch; locale: string }) {
  const stageInfo = STAGES.find((s) => s.key === match.stage);
  const stageName = locale === "en" ? (stageInfo?.en ?? match.stageEn) : (stageInfo?.ja ?? match.stage);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{
              background: stageInfo?.bg ?? "#F3F4F6",
              color: stageInfo?.text ?? "#374151",
              border: `1px solid ${stageInfo?.border ?? "#D1D5DB"}`,
            }}
          >
            {stageName}
          </span>
          <span className="text-[11px] text-gray-400">#{match.matchNumber}</span>
        </div>

        {/* Match info */}
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex-1">
            <p className="font-semibold text-gray-800 text-sm">
              {locale === "en" ? match.homeLabelEn : match.homeLabel}
            </p>
          </div>
          <div className="shrink-0 bg-gray-50 rounded-lg px-3 py-1">
            <span className="text-xs font-medium text-gray-500">VS</span>
          </div>
          <div className="flex-1 text-right">
            <p className="font-semibold text-gray-800 text-sm">
              {locale === "en" ? match.awayLabelEn : match.awayLabel}
            </p>
          </div>
        </div>

        {/* Date & venue */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(match.date, locale)}</span>
          <span className="text-gray-300">|</span>
          <span>{match.localTime} ({match.timezone})</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">
            {locale === "en" ? match.venueEn : match.venue}, {locale === "en" ? match.cityEn : match.city}
          </span>
        </div>
      </div>

      {/* Ticket buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wide">
          {locale === "en" ? "Buy Resale Tickets" : "リセールチケット購入"}
        </p>
        <div className="flex gap-2">
          <TicketButton href={match.links.stubhub} label="StubHub" color="#3B1C8C" hoverColor="#2D1570" />
          <TicketButton href={match.links.seatgeek} label="SeatGeek" color="#FF5722" hoverColor="#E64A19" />
          <TicketButton href={match.links.gametime} label="Gametime" color="#00C853" hoverColor="#00A844" />
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────
export default function TicketsClient() {
  const { locale } = useLanguage();
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [teamFilterOpen, setTeamFilterOpen] = useState(false);

  const filteredMatches = useMemo(() => {
    let result = ticketMatches;

    if (selectedStage) {
      result = result.filter((m) => m.stage === selectedStage);
    }

    if (selectedTeam) {
      const potentials = POTENTIAL_MATCHES_BY_TEAM[selectedTeam];
      if (potentials) {
        result = result.filter((m) => potentials.includes(m.matchNumber));
      }
    }

    return result;
  }, [selectedStage, selectedTeam]);

  const groupedByStage = useMemo(() => {
    const map: Record<string, TicketMatch[]> = {};
    for (const m of filteredMatches) {
      if (!map[m.stage]) map[m.stage] = [];
      map[m.stage].push(m);
    }
    return STAGES
      .filter((s) => map[s.key])
      .map((s) => ({ stage: s, matches: map[s.key] }));
  }, [filteredMatches]);

  const selectedTeamInfo = FEATURED_COUNTRIES.find((c) => c.id === selectedTeam);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === "en" ? "Knockout Stage Tickets" : "決勝トーナメント チケット"}
        </h1>
        <p className="text-gray-500 mt-2">
          {locale === "en"
            ? "Compare resale ticket prices across StubHub, SeatGeek & Gametime"
            : "StubHub・SeatGeek・Gametime のリセールチケットを比較"}
        </p>
        <div className="mt-3 flex items-center gap-3">
          <Link
            href="/bracket"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            {locale === "en" ? "View Tournament Bracket" : "トーナメント表を見る"}
          </Link>
          <Link
            href="/matches"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {locale === "en" ? "Match Schedule" : "試合日程"}
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        {/* Stage filter */}
        <div>
          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
            {locale === "en" ? "Filter by Round" : "ラウンドで絞り込み"}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStage("")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                !selectedStage
                  ? "bg-gray-900 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {locale === "en" ? "All Rounds" : "全ラウンド"}
            </button>
            {STAGES.map((s) => (
              <button
                key={s.key}
                onClick={() => setSelectedStage(selectedStage === s.key ? "" : s.key)}
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer"
                style={
                  selectedStage === s.key
                    ? { background: s.text, color: "#fff" }
                    : { background: s.bg, color: s.text, border: `1px solid ${s.border}` }
                }
              >
                {locale === "en" ? s.en : s.ja}
              </button>
            ))}
          </div>
        </div>

        {/* Team filter */}
        <div className="relative">
          <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
            {locale === "en" ? "Filter by Team" : "チームで絞り込み"}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setTeamFilterOpen(!teamFilterOpen)}
              className="text-sm font-bold px-4 py-2 rounded-full hover:opacity-80 active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              style={
                selectedTeam
                  ? { background: "#DBEAFE", color: "#1E40AF", border: "1px solid #93C5FD" }
                  : { background: "#F3F4F6", color: "#374151", border: "1px solid #D1D5DB" }
              }
            >
              {selectedTeamInfo ? (
                <>
                  <span>{selectedTeamInfo.flag}</span>
                  <span>{locale === "en" ? selectedTeamInfo.nameEn : selectedTeamInfo.nameJa}</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>{locale === "en" ? "Select Team" : "チーム選択"}</span>
                </>
              )}
              <svg
                className={`w-3 h-3 transition-transform ${teamFilterOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {selectedTeam && (
              <button
                onClick={() => { setSelectedTeam(""); setTeamFilterOpen(false); }}
                className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                {locale === "en" ? "Clear" : "リセット"}
              </button>
            )}
          </div>

          {teamFilterOpen && (
            <div className="absolute z-50 top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-3 w-full max-w-md max-h-80 overflow-y-auto">
              <div className="flex flex-wrap gap-1.5">
                {FEATURED_COUNTRIES.map((c) => {
                  const active = selectedTeam === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedTeam(active ? "" : c.id);
                        setTeamFilterOpen(false);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                        active
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <span>{c.flag}</span>
                      <span>{locale === "en" ? c.nameEn : c.nameJa}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {locale === "en"
          ? `${filteredMatches.length} match${filteredMatches.length !== 1 ? "es" : ""}`
          : `${filteredMatches.length}試合`}
      </p>

      {/* Match cards grouped by stage */}
      {groupedByStage.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            {locale === "en" ? "No matches found" : "該当する試合がありません"}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedByStage.map(({ stage, matches }) => (
            <section key={stage.key}>
              <h2
                className="text-lg font-bold mb-4 px-3 py-1.5 rounded-lg inline-block"
                style={{ background: stage.bg, color: stage.text }}
              >
                {locale === "en" ? stage.en : stage.ja}
                <span className="text-xs font-normal ml-2 opacity-70">
                  ({matches.length}{locale === "en" ? " matches" : "試合"})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matches.map((m) => (
                  <TicketCard key={m.matchNumber} match={m} locale={locale} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-800 font-medium">
          {locale === "en"
            ? "Disclaimer: These are third-party resale platforms. Prices may vary. FIFA officially transfers tickets through the FWC2026 Mobile Tickets App. Please verify ticket authenticity before purchasing."
            : "注意: これらはサードパーティのリセールプラットフォームです。価格は変動します。FIFAの公式チケット移転はFWC2026モバイルチケットアプリを通じて行われます。購入前にチケットの正当性をご確認ください。"}
        </p>
      </div>
    </div>
  );
}
