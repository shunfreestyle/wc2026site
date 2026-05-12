'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

/* ────────────────────────────────────────────
   DATA — Top 10 Golden Boot Candidates
   ──────────────────────────────────────────── */

interface Player {
  rank: number;
  name: string;
  nameJa: string;
  age: number;
  nation: string;
  nationEn: string;
  flag: string;
  club: string;
  pos: string;
  foot: string;
  pk: boolean;
  group: string;
  opponents: string[];
  opponentsEn: string[];
  qualGoals: number | null;
  qualGames: number | null;
  clubGoals: string;
  clubDetail: string;
  clubDetailEn: string;
  gsRating: string;
  gsRatingEn: string;
  gsColor: string;
  tags: string[];
  tagsEn: string[];
  injury: string;
  injuryEn: string;
  injuryLevel: 'none' | 'low' | 'high';
  verdict: string;
  verdictEn: string;
  isDarkhorse?: boolean;
  sources: { label: string; url: string }[];
}

const players: Player[] = [
  {
    rank: 1,
    name: 'Harry Kane',
    nameJa: 'ハリー・ケイン',
    age: 32,
    nation: 'イングランド',
    nationEn: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    club: 'バイエルン・ミュンヘン',
    pos: 'CF',
    foot: '右',
    pk: true,
    group: 'L',
    opponents: ['クロアチア', 'パナマ', 'ガーナ'],
    opponentsEn: ['Croatia', 'Panama', 'Ghana'],
    qualGoals: 8,
    qualGames: 8,
    clubGoals: '48+',
    clubDetail: 'BuLi 33G+5A / CL 14G / 全大会48G超',
    clubDetailEn: 'BuLi 33G+5A / CL 14G / 48+ all comps',
    gsRating: '高い',
    gsRatingEn: 'High',
    gsColor: 'text-green-400',
    tags: ['2018年W杯得点王', 'BuLi 3年連続得点王', 'PK担当', 'イングランド歴代最多78G'],
    tagsEn: ['2018 WC Golden Boot', 'BuLi 3x top scorer', 'PK taker', 'England all-time 78G'],
    injury: '軽度（足首・ふくらはぎ）',
    injuryEn: 'Minor (ankle, calf)',
    injuryLevel: 'low',
    verdict: '全大会48得点超のモンスター級シーズン。パナマ・ガーナは守備が脆く、2018年得点王のW杯実績も圧倒的。PK担当で追加得点源あり。3軸すべてで最高評価。',
    verdictEn: '48+ goals this season across all comps. Panama & Ghana have fragile defenses. 2018 Golden Boot pedigree + PK duties. Top marks on all 3 axes.',
    sources: [
      { label: 'Bundesliga公式', url: 'https://www.bundesliga.com/en/bundesliga/player/harry-kane' },
      { label: 'UEFA CL Stats', url: 'https://www.uefa.com/uefachampionsleague/clubs/players/250016833--harry-kane/statistics/' },
      { label: 'FCBayern 予選全勝', url: 'https://fcbayern.com/en/news/2025/11/harry-kane-scores-brace-as-england-finish-perfect-world-cup-qualifying' },
    ],
  },
  {
    rank: 2,
    name: 'Luis Díaz',
    nameJa: 'ルイス・ディアス',
    age: 29,
    nation: 'コロンビア',
    nationEn: 'Colombia',
    flag: '🇨🇴',
    club: 'バイエルン・ミュンヘン',
    pos: 'LW',
    foot: '右',
    pk: false,
    group: 'K',
    opponents: ['ポルトガル', 'ウズベキスタン', 'コンゴDR'],
    opponentsEn: ['Portugal', 'Uzbekistan', 'DR Congo'],
    qualGoals: 7,
    qualGames: 10,
    clubGoals: '24',
    clubDetail: 'BuLi 15G+13A / 全大会24G+17A / チーム最多出場',
    clubDetailEn: 'BuLi 15G+13A / 24G+17A all comps / Most minutes',
    gsRating: '最高',
    gsRatingEn: 'Best',
    gsColor: 'text-emerald-400',
    tags: ['GS組み合わせ最有利', 'コパ2021得点王', '怪我なしフル稼働', '取りにくい相手ゼロ'],
    tagsEn: ['Best group draw', 'Copa 2021 Golden Boot', 'Injury-free', 'No tough defense'],
    injury: 'なし',
    injuryEn: 'None',
    injuryLevel: 'none',
    verdict: 'GS組み合わせが全候補中最も有利。ウズベキスタン・コンゴDRは守備が弱く、ポルトガルすら予選で1試合1.17失点。「取りにくい相手がゼロ」は唯一無二。怪我なし・フル稼働も強み。',
    verdictEn: 'Best group draw of all candidates. Uzbekistan & DR Congo weak defensively. Even Portugal leaked 1.17/game. Zero tough opponents = unmatched advantage. Fully fit.',
    sources: [
      { label: 'Sofascore', url: 'https://www.sofascore.com/news/elite-output-little-noise-luis-diazs-bayern-season-in-numbers' },
      { label: 'Bundesliga公式', url: 'https://www.bundesliga.com/en/bundesliga/news/what-has-luis-diaz-brought-to-champions-bayern-munich-kompany-kane-olise-36648' },
    ],
  },
  {
    rank: 3,
    name: 'Kylian Mbappé',
    nameJa: 'キリアン・エムバペ',
    age: 27,
    nation: 'フランス',
    nationEn: 'France',
    flag: '🇫🇷',
    club: 'レアル・マドリード',
    pos: 'CF/LW',
    foot: '右',
    pk: true,
    group: 'I',
    opponents: ['セネガル', 'ノルウェー', 'イラク'],
    opponentsEn: ['Senegal', 'Norway', 'Iraq'],
    qualGoals: 5,
    qualGames: null,
    clubGoals: '43',
    clubDetail: 'LaLiga 22-24G / CL 15G(得点王) / 全大会43G',
    clubDetailEn: 'LaLiga 22-24G / CL 15G (top scorer) / 43G all comps',
    gsRating: '中〜高',
    gsRatingEn: 'Med-High',
    gsColor: 'text-yellow-400',
    tags: ['W杯通算12G(現役最多級)', 'CL得点王15G', '2022年W杯得点王', 'ハムストリング負傷(4月)'],
    tagsEn: ['12 WC career goals', 'CL top scorer 15G', '2022 WC Golden Boot', 'Hamstring injury (Apr)'],
    injury: 'ハムストリング負傷(4/24) — W杯フィットネス不透明',
    injuryEn: 'Hamstring injury (4/24) — WC fitness uncertain',
    injuryLevel: 'high',
    verdict: 'W杯通算12得点は歴代級。イラク戦で大量得点の可能性大。しかし4月のハムストリング負傷でW杯開幕に間に合うか不透明。フィットすれば本命。',
    verdictEn: '12 career WC goals = elite tier. Iraq game offers a feast. But April hamstring makes WC fitness uncertain. If fit, he\'s THE favorite.',
    sources: [
      { label: 'TNT Sports 負傷', url: 'https://www.tntsports.co.uk/football/la-liga/2025-2026/real-madrid-kylian-mbappe-hamstring-injury-el-clasico-world-cup_sto23294309/story.shtml' },
      { label: 'UEFA CL得点王', url: 'https://www.uefa.com/uefachampionsleague/news/029d-1ec1670159ea-2d1882e6a430-1000--champions-league-top-scorers-kylian-mbappe-leads-harry-kane/' },
    ],
  },
  {
    rank: 4,
    name: 'Lautaro Martínez',
    nameJa: 'ラウタロ・マルティネス',
    age: 28,
    nation: 'アルゼンチン',
    nationEn: 'Argentina',
    flag: '🇦🇷',
    club: 'インテル',
    pos: 'CF',
    foot: '右',
    pk: true,
    group: 'J',
    opponents: ['オーストリア', 'アルジェリア', 'ヨルダン'],
    opponentsEn: ['Austria', 'Algeria', 'Jordan'],
    qualGoals: null,
    qualGames: null,
    clubGoals: '20',
    clubDetail: 'SerieA 17G+6A / CL 4G / インテル歴代3位171G',
    clubDetailEn: 'SerieA 17G+6A / CL 4G / Inter all-time 3rd (171G)',
    gsRating: '非常に高い',
    gsRatingEn: 'Very High',
    gsColor: 'text-green-400',
    tags: ['コパ2024得点王', 'GS組み合わせ有利', '筋肉再負傷(4月)', '2022W杯優勝メンバー'],
    tagsEn: ['Copa 2024 Golden Boot', 'Favorable group', 'Muscle re-injury (Apr)', '2022 WC winner'],
    injury: '筋肉負傷再発(4/12) — コンディション不安大',
    injuryEn: 'Muscle re-injury (4/12) — Major fitness concern',
    injuryLevel: 'high',
    verdict: 'GS組み合わせは有利（ヨルダンW杯初出場・DF全員国内）。コパ2024得点王。ただし4月に筋肉負傷が再発し、コンディション不安が最大のリスク。',
    verdictEn: 'Favorable group (Jordan WC debutants, all domestic defenders). Copa 2024 Golden Boot. But April muscle re-injury = major fitness risk.',
    sources: [
      { label: 'ESPN 負傷', url: 'https://www.espn.com/soccer/story/_/id/48451887/inter-milan-star-lautaro-martinez-sidelined-injury-relapse' },
      { label: 'UPI ロスター', url: 'https://www.upi.com/Sports_News/Soccer/2026/05/11/argentina-Messi-Martinez-World-Cup-roster/3951778508987/' },
    ],
  },
  {
    rank: 5,
    name: 'Erling Haaland',
    nameJa: 'アーリング・ハーランド',
    age: 25,
    nation: 'ノルウェー',
    nationEn: 'Norway',
    flag: '🇳🇴',
    club: 'マンチェスター・シティ',
    pos: 'CF',
    foot: '左',
    pk: true,
    group: 'I',
    opponents: ['フランス', 'セネガル', 'イラク'],
    opponentsEn: ['France', 'Senegal', 'Iraq'],
    qualGoals: 16,
    qualGames: 8,
    clubGoals: '40+',
    clubDetail: 'PL 35G(最多記録更新) / CL 8G / 全大会40G超',
    clubDetailEn: 'PL 35G (all-time record) / CL 8G / 40+ all comps',
    gsRating: '低い',
    gsRatingEn: 'Low',
    gsColor: 'text-red-400',
    tags: ['PL最多記録35G', 'UEFA予選16G(記録タイ)', 'W杯初出場', 'GS最も不利(仏+セネガル)'],
    tagsEn: ['PL record 35G', 'UEFA qual. 16G (record)', 'WC debut', 'Worst group (FRA+SEN)'],
    injury: 'なし（良好）',
    injuryEn: 'None (fully fit)',
    injuryLevel: 'none',
    verdict: '得点力だけなら世界最強。だがGS組み合わせが最悪。フランス(FIFA1位)とセネガル(予選10試合3失点)に挟まれ、得点を稼げるのはイラク戦のみ。「予選得点だけで選ばない」独自視点の核心。',
    verdictEn: 'Best pure goalscorer alive. But worst group for scoring: France (#1) + Senegal (3 conceded in 10). Only Iraq is easy. The core of our "don\'t just pick by qual. goals" thesis.',
    sources: [
      { label: 'Yahoo Sports 予選16G', url: 'https://sports.yahoo.com/article/erling-haaland-scores-16-goals-192000362.html' },
      { label: 'PL公式', url: 'https://www.premierleague.com/en/players/223094/erling-haaland/stats' },
    ],
  },
  {
    rank: 6,
    name: 'Patrik Schick',
    nameJa: 'パトリク・シック',
    age: 30,
    nation: 'チェコ',
    nationEn: 'Czech Republic',
    flag: '🇨🇿',
    club: 'レヴァークーゼン',
    pos: 'CF',
    foot: '左',
    pk: false,
    group: 'A',
    opponents: ['メキシコ', '韓国', '南アフリカ'],
    opponentsEn: ['Mexico', 'South Korea', 'South Africa'],
    qualGoals: 4,
    qualGames: null,
    clubGoals: '20',
    clubDetail: 'BuLi 16G+3A / CL 4G+1A / レヴァークーゼン通算100G達成',
    clubDetailEn: 'BuLi 16G+3A / CL 4G+1A / Leverkusen 100th goal',
    gsRating: '中',
    gsRatingEn: 'Medium',
    gsColor: 'text-yellow-400',
    tags: ['EURO2020銀靴(5G)', '国際大会で化ける男', 'BuLi vsライプツィヒHT', '南アフリカ戦がチャンス'],
    tagsEn: ['EURO 2020 Silver Boot (5G)', 'Tournament performer', 'BuLi hat-trick vs Leipzig', 'South Africa = chance'],
    injury: 'なし',
    injuryEn: 'None',
    injuryLevel: 'none',
    isDarkhorse: true,
    verdict: 'EURO2020で5得点の「国際大会で化ける」実績。クラブでも全大会20得点と一線級。南アフリカ戦は得点の大チャンス。ハーフウェイラインからのスーパーゴールで世界を驚かせた男。',
    verdictEn: '5 goals at EURO 2020 = proven tournament performer. 20 goals across all club comps. South Africa offers a big chance. The man who stunned the world with a halfway-line screamer.',
    sources: [
      { label: 'UEFA EURO2020 GOTT', url: 'https://www.uefa.com/uefaeuro/history/news/026b-12bee5573e30-07a21f6d1f12-1000--patrik-schick-wins-uefa-euro-2020-goal-of-the-tournament/' },
      { label: 'Bundesliga公式', url: 'https://www.bundesliga.com/en/bundesliga/news/is-patrik-schick-better-goal-scorer-than-harry-kane-bayern-munich-bayer-leverkusen-31209' },
    ],
  },
  {
    rank: 7,
    name: 'Julián Álvarez',
    nameJa: 'フリアン・アルバレス',
    age: 26,
    nation: 'アルゼンチン',
    nationEn: 'Argentina',
    flag: '🇦🇷',
    club: 'アトレティコ・マドリード',
    pos: 'CF/SS',
    foot: '右',
    pk: true,
    group: 'J',
    opponents: ['オーストリア', 'アルジェリア', 'ヨルダン'],
    opponentsEn: ['Austria', 'Algeria', 'Jordan'],
    qualGoals: 4,
    qualGames: null,
    clubGoals: '18+',
    clubDetail: 'LaLiga 8G+4A / CL 10G+4A(クラブ記録) / PK担当',
    clubDetailEn: 'LaLiga 8G+4A / CL 10G+4A (club record) / PK taker',
    gsRating: '非常に高い',
    gsRatingEn: 'Very High',
    gsColor: 'text-green-400',
    tags: ['CL 10G(アトレティコ記録)', '2022W杯4G', 'PK担当', 'Lautaroと同組で2枚看板'],
    tagsEn: ['CL 10G (Atlético record)', '2022 WC 4G', 'PK taker', 'Dual threat with Lautaro'],
    injury: '足首負傷(5月CL) — 軽症、W杯には間に合う見込み',
    injuryEn: 'Ankle injury (May CL) — Minor, expected to be fit',
    injuryLevel: 'low',
    verdict: 'CL10得点はアトレティコの単一シーズン記録。2022W杯4得点の実績あり。Lautaroと同組でアルゼンチンの2枚看板。ヨルダン戦は大量得点の可能性大。Lautaro負傷なら主役に昇格。',
    verdictEn: 'CL 10 goals = Atlético single-season record. 4 goals at 2022 WC. Dual threat with Lautaro in easy Group J. If Lautaro\'s injury lingers, Álvarez becomes Argentina\'s main man.',
    sources: [
      { label: 'beIN CL記録', url: 'https://www.beinsports.com/en-us/soccer/uefa-champions-league/articles/julian-alvarez-sets-a-record-with-atletico-madrid-in-the-champions-league-2026-04-09' },
      { label: 'FIFA Álvarez進化', url: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/julian-alvarez-evolution-argentina' },
      { label: 'Tribuna 負傷', url: 'https://tribuna.com/en/news/2026-05-06-julian-alvarez-escapes-serious-injury-in-atletico-madrid-champions-league-exit-at-arsenal/' },
    ],
  },
  {
    rank: 8,
    name: 'Folarin Balogun',
    nameJa: 'フォラリン・バログン',
    age: 24,
    nation: 'アメリカ',
    nationEn: 'USA',
    flag: '🇺🇸',
    club: 'モナコ',
    pos: 'CF',
    foot: '右',
    pk: false,
    group: 'D',
    opponents: ['パラグアイ', 'オーストラリア', 'トルコ'],
    opponentsEn: ['Paraguay', 'Australia', 'Turkey'],
    qualGoals: null,
    qualGames: null,
    clubGoals: '18',
    clubDetail: 'L1 13G+4A / CL 5G / 直近11試合8G',
    clubDetailEn: 'L1 13G+4A / CL 5G / 8G in last 11 games',
    gsRating: '中',
    gsRatingEn: 'Medium',
    gsColor: 'text-yellow-400',
    tags: ['開催国エースFW', '直近11試合8G絶好調', 'トルコ=GS最弱守備', '24歳上昇曲線'],
    tagsEn: ['Host nation ace FW', '8G in last 11 (hot)', 'Turkey = worst GS defense', '24yo rising star'],
    injury: 'なし',
    injuryEn: 'None',
    injuryLevel: 'none',
    isDarkhorse: true,
    verdict: '開催国アメリカのエースFW候補。トルコは予選8試合12失点でGS最弱守備。ホームの大歓声がブースト。直近11試合8得点と絶好調。最低4試合（GS3+R32）が保証され得点機会の母数が多い。',
    verdictEn: 'Host nation USA\'s ace FW. Turkey conceded 12 in 8 qualifiers = worst defense in GS. Home crowd boost. 8 goals in last 11 = red hot. Guaranteed 4+ games (GS3+R32).',
    sources: [
      { label: 'beIN Sports', url: 'https://www.beinsports.com/en-us/soccer/ligue-1/articles/folarin-balogun-on-fire-the-streak-that-is-revolutionizing-ligue-1-with-monaco-2026-03-23' },
      { label: 'Goal.com', url: 'https://www.goal.com/en-us/lists/meet-the-usmnt-monaco-star-folarin-balogun-approaches-world-cup-moment-that-has-always-been-on-his-radar/bltf3ec6b00a486a72b' },
    ],
  },
  {
    rank: 9,
    name: 'Mohamed Amoura',
    nameJa: 'モハメド・アムーラ',
    age: 26,
    nation: 'アルジェリア',
    nationEn: 'Algeria',
    flag: '🇩🇿',
    club: 'ヴォルフスブルク',
    pos: 'CF',
    foot: '右',
    pk: false,
    group: 'J',
    opponents: ['アルゼンチン', 'オーストリア', 'ヨルダン'],
    opponentsEn: ['Argentina', 'Austria', 'Jordan'],
    qualGoals: 10,
    qualGames: 10,
    clubGoals: '8',
    clubDetail: 'BuLi 8G+3A / CAF予選得点王(10G)',
    clubDetailEn: 'BuLi 8G+3A / CAF qual. top scorer (10G)',
    gsRating: '中',
    gsRatingEn: 'Medium',
    gsColor: 'text-yellow-400',
    tags: ['CAF予選得点王(10G)', 'サラー超え', '12年ぶりW杯のエース', '日本での知名度ほぼゼロ'],
    tagsEn: ['CAF qual. top scorer (10G)', 'Outscored Salah', 'Algeria\'s 12-yr WC return', 'Unknown in Japan'],
    injury: 'なし',
    injuryEn: 'None',
    injuryLevel: 'none',
    isDarkhorse: true,
    verdict: 'サラーを上回りアフリカ予選得点王。チーム総得点の42%を1人で記録。ヨルダン(W杯初出場)戦は得点チャンス大。日本での知名度ほぼゼロだが実力は本物。リスクはクラブでの得点力(BuLi 8G)。',
    verdictEn: 'Outscored Salah as Africa\'s top qualifier scorer. Scored 42% of Algeria\'s goals. Jordan (WC debut) offers a big chance. Unknown in Japan but the real deal. Risk: only 8 BuLi goals.',
    sources: [
      { label: 'Foot Africa', url: 'https://foot-africa.com/en/news/amoura-beats-salah-top-scorers-of-africas-2026-world-cup-qualifiers-919092/' },
      { label: 'The National', url: 'https://www.thenationalnews.com/sport/football/2026/04/25/mohamed-amoura-small-in-stature-big-on-impact-and-carrying-algerias-world-cup-hopes/' },
    ],
  },
  {
    rank: 10,
    name: 'Raphinha',
    nameJa: 'ラフィーニャ',
    age: 29,
    nation: 'ブラジル',
    nationEn: 'Brazil',
    flag: '🇧🇷',
    club: 'バルセロナ',
    pos: 'RW/LW',
    foot: '左',
    pk: true,
    group: 'C',
    opponents: ['モロッコ', 'スコットランド', 'ハイチ'],
    opponentsEn: ['Morocco', 'Scotland', 'Haiti'],
    qualGoals: 5,
    qualGames: null,
    clubGoals: '14+',
    clubDetail: 'LaLiga 11G+3A / CL 3G+2A / CONMEBOL予選トップ',
    clubDetailEn: 'LaLiga 11G+3A / CL 3G+2A / CONMEBOL top scorer',
    gsRating: '中〜高',
    gsRatingEn: 'Med-High',
    gsColor: 'text-yellow-400',
    tags: ['CONMEBOL予選得点王(5G)', 'ハイチ戦で大量得点可能', 'ハムストリング2回負傷', 'バルサのエース'],
    tagsEn: ['CONMEBOL qual. top scorer (5G)', 'Haiti = goal feast', 'Double hamstring injury', 'Barca\'s talisman'],
    injury: 'ハムストリング2回負傷(9月+3月) — フィットネスに懸念',
    injuryEn: 'Double hamstring injury (Sep+Mar) — Fitness concern',
    injuryLevel: 'high',
    isDarkhorse: true,
    verdict: 'ブラジルのCONMEBOL予選得点王。ハイチ(FIFA83位・W杯最弱候補)戦は大量得点の可能性大。しかしシーズン中にハムストリングを2回負傷しており、W杯フィットネスに大きな懸念。フィットすれば爆発力あり。',
    verdictEn: 'Brazil\'s CONMEBOL top scorer. Haiti (FIFA 83rd, WC weakest) offers a goal feast. But two hamstring injuries this season = major fitness concern. If fit, explosive potential.',
    sources: [
      { label: 'ESPN ハムストリング', url: 'https://www.espn.com/soccer/story/_/id/46710415/barcelona-raphinha-hamstring-miss-clasico-source' },
      { label: 'FIFA Raphinha', url: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/raphinha-brazil-quotes-records-stats' },
      { label: 'World Soccer Talk 負傷', url: 'https://worldsoccertalk.com/news/barcelona-confirm-raphinha-injury-after-france-clash-how-does-this-affect-his-2026-world-cup-preparation-with-brazil/' },
    ],
  },
];

/* ── GS Defense Data ── */
const gsDefense: Record<string, { name: string; nameEn: string; rank: number; rating: string; ratingEn: string; note: string; noteEn: string; color: string }[]> = {
  L: [
    { name: 'クロアチア', nameEn: 'Croatia', rank: 10, rating: '取りにくい', ratingEn: 'Hard', note: '予選4失点/8試合', noteEn: '4 conc./8 games', color: 'border-red-500' },
    { name: 'パナマ', nameEn: 'Panama', rank: 33, rating: '取りやすい', ratingEn: 'Easy', note: 'ローブロック型', noteEn: 'Low block style', color: 'border-green-500' },
    { name: 'ガーナ', nameEn: 'Ghana', rank: 74, rating: '普通', ratingEn: 'Medium', note: 'Salisu(モナコ)が柱', noteEn: 'Salisu (Monaco) anchors', color: 'border-yellow-500' },
  ],
  K: [
    { name: 'ポルトガル', nameEn: 'Portugal', rank: 6, rating: '普通', ratingEn: 'Medium', note: '予選7失点/6試合(1.17/試合)', noteEn: '7 conc./6g (1.17/g)', color: 'border-yellow-500' },
    { name: 'ウズベキスタン', nameEn: 'Uzbekistan', rank: 50, rating: '取りやすい', ratingEn: 'Easy', note: 'W杯初出場', noteEn: 'WC debut', color: 'border-green-500' },
    { name: 'コンゴDR', nameEn: 'DR Congo', rank: 46, rating: '取りやすい', ratingEn: 'Easy', note: 'プレーオフ辛勝', noteEn: 'Playoff squeaker', color: 'border-green-500' },
  ],
  I: [
    { name: 'セネガル', nameEn: 'Senegal', rank: 14, rating: '取りにくい', ratingEn: 'Hard', note: '予選3失点/10試合', noteEn: '3 conc./10 games', color: 'border-red-500' },
    { name: 'ノルウェー/フランス', nameEn: 'Norway/France', rank: 0, rating: '普通/非常に取りにくい', ratingEn: 'Med / Very Hard', note: '視点による', noteEn: 'Depends on perspective', color: 'border-yellow-500' },
    { name: 'イラク', nameEn: 'Iraq', rank: 57, rating: '取りやすい', ratingEn: 'Easy', note: '40年ぶり・欧州組不在', noteEn: '40-yr return, no EU players', color: 'border-green-500' },
  ],
  J: [
    { name: 'オーストリア', nameEn: 'Austria', rank: 24, rating: '普通', ratingEn: 'Medium', note: 'ハイラインで裏抜け可', noteEn: 'High line exploitable', color: 'border-yellow-500' },
    { name: 'アルジェリア', nameEn: 'Algeria', rank: 28, rating: '普通', ratingEn: 'Medium', note: '予選7失点/10試合', noteEn: '7 conc./10 games', color: 'border-yellow-500' },
    { name: 'ヨルダン', nameEn: 'Jordan', rank: 63, rating: '取りやすい', ratingEn: 'Easy', note: 'W杯初出場・DF全員国内', noteEn: 'WC debut, all domestic DF', color: 'border-green-500' },
  ],
  A: [
    { name: 'メキシコ', nameEn: 'Mexico', rank: 15, rating: '取りにくい', ratingEn: 'Hard', note: '開催国ホーム', noteEn: 'Host nation home', color: 'border-red-500' },
    { name: '韓国', nameEn: 'South Korea', rank: 25, rating: '取りにくい', ratingEn: 'Hard', note: 'Kim Min-jae(バイエルン)', noteEn: 'Kim Min-jae (Bayern)', color: 'border-red-500' },
    { name: '南アフリカ', nameEn: 'South Africa', rank: 60, rating: '取りやすい', ratingEn: 'Easy', note: 'DF大半が国内リーグ', noteEn: 'Mostly domestic DF', color: 'border-green-500' },
  ],
  D: [
    { name: 'パラグアイ', nameEn: 'Paraguay', rank: 40, rating: '取りにくい', ratingEn: 'Hard', note: '南米予選18試合10失点', noteEn: '10 conc./18 CONMEBOL', color: 'border-red-500' },
    { name: 'オーストラリア', nameEn: 'Australia', rank: 27, rating: '普通', ratingEn: 'Medium', note: 'Souttar負傷不安', noteEn: 'Souttar injury doubt', color: 'border-yellow-500' },
    { name: 'トルコ', nameEn: 'Turkey', rank: 22, rating: '取りやすい', ratingEn: 'Easy', note: '予選8試合12失点(最悪)', noteEn: '12 conc./8g (worst)', color: 'border-green-500' },
  ],
  C: [
    { name: 'モロッコ', nameEn: 'Morocco', rank: 13, rating: '取りにくい', ratingEn: 'Hard', note: '2022W杯4位・予選2失点/8試合', noteEn: '2022 WC 4th, 2 conc./8g', color: 'border-red-500' },
    { name: 'スコットランド', nameEn: 'Scotland', rank: 38, rating: '普通', ratingEn: 'Medium', note: 'フィジカル重視', noteEn: 'Physical style', color: 'border-yellow-500' },
    { name: 'ハイチ', nameEn: 'Haiti', rank: 83, rating: '非常に取りやすい', ratingEn: 'Very Easy', note: 'W杯最弱候補', noteEn: 'Weakest WC team', color: 'border-green-500' },
  ],
};

/* ────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────── */

export default function GoldenBootPage() {
  const { locale } = useLanguage();
  const ja = locale !== 'en';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #4a2000 50%, #c97b1a 100%)' }} />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,white_0,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <p className="text-5xl mb-3">&#9917;</p>
          <h1 className="text-3xl sm:text-5xl font-black mb-2">
            {ja ? 'W杯2026 得点王候補 TOP 10' : '2026 WC Golden Boot TOP 10'}
          </h1>
          <p className="text-amber-200 text-sm sm:text-base">
            {ja ? 'GS組み合わせから逆算した独自視点の分析' : 'Reverse-engineered from group stage draw'}
          </p>
          <p className="text-xs text-amber-300 mt-2">
            {ja ? 'リサーチ日: 2026-05-12 | 非公開資料' : 'Research: 2026-05-12 | Internal use only'}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Concept */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-amber-900 mb-2">{ja ? '独自視点コンセプト' : 'Unique Angle'}</h2>
          <p className="text-sm text-amber-800">
            {ja
              ? '予選の得点数だけで選ぶのではなく、「GS組み合わせから逆算して、得点を量産しやすい選手」を選ぶ。3つの軸: (1) W杯予選の得点力 (2) 2025-26クラブシーズンの調子 (3) GS組み合わせの有利さ'
              : 'Not just qualifying goals — who can actually score in the group stage? 3 axes: (1) Qualifying goals (2) 2025-26 club form (3) Group draw favorability'}
          </p>
        </div>

        {/* TOP 10 */}
        <div className="space-y-6 mb-16">
          {players.map((p) => (
            <div key={p.rank} className={`bg-white rounded-2xl shadow-sm overflow-hidden ${
              p.isDarkhorse ? 'border-2 border-red-200' : 'border border-gray-200'
            }`}>
              {/* Header */}
              <div className={`text-white p-4 sm:p-5 ${
                p.rank <= 3
                  ? 'bg-gradient-to-r from-gray-900 to-gray-700'
                  : p.isDarkhorse
                    ? 'bg-gradient-to-r from-red-900 to-red-700'
                    : 'bg-gradient-to-r from-gray-800 to-gray-600'
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`text-3xl sm:text-4xl font-black ${
                    p.rank <= 3 ? 'text-amber-400' : p.isDarkhorse ? 'text-red-300' : 'text-gray-300'
                  }`}>#{p.rank}</span>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black">{p.flag} {p.name}</h3>
                    <p className="text-xs text-gray-300">
                      {p.age}{ja ? '歳' : 'yo'} / {ja ? p.nation : p.nationEn} / {p.club} / {p.pos} / {p.foot}{ja ? '足' : ''}
                      {p.pk && <span className="ml-2 px-1.5 py-0.5 bg-amber-600 rounded text-[10px] font-bold">PK</span>}
                    </p>
                  </div>
                  {p.isDarkhorse && (
                    <span className="px-2 py-1 bg-red-500/30 border border-red-400/50 rounded-lg text-[10px] font-bold text-red-200 whitespace-nowrap">
                      DARK HORSE
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {/* 3 Axes */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? '予選得点' : 'Qual. Goals'}</p>
                    <p className="text-2xl font-black text-gray-800">{p.qualGoals ?? '-'}</p>
                    {p.qualGames && <p className="text-[10px] text-gray-400">/ {p.qualGames}{ja ? '試合' : 'g'}</p>}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? 'クラブ全得点' : 'Club Goals'}</p>
                    <p className="text-2xl font-black text-gray-800">{p.clubGoals}</p>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{(ja ? p.clubDetail : p.clubDetailEn).split('/')[0]}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? 'GS有利度' : 'GS Favor.'}</p>
                    <p className={`text-lg font-black ${p.gsColor}`}>{ja ? p.gsRating : p.gsRatingEn}</p>
                    <p className="text-[10px] text-gray-400">{ja ? 'グループ' : 'Gr.'} {p.group}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {(ja ? p.tags : p.tagsEn).map((t, i) => (
                    <span key={i} className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      t.includes('負傷') || t.includes('injury') || t.includes('不利') || t.includes('Worst')
                        ? 'bg-red-100 text-red-700'
                        : t.includes('得点王') || t.includes('Golden Boot') || t.includes('最有利') || t.includes('Best') || t.includes('記録') || t.includes('record') || t.includes('絶好調') || t.includes('hot')
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* GS Opponents */}
                {gsDefense[p.group] && (
                  <div>
                    <p className="text-xs font-bold text-gray-500 mb-2">{ja ? 'GS対戦相手の守備力' : 'GS Opponents Defense'}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {gsDefense[p.group].map((t, i) => (
                        <div key={i} className={`border-l-4 ${t.color} bg-gray-50 rounded-r-lg p-2`}>
                          <p className="text-xs font-bold text-gray-800">{ja ? t.name : t.nameEn}</p>
                          {t.rank > 0 && <p className="text-[10px] text-gray-500">FIFA {t.rank}{ja ? '位' : 'th'}</p>}
                          <p className={`text-[11px] font-bold mt-1 ${
                            t.color.includes('green') ? 'text-green-600' : t.color.includes('red') ? 'text-red-600' : 'text-yellow-600'
                          }`}>{ja ? t.rating : t.ratingEn}</p>
                          <p className="text-[10px] text-gray-400">{ja ? t.note : t.noteEn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Injury */}
                {p.injuryLevel !== 'none' && (
                  <div className={`rounded-lg p-3 text-sm ${p.injuryLevel === 'high' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
                    <span className="font-bold">{ja ? '負傷: ' : 'Injury: '}</span>{ja ? p.injury : p.injuryEn}
                  </div>
                )}

                {/* Verdict */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">{ja ? p.verdict : p.verdictEn}</p>
                </div>

                {/* Sources */}
                <div className="flex flex-wrap gap-2">
                  {p.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-500 hover:underline">[{s.label}]</a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <p className="text-xs text-yellow-800">
            {ja
              ? '⚠️ 全データは2026年5月12日時点。負傷情報は大会前に変更の可能性あり。FIFAランキングは2026年4月時点。本資料は動画制作用の内部リサーチ資料です。'
              : '⚠️ All data as of 2026-05-12. Injury info may change. FIFA rankings April 2026. Internal research material for video production.'}
          </p>
        </div>

        {/* Sources */}
        <details className="bg-white rounded-2xl border border-gray-200 p-4 mb-8">
          <summary className="text-sm font-bold text-gray-700 cursor-pointer">{ja ? '主要出典一覧（クリックで展開）' : 'Sources (click to expand)'}</summary>
          <ul className="mt-3 space-y-1 text-xs text-blue-600">
            <li><a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-draw-results" target="_blank" rel="noopener noreferrer">FIFA公式 - 抽選結果</a></li>
            <li><a href="https://www.uefa.com/european-qualifiers/news/0297-1d5d6735f8d7-9bf819c5c8e9-1000--european-qualifiers-top-scorer-erling-haaland/" target="_blank" rel="noopener noreferrer">UEFA公式 - 欧州予選得点王</a></li>
            <li><a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/strikers-goals-tournament-2026" target="_blank" rel="noopener noreferrer">FIFA公式 - 予選得点者一覧</a></li>
            <li><a href="https://www.bundesliga.com/en/bundesliga/player/harry-kane" target="_blank" rel="noopener noreferrer">Bundesliga - Kane Stats</a></li>
            <li><a href="https://www.premierleague.com/en/players/223094/erling-haaland/stats" target="_blank" rel="noopener noreferrer">PL - Haaland Stats</a></li>
            <li><a href="https://www.espn.com/soccer/story/_/id/46664763/fifa-mens-top-50-world-rankings" target="_blank" rel="noopener noreferrer">ESPN - FIFA Rankings April 2026</a></li>
            <li><a href="https://foot-africa.com/en/news/amoura-beats-salah-top-scorers-of-africas-2026-world-cup-qualifiers-919092/" target="_blank" rel="noopener noreferrer">Foot Africa - CAF予選得点王</a></li>
            <li><a href="https://www.si.com/soccer/2026-world-cup-favorites-win-golden-boot-ranked" target="_blank" rel="noopener noreferrer">SI - Golden Boot Favorites</a></li>
            <li><a href="https://www.rotowire.com/soccer/article/2026-world-cup-groups-full-group-by-group-preview-analysis-projections-and-dark-horses-100836" target="_blank" rel="noopener noreferrer">RotoWire - Group Preview</a></li>
            <li><a href="https://www.beinsports.com/en-us/soccer/uefa-champions-league/articles/julian-alvarez-sets-a-record-with-atletico-madrid-in-the-champions-league-2026-04-09" target="_blank" rel="noopener noreferrer">beIN - Álvarez CL Record</a></li>
          </ul>
        </details>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-colors">
            {ja ? '← トップページに戻る' : '← Back to Home'}
          </Link>
        </div>
      </main>
    </div>
  );
}
