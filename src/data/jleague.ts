// ─── 型定義 ─────────────────────────────

export type JGoal = {
  minute: number;
  playerName: string;
  assistName?: string;
  teamSide: "home" | "away";
  isPenalty?: boolean;
  isOwn?: boolean;
};

export type JCard = {
  minute: number;
  playerName: string;
  teamSide: "home" | "away";
  type: "yellow" | "red";
};

export type JSubstitution = {
  minute: number;
  teamSide: "home" | "away";
  playerIn: string;
  playerOut: string;
};

export type JPlayer = {
  number: number;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  isCaptain?: boolean;
};

export type JFormation = {
  shape: string;
  players: JPlayer[];
};

export type JStats = {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  offsides?: [number, number];
  passes?: [number, number];
  passAccuracy?: [number, number];
};

export type JTimelineEvent = {
  minute: number;
  type: "goal" | "card" | "sub" | "note";
  teamSide?: "home" | "away" | "neutral";
  text: string;
};

export type JMatch = {
  id: string;
  league: "J1" | "J2" | "J3";
  round: number;
  date: string;
  kickoff: string;
  stadium: string;
  attendance?: number;
  status: "scheduled" | "live" | "finished";

  homeTeam: {
    id: string;
    name: string;
    shortName: string;
    color: string;
    emblemEmoji?: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortName: string;
    color: string;
    emblemEmoji?: string;
  };

  homeScore: number;
  awayScore: number;
  htHomeScore?: number;
  htAwayScore?: number;

  goals?: JGoal[];
  cards?: JCard[];
  substitutions?: JSubstitution[];
  homeFormation?: JFormation;
  awayFormation?: JFormation;
  stats?: JStats;
  timeline?: JTimelineEvent[];

  officialUrl?: string;
  referenceNote: string;
};

// ─── サンプルデータ（第7節 横浜FM vs 浦和） ───

export const jMatches: JMatch[] = [
  {
    id: "2025-j1-r7-ymfm-urawa",
    league: "J1",
    round: 7,
    date: "2025-04-05",
    kickoff: "15:00",
    stadium: "日産スタジアム",
    attendance: 38481,
    status: "finished",
    homeTeam: {
      id: "yokohama-fm",
      name: "横浜F・マリノス",
      shortName: "横浜FM",
      color: "#003087",
      emblemEmoji: "🔵",
    },
    awayTeam: {
      id: "urawa",
      name: "浦和レッズ",
      shortName: "浦和",
      color: "#E8192C",
      emblemEmoji: "🔴",
    },
    homeScore: 2,
    awayScore: 1,
    htHomeScore: 1,
    htAwayScore: 0,
    goals: [
      { minute: 23, playerName: "アンデルソン・ロペス", assistName: "水沼宏太", teamSide: "home" },
      { minute: 51, playerName: "チアゴ・サンタナ", assistName: "小泉佳穂", teamSide: "away" },
      { minute: 78, playerName: "西村拓真", assistName: "天野純", teamSide: "home" },
    ],
    cards: [
      { minute: 34, playerName: "岩尾憲", teamSide: "away", type: "yellow" },
      { minute: 67, playerName: "エドゥアルド", teamSide: "home", type: "yellow" },
      { minute: 82, playerName: "ショルツ", teamSide: "away", type: "yellow" },
    ],
    homeFormation: {
      shape: "4-3-3",
      players: [
        { number: 21, name: "一森純", position: "GK" },
        { number: 22, name: "松原健", position: "DF" },
        { number: 4, name: "上島拓巳", position: "DF" },
        { number: 5, name: "エドゥアルド", position: "DF" },
        { number: 15, name: "永戸勝也", position: "DF" },
        { number: 8, name: "天野純", position: "MF", isCaptain: true },
        { number: 17, name: "渡辺皓太", position: "MF" },
        { number: 14, name: "山根陸", position: "MF" },
        { number: 23, name: "水沼宏太", position: "FW" },
        { number: 9, name: "A.ロペス", position: "FW" },
        { number: 18, name: "西村拓真", position: "FW" },
      ],
    },
    awayFormation: {
      shape: "4-2-3-1",
      players: [
        { number: 1, name: "西川周作", position: "GK" },
        { number: 2, name: "酒井宏樹", position: "DF" },
        { number: 4, name: "ショルツ", position: "DF", isCaptain: true },
        { number: 5, name: "マリウス", position: "DF" },
        { number: 3, name: "明本考浩", position: "DF" },
        { number: 10, name: "小泉佳穂", position: "MF" },
        { number: 6, name: "岩尾憲", position: "MF" },
        { number: 14, name: "関根貴大", position: "MF" },
        { number: 7, name: "中島翔哉", position: "MF" },
        { number: 8, name: "大久保智明", position: "MF" },
        { number: 9, name: "チアゴ・サンタナ", position: "FW" },
      ],
    },
    stats: {
      possession: [58, 42],
      shots: [15, 8],
      shotsOnTarget: [6, 2],
      corners: [8, 10],
      fouls: [11, 14],
      yellowCards: [1, 2],
      redCards: [0, 0],
      passes: [521, 378],
      passAccuracy: [87, 79],
    },
    timeline: [
      { minute: 1, type: "note", teamSide: "neutral", text: "横浜FMがキックオフ。序盤から積極的なプレッシング" },
      { minute: 23, type: "goal", teamSide: "home", text: "A.ロペスのヘッドで横浜FM先制！水沼のクロスから" },
      { minute: 34, type: "card", teamSide: "away", text: "岩尾にイエローカード" },
      { minute: 45, type: "note", teamSide: "neutral", text: "前半終了。横浜FM 1-0 浦和" },
      { minute: 51, type: "goal", teamSide: "away", text: "後半開始直後！サンタナが冷静に同点弾。1-1" },
      { minute: 67, type: "card", teamSide: "home", text: "エドゥアルドにイエローカード" },
      { minute: 78, type: "goal", teamSide: "home", text: "天野FKから西村が勝ち越し！横浜FM 2-1に" },
      { minute: 82, type: "card", teamSide: "away", text: "ショルツにイエローカード" },
      { minute: 95, type: "note", teamSide: "neutral", text: "試合終了。横浜FM 2-1 浦和レッズ。横浜FM連勝" },
    ],
    officialUrl: "https://www.jleague.jp/match/",
    referenceNote: "出典: Jリーグ公式サイト（jleague.jp / data.j-league.or.jp）",
  },
];

// ─── ヘルパー関数 ───

export function getJMatchById(id: string): JMatch | undefined {
  return jMatches.find((m) => m.id === id);
}

export function getJMatchesByRound(round: number): JMatch[] {
  return jMatches.filter((m) => m.round === round);
}

export function getLatestRound(): number {
  const finished = jMatches.filter((m) => m.status === "finished");
  if (finished.length === 0) return 1;
  return Math.max(...finished.map((m) => m.round));
}
