/**
 * 日本代表 招集メンバー 28名 – JFA公式 3月19日発表
 * イギリス遠征（vs スコットランド / vs イングランド）
 */

export type JapanSquadPlayer = {
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

export const japanSquad2026March: JapanSquadPlayer[] = [
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
    id: "japan-watanabe",
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
    id: "japan-ando",
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
    id: "japan-seko",
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
    id: "japan-suzuki-j",
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
    id: "japan-sato-r",
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
