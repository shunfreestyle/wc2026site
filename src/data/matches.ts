// ============================================================
// 2026 FIFA World Cup – Complete Match Schedule (104 matches)
// Sources: FIFA, NBC Sports, ESPN, Fox Sports (as of March 2026)
// All input times are Eastern Daylight Time (EDT / UTC-4).
// ============================================================

export type Match = {
  id: string;
  matchNumber: number;
  stage: string;
  group?: string;
  date: string;        // local date (YYYY-MM-DD)
  localTime: string;   // HH:MM in local timezone
  jstTime: string;     // HH:MM in JST
  jstDate: string;     // date in JST
  venue: string;
  city: string;
  country: string;
  venueEn: string;
  cityEn: string;
  countryEn: string;
  timezone: string;    // e.g. "EDT", "CDT", "PDT", "CST"
  homeTeamId: string;
  awayTeamId: string;
  homeLabel?: string;
  awayLabel?: string;
  homeScore?: number;
  awayScore?: number;
  stadiumId: string;
  status: "scheduled" | "live" | "finished";
};

// ── Venue definitions ───────────────────────────────────────
type TZ = "EDT" | "CDT" | "PDT" | "CST";

type Venue = {
  nameJa: string;
  nameEn: string;
  cityJa: string;
  cityEn: string;
  country: string;
  countryEn: string;
  tz: TZ;
  /** hours to add to ET to get local time */
  etToLocal: number;
  stadiumId: string;
};

const V: Record<string, Venue> = {
  azteca:    { nameJa: "エスタディオ・アステカ",       nameEn: "Estadio Azteca",          cityJa: "メキシコシティ",     cityEn: "Mexico City",    country: "メキシコ",  countryEn: "Mexico",  tz: "CST", etToLocal: -2, stadiumId: "azteca" },
  akron:     { nameJa: "エスタディオ・アクロン",       nameEn: "Estadio Akron",           cityJa: "グアダラハラ",       cityEn: "Guadalajara",    country: "メキシコ",  countryEn: "Mexico",  tz: "CST", etToLocal: -2, stadiumId: "akron" },
  bbva:      { nameJa: "エスタディオ・BBVA",          nameEn: "Estadio BBVA",            cityJa: "モンテレイ",         cityEn: "Monterrey",      country: "メキシコ",  countryEn: "Mexico",  tz: "CST", etToLocal: -2, stadiumId: "bbva" },
  bmo:       { nameJa: "BMOフィールド",              nameEn: "BMO Field",               cityJa: "トロント",           cityEn: "Toronto",        country: "カナダ",    countryEn: "Canada",  tz: "EDT", etToLocal: 0, stadiumId: "bmo" },
  bc:        { nameJa: "BCプレイス",                 nameEn: "BC Place",                cityJa: "バンクーバー",       cityEn: "Vancouver",      country: "カナダ",    countryEn: "Canada",  tz: "PDT", etToLocal: -3, stadiumId: "bc" },
  metlife:   { nameJa: "メットライフ・スタジアム",     nameEn: "MetLife Stadium",         cityJa: "ニューヨーク/NJ",    cityEn: "New York/NJ",    country: "アメリカ",  countryEn: "USA",     tz: "EDT", etToLocal: 0, stadiumId: "metlife" },
  sofi:      { nameJa: "ソフィ・スタジアム",          nameEn: "SoFi Stadium",            cityJa: "ロサンゼルス",       cityEn: "Los Angeles",    country: "アメリカ",  countryEn: "USA",     tz: "PDT", etToLocal: -3, stadiumId: "sofi" },
  att:       { nameJa: "AT&Tスタジアム",             nameEn: "AT&T Stadium",            cityJa: "ダラス",             cityEn: "Dallas",         country: "アメリカ",  countryEn: "USA",     tz: "CDT", etToLocal: -1, stadiumId: "att" },
  nrg:       { nameJa: "NRGスタジアム",              nameEn: "NRG Stadium",             cityJa: "ヒューストン",       cityEn: "Houston",        country: "アメリカ",  countryEn: "USA",     tz: "CDT", etToLocal: -1, stadiumId: "nrg" },
  hardrock:  { nameJa: "ハード・ロック・スタジアム",   nameEn: "Hard Rock Stadium",       cityJa: "マイアミ",           cityEn: "Miami",          country: "アメリカ",  countryEn: "USA",     tz: "EDT", etToLocal: 0, stadiumId: "hardrock" },
  mercedes:  { nameJa: "メルセデス・ベンツ・スタジアム", nameEn: "Mercedes-Benz Stadium", cityJa: "アトランタ",         cityEn: "Atlanta",        country: "アメリカ",  countryEn: "USA",     tz: "EDT", etToLocal: 0, stadiumId: "mercedes" },
  gillette:  { nameJa: "ジレット・スタジアム",        nameEn: "Gillette Stadium",        cityJa: "ボストン",           cityEn: "Boston",         country: "アメリカ",  countryEn: "USA",     tz: "EDT", etToLocal: 0, stadiumId: "gillette" },
  lincoln:   { nameJa: "リンカーン・ファイナンシャル・フィールド", nameEn: "Lincoln Financial Field", cityJa: "フィラデルフィア", cityEn: "Philadelphia", country: "アメリカ", countryEn: "USA", tz: "EDT", etToLocal: 0, stadiumId: "lincoln" },
  levis:     { nameJa: "リーバイス・スタジアム",      nameEn: "Levi's Stadium",          cityJa: "サンフランシスコ",   cityEn: "San Francisco",  country: "アメリカ",  countryEn: "USA",     tz: "PDT", etToLocal: -3, stadiumId: "levis" },
  lumen:     { nameJa: "ルーメン・フィールド",        nameEn: "Lumen Field",             cityJa: "シアトル",           cityEn: "Seattle",        country: "アメリカ",  countryEn: "USA",     tz: "PDT", etToLocal: -3, stadiumId: "lumen" },
  arrowhead: { nameJa: "アロウヘッド・スタジアム",    nameEn: "Arrowhead Stadium",       cityJa: "カンザスシティ",     cityEn: "Kansas City",    country: "アメリカ",  countryEn: "USA",     tz: "CDT", etToLocal: -1, stadiumId: "arrowhead" },
};

// ── Time helpers ────────────────────────────────────────────
function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function shiftTime(
  etDate: string,
  etH: number,
  etM: number,
  offsetH: number,
): { date: string; time: string } {
  let h = etH + offsetH;
  const parts = etDate.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  if (h >= 24) {
    h -= 24;
    d.setUTCDate(d.getUTCDate() + 1);
  } else if (h < 0) {
    h += 24;
    d.setUTCDate(d.getUTCDate() - 1);
  }
  return {
    date: d.toISOString().slice(0, 10),
    time: `${pad(h)}:${pad(etM)}`,
  };
}

const JST_FROM_ET = 13; // JST = ET + 13 hours (always, regardless of venue)

// ── Factory functions ───────────────────────────────────────
// Group stage: teams are known
function gs(
  num: number, etDate: string, etH: number, etM: number,
  vk: string, home: string, away: string, group: string,
): Match {
  const v = V[vk];
  const local = shiftTime(etDate, etH, etM, v.etToLocal);
  const jst = shiftTime(etDate, etH, etM, JST_FROM_ET);
  return {
    id: `m${num}`, matchNumber: num, stage: "グループステージ", group,
    date: local.date, localTime: local.time, jstTime: jst.time, jstDate: jst.date,
    venue: v.nameJa, city: v.cityJa, country: v.country,
    venueEn: v.nameEn, cityEn: v.cityEn, countryEn: v.countryEn, timezone: v.tz,
    homeTeamId: home, awayTeamId: away, stadiumId: v.stadiumId, status: "scheduled",
  };
}

// Knockout: teams may be TBD
function ko(
  num: number, stage: string, etDate: string, etH: number, etM: number,
  vk: string, homeLabel: string, awayLabel: string,
): Match {
  const v = V[vk];
  const local = shiftTime(etDate, etH, etM, v.etToLocal);
  const jst = shiftTime(etDate, etH, etM, JST_FROM_ET);
  return {
    id: `m${num}`, matchNumber: num, stage,
    date: local.date, localTime: local.time, jstTime: jst.time, jstDate: jst.date,
    venue: v.nameJa, city: v.cityJa, country: v.country,
    venueEn: v.nameEn, cityEn: v.cityEn, countryEn: v.countryEn, timezone: v.tz,
    homeTeamId: "", awayTeamId: "",
    homeLabel, awayLabel, stadiumId: v.stadiumId, status: "scheduled",
  };
}

// ── GROUP STAGE (72 matches) ────────────────────────────────
const groupStage: Match[] = [
  // ── Jun 11 ──
  gs( 1, "2026-06-11", 15,  0, "azteca",   "mexico",       "south-africa",   "A"),
  gs( 2, "2026-06-11", 22,  0, "akron",    "korea",        "czech-republic", "A"),

  // ── Jun 12 ──
  gs( 3, "2026-06-12", 15,  0, "bmo",      "canada",       "bosnia", "B"),
  gs( 4, "2026-06-12", 21,  0, "sofi",     "usa",          "paraguay",       "D"),

  // ── Jun 13 ──
  gs( 5, "2026-06-13",  0,  0, "bc",       "australia",    "turkey", "D"),
  gs( 6, "2026-06-13", 15,  0, "levis",    "qatar",        "switzerland",    "B"),
  gs( 7, "2026-06-13", 18,  0, "metlife",  "brazil",       "morocco",        "C"),
  gs( 8, "2026-06-13", 21,  0, "gillette", "haiti",        "scotland",       "C"),

  // ── Jun 14 ──
  gs( 9, "2026-06-14", 13,  0, "nrg",      "germany",      "curacao",        "E"),
  gs(10, "2026-06-14", 16,  0, "att",      "netherlands",  "japan",          "F"),
  gs(11, "2026-06-14", 19,  0, "lincoln",  "ivory-coast",  "ecuador",        "E"),
  gs(12, "2026-06-14", 22,  0, "bbva",     "sweden","tunisia",       "F"),

  // ── Jun 15 ──
  gs(13, "2026-06-15", 12,  0, "mercedes", "spain",        "cape-verde",     "H"),
  gs(14, "2026-06-15", 15,  0, "lumen",    "belgium",      "egypt",          "G"),
  gs(15, "2026-06-15", 18,  0, "hardrock", "saudi-arabia", "uruguay",        "H"),
  gs(16, "2026-06-15", 21,  0, "sofi",     "iran",         "new-zealand",    "G"),

  // ── Jun 16 ──
  gs(17, "2026-06-16",  0,  0, "levis",    "austria",      "jordan",         "J"),
  gs(18, "2026-06-16", 15,  0, "metlife",  "france",       "senegal",        "I"),
  gs(19, "2026-06-16", 18,  0, "gillette", "iraq", "norway",         "I"),
  gs(20, "2026-06-16", 21,  0, "arrowhead","argentina",    "algeria",        "J"),

  // ── Jun 17 ──
  gs(21, "2026-06-17", 13,  0, "nrg",      "portugal",     "dr-congo",   "K"),
  gs(22, "2026-06-17", 16,  0, "att",      "england",      "croatia",        "L"),
  gs(23, "2026-06-17", 19,  0, "bmo",      "ghana",        "panama",         "L"),
  gs(24, "2026-06-17", 22,  0, "azteca",   "uzbekistan",   "colombia",       "K"),

  // ── Jun 18 (MD2) ──
  gs(25, "2026-06-18", 12,  0, "mercedes", "czech-republic","south-africa",  "A"),
  gs(26, "2026-06-18", 15,  0, "sofi",     "switzerland",  "bosnia", "B"),
  gs(27, "2026-06-18", 18,  0, "bc",       "canada",       "qatar",          "B"),
  gs(28, "2026-06-18", 21,  0, "akron",    "mexico",       "korea",          "A"),

  // ── Jun 19 ──
  gs(29, "2026-06-19",  0,  0, "levis",    "turkey","paraguay",      "D"),
  gs(30, "2026-06-19", 15,  0, "lumen",    "usa",          "australia",      "D"),
  gs(31, "2026-06-19", 18,  0, "gillette", "scotland",     "morocco",        "C"),
  gs(32, "2026-06-19", 21,  0, "lincoln",  "brazil",       "haiti",          "C"),

  // ── Jun 20 ──
  gs(33, "2026-06-20",  0,  0, "bbva",     "tunisia",      "japan",          "F"),
  gs(34, "2026-06-20", 13,  0, "nrg",      "netherlands",  "sweden", "F"),
  gs(35, "2026-06-20", 16,  0, "bmo",      "germany",      "ivory-coast",    "E"),
  gs(36, "2026-06-20", 20,  0, "arrowhead","ecuador",      "curacao",        "E"),

  // ── Jun 21 ──
  gs(37, "2026-06-21", 12,  0, "mercedes", "spain",        "saudi-arabia",   "H"),
  gs(38, "2026-06-21", 15,  0, "sofi",     "belgium",      "iran",           "G"),
  gs(39, "2026-06-21", 18,  0, "hardrock", "uruguay",      "cape-verde",     "H"),
  gs(40, "2026-06-21", 21,  0, "bc",       "new-zealand",  "egypt",          "G"),

  // ── Jun 22 ──
  gs(41, "2026-06-22", 13,  0, "att",      "argentina",    "austria",        "J"),
  gs(42, "2026-06-22", 17,  0, "lincoln",  "france",       "iraq",   "I"),
  gs(43, "2026-06-22", 20,  0, "metlife",  "norway",       "senegal",        "I"),
  gs(44, "2026-06-22", 23,  0, "levis",    "jordan",       "algeria",        "J"),

  // ── Jun 23 ──
  gs(45, "2026-06-23", 13,  0, "nrg",      "portugal",     "uzbekistan",     "K"),
  gs(46, "2026-06-23", 16,  0, "gillette", "england",      "ghana",          "L"),
  gs(47, "2026-06-23", 19,  0, "bmo",      "panama",       "croatia",        "L"),
  gs(48, "2026-06-23", 22,  0, "akron",    "colombia",     "dr-congo",   "K"),

  // ── Jun 24 (MD3 – simultaneous kickoffs per group) ──
  gs(49, "2026-06-24", 15,  0, "bc",       "switzerland",  "canada",         "B"),
  gs(50, "2026-06-24", 15,  0, "lumen",    "bosnia","qatar",         "B"),
  gs(51, "2026-06-24", 18,  0, "hardrock", "scotland",     "brazil",         "C"),
  gs(52, "2026-06-24", 18,  0, "mercedes", "morocco",      "haiti",          "C"),
  gs(53, "2026-06-24", 21,  0, "azteca",   "czech-republic","mexico",        "A"),
  gs(54, "2026-06-24", 21,  0, "bbva",     "south-africa", "korea",          "A"),

  // ── Jun 25 ──
  gs(55, "2026-06-25", 16,  0, "metlife",  "ecuador",      "germany",        "E"),
  gs(56, "2026-06-25", 16,  0, "lincoln",  "curacao",      "ivory-coast",    "E"),
  gs(57, "2026-06-25", 19,  0, "att",      "japan",        "sweden", "F"),
  gs(58, "2026-06-25", 19,  0, "arrowhead","tunisia",      "netherlands",    "F"),
  gs(59, "2026-06-25", 22,  0, "sofi",     "turkey","usa",           "D"),
  gs(60, "2026-06-25", 22,  0, "levis",    "paraguay",     "australia",      "D"),

  // ── Jun 26 ──
  gs(61, "2026-06-26", 15,  0, "gillette", "norway",       "france",         "I"),
  gs(62, "2026-06-26", 15,  0, "bmo",      "senegal",      "iraq",   "I"),
  gs(63, "2026-06-26", 20,  0, "nrg",      "cape-verde",   "saudi-arabia",   "H"),
  gs(64, "2026-06-26", 20,  0, "akron",    "uruguay",      "spain",          "H"),
  gs(65, "2026-06-26", 23,  0, "lumen",    "egypt",        "iran",           "G"),
  gs(66, "2026-06-26", 23,  0, "bc",       "new-zealand",  "belgium",        "G"),

  // ── Jun 27 ──
  gs(67, "2026-06-27", 17,  0, "metlife",  "panama",       "england",        "L"),
  gs(68, "2026-06-27", 17,  0, "lincoln",  "croatia",      "ghana",          "L"),
  gs(69, "2026-06-27", 19, 30, "hardrock", "colombia",     "portugal",       "K"),
  gs(70, "2026-06-27", 19, 30, "mercedes", "dr-congo", "uzbekistan",     "K"),
  gs(71, "2026-06-27", 22,  0, "arrowhead","algeria",      "austria",        "J"),
  gs(72, "2026-06-27", 22,  0, "att",      "jordan",       "argentina",      "J"),
];

// ── ROUND OF 32 (16 matches) ────────────────────────────────
const R32 = "ラウンド32";
const roundOf32: Match[] = [
  ko(73, R32, "2026-06-28", 15,  0, "sofi",     "A組2位",   "B組2位"),
  ko(74, R32, "2026-06-29", 13,  0, "nrg",      "C組1位",   "F組2位"),
  ko(75, R32, "2026-06-29", 16, 30, "gillette",  "E組1位",   "3位(A/B/C/D/F)"),
  ko(76, R32, "2026-06-29", 21,  0, "bbva",     "F組1位",   "C組2位"),
  ko(77, R32, "2026-06-30", 13,  0, "att",      "E組2位",   "I組2位"),
  ko(78, R32, "2026-06-30", 17,  0, "metlife",  "I組1位",   "3位(C/D/F/G/H)"),
  ko(79, R32, "2026-06-30", 21,  0, "azteca",   "A組1位",   "3位(C/E/F/H/I)"),
  ko(80, R32, "2026-07-01", 12,  0, "mercedes", "L組1位",   "3位(E/H/I/J/K)"),
  ko(81, R32, "2026-07-01", 16,  0, "lumen",    "G組1位",   "3位(A/E/H/I/J)"),
  ko(82, R32, "2026-07-01", 20,  0, "levis",    "D組1位",   "3位(B/E/F/I/J)"),
  ko(83, R32, "2026-07-02", 15,  0, "sofi",     "H組1位",   "J組2位"),
  ko(84, R32, "2026-07-02", 19,  0, "bmo",      "K組2位",   "L組2位"),
  ko(85, R32, "2026-07-02", 23,  0, "bc",       "B組1位",   "3位(E/F/G/I/J)"),
  ko(86, R32, "2026-07-03", 14,  0, "att",      "D組2位",   "G組2位"),
  ko(87, R32, "2026-07-03", 18,  0, "hardrock", "J組1位",   "H組2位"),
  ko(88, R32, "2026-07-03", 21, 30, "arrowhead","K組1位",   "3位(D/E/I/J/L)"),
];

// ── ROUND OF 16 (8 matches) ─────────────────────────────────
const R16 = "ラウンド16";
const roundOf16: Match[] = [
  ko(89, R16, "2026-07-04", 13,  0, "nrg",      "M73勝者",  "M76勝者"),
  ko(90, R16, "2026-07-04", 17,  0, "lincoln",  "M75勝者",  "M78勝者"),
  ko(91, R16, "2026-07-05", 16,  0, "metlife",  "M74勝者",  "M77勝者"),
  ko(92, R16, "2026-07-05", 20,  0, "azteca",   "M79勝者",  "M80勝者"),
  ko(93, R16, "2026-07-06", 15,  0, "att",      "M83勝者",  "M84勝者"),
  ko(94, R16, "2026-07-06", 20,  0, "lumen",    "M81勝者",  "M82勝者"),
  ko(95, R16, "2026-07-07", 12,  0, "mercedes", "M87勝者",  "M86勝者"),
  ko(96, R16, "2026-07-07", 16,  0, "bc",       "M85勝者",  "M88勝者"),
];

// ── QUARTERFINALS (4 matches) ────────────────────────────────
const QF = "準々決勝";
const quarterFinals: Match[] = [
  ko( 97, QF, "2026-07-09", 16,  0, "gillette",  "M89勝者",  "M90勝者"),
  ko( 98, QF, "2026-07-10", 15,  0, "sofi",      "M93勝者",  "M94勝者"),
  ko( 99, QF, "2026-07-11", 17,  0, "hardrock",  "M91勝者",  "M92勝者"),
  ko(100, QF, "2026-07-11", 21,  0, "arrowhead", "M95勝者",  "M96勝者"),
];

// ── SEMIFINALS (2 matches) ───────────────────────────────────
const SF = "準決勝";
const semiFinals: Match[] = [
  ko(101, SF, "2026-07-14", 15,  0, "att",      "M97勝者",  "M98勝者"),
  ko(102, SF, "2026-07-15", 15,  0, "mercedes", "M99勝者",  "M100勝者"),
];

// ── THIRD PLACE (1 match) ────────────────────────────────────
const thirdPlace: Match[] = [
  ko(103, "3位決定戦", "2026-07-18", 17,  0, "hardrock", "M101敗者", "M102敗者"),
];

// ── FINAL (1 match) ──────────────────────────────────────────
const final: Match[] = [
  ko(104, "決勝", "2026-07-19", 15,  0, "metlife", "M101勝者", "M102勝者"),
];

// ── Combined export ─────────────────────────────────────────
export const matches: Match[] = [
  ...groupStage,
  ...roundOf32,
  ...roundOf16,
  ...quarterFinals,
  ...semiFinals,
  ...thirdPlace,
  ...final,
];

// ── Helper functions ────────────────────────────────────────
export function getMatchesByGroup(group: string): Match[] {
  return matches.filter((m) => m.group === group);
}

export function getMatchesByStage(stage: string): Match[] {
  return matches.filter((m) => m.stage === stage);
}

export function getMatchesByTeam(teamId: string): Match[] {
  return matches.filter(
    (m) => m.homeTeamId === teamId || m.awayTeamId === teamId,
  );
}

export function getMatchesByDate(date: string): Match[] {
  return matches.filter((m) => m.date === date);
}

export function getStages(): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const m of matches) {
    if (!seen.has(m.stage)) {
      seen.add(m.stage);
      result.push(m.stage);
    }
  }
  return result;
}

export function getMatchDates(): string[] {
  return [...new Set(matches.map((m) => m.date))].sort();
}
