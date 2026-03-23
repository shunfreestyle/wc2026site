"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */
type SquadPlayer = {
  name: string;
  nameJa: string;
  birthDate: string;
  age: number;
  height: number;
  weight: number;
  position: "GK" | "DF" | "MF" | "FW";
  club: string;
  note?: string;
  description: string;
  id?: string;
};

type AbsentPlayer = {
  nameJa: string;
  name: string;
  position: string;
  club: string;
  reason: string;
};

/* ──────────────────────────────────────────────
   親善試合（イギリス遠征）
   ────────────────────────────────────────────── */
const friendlyMatches = [
  {
    date: "3/28（土）",
    jst: "3/29（日）02:00 キックオフ",
    local: "17:00 GMT",
    opponent: "🏴󠁧󠁢󠁳󠁣󠁴󠁿 スコットランド",
    opponentEn: "Scotland",
    opponentFlag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    opponentLink: "/teams/scotland",
    venue: "ハムデン・パーク",
    city: "グラスゴー（スコットランド）",
    broadcast: "NHK総合 生中継 / U-NEXT配信",
    label: "キリンワールドチャレンジ 2026",
  },
  {
    date: "3/31（火）",
    jst: "4/1（水）03:45 キックオフ",
    local: "19:45 BST",
    opponent: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 イングランド",
    opponentEn: "England",
    opponentFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    opponentLink: "/teams/england",
    venue: "ウェンブリー・スタジアム",
    city: "ロンドン（イングランド）",
    broadcast: "NHK Eテレ 生中継 / U-NEXT配信",
    label: "キリンワールドチャレンジ 2026",
  },
];

/* ──────────────────────────────────────────────
   W杯グループステージ
   ────────────────────────────────────────────── */
const wcMatches = [
  {
    num: 10,
    date: "6/14（土）",
    jst: "6/15（日）05:00",
    local: "15:00 CDT",
    opponent: "🇳🇱 オランダ",
    opponentEn: "Netherlands",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "グループF 第1節",
  },
  {
    num: 33,
    date: "6/19（木）",
    jst: "6/20（金）13:00",
    local: "22:00 CST",
    opponent: "🇹🇳 チュニジア",
    opponentEn: "Tunisia",
    venue: "エスタディオ・BBVA",
    city: "モンテレイ（メキシコ）",
    label: "グループF 第2節",
  },
  {
    num: 57,
    date: "6/25（水）",
    jst: "6/26（木）08:00",
    local: "18:00 CDT",
    opponent: "🏳️ UEFAプレーオフB勝者",
    opponentEn: "UEFA Playoff B Winner",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "グループF 第3節",
  },
];

/* ──────────────────────────────────────────────
   招集メンバー 28名 – JFA公式 3月19日発表
   ────────────────────────────────────────────── */
const squad: SquadPlayer[] = [
  // ── GK (3) ──
  {
    name: "Tomoki Hayakawa",
    nameJa: "早川友基",
    birthDate: "2001-07-29",
    age: 24,
    height: 185,
    weight: 82,
    position: "GK",
    club: "鹿島アントラーズ",
    note: "Jリーグ正GK",
    description:
      "鹿島の守護神として急成長を遂げた若きGK。鋭い反射神経とハイボール処理の安定感が光り、ビルドアップにも貢献できる現代型キーパー。大舞台でのさらなる飛躍に期待。",
  },
  {
    name: "Keisuke Osako",
    nameJa: "大迫敬介",
    birthDate: "1999-07-28",
    age: 26,
    height: 187,
    weight: 82,
    position: "GK",
    club: "サンフレッチェ広島",
    description:
      "東京五輪世代の正GK候補として成長を続ける広島の守護神。安定感あるセービングとコーチングで最終ラインを統率。堅実なプレーでチームに安心感を与える。",
  },
  {
    name: "Zion Suzuki",
    nameJa: "鈴木彩艶",
    birthDate: "2002-08-21",
    age: 23,
    height: 190,
    weight: 88,
    position: "GK",
    club: "パルマ（イタリア）",
    note: "海外組GK",
    description:
      "190cmの長身とバネのような反射神経を兼ね備えた次世代の守護神。セリエAの舞台で日々揉まれ、世界レベルの経験値を積み上げている。PKストップの勝負強さは、大一番でも頼りになる存在。",
  },

  // ── DF (8) ──
  {
    name: "Shogo Taniguchi",
    nameJa: "谷口彰悟",
    birthDate: "1991-07-15",
    age: 34,
    height: 183,
    weight: 75,
    position: "DF",
    club: "シントトロイデン（ベルギー）",
    note: "ベテランCB",
    description:
      "カタールW杯でフル出場した経験豊富なCB。34歳になっても衰えない読みの鋭さとリーダーシップは、若手の多い守備陣の精神的支柱。大舞台を知る男の存在感は計り知れない。",
  },
  {
    name: "Go Watanabe",
    nameJa: "渡辺剛",
    birthDate: "1997-03-21",
    age: 29,
    height: 186,
    weight: 80,
    position: "DF",
    club: "フェイエノールト（オランダ）",
    note: "欧州組CB",
    description:
      "フェイエノールトで主力としてチャンピオンズリーグの舞台を経験。186cmの高さと強靭なフィジカルで空中戦を制し、対人守備の強度は欧州でも折り紙つき。",
  },
  {
    name: "Takehiro Tomiyasu",
    nameJa: "冨安健洋",
    birthDate: "1998-11-05",
    age: 27,
    height: 188,
    weight: 84,
    position: "DF",
    club: "アヤックス（オランダ）",
    note: "1年9ヶ月ぶり復帰",
    id: "japan-tomiyasu",
    description:
      "アーセナルからアヤックスへ移籍し、新天地で存在感を発揮。右SBでもCBでも完璧にこなす万能型DFが、1年9ヶ月ぶりに代表復帰。怪我を乗り越えた冨安の帰還は、日本の守備力を一段階引き上げる。",
  },
  {
    name: "Tomoya Ando",
    nameJa: "安藤智哉",
    birthDate: "2001-04-22",
    age: 24,
    height: 185,
    weight: 78,
    position: "DF",
    club: "ザンクトパウリ（ドイツ）",
    note: "新戦力",
    description:
      "ブンデスリーガ昇格組のザンクトパウリで定位置を掴んだ若手CB。スピードのある攻撃的な相手にも臆せず対峙できる対人守備の強さと、落ち着いたビルドアップが持ち味。",
  },
  {
    name: "Hiroki Ito",
    nameJa: "伊藤洋輝",
    birthDate: "1999-05-12",
    age: 27,
    height: 188,
    weight: 80,
    position: "DF",
    club: "バイエルン（ドイツ）",
    note: "ビッグクラブ所属",
    description:
      "バイエルン・ミュンヘンで勝者のメンタリティを身につけた左利きCB。正確な左足のロングフィードでビルドアップの起点にもなれる。世界最高峰のクラブで戦う経験が、代表でも大きな武器に。",
  },
  {
    name: "Ayumu Seko",
    nameJa: "瀬古歩夢",
    birthDate: "2000-06-07",
    age: 25,
    height: 183,
    weight: 74,
    position: "DF",
    club: "ル・アーヴル（フランス）",
    description:
      "フランス・リーグアンで揉まれたインテリジェンス系CB。冷静な判断力と正確なパスでDFラインからゲームを組み立てる。カバーリング能力の高さも魅力。",
  },
  {
    name: "Yukinari Sugawara",
    nameJa: "菅原由勢",
    birthDate: "2000-06-28",
    age: 25,
    height: 178,
    weight: 72,
    position: "DF",
    club: "ブレーメン（ドイツ）",
    description:
      "攻守にエネルギッシュな右サイドバック。果敢なオーバーラップからの正確なクロスが武器。ブンデスリーガで攻撃力に磨きをかけ、日本の右サイドに推進力をもたらす。",
  },
  {
    name: "Junnosuke Suzuki",
    nameJa: "鈴木淳之介",
    birthDate: "2003-10-17",
    age: 22,
    height: 180,
    weight: 73,
    position: "DF",
    club: "コペンハーゲン（デンマーク）",
    note: "若手抜擢",
    description:
      "デンマークの名門コペンハーゲンで10代からレギュラーを掴んだ逸材。左SBとしてのスピードと攻撃参加のセンスが光り、次世代の日本代表を担うサイドバック候補。",
  },

  // ── MF (9) ──
  {
    name: "Daichi Kamada",
    nameJa: "鎌田大地",
    birthDate: "1996-08-05",
    age: 29,
    height: 184,
    weight: 76,
    position: "MF",
    club: "クリスタルパレス（イングランド）",
    note: "司令塔",
    id: "japan-kamada",
    description:
      "広い視野と正確なスルーパスでゲームを支配するプレーメイカー。ヨーロッパリーグMVP受賞の実力は折り紙つき。ゴールも奪えるMFは、相手にとって最も厄介な存在。",
  },
  {
    name: "Kaoru Mitoma",
    nameJa: "三笘薫",
    birthDate: "1997-05-20",
    age: 28,
    height: 178,
    weight: 73,
    position: "MF",
    club: "ブライトン（イングランド）",
    note: "エース",
    id: "japan-mitoma",
    description:
      "「1mmの奇跡」でおなじみ、世界が恐れるドリブラー。緩急自在のステップで相手を置き去りにする姿はまさに芸術。筑波大学院で研究したドリブル理論を武器に、プレミアリーグで無双する知性派アタッカー。",
  },
  {
    name: "Ritsu Doan",
    nameJa: "堂安律",
    birthDate: "1998-06-16",
    age: 27,
    height: 172,
    weight: 70,
    position: "MF",
    club: "フランクフルト（ドイツ）",
    id: "japan-doan",
    description:
      "カタールW杯でドイツ戦・スペイン戦の両方でゴールを決めた大舞台の男。左足のカットインシュートは世界レベルの威力。フランクフルトで進化を続ける闘志の塊。",
  },
  {
    name: "Ao Tanaka",
    nameJa: "田中碧",
    birthDate: "1998-09-10",
    age: 27,
    height: 178,
    weight: 74,
    position: "MF",
    club: "リーズ・ユナイテッド（イングランド）",
    description:
      "カタールW杯のドイツ戦で試合を決定づけるゴールを記録した勝負師。ボックス・トゥ・ボックスで攻守をつなぎ、ここぞの場面で顔を出す。イングランドでたくましく成長中。",
  },
  {
    name: "Kaishu Sano",
    nameJa: "佐野海舟",
    birthDate: "2000-12-30",
    age: 25,
    height: 178,
    weight: 73,
    position: "MF",
    club: "マインツ（ドイツ）",
    description:
      "ボール奪取力に定評のある守備的MF。遠藤航不在の中盤で求められるアンカー役を担える逸材。ブンデスリーガで磨いた球際の強さとカバー範囲の広さがチームを支える。",
  },
  {
    name: "Yuito Suzuki",
    nameJa: "鈴木唯人",
    birthDate: "2001-08-26",
    age: 24,
    height: 176,
    weight: 68,
    position: "MF",
    club: "フライブルク（ドイツ）",
    description:
      "フライブルクで着実に出場機会を増やしている攻撃的MF。スピードのある仕掛けと正確なシュートが持ち味。ポテンシャルの高さは欧州スカウトも注目する次世代の星。",
  },
  {
    name: "Joel Chima Fujita",
    nameJa: "藤田譲瑠チマ",
    birthDate: "2002-02-16",
    age: 24,
    height: 181,
    weight: 74,
    position: "MF",
    club: "ザンクトパウリ（ドイツ）",
    description:
      "ナイジェリアにルーツを持つハイブリッドMF。フィジカルの強さとテクニックを兼ね備え、中盤で力強くボールを運べる推進力が魅力。ブンデスリーガで急成長中の期待株。",
  },
  {
    name: "Kodai Sano",
    nameJa: "佐野航大",
    birthDate: "2002-08-27",
    age: 23,
    height: 168,
    weight: 62,
    position: "MF",
    club: "NEC（オランダ）",
    description:
      "168cmと小柄ながら、抜群のテクニックとゲームメイク能力で中盤を支配する技巧派。オランダで磨いたパスセンスと視野の広さは、攻撃のリズムを生み出す鍵。",
  },
  {
    name: "Ryunosuke Sato",
    nameJa: "佐藤龍之介",
    birthDate: "2006-07-24",
    age: 19,
    height: 174,
    weight: 64,
    position: "MF",
    club: "FC東京",
    note: "最年少・19歳",
    description:
      "19歳にしてA代表に招集された超新星。FC東京のアカデミーが生んだ天才肌のMFで、狭いスペースでもボールを失わない技術と創造性は、将来の日本代表の中心になれる才能。",
  },

  // ── FW (8) ──
  {
    name: "Junya Ito",
    nameJa: "伊東純也",
    birthDate: "1993-03-09",
    age: 33,
    height: 176,
    weight: 73,
    position: "FW",
    club: "ゲンク（ベルギー）",
    id: "japan-ito",
    description:
      "日本最速のスピードスターが右サイドを切り裂く。33歳になっても衰えないスプリント力と精度の高いクロスは、相手ディフェンスにとって最大の脅威。ベルギーの地で輝き続ける不屈のウインガー。",
  },
  {
    name: "Koki Ogawa",
    nameJa: "小川航基",
    birthDate: "1997-08-08",
    age: 28,
    height: 186,
    weight: 78,
    position: "FW",
    club: "NEC（オランダ）",
    note: "得点ランク上位",
    description:
      "エールディヴィジで得点ランキング上位に名を連ねる和製ターゲットマン。186cmの高さと足元の技術を兼ね備え、日本に不足していた「高さの基準点」になれる逸材。ヘディングの強さは圧巻。",
  },
  {
    name: "Daizen Maeda",
    nameJa: "前田大然",
    birthDate: "1997-10-20",
    age: 28,
    height: 173,
    weight: 67,
    position: "FW",
    club: "セルティック（スコットランド）",
    description:
      "圧倒的な運動量と前線からの激しいプレスで相手に休む暇を与えない「走る槍」。セルティックで磨いた献身的なプレーはチーム戦術の根幹。スコットランド戦では敵地の英雄として凱旋する。",
  },
  {
    name: "Ayase Ueda",
    nameJa: "上田綺世",
    birthDate: "1998-08-28",
    age: 27,
    height: 182,
    weight: 76,
    position: "FW",
    club: "フェイエノールト（オランダ）",
    note: "ストライカー",
    id: "japan-ueda",
    description:
      "エールディヴィジで得点を量産するストライカー。ゴール前での嗅覚と力強いシュートは欧州でも通用する本物の決定力。W杯でのブレイクを予感させる日本のエースFW候補。",
  },
  {
    name: "Shuto Machino",
    nameJa: "町野修斗",
    birthDate: "1999-09-30",
    age: 26,
    height: 185,
    weight: 77,
    position: "FW",
    club: "ボルシアMG（ドイツ）",
    description:
      "ブンデスリーガのボルシアMGで出場機会を掴んだ万能型FW。ポストプレーから裏抜けまでこなせる器用さが武器。日本の前線に新たな選択肢を与える頼れるストライカー。",
  },
  {
    name: "Keito Nakamura",
    nameJa: "中村敬斗",
    birthDate: "2000-07-28",
    age: 25,
    height: 175,
    weight: 68,
    position: "FW",
    club: "ランス（フランス）",
    description:
      "フランス・リーグアンで結果を出し続ける左利きのアタッカー。カットインからの強烈なシュートと、サイドを突破するスピードが持ち味。三笘との左サイドコンビは脅威。",
  },
  {
    name: "Kento Shiogai",
    nameJa: "塩貝健人",
    birthDate: "2003-12-04",
    age: 22,
    height: 175,
    weight: 70,
    position: "FW",
    club: "ヴォルフスブルク（ドイツ）",
    note: "初招集",
    description:
      "ブンデスリーガの名門ヴォルフスブルクでチャンスを掴んだ若手アタッカー。スピードと得点感覚を兼ね備え、ドイツの舞台で急成長中。将来のエース候補として要注目。",
  },
  {
    name: "Keisuke Goto",
    nameJa: "後藤啓介",
    birthDate: "2005-10-16",
    age: 20,
    height: 190,
    weight: 82,
    position: "FW",
    club: "シントトロイデン（ベルギー）",
    note: "190cm・20歳",
    description:
      "190cmの長身にスピードとテクニックを兼ね備えた超大型ストライカー。わずか20歳にしてベルギーリーグで結果を残し、日本サッカーの未来を背負う逸材。ポテンシャルは計り知れない。",
  },
];

/* ──────────────────────────────────────────────
   招集外の注目選手
   ────────────────────────────────────────────── */
const absentPlayers: AbsentPlayer[] = [
  {
    nameJa: "遠藤航",
    name: "Wataru Endo",
    position: "MF",
    club: "リバプール（イングランド）",
    reason: "日本代表キャプテン。今回はコンディション調整のため招集外。リバプールでの出場機会確保が最優先課題",
  },
  {
    nameJa: "久保建英",
    name: "Takefusa Kubo",
    position: "MF",
    club: "レアル・ソシエダ（スペイン）",
    reason: "ラ・リーガで奮闘中のファンタジスタ。今回は招集外だがW杯本大会での活躍に期待",
  },
  {
    nameJa: "守田英正",
    name: "Hidemasa Morita",
    position: "MF",
    club: "スポルティング（ポルトガル）",
    reason: "ポルトガルの名門で中盤の要として活躍。コンディション面を考慮し今回は招集外",
  },
  {
    nameJa: "板倉滉",
    name: "Ko Itakura",
    position: "DF",
    club: "ボルシアMG（ドイツ）",
    reason: "ブンデスリーガで安定したパフォーマンスを発揮するCB。今回はメンバー外も実力は折り紙つき",
  },
  {
    nameJa: "南野拓実",
    name: "Takumi Minamino",
    position: "FW",
    club: "ASモナコ（フランス）",
    reason: "リバプールでプレミア優勝を経験した実績の持ち主。代表での巻き返しに期待",
  },
  {
    nameJa: "古橋亨梧",
    name: "Kyogo Furuhashi",
    position: "FW",
    club: "セルティック（スコットランド）",
    reason: "スコティッシュ・プレミアの得点王経験者。圧巻のゴール嗅覚を持つが今回は招集外",
  },
];

/* ──────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────── */
const posLabel: Record<string, string> = {
  GK: "ゴールキーパー",
  DF: "ディフェンダー",
  MF: "ミッドフィルダー",
  FW: "フォワード",
};
const posColor: Record<string, string> = {
  GK: "from-amber-500 to-amber-600",
  DF: "from-blue-500 to-blue-600",
  MF: "from-emerald-500 to-emerald-600",
  FW: "from-red-500 to-rose-600",
};
const posBorder: Record<string, string> = {
  GK: "border-amber-400",
  DF: "border-blue-400",
  MF: "border-emerald-400",
  FW: "border-red-400",
};

function groupByPosition(players: SquadPlayer[]) {
  const order: Array<"GK" | "DF" | "MF" | "FW"> = ["GK", "DF", "MF", "FW"];
  return order.map((pos) => ({
    pos,
    label: posLabel[pos],
    players: players.filter((p) => p.position === pos),
  }));
}

const featuredIds = ["japan-mitoma", "japan-tomiyasu", "japan-kamada"];

const opponentCards = [
  {
    key: "scotland",
    color: "#003F87",
    flag: "🏴",
    name: "スコットランド",
    time: "3/29（日）02:00（日本時間）",
    venue: "ハムデン・パーク（グラスゴー）",
    badge: "メンバー発表済み（26名）",
    footer: "監督：スティーブ・クラーク | 注目選手：マクトミネイ、ロバートソン、マクギン",
    href: "/japan/opponents/scotland",
    cta: "スコットランド詳細 →",
  },
  {
    key: "england",
    color: "#CF2B37",
    flag: "🏴",
    name: "イングランド",
    time: "4/1（水）03:45（日本時間）",
    venue: "ウェンブリー・スタジアム（ロンドン）",
    badge: "メンバー発表済み（35名）",
    footer: "監督：トーマス・トゥヘル | 注目選手：ケイン、ベリンガム、サカ",
    href: "/japan/opponents/england",
    cta: "イングランド詳細 →",
  },
];

/* ──────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────── */
export default function JapanPage() {
  const { t } = useLanguage();
  const featured = squad.filter((p) => p.id && featuredIds.includes(p.id));
  const grouped = groupByPosition(squad);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #001845 0%, #003087 40%, #002266 70%, #001845 100%)",
          }}
        />
        {/* 日の丸装飾 */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #BC002D 0%, #BC002D 35%, transparent 36%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, #BC002D 0%, #BC002D 35%, transparent 36%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, #fff 20px, #fff 21px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm border border-white/20">
              Group F — FIFA World Cup 2026
            </span>
          </div>
          <p className="text-5xl mb-3">🇯🇵</p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-2">
            SAMURAI BLUE
          </h1>
          <p className="text-xl sm:text-2xl font-light tracking-wide text-blue-200 mb-1">
            {t.japan.pageTitle} イギリス遠征
          </p>
          <p className="text-sm text-blue-300/80 mb-8">
            監督：森保一 ｜ FIFAランキング：18位 ｜ W杯出場：7大会連続7回目
          </p>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#BC002D]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#BC002D]" />
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#BC002D]" />
          </div>

          <p className="max-w-2xl mx-auto text-blue-100/80 text-sm sm:text-base leading-relaxed mb-8">
            2022年カタール大会ではドイツ・スペインを撃破し世界を驚かせたSAMURAI BLUE。
            W杯本大会前最後の欧州遠征で、スコットランド・イングランドという強豪に挑む。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/japan/matches"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              📊 試合結果（直近10試合）
            </Link>
            <Link
              href="/teams/japan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              📋 チーム詳細ページ
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          イギリス遠征 親善試合
          ═══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-8 rounded-full"
            style={{ background: "#BC002D" }}
          />
          イギリス遠征 親善試合
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          キリンワールドチャレンジ 2026 — W杯前最後の欧州テストマッチ
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {friendlyMatches.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-[#003087]/20 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div
                className="px-4 py-2 text-white text-sm font-bold"
                style={{ background: "linear-gradient(90deg, #003087, #001845)" }}
              >
                {m.label}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <p className="text-2xl mb-1">🇯🇵</p>
                    <p className="text-sm font-bold text-gray-900">日本</p>
                  </div>
                  <div className="px-4 text-center">
                    <p className="text-lg font-black text-gray-300">VS</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-2xl mb-1">{m.opponent.split(" ")[0]}</p>
                    <p className="text-sm font-bold text-gray-900">
                      {m.opponent.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-gray-500 border-t pt-3">
                  <p>📅 現地：{m.date} {m.local}</p>
                  <p className="font-semibold text-[#BC002D] text-sm">
                    🇯🇵 日本時間：{m.jst}
                  </p>
                  <p>🏟️ {m.venue}（{m.city}）</p>
                  <p>📺 {m.broadcast}</p>
                </div>
                <div className="border-t pt-3 mt-3">
                  <p className="text-xs text-gray-400 font-medium mb-2">メンバーを確認</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href="/japan#squad"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#003087]/10 text-[#003087] text-xs font-bold hover:bg-[#003087]/20 transition-colors"
                    >
                      🇯🇵 日本代表メンバー
                    </Link>
                    <Link
                      href={m.opponentLink}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      {m.opponentFlag} {m.opponent.split(" ").slice(1).join(" ")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          W杯グループステージ
          ═══════════════════════════════════════ */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-8 rounded-full"
              style={{ background: "#003087" }}
            />
            W杯グループステージ日程
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {t.japan.groupLabel} — オランダ、日本、チュニジア、UEFAプレーオフB勝者
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {wcMatches.map((m) => (
              <div
                key={m.num}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div
                  className="px-4 py-2 text-white text-sm font-bold flex items-center justify-between"
                  style={{ background: "#003087" }}
                >
                  <span>{m.label}</span>
                  <span className="text-blue-200 text-xs">Match #{m.num}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-center flex-1">
                      <p className="text-2xl mb-1">🇯🇵</p>
                      <p className="text-sm font-bold text-gray-900">日本</p>
                    </div>
                    <div className="px-4 text-center">
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">VS</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-2xl mb-1">{m.opponent.split(" ")[0]}</p>
                      <p className="text-sm font-bold text-gray-900">
                        {m.opponent.split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-500 border-t pt-3">
                    <p>📅 現地：{m.date} {m.local}</p>
                    <p className="font-semibold text-[#BC002D]">
                      🇯🇵 日本時間：{m.jst}
                    </p>
                    <p>🏟️ {m.venue}（{m.city}）</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED PLAYERS
          ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #001845, #003087)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, #fff 40px, #fff 41px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
            <span
              className="inline-block w-1.5 h-8 rounded-full"
              style={{ background: "#BC002D" }}
            />
            {t.japan.featuredPlayers}
          </h2>
          <p className="text-sm text-blue-200/70 mb-8">
            イギリス遠征で日本の命運を握るキープレーヤー
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {featured.map((p) => (
              <div
                key={p.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-6 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold text-white bg-gradient-to-r ${posColor[p.position]}`}
                    >
                      {p.position}
                    </span>
                    {p.note && (
                      <span className="ml-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#BC002D] text-white">
                        {p.note}
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-0.5">
                  {p.nameJa}
                </h3>
                <p className="text-sm text-blue-200/70 mb-3">{p.name}</p>
                <p className="text-sm text-blue-100/80 leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-200/70">
                  <p>🏢 {p.club}</p>
                  <p>📏 {p.height}cm / {p.weight}kg</p>
                  <p>🎂 {p.birthDate}（{p.age}歳）</p>
                  <p>
                    {p.id ? (
                      <Link
                        href={`/players/${p.id}`}
                        className="text-amber-300 hover:text-amber-200 underline underline-offset-2"
                      >
                        詳細プロフィール →
                      </Link>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OPPONENT CARDS
          ═══════════════════════════════════════ */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-8 rounded-full bg-[#003087]" />
            対戦国メンバー情報
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            対戦カードから詳細ページへ移動できます
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {opponentCards.map((card) => (
              <div key={card.key} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex">
                  <div className="w-1.5 shrink-0" style={{ background: card.color }} />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {card.flag} {card.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">📅 {card.time}</p>
                        <p className="text-xs text-gray-500">🏟️ {card.venue}</p>
                      </div>
                      <span className="inline-block px-2 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700">
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-4">{card.footer}</p>
                    <div className="text-right">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-1 text-sm font-bold hover:opacity-80 transition-opacity"
                        style={{ color: card.color }}
                      >
                        {card.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FULL SQUAD
          ═══════════════════════════════════════ */}
      <section id="squad" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-8 rounded-full"
            style={{ background: "#003087" }}
          />
          {t.japan.fullSquad}
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          JFA公式発表 3月19日 — 28名（GK 3名 / DF 8名 / MF 9名 / FW 8名）
        </p>

        {grouped.map((g) => (
          <div key={g.pos} className="mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span
                className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${posColor[g.pos]}`}
              >
                {g.pos}
              </span>
              {g.label}
              <span className="text-gray-400 font-normal text-sm">
                （{g.players.length}名）
              </span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.players.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl border-l-4 ${posBorder[p.position]} bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">
                          {p.nameJa}
                        </h4>
                        <p className="text-xs text-gray-400">{p.name}</p>
                      </div>
                      {p.note && (
                        <span className="ml-2 shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#BC002D]/10 text-[#BC002D]">
                          {p.note}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500 mb-3 border-t border-gray-100 pt-3">
                      <p>
                        <span className="text-gray-400">生年月日</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.birthDate}（{p.age}歳）
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">{t.japan.stats.height} / 体重</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.height}cm / {p.weight}kg
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">ポジション</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {posLabel[p.position]}
                        </span>
                      </p>
                      <p>
                        <span className="text-gray-400">{t.japan.stats.club}</span>
                        <br />
                        <span className="text-gray-700 font-medium">
                          {p.club}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
                    {p.id && (
                      <div className="mt-3">
                        <Link
                          href={`/players/${p.id}`}
                          className="text-xs text-[#003087] hover:text-[#BC002D] font-medium underline underline-offset-2 transition-colors"
                        >
                          選手詳細ページへ →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════════════
          ABSENT PLAYERS
          ═══════════════════════════════════════ */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="inline-block w-1.5 h-8 rounded-full bg-gray-400" />
            招集外の注目選手
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            今回の招集メンバーには選ばれなかったが注目すべき選手たち
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {absentPlayers.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl bg-white border border-gray-200 p-5 opacity-80 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-800">{p.nameJa}</h4>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {p.position}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{p.name}</p>
                <p className="text-xs text-gray-500 mb-2">🏢 {p.club}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {p.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER CTA
          ═══════════════════════════════════════ */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            チーム全体の情報・過去の成績はこちら
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/teams/japan"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
              style={{ background: "#003087" }}
            >
              🇯🇵 日本代表チームページ
            </Link>
            <Link
              href="/teams"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              全48チーム一覧
            </Link>
            <Link
              href="/matches"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              全試合日程
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
