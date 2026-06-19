"use client";

import { getTeamsByGroup } from "@/data/teams";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Layout constants ──────────────────────────────────────
const TEAM_H = 26;
const MATCH_H = TEAM_H * 2;
const HALF_H = 512; // height for each half (8 R32 matches)
const R32_COL_W = 185;
const COL_W = 130;
const CONN_W = 28;
const FINAL_W = 150;

function centers(count: number): number[] {
  const slot = HALF_H / count;
  return Array.from({ length: count }, (_, i) => i * slot + slot / 2);
}

const r32Y = centers(8);
const r16Y = centers(4);
const qfY = centers(2);
const sfY = centers(1);

// ── Slot types ────────────────────────────────────────────
type Slot = {
  label: string;
  labelEn: string;
  group?: string;
  thirdGroups?: string;
};

type MatchData = {
  num: number;
  home: Slot;
  away: Slot;
};

type KOMatch = { num: number; homeRef: string; awayRef: string };

// ── Left half (SF M101) ──────────────────────────────────
const leftR32: MatchData[] = [
  { num: 73, home: { label: "A組2位", labelEn: "A 2nd", group: "A" }, away: { label: "B組2位", labelEn: "B 2nd", group: "B" } },
  { num: 76, home: { label: "F組1位", labelEn: "F 1st", group: "F" }, away: { label: "C組2位", labelEn: "C 2nd", group: "C" } },
  { num: 75, home: { label: "E組1位", labelEn: "E 1st", group: "E" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "A/B/C/D/F" } },
  { num: 78, home: { label: "I組1位", labelEn: "I 1st", group: "I" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "C/D/F/G/H" } },
  { num: 83, home: { label: "H組1位", labelEn: "H 1st", group: "H" }, away: { label: "J組2位", labelEn: "J 2nd", group: "J" } },
  { num: 84, home: { label: "K組2位", labelEn: "K 2nd", group: "K" }, away: { label: "L組2位", labelEn: "L 2nd", group: "L" } },
  { num: 81, home: { label: "G組1位", labelEn: "G 1st", group: "G" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "A/E/H/I/J" } },
  { num: 82, home: { label: "D組1位", labelEn: "D 1st", group: "D" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "B/E/F/I/J" } },
];

const leftR16: KOMatch[] = [
  { num: 89, homeRef: "M73", awayRef: "M76" },
  { num: 90, homeRef: "M75", awayRef: "M78" },
  { num: 93, homeRef: "M83", awayRef: "M84" },
  { num: 94, homeRef: "M81", awayRef: "M82" },
];

const leftQF: KOMatch[] = [
  { num: 97, homeRef: "M89", awayRef: "M90" },
  { num: 98, homeRef: "M93", awayRef: "M94" },
];

const leftSF: KOMatch[] = [
  { num: 101, homeRef: "M97", awayRef: "M98" },
];

// ── Right half (SF M102) ─────────────────────────────────
const rightR32: MatchData[] = [
  { num: 74, home: { label: "C組1位", labelEn: "C 1st", group: "C" }, away: { label: "F組2位", labelEn: "F 2nd", group: "F" } },
  { num: 77, home: { label: "E組2位", labelEn: "E 2nd", group: "E" }, away: { label: "I組2位", labelEn: "I 2nd", group: "I" } },
  { num: 79, home: { label: "A組1位", labelEn: "A 1st", group: "A" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "C/E/F/H/I" } },
  { num: 80, home: { label: "L組1位", labelEn: "L 1st", group: "L" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "E/H/I/J/K" } },
  { num: 87, home: { label: "J組1位", labelEn: "J 1st", group: "J" }, away: { label: "H組2位", labelEn: "H 2nd", group: "H" } },
  { num: 86, home: { label: "D組2位", labelEn: "D 2nd", group: "D" }, away: { label: "G組2位", labelEn: "G 2nd", group: "G" } },
  { num: 85, home: { label: "B組1位", labelEn: "B 1st", group: "B" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "E/F/G/I/J" } },
  { num: 88, home: { label: "K組1位", labelEn: "K 1st", group: "K" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "D/E/I/J/L" } },
];

const rightR16: KOMatch[] = [
  { num: 91, homeRef: "M74", awayRef: "M77" },
  { num: 92, homeRef: "M79", awayRef: "M80" },
  { num: 95, homeRef: "M87", awayRef: "M86" },
  { num: 96, homeRef: "M85", awayRef: "M88" },
];

const rightQF: KOMatch[] = [
  { num: 99, homeRef: "M91", awayRef: "M92" },
  { num: 100, homeRef: "M95", awayRef: "M96" },
];

const rightSF: KOMatch[] = [
  { num: 102, homeRef: "M99", awayRef: "M100" },
];

// ── Left connector (flows left→right) ────────────────────
function ConnectorLR({ inputCenters, outputCenters }: { inputCenters: number[]; outputCenters: number[] }) {
  const lines: React.ReactNode[] = [];
  const midX = CONN_W / 2;
  for (let i = 0; i < outputCenters.length; i++) {
    const y1 = inputCenters[i * 2];
    const y2 = inputCenters[i * 2 + 1];
    const yOut = outputCenters[i];
    lines.push(<div key={`h1-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: y1, left: 0, width: midX }} />);
    lines.push(<div key={`h2-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: y2, left: 0, width: midX }} />);
    lines.push(<div key={`v-${i}`} className="absolute border-l-2 border-gray-300" style={{ top: y1, left: midX, height: y2 - y1 }} />);
    lines.push(<div key={`ho-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: yOut, left: midX, width: CONN_W - midX }} />);
  }
  return <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>{lines}</div>;
}

// ── Right connector (flows right→left, mirrored) ─────────
function ConnectorRL({ inputCenters, outputCenters }: { inputCenters: number[]; outputCenters: number[] }) {
  const lines: React.ReactNode[] = [];
  const midX = CONN_W / 2;
  for (let i = 0; i < outputCenters.length; i++) {
    const y1 = inputCenters[i * 2];
    const y2 = inputCenters[i * 2 + 1];
    const yOut = outputCenters[i];
    // Horizontal from right edge to vertical
    lines.push(<div key={`h1-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: y1, right: 0, width: midX }} />);
    lines.push(<div key={`h2-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: y2, right: 0, width: midX }} />);
    // Vertical on right side
    lines.push(<div key={`v-${i}`} className="absolute border-r-2 border-gray-300" style={{ top: y1, right: midX - 2, height: y2 - y1 }} />);
    // Output horizontal from vertical to left
    lines.push(<div key={`ho-${i}`} className="absolute border-t-2 border-gray-300" style={{ top: yOut, left: 0, width: midX }} />);
  }
  return <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>{lines}</div>;
}

// ── Team slot component ──────────────────────────────────
function TeamSlot({
  slot,
  groupFlags,
  locale,
  position,
  mirrored,
}: {
  slot: Slot;
  groupFlags: Record<string, string>;
  locale: string;
  position: "home" | "away";
  mirrored?: boolean;
}) {
  const isThird = !!slot.thirdGroups;
  const flags = slot.group ? groupFlags[slot.group] : undefined;
  const label = locale === "ja" ? slot.label : slot.labelEn;
  const borderClass = position === "home" ? "border-b border-gray-200" : "";
  const dir = mirrored ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className={`flex items-center gap-1 px-2 ${borderClass} ${dir}`}
      style={{ height: TEAM_H }}
    >
      {flags && (
        <span className="text-xs leading-none shrink-0 tracking-tight">{flags}</span>
      )}
      {isThird ? (
        <span className="text-[10px] text-gray-500 truncate">
          3{locale === "ja" ? "位" : "rd"} ({slot.thirdGroups})
        </span>
      ) : (
        <span className="text-xs font-medium text-gray-700 truncate">{label}</span>
      )}
    </div>
  );
}

// ── R32 Match box ────────────────────────────────────────
function R32MatchBox({
  match,
  groupFlags,
  locale,
  width,
  mirrored,
}: {
  match: MatchData;
  groupFlags: Record<string, string>;
  locale: string;
  width: number;
  mirrored?: boolean;
}) {
  return (
    <div
      className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden"
      style={{ width, height: MATCH_H }}
    >
      <TeamSlot slot={match.home} groupFlags={groupFlags} locale={locale} position="home" mirrored={mirrored} />
      <TeamSlot slot={match.away} groupFlags={groupFlags} locale={locale} position="away" mirrored={mirrored} />
    </div>
  );
}

// ── KO Match box (R16+) ─────────────────────────────────
function KOMatchBox({
  match,
  locale,
  width,
  mirrored,
}: {
  match: KOMatch;
  locale: string;
  width: number;
  mirrored?: boolean;
}) {
  const align = mirrored ? "text-right" : "text-left";
  return (
    <div
      className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden"
      style={{ width, height: MATCH_H }}
    >
      <div
        className={`flex items-center px-2 border-b border-gray-200 text-xs font-medium text-gray-600 ${mirrored ? "justify-end" : ""}`}
        style={{ height: TEAM_H }}
      >
        <span className={align}>{match.homeRef}{locale === "ja" ? "勝者" : " W"}</span>
      </div>
      <div
        className={`flex items-center px-2 text-xs font-medium text-gray-600 ${mirrored ? "justify-end" : ""}`}
        style={{ height: TEAM_H }}
      >
        <span className={align}>{match.awayRef}{locale === "ja" ? "勝者" : " W"}</span>
      </div>
    </div>
  );
}

// ── Round column (left side, flowing →) ──────────────────
function RoundColumnLeft({
  r32Matches,
  koMatches,
  yCenters,
  groupFlags,
  locale,
  isR32,
  width,
  roundLabel,
}: {
  r32Matches?: MatchData[];
  koMatches?: KOMatch[];
  yCenters: number[];
  groupFlags: Record<string, string>;
  locale: string;
  isR32: boolean;
  width: number;
  roundLabel: string;
}) {
  const items = isR32 ? r32Matches! : koMatches!;
  return (
    <div className="relative shrink-0" style={{ width, height: HALF_H }}>
      <div className="absolute -top-8 left-0 right-0 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {roundLabel}
      </div>
      {items.map((match, i) => (
        <div key={match.num} className="absolute" style={{ top: yCenters[i] - MATCH_H / 2, left: 0 }}>
          <div className="absolute -top-3.5 left-1 text-[9px] font-semibold text-[#E8192C]">M{match.num}</div>
          {isR32 ? (
            <R32MatchBox match={match as MatchData} groupFlags={groupFlags} locale={locale} width={width} />
          ) : (
            <KOMatchBox match={match as KOMatch} locale={locale} width={width} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Round column (right side, flowing ←) ─────────────────
function RoundColumnRight({
  r32Matches,
  koMatches,
  yCenters,
  groupFlags,
  locale,
  isR32,
  width,
  roundLabel,
}: {
  r32Matches?: MatchData[];
  koMatches?: KOMatch[];
  yCenters: number[];
  groupFlags: Record<string, string>;
  locale: string;
  isR32: boolean;
  width: number;
  roundLabel: string;
}) {
  const items = isR32 ? r32Matches! : koMatches!;
  return (
    <div className="relative shrink-0" style={{ width, height: HALF_H }}>
      <div className="absolute -top-8 left-0 right-0 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
        {roundLabel}
      </div>
      {items.map((match, i) => (
        <div key={match.num} className="absolute" style={{ top: yCenters[i] - MATCH_H / 2, right: 0 }}>
          <div className="absolute -top-3.5 right-1 text-[9px] font-semibold text-[#E8192C]">M{match.num}</div>
          {isR32 ? (
            <R32MatchBox match={match as MatchData} groupFlags={groupFlags} locale={locale} width={width} mirrored />
          ) : (
            <KOMatchBox match={match as KOMatch} locale={locale} width={width} mirrored />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function BracketPage() {
  const { locale } = useLanguage();

  const groupFlags: Record<string, string> = {};
  for (const g of "ABCDEFGHIJKL".split("")) {
    groupFlags[g] = getTeamsByGroup(g).map((t) => t.flag).join("");
  }

  // Total width: left half + center final + right half
  const halfWidth = R32_COL_W + CONN_W + COL_W + CONN_W + COL_W + CONN_W + COL_W;
  // = 185 + 28 + 130 + 28 + 130 + 28 + 130 = 659
  const totalWidth = halfWidth + CONN_W + FINAL_W + CONN_W + halfWidth;
  // = 659 + 28 + 150 + 28 + 659 = 1524

  const r32Label = locale === "ja" ? "ラウンド32" : "Round of 32";
  const r16Label = locale === "ja" ? "ラウンド16" : "Round of 16";
  const qfLabel = locale === "ja" ? "準々決勝" : "QF";
  const sfLabel = locale === "ja" ? "準決勝" : "SF";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          {locale === "ja" ? "トーナメント表" : "Tournament Bracket"}
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          {locale === "ja"
            ? "FIFA ワールドカップ 2026 - ラウンド32から決勝までの全対戦表"
            : "FIFA World Cup 2026 - Full bracket from Round of 32 to the Final"}
        </p>
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="inline-block w-3 h-3 rounded bg-white border border-gray-300" />
            {locale === "ja" ? "1位・2位（国旗付き）" : "1st/2nd (with flags)"}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="inline-block w-3 h-3 rounded bg-gray-50 border border-dashed border-gray-300" />
            {locale === "ja" ? "3位（グループ名のみ）" : "3rd (group letters only)"}
          </div>
        </div>
      </div>

      {/* Bracket */}
      <div className="overflow-x-auto pb-4">
        <div
          className="relative"
          style={{ width: totalWidth, height: HALF_H + 48, paddingTop: 36 }}
        >
          <div className="absolute top-9 left-0 flex items-start" style={{ height: HALF_H }}>
            {/* ═══ LEFT HALF (SF M101) ═══ */}
            <RoundColumnLeft r32Matches={leftR32} yCenters={r32Y} groupFlags={groupFlags} locale={locale} isR32 width={R32_COL_W} roundLabel={r32Label} />
            <ConnectorLR inputCenters={r32Y} outputCenters={r16Y} />
            <RoundColumnLeft koMatches={leftR16} yCenters={r16Y} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={r16Label} />
            <ConnectorLR inputCenters={r16Y} outputCenters={qfY} />
            <RoundColumnLeft koMatches={leftQF} yCenters={qfY} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={qfLabel} />
            <ConnectorLR inputCenters={qfY} outputCenters={sfY} />
            <RoundColumnLeft koMatches={leftSF} yCenters={sfY} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={sfLabel} />

            {/* ═══ LEFT SF → FINAL connector ═══ */}
            <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>
              <div className="absolute border-t-2 border-gray-300" style={{ top: sfY[0], left: 0, width: CONN_W }} />
            </div>

            {/* ═══ FINAL (CENTER) ═══ */}
            <div className="relative shrink-0" style={{ width: FINAL_W, height: HALF_H }}>
              <div className="absolute -top-8 left-0 right-0 text-center text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                {locale === "ja" ? "決勝" : "Final"}
              </div>
              {/* Final match */}
              <div className="absolute" style={{ top: sfY[0] - MATCH_H / 2, left: 0 }}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-amber-600">M104</div>
                <div
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded-lg shadow-md overflow-hidden"
                  style={{ width: FINAL_W, height: MATCH_H }}
                >
                  <div className="flex items-center justify-center px-2 border-b border-amber-200 text-xs font-bold text-amber-800" style={{ height: TEAM_H }}>
                    M101{locale === "ja" ? "勝者" : " Winner"}
                  </div>
                  <div className="flex items-center justify-center px-2 text-xs font-bold text-amber-800" style={{ height: TEAM_H }}>
                    M102{locale === "ja" ? "勝者" : " Winner"}
                  </div>
                </div>
              </div>
              {/* Trophy icon */}
              <div className="absolute text-2xl" style={{ top: sfY[0] - MATCH_H / 2 - 28, left: '50%', transform: 'translateX(-50%)' }}>
                🏆
              </div>
              {/* 3rd Place Match */}
              <div className="absolute" style={{ top: sfY[0] + MATCH_H / 2 + 24, left: 0 }}>
                <div className="text-[10px] text-green-600 font-bold mb-1 text-center">
                  {locale === "ja" ? "3位決定戦" : "3rd Place"}
                </div>
                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-green-700 hidden">M103</div>
                <div
                  className="bg-green-50 border border-green-300 rounded shadow-sm overflow-hidden"
                  style={{ width: FINAL_W, height: MATCH_H }}
                >
                  <div className="flex items-center justify-center px-2 border-b border-green-200 text-xs font-medium text-green-700" style={{ height: TEAM_H }}>
                    M101{locale === "ja" ? "敗者" : " Loser"}
                  </div>
                  <div className="flex items-center justify-center px-2 text-xs font-medium text-green-700" style={{ height: TEAM_H }}>
                    M102{locale === "ja" ? "敗者" : " Loser"}
                  </div>
                </div>
                <div className="text-[9px] text-green-500 text-center mt-0.5">M103</div>
              </div>
            </div>

            {/* ═══ FINAL → RIGHT SF connector ═══ */}
            <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>
              <div className="absolute border-t-2 border-gray-300" style={{ top: sfY[0], left: 0, width: CONN_W }} />
            </div>

            {/* ═══ RIGHT HALF (SF M102) - mirrored ═══ */}
            <RoundColumnRight koMatches={rightSF} yCenters={sfY} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={sfLabel} />
            <ConnectorRL inputCenters={qfY} outputCenters={sfY} />
            <RoundColumnRight koMatches={rightQF} yCenters={qfY} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={qfLabel} />
            <ConnectorRL inputCenters={r16Y} outputCenters={qfY} />
            <RoundColumnRight koMatches={rightR16} yCenters={r16Y} groupFlags={groupFlags} locale={locale} isR32={false} width={COL_W} roundLabel={r16Label} />
            <ConnectorRL inputCenters={r32Y} outputCenters={r16Y} />
            <RoundColumnRight r32Matches={rightR32} yCenters={r32Y} groupFlags={groupFlags} locale={locale} isR32 width={R32_COL_W} roundLabel={r32Label} />
          </div>
        </div>
      </div>

      {/* Bracket halves legend */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-blue-800 mb-1">
            {locale === "ja" ? "左側 (準決勝 M101)" : "Left Side (Semi-final M101)"}
          </h3>
          <p className="text-xs text-blue-600">
            R32: M73, M76, M75, M78, M83, M84, M81, M82
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-sm font-bold text-purple-800 mb-1">
            {locale === "ja" ? "右側 (準決勝 M102)" : "Right Side (Semi-final M102)"}
          </h3>
          <p className="text-xs text-purple-600">
            R32: M74, M77, M79, M80, M87, M86, M85, M88
          </p>
        </div>
      </div>
    </div>
  );
}
