export type BuyLink = {
  store: string;
  url: string;
  label: string;
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
  features: string[];
  buyLinks: BuyLink[];
};

export const uniforms: Uniform[] = [
  {
    id: 1,
    year: "2026",
    type: "home",
    brand: "adidas",
    name: "2026 ホームユニフォーム",
    description:
      "北中米W杯に向けた最新モデル。深い紺色をベースに、日の丸カラーの赤いアクセントが特徴。コンセプトは「COLORS」。",
    colorMain: "#002868",
    colorSub: "#BF0A30",
    features: ["AEROREADY素材", "リサイクル素材使用", "日の丸モチーフ"],
    buyLinks: [
      { store: "楽天市場", url: "https://www.rakuten.co.jp", label: "楽天で見る" },
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
  {
    id: 2,
    year: "2026",
    type: "away",
    brand: "adidas",
    name: "2026 アウェイユニフォーム",
    description:
      "白をベースに水平線のグラデーションをイメージしたデザイン。コンセプトは「COLORS（カラーズ）— 水平線のその先へ」。",
    colorMain: "#FFFFFF",
    colorSub: "#002868",
    features: ["AEROREADY素材", "リサイクル素材使用", "水平線グラデーション"],
    buyLinks: [
      { store: "楽天市場", url: "https://www.rakuten.co.jp", label: "楽天で見る" },
      { store: "adidas公式", url: "https://www.adidas.co.jp", label: "adidas公式で見る" },
      { store: "KAMO", url: "https://www.kamo.co.jp", label: "KAMOで見る" },
    ],
  },
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
    features: ["AEROREADY素材"],
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
    features: ["AEROREADY素材", "桜モチーフ"],
    buyLinks: [
      { store: "楽天市場", url: "https://www.rakuten.co.jp", label: "楽天で見る" },
    ],
  },
];
