// ── 大会情報 ──────────────────────────────────
// 明治安田J1百年構想リーグ（2026年）
// EAST：横浜FM・町田・浦和・千葉・FC東京・鹿島・川崎F・東京V・柏・水戸
// WEST：神戸・広島・G大阪・C大阪・岡山・京都・名古屋・福岡・清水・長崎

export type JPosition = "GK" | "DF" | "MF" | "FW";

export type JPlayer = {
  number: number;
  name: string;
  position: JPosition;
  isCaptain?: boolean;
  subOut?: number;
  subIn?: number;
  isStarter: boolean;
};

export type JLineup = {
  formation: string;
  players: JPlayer[];
};

export type JGoal = {
  minute: number;
  playerName: string;
  assistName?: string;
  teamSide: "home" | "away";
};

export type JCard = {
  minute: number;
  playerName: string;
  teamSide: "home" | "away";
  type: "yellow" | "red";
};

export type JStats = {
  possession?: [number, number];
  shots?: [number, number];
  shotsOnTarget?: [number, number];
  corners?: [number, number];
  fouls?: [number, number];
  yellowCards?: [number, number];
  passes?: [number, number];
  passAccuracy?: [number, number];
};

export type JTimelineEvent = {
  minute: number;
  type: "goal" | "card" | "sub" | "note" | "end";
  teamSide?: "home" | "away" | "neutral";
  text: string;
};

export type JMatchDetail = {
  matchId: string;
  homeLineup: JLineup;
  awayLineup: JLineup;
  goals?: JGoal[];
  cards?: JCard[];
  stats?: JStats;
  timeline?: JTimelineEvent[];
};

export type JMatchSimple = {
  id: string;
  league: "J1" | "J2" | "J3" | "J2J3";
  group: "EAST" | "WEST" | "EAST-A" | "EAST-B" | "WEST-A" | "WEST-B";
  round: number;
  date: string;
  kickoff: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  pkHome?: number;
  pkAway?: number;
  pkWinner?: "home" | "away";
  status: "scheduled" | "live" | "finished";
  stadium: string;
  referenceNote: string;
};

export const JLEAGUE_SEASON = {
  name: "明治安田Jリーグ百年構想リーグ",
  nameJ1: "明治安田J1百年構想リーグ",
  nameJ23: "明治安田J2・J3百年構想リーグ",
  year: 2026,
  officialUrl: "https://www.jleague.jp/special/2026specialseason/j1/",
  officialUrlJ1: "https://www.jleague.jp/special/2026specialseason/j1/",
  officialUrlJ23: "https://www.jleague.jp/special/2026specialseason/j2-j3/",
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
  // J2・J3 EAST-A
  "仙台":    { shortName: "仙台",    color: "#003087", emoji: "🔵" },
  "山形":    { shortName: "山形",    color: "#7B0D9E", emoji: "🟣" },
  "秋田":    { shortName: "秋田",    color: "#E8192C", emoji: "🔴" },
  "群馬":    { shortName: "群馬",    color: "#E8192C", emoji: "🔴" },
  "相模原":  { shortName: "相模原",  color: "#003DA5", emoji: "🔵" },
  "横浜FC":  { shortName: "横浜FC",  color: "#003087", emoji: "🔵" },
  "栃木SC":  { shortName: "栃木SC",  color: "#003DA5", emoji: "🔵" },
  "栃木C":   { shortName: "栃木C",   color: "#E8192C", emoji: "🔴" },
  "湘南":    { shortName: "湘南",    color: "#0A8A3E", emoji: "🟢" },
  "八戸":    { shortName: "八戸",    color: "#003087", emoji: "🔵" },
  // J2・J3 EAST-B
  "札幌":    { shortName: "札幌",    color: "#E8192C", emoji: "🔴" },
  "大宮":    { shortName: "大宮",    color: "#FF6B00", emoji: "🟠" },
  "磐田":    { shortName: "磐田",    color: "#009EE0", emoji: "🔵" },
  "甲府":    { shortName: "甲府",    color: "#003087", emoji: "🔵" },
  "藤枝":    { shortName: "藤枝",    color: "#003DA5", emoji: "🔵" },
  "松本":    { shortName: "松本",    color: "#003087", emoji: "🔵" },
  "長野":    { shortName: "長野",    color: "#003087", emoji: "🔵" },
  "岐阜":    { shortName: "岐阜",    color: "#003087", emoji: "🔵" },
  "いわき":  { shortName: "いわき",  color: "#E8192C", emoji: "🔴" },
  "福島":    { shortName: "福島",    color: "#003087", emoji: "🔵" },
  // J2・J3 WEST-A
  "新潟":    { shortName: "新潟",    color: "#FF6B00", emoji: "🟠" },
  "富山":    { shortName: "富山",    color: "#003087", emoji: "🔵" },
  "金沢":    { shortName: "金沢",    color: "#003DA5", emoji: "🔵" },
  "徳島":    { shortName: "徳島",    color: "#003087", emoji: "🔵" },
  "讃岐":    { shortName: "讃岐",    color: "#003DA5", emoji: "🔵" },
  "愛媛":    { shortName: "愛媛",    color: "#FF6B00", emoji: "🟠" },
  "今治":    { shortName: "今治",    color: "#003DA5", emoji: "🔵" },
  "高知":    { shortName: "高知",    color: "#E8192C", emoji: "🔴" },
  "奈良":    { shortName: "奈良",    color: "#9B1B30", emoji: "🔴" },
  "FC大阪":  { shortName: "FC大阪",  color: "#9B1B30", emoji: "🔴" },
  // J2・J3 WEST-B
  "宮崎":    { shortName: "宮崎",    color: "#003087", emoji: "🔵" },
  "鹿児島":  { shortName: "鹿児島",  color: "#003DA5", emoji: "🔵" },
  "熊本":    { shortName: "熊本",    color: "#003087", emoji: "🔵" },
  "大分":    { shortName: "大分",    color: "#003DA5", emoji: "🔵" },
  "北九州":  { shortName: "北九州",  color: "#003DA5", emoji: "🔵" },
  "山口":    { shortName: "山口",    color: "#003DA5", emoji: "🔵" },
  "琉球":    { shortName: "琉球",    color: "#003087", emoji: "🔵" },
  "滋賀":    { shortName: "滋賀",    color: "#003087", emoji: "🔵" },
  "鳥取":    { shortName: "鳥取",    color: "#E8192C", emoji: "🔴" },
  "鳥栖":    { shortName: "鳥栖",    color: "#E8192C", emoji: "🔴" },
};

const NOTE = "出典: Jリーグ公式サイト（jleague.jp / data.j-league.or.jp）";

export const jMatchDetails: JMatchDetail[] = [
  {
    matchId: "e-r8-kas-chib",
    homeLineup: {
      formation: "4-3-3",
      players: [
        { number: 21, name: "早川 友基",    position: "GK", isStarter: true },
        { number: 18, name: "濃野 公人",    position: "DF", isStarter: true },
        { number:  5, name: "植田 直通",    position: "DF", isStarter: true },
        { number:  3, name: "関川 郁万",    position: "DF", isStarter: true },
        { number: 22, name: "安西 幸輝",    position: "DF", isStarter: true },
        { number:  6, name: "三竿 健斗",    position: "MF", isStarter: true, isCaptain: true },
        { number:  8, name: "佐野 海舟",    position: "MF", isStarter: true, subOut: 80 },
        { number: 14, name: "樋口 雄太",    position: "MF", isStarter: true },
        { number:  9, name: "鈴木 優磨",    position: "FW", isStarter: true },
        { number: 10, name: "エレケ",       position: "FW", isStarter: true, subOut: 72 },
        { number:  7, name: "知念 慶",      position: "FW", isStarter: true, subOut: 59 },
        { number:  1, name: "沖 悠哉",      position: "GK", isStarter: false },
        { number: 33, name: "津久井 匠海",  position: "DF", isStarter: false },
        { number: 13, name: "広瀬 陸斗",    position: "DF", isStarter: false },
        { number: 16, name: "ピトゥカ",     position: "MF", isStarter: false },
        { number: 20, name: "藤井 智也",    position: "MF", isStarter: false },
        { number: 15, name: "名古 新太郎",  position: "FW", isStarter: false, subIn: 72 },
        { number: 19, name: "仲間 隼斗",    position: "FW", isStarter: false, subIn: 59 },
        { number: 11, name: "松村 優太",    position: "FW", isStarter: false, subIn: 80 },
      ],
    },
    awayLineup: {
      formation: "4-4-2",
      players: [
        { number:  1, name: "鈴木 椋大",        position: "GK", isStarter: true },
        { number:  2, name: "高橋 壱晟",        position: "DF", isStarter: true },
        { number:  5, name: "チャン・ミンギュ",  position: "DF", isStarter: true },
        { number:  3, name: "乾 貴士",          position: "DF", isStarter: true },
        { number: 16, name: "新明 龍太",        position: "DF", isStarter: true },
        { number: 17, name: "末吉 塁",          position: "MF", isStarter: true, subOut: 56 },
        { number:  8, name: "田口 泰士",        position: "MF", isStarter: true, isCaptain: true, subOut: 82 },
        { number:  7, name: "見木 友哉",        position: "MF", isStarter: true },
        { number:  6, name: "風間 宏矢",        position: "MF", isStarter: true, subOut: 68 },
        { number: 11, name: "ドゥドゥ",          position: "FW", isStarter: true },
        { number:  9, name: "小森 飛絢",        position: "FW", isStarter: true },
        { number: 21, name: "松原 颯汰",        position: "GK", isStarter: false },
        { number:  4, name: "鈴木 大輔",        position: "DF", isStarter: false },
        { number: 26, name: "矢口 駿",          position: "DF", isStarter: false },
        { number: 14, name: "ゲオルギエフ",     position: "MF", isStarter: false },
        { number: 20, name: "椿 直起",          position: "MF", isStarter: false, subIn: 56 },
        { number: 19, name: "横山 歩夢",        position: "MF", isStarter: false, subIn: 68 },
        { number: 22, name: "熊谷アンドリュー", position: "DF", isStarter: false, subIn: 82 },
        { number: 10, name: "船山 貴之",        position: "FW", isStarter: false },
      ],
    },
    goals: [
      { minute: 28, playerName: "エレケ",    assistName: "鈴木 優磨", teamSide: "home" },
      { minute: 41, playerName: "小森 飛絢",  assistName: "ドゥドゥ",   teamSide: "away" },
      { minute: 71, playerName: "植田 直通",  assistName: "樋口 雄太（CK）", teamSide: "home" },
    ],
    cards: [
      { minute: 55, playerName: "チャン・ミンギュ", teamSide: "away", type: "yellow" },
      { minute: 88, playerName: "三竿 健斗",        teamSide: "home", type: "yellow" },
    ],
    stats: {
      possession:    [54, 46],
      shots:         [14, 7],
      shotsOnTarget: [5, 3],
      corners:       [6, 2],
      fouls:         [9, 13],
      yellowCards:   [1, 1],
      passes:        [498, 341],
      passAccuracy:  [86, 78],
    },
    timeline: [
      { minute:  1, type: "note", teamSide: "neutral", text: "鹿島KO。序盤から高プレッシングで千葉を押し込む。" },
      { minute: 28, type: "goal", teamSide: "home",    text: "エレケが鈴木優磨のスルーパスに抜け出し先制。" },
      { minute: 41, type: "goal", teamSide: "away",    text: "千葉がカウンター。ドゥドゥ→小森で同点。" },
      { minute: 45, type: "end",  teamSide: "neutral", text: "前半終了 1-1" },
      { minute: 46, type: "note", teamSide: "neutral", text: "後半開始。鹿島が攻勢を強める。" },
      { minute: 55, type: "card", teamSide: "away",    text: "チャン・ミンギュにイエローカード。" },
      { minute: 56, type: "sub",  teamSide: "away",    text: "千葉: 末吉OUT → 椿IN" },
      { minute: 59, type: "sub",  teamSide: "home",    text: "鹿島: 知念OUT → 仲間IN" },
      { minute: 68, type: "sub",  teamSide: "away",    text: "千葉: 風間OUT → 横山IN" },
      { minute: 71, type: "goal", teamSide: "home",    text: "CKから植田直通がヘッドで勝ち越し！" },
      { minute: 72, type: "sub",  teamSide: "home",    text: "鹿島: エレケOUT → 名古IN" },
      { minute: 80, type: "sub",  teamSide: "home",    text: "鹿島: 佐野OUT → 松村IN" },
      { minute: 82, type: "sub",  teamSide: "away",    text: "千葉: 田口OUT → 熊谷IN" },
      { minute: 88, type: "card", teamSide: "home",    text: "三竿 健斗にイエローカード。" },
      { minute: 93, type: "end",  teamSide: "neutral", text: "試合終了。鹿島 2-1 千葉。" },
    ],
  },
];

export function getMatchDetail(matchId: string): JMatchDetail | undefined {
  return jMatchDetails.find((d) => d.matchId === matchId);
}

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
  { id:"e-r3-mito-chib", league:"J1", group:"EAST", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"水戸",   awayTeam:"千葉",   homeScore:1, awayScore:0, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },

  // ── 第4節 ──
  { id:"e-r4-mchd-chib", league:"J1", group:"EAST", round:4, date:"2026-02-27", kickoff:"19:00", homeTeam:"町田",   awayTeam:"千葉",   homeScore:2, awayScore:1, status:"finished", stadium:"町田GIONスタジアム",   referenceNote:NOTE },
  { id:"e-r4-ymfm-tkv",  league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"13:00", homeTeam:"横浜FM", awayTeam:"東京V",  homeScore:3, awayScore:2, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r4-urw-kaw",   league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"15:00", homeTeam:"浦和",   awayTeam:"川崎F",  homeScore:2, awayScore:3, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r4-fct-kas2",  league:"J1", group:"EAST", round:4, date:"2026-02-28", kickoff:"15:00", homeTeam:"FC東京", awayTeam:"柏",     homeScore:0, awayScore:2, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r4-kaw-mito",  league:"J1", group:"EAST", round:4, date:"2026-03-01", kickoff:"16:00", homeTeam:"川崎F",  awayTeam:"水戸",   homeScore:2, awayScore:2, pkHome:4, pkAway:2, status:"finished", stadium:"Uvanceとどろきスタジアム", referenceNote:NOTE },

  // ── 第5節 ──
  { id:"e-r5-chib-kas2", league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"13:00", homeTeam:"千葉",   awayTeam:"柏",     homeScore:2, awayScore:1, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r5-fct-ymfm",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"FC東京", awayTeam:"横浜FM", homeScore:3, awayScore:0, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r5-mchd-kaw",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"町田",   awayTeam:"川崎F",  homeScore:1, awayScore:0, status:"finished", stadium:"町田GIONスタジアム",   referenceNote:NOTE },
  { id:"e-r5-urw-mito",  league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"15:00", homeTeam:"浦和",   awayTeam:"水戸",   homeScore:3, awayScore:0, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r5-kas-tkv",   league:"J1", group:"EAST", round:5, date:"2026-03-07", kickoff:"16:00", homeTeam:"鹿島",   awayTeam:"東京V",  homeScore:2, awayScore:0, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },

  // ── 第6節 ──
  { id:"e-r6-ymfm-chib", league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"13:00", homeTeam:"横浜FM", awayTeam:"千葉",   homeScore:2, awayScore:0, status:"finished", stadium:"日産スタジアム",       referenceNote:NOTE },
  { id:"e-r6-mito-fct",  league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"水戸",   awayTeam:"FC東京", homeScore:1, awayScore:1, pkHome:5, pkAway:6, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },
  { id:"e-r6-kas2-mchd", league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"柏",     awayTeam:"町田",   homeScore:0, awayScore:1, status:"finished", stadium:"三協フロンテア柏スタジアム", referenceNote:NOTE },
  { id:"e-r6-kas-kaw",   league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"15:00", homeTeam:"鹿島",   awayTeam:"川崎F",  homeScore:1, awayScore:0, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r6-tkv-urw",   league:"J1", group:"EAST", round:6, date:"2026-03-14", kickoff:"16:00", homeTeam:"東京V",  awayTeam:"浦和",   homeScore:1, awayScore:0, status:"finished", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },

  // ── 第7節 ──
  { id:"e-r7-mito-ymfm", league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"水戸",   awayTeam:"横浜FM", homeScore:0, awayScore:2, status:"finished", stadium:"ケーズデンキスタジアム水戸", referenceNote:NOTE },
  { id:"e-r7-chib-fct",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"千葉",   awayTeam:"FC東京", homeScore:1, awayScore:2, status:"finished", stadium:"フクダ電子アリーナ",   referenceNote:NOTE },
  { id:"e-r7-tkv-kaw",   league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:00", homeTeam:"東京V",  awayTeam:"川崎F",  homeScore:0,    awayScore:2,    status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r7-urw-kas2",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:30", homeTeam:"浦和",   awayTeam:"柏",     homeScore:1, awayScore:1, pkHome:2, pkAway:4, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r7-mchd-kas",  league:"J1", group:"EAST", round:7, date:"2026-03-18", kickoff:"19:30", homeTeam:"町田",   awayTeam:"鹿島",   homeScore:0,    awayScore:3,    status:"finished", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },

  // ── 第8節（3/22 本日開催） ──
  { id:"e-r8-tkv-fct",   league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"14:00", homeTeam:"東京V",  awayTeam:"FC東京", homeScore:0, awayScore:0, pkHome:4, pkAway:2, status:"finished", stadium:"味の素スタジアム",     referenceNote:NOTE },
  { id:"e-r8-kas-chib",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"15:00", homeTeam:"鹿島",   awayTeam:"千葉",   homeScore:2, awayScore:1, status:"finished", stadium:"カシマサッカースタジアム", referenceNote:NOTE },
  { id:"e-r8-kaw-ymfm",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"15:00", homeTeam:"川崎F",  awayTeam:"横浜FM", homeScore:0, awayScore:5, status:"finished", stadium:"MUFGスタジアム(国立)", referenceNote:NOTE },
  { id:"e-r8-urw-mchd",  league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"16:00", homeTeam:"浦和",   awayTeam:"町田",   homeScore:2, awayScore:1, status:"finished", stadium:"埼玉スタジアム2002",    referenceNote:NOTE },
  { id:"e-r8-kas2-mito", league:"J1", group:"EAST", round:8, date:"2026-03-22", kickoff:"16:00", homeTeam:"柏",     awayTeam:"水戸",   homeScore:3, awayScore:0, status:"finished", stadium:"三協フロンテア柏スタジアム", referenceNote:NOTE },

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

  // ══════════════════════════════════════════
  // J2・J3百年構想リーグ EAST-A
  // ══════════════════════════════════════════
  // ── EAST-A 第1節 ──
  { id:"ea-r1-gmm-sgm",   league:"J2J3", group:"EAST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"群馬",  awayTeam:"相模原", homeScore:2, awayScore:0, status:"finished", stadium:"正田醤油スタジアム群馬", referenceNote:NOTE },
  { id:"ea-r1-tksc-hcht",  league:"J2J3", group:"EAST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"栃木SC", awayTeam:"八戸",  homeScore:3, awayScore:2, status:"finished", stadium:"カンセキスタジアムとちぎ", referenceNote:NOTE },
  { id:"ea-r1-tkvc-snd",   league:"J2J3", group:"EAST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"栃木C", awayTeam:"仙台",   homeScore:1, awayScore:4, status:"finished", stadium:"栃木県グリーンスタジアム", referenceNote:NOTE },
  { id:"ea-r1-ykfc-ymgt",  league:"J2J3", group:"EAST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"横浜FC", awayTeam:"山形",   homeScore:1, awayScore:2, status:"finished", stadium:"ニッパツ三ツ沢球技場",    referenceNote:NOTE },
  { id:"ea-r1-sho-aki",    league:"J2J3", group:"EAST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"湘南",  awayTeam:"秋田",   homeScore:1, awayScore:2, status:"finished", stadium:"レモンガススタジアム平塚", referenceNote:NOTE },
  // ── EAST-A 第2節 ──
  { id:"ea-r2-gmm-hcht",   league:"J2J3", group:"EAST-A", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"群馬",  awayTeam:"八戸",   homeScore:0, awayScore:1, status:"finished", stadium:"正田醤油スタジアム群馬", referenceNote:NOTE },
  { id:"ea-r2-ykfc-snd",   league:"J2J3", group:"EAST-A", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"横浜FC", awayTeam:"仙台",  homeScore:0, awayScore:1, status:"finished", stadium:"ニッパツ三ツ沢球技場",    referenceNote:NOTE },
  { id:"ea-r2-sho-sgm",    league:"J2J3", group:"EAST-A", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"湘南",  awayTeam:"相模原", homeScore:4, awayScore:0, status:"finished", stadium:"レモンガススタジアム平塚", referenceNote:NOTE },
  { id:"ea-r2-tksc-ymgt",  league:"J2J3", group:"EAST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"栃木SC", awayTeam:"山形",  homeScore:1, awayScore:2, status:"finished", stadium:"カンセキスタジアムとちぎ", referenceNote:NOTE },
  { id:"ea-r2-tkvc-aki",   league:"J2J3", group:"EAST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"栃木C", awayTeam:"秋田",   homeScore:0, awayScore:1, status:"finished", stadium:"栃木県グリーンスタジアム", referenceNote:NOTE },
  // ── EAST-A 第3節 ──
  { id:"ea-r3-gmm-ymgt",   league:"J2J3", group:"EAST-A", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"群馬",  awayTeam:"山形",   homeScore:0, awayScore:2, status:"finished", stadium:"正田醤油スタジアム群馬", referenceNote:NOTE },
  { id:"ea-r3-sho-hcht",   league:"J2J3", group:"EAST-A", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"湘南",  awayTeam:"八戸",   homeScore:1, awayScore:0, status:"finished", stadium:"レモンガススタジアム平塚", referenceNote:NOTE },
  { id:"ea-r3-sgm-aki",    league:"J2J3", group:"EAST-A", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"相模原", awayTeam:"秋田",  homeScore:1, awayScore:2, status:"finished", stadium:"ギオンスタジアム",         referenceNote:NOTE },
  { id:"ea-r3-tksc-snd",   league:"J2J3", group:"EAST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"栃木SC", awayTeam:"仙台",  homeScore:1, awayScore:2, status:"finished", stadium:"カンセキスタジアムとちぎ", referenceNote:NOTE },
  { id:"ea-r3-ykfc-tkvc",  league:"J2J3", group:"EAST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"横浜FC", awayTeam:"栃木C", homeScore:5, awayScore:1, status:"finished", stadium:"ニッパツ三ツ沢球技場",    referenceNote:NOTE },
  // ── EAST-A 第4節 ──
  { id:"ea-r4-snd-ymgt",   league:"J2J3", group:"EAST-A", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"仙台",  awayTeam:"山形",   homeScore:0, awayScore:0, pkHome:5, pkAway:4, status:"finished", stadium:"ユアテックスタジアム仙台", referenceNote:NOTE },
  { id:"ea-r4-tkvc-sho",   league:"J2J3", group:"EAST-A", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"栃木C", awayTeam:"湘南",   homeScore:1, awayScore:3, status:"finished", stadium:"栃木県グリーンスタジアム", referenceNote:NOTE },
  { id:"ea-r4-gmm-aki",    league:"J2J3", group:"EAST-A", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"群馬",  awayTeam:"秋田",   homeScore:3, awayScore:2, status:"finished", stadium:"正田醤油スタジアム群馬", referenceNote:NOTE },
  { id:"ea-r4-tksc-ykfc",  league:"J2J3", group:"EAST-A", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"栃木SC", awayTeam:"横浜FC", homeScore:4, awayScore:0, status:"finished", stadium:"カンセキスタジアムとちぎ", referenceNote:NOTE },
  { id:"ea-r4-sgm-ymgt",   league:"J2J3", group:"EAST-A", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"相模原", awayTeam:"山形",  homeScore:0, awayScore:3, status:"finished", stadium:"ギオンスタジアム",         referenceNote:NOTE },
  // ── EAST-A 第7節 ──
  { id:"ea-r7-gmm-sho",    league:"J2J3", group:"EAST-A", round:7, date:"2026-03-20", kickoff:"14:00", homeTeam:"群馬",  awayTeam:"湘南",   homeScore:0, awayScore:2, status:"finished", stadium:"正田醤油スタジアム群馬", referenceNote:NOTE },
  { id:"ea-r7-aki-hcht",   league:"J2J3", group:"EAST-A", round:7, date:"2026-03-21", kickoff:"14:00", homeTeam:"秋田",  awayTeam:"八戸",   homeScore:null, awayScore:null, status:"finished", stadium:"ソユースタジアム",         referenceNote:NOTE },
  { id:"ea-r7-sgm-ykfc",   league:"J2J3", group:"EAST-A", round:7, date:"2026-03-21", kickoff:"14:00", homeTeam:"相模原", awayTeam:"横浜FC", homeScore:2, awayScore:3, status:"finished", stadium:"ギオンスタジアム",         referenceNote:NOTE },
  { id:"ea-r7-ymgt-snd",   league:"J2J3", group:"EAST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"山形",  awayTeam:"仙台",   homeScore:null, awayScore:null, status:"scheduled", stadium:"NDソフトスタジアム山形",   referenceNote:NOTE },
  { id:"ea-r7-tksc-tkvc",  league:"J2J3", group:"EAST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"栃木SC", awayTeam:"栃木C", homeScore:null, awayScore:null, status:"scheduled", stadium:"カンセキスタジアムとちぎ", referenceNote:NOTE },

  // ══════════════════════════════════════════
  // J2・J3百年構想リーグ EAST-B
  // ══════════════════════════════════════════
  { id:"eb-r7-omy-jub",    league:"J2J3", group:"EAST-B", round:7, date:"2026-03-21", kickoff:"14:00", homeTeam:"大宮",  awayTeam:"磐田",   homeScore:4, awayScore:1, status:"finished", stadium:"NACK5スタジアム大宮",       referenceNote:NOTE },

  // ══════════════════════════════════════════
  // J2・J3百年構想リーグ WEST-A
  // ══════════════════════════════════════════
  // ── WEST-A 第1節 ──
  { id:"wa-r1-nra-tks",    league:"J2J3", group:"WEST-A", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"奈良",  awayTeam:"徳島",   homeScore:0, awayScore:6, status:"finished", stadium:"ロートフィールド奈良",       referenceNote:NOTE },
  { id:"wa-r1-ehm-nig",    league:"J2J3", group:"WEST-A", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"愛媛",  awayTeam:"新潟",   homeScore:0, awayScore:1, status:"finished", stadium:"ニンジニアスタジアム",        referenceNote:NOTE },
  { id:"wa-r1-fco-sns",    league:"J2J3", group:"WEST-A", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"FC大阪", awayTeam:"讃岐",  homeScore:0, awayScore:1, status:"finished", stadium:"花園ラグビー場",             referenceNote:NOTE },
  { id:"wa-r1-imi-knz",    league:"J2J3", group:"WEST-A", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"今治",  awayTeam:"金沢",   homeScore:0, awayScore:0, pkHome:5, pkAway:3, status:"finished", stadium:"アシックス里山スタジアム",  referenceNote:NOTE },
  { id:"wa-r1-kch-tym",    league:"J2J3", group:"WEST-A", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"高知",  awayTeam:"富山",   homeScore:3, awayScore:1, status:"finished", stadium:"春野陸上競技場",             referenceNote:NOTE },
  // ── WEST-A 第2節 ──
  { id:"wa-r2-nra-imi",    league:"J2J3", group:"WEST-A", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"奈良",  awayTeam:"今治",   homeScore:1, awayScore:0, status:"finished", stadium:"ロートフィールド奈良",       referenceNote:NOTE },
  { id:"wa-r2-fco-kch",    league:"J2J3", group:"WEST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"FC大阪", awayTeam:"高知",  homeScore:2, awayScore:2, pkHome:5, pkAway:3, status:"finished", stadium:"花園ラグビー場",             referenceNote:NOTE },
  { id:"wa-r2-sns-tym",    league:"J2J3", group:"WEST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"讃岐",  awayTeam:"富山",   homeScore:1, awayScore:5, status:"finished", stadium:"Pikaraスタジアム",           referenceNote:NOTE },
  { id:"wa-r2-tks-nig",    league:"J2J3", group:"WEST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"徳島",  awayTeam:"新潟",   homeScore:0, awayScore:2, status:"finished", stadium:"鳴門・大塚スポーツパークポカリスエットスタジアム", referenceNote:NOTE },
  { id:"wa-r2-ehm-knz",    league:"J2J3", group:"WEST-A", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"愛媛",  awayTeam:"金沢",   homeScore:2, awayScore:2, pkHome:3, pkAway:4, status:"finished", stadium:"ニンジニアスタジアム",        referenceNote:NOTE },
  // ── WEST-A 第3節 ──
  { id:"wa-r3-nra-ehm",    league:"J2J3", group:"WEST-A", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"奈良",  awayTeam:"愛媛",   homeScore:2, awayScore:2, pkHome:4, pkAway:5, status:"finished", stadium:"ロートフィールド奈良",       referenceNote:NOTE },
  { id:"wa-r3-sns-nig",    league:"J2J3", group:"WEST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"讃岐",  awayTeam:"新潟",   homeScore:0, awayScore:3, status:"finished", stadium:"Pikaraスタジアム",           referenceNote:NOTE },
  { id:"wa-r3-tks-tym",    league:"J2J3", group:"WEST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"徳島",  awayTeam:"富山",   homeScore:2, awayScore:0, status:"finished", stadium:"鳴門・大塚スポーツパークポカリスエットスタジアム", referenceNote:NOTE },
  { id:"wa-r3-imi-fco",    league:"J2J3", group:"WEST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"今治",  awayTeam:"FC大阪", homeScore:2, awayScore:0, status:"finished", stadium:"アシックス里山スタジアム",  referenceNote:NOTE },
  { id:"wa-r3-kch-knz",    league:"J2J3", group:"WEST-A", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"高知",  awayTeam:"金沢",   homeScore:3, awayScore:2, status:"finished", stadium:"春野陸上競技場",             referenceNote:NOTE },
  // ── WEST-A 第4節 ──
  { id:"wa-r4-tym-fco",    league:"J2J3", group:"WEST-A", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"富山",  awayTeam:"FC大阪", homeScore:0, awayScore:0, pkHome:10, pkAway:9, status:"finished", stadium:"富山県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wa-r4-ehm-tks",    league:"J2J3", group:"WEST-A", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"愛媛",  awayTeam:"徳島",   homeScore:0, awayScore:1, status:"finished", stadium:"ニンジニアスタジアム",        referenceNote:NOTE },
  { id:"wa-r4-knz-sns",    league:"J2J3", group:"WEST-A", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"金沢",  awayTeam:"讃岐",   homeScore:1, awayScore:0, status:"finished", stadium:"石川県西部緑地公園陸上競技場", referenceNote:NOTE },
  { id:"wa-r4-imi-nig",    league:"J2J3", group:"WEST-A", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"今治",  awayTeam:"新潟",   homeScore:0, awayScore:2, status:"finished", stadium:"アシックス里山スタジアム",  referenceNote:NOTE },
  { id:"wa-r4-kch-nra",    league:"J2J3", group:"WEST-A", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"高知",  awayTeam:"奈良",   homeScore:2, awayScore:0, status:"finished", stadium:"春野陸上競技場",             referenceNote:NOTE },
  // ── WEST-A 第5節 ──
  { id:"wa-r5-fco-nra",    league:"J2J3", group:"WEST-A", round:5, date:"2026-03-06", kickoff:"19:00", homeTeam:"FC大阪", awayTeam:"奈良",  homeScore:2, awayScore:0, status:"finished", stadium:"花園ラグビー場",             referenceNote:NOTE },
  { id:"wa-r5-nig-kch",    league:"J2J3", group:"WEST-A", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"新潟",  awayTeam:"高知",   homeScore:2, awayScore:2, pkHome:3, pkAway:4, status:"finished", stadium:"デンカビッグスワンスタジアム", referenceNote:NOTE },
  { id:"wa-r5-tym-ehm",    league:"J2J3", group:"WEST-A", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"富山",  awayTeam:"愛媛",   homeScore:2, awayScore:2, pkHome:4, pkAway:3, status:"finished", stadium:"富山県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wa-r5-knz-tks",    league:"J2J3", group:"WEST-A", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"金沢",  awayTeam:"徳島",   homeScore:0, awayScore:4, status:"finished", stadium:"石川県西部緑地公園陸上競技場", referenceNote:NOTE },
  { id:"wa-r5-sns-imi",    league:"J2J3", group:"WEST-A", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"讃岐",  awayTeam:"今治",   homeScore:1, awayScore:0, status:"finished", stadium:"Pikaraスタジアム",           referenceNote:NOTE },
  // ── WEST-A 第7節 ──
  { id:"wa-r7-nig-tym",    league:"J2J3", group:"WEST-A", round:7, date:"2026-03-20", kickoff:"14:00", homeTeam:"新潟",  awayTeam:"富山",   homeScore:2, awayScore:1, status:"finished", stadium:"デンカビッグスワンスタジアム", referenceNote:NOTE },
  { id:"wa-r7-knz-fco",    league:"J2J3", group:"WEST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"金沢",  awayTeam:"FC大阪", homeScore:null, awayScore:null, status:"scheduled", stadium:"石川県西部緑地公園陸上競技場", referenceNote:NOTE },
  { id:"wa-r7-sns-nra",    league:"J2J3", group:"WEST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"讃岐",  awayTeam:"奈良",   homeScore:null, awayScore:null, status:"scheduled", stadium:"Pikaraスタジアム",           referenceNote:NOTE },
  { id:"wa-r7-ehm-kch",    league:"J2J3", group:"WEST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"愛媛",  awayTeam:"高知",   homeScore:null, awayScore:null, status:"scheduled", stadium:"ニンジニアスタジアム",        referenceNote:NOTE },
  { id:"wa-r7-imi-tks",    league:"J2J3", group:"WEST-A", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"今治",  awayTeam:"徳島",   homeScore:null, awayScore:null, status:"scheduled", stadium:"アシックス里山スタジアム",  referenceNote:NOTE },

  // ══════════════════════════════════════════
  // J2・J3百年構想リーグ WEST-B
  // ══════════════════════════════════════════
  // ── WEST-B 第1節 ──
  { id:"wb-r1-kksh-ttr",   league:"J2J3", group:"WEST-B", round:1, date:"2026-02-07", kickoff:"14:00", homeTeam:"北九州", awayTeam:"鳥取",  homeScore:1, awayScore:3, status:"finished", stadium:"ミクニワールドスタジアム北九州", referenceNote:NOTE },
  { id:"wb-r1-kum-ygt",    league:"J2J3", group:"WEST-B", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"熊本",  awayTeam:"山口",   homeScore:2, awayScore:1, status:"finished", stadium:"えがおスタジアム",            referenceNote:NOTE },
  { id:"wb-r1-kgsh-myz",   league:"J2J3", group:"WEST-B", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"鹿児島", awayTeam:"宮崎",  homeScore:2, awayScore:3, status:"finished", stadium:"白波スタジアム",              referenceNote:NOTE },
  { id:"wb-r1-ryu-trs",    league:"J2J3", group:"WEST-B", round:1, date:"2026-02-08", kickoff:"14:00", homeTeam:"琉球",  awayTeam:"鳥栖",   homeScore:2, awayScore:2, pkHome:4, pkAway:3, status:"finished", stadium:"沖縄県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wb-r1-obs-shg",    league:"J2J3", group:"WEST-B", round:1, date:"2026-02-25", kickoff:"14:00", homeTeam:"大分",  awayTeam:"滋賀",   homeScore:2, awayScore:0, status:"finished", stadium:"OBSスタジアム大分",           referenceNote:NOTE },
  // ── WEST-B 第2節 ──
  { id:"wb-r2-ygt-shg",    league:"J2J3", group:"WEST-B", round:2, date:"2026-02-14", kickoff:"14:00", homeTeam:"山口",  awayTeam:"滋賀",   homeScore:2, awayScore:1, status:"finished", stadium:"みらスタ",                    referenceNote:NOTE },
  { id:"wb-r2-trs-kum",    league:"J2J3", group:"WEST-B", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"鳥栖",  awayTeam:"熊本",   homeScore:1, awayScore:1, pkHome:4, pkAway:3, status:"finished", stadium:"駅前不動産スタジアム",       referenceNote:NOTE },
  { id:"wb-r2-obs-kksh",   league:"J2J3", group:"WEST-B", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"大分",  awayTeam:"北九州", homeScore:2, awayScore:0, status:"finished", stadium:"OBSスタジアム大分",           referenceNote:NOTE },
  { id:"wb-r2-myz-ttr",    league:"J2J3", group:"WEST-B", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"宮崎",  awayTeam:"鳥取",   homeScore:3, awayScore:1, status:"finished", stadium:"いちごスタジアム宮崎",        referenceNote:NOTE },
  { id:"wb-r2-kgsh-ryu",   league:"J2J3", group:"WEST-B", round:2, date:"2026-02-15", kickoff:"14:00", homeTeam:"鹿児島", awayTeam:"琉球",  homeScore:0, awayScore:1, status:"finished", stadium:"白波スタジアム",              referenceNote:NOTE },
  // ── WEST-B 第3節 ──
  { id:"wb-r3-myz-trs",    league:"J2J3", group:"WEST-B", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"宮崎",  awayTeam:"鳥栖",   homeScore:2, awayScore:1, status:"finished", stadium:"いちごスタジアム宮崎",        referenceNote:NOTE },
  { id:"wb-r3-ryu-shg",    league:"J2J3", group:"WEST-B", round:3, date:"2026-02-21", kickoff:"14:00", homeTeam:"琉球",  awayTeam:"滋賀",   homeScore:0, awayScore:0, pkHome:14, pkAway:13, status:"finished", stadium:"沖縄県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wb-r3-kum-kksh",   league:"J2J3", group:"WEST-B", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"熊本",  awayTeam:"北九州", homeScore:4, awayScore:1, status:"finished", stadium:"えがおスタジアム",            referenceNote:NOTE },
  { id:"wb-r3-obs-ttr",    league:"J2J3", group:"WEST-B", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"大分",  awayTeam:"鳥取",   homeScore:0, awayScore:2, status:"finished", stadium:"OBSスタジアム大分",           referenceNote:NOTE },
  { id:"wb-r3-kgsh-ygt",   league:"J2J3", group:"WEST-B", round:3, date:"2026-02-22", kickoff:"14:00", homeTeam:"鹿児島", awayTeam:"山口",  homeScore:1, awayScore:0, status:"finished", stadium:"白波スタジアム",              referenceNote:NOTE },
  // ── WEST-B 第4節 ──
  { id:"wb-r4-kksh-shg",   league:"J2J3", group:"WEST-B", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"北九州", awayTeam:"滋賀",  homeScore:1, awayScore:2, status:"finished", stadium:"ミクニワールドスタジアム北九州", referenceNote:NOTE },
  { id:"wb-r4-trs-kgsh",   league:"J2J3", group:"WEST-B", round:4, date:"2026-02-28", kickoff:"14:00", homeTeam:"鳥栖",  awayTeam:"鹿児島", homeScore:0, awayScore:1, status:"finished", stadium:"駅前不動産スタジアム",       referenceNote:NOTE },
  { id:"wb-r4-ryu-myz",    league:"J2J3", group:"WEST-B", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"琉球",  awayTeam:"宮崎",   homeScore:0, awayScore:2, status:"finished", stadium:"沖縄県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wb-r4-ygt-ttr",    league:"J2J3", group:"WEST-B", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"山口",  awayTeam:"鳥取",   homeScore:0, awayScore:0, pkHome:3, pkAway:5, status:"finished", stadium:"みらスタ",                    referenceNote:NOTE },
  { id:"wb-r4-kum-obs",    league:"J2J3", group:"WEST-B", round:4, date:"2026-03-01", kickoff:"14:00", homeTeam:"熊本",  awayTeam:"大分",   homeScore:3, awayScore:1, status:"finished", stadium:"えがおスタジアム",            referenceNote:NOTE },
  // ── WEST-B 第5節 ──
  { id:"wb-r5-ygt-trs",    league:"J2J3", group:"WEST-B", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"山口",  awayTeam:"鳥栖",   homeScore:2, awayScore:0, status:"finished", stadium:"みらスタ",                    referenceNote:NOTE },
  { id:"wb-r5-kksh-myz",   league:"J2J3", group:"WEST-B", round:5, date:"2026-03-07", kickoff:"14:00", homeTeam:"北九州", awayTeam:"宮崎",  homeScore:0, awayScore:2, status:"finished", stadium:"ミクニワールドスタジアム北九州", referenceNote:NOTE },
  { id:"wb-r5-shg-kum",    league:"J2J3", group:"WEST-B", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"滋賀",  awayTeam:"熊本",   homeScore:1, awayScore:0, status:"finished", stadium:"ハトスタ",                    referenceNote:NOTE },
  { id:"wb-r5-ttr-ryu",    league:"J2J3", group:"WEST-B", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"鳥取",  awayTeam:"琉球",   homeScore:0, awayScore:0, pkHome:7, pkAway:6, status:"finished", stadium:"Axis Bird Stadium",          referenceNote:NOTE },
  { id:"wb-r5-obs-kgsh",   league:"J2J3", group:"WEST-B", round:5, date:"2026-03-08", kickoff:"14:00", homeTeam:"大分",  awayTeam:"鹿児島", homeScore:0, awayScore:0, pkHome:5, pkAway:4, status:"finished", stadium:"OBSスタジアム大分",           referenceNote:NOTE },
  // ── WEST-B 第6節 ──
  { id:"wb-r6-trs-kksh",   league:"J2J3", group:"WEST-B", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"鳥栖",  awayTeam:"北九州", homeScore:2, awayScore:1, status:"finished", stadium:"駅前不動産スタジアム",       referenceNote:NOTE },
  { id:"wb-r6-myz-obs",    league:"J2J3", group:"WEST-B", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"宮崎",  awayTeam:"大分",   homeScore:1, awayScore:0, status:"finished", stadium:"いちごスタジアム宮崎",        referenceNote:NOTE },
  { id:"wb-r6-ryu-ygt",    league:"J2J3", group:"WEST-B", round:6, date:"2026-03-14", kickoff:"14:00", homeTeam:"琉球",  awayTeam:"山口",   homeScore:1, awayScore:1, pkHome:4, pkAway:5, status:"finished", stadium:"沖縄県総合運動公園陸上競技場", referenceNote:NOTE },
  { id:"wb-r6-kum-ttr",    league:"J2J3", group:"WEST-B", round:6, date:"2026-03-15", kickoff:"14:00", homeTeam:"熊本",  awayTeam:"鳥取",   homeScore:0, awayScore:1, status:"finished", stadium:"えがおスタジアム",            referenceNote:NOTE },
  { id:"wb-r6-kgsh-shg",   league:"J2J3", group:"WEST-B", round:6, date:"2026-03-15", kickoff:"14:00", homeTeam:"鹿児島", awayTeam:"滋賀",  homeScore:1, awayScore:0, status:"finished", stadium:"白波スタジアム",              referenceNote:NOTE },
  // ── WEST-B 第7節 ──
  { id:"wb-r7-obs-ryu",    league:"J2J3", group:"WEST-B", round:7, date:"2026-03-21", kickoff:"14:00", homeTeam:"大分",  awayTeam:"琉球",   homeScore:2, awayScore:3, status:"finished", stadium:"OBSスタジアム大分",           referenceNote:NOTE },
  { id:"wb-r7-myz-kum",    league:"J2J3", group:"WEST-B", round:7, date:"2026-03-21", kickoff:"14:00", homeTeam:"宮崎",  awayTeam:"熊本",   homeScore:1, awayScore:0, status:"finished", stadium:"いちごスタジアム宮崎",        referenceNote:NOTE },
  { id:"wb-r7-ttr-kgsh",   league:"J2J3", group:"WEST-B", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"鳥取",  awayTeam:"鹿児島", homeScore:null, awayScore:null, status:"scheduled", stadium:"Axis Bird Stadium",          referenceNote:NOTE },
  { id:"wb-r7-ygt-kksh",   league:"J2J3", group:"WEST-B", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"山口",  awayTeam:"北九州", homeScore:null, awayScore:null, status:"scheduled", stadium:"みらスタ",                    referenceNote:NOTE },
  { id:"wb-r7-shg-trs",    league:"J2J3", group:"WEST-B", round:7, date:"2026-03-22", kickoff:"14:00", homeTeam:"滋賀",  awayTeam:"鳥栖",   homeScore:null, awayScore:null, status:"scheduled", stadium:"ハトスタ",                    referenceNote:NOTE },
];

// ── ヘルパー関数 ──

export function getMatchesByRound(round: number, group?: string): JMatchSimple[] {
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
  } else if (m.pkWinner) {
    const winner = m.pkWinner === "home" ? m.homeTeam : m.awayTeam;
    s += ` (PK ${winner})`;
  }
  return s;
}

export function getMatchById(id: string): JMatchSimple | undefined {
  return jMatches.find((m) => m.id === id);
}

export function getAllMatchIds(): string[] {
  return jMatches.map((m) => m.id);
}

export type MatchResult = "W" | "L" | "D" | "PK+" | "PK-";

export function getTeamResult(m: JMatchSimple, team: string): MatchResult | null {
  if (m.status !== "finished" || m.homeScore === null || m.awayScore === null) return null;
  const isHome = m.homeTeam === team;
  const myScore = isHome ? m.homeScore : m.awayScore;
  const oppScore = isHome ? m.awayScore : m.homeScore;
  if (myScore > oppScore) return "W";
  if (myScore < oppScore) return "L";
  // Draw — check PK
  if (m.pkHome !== undefined && m.pkAway !== undefined) {
    const pkMy = isHome ? m.pkHome : m.pkAway;
    const pkOpp = isHome ? m.pkAway : m.pkHome;
    return pkMy > pkOpp ? "PK+" : "PK-";
  }
  if (m.pkWinner) {
    return (m.pkWinner === "home") === isHome ? "PK+" : "PK-";
  }
  return "D";
}

export type RecentFormEntry = {
  matchId: string;
  result: MatchResult;
  opponent: string;
  score: string;
  date: string;
};

export function getRecentForm(team: string, beforeMatchId: string, count: number = 5): RecentFormEntry[] {
  const matchIndex = jMatches.findIndex((m) => m.id === beforeMatchId);
  const teamMatches = jMatches
    .filter((m, i) => {
      if (i >= matchIndex && matchIndex >= 0) return false;
      return (m.homeTeam === team || m.awayTeam === team) && m.status === "finished" && m.homeScore !== null && m.awayScore !== null;
    })
    .reverse(); // most recent first
  return teamMatches.slice(0, count).map((m) => {
    const isHome = m.homeTeam === team;
    const opponent = isHome ? m.awayTeam : m.homeTeam;
    return {
      matchId: m.id,
      result: getTeamResult(m, team)!,
      opponent,
      score: getScoreDisplay(m),
      date: m.date,
    };
  });
}
