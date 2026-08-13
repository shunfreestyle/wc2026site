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
  result?: { h: number; a: number },
): Match {
  const v = V[vk];
  const local = shiftTime(etDate, etH, etM, v.etToLocal);
  const jst = shiftTime(etDate, etH, etM, JST_FROM_ET);
  return {
    id: `m${num}`, matchNumber: num, stage: "グループステージ", group,
    date: local.date, localTime: local.time, jstTime: jst.time, jstDate: jst.date,
    venue: v.nameJa, city: v.cityJa, country: v.country,
    venueEn: v.nameEn, cityEn: v.cityEn, countryEn: v.countryEn, timezone: v.tz,
    homeTeamId: home, awayTeamId: away, stadiumId: v.stadiumId,
    ...(result ? { homeScore: result.h, awayScore: result.a, status: "finished" as const } : { status: "scheduled" as const }),
  };
}

// Knockout: teams may be TBD
function ko(
  num: number, stage: string, etDate: string, etH: number, etM: number,
  vk: string, homeLabel: string, awayLabel: string,
  teams?: { home: string; away: string },
  result?: { h: number; a: number },
): Match {
  const v = V[vk];
  const local = shiftTime(etDate, etH, etM, v.etToLocal);
  const jst = shiftTime(etDate, etH, etM, JST_FROM_ET);
  return {
    id: `m${num}`, matchNumber: num, stage,
    date: local.date, localTime: local.time, jstTime: jst.time, jstDate: jst.date,
    venue: v.nameJa, city: v.cityJa, country: v.country,
    venueEn: v.nameEn, cityEn: v.cityEn, countryEn: v.countryEn, timezone: v.tz,
    homeTeamId: teams?.home ?? "", awayTeamId: teams?.away ?? "",
    homeLabel, awayLabel, stadiumId: v.stadiumId,
    ...(result ? { homeScore: result.h, awayScore: result.a, status: "finished" as const } : { status: "scheduled" as const }),
  };
}

// ── GROUP STAGE (72 matches) ────────────────────────────────
const groupStage: Match[] = [
  // ── Jun 11 (MD1) ──
  gs( 1, "2026-06-11", 15,  0, "azteca",   "mexico",       "south-africa",   "A", { h: 2, a: 0 }),
  gs( 2, "2026-06-11", 22,  0, "akron",    "korea",        "czech-republic", "A", { h: 2, a: 1 }),

  // ── Jun 12 ──
  gs( 3, "2026-06-12", 15,  0, "bmo",      "canada",       "bosnia", "B", { h: 1, a: 1 }),
  gs( 4, "2026-06-12", 21,  0, "sofi",     "usa",          "paraguay",       "D", { h: 4, a: 1 }),

  // ── Jun 13 ──
  gs( 5, "2026-06-13", 21,  0, "bc",       "australia",    "turkey", "D", { h: 2, a: 0 }),
  gs( 6, "2026-06-13", 15,  0, "levis",    "qatar",        "switzerland",    "B", { h: 1, a: 1 }),
  gs( 7, "2026-06-13", 18,  0, "metlife",  "brazil",       "morocco",        "C", { h: 1, a: 1 }),
  gs( 8, "2026-06-13", 21,  0, "gillette", "haiti",        "scotland",       "C", { h: 0, a: 1 }),

  // ── Jun 14 ──
  gs( 9, "2026-06-14", 13,  0, "nrg",      "germany",      "curacao",        "E", { h: 7, a: 1 }),
  gs(10, "2026-06-14", 16,  0, "att",      "netherlands",  "japan",          "F", { h: 2, a: 2 }),
  gs(11, "2026-06-14", 19,  0, "lincoln",  "ivory-coast",  "ecuador",        "E", { h: 1, a: 0 }),
  gs(12, "2026-06-14", 22,  0, "bbva",     "sweden","tunisia",       "F", { h: 5, a: 1 }),

  // ── Jun 15 ──
  gs(13, "2026-06-15", 12,  0, "mercedes", "spain",        "cape-verde",     "H", { h: 0, a: 0 }),
  gs(14, "2026-06-15", 15,  0, "lumen",    "belgium",      "egypt",          "G", { h: 1, a: 1 }),
  gs(15, "2026-06-15", 18,  0, "hardrock", "saudi-arabia", "uruguay",        "H", { h: 1, a: 1 }),
  gs(16, "2026-06-15", 21,  0, "sofi",     "iran",         "new-zealand",    "G", { h: 2, a: 2 }),

  // ── Jun 16 ──
  gs(17, "2026-06-17",  0,  0, "levis",    "austria",      "jordan",         "J", { h: 3, a: 1 }),
  gs(18, "2026-06-16", 15,  0, "metlife",  "france",       "senegal",        "I", { h: 3, a: 1 }),
  gs(19, "2026-06-16", 18,  0, "gillette", "iraq", "norway",         "I", { h: 1, a: 4 }),
  gs(20, "2026-06-16", 21,  0, "arrowhead","argentina",    "algeria",        "J", { h: 3, a: 0 }),

  // ── Jun 17 ──
  gs(21, "2026-06-17", 13,  0, "nrg",      "portugal",     "dr-congo",   "K", { h: 1, a: 1 }),
  gs(22, "2026-06-17", 16,  0, "att",      "england",      "croatia",        "L", { h: 4, a: 2 }),
  gs(23, "2026-06-17", 19,  0, "bmo",      "ghana",        "panama",         "L", { h: 1, a: 0 }),
  gs(24, "2026-06-17", 22,  0, "azteca",   "uzbekistan",   "colombia",       "K", { h: 1, a: 3 }),

  // ── Jun 18 (MD2) ──
  gs(25, "2026-06-18", 12,  0, "mercedes", "czech-republic","south-africa",  "A", { h: 1, a: 1 }),
  gs(26, "2026-06-18", 15,  0, "sofi",     "switzerland",  "bosnia", "B", { h: 4, a: 1 }),
  gs(27, "2026-06-18", 18,  0, "bc",       "canada",       "qatar",          "B", { h: 6, a: 0 }),
  gs(28, "2026-06-18", 21,  0, "akron",    "mexico",       "korea",          "A", { h: 1, a: 0 }),

  // ── Jun 19 ──
  gs(29, "2026-06-19", 23,  0, "levis",    "turkey","paraguay",      "D", { h: 0, a: 1 }),
  gs(30, "2026-06-19", 15,  0, "lumen",    "usa",          "australia",      "D", { h: 2, a: 0 }),
  gs(31, "2026-06-19", 18,  0, "gillette", "scotland",     "morocco",        "C", { h: 0, a: 1 }),
  gs(32, "2026-06-19", 20, 30, "lincoln",  "brazil",       "haiti",          "C", { h: 3, a: 0 }),

  // ── Jun 20 ──
  gs(33, "2026-06-21",  0,  0, "bbva",     "tunisia",      "japan",          "F", { h: 0, a: 4 }),
  gs(34, "2026-06-20", 13,  0, "nrg",      "netherlands",  "sweden", "F", { h: 5, a: 1 }),
  gs(35, "2026-06-20", 16,  0, "bmo",      "germany",      "ivory-coast",    "E", { h: 2, a: 1 }),
  gs(36, "2026-06-20", 20,  0, "arrowhead","ecuador",      "curacao",        "E", { h: 0, a: 0 }),

  // ── Jun 21 ──
  gs(37, "2026-06-21", 12,  0, "mercedes", "spain",        "saudi-arabia",   "H", { h: 4, a: 0 }),
  gs(38, "2026-06-21", 15,  0, "sofi",     "belgium",      "iran",           "G", { h: 0, a: 0 }),
  gs(39, "2026-06-21", 18,  0, "hardrock", "uruguay",      "cape-verde",     "H", { h: 2, a: 2 }),
  gs(40, "2026-06-21", 21,  0, "bc",       "new-zealand",  "egypt",          "G", { h: 1, a: 3 }),

  // ── Jun 22 ──
  gs(41, "2026-06-22", 13,  0, "att",      "argentina",    "austria",        "J", { h: 2, a: 0 }),
  gs(42, "2026-06-22", 17,  0, "lincoln",  "france",       "iraq",   "I", { h: 3, a: 0 }),
  gs(43, "2026-06-22", 20,  0, "metlife",  "norway",       "senegal",        "I", { h: 3, a: 2 }),
  gs(44, "2026-06-22", 23,  0, "levis",    "jordan",       "algeria",        "J", { h: 1, a: 2 }),

  // ── Jun 23 ──
  gs(45, "2026-06-23", 13,  0, "nrg",      "portugal",     "uzbekistan",     "K", { h: 5, a: 0 }),
  gs(46, "2026-06-23", 16,  0, "gillette", "england",      "ghana",          "L", { h: 0, a: 0 }),
  gs(47, "2026-06-23", 19,  0, "bmo",      "panama",       "croatia",        "L", { h: 0, a: 1 }),
  gs(48, "2026-06-23", 22,  0, "akron",    "colombia",     "dr-congo",   "K", { h: 1, a: 0 }),

  // ── Jun 24 (MD3 – simultaneous kickoffs per group) ──
  gs(49, "2026-06-24", 15,  0, "bc",       "switzerland",  "canada",         "B", { h: 2, a: 1 }),
  gs(50, "2026-06-24", 15,  0, "lumen",    "bosnia","qatar",         "B", { h: 3, a: 1 }),
  gs(51, "2026-06-24", 18,  0, "hardrock", "scotland",     "brazil",         "C", { h: 0, a: 3 }),
  gs(52, "2026-06-24", 18,  0, "mercedes", "morocco",      "haiti",          "C", { h: 4, a: 2 }),
  gs(53, "2026-06-24", 21,  0, "azteca",   "czech-republic","mexico",        "A", { h: 0, a: 3 }),
  gs(54, "2026-06-24", 21,  0, "bbva",     "south-africa", "korea",          "A", { h: 1, a: 0 }),

  // ── Jun 25 ──
  gs(55, "2026-06-25", 16,  0, "metlife",  "ecuador",      "germany",        "E", { h: 2, a: 1 }),
  gs(56, "2026-06-25", 16,  0, "lincoln",  "curacao",      "ivory-coast",    "E", { h: 0, a: 2 }),
  gs(57, "2026-06-25", 19,  0, "att",      "japan",        "sweden", "F", { h: 1, a: 1 }),
  gs(58, "2026-06-25", 19,  0, "arrowhead","tunisia",      "netherlands",    "F", { h: 1, a: 3 }),
  gs(59, "2026-06-25", 22,  0, "sofi",     "turkey","usa",           "D", { h: 3, a: 2 }),
  gs(60, "2026-06-25", 22,  0, "levis",    "paraguay",     "australia",      "D", { h: 0, a: 0 }),

  // ── Jun 26 ──
  gs(61, "2026-06-26", 15,  0, "gillette", "norway",       "france",         "I", { h: 1, a: 4 }),
  gs(62, "2026-06-26", 15,  0, "bmo",      "senegal",      "iraq",   "I", { h: 5, a: 0 }),
  gs(63, "2026-06-26", 20,  0, "nrg",      "cape-verde",   "saudi-arabia",   "H", { h: 0, a: 0 }),
  gs(64, "2026-06-26", 20,  0, "akron",    "uruguay",      "spain",          "H", { h: 0, a: 1 }),
  gs(65, "2026-06-26", 23,  0, "lumen",    "egypt",        "iran",           "G", { h: 1, a: 1 }),
  gs(66, "2026-06-26", 23,  0, "bc",       "new-zealand",  "belgium",        "G", { h: 1, a: 5 }),

  // ── Jun 27 ──
  gs(67, "2026-06-27", 17,  0, "metlife",  "panama",       "england",        "L", { h: 0, a: 2 }),
  gs(68, "2026-06-27", 17,  0, "lincoln",  "croatia",      "ghana",          "L", { h: 2, a: 1 }),
  gs(69, "2026-06-27", 19, 30, "hardrock", "colombia",     "portugal",       "K", { h: 0, a: 0 }),
  gs(70, "2026-06-27", 19, 30, "mercedes", "dr-congo", "uzbekistan",     "K", { h: 3, a: 1 }),
  gs(71, "2026-06-27", 22,  0, "arrowhead","algeria",      "austria",        "J", { h: 3, a: 3 }),
  gs(72, "2026-06-27", 22,  0, "att",      "jordan",       "argentina",      "J", { h: 1, a: 3 }),
];

// ── ROUND OF 32 (16 matches) ────────────────────────────────
const R32 = "ラウンド32";
const roundOf32: Match[] = [
  ko(73, R32, "2026-06-28", 15,  0, "sofi",     "南アフリカ",   "カナダ", { home: "south-africa", away: "canada" }, { h: 0, a: 1 }),
  ko(74, R32, "2026-06-29", 13,  0, "nrg",      "ブラジル",     "日本", { home: "brazil", away: "japan" }, { h: 2, a: 1 }),
  ko(75, R32, "2026-06-29", 16, 30, "gillette",  "ドイツ",       "パラグアイ", { home: "germany", away: "paraguay" }, { h: 1, a: 1 }),
  ko(76, R32, "2026-06-29", 21,  0, "bbva",     "オランダ",     "モロッコ", { home: "netherlands", away: "morocco" }, { h: 1, a: 1 }),
  ko(77, R32, "2026-06-30", 13,  0, "att",      "コートジボワール", "ノルウェー", { home: "ivory-coast", away: "norway" }, { h: 1, a: 2 }),
  ko(78, R32, "2026-06-30", 17,  0, "metlife",  "フランス",     "スウェーデン", { home: "france", away: "sweden" }, { h: 3, a: 0 }),
  ko(79, R32, "2026-06-30", 21,  0, "azteca",   "メキシコ",     "エクアドル", { home: "mexico", away: "ecuador" }, { h: 2, a: 0 }),
  ko(80, R32, "2026-07-01", 12,  0, "mercedes", "イングランド", "コンゴ民主", { home: "england", away: "dr-congo" }, { h: 2, a: 1 }),
  ko(81, R32, "2026-07-01", 16,  0, "lumen",    "ベルギー",     "セネガル", { home: "belgium", away: "senegal" }, { h: 3, a: 2 }),
  ko(82, R32, "2026-07-01", 20,  0, "levis",    "アメリカ",     "ボスニア", { home: "usa", away: "bosnia" }, { h: 2, a: 0 }),
  ko(83, R32, "2026-07-02", 15,  0, "sofi",     "スペイン",     "オーストリア", { home: "spain", away: "austria" }, { h: 3, a: 0 }),
  ko(84, R32, "2026-07-02", 19,  0, "bmo",      "ポルトガル",   "クロアチア", { home: "portugal", away: "croatia" }, { h: 2, a: 1 }),
  ko(85, R32, "2026-07-02", 23,  0, "bc",       "スイス",       "アルジェリア", { home: "switzerland", away: "algeria" }, { h: 2, a: 0 }),
  ko(86, R32, "2026-07-03", 14,  0, "att",      "オーストラリア", "エジプト", { home: "australia", away: "egypt" }, { h: 1, a: 1 }),
  ko(87, R32, "2026-07-03", 18,  0, "hardrock", "アルゼンチン", "カーボベルデ", { home: "argentina", away: "cape-verde" }, { h: 3, a: 2 }),
  ko(88, R32, "2026-07-03", 21, 30, "arrowhead","コロンビア",   "ガーナ", { home: "colombia", away: "ghana" }, { h: 1, a: 0 }),
];

// ── ROUND OF 16 (8 matches) ─────────────────────────────────
const R16 = "ラウンド16";
const roundOf16: Match[] = [
  ko(89, R16, "2026-07-04", 13,  0, "nrg",      "カナダ",       "モロッコ", { home: "canada", away: "morocco" }, { h: 0, a: 3 }),
  ko(90, R16, "2026-07-04", 17,  0, "lincoln",  "パラグアイ",   "フランス", { home: "paraguay", away: "france" }, { h: 0, a: 1 }),
  ko(91, R16, "2026-07-05", 16,  0, "metlife",  "ブラジル",     "ノルウェー", { home: "brazil", away: "norway" }, { h: 1, a: 2 }),
  ko(92, R16, "2026-07-05", 20,  0, "azteca",   "メキシコ",     "イングランド", { home: "mexico", away: "england" }, { h: 2, a: 3 }),
  ko(93, R16, "2026-07-06", 15,  0, "att",      "ポルトガル",   "スペイン", { home: "portugal", away: "spain" }, { h: 0, a: 1 }),
  ko(94, R16, "2026-07-06", 20,  0, "lumen",    "アメリカ",     "ベルギー", { home: "usa", away: "belgium" }, { h: 1, a: 4 }),
  ko(95, R16, "2026-07-07", 12,  0, "mercedes", "アルゼンチン", "エジプト", { home: "argentina", away: "egypt" }, { h: 3, a: 2 }),
  ko(96, R16, "2026-07-07", 16,  0, "bc",       "スイス",       "コロンビア", { home: "switzerland", away: "colombia" }, { h: 0, a: 0 }),
];

// ── QUARTERFINALS (4 matches) ────────────────────────────────
const QF = "準々決勝";
const quarterFinals: Match[] = [
  ko( 97, QF, "2026-07-09", 16,  0, "gillette",  "フランス",     "モロッコ", { home: "france", away: "morocco" }, { h: 2, a: 0 }),
  ko( 98, QF, "2026-07-10", 15,  0, "sofi",      "スペイン",     "ベルギー", { home: "spain", away: "belgium" }, { h: 2, a: 1 }),
  ko( 99, QF, "2026-07-11", 17,  0, "hardrock",  "ノルウェー",   "イングランド", { home: "norway", away: "england" }, { h: 1, a: 2 }),
  ko(100, QF, "2026-07-11", 21,  0, "arrowhead", "アルゼンチン", "スイス", { home: "argentina", away: "switzerland" }, { h: 3, a: 1 }),
];

// ── SEMIFINALS (2 matches) ───────────────────────────────────
const SF = "準決勝";
const semiFinals: Match[] = [
  ko(101, SF, "2026-07-14", 15,  0, "att",      "フランス",     "スペイン", { home: "france", away: "spain" }, { h: 0, a: 2 }),
  ko(102, SF, "2026-07-15", 15,  0, "mercedes", "イングランド", "アルゼンチン", { home: "england", away: "argentina" }, { h: 1, a: 2 }),
];

// ── THIRD PLACE (1 match) ────────────────────────────────────
const thirdPlace: Match[] = [
  ko(103, "3位決定戦", "2026-07-18", 17,  0, "hardrock", "フランス", "イングランド", { home: "france", away: "england" }, { h: 4, a: 6 }),
];

// ── FINAL (1 match) ──────────────────────────────────────────
const final: Match[] = [
  ko(104, "決勝", "2026-07-19", 15,  0, "metlife", "スペイン", "アルゼンチン", { home: "spain", away: "argentina" }, { h: 1, a: 0 }),
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
