/**
 * 日本代表 直近10試合の試合データ
 * ソース: JFA公式 / ESPN / FOX Sports
 * W杯アジア最終予選 グループC 8試合 + 親善試合2試合
 */

export type MatchPlayer = {
  number: number;
  name: string;
  nameJa: string;
  position: "GK" | "DF" | "MF" | "FW";
};

export type Substitution = {
  minute: string;
  playerIn: string;
  playerOut: string;
};

export type Goal = {
  minute: string;
  player: string;
  team: "home" | "away";
};

export type FormationPosition = {
  nameJa: string;
  number: number;
  top: number;
  left: number;
};

export type JapanMatch = {
  id: string;
  date: string;
  competition: string;
  venue: string;
  city: string;
  home: { name: string; nameJa: string; flag: string; score: number };
  away: { name: string; nameJa: string; flag: string; score: number };
  goals: Goal[];
  formation: string;
  formationPositions: FormationPosition[];
  starting: MatchPlayer[];
  bench: MatchPlayer[];
  substitutions: Substitution[];
  highlights: string[];
  highlightUrl?: string;
};

/* ── Formation: 3-4-2-1 ───────────────────────── */
function f3421(p: {
  gk: [number, string];
  lcb: [number, string]; ccb: [number, string]; rcb: [number, string];
  lwb: [number, string]; lcm: [number, string]; rcm: [number, string]; rwb: [number, string];
  lss: [number, string]; rss: [number, string];
  st: [number, string];
}): FormationPosition[] {
  return [
    { nameJa: p.gk[1], number: p.gk[0], top: 90, left: 50 },
    { nameJa: p.lcb[1], number: p.lcb[0], top: 73, left: 25 },
    { nameJa: p.ccb[1], number: p.ccb[0], top: 73, left: 50 },
    { nameJa: p.rcb[1], number: p.rcb[0], top: 73, left: 75 },
    { nameJa: p.lwb[1], number: p.lwb[0], top: 52, left: 10 },
    { nameJa: p.lcm[1], number: p.lcm[0], top: 52, left: 38 },
    { nameJa: p.rcm[1], number: p.rcm[0], top: 52, left: 62 },
    { nameJa: p.rwb[1], number: p.rwb[0], top: 52, left: 90 },
    { nameJa: p.lss[1], number: p.lss[0], top: 30, left: 35 },
    { nameJa: p.rss[1], number: p.rss[0], top: 30, left: 65 },
    { nameJa: p.st[1], number: p.st[0], top: 10, left: 50 },
  ];
}

/* ── Match Data (newest → oldest) ──────────────── */
export const japanMatches: JapanMatch[] = [
  // ── 1. イングランド 0-1 日本（親善試合）──
  {
    id: "20260331-england-a",
    date: "2026-03-31",
    competition: "キリンワールドチャレンジ2026",
    venue: "ウェンブリー・スタジアム",
    city: "ロンドン（イングランド）",
    home: { name: "England", nameJa: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 0 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 1 },
    goals: [
      { minute: "23", player: "三笘薫", team: "away" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"],
      lcb: [3, "谷口彰悟"], ccb: [5, "渡辺剛"], rcb: [21, "伊藤洋輝"],
      lwb: [13, "中村敬斗"], lcm: [15, "鎌田大地"], rcm: [24, "佐野海舟"], rwb: [14, "伊東純也"],
      lss: [7, "三笘薫"], rss: [10, "堂安律"],
      st: [18, "上田綺世"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Shogo Taniguchi", nameJa: "谷口彰悟", position: "DF" },
      { number: 5, name: "Tsuyoshi Watanabe", nameJa: "渡辺剛", position: "DF" },
      { number: 21, name: "Hiroki Ito", nameJa: "伊藤洋輝", position: "DF" },
      { number: 24, name: "Kaishu Sano", nameJa: "佐野海舟", position: "MF" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "MF" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "MF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 18, name: "Ayase Ueda", nameJa: "上田綺世", position: "FW" },
    ],
    bench: [
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 4, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 6, name: "Joel Chima Fujita", nameJa: "藤田譲瑠チマ", position: "MF" },
      { number: 8, name: "Yuito Suzuki", nameJa: "鈴木唯人", position: "MF" },
      { number: 9, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 12, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
      { number: 16, name: "Kodai Sano", nameJa: "佐野航大", position: "MF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 19, name: "Daiki Hashioka", nameJa: "橋岡大樹", position: "DF" },
      { number: 20, name: "Junnosuke Suzuki", nameJa: "鈴木淳之介", position: "MF" },
      { number: 22, name: "Keisuke Goto", nameJa: "後藤啓介", position: "FW" },
      { number: 23, name: "Kento Shiogai", nameJa: "塩貝健人", position: "FW" },
      { number: 25, name: "Ayumu Ohata", nameJa: "大畑歩夢", position: "DF" },
      { number: 27, name: "Ryunosuke Sato", nameJa: "佐藤龍之介", position: "MF" },
      { number: 28, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
      { number: 99, name: "Taishi Nozawa Brandon", nameJa: "野澤大志ブランドン", position: "GK" },
    ],
    substitutions: [
      { minute: "66", playerIn: "瀬古歩夢", playerOut: "伊藤洋輝" },
      { minute: "66", playerIn: "小川航基", playerOut: "上田綺世" },
      { minute: "71", playerIn: "田中碧", playerOut: "堂安律" },
      { minute: "71", playerIn: "鈴木淳之介", playerOut: "三笘薫" },
      { minute: "80", playerIn: "菅原由勢", playerOut: "鎌田大地" },
      { minute: "80", playerIn: "鈴木唯人", playerOut: "伊東純也" },
      { minute: "80", playerIn: "町野修斗", playerOut: "中村敬斗" },
    ],
    highlights: [],
    highlightUrl: "",
  },

  // ── 2. スコットランド 0-1 日本（親善試合）──
  {
    id: "20260328-scotland-a",
    date: "2026-03-28",
    competition: "キリンワールドチャレンジ2026",
    venue: "ハムデン・パーク",
    city: "グラスゴー（スコットランド）",
    home: { name: "Scotland", nameJa: "スコットランド", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", score: 0 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 1 },
    goals: [
      { minute: "84", player: "伊東純也", team: "away" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"],
      lcb: [21, "伊藤洋輝"], ccb: [5, "渡辺剛"], rcb: [4, "瀬古歩夢"],
      lwb: [11, "前田大然"], lcm: [6, "藤田譲瑠チマ"], rcm: [17, "田中碧"], rwb: [2, "菅原由勢"],
      lss: [20, "佐野航大"], rss: [8, "鈴木唯人"],
      st: [26, "後藤啓介"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 4, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 5, name: "Tsuyoshi Watanabe", nameJa: "渡辺剛", position: "DF" },
      { number: 21, name: "Hiroki Ito", nameJa: "伊藤洋輝", position: "DF" },
      { number: 6, name: "Joel Chima Fujita", nameJa: "藤田譲瑠チマ", position: "MF" },
      { number: 8, name: "Yuito Suzuki", nameJa: "鈴木唯人", position: "MF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 20, name: "Kodai Sano", nameJa: "佐野航大", position: "MF" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 26, name: "Keisuke Goto", nameJa: "後藤啓介", position: "FW" },
    ],
    bench: [
      { number: 3, name: "Shogo Taniguchi", nameJa: "谷口彰悟", position: "DF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 9, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 12, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 18, name: "Ayase Ueda", nameJa: "上田綺世", position: "FW" },
      { number: 19, name: "Daiki Hashioka", nameJa: "橋岡大樹", position: "DF" },
      { number: 23, name: "Kento Shiogai", nameJa: "塩貝健人", position: "FW" },
      { number: 24, name: "Kaishu Sano", nameJa: "佐野海舟", position: "MF" },
      { number: 25, name: "Ayumu Ohata", nameJa: "大畑歩夢", position: "DF" },
      { number: 27, name: "Ryunosuke Sato", nameJa: "佐藤龍之介", position: "MF" },
      { number: 28, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
      { number: 99, name: "Taishi Nozawa Brandon", nameJa: "野澤大志ブランドン", position: "GK" },
    ],
    substitutions: [
      { minute: "46", playerIn: "谷口彰悟", playerOut: "渡辺剛" },
      { minute: "46", playerIn: "鈴木淳之介", playerOut: "伊藤洋輝" },
      { minute: "46", playerIn: "三笘薫", playerOut: "佐野航大" },
      { minute: "62", playerIn: "伊東純也", playerOut: "菅原由勢" },
      { minute: "62", playerIn: "中村敬斗", playerOut: "前田大然" },
      { minute: "63", playerIn: "上田綺世", playerOut: "後藤啓介" },
      { minute: "63", playerIn: "伊東純也", playerOut: "鈴木唯人" },
      { minute: "77", playerIn: "橋岡大樹", playerOut: "瀬古歩夢" },
      { minute: "78", playerIn: "塩貝健人", playerOut: "藤田譲瑠チマ" },
      { minute: "78", playerIn: "鎌田大地", playerOut: "田中碧" },
    ],
    highlights: [],
    highlightUrl: "",
  },

  // ── 3. MD10 日本 6-0 インドネシア ──
  {
    id: "20250610-indonesia-h",
    date: "2025-06-10",
    competition: "FIFAワールドカップ2026 アジア最終予選 第10節",
    venue: "パナソニックスタジアム吹田",
    city: "吹田",
    home: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 6 },
    away: { name: "Indonesia", nameJa: "インドネシア", flag: "🇮🇩", score: 0 },
    goals: [
      { minute: "15", player: "鎌田大地", team: "home" },
      { minute: "19", player: "久保建英", team: "home" },
      { minute: "45+6", player: "鎌田大地", team: "home" },
      { minute: "55", player: "森下龍矢", team: "home" },
      { minute: "58", player: "町野修斗", team: "home" },
      { minute: "80", player: "細谷真大", team: "home" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [12, "大迫敬介"], lcb: [22, "瀬古歩夢"], ccb: [4, "鈴木淳之介"], rcb: [3, "高井幸大"],
      lwb: [17, "森下龍矢"], lcm: [6, "遠藤航"], rcm: [5, "佐野海舟"], rwb: [14, "三戸舜介"],
      lss: [15, "鎌田大地"], rss: [10, "久保建英"], st: [18, "町野修斗"],
    }),
    starting: [
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 4, name: "Junnosuke Suzuki", nameJa: "鈴木淳之介", position: "DF" },
      { number: 3, name: "Kota Takai", nameJa: "高井幸大", position: "DF" },
      { number: 17, name: "Ryoya Morishita", nameJa: "森下龍矢", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 5, name: "Kaishu Sano", nameJa: "佐野海舟", position: "MF" },
      { number: 14, name: "Shunsuke Mito", nameJa: "三戸舜介", position: "MF" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "FW" },
      { number: 10, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 18, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
    ],
    bench: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 2, name: "Hiroki Sekine", nameJa: "関根大輝", position: "DF" },
      { number: 7, name: "Joel Chima Fujita", nameJa: "藤田譲瑠チマ", position: "MF" },
      { number: 8, name: "Yuito Suzuki", nameJa: "鈴木唯人", position: "MF" },
      { number: 9, name: "Yuki Ohashi", nameJa: "大橋祐紀", position: "FW" },
      { number: 11, name: "Yu Hirakawa", nameJa: "平河悠", position: "MF" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 16, name: "Mao Hosoya", nameJa: "細谷真大", position: "FW" },
      { number: 19, name: "Kodai Sano", nameJa: "佐野航大", position: "MF" },
      { number: 20, name: "Kota Tawaratsumida", nameJa: "俵積田晃太", position: "MF" },
      { number: 21, name: "Ryunosuke Sato", nameJa: "佐藤龍之介", position: "MF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "45", playerIn: "中村敬斗", playerOut: "鎌田大地" },
      { minute: "61", playerIn: "佐野航大", playerOut: "三戸舜介" },
      { minute: "69", playerIn: "佐藤龍之介", playerOut: "久保建英" },
      { minute: "69", playerIn: "細谷真大", playerOut: "森下龍矢" },
      { minute: "78", playerIn: "俵積田晃太", playerOut: "町野修斗" },
    ],
    highlights: [
      "最終節は控え組中心のメンバーで臨み、6-0の圧勝",
      "鎌田大地が2ゴール、久保建英も1ゴールでW杯本大会への仕上がりを示す",
      "森下龍矢・町野修斗・細谷真大と多彩な得点者が生まれた",
      "予選全10試合を8勝1分1敗の圧倒的成績で首位通過を決めた",
    ],
    highlightUrl: "",
  },

  // ── 2. MD9 オーストラリア 1-0 日本 ──
  {
    id: "20250605-australia-a",
    date: "2025-06-05",
    competition: "FIFAワールドカップ2026 アジア最終予選 第9節",
    venue: "オプタス・スタジアム",
    city: "パース（オーストラリア）",
    home: { name: "Australia", nameJa: "オーストラリア", flag: "🇦🇺", score: 1 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 0 },
    goals: [
      { minute: "90", player: "ベヒッチ", team: "home" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [23, "谷晃生"], lcb: [16, "町田浩樹"], ccb: [4, "渡辺剛"], rcb: [2, "関根大輝"],
      lwb: [11, "平河悠"], lcm: [5, "佐野海舟"], rcm: [7, "藤田譲瑠チマ"], rwb: [20, "俵積田晃太"],
      lss: [15, "鎌田大地"], rss: [9, "大橋祐紀"], st: [8, "鈴木唯人"],
    }),
    starting: [
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
      { number: 16, name: "Koki Machida", nameJa: "町田浩樹", position: "DF" },
      { number: 4, name: "Tsuyoshi Watanabe", nameJa: "渡辺剛", position: "DF" },
      { number: 2, name: "Hiroki Sekine", nameJa: "関根大輝", position: "DF" },
      { number: 11, name: "Yu Hirakawa", nameJa: "平河悠", position: "MF" },
      { number: 5, name: "Kaishu Sano", nameJa: "佐野海舟", position: "MF" },
      { number: 7, name: "Joel Chima Fujita", nameJa: "藤田譲瑠チマ", position: "MF" },
      { number: 20, name: "Kota Tawaratsumida", nameJa: "俵積田晃太", position: "MF" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "FW" },
      { number: 9, name: "Yuki Ohashi", nameJa: "大橋祐紀", position: "FW" },
      { number: 8, name: "Yuito Suzuki", nameJa: "鈴木唯人", position: "FW" },
    ],
    bench: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Kota Takai", nameJa: "高井幸大", position: "DF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 10, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Shunsuke Mito", nameJa: "三戸舜介", position: "MF" },
      { number: 17, name: "Ryoya Morishita", nameJa: "森下龍矢", position: "MF" },
      { number: 18, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
      { number: 19, name: "Kodai Sano", nameJa: "佐野航大", position: "MF" },
      { number: 21, name: "Mitsuki Kumasaka", nameJa: "熊坂光希", position: "DF" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
    ],
    substitutions: [
      { minute: "45", playerIn: "瀬古歩夢", playerOut: "町田浩樹" },
      { minute: "45", playerIn: "中村敬斗", playerOut: "俵積田晃太" },
      { minute: "64", playerIn: "久保建英", playerOut: "佐野海舟" },
      { minute: "69", playerIn: "町野修斗", playerOut: "大橋祐紀" },
      { minute: "69", playerIn: "高井幸大", playerOut: "渡辺剛" },
    ],
    highlights: [
      "既に予選通過を決めていた日本は大幅にメンバーを入れ替えて臨んだ一戦",
      "控え組中心のメンバーでオーストラリアのアウェイに乗り込む",
      "後半、久保建英を投入するも得点は奪えず",
      "90分にベヒッチに決められ、予選唯一の敗北を喫した。しかし首位通過には影響なし",
    ],
    highlightUrl: "",
  },

  // ── 3. MD8 日本 0-0 サウジアラビア ──
  {
    id: "20250325-saudi-h",
    date: "2025-03-25",
    competition: "FIFAワールドカップ2026 アジア最終予選 第8節",
    venue: "埼玉スタジアム2002",
    city: "さいたま",
    home: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 0 },
    away: { name: "Saudi Arabia", nameJa: "サウジアラビア", flag: "🇸🇦", score: 0 },
    goals: [],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [21, "伊藤洋輝"], ccb: [4, "板倉滉"], rcb: [3, "高井幸大"],
      lwb: [13, "中村敬斗"], lcm: [17, "田中碧"], rcm: [6, "遠藤航"], rwb: [2, "菅原由勢"],
      lss: [20, "久保建英"], rss: [15, "鎌田大地"], st: [11, "前田大然"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Kota Takai", nameJa: "高井幸大", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 21, name: "Hiroki Ito", nameJa: "伊藤洋輝", position: "DF" },
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "MF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "MF" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "FW" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
    ],
    bench: [
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 9, name: "Kyogo Furuhashi", nameJa: "古橋亨梧", position: "FW" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 16, name: "Yuta Nakayama", nameJa: "中山雄太", position: "DF" },
      { number: 18, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
      { number: 19, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "62", playerIn: "伊東純也", playerOut: "菅原由勢" },
      { minute: "62", playerIn: "堂安律", playerOut: "久保建英" },
      { minute: "73", playerIn: "古橋亨梧", playerOut: "前田大然" },
      { minute: "73", playerIn: "旗手怜央", playerOut: "遠藤航" },
      { minute: "83", playerIn: "南野拓実", playerOut: "鎌田大地" },
    ],
    highlights: [
      "ホームでのサウジアラビア戦はスコアレスドロー。予選唯一の引き分けに",
      "日本は攻め込むも、サウジの堅い守備を崩しきれず",
      "後半には伊東純也・堂安律・古橋亨梧ら攻撃のカードを切るも得点ならず",
      "首位通過への影響は小さいが、課題が残る試合となった",
    ],
    highlightUrl: "",
  },

  // ── 4. MD7 日本 2-0 バーレーン ──
  {
    id: "20250320-bahrain-h",
    date: "2025-03-20",
    competition: "FIFAワールドカップ2026 アジア最終予選 第7節",
    venue: "埼玉スタジアム2002",
    city: "さいたま",
    home: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 2 },
    away: { name: "Bahrain", nameJa: "バーレーン", flag: "🇧🇭", score: 0 },
    goals: [
      { minute: "66", player: "鎌田大地", team: "home" },
      { minute: "87", player: "久保建英", team: "home" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [22, "瀬古歩夢"], ccb: [4, "板倉滉"], rcb: [21, "伊藤洋輝"],
      lwb: [7, "三笘薫"], lcm: [6, "遠藤航"], rcm: [5, "守田英正"], rwb: [10, "堂安律"],
      lss: [20, "久保建英"], rss: [8, "南野拓実"], st: [9, "上田綺世"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 21, name: "Hiroki Ito", nameJa: "伊藤洋輝", position: "DF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 9, name: "Ayase Ueda", nameJa: "上田綺世", position: "FW" },
    ],
    bench: [
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 3, name: "Kota Takai", nameJa: "高井幸大", position: "DF" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 16, name: "Yuta Nakayama", nameJa: "中山雄太", position: "DF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 18, name: "Shuto Machino", nameJa: "町野修斗", position: "FW" },
      { number: 19, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "45", playerIn: "田中碧", playerOut: "守田英正" },
      { minute: "63", playerIn: "伊東純也", playerOut: "堂安律" },
      { minute: "63", playerIn: "鎌田大地", playerOut: "南野拓実" },
      { minute: "76", playerIn: "中村敬斗", playerOut: "三笘薫" },
      { minute: "86", playerIn: "町野修斗", playerOut: "上田綺世" },
    ],
    highlights: [
      "前半は堅い守りのバーレーンを崩しきれずスコアレスで折り返し",
      "66分、途中出場の鎌田大地が華麗なシュートで均衡を破る",
      "87分、久保建英がダメ押しゴール。後半の選手交代が的中した",
      "W杯出場に大きく前進する貴重なホームでの勝利",
    ],
    highlightUrl: "",
  },

  // ── 5. MD6 中国 1-3 日本 ──
  {
    id: "20241119-china-a",
    date: "2024-11-19",
    competition: "FIFAワールドカップ2026 アジア最終予選 第6節",
    venue: "廈門白鷺体育場",
    city: "廈門（中国）",
    home: { name: "China", nameJa: "中国", flag: "🇨🇳", score: 1 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 3 },
    goals: [
      { minute: "39", player: "小川航基", team: "away" },
      { minute: "45+5", player: "板倉滉", team: "away" },
      { minute: "49", player: "リン・リャンミン", team: "home" },
      { minute: "54", player: "小川航基", team: "away" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [22, "瀬古歩夢"], ccb: [4, "板倉滉"], rcb: [16, "町田浩樹"],
      lwb: [13, "中村敬斗"], lcm: [6, "遠藤航"], rcm: [17, "田中碧"], rwb: [14, "伊東純也"],
      lss: [20, "久保建英"], rss: [8, "南野拓実"], st: [19, "小川航基"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 16, name: "Koki Machida", nameJa: "町田浩樹", position: "DF" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 19, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
    ],
    bench: [
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 3, name: "Daiki Hashioka", nameJa: "橋岡大樹", position: "DF" },
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 9, name: "Kyogo Furuhashi", nameJa: "古橋亨梧", position: "FW" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 18, name: "Yuki Ohashi", nameJa: "大橋祐紀", position: "FW" },
      { number: 21, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "64", playerIn: "鎌田大地", playerOut: "南野拓実" },
      { minute: "64", playerIn: "三笘薫", playerOut: "中村敬斗" },
      { minute: "77", playerIn: "古橋亨梧", playerOut: "小川航基" },
      { minute: "77", playerIn: "橋岡大樹", playerOut: "伊東純也" },
      { minute: "84", playerIn: "前田大然", playerOut: "久保建英" },
    ],
    highlights: [
      "39分、小川航基がペナルティエリアで冷静に決めて先制",
      "前半アディショナルタイムの45+6分、板倉滉がセットプレーから追加点",
      "49分に中国に1点返されるも、54分に小川が2ゴール目で突き放す",
      "小川航基の2ゴールが光ったアウェイでの快勝。W杯出場に向け着実に勝ち点を積み上げた",
    ],
    highlightUrl: "",
  },

  // ── 6. MD5 インドネシア 0-4 日本 ──
  {
    id: "20241115-indonesia-a",
    date: "2024-11-15",
    competition: "FIFAワールドカップ2026 アジア最終予選 第5節",
    venue: "ゲロラ・ブン・カルノ・スタジアム",
    city: "ジャカルタ（インドネシア）",
    home: { name: "Indonesia", nameJa: "インドネシア", flag: "🇮🇩", score: 0 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 4 },
    goals: [
      { minute: "35", player: "ヒュブナー（OG）", team: "away" },
      { minute: "40", player: "南野拓実", team: "away" },
      { minute: "49", player: "守田英正", team: "away" },
      { minute: "69", player: "菅原由勢", team: "away" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [3, "橋岡大樹"], ccb: [4, "板倉滉"], rcb: [16, "町田浩樹"],
      lwb: [7, "三笘薫"], lcm: [6, "遠藤航"], rcm: [5, "守田英正"], rwb: [10, "堂安律"],
      lss: [15, "鎌田大地"], rss: [8, "南野拓実"], st: [19, "小川航基"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Daiki Hashioka", nameJa: "橋岡大樹", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 16, name: "Koki Machida", nameJa: "町田浩樹", position: "DF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 19, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
    ],
    bench: [
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 9, name: "Kyogo Furuhashi", nameJa: "古橋亨梧", position: "FW" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 18, name: "Yuki Ohashi", nameJa: "大橋祐紀", position: "FW" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 21, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "46", playerIn: "前田大然", playerOut: "南野拓実" },
      { minute: "62", playerIn: "菅原由勢", playerOut: "堂安律" },
      { minute: "62", playerIn: "伊東純也", playerOut: "三笘薫" },
      { minute: "79", playerIn: "旗手怜央", playerOut: "鎌田大地" },
      { minute: "79", playerIn: "大橋祐紀", playerOut: "小川航基" },
    ],
    highlights: [
      "ジャカルタでのアウェイ戦。8万人超の大観衆の中で日本が実力を発揮",
      "35分、OGで先制すると、40分に南野、49分に守田が追加点",
      "69分には菅原由勢がダメ押しゴール。4-0の完勝",
      "守田英正のゴールは中盤からの果敢な飛び出しが光った見事な一撃だった",
    ],
    highlightUrl: "",
  },

  // ── 7. MD4 日本 1-1 オーストラリア ──
  {
    id: "20241015-australia-h",
    date: "2024-10-15",
    competition: "FIFAワールドカップ2026 アジア最終予選 第4節",
    venue: "埼玉スタジアム2002",
    city: "さいたま",
    home: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 1 },
    away: { name: "Australia", nameJa: "オーストラリア", flag: "🇦🇺", score: 1 },
    goals: [
      { minute: "58", player: "谷口彰悟（OG）", team: "away" },
      { minute: "76", player: "バージェス（OG）", team: "home" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [3, "谷口彰悟"], ccb: [16, "町田浩樹"], rcb: [4, "板倉滉"],
      lwb: [7, "三笘薫"], lcm: [5, "守田英正"], rcm: [17, "田中碧"], rwb: [10, "堂安律"],
      lss: [8, "南野拓実"], rss: [20, "久保建英"], st: [9, "上田綺世"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Shogo Taniguchi", nameJa: "谷口彰悟", position: "DF" },
      { number: 16, name: "Koki Machida", nameJa: "町田浩樹", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 9, name: "Ayase Ueda", nameJa: "上田綺世", position: "FW" },
    ],
    bench: [
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 6, name: "Joel Chima Fujita", nameJa: "藤田譲瑠チマ", position: "MF" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "MF" },
      { number: 19, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
      { number: 21, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 22, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "62", playerIn: "伊東純也", playerOut: "堂安律" },
      { minute: "70", playerIn: "鎌田大地", playerOut: "南野拓実" },
      { minute: "70", playerIn: "中村敬斗", playerOut: "久保建英" },
      { minute: "83", playerIn: "小川航基", playerOut: "上田綺世" },
    ],
    highlights: [
      "ホームでの因縁のオーストラリア戦。緊迫した展開が続く",
      "58分、谷口彰悟のオウンゴールでオーストラリアに先制点を献上",
      "しかし76分、中村敬斗のクロスからバージェスがOG。日本が同点に追いつく",
      "両チームともOGによる得点という珍しい展開。グループ首位は維持",
    ],
    highlightUrl: "",
  },

  // ── 8. MD3 サウジアラビア 0-2 日本 ──
  {
    id: "20241010-saudi-a",
    date: "2024-10-10",
    competition: "FIFAワールドカップ2026 アジア最終予選 第3節",
    venue: "キング・アブドゥラー・スポーツシティ",
    city: "ジッダ（サウジアラビア）",
    home: { name: "Saudi Arabia", nameJa: "サウジアラビア", flag: "🇸🇦", score: 0 },
    away: { name: "Japan", nameJa: "日本", flag: "🇯🇵", score: 2 },
    goals: [
      { minute: "14", player: "鎌田大地", team: "away" },
      { minute: "81", player: "小川航基", team: "away" },
    ],
    formation: "3-4-2-1",
    formationPositions: f3421({
      gk: [1, "鈴木彩艶"], lcb: [3, "谷口彰悟"], ccb: [16, "町田浩樹"], rcb: [4, "板倉滉"],
      lwb: [7, "三笘薫"], lcm: [5, "守田英正"], rcm: [6, "遠藤航"], rwb: [10, "堂安律"],
      lss: [15, "鎌田大地"], rss: [8, "南野拓実"], st: [9, "上田綺世"],
    }),
    starting: [
      { number: 1, name: "Zion Suzuki", nameJa: "鈴木彩艶", position: "GK" },
      { number: 3, name: "Shogo Taniguchi", nameJa: "谷口彰悟", position: "DF" },
      { number: 16, name: "Koki Machida", nameJa: "町田浩樹", position: "DF" },
      { number: 4, name: "Ko Itakura", nameJa: "板倉滉", position: "DF" },
      { number: 7, name: "Kaoru Mitoma", nameJa: "三笘薫", position: "MF" },
      { number: 5, name: "Hidemasa Morita", nameJa: "守田英正", position: "MF" },
      { number: 6, name: "Wataru Endo", nameJa: "遠藤航", position: "MF" },
      { number: 10, name: "Ritsu Doan", nameJa: "堂安律", position: "MF" },
      { number: 15, name: "Daichi Kamada", nameJa: "鎌田大地", position: "FW" },
      { number: 8, name: "Takumi Minamino", nameJa: "南野拓実", position: "FW" },
      { number: 9, name: "Ayase Ueda", nameJa: "上田綺世", position: "FW" },
    ],
    bench: [
      { number: 12, name: "Keisuke Osako", nameJa: "大迫敬介", position: "GK" },
      { number: 2, name: "Yukinari Sugawara", nameJa: "菅原由勢", position: "DF" },
      { number: 11, name: "Daizen Maeda", nameJa: "前田大然", position: "FW" },
      { number: 13, name: "Keito Nakamura", nameJa: "中村敬斗", position: "FW" },
      { number: 14, name: "Junya Ito", nameJa: "伊東純也", position: "FW" },
      { number: 17, name: "Ao Tanaka", nameJa: "田中碧", position: "MF" },
      { number: 19, name: "Koki Ogawa", nameJa: "小川航基", position: "FW" },
      { number: 18, name: "Yuki Ohashi", nameJa: "大橋祐紀", position: "FW" },
      { number: 20, name: "Takefusa Kubo", nameJa: "久保建英", position: "FW" },
      { number: 21, name: "Ayumu Seko", nameJa: "瀬古歩夢", position: "DF" },
      { number: 22, name: "Reo Hatate", nameJa: "旗手怜央", position: "MF" },
      { number: 23, name: "Kosei Tani", nameJa: "谷晃生", position: "GK" },
    ],
    substitutions: [
      { minute: "46", playerIn: "伊東純也", playerOut: "南野拓実" },
      { minute: "63", playerIn: "前田大然", playerOut: "鎌田大地" },
      { minute: "76", playerIn: "小川航基", playerOut: "上田綺世" },
      { minute: "88", playerIn: "中村敬斗", playerOut: "三笘薫" },
      { minute: "88", playerIn: "久保建英", playerOut: "堂安律" },
    ],
    highlights: [
      "中東アウェイの難関サウジアラビア戦。14分に鎌田が先制ゴールを決める最高のスタート",
      "前半は日本が主導権を握り、サウジの反撃を許さない堅い守備を披露",
      "81分、途中出場の小川航基がダメ押しの2点目を決めて勝利を確定",
      "アウェイでの貴重な勝ち点3。グループ首位を堅持した",
    ],
    highlightUrl: "",
  },

];

/* ── Helper functions ───────────────────────────── */
export function getJapanMatchById(id: string): JapanMatch | undefined {
  return japanMatches.find((m) => m.id === id);
}

export function getAllJapanMatchIds(): string[] {
  return japanMatches.map((m) => m.id);
}
