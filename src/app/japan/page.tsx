import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🇯🇵 日本代表 SAMURAI BLUE | FIFA World Cup 2026",
  description:
    "2026 FIFAワールドカップ 日本代表（SAMURAI BLUE）特設ページ。グループF 試合日程・注目選手・招集メンバー一覧。",
};

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
  id?: string; // links to /players/{id}
};

type AbsentPlayer = {
  nameJa: string;
  name: string;
  position: string;
  club: string;
  reason: string;
};

/* ──────────────────────────────────────────────
   Match data
   ────────────────────────────────────────────── */
const matches = [
  {
    num: 1,
    date: "6/14（土）",
    jst: "6/15（日）05:00",
    local: "15:00 CDT",
    opponent: "🇳🇱 オランダ",
    opponentEn: "Netherlands",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "第1節",
  },
  {
    num: 2,
    date: "6/19（木）",
    jst: "6/20（金）13:00",
    local: "22:00 CST",
    opponent: "🇹🇳 チュニジア",
    opponentEn: "Tunisia",
    venue: "エスタディオ・BBVA",
    city: "モンテレイ（メキシコ）",
    label: "第2節",
  },
  {
    num: 3,
    date: "6/25（水）",
    jst: "6/26（木）08:00",
    local: "18:00 CDT",
    opponent: "🏳️ UEFAプレーオフB勝者",
    opponentEn: "UEFA Playoff B Winner",
    venue: "AT&Tスタジアム",
    city: "ダラス（アメリカ）",
    label: "第3節",
  },
];

/* ──────────────────────────────────────────────
   Squad data – 26 players
   ────────────────────────────────────────────── */
const squad: SquadPlayer[] = [
  // ── GK ──
  {
    name: "Zion Suzuki",
    nameJa: "鈴木彩艶",
    birthDate: "2002-08-21",
    age: 23,
    height: 190,
    weight: 88,
    position: "GK",
    club: "パルマ（イタリア）",
    note: "正GK候補",
    description:
      "190cmの長身とバネのような反射神経を兼ね備えた次世代の守護神。セリエAで揉まれた経験値は本物。PKストップの勝負強さは、きっとW杯でも頼りになるはず。",
  },
  {
    name: "Shuichi Gonda",
    nameJa: "権田修一",
    birthDate: "1989-03-03",
    age: 37,
    height: 187,
    weight: 83,
    position: "GK",
    club: "清水エスパルス",
    note: "ベテラン",
    id: "japan-gonda",
    description:
      "カタールW杯でスペイン戦の歴史的勝利を支えたベテラン守護神。37歳になっても衰えないセーブ力と、チームを落ち着かせる存在感は唯一無二。",
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
      "安定感あるセービングとコーチングが持ち味。東京五輪世代のGKとして成長を続ける広島の守護神。大舞台での経験を糧にさらなる飛躍を目指す。",
  },

  // ── DF ──
  {
    name: "Takehiro Tomiyasu",
    nameJa: "冨安健洋",
    birthDate: "1998-11-05",
    age: 27,
    height: 188,
    weight: 84,
    position: "DF",
    club: "アーセナル（イングランド）",
    note: "注目選手",
    id: "japan-tomiyasu",
    description:
      "プレミアリーグの猛者たちを封殺するディフェンス力。右SBでもCBでも完璧にこなす万能型で、アーセナルでの経験が日本の守備に圧倒的な安定をもたらす。",
  },
  {
    name: "Ko Itakura",
    nameJa: "板倉滉",
    birthDate: "1997-01-27",
    age: 29,
    height: 186,
    weight: 79,
    position: "DF",
    club: "ボルシアMG（ドイツ）",
    id: "japan-itakura",
    description:
      "空中戦の強さとビルドアップのうまさを兼ね備えたCBの柱。ブンデスリーガで鍛えた読みの鋭さで、相手の攻撃を未然に防ぐ頭脳派ディフェンダー。",
  },
  {
    name: "Hiroki Machida",
    nameJa: "町田浩樹",
    birthDate: "1997-08-25",
    age: 28,
    height: 190,
    weight: 80,
    position: "DF",
    club: "ユニオンSG（ベルギー）",
    note: "急成長",
    description:
      "190cmの長身を活かした空中戦の強さはチーム随一。ベルギーリーグで一気に開花し、代表でも不動のレギュラーに。左利きCBという希少価値も魅力。",
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
      "バイエルン・ミュンヘンで勝者のメンタリティを身につけた左利きCB。正確な左足のロングフィードでビルドアップの起点にもなれる現代型ディフェンダー。",
  },
  {
    name: "Yukinari Sugawara",
    nameJa: "菅原由勢",
    birthDate: "2000-06-28",
    age: 25,
    height: 178,
    weight: 72,
    position: "DF",
    club: "サウサンプトン（イングランド）",
    description:
      "攻守にエネルギッシュな右サイドバック。果敢なオーバーラップからの正確なクロスが武器。若くしてプレミアリーグで戦う経験が、プレーに説得力を加えている。",
  },
  {
    name: "Miki Yamane",
    nameJa: "山根未来",
    birthDate: "1993-12-22",
    age: 32,
    height: 178,
    weight: 72,
    position: "DF",
    club: "川崎フロンターレ",
    description:
      "圧倒的な走力で右サイドを何度も上下動するダイナモ。Jリーグで磨いた献身的な守備と攻撃参加のバランスの良さが光るベテランSB。",
  },
  {
    name: "Shogo Taniguchi",
    nameJa: "谷口彰悟",
    birthDate: "1991-07-15",
    age: 34,
    height: 183,
    weight: 75,
    position: "DF",
    club: "シント＝トロイデン（ベルギー）",
    note: "ベテラン・最終選考",
    description:
      "カタールW杯でもフル出場した経験豊富なCB。チームを統率するリーダーシップと冷静な判断力は、若手の多い守備陣の精神的支柱。",
  },
  {
    name: "Yuya Hashioka",
    nameJa: "橋岡大樹",
    birthDate: "1999-05-17",
    age: 27,
    height: 182,
    weight: 74,
    position: "DF",
    club: "ルートン・タウン（イングランド）",
    description:
      "スピードとフィジカルを活かしたダイナミックな右SB。高い位置からの守備と攻撃参加のバランスに優れ、対人守備の強度はチーム屈指。",
  },

  // ── MF ──
  {
    name: "Wataru Endo",
    nameJa: "遠藤航",
    birthDate: "1993-02-09",
    age: 33,
    height: 178,
    weight: 76,
    position: "MF",
    club: "リバプール（イングランド）",
    note: "キャプテン",
    id: "japan-endo",
    description:
      "「デュエル王」の異名は伊達じゃない。ブンデスリーガで3年連続デュエル数1位を記録し、リバプールでも中盤の番人として君臨。日本の心臓であり魂であるキャプテン。",
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
    note: "注目選手・エース",
    id: "japan-mitoma",
    description:
      "「1mmの奇跡」でおなじみ、世界が恐れるドリブラー。緩急自在のステップで相手を置き去りにする姿はまさに芸術。筑波大学院で研究したドリブル理論を武器に、プレミアリーグで無双する知性派アタッカー。",
  },
  {
    name: "Takefusa Kubo",
    nameJa: "久保建英",
    birthDate: "2001-06-04",
    age: 24,
    height: 173,
    weight: 67,
    position: "MF",
    club: "レアル・ソシエダ（スペイン）",
    note: "注目選手",
    id: "japan-kubo",
    description:
      "かつて「日本のメッシ」と呼ばれた天才少年は、ラ・リーガで本物の才能を証明した。繊細なボールタッチと創造性あふれるプレーは、見ているだけでワクワクする。24歳にして迎える初のW杯が楽しみでならない。",
  },
  {
    name: "Ritsu Doan",
    nameJa: "堂安律",
    birthDate: "1998-06-16",
    age: 27,
    height: 172,
    weight: 70,
    position: "MF",
    club: "フライブルク（ドイツ）",
    id: "japan-doan",
    description:
      "カタールW杯でドイツ戦・スペイン戦の両方でゴールを決めた大舞台の男。左足のカットインシュートは世界レベルの威力。逆境でこそ力を発揮する闘志の塊。",
  },
  {
    name: "Daichi Kamada",
    nameJa: "鎌田大地",
    birthDate: "1996-08-05",
    age: 29,
    height: 184,
    weight: 76,
    position: "MF",
    club: "クリスタルパレス（イングランド）",
    id: "japan-kamada",
    description:
      "広い視野と正確なスルーパスでゲームを支配するプレーメイカー。ヨーロッパリーグMVP受賞の実力は折り紙つき。ゴールも奪えるMFは相手にとって最も厄介な存在。",
  },
  {
    name: "Hidemasa Morita",
    nameJa: "守田英正",
    birthDate: "1995-05-10",
    age: 31,
    height: 177,
    weight: 74,
    position: "MF",
    club: "スポルティング（ポルトガル）",
    description:
      "ボール奪取力とパスセンスを高次元で両立する万能型ボランチ。遠藤航との中盤コンビは世界と戦える強度と知性を備えた日本の生命線。",
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
      "カタールW杯のドイツ戦で試合を決定づけるゴールを記録。ボックス・トゥ・ボックスで攻守を支え、ここぞの場面で顔を出す勝負師。イングランドでたくましく成長中。",
  },
  {
    name: "Reo Hatate",
    nameJa: "旗手怜央",
    birthDate: "1997-11-21",
    age: 28,
    height: 175,
    weight: 68,
    position: "MF",
    club: "セルティック（スコットランド）",
    description:
      "セルティックでチャンピオンズリーグの舞台を経験し、インテンシティの高いプレーに磨きをかけた。左右両足を使えるユーティリティ性も魅力の技巧派MF。",
  },

  // ── FW ──
  {
    name: "Junya Ito",
    nameJa: "伊東純也",
    birthDate: "1993-03-09",
    age: 33,
    height: 176,
    weight: 73,
    position: "FW",
    club: "スタッド・ランス（フランス）",
    id: "japan-ito",
    description:
      "日本最速のスピードスターがW杯の舞台でも右サイドを切り裂く。33歳になっても衰えないスプリント力と、精度の高いクロスは日本の最大の武器のひとつ。",
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
      "エールディヴィジで得点を量産するストライカー。ゴール前での嗅覚と力強いシュートは欧州でも通用する本物の決定力。W杯でのブレイクを予感させる点取り屋。",
  },
  {
    name: "Kyogo Furuhashi",
    nameJa: "古橋亨梧",
    birthDate: "1995-01-20",
    age: 31,
    height: 170,
    weight: 63,
    position: "FW",
    club: "セルティック（スコットランド）",
    description:
      "小柄ながら抜群のスピードと動き出しでゴールを量産するスコティッシュ・プレミアの得点王。裏への飛び出しは天下一品。見逃し厳禁のゴールハンター。",
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
      "圧倒的な運動量と前線からのプレスで相手に休む暇を与えない「走る槍」。セルティックで磨いた献身的なプレーは、チーム戦術の根幹を支える存在。",
  },
  {
    name: "Takumi Minamino",
    nameJa: "南野拓実",
    birthDate: "1995-01-16",
    age: 31,
    height: 174,
    weight: 68,
    position: "FW",
    club: "ASモナコ（フランス）",
    description:
      "リバプールでプレミアリーグ優勝を経験した実績の持ち主。テクニカルなプレーと決定力を併せ持ち、ここぞという場面で仕事ができるビッグマッチプレーヤー。",
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
      "エールディヴィジで得点ランキング上位に名を連ねる和製ターゲットマン。186cmの高さと足元の技術を兼ね備え、日本に不足していた「高さの基準点」になれる逸材。",
  },
];

/* ──────────────────────────────────────────────
   招集外の注目選手
   ────────────────────────────────────────────── */
const absentPlayers: AbsentPlayer[] = [
  {
    nameJa: "吉田麻也",
    name: "Maya Yoshida",
    position: "DF",
    club: "LAギャラクシー（アメリカ）",
    reason: "年齢を考慮し招集外。ただし精神的支柱として帯同の可能性",
  },
  {
    nameJa: "長友佑都",
    name: "Yuto Nagatomo",
    position: "DF",
    club: "FC東京",
    reason: "39歳。W杯4大会出場のレジェンド、代表引退済み",
  },
  {
    nameJa: "大迫勇也",
    name: "Yuya Osako",
    position: "FW",
    club: "ヴィッセル神戸",
    reason: "Jリーグでは健在だが代表からは遠ざかっている",
  },
  {
    nameJa: "柴崎岳",
    name: "Gaku Shibasaki",
    position: "MF",
    club: "レガネス（スペイン）",
    reason: "近年の代表招集なし。ロシアW杯での活躍が記憶に残る",
  },
  {
    nameJa: "浅野拓磨",
    name: "Takuma Asano",
    position: "FW",
    club: "マジョルカ（スペイン）",
    reason: "カタールW杯のドイツ戦ゴールで一躍ヒーローに。コンディション次第で復帰の可能性あり",
  },
  {
    nameJa: "中村敬斗",
    name: "Keito Nakamura",
    position: "FW",
    club: "スタッド・ランス（フランス）",
    reason: "怪我からの復帰途上。完全復調すれば招集の可能性大",
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

const featuredIds = ["japan-mitoma", "japan-kubo", "japan-tomiyasu"];

/* ──────────────────────────────────────────────
   Page Component
   ────────────────────────────────────────────── */
export default function JapanPage() {
  const featured = squad.filter((p) => p.id && featuredIds.includes(p.id));
  const grouped = groupByPosition(squad);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden text-white">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #001845 0%, #003087 40%, #002266 70%, #001845 100%)",
          }}
        />
        {/* 日の丸の装飾 */}
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
        {/* Subtle pattern */}
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
            日本代表
          </p>
          <p className="text-sm text-blue-300/80 mb-8">
            監督：森保一 ｜ FIFAランキング：18位 ｜ W杯出場：7大会連続7回目
          </p>

          {/* Accent line */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#BC002D]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#BC002D]" />
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#BC002D]" />
          </div>

          <p className="max-w-2xl mx-auto text-blue-100/80 text-sm sm:text-base leading-relaxed">
            2022年カタール大会ではドイツ・スペインを撃破し世界を驚かせたSAMURAI BLUE。
            悲願のベスト8以上を目指し、北米の地で新たな歴史を刻む。
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MATCH SCHEDULE
          ═══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-8 rounded-full"
            style={{ background: "#003087" }}
          />
          グループステージ日程
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          グループF — オランダ、日本、チュニジア、UEFAプレーオフB勝者
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {matches.map((m) => (
            <div
              key={m.num}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div
                className="px-4 py-2 text-white text-sm font-bold flex items-center justify-between"
                style={{ background: "#003087" }}
              >
                <span>{m.label}</span>
                <span className="text-blue-200 text-xs">Match #{m.num === 1 ? 10 : m.num === 2 ? 33 : 57}</span>
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
                  <p>
                    📅 現地：{m.date} {m.local}
                  </p>
                  <p className="font-semibold text-[#BC002D]">
                    🇯🇵 日本時間：{m.jst}
                  </p>
                  <p>🏟️ {m.venue}（{m.city}）</p>
                </div>
              </div>
            </div>
          ))}
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
            注目選手ピックアップ
          </h2>
          <p className="text-sm text-blue-200/70 mb-8">
            W杯で日本の命運を握るキープレーヤー
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
          FULL SQUAD
          ═══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-8 rounded-full"
            style={{ background: "#003087" }}
          />
          招集メンバー一覧
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          26名（GK 3名 / DF 8名 / MF 8名 / FW 7名）
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
                        <span className="text-gray-400">身長 / 体重</span>
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
                        <span className="text-gray-400">所属クラブ</span>
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
