// ── 大会情報 ──────────────────────────────────
// 明治安田J1百年構想リーグ（2026年）
// EAST：横浜FM・町田・浦和・千葉・FC東京・鹿島・川崎F・東京V・柏・水戸
// WEST：神戸・広島・G大阪・C大阪・岡山・京都・名古屋・福岡・清水・長崎

export type JMatchSimple = {
  id: string;
  league: "J1" | "J2" | "J3";
  group: "EAST" | "WEST";
  round: number;
  date: string;
  kickoff: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  pkHome?: number;
  pkAway?: number;
  status: "scheduled" | "live" | "finished";
  stadium: string;
  referenceNote: string;
};

export const JLEAGUE_SEASON = {
  name: "明治安田J1百年構想リーグ",
  year: 2026,
  officialUrl: "https://www.jleague.jp/special/2026specialseason/j1/",
};

export const TEAM_INFO: Record<string, { shortName: string; color: string; emoji: string }> = {
  "横浜FM":  { shortName: "横浜FM",  color: "#003087", emoji: "🔵" },
  "町田":    { shortName: "町田",    color: "#003DA5", emoji: "🔵" },
  "浦和":    { shortName: "浦和",    color: "#E8192C", emoji: "🔴" },
  "千葉":    { shortName: "千葉",    color: "#FFBE00", emoji: "🟡" },
  "FC東京":  { shortName: "FC東京",  color: "#003087", emoji: "🔵" },
  "鹿島":    { shortName: "鹿島",    color: "#E8192C", emoji: "🔴" },
  "川崎F":   { shortName: "川崎F",   color: "#009EE0", emoji: "🔵" },
  "東京V":   { shortName: "東京V",   color: "#006630", emoji: "🟢" },
  "柏":      { shortName: "柏",      color: "#FFBE00", emoji: "🟡" },
  "水戸":    { shortName: "水戸",    color: "#003087", emoji: "🔵" },
  "神戸":    { shortName: "神戸",    color: "#E8192C", emoji: "🔴" },
  "広島":    { shortName: "広島",    color: "#9B1B30", emoji: "🔴" },
  "G大阪":   { shortName: "G大阪",   color: "#003087", emoji: "🔵" },
  "C大阪":   { shortName: "C大阪",   color: "#FF6B00", emoji: "🟠" },
  "岡山":    { shortName: "岡山",    color: "#FF0000", emoji: "🔴" },
  "京都":    { shortName: "京都",    color: "#9B1B30", emoji: "🔴" },
  "名古屋":  { shortName: "名古屋",  color: "#E8192C", emoji: "🔴" },
  "福岡":    { shortName: "福岡",    color: "#003087", emoji: "🔵" },
  "清水":    { shortName: "清水",    color: "#F15A22", emoji: "🟠" },
  "長崎":    { shortName: "長崎",    color: "#003087", emoji: "🔵" },
};

const NOTE = "出典: Jリーグ公式サイト（jleague.jp / data.j-league.or.jp）";

export const jMatches: JMatchSimple[] = [

  // ══════════════════════════════════════════
  // EAST グループ
  // ══════════════════════════════════════════

  // ── 第1節 ──
  { id:"e-r1-ymfm-mchd", league:"J1", group:"EAST", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"横浜FM", awayTeam:"町田",   homeScore:2, awayScore:3, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r1-chib-urw",  league:"J1", group:"EAST", round:1, date:"2026-02-07", kickoff:"13:04", homeTeam:"千葉",   awayTeam:"浦和",   homeScore:0, awayScore:2, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r1-fct-kas",   league:"J1", group:"EAST", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"FC東京", awayTeam:"鹿島",   homeScore:1, awayScore:1, pkHome:5, pkAway:4, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r1-kaw-kas2",  league:"J1", group:"EAST", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"川崎F",  awayTeam:"柏",     homeScore:5, awayScore:3, status:"finished", stadium:"Uvanceとどろきスタジアム", referenceNote:NOTE },
  { id:"e-r1-tkv-mito",  league:"J1", group:"EAST", round:1, date:"2026-02-08", kickoff:"15:00", homeTeam:"東京V",  awayTeam:"水戸",   homeScore:3, awayScore:0, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },

  // ── 第2節 ──
  { id:"e-r2-mchd-mito", league:"J1", group:"EAST", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"町田",   awayTeam:"水戸",   homeScore:2, awayScore:2, pkHome:4, pkAway:2, status:"finished", stadium:"町田GIONスタジアム",   referenceNote:NOTE },
  { id:"e-r2-kas-ymfm",  league:"J1", group:"EAST", round:2, date:"2026-02-14", kickoff:"15:00", homeTeam:"鹿島",   awayTeam:"横浜FM", homeScore:1, awayScore:0, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r2-fct-urw",   league:"J1", group:"EAST", round:2, date:"2026-02-14", kickoff:"15:00", homeTeam:"FC東京", awayTeam:"浦和",   homeScore:1, awayScore:1, pkHome:5, pkAway:3, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r2-chib-kaw",  league:"J1", group:"EAST", round:2, date:"2026-02-15", kickoff:"13:00", homeTeam:"千葉",   awayTeam:"川崎F",  homeScore:1, awayScore:2, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r2-kas2-tkv",  league:"J1", group:"EAST", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"柏",     awayTeam:"東京V",  homeScore:1, awayScore:2, status:"finished", stadium:"三協フロンテア柏スタジアム", referenceNote:NOTE },

  // ── 第3節 ──
  { id:"e-r3-tkv-mchd",  league:"J1", group:"EAST", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"東京V",  awayTeam:"町田",   homeScore:2, awayScore:2, pkHome:4, pkAway:3, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r3-ymfm-urw",  league:"J1", group:"EAST", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"横浜FM", awayTeam:"浦和",   homeScore:0, awayScore:2, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r3-kaw-fct",   league:"J1", group:"EAST", round:3, date:"2026-02-21", kickoff:"15:00", homeTeam:"川崎F",  awayTeam:"FC東京", homeScore:1, awayScore:2, status:"finished", stadium:"Uvanceとどろきスタジアム", referenceNote:NOTE },
  { id:"e-r3-kas-kas2",  league:"J1", group:"EAST", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"鹿島",   awayTeam:"柏",     homeScore:2, awayScore:0, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r3-mito-chib", league:"J1", group:"EAST", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"水戸",   awayTeam:"千葉",   homeScore:null, awayScore:null, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },

  // ── 第4節 ──
  { id:"e-r4-mchd-chib", league:"J1", group:"EAST", round:4, date:"2026-02-27", kickoff:"19:00", homeTeam:"町田",   awayTeam:"千葉",   homeScore:null, awayScore:null, status:"finished", stadium:"町田GIONスタジアム",   referenceNote:NOTE },
  { id:"e-r4-ymfm-tkv",  league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"13:00", homeTeam:"横浜FM", awayTeam:"東京V",  homeScore:null, awayScore:null, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r4-urw-kaw",   league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"15:00", homeTeam:"浦和",   awayTeam:"川崎F",  homeScore:null, awayScore:null, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r4-fct-kas2",  league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"15:00", homeTeam:"FC東京", awayTeam:"柏",     homeScore:null, awayScore:null, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r4-kaw-mito",  league:"J1", group:"EAST", round:4, date:"2026-03-01", kickoff:"16:00", homeTeam:"川崎F",  awayTeam:"水戸",   homeScore:null, awayScore:null, status:"finished", stadium:"Uvanceとどろきスタジアム", referenceNote:NOTE },

  // ── 第5節 ──
  { id:"e-r5-chib-kas2", league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"13:00", homeTeam:"千葉",   awayTeam:"柏",     homeScore:null, awayScore:null, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r5-fct-ymfm",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"FC東京", awayTeam:"横浜FM", homeScore:null, awayScore:null, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r5-mchd-kaw",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"町田",   awayTeam:"川崎F",  homeScore:null, awayScore:null, status:"finished", stadium:"町田GIONスタジアム",   referenceNote:NOTE },
  { id:"e-r5-urw-mito",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"15:00", homeTeam:"浦和",   awayTeam:"水戸",   homeScore:null, awayScore:null, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r5-kas-tkv",   league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"16:00", homeTeam:"鹿島",   awayTeam:"東京V",  homeScore:null, awayScore:null, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },

  // ── 第6節 ──
  { id:"e-r6-ymfm-chib", league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"13:00", homeTeam:"横浜FM", awayTeam:"千葉",   homeScore:null, awayScore:null, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r6-mito-fct",  league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"水戸",   awayTeam:"FC東京", homeScore:null, awayScore:null, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },
  { id:"e-r6-kas2-mchd", league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"柏",     awayTeam:"町田",   homeScore:null, awayScore:null, status:"finished", stadium:"三協フロンテア柏スタジアム", referenceNote:NOTE },
  { id:"e-r6-kas-kaw",   league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"15:00", homeTeam:"鹿島",   awayTeam:"川崎F",  homeScore:null, awayScore:null, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r6-tkv-urw",   league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"16:00", homeTeam:"東京V",  awayTeam:"浦和",   homeScore:null, awayScore:null, status:"finished", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },

  // ── 第7節 ──
  { id:"e-r7-mito-ymfm", league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"水戸",   awayTeam:"横浜FM", homeScore:null, awayScore:null, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },
  { id:"e-r7-chib-fct",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"千葉",   awayTeam:"FC東京", homeScore:null, awayScore:null, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r7-tkv-kaw",   league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"東京V",  awayTeam:"川崎F",  homeScore:0,    awayScore:2,    status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r7-urw-kas2",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:30", homeTeam:"浦和",   awayTeam:"柏",     homeScore:null, awayScore:null, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r7-mchd-kas",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:30", homeTeam:"町田",   awayTeam:"鹿島",   homeScore:0,    awayScore:3,    status:"finished", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },

  // ── 第8節（3/22 本日開催） ──
  { id:"e-r8-tkv-fct",   league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"14:00", homeTeam:"東京V",  awayTeam:"FC東京", homeScore:null, awayScore:null, status:"scheduled", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r8-kas-chib",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"15:00", homeTeam:"鹿島",   awayTeam:"千葉",   homeScore:null, awayScore:null, status:"scheduled", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r8-kaw-ymfm",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"15:00", homeTeam:"川崎F",  awayTeam:"横浜FM", homeScore:null, awayScore:null, status:"scheduled", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },
  { id:"e-r8-urw-mchd",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"16:00", homeTeam:"浦和",   awayTeam:"町田",   homeScore:null, awayScore:null, status:"scheduled", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r8-kas2-mito", league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"16:00", homeTeam:"柏",     awayTeam:"水戸",   homeScore:null, awayScore:null, status:"scheduled", stadium:"三協フロンテア柏スタジアム", referenceNote:NOTE },

  // ══════════════════════════════════════════
  // WEST グループ
  // ══════════════════════════════════════════

  // ── 第1節 ──
  { id:"w-r1-kyt-kob",   league:"J1", group:"WEST", round:1, date:"2026-02-06", kickoff:"19:00", homeTeam:"京都",   awayTeam:"神戸",   homeScore:1, awayScore:1, pkHome:1, pkAway:4, status:"finished", stadium:"サンガスタジアム by KYOCERA", referenceNote:NOTE },
  { id:"w-r1-nsk-hir",   league:"J1", group:"WEST", round:1, date:"2026-02-06", kickoff:"19:00", homeTeam:"長崎",   awayTeam:"広島",   homeScore:1, awayScore:3, status:"finished", stadium:"PEACE STADIUM Connected by SoftBank", referenceNote:NOTE },
  { id:"w-r1-cos-gam",   league:"J1", group:"WEST", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"C大阪",  awayTeam:"G大阪",  homeScore:0, awayScore:0, pkHome:4, pkAway:5, status:"finished", stadium:"ヨドコウ桜スタジアム",   referenceNote:NOTE },
  { id:"w-r1-fuk-oka",   league:"J1", group:"WEST", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"福岡",   awayTeam:"岡山",   homeScore:0, awayScore:0, pkHome:4, pkAway:5, status:"finished", stadium:"ベスト電器スタジアム",   referenceNote:NOTE },
  { id:"w-r1-nag-shm",   league:"J1", group:"WEST", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"名古屋", awayTeam:"清水",   homeScore:1, awayScore:0, status:"finished", stadium:"豊田スタジアム",         referenceNote:NOTE },

  // ── 第2節 ──
  { id:"w-r2-kob-nsk",   league:"J1", group:"WEST", round:2, date:"2026-02-13", kickoff:"19:00", homeTeam:"神戸",   awayTeam:"長崎",   homeScore:2, awayScore:0, status:"finished", stadium:"ノエビアスタジアム神戸", referenceNote:NOTE },
  { id:"w-r2-shm-kyt",   league:"J1", group:"WEST", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"清水",   awayTeam:"京都",   homeScore:1, awayScore:1, pkHome:1, pkAway:3, status:"finished", stadium:"IAIスタジアム日本平",    referenceNote:NOTE },
  { id:"w-r2-hir-oka",   league:"J1", group:"WEST", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"広島",   awayTeam:"岡山",   homeScore:3, awayScore:0, status:"finished", stadium:"エディオンピースウイング広島", referenceNote:NOTE },
  { id:"w-r2-fuk-cos",   league:"J1", group:"WEST", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"福岡",   awayTeam:"C大阪",  homeScore:0, awayScore:2, status:"finished", stadium:"ベスト電器スタジアム",   referenceNote:NOTE },
  { id:"w-r2-gam-nag",   league:"J1", group:"WEST", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"G大阪",  awayTeam:"名古屋", homeScore:0, awayScore:0, pkHome:2, pkAway:3, status:"finished", stadium:"パナソニックスタジアム吹田", referenceNote:NOTE },

  // ── 第3節 ──
  { id:"w-r3-shm-kob",   league:"J1", group:"WEST", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"清水",   awayTeam:"神戸",   homeScore:1, awayScore:0, status:"finished", stadium:"IAIスタジアム日本平",    referenceNote:NOTE },
  { id:"w-r3-nag-nsk",   league:"J1", group:"WEST", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"名古屋", awayTeam:"長崎",   homeScore:null, awayScore:null, status:"finished", stadium:"豊田スタジアム",         referenceNote:NOTE },
  { id:"w-r3-kyt-fuk",   league:"J1", group:"WEST", round:3, date:"2026-02-22", kickoff:"13:00", homeTeam:"京都",   awayTeam:"福岡",   homeScore:2, awayScore:0, status:"finished", stadium:"サンガスタジアム by KYOCERA", referenceNote:NOTE },
  { id:"w-r3-oka-gam",   league:"J1", group:"WEST", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"岡山",   awayTeam:"G大阪",  homeScore:1, awayScore:2, status:"finished", stadium:"シティライトスタジアム",  referenceNote:NOTE },
  { id:"w-r3-cos-hir",   league:"J1", group:"WEST", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"C大阪",  awayTeam:"広島",   homeScore:1, awayScore:2, status:"finished", stadium:"ヨドコウ桜スタジアム",   referenceNote:NOTE },

  // ── 第4節 ──
  { id:"w-r4-kob-fuk",   league:"J1", group:"WEST", round:4, date:"2026-02-27", kickoff:"19:00", homeTeam:"神戸",   awayTeam:"福岡",   homeScore:2, awayScore:1, status:"finished", stadium:"ノエビアスタジアム神戸", referenceNote:NOTE },
  { id:"w-r4-hir-kyt",   league:"J1", group:"WEST", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"広島",   awayTeam:"京都",   homeScore:1, awayScore:2, status:"finished", stadium:"エディオンピースウイング広島", referenceNote:NOTE },
  { id:"w-r4-gam-shm",   league:"J1", group:"WEST", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"G大阪",  awayTeam:"清水",   homeScore:2, awayScore:2, pkHome:5, pkAway:4, status:"finished", stadium:"パナソニックスタジアム吹田", referenceNote:NOTE },
  { id:"w-r4-nsk-cos",   league:"J1", group:"WEST", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"長崎",   awayTeam:"C大阪",  homeScore:1, awayScore:0, status:"finished", stadium:"PEACE STADIUM Connected by SoftBank", referenceNote:NOTE },
  { id:"w-r4-oka-nag",   league:"J1", group:"WEST", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"岡山",   awayTeam:"名古屋", homeScore:1, awayScore:1, pkHome:5, pkAway:4, status:"finished", stadium:"シティライトスタジアム",  referenceNote:NOTE },

  // ── 第5節 ──
  { id:"w-r5-hir-shm",   league:"J1", group:"WEST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"広島",   awayTeam:"清水",   homeScore:null, awayScore:null, status:"finished", stadium:"エディオンピースウイング広島", referenceNote:NOTE },
  { id:"w-r5-cos-nag",   league:"J1", group:"WEST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"C大阪",  awayTeam:"名古屋", homeScore:0, awayScore:0, pkHome:4, pkAway:2, status:"finished", stadium:"ヨドコウ桜スタジアム",   referenceNote:NOTE },
  { id:"w-r5-fuk-nag2",  league:"J1", group:"WEST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"福岡",   awayTeam:"名古屋", homeScore:1, awayScore:5, status:"finished", stadium:"ベスト電器スタジアム",   referenceNote:NOTE },
  { id:"w-r5-oka-kyt",   league:"J1", group:"WEST", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"岡山",   awayTeam:"京都",   homeScore:1, awayScore:0, status:"finished", stadium:"シティライトスタジアム",  referenceNote:NOTE },
  { id:"w-r5-gam-nsk",   league:"J1", group:"WEST", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"G大阪",  awayTeam:"長崎",   homeScore:3, awayScore:2, status:"finished", stadium:"パナソニックスタジアム吹田", referenceNote:NOTE },

  // ── 第6節 ──
  { id:"w-r6-oka-shm",   league:"J1", group:"WEST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"岡山",   awayTeam:"清水",   homeScore:null, awayScore:null, status:"finished", stadium:"IAIスタジアム日本平",    referenceNote:NOTE },
  { id:"w-r6-nag-kob",   league:"J1", group:"WEST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"名古屋", awayTeam:"神戸",   homeScore:0, awayScore:3, status:"finished", stadium:"豊田スタジアム",         referenceNote:NOTE },
  { id:"w-r6-kyt-cos",   league:"J1", group:"WEST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"京都",   awayTeam:"C大阪",  homeScore:1, awayScore:2, status:"finished", stadium:"サンガスタジアム by KYOCERA", referenceNote:NOTE },
  { id:"w-r6-hir-gam",   league:"J1", group:"WEST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"広島",   awayTeam:"G大阪",  homeScore:2, awayScore:0, status:"finished", stadium:"エディオンピースウイング広島", referenceNote:NOTE },
  { id:"w-r6-nsk-fuk",   league:"J1", group:"WEST", round:6, date:"2026-03-15", kickoff:"14:00", homeTeam:"長崎",   awayTeam:"福岡",   homeScore:1, awayScore:0, status:"finished", stadium:"PEACE STADIUM Connected by SoftBank", referenceNote:NOTE },

  // ── 第7節 ──
  { id:"w-r7-cos-oka",   league:"J1", group:"WEST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"C大阪",  awayTeam:"岡山",   homeScore:1, awayScore:2, status:"finished", stadium:"ヨドコウ桜スタジアム",   referenceNote:NOTE },
  { id:"w-r7-nag-hir",   league:"J1", group:"WEST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"名古屋", awayTeam:"広島",   homeScore:2, awayScore:1, status:"finished", stadium:"豊田スタジアム",         referenceNote:NOTE },
  { id:"w-r7-kob-gam",   league:"J1", group:"WEST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"神戸",   awayTeam:"G大阪",  homeScore:2, awayScore:2, pkHome:3, pkAway:5, status:"finished", stadium:"ノエビアスタジアム神戸", referenceNote:NOTE },
  { id:"w-r7-fuk-shm",   league:"J1", group:"WEST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"福岡",   awayTeam:"清水",   homeScore:1, awayScore:1, pkHome:4, pkAway:5, status:"finished", stadium:"ベスト電器スタジアム",   referenceNote:NOTE },
  { id:"w-r7-nsk-kyt",   league:"J1", group:"WEST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"長崎",   awayTeam:"京都",   homeScore:1, awayScore:2, status:"finished", stadium:"PEACE STADIUM Connected by SoftBank", referenceNote:NOTE },

  // ── 第8節（3/21〜3/22） ──
  { id:"w-r8-oka-nsk",   league:"J1", group:"WEST", round:8, date:"2026-03-21", kickoff:"14:00", homeTeam:"岡山",   awayTeam:"長崎",   homeScore:0, awayScore:1, status:"finished", stadium:"シティライトスタジアム",  referenceNote:NOTE },
  { id:"w-r8-fuk-gam",   league:"J1", group:"WEST", round:8, date:"2026-03-21", kickoff:"14:00", homeTeam:"福岡",   awayTeam:"G大阪",  homeScore:2, awayScore:2, pkHome:14, pkAway:13, status:"finished", stadium:"ベスト電器スタジアム",   referenceNote:NOTE },
  { id:"w-r8-shm-hir",   league:"J1", group:"WEST", round:8, date:"2026-03-22", kickoff:"13:00", homeTeam:"清水",   awayTeam:"広島",   homeScore:null, awayScore:null, status:"scheduled", stadium:"IAIスタジアム日本平",    referenceNote:NOTE },
  { id:"w-r8-kyt-nag",   league:"J1", group:"WEST", round:8, date:"2026-03-22", kickoff:"14:00", homeTeam:"京都",   awayTeam:"名古屋", homeScore:null, awayScore:null, status:"scheduled", stadium:"サンガスタジアム by KYOCERA", referenceNote:NOTE },
  { id:"w-r8-cos-kob",   league:"J1", group:"WEST", round:8, date:"2026-03-22", kickoff:"15:00", homeTeam:"C大阪",  awayTeam:"神戸",   homeScore:null, awayScore:null, status:"scheduled", stadium:"ヨドコウ桜スタジアム",   referenceNote:NOTE },
];

// ── ヘルパー関数 ──

export function getMatchesByRound(round: number, group?: "EAST" | "WEST"): JMatchSimple[] {
  return jMatches.filter((m) => m.round === round && (group ? m.group === group : true));
}

export function getLatestFinishedRound(): number {
  const finished = jMatches.filter((m) => m.status === "finished");
  if (!finished.length) return 1;
  return Math.max(...finished.map((m) => m.round));
}

export function getAllRounds(): number[] {
  return [...new Set(jMatches.map((m) => m.round))].sort((a, b) => a - b);
}

export function getScoreDisplay(m: JMatchSimple): string {
  if (m.status === "scheduled") return m.kickoff || "予定";
  if (m.homeScore === null || m.awayScore === null) return "- -";
  let s = `${m.homeScore} - ${m.awayScore}`;
  if (m.pkHome !== undefined && m.pkAway !== undefined) {
    s += ` (PK${m.pkHome}-${m.pkAway})`;
  }
  return s;
}
