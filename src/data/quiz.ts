export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correct: number;
};

export const QUIZ_BEGINNER: QuizQuestion[] = [
  {
    id: 1,
    question: "2026年ワールドカップの開幕日はいつ？",
    options: ["6月11日", "7月1日", "5月20日", "6月1日"],
    correct: 0,
  },
  {
    id: 2,
    question: "2026年ワールドカップの開催国は？",
    options: [
      "アメリカのみ",
      "アメリカ・メキシコ・カナダ",
      "アメリカ・ブラジル・メキシコ",
      "カナダ・メキシコのみ",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "2026年ワールドカップに出場するチーム数は？",
    options: ["32チーム", "36チーム", "40チーム", "48チーム"],
    correct: 3,
  },
  {
    id: 4,
    question: "日本代表の監督は誰？（2025年現在）",
    options: ["森保一", "西野朗", "ハリルホジッチ", "岡田武史"],
    correct: 0,
  },
  {
    id: 5,
    question: "2026年W杯の決勝戦が行われるスタジアムがある都市は？",
    options: ["ロサンゼルス", "ニューヨーク", "メキシコシティ", "トロント"],
    correct: 1,
  },
  {
    id: 6,
    question: "W杯の歴代最多優勝国は？",
    options: ["ドイツ", "アルゼンチン", "イタリア", "ブラジル"],
    correct: 3,
  },
  {
    id: 7,
    question: "日本代表のユニフォームサプライヤーは？",
    options: ["ナイキ", "プーマ", "アディダス", "アンブロ"],
    correct: 2,
  },
  {
    id: 8,
    question: "2026年W杯の決勝トーナメントは何チームから行われる？",
    options: ["16チーム", "32チーム", "24チーム", "48チーム"],
    correct: 1,
  },
  {
    id: 9,
    question: "日本代表の愛称は？",
    options: [
      "サムライブルー",
      "ブルーサムライ",
      "ブレイブブロッサムズ",
      "ブルードラゴン",
    ],
    correct: 0,
  },
  {
    id: 10,
    question: "カタール大会で日本が破った強豪2カ国の組み合わせは？",
    options: [
      "フランス・スペイン",
      "ドイツ・スペイン",
      "ドイツ・ブラジル",
      "フランス・ドイツ",
    ],
    correct: 1,
  },
];
