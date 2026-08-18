// ── 2026/27 Jリーグ レギュラーシーズン 試合詳細データ ──
// ソース: Jリーグ公式、Yahoo スポーツナビ、Football LAB、日経新聞、サッカーキング

export type MatchPlayer = {
  number: number;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  isCaptain?: boolean;
  subOut?: number;
  subIn?: number;
  replacedPlayer?: string;
};

export type MatchGoal = {
  minute: number;
  playerName: string;
  assistName?: string;
  teamSide: "home" | "away";
  isPenalty?: boolean;
  isOwnGoal?: boolean;
};

export type MatchCard = {
  minute: number;
  playerName: string;
  teamSide: "home" | "away";
  type: "yellow" | "red";
};

export type MatchStats = {
  possession?: [number, number];
  shots?: [number, number];
  shotsOnTarget?: [number, number];
  corners?: [number, number];
  fouls?: [number, number];
  offsides?: [number, number];
  passes?: [number, number];
  passAccuracy?: [number, number];
};

export type MatchLineup = {
  formation: string;
  starters: MatchPlayer[];
  subs: MatchPlayer[];
};

export type MatchDetail = {
  matchId: string;
  date: string;
  home: string;
  away: string;
  score: { home: number; away: number };
  stadium: string;
  kickoff: string;
  category: string;
  matchday: string;
  attendance?: number;
  goals: MatchGoal[];
  cards: MatchCard[];
  stats?: MatchStats;
  homeLineup?: MatchLineup;
  awayLineup?: MatchLineup;
};

export function generateMatchId(date: string, home: string): string {
  const d = date.replace(/-/g, "");
  const teamMap: Record<string, string> = {
    "東京V": "tokyov", "柏": "kashiwa", "鹿島": "kashima", "名古屋": "nagoya",
    "水戸": "mito", "G大阪": "gosaka", "清水": "shimizu", "横浜FM": "yokohamafm",
    "岡山": "okayama", "長崎": "nagasaki", "浦和": "urawa", "広島": "hiroshima",
    "千葉": "chiba", "町田": "machida", "川崎F": "kawasaki", "京都": "kyoto",
    "神戸": "kobe", "FC東京": "fctokyo", "福岡": "fukuoka", "C大阪": "cosaka",
    "秋田": "akita", "富山": "toyama", "栃木C": "tochigiC", "八戸": "hachinohe",
    "藤枝": "fujieda", "いわき": "iwaki", "仙台": "sendai", "大分": "oita",
    "湘南": "shonan", "山形": "yamagata", "甲府": "kofu", "宮崎": "miyazaki",
    "新潟": "niigata", "札幌": "sapporo", "今治": "imabari", "大宮": "omiya",
    "横浜FC": "yokohamafc", "磐田": "iwata", "徳島": "tokushima", "鳥栖": "tosu",
    "岐阜": "gifu", "高知": "kochi", "北九州": "kitakyushu", "讃岐": "sanuki",
    "群馬": "gunma", "相模原": "sagamihara", "山口": "yamaguchi", "琉球": "ryukyu",
    "熊本": "kumamoto", "栃木SC": "tochigiSC", "金沢": "kanazawa", "福島": "fukushima",
    "FC大阪": "fcosaka", "長野": "nagano", "奈良": "nara", "鹿児島": "kagoshima",
    "松本": "matsumoto", "滋賀": "shiga", "愛媛": "ehime", "鳥取": "tottori",
  };
  const t = teamMap[home] || home.toLowerCase().replace(/\s+/g, "");
  return `${d}-${t}`;
}

const NOTE = "データ出典: Jリーグ公式、Yahoo スポーツナビ、Football LAB";

// ══════════════════════════════════════════
// J1 第2節 (8/14-8/15)
// ══════════════════════════════════════════

export const matchDetails: MatchDetail[] = [

  // ── 8/14 東京V 1-3 柏 ──
  {
    matchId: "20260814-tokyov",
    date: "2026-08-14",
    home: "東京V", away: "柏",
    score: { home: 1, away: 3 },
    stadium: "MUFGスタジアム(国立)",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 2, playerName: "林 尚輝", teamSide: "home" },
      { minute: 11, playerName: "遠藤 渓太", teamSide: "away" },
      { minute: 65, playerName: "瀬川 祐輔", teamSide: "away" },
      { minute: 82, playerName: "久保 藤次郎", teamSide: "away" },
    ],
    cards: [],
    homeLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 1, name: "マテウス", position: "GK" },
        { number: 4, name: "林 尚輝", position: "DF" },
        { number: 6, name: "宮原 和也", position: "DF" },
        { number: 15, name: "鈴木 海音", position: "DF" },
        { number: 16, name: "平川 怜", position: "MF", subOut: 55 },
        { number: 18, name: "溝口 修平", position: "MF" },
        { number: 20, name: "食野 壮磨", position: "MF", subOut: 73 },
        { number: 22, name: "内田 陽介", position: "MF", subOut: 79 },
        { number: 7, name: "松橋 優安", position: "FW", subOut: 55 },
        { number: 9, name: "染野 唯月", position: "FW" },
        { number: 14, name: "福田 湧矢", position: "FW", subOut: 73 },
      ],
      subs: [
        { number: 31, name: "長沢 祐弥", position: "GK" },
        { number: 3, name: "井上 竜太", position: "DF" },
        { number: 5, name: "松田 陸", position: "DF" },
        { number: 8, name: "仲山 獅恩", position: "MF", subIn: 73, replacedPlayer: "福田 湧矢" },
        { number: 10, name: "山本 丈偉", position: "MF" },
        { number: 11, name: "新井 悠太", position: "MF", subIn: 55, replacedPlayer: "松橋 優安" },
        { number: 17, name: "熊取谷 一星", position: "FW", subIn: 55, replacedPlayer: "平川 怜" },
        { number: 19, name: "白井 亮丞", position: "FW", subIn: 79, replacedPlayer: "内田 陽介" },
        { number: 23, name: "神田 奏真", position: "FW", subIn: 73, replacedPlayer: "食野 壮磨" },
      ],
    },
    awayLineup: {
      formation: "4-4-2",
      starters: [
        { number: 25, name: "小島 亨介", position: "GK" },
        { number: 4, name: "古賀 太陽", position: "DF" },
        { number: 24, name: "久保 藤次郎", position: "DF", subOut: 84 },
        { number: 26, name: "杉岡 大暉", position: "DF" },
        { number: 42, name: "原田 亘", position: "DF" },
        { number: 5, name: "遠藤 渓太", position: "MF", subOut: 79 },
        { number: 8, name: "小泉 佳穂", position: "MF", subOut: 79 },
        { number: 27, name: "熊坂 光希", position: "MF" },
        { number: 39, name: "中川 敦瑛", position: "MF" },
        { number: 18, name: "垣田 裕暉", position: "FW", subOut: 56 },
        { number: 87, name: "山内 日向汰", position: "FW", subOut: 56 },
      ],
      subs: [
        { number: 1, name: "永井 堅梧", position: "GK" },
        { number: 3, name: "三丸 拡", position: "DF" },
        { number: 15, name: "馬場 晴也", position: "DF", subIn: 84, replacedPlayer: "久保 藤次郎" },
        { number: 7, name: "渡井 理己", position: "MF", subIn: 56, replacedPlayer: "山内 日向汰" },
        { number: 10, name: "仲間 隼斗", position: "MF", subIn: 79, replacedPlayer: "小泉 佳穂" },
        { number: 11, name: "瀬川 祐輔", position: "MF", subIn: 56, replacedPlayer: "垣田 裕暉" },
        { number: 14, name: "原川 力", position: "MF" },
        { number: 19, name: "弓場 堅真", position: "MF", subIn: 79, replacedPlayer: "遠藤 渓太" },
        { number: 9, name: "細谷 真大", position: "FW" },
      ],
    },
  },

  // ── 8/15 鹿島 2-1 名古屋 ──
  {
    matchId: "20260815-kashima",
    date: "2026-08-15",
    home: "鹿島", away: "名古屋",
    score: { home: 2, away: 1 },
    stadium: "メルカリスタジアム",
    kickoff: "18:00",
    category: "J1",
    matchday: "第2節",
    attendance: 33560,
    goals: [
      { minute: 22, playerName: "レオ セアラ", teamSide: "home" },
      { minute: 45, playerName: "原 輝綺", teamSide: "away" },
      { minute: 53, playerName: "関川 郁万", teamSide: "home" },
    ],
    cards: [],
    stats: {
      possession: [47, 53],
      shots: [17, 13],
    },
    homeLineup: {
      formation: "4-4-2",
      starters: [
        { number: 1, name: "早川 友基", position: "GK" },
        { number: 5, name: "関川 郁万", position: "DF" },
        { number: 7, name: "小川 諒也", position: "DF" },
        { number: 37, name: "広瀬 陸斗", position: "DF" },
        { number: 55, name: "植田 直通", position: "DF" },
        { number: 6, name: "三竿 健斗", position: "MF" },
        { number: 8, name: "マテウス ブエノ", position: "MF" },
        { number: 18, name: "ヤン マテウス", position: "MF" },
        { number: 30, name: "吉田 南", position: "MF" },
        { number: 9, name: "レオ セアラ", position: "FW" },
        { number: 40, name: "鈴木 優磨", position: "FW", isCaptain: true },
      ],
      subs: [],
    },
    awayLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 35, name: "アレックス ピサーノ", position: "GK" },
        { number: 2, name: "野上 結貴", position: "DF" },
        { number: 70, name: "原 輝綺", position: "DF" },
        { number: 13, name: "藤井 裕也", position: "DF" },
        { number: 7, name: "泉 柊椰", position: "MF" },
        { number: 15, name: "稲垣 祥", position: "MF" },
        { number: 27, name: "中山 克広", position: "MF" },
        { number: 31, name: "高嶺 朋樹", position: "MF" },
        { number: 11, name: "山岸 裕也", position: "FW" },
        { number: 17, name: "内田 拓也", position: "FW" },
        { number: 22, name: "木村 勇大", position: "FW" },
      ],
      subs: [],
    },
  },

  // ── 8/15 水戸 1-1 G大阪 ──
  {
    matchId: "20260815-mito",
    date: "2026-08-15",
    home: "水戸", away: "G大阪",
    score: { home: 1, away: 1 },
    stadium: "水戸信用金庫スタジアム",
    kickoff: "18:00",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 18, playerName: "鳥海 芳樹", assistName: "加藤 千尋", teamSide: "home" },
      { minute: 74, playerName: "中谷 進之介", teamSide: "away" },
    ],
    cards: [],
    homeLineup: {
      formation: "4-4-2",
      starters: [
        { number: 34, name: "西川 幸之介", position: "GK" },
        { number: 7, name: "大森 渚生", position: "DF" },
        { number: 15, name: "木本 恭生", position: "DF", subOut: 58 },
        { number: 17, name: "板倉 健太", position: "DF" },
        { number: 25, name: "真瀬 拓海", position: "DF" },
        { number: 11, name: "鳥海 芳樹", position: "MF", subOut: 45 },
        { number: 19, name: "仙波 大志", position: "MF" },
        { number: 20, name: "舩橋 佑", position: "MF", subOut: 81 },
        { number: 22, name: "谷口 海斗", position: "MF" },
        { number: 10, name: "渡邉 新太", position: "FW" },
        { number: 18, name: "内野 航太郎", position: "FW" },
      ],
      subs: [
        { number: 6, name: "加藤 千尋", position: "MF", subIn: 45, replacedPlayer: "鳥海 芳樹" },
        { number: 3, name: "河面 旺成", position: "DF", subIn: 58, replacedPlayer: "木本 恭生" },
        { number: 28, name: "マテウスレイリア", position: "MF", subIn: 81, replacedPlayer: "舩橋 佑" },
      ],
    },
    awayLineup: {
      formation: "4-2-3-1",
      starters: [
        { number: 18, name: "荒木 琉偉", position: "GK" },
        { number: 4, name: "中谷 進之介", position: "DF" },
        { number: 15, name: "岸本 武流", position: "DF" },
        { number: 19, name: "池谷 銀姿郎", position: "DF", subOut: 45 },
        { number: 21, name: "初瀬 亮", position: "DF" },
        { number: 13, name: "安部 柊斗", position: "MF" },
        { number: 27, name: "美藤 倫", position: "MF", subOut: 69 },
        { number: 7, name: "宇佐美 貴史", position: "FW", subOut: 56 },
        { number: 14, name: "植中 朝日", position: "FW" },
        { number: 17, name: "山下 諒也", position: "FW" },
        { number: 38, name: "名和田 我空", position: "FW" },
      ],
      subs: [
        { number: 22, name: "佐々木 翔悟", position: "DF", subIn: 45, replacedPlayer: "池谷 銀姿郎" },
        { number: 29, name: "デニス ヒュメット", position: "MF", subIn: 56, replacedPlayer: "宇佐美 貴史" },
        { number: 33, name: "イーライ アダムス", position: "MF", subIn: 69, replacedPlayer: "美藤 倫" },
      ],
    },
  },

  // ── 8/15 清水 0-1 横浜FM ──
  {
    matchId: "20260815-shimizu",
    date: "2026-08-15",
    home: "清水", away: "横浜FM",
    score: { home: 0, away: 1 },
    stadium: "IAIスタジアム日本平",
    kickoff: "18:30",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 79, playerName: "井上 大輔", teamSide: "away" },
    ],
    cards: [],
    homeLineup: {
      formation: "4-1-2-3",
      starters: [
        { number: 1, name: "梅田 透吾", position: "GK" },
        { number: 3, name: "パク スンウク", position: "DF" },
        { number: 4, name: "本田 悠紀", position: "DF" },
        { number: 5, name: "巣部 広大", position: "DF" },
        { number: 22, name: "マテウス ブルネッティ", position: "DF" },
        { number: 6, name: "ディエギーニョ", position: "MF" },
        { number: 8, name: "ジャーメイン 良", position: "MF" },
        { number: 10, name: "嶋本 悠太", position: "MF" },
        { number: 9, name: "北川 航也", position: "FW" },
        { number: 11, name: "木下 康介", position: "FW" },
        { number: 14, name: "藤井 智也", position: "FW" },
      ],
      subs: [],
    },
    awayLineup: {
      formation: "4-2-3-1",
      starters: [
        { number: 1, name: "ルーベン ブランコ", position: "GK" },
        { number: 2, name: "井上 大輔", position: "DF" },
        { number: 4, name: "ジェイソン キニョネス", position: "DF" },
        { number: 5, name: "角田 涼太朗", position: "DF" },
        { number: 24, name: "諏訪間 幸成", position: "DF" },
        { number: 8, name: "知念 慶", position: "MF" },
        { number: 10, name: "天野 純", position: "MF" },
        { number: 14, name: "松村 晃助", position: "MF" },
        { number: 11, name: "谷村 海那", position: "FW" },
        { number: 18, name: "近藤 友喜", position: "FW" },
        { number: 20, name: "三井 誠", position: "FW" },
      ],
      subs: [],
    },
  },

  // ── 8/15 岡山 1-0 長崎 ──
  {
    matchId: "20260815-okayama",
    date: "2026-08-15",
    home: "岡山", away: "長崎",
    score: { home: 1, away: 0 },
    stadium: "JFE晴れの国スタジアム",
    kickoff: "18:55",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 49, playerName: "ルカオ", teamSide: "home" },
    ],
    cards: [],
  },

  // ── 8/15 浦和 1-4 広島 ──
  {
    matchId: "20260815-urawa",
    date: "2026-08-15",
    home: "浦和", away: "広島",
    score: { home: 1, away: 4 },
    stadium: "埼玉スタジアム2002",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    attendance: 48707,
    goals: [
      { minute: 16, playerName: "荒木 隼人", teamSide: "away" },
      { minute: 22, playerName: "荒木 隼人", teamSide: "away", isOwnGoal: true },
      { minute: 47, playerName: "塩谷 司", teamSide: "away" },
      { minute: 61, playerName: "セバスティアン アレオ", teamSide: "away" },
    ],
    cards: [],
    stats: {
      possession: [54, 46],
      shots: [3, 25],
      shotsOnTarget: [1, 7],
    },
  },

  // ── 8/15 千葉 0-4 町田 ──
  {
    matchId: "20260815-chiba",
    date: "2026-08-15",
    home: "千葉", away: "町田",
    score: { home: 0, away: 4 },
    stadium: "フクダ電子アリーナ",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 18, playerName: "中山 雄太", teamSide: "away" },
      { minute: 34, playerName: "テテ イェンギ", teamSide: "away" },
      { minute: 75, playerName: "西村 拓真", teamSide: "away" },
      { minute: 82, playerName: "中村 帆高", teamSide: "away" },
    ],
    cards: [],
  },

  // ── 8/15 川崎F 2-2 京都 ──
  {
    matchId: "20260815-kawasaki",
    date: "2026-08-15",
    home: "川崎F", away: "京都",
    score: { home: 2, away: 2 },
    stadium: "Uvanceとどろきスタジアム by Fujitsu",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 45, playerName: "ラザル ロマニッチ", teamSide: "home" },
      { minute: 54, playerName: "福田 心之助", teamSide: "away" },
      { minute: 58, playerName: "ラファエル エリアス", teamSide: "away" },
      { minute: 62, playerName: "マルシーニョ", teamSide: "home" },
    ],
    cards: [],
  },

  // ── 8/15 神戸 2-2 FC東京 ──
  {
    matchId: "20260815-kobe",
    date: "2026-08-15",
    home: "神戸", away: "FC東京",
    score: { home: 2, away: 2 },
    stadium: "ノエビアスタジアム神戸",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    attendance: 26335,
    goals: [
      { minute: 35, playerName: "長倉 幹樹", teamSide: "away" },
      { minute: 40, playerName: "大迫 勇也", teamSide: "home" },
      { minute: 67, playerName: "長倉 幹樹", teamSide: "away" },
      { minute: 90, playerName: "武藤 嘉紀", teamSide: "home" },
    ],
    cards: [],
    stats: {
      possession: [55, 43],
      shots: [12, 15],
    },
  },

  // ── 8/15 福岡 3-0 C大阪 ──
  {
    matchId: "20260815-fukuoka",
    date: "2026-08-15",
    home: "福岡", away: "C大阪",
    score: { home: 3, away: 0 },
    stadium: "ベスト電器スタジアム",
    kickoff: "19:00",
    category: "J1",
    matchday: "第2節",
    goals: [
      { minute: 35, playerName: "藤本 一輝", teamSide: "home" },
      { minute: 43, playerName: "辻岡 佑真", teamSide: "home" },
      { minute: 73, playerName: "ウェリック ポポ", teamSide: "home" },
    ],
    cards: [],
  },

  // ══════════════════════════════════════════
  // J2 第2節 (8/15-8/16)
  // ══════════════════════════════════════════

  // ── 8/15 秋田 0-4 富山 ──
  {
    matchId: "20260815-akita",
    date: "2026-08-15",
    home: "秋田", away: "富山",
    score: { home: 0, away: 4 },
    stadium: "ソユースタジアム",
    kickoff: "18:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 栃木C 5-0 八戸 ──
  {
    matchId: "20260815-tochigiC",
    date: "2026-08-15",
    home: "栃木C", away: "八戸",
    score: { home: 5, away: 0 },
    stadium: "カンセキスタジアムとちぎ",
    kickoff: "18:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 藤枝 3-1 いわき ──
  {
    matchId: "20260815-fujieda",
    date: "2026-08-15",
    home: "藤枝", away: "いわき",
    score: { home: 3, away: 1 },
    stadium: "藤枝総合運動公園サッカー場",
    kickoff: "18:30",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 仙台 0-0 大分 ──
  {
    matchId: "20260815-sendai",
    date: "2026-08-15",
    home: "仙台", away: "大分",
    score: { home: 0, away: 0 },
    stadium: "ユアテックスタジアム仙台",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 湘南 1-0 山形 ──
  {
    matchId: "20260815-shonan",
    date: "2026-08-15",
    home: "湘南", away: "山形",
    score: { home: 1, away: 0 },
    stadium: "レモンガススタジアム平塚",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 甲府 1-1 宮崎 ──
  {
    matchId: "20260815-kofu",
    date: "2026-08-15",
    home: "甲府", away: "宮崎",
    score: { home: 1, away: 1 },
    stadium: "JITリサイクルインクスタジアム",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 新潟 2-1 札幌 ──
  {
    matchId: "20260815-niigata",
    date: "2026-08-15",
    home: "新潟", away: "札幌",
    score: { home: 2, away: 1 },
    stadium: "デンカビッグスワンスタジアム",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 今治 2-3 大宮 ──
  {
    matchId: "20260815-imabari",
    date: "2026-08-15",
    home: "今治", away: "大宮",
    score: { home: 2, away: 3 },
    stadium: "アシックス里山スタジアム",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 横浜FC 3-1 磐田 ──
  {
    matchId: "20260816-yokohamafc",
    date: "2026-08-16",
    home: "横浜FC", away: "磐田",
    score: { home: 3, away: 1 },
    stadium: "MUFGスタジアム(国立)",
    kickoff: "18:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 徳島 0-0 鳥栖 ──
  {
    matchId: "20260816-tokushima",
    date: "2026-08-16",
    home: "徳島", away: "鳥栖",
    score: { home: 0, away: 0 },
    stadium: "鳴門・大塚スポーツパーク",
    kickoff: "19:00",
    category: "J2",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ══════════════════════════════════════════
  // J3 第2節 (8/15-8/16)
  // ══════════════════════════════════════════

  // ── 8/15 岐阜 7-0 高知 ──
  {
    matchId: "20260815-gifu",
    date: "2026-08-15",
    home: "岐阜", away: "高知",
    score: { home: 7, away: 0 },
    stadium: "ひまわりスタジアム",
    kickoff: "18:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 北九州 0-0 讃岐 ──
  {
    matchId: "20260815-kitakyushu",
    date: "2026-08-15",
    home: "北九州", away: "讃岐",
    score: { home: 0, away: 0 },
    stadium: "ミクニワールドスタジアム北九州",
    kickoff: "18:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 群馬 1-4 相模原 ──
  {
    matchId: "20260815-gunma",
    date: "2026-08-15",
    home: "群馬", away: "相模原",
    score: { home: 1, away: 4 },
    stadium: "正田醤油スタジアム群馬",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 山口 1-0 琉球 ──
  {
    matchId: "20260815-yamaguchi",
    date: "2026-08-15",
    home: "山口", away: "琉球",
    score: { home: 1, away: 0 },
    stadium: "維新みらいふスタジアム",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 熊本 0-0 栃木SC ──
  {
    matchId: "20260815-kumamoto",
    date: "2026-08-15",
    home: "熊本", away: "栃木SC",
    score: { home: 0, away: 0 },
    stadium: "えがお健康スタジアム",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/15 金沢 4-3 福島 ──
  {
    matchId: "20260815-kanazawa",
    date: "2026-08-15",
    home: "金沢", away: "福島",
    score: { home: 4, away: 3 },
    stadium: "石川県西部緑地公園陸上競技場",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 FC大阪 4-2 長野 ──
  {
    matchId: "20260816-fcosaka",
    date: "2026-08-16",
    home: "FC大阪", away: "長野",
    score: { home: 4, away: 2 },
    stadium: "花園ラグビー場",
    kickoff: "18:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 奈良 1-3 鹿児島 ──
  {
    matchId: "20260816-nara",
    date: "2026-08-16",
    home: "奈良", away: "鹿児島",
    score: { home: 1, away: 3 },
    stadium: "ロートフィールド奈良",
    kickoff: "18:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 松本 2-3 滋賀 ──
  {
    matchId: "20260816-matsumoto",
    date: "2026-08-16",
    home: "松本", away: "滋賀",
    score: { home: 2, away: 3 },
    stadium: "サンプロアルウィン",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },

  // ── 8/16 愛媛 4-0 鳥取 ──
  {
    matchId: "20260816-ehime",
    date: "2026-08-16",
    home: "愛媛", away: "鳥取",
    score: { home: 4, away: 0 },
    stadium: "ニンジニアスタジアム",
    kickoff: "19:00",
    category: "J3",
    matchday: "第2節",
    goals: [],
    cards: [],
  },
];

export function getMatchDetailById(matchId: string): MatchDetail | undefined {
  return matchDetails.find((m) => m.matchId === matchId);
}

export function getMatchDetailByDateAndHome(date: string, home: string): MatchDetail | undefined {
  return matchDetails.find((m) => m.date === date && m.home === home);
}

export function getAllMatchDetailIds(): string[] {
  return matchDetails.map((m) => m.matchId);
}
