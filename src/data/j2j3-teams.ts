/**
 * J2・J3百年構想リーグ 2026シーズン チームデータ
 * 出典: Jリーグ公式サイト (jleague.jp) / 各クラブ公式サイト
 *
 * 2026年 明治安田J2・J3百年構想リーグ
 * EAST-A 10クラブ / EAST-B 10クラブ / WEST-A 10クラブ / WEST-B 10クラブ
 */

export type J2J3Team = {
  id: string;
  shortName: string;
  fullName: string;
  fullNameEn: string;
  prefecture: string;
  city: string;
  founded: number;
  stadium: string;
  stadiumCapacity: number;
  manager: string;
  color: string;
  colorSecondary: string;
  division: "EAST-A" | "EAST-B" | "WEST-A" | "WEST-B";
  officialUrl: string;
  officialTwitter: string;
};

export const j2j3Teams: J2J3Team[] = [
  // ── EAST-A ──────────────────────────────────────
  { id: "sendai", shortName: "仙台", fullName: "ベガルタ仙台", fullNameEn: "Vegalta Sendai", prefecture: "宮城県", city: "仙台市", founded: 1988, stadium: "ユアテックスタジアム仙台", stadiumCapacity: 19526, manager: "森山 佳郎", color: "#FFF100", colorSecondary: "#00479D", division: "EAST-A", officialUrl: "https://www.vegalta.co.jp/", officialTwitter: "https://x.com/vega_official_" },
  { id: "yamagata", shortName: "山形", fullName: "モンテディオ山形", fullNameEn: "Montedio Yamagata", prefecture: "山形県", city: "天童市", founded: 1984, stadium: "NDソフトスタジアム山形", stadiumCapacity: 20638, manager: "横内 昭展", color: "#0068B7", colorSecondary: "#FFFFFF", division: "EAST-A", officialUrl: "https://www.montedioyamagata.jp/", officialTwitter: "https://x.com/monte_prstaff" },
  { id: "akita", shortName: "秋田", fullName: "ブラウブリッツ秋田", fullNameEn: "Blaublitz Akita", prefecture: "秋田県", city: "秋田市", founded: 1965, stadium: "ソユースタジアム", stadiumCapacity: 18560, manager: "吉田 謙", color: "#0068B7", colorSecondary: "#FFFFFF", division: "EAST-A", officialUrl: "https://blaublitz.jp/", officialTwitter: "https://x.com/blaublitz_akita" },
  { id: "gunma", shortName: "群馬", fullName: "ザスパ群馬", fullNameEn: "Thespa Gunma", prefecture: "群馬県", city: "前橋市", founded: 1995, stadium: "正田醤油スタジアム群馬", stadiumCapacity: 15190, manager: "沖田 優", color: "#FFFFFF", colorSecondary: "#005BAC", division: "EAST-A", officialUrl: "https://www.thespa.co.jp/", officialTwitter: "https://x.com/OfficialThespa" },
  { id: "sagamihara", shortName: "相模原", fullName: "SC相模原", fullNameEn: "SC Sagamihara", prefecture: "神奈川県", city: "相模原市", founded: 2008, stadium: "相模原ギオンスタジアム", stadiumCapacity: 6259, manager: "シュタルフ 悠紀 リヒャルト", color: "#006934", colorSecondary: "#000000", division: "EAST-A", officialUrl: "https://www.scsagamihara.com/", officialTwitter: "https://x.com/sc_sagamihara" },
  { id: "yokohamafc", shortName: "横浜FC", fullName: "横浜FC", fullNameEn: "Yokohama FC", prefecture: "神奈川県", city: "横浜市", founded: 1998, stadium: "ニッパツ三ツ沢球技場", stadiumCapacity: 15442, manager: "須藤 大輔", color: "#6CB4E4", colorSecondary: "#FFFFFF", division: "EAST-A", officialUrl: "https://www.yokohamafc.com/", officialTwitter: "https://x.com/yokohama_fc" },
  { id: "tochigisc", shortName: "栃木SC", fullName: "栃木SC", fullNameEn: "Tochigi SC", prefecture: "栃木県", city: "宇都宮市", founded: 1947, stadium: "カンセキスタジアムとちぎ", stadiumCapacity: 24670, manager: "米山 篤志", color: "#FFF100", colorSecondary: "#000000", division: "EAST-A", officialUrl: "https://www.tochigisc.jp/", officialTwitter: "https://x.com/tochigisc" },
  { id: "tochigicity", shortName: "栃木C", fullName: "栃木シティFC", fullNameEn: "Tochigi City FC", prefecture: "栃木県", city: "栃木市", founded: 1947, stadium: "CITY FOOTBALL STATION", stadiumCapacity: 4400, manager: "今矢 直城", color: "#1B2A5C", colorSecondary: "#C8A44E", division: "EAST-A", officialUrl: "https://tochigi-city.com/", officialTwitter: "https://x.com/tochigi_city_" },
  { id: "shonan", shortName: "湘南", fullName: "湘南ベルマーレ", fullNameEn: "Shonan Bellmare", prefecture: "神奈川県", city: "平塚市", founded: 1968, stadium: "レモンガススタジアム平塚", stadiumCapacity: 15380, manager: "長澤 徹", color: "#6CBB5A", colorSecondary: "#0068B7", division: "EAST-A", officialUrl: "https://www.bellmare.co.jp/", officialTwitter: "https://x.com/bellmare_staff" },
  { id: "hachinohe", shortName: "八戸", fullName: "ヴァンラーレ八戸FC", fullNameEn: "Vanraure Hachinohe FC", prefecture: "青森県", city: "八戸市", founded: 2006, stadium: "プライフーズスタジアム", stadiumCapacity: 1204, manager: "高橋 勇菊", color: "#0068B7", colorSecondary: "#009944", division: "EAST-A", officialUrl: "https://vanraure.net/", officialTwitter: "https://x.com/vanraure" },

  // ── EAST-B ──────────────────────────────────────
  { id: "sapporo", shortName: "札幌", fullName: "北海道コンサドーレ札幌", fullNameEn: "Hokkaido Consadole Sapporo", prefecture: "北海道", city: "札幌市", founded: 1996, stadium: "大和ハウス プレミストドーム", stadiumCapacity: 38794, manager: "川井 健太", color: "#D6000F", colorSecondary: "#000000", division: "EAST-B", officialUrl: "https://www.consadole-sapporo.jp/", officialTwitter: "https://x.com/consaofficial" },
  { id: "omiya", shortName: "大宮", fullName: "RB大宮アルディージャ", fullNameEn: "RB Omiya Ardija", prefecture: "埼玉県", city: "さいたま市", founded: 1999, stadium: "NACK5スタジアム大宮", stadiumCapacity: 15500, manager: "宮沢 悠生", color: "#ED6D00", colorSecondary: "#004077", division: "EAST-B", officialUrl: "https://www.rbomiya.com/", officialTwitter: "https://x.com/Ardija_Official" },
  { id: "iwata", shortName: "磐田", fullName: "ジュビロ磐田", fullNameEn: "Jubilo Iwata", prefecture: "静岡県", city: "磐田市", founded: 1972, stadium: "ヤマハスタジアム", stadiumCapacity: 15165, manager: "志垣 良", color: "#6C8FCD", colorSecondary: "#FFFFFF", division: "EAST-B", officialUrl: "https://jubilo-iwata.co.jp/", officialTwitter: "https://x.com/Jubiloiwata_YFC" },
  { id: "kofu", shortName: "甲府", fullName: "ヴァンフォーレ甲府", fullNameEn: "Ventforet Kofu", prefecture: "山梨県", city: "甲府市", founded: 1965, stadium: "JIT リサイクルインク スタジアム", stadiumCapacity: 15853, manager: "渋谷 洋樹", color: "#1937B7", colorSecondary: "#B61B19", division: "EAST-B", officialUrl: "https://www.ventforet.jp/", officialTwitter: "https://x.com/vfk_official" },
  { id: "fujieda", shortName: "藤枝", fullName: "藤枝MYFC", fullNameEn: "Fujieda MYFC", prefecture: "静岡県", city: "藤枝市", founded: 2009, stadium: "藤枝総合運動公園サッカー場", stadiumCapacity: 10057, manager: "槙野 智章", color: "#6A3EA1", colorSecondary: "#228B22", division: "EAST-B", officialUrl: "https://myfc.co.jp/", officialTwitter: "https://x.com/fujiedamyfc_pr" },
  { id: "matsumoto", shortName: "松本", fullName: "松本山雅FC", fullNameEn: "Matsumoto Yamaga FC", prefecture: "長野県", city: "松本市", founded: 1965, stadium: "サンプロ アルウィン", stadiumCapacity: 20336, manager: "石崎 信弘", color: "#006837", colorSecondary: "#FFFFFF", division: "EAST-B", officialUrl: "https://www.yamaga-fc.com/", officialTwitter: "https://x.com/yamagafc" },
  { id: "nagano", shortName: "長野", fullName: "AC長野パルセイロ", fullNameEn: "AC Nagano Parceiro", prefecture: "長野県", city: "長野市", founded: 1990, stadium: "長野Uスタジアム", stadiumCapacity: 15491, manager: "藤本 主税", color: "#EE7800", colorSecondary: "#1B2A5C", division: "EAST-B", officialUrl: "https://parceiro.co.jp/", officialTwitter: "https://x.com/NAGANO_PARCEIRO" },
  { id: "gifu", shortName: "岐阜", fullName: "FC岐阜", fullNameEn: "FC Gifu", prefecture: "岐阜県", city: "岐阜市", founded: 2001, stadium: "岐阜メモリアルセンター長良川競技場", stadiumCapacity: 16300, manager: "石丸 清隆", color: "#00845E", colorSecondary: "#E60012", division: "EAST-B", officialUrl: "https://www.fc-gifu.com/", officialTwitter: "https://x.com/fcgifuDREAM" },
  { id: "iwaki", shortName: "いわき", fullName: "いわきFC", fullNameEn: "Iwaki FC", prefecture: "福島県", city: "いわき市", founded: 2012, stadium: "ハワイアンズスタジアムいわき", stadiumCapacity: 5048, manager: "田村 雄三", color: "#E60033", colorSecondary: "#003DA5", division: "EAST-B", officialUrl: "https://iwakifc.com/", officialTwitter: "https://x.com/IwakiFcOfficial" },
  { id: "fukushima", shortName: "福島", fullName: "福島ユナイテッドFC", fullNameEn: "Fukushima United FC", prefecture: "福島県", city: "福島市", founded: 2004, stadium: "とうほう・みんなのスタジアム", stadiumCapacity: 6464, manager: "寺田 周平", color: "#E60012", colorSecondary: "#000000", division: "EAST-B", officialUrl: "https://fufc.jp/", officialTwitter: "https://x.com/fufc_staff" },

  // ── WEST-A ──────────────────────────────────────
  { id: "niigata", shortName: "新潟", fullName: "アルビレックス新潟", fullNameEn: "Albirex Niigata", prefecture: "新潟県", city: "新潟市", founded: 1955, stadium: "デンカビッグスワンスタジアム", stadiumCapacity: 41684, manager: "船越 優蔵", color: "#FF6600", colorSecondary: "#003399", division: "WEST-A", officialUrl: "https://www.albirex.co.jp/", officialTwitter: "https://x.com/albirex_pr" },
  { id: "toyama", shortName: "富山", fullName: "カターレ富山", fullNameEn: "Kataller Toyama", prefecture: "富山県", city: "富山市", founded: 2007, stadium: "富山県総合運動公園陸上競技場", stadiumCapacity: 18588, manager: "安達 亮", color: "#0068B7", colorSecondary: "#FFFFFF", division: "WEST-A", officialUrl: "https://www.kataller.co.jp/", officialTwitter: "https://x.com/katallertoyama" },
  { id: "kanazawa", shortName: "金沢", fullName: "ツエーゲン金沢", fullNameEn: "Zweigen Kanazawa", prefecture: "石川県", city: "金沢市", founded: 1956, stadium: "金沢ゴーゴーカレースタジアム", stadiumCapacity: 10728, manager: "辻田 真輝", color: "#E60012", colorSecondary: "#000000", division: "WEST-A", officialUrl: "https://www.zweigen-kanazawa.jp/", officialTwitter: "https://x.com/zweigen_staff" },
  { id: "tokushima", shortName: "徳島", fullName: "徳島ヴォルティス", fullNameEn: "Tokushima Vortis", prefecture: "徳島県", city: "徳島市", founded: 1955, stadium: "ポカリスエットスタジアム", stadiumCapacity: 17924, manager: "ゲルト エンゲルス", color: "#1B2D5B", colorSecondary: "#00873C", division: "WEST-A", officialUrl: "https://www.vortis.jp/", officialTwitter: "https://x.com/vortis_pr" },
  { id: "sanuki", shortName: "讃岐", fullName: "カマタマーレ讃岐", fullNameEn: "Kamatamare Sanuki", prefecture: "香川県", city: "高松市", founded: 1956, stadium: "四国化成MEGLIOスタジアム", stadiumCapacity: 22338, manager: "大嶽 直人", color: "#6BB5DE", colorSecondary: "#1B3664", division: "WEST-A", officialUrl: "https://www.kamatamare.jp/", officialTwitter: "https://x.com/kamatama_kouhou" },
  { id: "ehime", shortName: "愛媛", fullName: "愛媛FC", fullNameEn: "Ehime FC", prefecture: "愛媛県", city: "松山市", founded: 1970, stadium: "ニンジニアスタジアム", stadiumCapacity: 20919, manager: "大木 武", color: "#FF6600", colorSecondary: "#1B2A5B", division: "WEST-A", officialUrl: "https://ehimefc.com/", officialTwitter: "https://x.com/ehime_fc" },
  { id: "imabari", shortName: "今治", fullName: "FC今治", fullNameEn: "FC Imabari", prefecture: "愛媛県", city: "今治市", founded: 1976, stadium: "アシックス里山スタジアム", stadiumCapacity: 5316, manager: "倉石 圭二", color: "#0054A6", colorSecondary: "#FFD700", division: "WEST-A", officialUrl: "https://www.fcimabari.com/", officialTwitter: "https://x.com/FCimabari" },
  { id: "kochi", shortName: "高知", fullName: "高知ユナイテッドSC", fullNameEn: "Kochi United SC", prefecture: "高知県", city: "高知市", founded: 2016, stadium: "GIKENスタジアム", stadiumCapacity: 16010, manager: "吉本 岳史", color: "#C8102E", colorSecondary: "#006B3F", division: "WEST-A", officialUrl: "http://kochi-usc.jp/", officialTwitter: "https://x.com/kochi_United" },
  { id: "nara", shortName: "奈良", fullName: "奈良クラブ", fullNameEn: "Nara Club", prefecture: "奈良県", city: "奈良市", founded: 1991, stadium: "ロートフィールド奈良", stadiumCapacity: 5369, manager: "大黒 将志", color: "#003DA5", colorSecondary: "#C8102E", division: "WEST-A", officialUrl: "https://naraclub.jp/", officialTwitter: "https://x.com/naraclub_info" },
  { id: "fcosaka", shortName: "FC大阪", fullName: "FC大阪", fullNameEn: "FC Osaka", prefecture: "大阪府", city: "東大阪市", founded: 1996, stadium: "東大阪市花園ラグビー場", stadiumCapacity: 26443, manager: "藪田 光教", color: "#5BBEE5", colorSecondary: "#000000", division: "WEST-A", officialUrl: "https://fc-osaka.com/", officialTwitter: "https://x.com/FCosakaOfficial" },

  // ── WEST-B ──────────────────────────────────────
  { id: "miyazaki", shortName: "宮崎", fullName: "テゲバジャーロ宮崎", fullNameEn: "Tegevajaro Miyazaki", prefecture: "宮崎県", city: "宮崎市", founded: 2015, stadium: "いちご宮崎新富サッカー場", stadiumCapacity: 5354, manager: "大熊 裕司", color: "#E85298", colorSecondary: "#FFFFFF", division: "WEST-B", officialUrl: "https://www.tegevajaro.com/", officialTwitter: "https://x.com/55tegevajaro" },
  { id: "kagoshima", shortName: "鹿児島", fullName: "鹿児島ユナイテッドFC", fullNameEn: "Kagoshima United FC", prefecture: "鹿児島県", city: "鹿児島市", founded: 2014, stadium: "白波スタジアム", stadiumCapacity: 19934, manager: "村主 博正", color: "#1B2A6B", colorSecondary: "#FFFFFF", division: "WEST-B", officialUrl: "https://kufc.co.jp/", officialTwitter: "https://x.com/kagoshimaufc" },
  { id: "kumamoto", shortName: "熊本", fullName: "ロアッソ熊本", fullNameEn: "Roasso Kumamoto", prefecture: "熊本県", city: "熊本市", founded: 2005, stadium: "えがお健康スタジアム", stadiumCapacity: 32000, manager: "片野坂 知宏", color: "#D7000F", colorSecondary: "#FFFFFF", division: "WEST-B", officialUrl: "https://roasso-k.com/", officialTwitter: "https://x.com/roassoofficial" },
  { id: "oita", shortName: "大分", fullName: "大分トリニータ", fullNameEn: "Oita Trinita", prefecture: "大分県", city: "大分市", founded: 1994, stadium: "クラサスドーム大分", stadiumCapacity: 40000, manager: "四方田 修平", color: "#0068B7", colorSecondary: "#FFF100", division: "WEST-B", officialUrl: "https://www.oita-trinita.co.jp/", officialTwitter: "https://x.com/TRINITAofficial" },
  { id: "kitakyushu", shortName: "北九州", fullName: "ギラヴァンツ北九州", fullNameEn: "Giravanz Kitakyushu", prefecture: "福岡県", city: "北九州市", founded: 2001, stadium: "ミクニワールドスタジアム北九州", stadiumCapacity: 15300, manager: "増本 浩平", color: "#FFD700", colorSecondary: "#E60012", division: "WEST-B", officialUrl: "https://www.giravanz.jp/", officialTwitter: "https://x.com/Giravanz_staff" },
  { id: "yamaguchi", shortName: "山口", fullName: "レノファ山口FC", fullNameEn: "Renofa Yamaguchi FC", prefecture: "山口県", city: "山口市", founded: 2006, stadium: "維新みらいふスタジアム", stadiumCapacity: 15115, manager: "小田切 道治", color: "#F39800", colorSecondary: "#003087", division: "WEST-B", officialUrl: "https://www.renofa.com/", officialTwitter: "https://x.com/renofayamaguchi" },
  { id: "ryukyu", shortName: "琉球", fullName: "FC琉球", fullNameEn: "FC Ryukyu", prefecture: "沖縄県", city: "沖縄市", founded: 2003, stadium: "タピック県総ひやごんスタジアム", stadiumCapacity: 10189, manager: "平川 忠亮", color: "#8F2E14", colorSecondary: "#FFFFFF", division: "WEST-B", officialUrl: "https://fcryukyu.com/", officialTwitter: "https://x.com/fcr_info" },
  { id: "shiga", shortName: "滋賀", fullName: "レイラック滋賀FC", fullNameEn: "Reilac Shiga FC", prefecture: "滋賀県", city: "草津市", founded: 2006, stadium: "平和堂HATOスタジアム", stadiumCapacity: 15000, manager: "和田 治雄", color: "#4B0082", colorSecondary: "#87CEEB", division: "WEST-B", officialUrl: "https://reilac-shiga.co.jp/", officialTwitter: "https://x.com/reilacshiga" },
  { id: "tottori", shortName: "鳥取", fullName: "ガイナーレ鳥取", fullNameEn: "Gainare Tottori", prefecture: "鳥取県", city: "鳥取市", founded: 1983, stadium: "Axisバードスタジアム", stadiumCapacity: 16033, manager: "林 健太郎", color: "#70B61E", colorSecondary: "#07123B", division: "WEST-B", officialUrl: "https://www.gainare.co.jp/", officialTwitter: "https://x.com/gainareofficial" },
  { id: "tosu", shortName: "鳥栖", fullName: "サガン鳥栖", fullNameEn: "Sagan Tosu", prefecture: "佐賀県", city: "鳥栖市", founded: 1997, stadium: "駅前不動産スタジアム", stadiumCapacity: 25000, manager: "小菊 昭雄", color: "#10A5D1", colorSecondary: "#E95599", division: "WEST-B", officialUrl: "https://www.sagan-tosu.net/", officialTwitter: "https://x.com/saaborofficial" },
];

/* ── Helper functions ─────────────────────────── */
export function getJ2J3TeamById(id: string): J2J3Team | undefined {
  return j2j3Teams.find((t) => t.id === id);
}

export function getJ2J3TeamsByDivision(div: J2J3Team["division"]): J2J3Team[] {
  return j2j3Teams.filter((t) => t.division === div);
}
