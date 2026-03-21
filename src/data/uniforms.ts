export type BuyLink = {
  store: string;
  url: string;
  label: string;
};

export type RakutenBanner = {
  affiliateUrl: string;
  imageUrl: string;
  price: string;
};

export type Uniform = {
  id: number;
  year: string;
  type: "home" | "away" | "gk";
  brand: "adidas";
  name: string;
  description: string;
  colorMain: string;
  colorSub: string;
  buyLinks: BuyLink[];
  rakuten?: RakutenBanner;
};

export const uniforms: Uniform[] = [
  // ── 2026 ホーム長袖 ──
  {
    id: 1,
    year: "2026",
    type: "home",
    brand: "adidas",
    name: "2026 ホームユニフォーム 長袖",
    description:
      "北中米W杯に向けた最新モデル。深い紺色をベースに、日の丸カラーの赤いアクセントが特徴。コンセプトは「COLORS」。長袖モデル。",
    colorMain: "#002868",
    colorSub: "#BF0A30",
    buyLinks: [
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  // ── 2026 ホーム半袖 ──
  {
    id: 6,
    year: "2026",
    type: "home",
    brand: "adidas",
    name: "2026 ホームユニフォーム 半袖",
    description:
      "ディープブルーに波を思わせるホワイトのグラフィック。HORIZON（水平線）コンセプト。半袖モデル。",
    colorMain: "#002868",
    colorSub: "#BF0A30",
    buyLinks: [
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  // ── 2026 アウェイ長袖 ──
  {
    id: 2,
    year: "2026",
    type: "away",
    brand: "adidas",
    name: "2026 アウェイユニフォーム 長袖",
    description:
      "白をベースに水平線のグラデーションをイメージしたデザイン。コンセプトは「COLORS（カラーズ）— 水平線のその先へ」。",
    colorMain: "#FFFFFF",
    colorSub: "#002868",
    buyLinks: [
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  // ── 2026 アウェイ半袖 ──
  {
    id: 5,
    year: "2026",
    type: "away",
    brand: "adidas",
    name: "2026 アウェイユニフォーム 半袖",
    description:
      "オフホワイトに全11色のストライプ。トレフォイルロゴを30年ぶりに採用した記念モデル。",
    colorMain: "#FFFFFF",
    colorSub: "#002868",
    buyLinks: [
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  // ── 2024 ──
  {
    id: 3,
    year: "2024",
    type: "home",
    brand: "adidas",
    name: "2024 ホームユニフォーム",
    description:
      "カタールW杯以降の主力モデル。シンプルな紺地に金のアクセント。",
    colorMain: "#002868",
    colorSub: "#FFD700",
    buyLinks: [
      { store: "楽天市場", url: "https://www.rakuten.co.jp", label: "楽天で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  {
    id: 4,
    year: "2024",
    type: "away",
    brand: "adidas",
    name: "2024 アウェイユニフォーム",
    description: "白地に桜をモチーフにした刺繍風デザイン。",
    colorMain: "#FFFFFF",
    colorSub: "#FF69B4",
    buyLinks: [
      { store: "楽天市場", url: "https://www.rakuten.co.jp", label: "楽天で見る" },
    ],
  },
];
