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
  features: string[];
  buyLinks: BuyLink[];
  rakuten?: RakutenBanner;
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
    rakuten: {
      affiliateUrl:
        "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fjz9697%2F&link_type=hybrid_url&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJoeWJyaWRfdXJsIiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9",
      imageUrl:
        "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1268947&item_id=10002329&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2F09897244%2Fjz9697_01_laydown.jpg%3F_ex%3D240x240&s=240x240&t=pict",
      price: "¥13,200〜（レプリカ）",
    },
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
