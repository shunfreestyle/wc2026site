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
    attendance: 44690,
    goals: [
      { minute: 2, playerName: "林 尚輝", assistName: "食野 壮磨", teamSide: "home" },
      { minute: 11, playerName: "遠藤 渓太", teamSide: "away" },
      { minute: 65, playerName: "瀬川 祐輔", assistName: "渡井 理己", teamSide: "away" },
      { minute: 82, playerName: "久保 藤次郎", assistName: "弓場 堅真", teamSide: "away" },
    ],
    cards: [
      { minute: 59, playerName: "中川 敦瑛", teamSide: "away", type: "yellow" as const },
      { minute: 88, playerName: "鈴木 海音", teamSide: "home", type: "yellow" as const },
      { minute: 96, playerName: "渡井 理己", teamSide: "away", type: "yellow" as const },
    ],
    stats: {
      possession: [61, 39],
      shots: [16, 8],
      shotsOnTarget: [6, 2],
    },
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
      formation: "3-4-2-1",
      starters: [
        { number: 25, name: "小島 亨介", position: "GK" },
        { number: 4, name: "古賀 太陽", position: "DF" },
        { number: 24, name: "久保 藤次郎", position: "DF", subOut: 84 },
        { number: 26, name: "杉岡 大暉", position: "DF" },
        { number: 42, name: "原田 亘", position: "MF" },
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
      { minute: 54, playerName: "原 輝綺", teamSide: "away" },
      { minute: 98, playerName: "関川 郁万", teamSide: "home" },
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
        { number: 8, name: "マテウス ブエノ", position: "MF", subOut: 69 },
        { number: 18, name: "ヤン マテウス", position: "MF", subOut: 43 },
        { number: 30, name: "吉田 湊海", position: "MF", subOut: 45 },
        { number: 9, name: "レオ セアラ", position: "FW", subOut: 69 },
        { number: 40, name: "鈴木 優磨", position: "FW", isCaptain: true, subOut: 87 },
      ],
      subs: [
        { number: 0, name: "松村 優太", position: "MF", subIn: 43, replacedPlayer: "ヤン マテウス" },
        { number: 0, name: "林 晴己", position: "MF", subIn: 45, replacedPlayer: "吉田 湊海" },
        { number: 0, name: "柴崎 岳", position: "MF", subIn: 69, replacedPlayer: "マテウス ブエノ" },
        { number: 0, name: "チャヴリッチ", position: "FW", subIn: 69, replacedPlayer: "レオ セアラ" },
        { number: 0, name: "徳田 誉", position: "FW", subIn: 87, replacedPlayer: "鈴木 優磨" },
      ],
    },
    awayLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 35, name: "アレックス ピサーノ", position: "GK" },
        { number: 2, name: "野上 結貴", position: "DF", subOut: 45 },
        { number: 70, name: "原 輝綺", position: "DF", subOut: 87 },
        { number: 13, name: "藤井 陽也", position: "DF" },
        { number: 7, name: "和泉 竜司", position: "MF", subOut: 74 },
        { number: 15, name: "稲垣 祥", position: "MF" },
        { number: 27, name: "中山 克広", position: "MF" },
        { number: 31, name: "高嶺 朋樹", position: "MF" },
        { number: 11, name: "山岸 祐也", position: "FW", subOut: 45 },
        { number: 17, name: "内田 宅哉", position: "FW" },
        { number: 22, name: "木村 勇大", position: "FW", subOut: 87 },
      ],
      subs: [
        { number: 0, name: "徳元 悠平", position: "DF", subIn: 45, replacedPlayer: "野上 結貴" },
        { number: 0, name: "マテウス カストロ", position: "FW", subIn: 45, replacedPlayer: "山岸 祐也" },
        { number: 0, name: "浅野 雄也", position: "MF", subIn: 74, replacedPlayer: "和泉 竜司" },
        { number: 0, name: "永井 謙佑", position: "FW", subIn: 87, replacedPlayer: "木村 勇大" },
        { number: 0, name: "佐藤 瑶大", position: "DF", subIn: 87, replacedPlayer: "原 輝綺" },
      ],
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
    attendance: 13226,
    goals: [
      { minute: 18, playerName: "鳥海 芳樹", teamSide: "home" },
      { minute: 74, playerName: "中谷 進之介", teamSide: "away" },
    ],
    cards: [
      { minute: 82, playerName: "山本 隼大", teamSide: "home", type: "yellow" as const },
    ],
    stats: {
      possession: [35, 65],
      shots: [12, 16],
      shotsOnTarget: [3, 4],
      corners: [9, 9],
      fouls: [11, 16],
    },
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
    attendance: 19077,
    goals: [
      { minute: 79, playerName: "井上 太聖", assistName: "近藤 友喜", teamSide: "away" },
    ],
    cards: [],
    stats: {
      shots: [3, 8],
      corners: [4, 5],
    },
    homeLineup: {
      formation: "4-1-2-3",
      starters: [
        { number: 16, name: "梅田 透吾", position: "GK" },
        { number: 24, name: "須貝 英大", position: "DF" },
        { number: 15, name: "本多 勇喜", position: "DF" },
        { number: 14, name: "パク スンウク", position: "DF" },
        { number: 25, name: "マテウス ブルネッティ", position: "DF" },
        { number: 2, name: "ディエギーニョ", position: "MF" },
        { number: 13, name: "ジャーメイン 良", position: "MF" },
        { number: 47, name: "嶋本 悠大", position: "MF" },
        { number: 49, name: "北川 航也", position: "FW", subOut: 87 },
        { number: 19, name: "木下 康介", position: "FW", subOut: 73 },
        { number: 50, name: "藤井 智也", position: "FW", subOut: 73 },
      ],
      subs: [
        { number: 0, name: "カピシャーバ", position: "MF", subIn: 73, replacedPlayer: "藤井 智也" },
        { number: 0, name: "小泉 慶", position: "MF", subIn: 73, replacedPlayer: "木下 康介" },
        { number: 0, name: "小塚 和季", position: "MF", subIn: 84, replacedPlayer: "ディエギーニョ" },
        { number: 0, name: "松崎 快", position: "MF", subIn: 87, replacedPlayer: "北川 航也" },
        { number: 0, name: "千葉 寛太", position: "FW", subIn: 87, replacedPlayer: "嶋本 悠大" },
      ],
    },
    awayLineup: {
      formation: "4-2-3-1",
      starters: [
        { number: 36, name: "ルベン ブランコ", position: "GK" },
        { number: 33, name: "諏訪間 幸成", position: "DF" },
        { number: 17, name: "ジェイソン キニョーネス", position: "DF" },
        { number: 22, name: "角田 涼太朗", position: "DF" },
        { number: 13, name: "井上 太聖", position: "DF" },
        { number: 14, name: "知念 慶", position: "MF", subOut: 95 },
        { number: 40, name: "天野 純", position: "MF" },
        { number: 41, name: "松村 晃助", position: "MF", subOut: 82 },
        { number: 24, name: "近藤 友喜", position: "FW", subOut: 82 },
        { number: 9, name: "谷村 海那", position: "FW", subOut: 82 },
        { number: 47, name: "三井寺 眞", position: "FW" },
      ],
      subs: [
        { number: 0, name: "喜田 拓也", position: "MF", subIn: 82, replacedPlayer: "松村 晃助" },
        { number: 0, name: "宮市 亮", position: "FW", subIn: 82, replacedPlayer: "近藤 友喜" },
        { number: 0, name: "二田 理央", position: "FW", subIn: 82, replacedPlayer: "谷村 海那" },
        { number: 0, name: "山根 陸", position: "MF", subIn: 95, replacedPlayer: "知念 慶" },
      ],
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
      { minute: 16, playerName: "鈴木 章斗", assistName: "川辺 駿", teamSide: "away" },
      { minute: 22, playerName: "オウンゴール", teamSide: "home", isOwnGoal: true },
      { minute: 47, playerName: "塩谷 司", teamSide: "away" },
      { minute: 61, playerName: "セバスティアン アレー", assistName: "中島", teamSide: "away" },
      { minute: 75, playerName: "鈴木 章斗", assistName: "塩谷 司", teamSide: "away" },
    ],
    cards: [
      { minute: 21, playerName: "鈴木 章斗", teamSide: "away", type: "yellow" as const },
      { minute: 25, playerName: "工藤 孝太", teamSide: "home", type: "yellow" as const },
      { minute: 34, playerName: "宮本 優太", teamSide: "home", type: "yellow" as const },
    ],
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
      { minute: 34, playerName: "テテ イェンギ", assistName: "ミッチェル デューク", teamSide: "away" },
      { minute: 70, playerName: "西村 拓真", teamSide: "away" },
      { minute: 82, playerName: "中村 帆高", assistName: "相馬 勇紀", teamSide: "away" },
    ],
    cards: [
      { minute: 48, playerName: "津久井 匠海", teamSide: "home", type: "yellow" as const },
      { minute: 56, playerName: "ダニエル ホール", teamSide: "home", type: "yellow" as const },
      { minute: 87, playerName: "エリソン", teamSide: "home", type: "yellow" as const },
    ],
    stats: {
      possession: [51, 49],
      shots: [10, 17],
      shotsOnTarget: [2, 5],
      corners: [2, 8],
      fouls: [14, 16],
    },
    homeLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 19, name: "ホセ スアレス", position: "GK" },
        { number: 24, name: "鳥海 晃司", position: "DF" },
        { number: 28, name: "河野 貴志", position: "DF" },
        { number: 66, name: "ダニエル ホール", position: "DF" },
        { number: 22, name: "飯田 貴敬", position: "MF" },
        { number: 4, name: "田口 泰士", position: "MF" },
        { number: 8, name: "津久井 匠海", position: "MF" },
        { number: 25, name: "マテウス インディオ", position: "MF" },
        { number: 30, name: "松村 拓実", position: "MF" },
        { number: 37, name: "姫野 誠", position: "MF" },
        { number: 99, name: "エリソン", position: "FW" },
      ],
      subs: [],
    },
    awayLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 1, name: "谷 晃生", position: "GK" },
        { number: 3, name: "昌子 源", position: "DF" },
        { number: 19, name: "中山 雄太", position: "DF" },
        { number: 50, name: "岡村 大八", position: "DF" },
        { number: 16, name: "前 寛之", position: "MF" },
        { number: 31, name: "ネタ ラヴィ", position: "MF" },
        { number: 33, name: "明本 考浩", position: "MF" },
        { number: 88, name: "中村 帆高", position: "MF" },
        { number: 7, name: "相馬 勇紀", position: "MF" },
        { number: 15, name: "ミッチェル デューク", position: "FW" },
        { number: 99, name: "テテ イェンギ", position: "FW" },
      ],
      subs: [
        { number: 0, name: "西村 拓真", position: "FW", subIn: 56 },
        { number: 0, name: "藤尾 翔太", position: "FW", subIn: 81 },
        { number: 0, name: "下田 北斗", position: "MF", subIn: 81 },
        { number: 0, name: "望月 ヘンリー海輝", position: "DF", subIn: 87 },
        { number: 0, name: "徳村 楓大", position: "MF", subIn: 87 },
      ],
    },
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
    attendance: 22660,
    goals: [
      { minute: 43, playerName: "ラザル ロマニッチ", assistName: "三浦 颯太", teamSide: "home" },
      { minute: 54, playerName: "福田 心之助", teamSide: "away" },
      { minute: 58, playerName: "ラファエル エリアス", assistName: "福田 心之助", teamSide: "away" },
      { minute: 64, playerName: "マルシーニョ", assistName: "伊藤 達哉", teamSide: "home" },
    ],
    cards: [
      { minute: 9, playerName: "アレックス ソウザ", teamSide: "away", type: "yellow" as const },
      { minute: 49, playerName: "ウェベルトン", teamSide: "away", type: "yellow" as const },
      { minute: 80, playerName: "大関 友翔", teamSide: "home", type: "yellow" as const },
    ],
    stats: {
      shots: [12, 19],
      shotsOnTarget: [6, 8],
    },
    homeLineup: {
      formation: "4-2-3-1",
      starters: [
        { number: 49, name: "スベンド ブローダーセン", position: "GK" },
        { number: 3, name: "谷口 栄斗", position: "DF" },
        { number: 4, name: "ペドロ ホマーノ", position: "DF" },
        { number: 13, name: "三浦 颯太", position: "DF", subOut: 59 },
        { number: 29, name: "山原 怜音", position: "DF", subOut: 80 },
        { number: 6, name: "山本 悠樹", position: "MF", subOut: 76 },
        { number: 8, name: "橘田 健人", position: "MF" },
        { number: 14, name: "脇坂 泰斗", position: "MF" },
        { number: 17, name: "伊藤 達哉", position: "MF", subOut: 76 },
        { number: 23, name: "マルシーニョ", position: "MF", subOut: 80 },
        { number: 9, name: "ラザル ロマニッチ", position: "FW" },
      ],
      subs: [
        { number: 0, name: "佐々木 旭", position: "DF", subIn: 59, replacedPlayer: "三浦 颯太" },
        { number: 0, name: "大関 友翔", position: "MF", subIn: 76, replacedPlayer: "伊藤 達哉" },
        { number: 0, name: "河原 創", position: "MF", subIn: 76, replacedPlayer: "山本 悠樹" },
        { number: 0, name: "フィリプ ウレモビッチ", position: "DF", subIn: 80, replacedPlayer: "山原 怜音" },
        { number: 0, name: "宮城 天", position: "MF", subIn: 80, replacedPlayer: "マルシーニョ" },
      ],
    },
    awayLineup: {
      formation: "4-2-3-1",
      starters: [
        { number: 1, name: "太田 岳志", position: "GK" },
        { number: 2, name: "福田 心之助", position: "DF" },
        { number: 43, name: "ウェベルトン", position: "DF", subOut: 92 },
        { number: 50, name: "鈴木 義宜", position: "DF" },
        { number: 44, name: "佐藤 響", position: "DF", subOut: 46 },
        { number: 6, name: "ジョアン ペドロ", position: "MF" },
        { number: 10, name: "福岡 慎平", position: "MF", subOut: 46 },
        { number: 39, name: "平戸 太貴", position: "MF", subOut: 70 },
        { number: 77, name: "新井 晴樹", position: "MF" },
        { number: 9, name: "ラファエル エリアス", position: "FW" },
        { number: 17, name: "アレックス ソウザ", position: "FW", subOut: 11 },
      ],
      subs: [
        { number: 0, name: "加藤 蓮", position: "MF", subIn: 11, replacedPlayer: "アレックス ソウザ" },
        { number: 0, name: "奥川 雅也", position: "MF", subIn: 46, replacedPlayer: "佐藤 響" },
        { number: 0, name: "尹 星俊", position: "MF", subIn: 46, replacedPlayer: "福岡 慎平" },
        { number: 0, name: "本田 風智", position: "MF", subIn: 70, replacedPlayer: "平戸 太貴" },
        { number: 0, name: "アピアタウィア 久", position: "DF", subIn: 92, replacedPlayer: "ウェベルトン" },
      ],
    },
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
      { minute: 35, playerName: "長倉 幹樹", assistName: "佐藤 恵允", teamSide: "away" },
      { minute: 40, playerName: "大迫 勇也", teamSide: "home" },
      { minute: 69, playerName: "長倉 幹樹", assistName: "仲川 輝人", teamSide: "away" },
      { minute: 93, playerName: "武藤 嘉紀", assistName: "ジエゴ", teamSide: "home" },
    ],
    cards: [],
    stats: {
      shots: [15, 11],
      shotsOnTarget: [4, 2],
    },
    homeLineup: {
      formation: "4-3-3",
      starters: [
        { number: 71, name: "権田 修一", position: "GK" },
        { number: 3, name: "マテウス トゥーレル", position: "DF" },
        { number: 4, name: "山川 哲史", position: "DF" },
        { number: 15, name: "ジエゴ", position: "DF" },
        { number: 24, name: "酒井 高徳", position: "DF", subOut: 49 },
        { number: 5, name: "郷家 友太", position: "MF", subOut: 74 },
        { number: 7, name: "井手口 陽介", position: "MF", subOut: 83 },
        { number: 25, name: "鍬先 祐弥", position: "MF", subOut: 74 },
        { number: 41, name: "永戸 勝也", position: "MF", subOut: 74 },
        { number: 10, name: "大迫 勇也", position: "FW", isCaptain: true },
        { number: 11, name: "武藤 嘉紀", position: "FW" },
      ],
      subs: [
        { number: 0, name: "髙橋 壱晟", position: "MF", subIn: 49, replacedPlayer: "酒井 高徳" },
        { number: 0, name: "日髙 光揮", position: "MF", subIn: 74, replacedPlayer: "郷家 友太" },
        { number: 0, name: "井出 遥也", position: "MF", subIn: 74, replacedPlayer: "永戸 勝也" },
        { number: 0, name: "小松 蓮", position: "FW", subIn: 74, replacedPlayer: "鍬先 祐弥" },
        { number: 0, name: "濱﨑 健斗", position: "MF", subIn: 83, replacedPlayer: "井手口 陽介" },
      ],
    },
    awayLineup: {
      formation: "4-3-3",
      starters: [
        { number: 81, name: "キム スンギュ", position: "GK" },
        { number: 2, name: "室屋 成", position: "DF" },
        { number: 3, name: "森重 真人", position: "DF" },
        { number: 6, name: "バングーナガンデ 佳史扶", position: "DF", subOut: 63 },
        { number: 24, name: "アレクサンダー ショルツ", position: "DF" },
        { number: 8, name: "高 宇洋", position: "MF", subOut: 63 },
        { number: 10, name: "佐藤 恵允", position: "MF", subOut: 74 },
        { number: 18, name: "橋本 拳人", position: "MF" },
        { number: 19, name: "本間 至恩", position: "MF", subOut: 89 },
        { number: 9, name: "マルセロ ヒアン", position: "FW", subOut: 63 },
        { number: 26, name: "長倉 幹樹", position: "FW" },
      ],
      subs: [
        { number: 0, name: "石原 広教", position: "DF", subIn: 63, replacedPlayer: "バングーナガンデ 佳史扶" },
        { number: 0, name: "仲川 輝人", position: "FW", subIn: 63, replacedPlayer: "マルセロ ヒアン" },
        { number: 0, name: "常盤 亨太", position: "MF", subIn: 63, replacedPlayer: "高 宇洋" },
        { number: 0, name: "安斎 颯馬", position: "MF", subIn: 74, replacedPlayer: "佐藤 恵允" },
        { number: 0, name: "小湊 絆", position: "MF", subIn: 89, replacedPlayer: "本間 至恩" },
      ],
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
    attendance: 11659,
    goals: [
      { minute: 35, playerName: "藤本 一輝", teamSide: "home" },
      { minute: 43, playerName: "辻岡 佑真", teamSide: "home" },
      { minute: 73, playerName: "ウェリック ポポ", teamSide: "home" },
    ],
    cards: [],
    stats: {
      shots: [12, 7],
      shotsOnTarget: [7, 1],
    },
    homeLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 1, name: "永石 拓海", position: "GK" },
        { number: 16, name: "岡 哲平", position: "DF" },
        { number: 20, name: "三國 ケネディエブス", position: "DF", subOut: 51 },
        { number: 15, name: "辻岡 佑真", position: "DF" },
        { number: 47, name: "橋本 悠", position: "MF" },
        { number: 55, name: "前田 快", position: "MF", subOut: 67 },
        { number: 11, name: "見木 友哉", position: "MF" },
        { number: 22, name: "藤本 一輝", position: "MF", subOut: 62 },
        { number: 6, name: "重見 柾斗", position: "FW" },
        { number: 9, name: "ウェリック ポポ", position: "FW" },
        { number: 13, name: "師岡 柊生", position: "FW", subOut: 62 },
      ],
      subs: [
        { number: 0, name: "奈良 竜樹", position: "DF", subIn: 51, replacedPlayer: "三國 ケネディエブス" },
        { number: 0, name: "深澤 大輝", position: "MF", subIn: 62, replacedPlayer: "藤本 一輝" },
        { number: 0, name: "名古 新太郎", position: "MF", subIn: 62, replacedPlayer: "師岡 柊生" },
        { number: 0, name: "椎橋 慧也", position: "MF", subIn: 67, replacedPlayer: "前田 快" },
      ],
    },
    awayLineup: {
      formation: "3-4-2-1",
      starters: [
        { number: 23, name: "中村 航輔", position: "GK" },
        { number: 4, name: "井上 黎生人", position: "DF" },
        { number: 27, name: "ディオン クールズ", position: "DF" },
        { number: 44, name: "畠中 槙之輔", position: "DF" },
        { number: 2, name: "中村 拓海", position: "MF" },
        { number: 8, name: "香川 真司", position: "MF", subOut: 60 },
        { number: 10, name: "田中 駿汰", position: "MF" },
        { number: 14, name: "横山 夢樹", position: "MF", subOut: 60 },
        { number: 28, name: "岡澤 昂星", position: "MF", subOut: 45 },
        { number: 0, name: "大畑 歩夢", position: "MF" },
        { number: 9, name: "櫻川 ソロモン", position: "FW" },
      ],
      subs: [
        { number: 0, name: "ジャクソン アーバイン", position: "MF", subIn: 45, replacedPlayer: "岡澤 昂星" },
        { number: 0, name: "小見 洋太", position: "FW", subIn: 60, replacedPlayer: "横山 夢樹" },
        { number: 0, name: "チアゴ アンドラーデ", position: "MF", subIn: 60, replacedPlayer: "香川 真司" },
      ],
    },
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
