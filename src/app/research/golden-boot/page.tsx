'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

/* ── data ── */

const best5 = [
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
    clubDetail: 'BuLi 33G + CL 14G',
    gsRating: '高い',
    gsRatingEn: 'High',
    gsColor: 'text-green-400',
    tags: ['2018年W杯得点王', 'BuLi 3年連続得点王', 'PK担当', 'イングランド歴代最多78G'],
    tagsEn: ['2018 WC Golden Boot', 'BuLi 3x top scorer', 'PK taker', 'England all-time top scorer 78G'],
    injury: '軽度（足首・ふくらはぎ）',
    injuryEn: 'Minor (ankle, calf)',
    injuryLevel: 'low',
    verdict: 'クラブ成績・W杯実績・GS組み合わせの3軸すべてで高評価。パナマ・ガーナ戦で3-4得点は現実的。2018年に続く2度目の得点王は十分射程圏内。',
    verdictEn: 'Top marks on all 3 axes: club form, WC pedigree, group draw. 3-4 goals vs Panama/Ghana is realistic. Second Golden Boot is well within reach.',
    sources: [
      { label: 'Bundesliga公式', url: 'https://www.bundesliga.com/en/bundesliga/player/harry-kane' },
      { label: 'UEFA CL Stats', url: 'https://www.uefa.com/uefachampionsleague/clubs/players/250016833--harry-kane/statistics/' },
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
    clubDetail: 'BuLi 15G+13A / 全大会24G+17A',
    gsRating: '最高',
    gsRatingEn: 'Best',
    gsColor: 'text-emerald-400',
    tags: ['GS組み合わせ最有利', 'コパ2021得点王', '怪我なしフル稼働', '取りにくい相手ゼロ'],
    tagsEn: ['Best group draw', 'Copa 2021 Golden Boot', 'Injury-free', 'No tough opponent'],
    injury: 'なし',
    injuryEn: 'None',
    injuryLevel: 'none',
    verdict: 'GS組み合わせが全候補中最も有利。ウズベキスタン・コンゴDRは守備が弱く、ポルトガルも予選で1試合平均1.17失点。「取りにくい相手がゼロ」は唯一無二。',
    verdictEn: 'Best group draw of all candidates. Uzbekistan & DR Congo have weak defenses, and even Portugal conceded 1.17/game in qualifying. Zero tough opponents is unmatched.',
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
    qualGames: 0,
    clubGoals: '43',
    clubDetail: 'LaLiga 22-24G + CL 15G(得点王)',
    gsRating: '中〜高',
    gsRatingEn: 'Medium-High',
    gsColor: 'text-yellow-400',
    tags: ['W杯通算12G(現役最多級)', 'CL得点王15G', '2022年W杯得点王', 'ハムストリング負傷(4月)'],
    tagsEn: ['12 WC goals (active leader)', 'CL top scorer 15G', '2022 WC Golden Boot', 'Hamstring injury (Apr)'],
    injury: 'ハムストリング負傷(4/24) — W杯開幕に間に合うか不透明',
    injuryEn: 'Hamstring injury (4/24) — WC fitness uncertain',
    injuryLevel: 'high',
    verdict: 'W杯通算12得点は歴代級。イラク戦で大量得点の可能性大。しかし4月のハムストリング負傷がW杯開幕に間に合うか不透明。フィットすれば本命。',
    verdictEn: '12 career WC goals is elite-tier. Likely to feast vs Iraq. But April hamstring injury makes WC fitness uncertain. If fit, he\'s the favorite.',
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
    qualGoals: 0,
    qualGames: 0,
    clubGoals: '20',
    clubDetail: 'SerieA 17G+6A / CL 4G',
    gsRating: '非常に高い',
    gsRatingEn: 'Very High',
    gsColor: 'text-green-400',
    tags: ['コパ2024得点王', 'GS組み合わせ有利', '筋肉再負傷(4月)', 'インテル歴代3位171G'],
    tagsEn: ['Copa 2024 Golden Boot', 'Favorable group', 'Muscle re-injury (Apr)', 'Inter all-time 3rd 171G'],
    injury: '筋肉負傷再発(4/12) — コンディション不安大',
    injuryEn: 'Muscle re-injury (4/12) — Major fitness concern',
    injuryLevel: 'high',
    verdict: 'GS組み合わせは有利（ヨルダンはW杯初出場、DF全員国内リーグ）。コパ2024得点王の実績。ただし4月に筋肉負傷が再発しコンディション不安。',
    verdictEn: 'Favorable group (Jordan WC debutants, all domestic defenders). Copa 2024 Golden Boot pedigree. But April muscle re-injury is a major concern.',
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
    clubDetail: 'PL 35G(最多記録更新) + CL 8G',
    gsRating: '低い',
    gsRatingEn: 'Low',
    gsColor: 'text-red-400',
    tags: ['PL最多記録35G', 'UEFA予選16G(記録)', 'W杯初出場', 'GS最も不利(仏+セネガル)'],
    tagsEn: ['PL record 35G', 'UEFA qual. 16G (record)', 'WC debut', 'Worst group (FRA+SEN)'],
    injury: 'なし（良好）',
    injuryEn: 'None (fit)',
    injuryLevel: 'none',
    verdict: '得点力だけなら世界最強。だがGS組み合わせが最悪。フランス(FIFA1位)とセネガル(予選10試合3失点)に挟まれ、得点を稼げるのはイラク戦のみ。これが「予選得点だけで選ばない」独自視点の核心。',
    verdictEn: 'Best pure goalscorer on Earth. But worst group for scoring: France (FIFA #1) and Senegal (3 goals conceded in 10 qualifiers). Only Iraq offers easy goals. This is the core of the "don\'t just pick by qualifying goals" thesis.',
    sources: [
      { label: 'Yahoo Sports 予選16G', url: 'https://sports.yahoo.com/article/erling-haaland-scores-16-goals-192000362.html' },
      { label: 'PL公式', url: 'https://www.premierleague.com/en/players/223094/erling-haaland/stats' },
    ],
  },
];

const darkhorses = [
  {
    name: 'Patrik Schick',
    nameJa: 'パトリク・シック',
    age: 30,
    nation: 'チェコ',
    nationEn: 'Czech Republic',
    flag: '🇨🇿',
    club: 'レヴァークーゼン',
    pos: 'CF',
    foot: '左',
    group: 'A',
    opponents: ['メキシコ', '韓国', '南アフリカ'],
    opponentsEn: ['Mexico', 'South Korea', 'South Africa'],
    clubGoals: '20 (BuLi16+CL4)',
    qualGoals: 4,
    hook: 'EURO2020で5得点＆ハーフウェイラインからのスーパーゴール。国際大会で化ける実績付き。',
    hookEn: '5 goals at EURO 2020 + iconic half-way line goal. Proven tournament performer.',
    tags: ['EURO2020銀靴(5G)', 'BuLi 16G+CL 4G', '南アフリカ戦がチャンス'],
    tagsEn: ['EURO 2020 Silver Boot (5G)', 'BuLi 16G + CL 4G', 'South Africa = opportunity'],
    stars: 5,
    sources: [
      { label: 'UEFA EURO 2020', url: 'https://www.uefa.com/uefaeuro/history/news/026b-12bee5573e30-07a21f6d1f12-1000--patrik-schick-wins-uefa-euro-2020-goal-of-the-tournament/' },
    ],
  },
  {
    name: 'Mohamed Amoura',
    nameJa: 'モハメド・アムーラ',
    age: 26,
    nation: 'アルジェリア',
    nationEn: 'Algeria',
    flag: '🇩🇿',
    club: 'ヴォルフスブルク',
    pos: 'CF',
    foot: '右',
    group: 'J',
    opponents: ['アルゼンチン', 'オーストリア', 'ヨルダン'],
    opponentsEn: ['Argentina', 'Austria', 'Jordan'],
    clubGoals: '8 (BuLi)',
    qualGoals: 10,
    hook: 'サラーを上回りアフリカ予選得点王。チーム総得点の42%を1人で記録。日本での知名度ほぼゼロ。',
    hookEn: 'Outscored Salah as Africa\'s top qualifier scorer. Scored 42% of Algeria\'s goals. Unknown in Japan.',
    tags: ['CAF予選得点王(10G)', 'サラー超え', '12年ぶりW杯のエース', '169cm小柄カウンター型'],
    tagsEn: ['CAF qual. top scorer (10G)', 'Outscored Salah', '12-yr WC return ace', '169cm counter-attacker'],
    stars: 4,
    sources: [
      { label: 'Foot Africa', url: 'https://foot-africa.com/en/news/amoura-beats-salah-top-scorers-of-africas-2026-world-cup-qualifiers-919092/' },
      { label: 'The National', url: 'https://www.thenationalnews.com/sport/football/2026/04/25/mohamed-amoura-small-in-stature-big-on-impact-and-carrying-algerias-world-cup-hopes/' },
    ],
  },
  {
    name: 'Folarin Balogun',
    nameJa: 'フォラリン・バログン',
    age: 24,
    nation: 'アメリカ',
    nationEn: 'USA',
    flag: '🇺🇸',
    club: 'モナコ',
    pos: 'CF',
    foot: '右',
    group: 'D',
    opponents: ['パラグアイ', 'オーストラリア', 'トルコ'],
    opponentsEn: ['Paraguay', 'Australia', 'Turkey'],
    clubGoals: '18 (L1 13+CL 5)',
    qualGoals: 0,
    hook: '開催国アメリカのエースFW候補。トルコは予選8試合12失点でGS最弱守備。ホームの大歓声がブースト。',
    hookEn: 'Host nation USA\'s ace FW. Turkey conceded 12 in 8 qualifiers (worst defense). Home crowd boost.',
    tags: ['開催国エースFW', 'L1 13G+CL 5G', '直近11試合8G', 'トルコ戦が大チャンス'],
    tagsEn: ['Host nation ace', 'L1 13G + CL 5G', '8G in last 11', 'Turkey = big chance'],
    stars: 4,
    sources: [
      { label: 'beIN Sports', url: 'https://www.beinsports.com/en-us/soccer/ligue-1/articles/folarin-balogun-on-fire-the-streak-that-is-revolutionizing-ligue-1-with-monaco-2026-03-23' },
      { label: 'Goal.com', url: 'https://www.goal.com/en-us/lists/meet-the-usmnt-monaco-star-folarin-balogun-approaches-world-cup-moment-that-has-always-been-on-his-radar/bltf3ec6b00a486a72b' },
    ],
  },
];

const gsDefense: Record<string, { teams: { name: string; nameEn: string; rank: number; rating: string; ratingEn: string; note: string; noteEn: string; color: string }[] }> = {
  L: {
    teams: [
      { name: 'クロアチア', nameEn: 'Croatia', rank: 10, rating: '取りにくい', ratingEn: 'Hard', note: '予選4失点/8試合', noteEn: '4 conc./8 games', color: 'border-red-500' },
      { name: 'パナマ', nameEn: 'Panama', rank: 33, rating: '取りやすい', ratingEn: 'Easy', note: 'ローブロック型', noteEn: 'Low block', color: 'border-green-500' },
      { name: 'ガーナ', nameEn: 'Ghana', rank: 74, rating: '普通', ratingEn: 'Medium', note: 'Salisu(モナコ)が柱', noteEn: 'Salisu (Monaco) leads', color: 'border-yellow-500' },
    ],
  },
  K: {
    teams: [
      { name: 'ポルトガル', nameEn: 'Portugal', rank: 6, rating: '普通', ratingEn: 'Medium', note: '予選7失点/6試合(1.17/試合)', noteEn: '7 conc./6 games (1.17/g)', color: 'border-yellow-500' },
      { name: 'ウズベキスタン', nameEn: 'Uzbekistan', rank: 50, rating: '取りやすい', ratingEn: 'Easy', note: 'W杯初出場', noteEn: 'WC debut', color: 'border-green-500' },
      { name: 'コンゴDR', nameEn: 'DR Congo', rank: 46, rating: '取りやすい', ratingEn: 'Easy', note: 'プレーオフ辛勝', noteEn: 'Playoff squeaker', color: 'border-green-500' },
    ],
  },
  I: {
    teams: [
      { name: 'セネガル', nameEn: 'Senegal', rank: 14, rating: '取りにくい', ratingEn: 'Hard', note: '予選3失点/10試合', noteEn: '3 conc./10 games', color: 'border-red-500' },
      { name: 'ノルウェー', nameEn: 'Norway', rank: 31, rating: '普通', ratingEn: 'Medium', note: '予選5失点/8試合', noteEn: '5 conc./8 games', color: 'border-yellow-500' },
      { name: 'イラク', nameEn: 'Iraq', rank: 57, rating: '取りやすい', ratingEn: 'Easy', note: '40年ぶり出場、欧州組不在', noteEn: '40-yr return, no EU players', color: 'border-green-500' },
    ],
  },
  J: {
    teams: [
      { name: 'オーストリア', nameEn: 'Austria', rank: 24, rating: '普通', ratingEn: 'Medium', note: 'ハイラインで裏抜け可', noteEn: 'High line vulnerable', color: 'border-yellow-500' },
      { name: 'アルジェリア', nameEn: 'Algeria', rank: 28, rating: '普通', ratingEn: 'Medium', note: '予選7失点/10試合', noteEn: '7 conc./10 games', color: 'border-yellow-500' },
      { name: 'ヨルダン', nameEn: 'Jordan', rank: 63, rating: '取りやすい', ratingEn: 'Easy', note: 'W杯初出場、DF全員国内', noteEn: 'WC debut, all domestic DF', color: 'border-green-500' },
    ],
  },
};

/* ── component ── */

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
            {ja ? 'W杯2026 得点王候補リサーチ' : '2026 WC Golden Boot Research'}
          </h1>
          <p className="text-amber-200 text-sm sm:text-base">
            {ja ? 'GS組み合わせから逆算した独自視点の分析' : 'Unique analysis: reverse-engineered from group draw'}
          </p>
          <p className="text-xs text-amber-300 mt-2">
            {ja ? 'リサーチ日: 2026-05-12 | 非公開資料' : 'Research date: 2026-05-12 | Internal use only'}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Concept */}
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-bold text-amber-900 mb-2">
            {ja ? '独自視点コンセプト' : 'Unique Angle'}
          </h2>
          <p className="text-sm text-amber-800">
            {ja
              ? '予選の得点数だけで選ぶのではなく、「GS組み合わせから逆算して、得点を量産しやすい選手」を選ぶ。3つの軸: (1) W杯予選の得点力 (2) 2025-26クラブシーズンの調子 (3) GS組み合わせの有利さ'
              : 'Not just qualifying goals — pick players most likely to score in the actual group stage. 3 axes: (1) Qualifying goals (2) 2025-26 club form (3) Group stage draw favorability'}
          </p>
        </div>

        {/* ===== BEST 5 ===== */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {ja ? 'ベスト5' : 'Best 5'}
        </h2>

        <div className="space-y-6 mb-16">
          {best5.map((p) => (
            <div key={p.rank} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">#{p.rank}</span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black">{p.flag} {p.name}</h3>
                    <p className="text-xs text-gray-300">
                      {p.age}{ja ? '歳' : 'yo'} / {ja ? p.nation : p.nationEn} / {p.club} / {p.pos} / {p.foot}{ja ? '足' : ''}
                      {p.pk && <span className="ml-2 px-1.5 py-0.5 bg-amber-600 rounded text-[10px] font-bold">PK</span>}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-4">
                {/* 3 axes */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? '予選得点' : 'Qual. Goals'}</p>
                    <p className="text-2xl font-black text-gray-800">{p.qualGoals || '-'}</p>
                    {p.qualGames > 0 && <p className="text-[10px] text-gray-400">/ {p.qualGames}{ja ? '試合' : ' games'}</p>}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? 'クラブ全得点' : 'Club Goals'}</p>
                    <p className="text-2xl font-black text-gray-800">{p.clubGoals}</p>
                    <p className="text-[10px] text-gray-400">{p.clubDetail.split('/')[0]}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{ja ? 'GS有利度' : 'GS Favorability'}</p>
                    <p className={`text-lg font-black ${p.gsColor}`}>{ja ? p.gsRating : p.gsRatingEn}</p>
                    <p className="text-[10px] text-gray-400">{ja ? 'グループ' : 'Group'} {p.group}</p>
                  </div>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1.5">
                  {(ja ? p.tags : p.tagsEn).map((t, i) => (
                    <span key={i} className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                      t.includes('負傷') || t.includes('injury') || t.includes('不利') || t.includes('Worst')
                        ? 'bg-red-100 text-red-700'
                        : t.includes('得点王') || t.includes('Golden Boot') || t.includes('最有利') || t.includes('Best') || t.includes('記録') || t.includes('record')
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* GS opponents */}
                <div>
                  <p className="text-xs font-bold text-gray-500 mb-2">{ja ? 'GS対戦相手の守備力' : 'GS Opponents Defense'}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {gsDefense[p.group]?.teams.map((t, i) => (
                      <div key={i} className={`border-l-4 ${t.color} bg-gray-50 rounded-r-lg p-2`}>
                        <p className="text-xs font-bold text-gray-800">{ja ? t.name : t.nameEn}</p>
                        <p className="text-[10px] text-gray-500">FIFA {t.rank}{ja ? '位' : 'th'}</p>
                        <p className={`text-[11px] font-bold mt-1 ${
                          t.color === 'border-green-500' ? 'text-green-600' : t.color === 'border-red-500' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {ja ? t.rating : t.ratingEn}
                        </p>
                        <p className="text-[10px] text-gray-400">{ja ? t.note : t.noteEn}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* injury */}
                {p.injuryLevel !== 'none' && (
                  <div className={`rounded-lg p-3 text-sm ${p.injuryLevel === 'high' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'}`}>
                    <span className="font-bold">{ja ? '負傷情報: ' : 'Injury: '}</span>
                    {ja ? p.injury : p.injuryEn}
                  </div>
                )}

                {/* verdict */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900">{ja ? p.verdict : p.verdictEn}</p>
                </div>

                {/* sources */}
                <div className="flex flex-wrap gap-2">
                  {p.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-500 hover:underline">
                      [{s.label}]
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== DARK HORSES ===== */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {ja ? 'ダークホース枠' : 'Dark Horses'}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {ja ? '王道リストの単純な下位ではない、独自の面白さがある候補' : 'Not just overflow from the main list — uniquely interesting candidates'}
        </p>

        <div className="space-y-6 mb-16">
          {darkhorses.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl border-2 border-red-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-red-900 to-red-700 text-white p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-red-300">DH</span>
                  <div>
                    <h3 className="text-xl font-black">{p.flag} {p.name}</h3>
                    <p className="text-xs text-red-200">
                      {p.age}{ja ? '歳' : 'yo'} / {ja ? p.nation : p.nationEn} / {p.club} / {p.pos} / {p.foot}{ja ? '足' : ''}
                    </p>
                  </div>
                  <div className="ml-auto text-amber-300 text-sm">{'★'.repeat(p.stars)}{'☆'.repeat(5 - p.stars)}</div>
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-900 font-medium">{ja ? p.hook : p.hookEn}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 font-bold">{ja ? '予選得点' : 'Qual. Goals'}</p>
                    <p className="text-2xl font-black text-gray-800">{p.qualGoals || '-'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-500 font-bold">{ja ? 'クラブ得点' : 'Club Goals'}</p>
                    <p className="text-xl font-black text-gray-800">{p.clubGoals}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">{ja ? 'グループ' : 'Group'} {p.group}: {(ja ? p.opponents : p.opponentsEn).join(' / ')}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {(ja ? p.tags : p.tagsEn).map((t, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">{t}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {p.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="text-[10px] text-blue-500 hover:underline">
                      [{s.label}]
                    </a>
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
              ? '⚠️ 注意: 全データは2026年5月12日時点の情報です。負傷情報は大会前に変更される可能性があります。FIFAランキングは2026年4月時点。「⚠️要確認」マークの数値は複数ソース間で差異が確認されたもの。本資料は動画制作用の内部リサーチ資料であり、一般公開用ではありません。'
              : '⚠️ Note: All data sourced on 2026-05-12. Injury info may change. FIFA rankings as of April 2026. Values marked "⚠️" have discrepancies across sources. Internal research material — not for public distribution.'}
          </p>
        </div>

        {/* Sources summary */}
        <details className="bg-white rounded-2xl border border-gray-200 p-4 mb-8">
          <summary className="text-sm font-bold text-gray-700 cursor-pointer">
            {ja ? '主要出典一覧（クリックで展開）' : 'Sources (click to expand)'}
          </summary>
          <ul className="mt-3 space-y-1 text-xs text-blue-600">
            <li><a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/final-draw-results" target="_blank" rel="noopener noreferrer">FIFA公式 - 抽選結果</a></li>
            <li><a href="https://www.uefa.com/european-qualifiers/news/0297-1d5d6735f8d7-9bf819c5c8e9-1000--european-qualifiers-top-scorer-erling-haaland/" target="_blank" rel="noopener noreferrer">UEFA公式 - 欧州予選得点王</a></li>
            <li><a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/strikers-goals-tournament-2026" target="_blank" rel="noopener noreferrer">FIFA公式 - 予選得点者一覧</a></li>
            <li><a href="https://www.bundesliga.com/en/bundesliga/player/harry-kane" target="_blank" rel="noopener noreferrer">Bundesliga公式 - Kane Stats</a></li>
            <li><a href="https://www.premierleague.com/en/players/223094/erling-haaland/stats" target="_blank" rel="noopener noreferrer">PL公式 - Haaland Stats</a></li>
            <li><a href="https://www.espn.com/soccer/story/_/id/46664763/fifa-mens-top-50-world-rankings" target="_blank" rel="noopener noreferrer">ESPN - FIFA Rankings April 2026</a></li>
            <li><a href="https://foot-africa.com/en/news/amoura-beats-salah-top-scorers-of-africas-2026-world-cup-qualifiers-919092/" target="_blank" rel="noopener noreferrer">Foot Africa - CAF予選得点王</a></li>
            <li><a href="https://www.si.com/soccer/2026-world-cup-favorites-win-golden-boot-ranked" target="_blank" rel="noopener noreferrer">SI - Golden Boot Favorites</a></li>
            <li><a href="https://www.nbcsports.com/soccer/news/2026-world-cup-groups-confirmed-full-draw-groups-details" target="_blank" rel="noopener noreferrer">NBC Sports - Group Draw</a></li>
            <li><a href="https://www.rotowire.com/soccer/article/2026-world-cup-groups-full-group-by-group-preview-analysis-projections-and-dark-horses-100836" target="_blank" rel="noopener noreferrer">RotoWire - Group Preview</a></li>
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
