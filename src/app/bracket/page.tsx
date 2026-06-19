"use client";

import Link from "next/link";
import { getTeamsByGroup } from "@/data/teams";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Layout constants (compact) ───────────────────────────
const TEAM_H = 18;
const MATCH_H = TEAM_H * 2;
const HALF_H = 340;
const R32_W = 100;
const KO_W = 44;
const CONN_W = 8;
const FINAL_W = 56;

function centers(count: number): number[] {
  const slot = HALF_H / count;
  return Array.from({ length: count }, (_, i) => i * slot + slot / 2);
}

const r32Y = centers(8);
const r16Y = centers(4);
const qfY = centers(2);
const sfY = centers(1);

// ── Types ────────────────────────────────────────────────
type Slot = { label: string; labelEn: string; group?: string; thirdGroups?: string };
type MatchData = { num: number; home: Slot; away: Slot };
type KOMatch = { num: number; homeRef: string; awayRef: string };

// ── Left half (SF M101) ──────────────────────────────────
const leftR32: MatchData[] = [
  { num: 73, home: { label: "A2位", labelEn: "A2", group: "A" }, away: { label: "B2位", labelEn: "B2", group: "B" } },
  { num: 76, home: { label: "F1位", labelEn: "F1", group: "F" }, away: { label: "C2位", labelEn: "C2", group: "C" } },
  { num: 75, home: { label: "E1位", labelEn: "E1", group: "E" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "ABCDF" } },
  { num: 78, home: { label: "I1位", labelEn: "I1", group: "I" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "CDFGH" } },
  { num: 83, home: { label: "H1位", labelEn: "H1", group: "H" }, away: { label: "J2位", labelEn: "J2", group: "J" } },
  { num: 84, home: { label: "K2位", labelEn: "K2", group: "K" }, away: { label: "L2位", labelEn: "L2", group: "L" } },
  { num: 81, home: { label: "G1位", labelEn: "G1", group: "G" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "AEHIJ" } },
  { num: 82, home: { label: "D1位", labelEn: "D1", group: "D" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "BEFIJ" } },
];

const leftR16: KOMatch[] = [
  { num: 89, homeRef: "73", awayRef: "76" },
  { num: 90, homeRef: "75", awayRef: "78" },
  { num: 93, homeRef: "83", awayRef: "84" },
  { num: 94, homeRef: "81", awayRef: "82" },
];

const leftQF: KOMatch[] = [
  { num: 97, homeRef: "89", awayRef: "90" },
  { num: 98, homeRef: "93", awayRef: "94" },
];

const leftSF: KOMatch[] = [{ num: 101, homeRef: "97", awayRef: "98" }];

// ── Right half (SF M102) ─────────────────────────────────
const rightR32: MatchData[] = [
  { num: 74, home: { label: "C1位", labelEn: "C1", group: "C" }, away: { label: "F2位", labelEn: "F2", group: "F" } },
  { num: 77, home: { label: "E2位", labelEn: "E2", group: "E" }, away: { label: "I2位", labelEn: "I2", group: "I" } },
  { num: 79, home: { label: "A1位", labelEn: "A1", group: "A" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "CEFHI" } },
  { num: 80, home: { label: "L1位", labelEn: "L1", group: "L" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "EHIJK" } },
  { num: 87, home: { label: "J1位", labelEn: "J1", group: "J" }, away: { label: "H2位", labelEn: "H2", group: "H" } },
  { num: 86, home: { label: "D2位", labelEn: "D2", group: "D" }, away: { label: "G2位", labelEn: "G2", group: "G" } },
  { num: 85, home: { label: "B1位", labelEn: "B1", group: "B" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "EFGIJ" } },
  { num: 88, home: { label: "K1位", labelEn: "K1", group: "K" }, away: { label: "3位", labelEn: "3rd", thirdGroups: "DEIJL" } },
];

const rightR16: KOMatch[] = [
  { num: 91, homeRef: "74", awayRef: "77" },
  { num: 92, homeRef: "79", awayRef: "80" },
  { num: 95, homeRef: "87", awayRef: "86" },
  { num: 96, homeRef: "85", awayRef: "88" },
];

const rightQF: KOMatch[] = [
  { num: 99, homeRef: "91", awayRef: "92" },
  { num: 100, homeRef: "95", awayRef: "96" },
];

const rightSF: KOMatch[] = [{ num: 102, homeRef: "99", awayRef: "100" }];

// ── Connector left→right ─────────────────────────────────
function ConnLR({ inY, outY }: { inY: number[]; outY: number[] }) {
  const mid = CONN_W / 2;
  return (
    <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>
      {outY.map((_, i) => {
        const y1 = inY[i * 2], y2 = inY[i * 2 + 1], yo = outY[i];
        return (
          <div key={i}>
            <div className="absolute border-t border-gray-300" style={{ top: y1, left: 0, width: mid }} />
            <div className="absolute border-t border-gray-300" style={{ top: y2, left: 0, width: mid }} />
            <div className="absolute border-l border-gray-300" style={{ top: y1, left: mid, height: y2 - y1 }} />
            <div className="absolute border-t border-gray-300" style={{ top: yo, left: mid, width: CONN_W - mid }} />
          </div>
        );
      })}
    </div>
  );
}

// ── Connector right→left (mirrored) ──────────────────────
function ConnRL({ inY, outY }: { inY: number[]; outY: number[] }) {
  const mid = CONN_W / 2;
  return (
    <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>
      {outY.map((_, i) => {
        const y1 = inY[i * 2], y2 = inY[i * 2 + 1], yo = outY[i];
        return (
          <div key={i}>
            <div className="absolute border-t border-gray-300" style={{ top: y1, right: 0, width: mid }} />
            <div className="absolute border-t border-gray-300" style={{ top: y2, right: 0, width: mid }} />
            <div className="absolute border-r border-gray-300" style={{ top: y1, right: mid - 1, height: y2 - y1 }} />
            <div className="absolute border-t border-gray-300" style={{ top: yo, left: 0, width: mid }} />
          </div>
        );
      })}
    </div>
  );
}

// ── Team slot ────────────────────────────────────────────
function TeamSlot({ slot, gf, locale, pos, mir }: {
  slot: Slot; gf: Record<string, string>; locale: string; pos: "h" | "a"; mir?: boolean;
}) {
  const flags = slot.group ? gf[slot.group] : undefined;
  const label = locale === "ja" ? slot.label : slot.labelEn;
  const border = pos === "h" ? "border-b border-gray-200" : "";
  return (
    <div className={`flex items-center gap-px px-0.5 ${border} ${mir ? "flex-row-reverse" : ""}`} style={{ height: TEAM_H }}>
      {flags && <span className="text-[9px] leading-none shrink-0">{flags}</span>}
      {slot.thirdGroups ? (
        <span className="text-[8px] text-gray-500 truncate">3{locale === "ja" ? "位" : "rd"} {slot.thirdGroups}</span>
      ) : (
        <span className="text-[9px] font-medium text-gray-700 truncate">{label}</span>
      )}
    </div>
  );
}

// ── R32 box ──────────────────────────────────────────────
function R32Box({ m, gf, locale, w, mir }: {
  m: MatchData; gf: Record<string, string>; locale: string; w: number; mir?: boolean;
}) {
  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden" style={{ width: w, height: MATCH_H }}>
      <TeamSlot slot={m.home} gf={gf} locale={locale} pos="h" mir={mir} />
      <TeamSlot slot={m.away} gf={gf} locale={locale} pos="a" mir={mir} />
    </div>
  );
}

// ── KO box ───────────────────────────────────────────────
function KOBox({ m, locale, w, mir }: { m: KOMatch; locale: string; w: number; mir?: boolean }) {
  const s = locale === "ja" ? "勝" : "W";
  return (
    <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden" style={{ width: w, height: MATCH_H }}>
      <div className={`flex items-center px-0.5 border-b border-gray-200 text-[9px] text-gray-600 ${mir ? "justify-end" : ""}`} style={{ height: TEAM_H }}>
        {m.homeRef}{s}
      </div>
      <div className={`flex items-center px-0.5 text-[9px] text-gray-600 ${mir ? "justify-end" : ""}`} style={{ height: TEAM_H }}>
        {m.awayRef}{s}
      </div>
    </div>
  );
}

// ── Round column (generic) ───────────────────────────────
function RoundCol({ r32, ko, yc, gf, locale, w, label, mir }: {
  r32?: MatchData[]; ko?: KOMatch[]; yc: number[];
  gf: Record<string, string>; locale: string; w: number; label: string; mir?: boolean;
}) {
  const items = r32 || ko!;
  return (
    <div className="relative shrink-0" style={{ width: w, height: HALF_H }}>
      <div className="absolute -top-5 left-0 right-0 text-center text-[8px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
        {label}
      </div>
      {items.map((m, i) => (
        <div key={m.num} className="absolute" style={{ top: yc[i] - MATCH_H / 2, [mir ? "right" : "left"]: 0 }}>
          <div className={`absolute -top-2 ${mir ? "right-0" : "left-0"} text-[7px] font-semibold text-[#E8192C]`}>
            {m.num}
          </div>
          {r32 ? (
            <R32Box m={m as MatchData} gf={gf} locale={locale} w={w} mir={mir} />
          ) : (
            <KOBox m={m as KOMatch} locale={locale} w={w} mir={mir} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Straight horizontal line connector ───────────────────
function StraightConn({ y }: { y: number }) {
  return (
    <div className="relative shrink-0" style={{ width: CONN_W, height: HALF_H }}>
      <div className="absolute border-t border-gray-300" style={{ top: y, left: 0, width: CONN_W }} />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────
export default function BracketPage() {
  const { locale } = useLanguage();

  const gf: Record<string, string> = {};
  for (const g of "ABCDEFGHIJKL".split("")) {
    gf[g] = getTeamsByGroup(g).map((t) => t.flag).join("");
  }

  const halfW = R32_W + CONN_W + KO_W + CONN_W + KO_W + CONN_W + KO_W;
  const totalW = halfW + CONN_W + FINAL_W + CONN_W + halfW;

  const r32L = locale === "ja" ? "R32" : "R32";
  const r16L = locale === "ja" ? "R16" : "R16";
  const qfL = locale === "ja" ? "QF" : "QF";
  const sfL = locale === "ja" ? "SF" : "SF";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {locale === "ja" ? "トーナメント表" : "Tournament Bracket"}
        </h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm">
          {locale === "ja"
            ? "FIFA W杯 2026 - R32〜決勝"
            : "FIFA World Cup 2026 - R32 to Final"}
        </p>
        <div className="flex gap-3 mt-2">
          <span className="text-[10px] text-gray-500">
            {locale === "ja" ? "🏳 = 各グループの全チーム国旗" : "🏳 = group team flags"}
          </span>
          <span className="text-[10px] text-gray-500">
            {locale === "ja" ? "3位 = グループ名のみ" : "3rd = group letters only"}
          </span>
        </div>
        <Link
          href="/tickets"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          {locale === "ja" ? "リセールチケットを探す" : "Find Resale Tickets"}
        </Link>
      </div>

      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="relative" style={{ width: totalW, height: HALF_H + 30, paddingTop: 24 }}>
          <div className="absolute top-6 left-0 flex items-start" style={{ height: HALF_H }}>
            {/* LEFT HALF */}
            <RoundCol r32={leftR32} yc={r32Y} gf={gf} locale={locale} w={R32_W} label={r32L} />
            <ConnLR inY={r32Y} outY={r16Y} />
            <RoundCol ko={leftR16} yc={r16Y} gf={gf} locale={locale} w={KO_W} label={r16L} />
            <ConnLR inY={r16Y} outY={qfY} />
            <RoundCol ko={leftQF} yc={qfY} gf={gf} locale={locale} w={KO_W} label={qfL} />
            <ConnLR inY={qfY} outY={sfY} />
            <RoundCol ko={leftSF} yc={sfY} gf={gf} locale={locale} w={KO_W} label={sfL} />

            <StraightConn y={sfY[0]} />

            {/* FINAL */}
            <div className="relative shrink-0" style={{ width: FINAL_W, height: HALF_H }}>
              <div className="absolute -top-6 left-0 right-0 text-center text-[9px] font-bold text-amber-600 uppercase">
                {locale === "ja" ? "決勝" : "FINAL"}
              </div>
              <div className="absolute" style={{ top: sfY[0] - MATCH_H / 2, left: 0 }}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-sm">🏆</div>
                <div
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-400 rounded shadow-md overflow-hidden"
                  style={{ width: FINAL_W, height: MATCH_H }}
                >
                  <div className="flex items-center justify-center border-b border-amber-200 text-[9px] font-bold text-amber-800" style={{ height: TEAM_H }}>
                    101{locale === "ja" ? "勝" : "W"}
                  </div>
                  <div className="flex items-center justify-center text-[9px] font-bold text-amber-800" style={{ height: TEAM_H }}>
                    102{locale === "ja" ? "勝" : "W"}
                  </div>
                </div>
                <div className="text-[7px] text-amber-600 text-center">M104</div>
              </div>
              {/* 3rd Place */}
              <div className="absolute" style={{ top: sfY[0] + MATCH_H / 2 + 12, left: 0 }}>
                <div className="text-[8px] text-green-600 font-bold mb-0.5 text-center">
                  {locale === "ja" ? "3位決定戦" : "3rd"}
                </div>
                <div
                  className="bg-green-50 border border-green-300 rounded shadow-sm overflow-hidden"
                  style={{ width: FINAL_W, height: MATCH_H }}
                >
                  <div className="flex items-center justify-center border-b border-green-200 text-[9px] text-green-700" style={{ height: TEAM_H }}>
                    101{locale === "ja" ? "敗" : "L"}
                  </div>
                  <div className="flex items-center justify-center text-[9px] text-green-700" style={{ height: TEAM_H }}>
                    102{locale === "ja" ? "敗" : "L"}
                  </div>
                </div>
                <div className="text-[7px] text-green-500 text-center">M103</div>
              </div>
            </div>

            <StraightConn y={sfY[0]} />

            {/* RIGHT HALF */}
            <RoundCol ko={rightSF} yc={sfY} gf={gf} locale={locale} w={KO_W} label={sfL} mir />
            <ConnRL inY={qfY} outY={sfY} />
            <RoundCol ko={rightQF} yc={qfY} gf={gf} locale={locale} w={KO_W} label={qfL} mir />
            <ConnRL inY={r16Y} outY={qfY} />
            <RoundCol ko={rightR16} yc={r16Y} gf={gf} locale={locale} w={KO_W} label={r16L} mir />
            <ConnRL inY={r32Y} outY={r16Y} />
            <RoundCol r32={rightR32} yc={r32Y} gf={gf} locale={locale} w={R32_W} label={r32L} mir />
          </div>
        </div>
      </div>
    </div>
  );
}
