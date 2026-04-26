"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────
   オランダ代表 選手紹介 60秒ショート台本集
   非公開ページ（robots: noindex, nofollow）
   ────────────────────────────────────────────── */

type Script = {
  id: number;
  playerName: string;
  playerNameJa: string;
  position: string;
  club: string;
  hookTitle: string;
  body: string;
  sources: { label: string; url: string }[];
};

const scripts: Script[] = [
  // ──────────── 1. フィルジル・ファン・ダイク ────────────
  {
    id: 1,
    playerName: "Virgil van Dijk",
    playerNameJa: "フィルジル・ファン・ダイク",
    position: "CB",
    club: "リバプール",
    hookTitle: "世界最高のセンターバックが日本の前に立ちはだかる",
    body: `W杯でオランダが日本と同じグループに入った。

そしてこの男が、日本の前に立ちはだかる。

フィルジル・ファン・ダイク。身長193cm。

リバプールの絶対的キャプテン。オランダ代表のキャプテン。

2019年、UEFAチャンピオンズリーグ優勝。
同年、UEFA年間最優秀選手賞を受賞——ディフェンダーとして史上初。

バロンドールではメッシにわずか7ポイント差で2位。

…でもこの男、エリートの道を歩んできたわけじゃない。

少年時代、父親に捨てられ、母をひとりで支えた。
ウィレムIIのユースでは「限界がある」と言われた。

21歳の時には虫垂炎から腹膜炎を併発して、遺書を書いた。

そこから這い上がって、移籍金約142億円（7500万ポンド）——当時のDF世界最高額でリバプールへ。

プレミア制覇2回。CL制覇。代表キャプテンとして歴代最多72試合以上出場。

34歳。これが最後のW杯になるかもしれない。

日本は、この壁を超えられるか。`,
    sources: [
      { label: "Transfermarkt - Van Dijk プロフィール", url: "https://www.transfermarkt.us/virgil-van-dijk/profil/spieler/139208" },
      { label: "UEFA - 年間最優秀選手賞", url: "https://www.uefa.com/uefachampionsleague/news/0254-0e99dfdb0a8a-83156f467259-1000--virgil-van-dijk-wins-uefa-men-s-player-of-the-year-award/" },
      { label: "Liverpool FC 公式 - Van Dijk", url: "https://www.liverpoolfc.com/team/mens/player/virgil-van-dijk" },
      { label: "OneFootball - オランダ代表キャプテン記録", url: "https://onefootball.com/en/news/virgil-van-dijk-makes-history-as-netherlands-qualify-for-2026-world-cup-41966712" },
      { label: "ESPN - Why Van Dijk is best CB", url: "https://www.espn.com/soccer/story/_/id/45465679/why-liverpool-van-dijk-best-center-back-mens-soccer" },
    ],
  },

  // ──────────── 2. コーディ・ガクポ ────────────
  {
    id: 2,
    playerName: "Cody Gakpo",
    playerNameJa: "コーディ・ガクポ",
    position: "LW / FW",
    club: "リバプール",
    hookTitle: "W杯で3戦連続ゴールした男が、また来る",
    body: `覚えてる？　2022年カタールW杯。

グループステージ3試合連続でゴールを決めた男がいた。

しかも全部、先制点。

コーディ・ガクポ。193cmの大型ウインガー。

父はトーゴ出身のサッカー選手。母はオランダのラグビー代表。
アスリートのDNAを受け継いで、オランダ・アイントホーフェンで生まれた。

6歳でPSVの下部組織に入り、トップチームで覚醒。
2022年にはオランダ年間最優秀選手に選出。

カタールW杯後、リバプールが約70億円（3700万ポンド）で獲得。

そして2024年のEURO——ここでも3ゴール。
ゴールデンブート（得点王）を受賞した。

W杯でもEUROでも大舞台で必ず点を取る。

今季リバプールでは公式戦173試合49ゴールに到達。

左サイドから中に切り込んで右足で曲がるシュート。
193cmの高さを活かしたヘディング。

日本のディフェンスラインにとって、最も警戒すべき男の一人だ。`,
    sources: [
      { label: "FIFA+ - ガクポ 2022W杯全ゴール", url: "https://www.plus.fifa.com/en/content/cody-gakpo-all-goals-fifa-world-cup-qatar-2022-tm/9ee223ee-7696-4aa0-ac8b-cf7965283b17" },
      { label: "Premier League - ガクポ プロフィール", url: "https://www.premierleague.com/en/players/243298/cody-gakpo/stats" },
      { label: "This Is Anfield - EURO 2024ゴールデンブート", url: "https://www.thisisanfield.com/2024/07/cody-gakpo-has-left-euro-2024-with-golden-boot-award-after-uefa-rule-change/" },
      { label: "LFChistory.net - ガクポ通算成績", url: "https://www.lfchistory.net/players/player/profile/1409" },
      { label: "Sky Sports - リバプール移籍", url: "https://www.skysports.com/football/news/11669/12775231/cody-gakpo-liverpool-complete-transfer-of-netherlands-international-forward-from-psv" },
    ],
  },

  // ──────────── 3. シャビ・シモンズ ────────────
  {
    id: 3,
    playerName: "Xavi Simons",
    playerNameJa: "シャビ・シモンズ",
    position: "AM / RW",
    club: "トッテナム",
    hookTitle: "バルサが逃がした天才少年、22歳の現在地",
    body: `この選手の名前、「シャビ」っていうんだけど、

あのバルセロナのレジェンド、シャビ・エルナンデスから名付けられた。

シャビ・シモンズ。2003年生まれ、22歳。

7歳でバルセロナのラ・マシアに入団。
14歳でインスタフォロワー100万人を突破した天才少年。

でも16歳の時、契約交渉が決裂してパリ・サンジェルマンへ移籍。

PSGでは出場機会に恵まれず、PSVへレンタル。
ここで大爆発——オランダリーグ得点王タイの19ゴール。

その後ライプツィヒで2シーズン、78試合22ゴール22アシスト。

2024年EURO準決勝のイングランド戦——
開始7分、ミドルレンジから時速116kmの弾丸シュート。

あの一撃で世界が震えた。

2025年夏、約98億円（5180万ポンド）でトッテナムへ移籍。背番号7。

まだ22歳。このW杯が、世界的スターへの分岐点になる。`,
    sources: [
      { label: "Transfermarkt - シモンズ プロフィール", url: "https://www.transfermarkt.us/xavi-simons/profil/spieler/566931" },
      { label: "Tottenham 公式 - シモンズ加入", url: "https://www.tottenhamhotspur.com/news/2025/august/xavi-simons-joins-from-rb-leipzig/" },
      { label: "Sky Sports - トッテナム移籍5180万ポンド", url: "https://www.skysports.com/football/news/11095/13420373/xavi-simons-transfer-latest-tottenham-sign-attacker-from-rb-leipzig-in-deal-worth-51m" },
      { label: "Barca Universal - 名前の由来", url: "https://barcauniversal.com/xavi-simons-father-admits-why-his-son-is-named-xavi/" },
      { label: "GiveMeSport - EURO準決勝ゴール", url: "https://www.givemesport.com/xavi-simons-scores-screamer-against-england-inside-seven-minutes/" },
    ],
  },

  // ──────────── 4. フレンキー・デ・ヨング ────────────
  {
    id: 4,
    playerName: "Frenkie de Jong",
    playerNameJa: "フレンキー・デ・ヨング",
    position: "CM",
    club: "バルセロナ",
    hookTitle: "プレスを受けても絶対にボールを失わない男",
    body: `このMF、ちょっとおかしい。

3人に囲まれても、ボールを奪われない。

フレンキー・デ・ヨング。バルセロナの背番号21。

2018-19シーズン、アヤックスの一員としてCLで旋風を巻き起こした。

レアル・マドリードを倒し、ユベントスを倒し、準決勝へ。

あの大会のCL最優秀MFに選出。

バルセロナが移籍金約140億円（7500万ユーロ）で獲得——当時のMF史上最高額クラス。

何がすごいかって、この男はパスじゃなくて「持ち運ぶ」。

中盤の底からドリブルで相手のプレスラインを突破する。
体の向きを変えるだけで2人を置き去りにする。

あのシャビに「時代を築ける選手」と言わしめた。

ただし、ここ数年は足首の怪我に苦しんだ。
2024年のEUROは欠場。カタールW杯以来の大舞台になる。

バルセロナでスペインリーグ2回制覇。スペイン国王杯2回。

28歳。完全復活したデ・ヨングが、W杯の中盤を支配する。`,
    sources: [
      { label: "Transfermarkt - デ・ヨング プロフィール", url: "https://www.transfermarkt.us/frenkie-de-jong/profil/spieler/326330" },
      { label: "UEFA - CL最優秀MF 2018-19", url: "https://www.uefa.com/uefachampionsleague/news/0254-0e99ddf91193-3a1ed0d12675-1000--frenkie-de-jong-champions-league-midfielder-of-the-season/" },
      { label: "FC Barcelona 公式", url: "https://www.fcbarcelona.com/en/football/first-team/players/16291/frenkie-de-jong" },
      { label: "FOX Sports - EURO 2024欠場", url: "https://www.foxsports.com/stories/soccer/netherlands-midfielder-frenkie-de-jong-is-ruled-out-of-euro-2024-by-an-ankle-injury" },
      { label: "Coaches' Voice - プレースタイル分析", url: "https://learning.coachesvoice.com/cv/frenkie-de-jong-barcelona-ajax/" },
    ],
  },

  // ──────────── 5. メンフィス・デパイ ────────────
  {
    id: 5,
    playerName: "Memphis Depay",
    playerNameJa: "メンフィス・デパイ",
    position: "FW",
    club: "コリンチャンス",
    hookTitle: "ユニフォームに名字を刻まない男——オランダ歴代最多得点者",
    body: `この男のユニフォームの背中には、「MEMPHIS」としか書いていない。

名字がない。

メンフィス・デパイ。オランダ代表の歴代最多得点者。

4歳の時に父親に捨てられた。
「あの男の名前は背負わない。俺をデパイと呼ぶな、メンフィスと呼べ。」

18歳からユニフォームに名字を入れていない。

PSVでブレイクし、マンチェスター・ユナイテッドへ。
リヨンで復活し、バルセロナ、アトレティコ・マドリードを経て、
現在はブラジルのコリンチャンスでプレー。

そして2025年9月——オランダ代表通算51ゴール目を決めて、
ロビン・ファン・ペルシーの歴代記録を更新した。

しかもファン・ペルシーと全く同じ102試合目での達成。

現在、108キャップ55ゴール。

32歳。ブラジルからW杯に乗り込む、オランダの歴史を背負うストライカー。

背中にある4文字——MEMPHISは、この男の生き様そのものだ。`,
    sources: [
      { label: "FIFA.com - メンフィス歴代最多得点者", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/memphis-depay-netherlands-top-scorer" },
      { label: "Flashscore - 51ゴール目で記録更新", url: "https://www.flashscore.com/news/soccer-world-championship-memphis-depay-breaks-van-persie-s-all-time-netherlands-record-with-51st-goal/txNyAMaD/" },
      { label: "GiveMeSport - 名字を入れない理由", url: "https://www.givemesport.com/why-memphis-depay-doesnt-have-his-surname-on-his-shirt/" },
      { label: "Transfermarkt - デパイ プロフィール", url: "https://www.transfermarkt.us/memphis-depay/profil/spieler/167850" },
      { label: "Wikipedia - Memphis Depay", url: "https://en.wikipedia.org/wiki/Memphis_Depay" },
    ],
  },

  // ──────────── 6. ライアン・フラーフェンベルフ ────────────
  {
    id: 6,
    playerName: "Ryan Gravenberch",
    playerNameJa: "ライアン・フラーフェンベルフ",
    position: "CM / DM",
    club: "リバプール",
    hookTitle: "16歳でアヤックス史上最年少デビュー、覚醒の理由はスロットの一言",
    body: `16歳130日。

アヤックスのオランダリーグ史上最年少出場記録を塗り替えた男がいる。

それが、ライアン・フラーフェンベルフ。

クラレンス・セードルフの記録を破って、トップチームに定着。

アヤックスでオランダリーグ3連覇。

バイエルン・ミュンヘンに移籍金約35億円（1850万ユーロ）で加入するも、出場機会に恵まれず。

2023年、リバプールへ約75億円（4000万ユーロ）で移籍。

ここでも最初は苦しんだ。

でも、アルネ・スロット監督が就任して全てが変わった。

攻守両方を走り回るタイプだったフラーフェンベルフを、
中盤の底で守備の舵を取る役割に転向させた。

この判断が大当たり。

プレミアリーグ全MFの中でボール奪取数トップ。
パス成功率89%超え。

2024-25シーズン、リバプールのプレミアリーグ優勝に貢献し、
プレミアリーグ若手最優秀選手賞を受賞。

190cm。23歳。まだまだ伸びしろしかない。`,
    sources: [
      { label: "Wikipedia - Ryan Gravenberch", url: "https://en.wikipedia.org/wiki/Ryan_Gravenberch" },
      { label: "Premier League - スロットのもとでの覚醒", url: "https://www.premierleague.com/en/news/4316446" },
      { label: "Liverpool FC 公式", url: "https://www.liverpoolfc.com/team/mens/player/ryan-gravenberch" },
      { label: "Transfermarkt - フラーフェンベルフ", url: "https://www.transfermarkt.us/ryan-gravenberch/profil/spieler/478573" },
      { label: "Sky Sports - リバプール移籍3420万ポンド", url: "https://www.skysports.com/football/news/11095/12951803/ryan-gravenberch-liverpool-sign-midfielder-from-bayern-munich-for-gbp34-2m-on-deadline-day" },
    ],
  },

  // ──────────── 7. ティヤニ・レインデルス ────────────
  {
    id: 7,
    playerName: "Tijjani Reijnders",
    playerNameJa: "ティヤニ・レインデルス",
    position: "CM",
    club: "マンチェスター・シティ",
    hookTitle: "スーパーでレジ打ちしてた男が、マンCの中盤を支配してる",
    body: `21歳の時、プロとしての出場はたった3試合だった。

スーパーマーケットのAldiでレジ打ちと品出しをしていた。

母親が「スタッフ募集」の張り紙を見つけて、応募させた。

ティヤニ・レインデルス。

父はオランダの元プロサッカー選手。
母はインドネシア系——モルッカ諸島にルーツを持つ。

名前の「ティヤニ」は、ナイジェリアのサッカー選手ティジャニ・ババンギダから取られた。

下部組織を転々とし、アマチュアリーグも経験。
AZアルクマールのリザーブチームで4シーズンを過ごした。

遅咲きの中の遅咲き。

でもそこから一気に駆け上がった。

ACミランが約38億円（2050万ユーロ）で獲得。イタリアリーグの最優秀MFに選出。

そして2025年夏、マンチェスター・シティが約88億円（4630万ポンド）で獲得。

プレミアデビュー戦で1ゴール1アシスト。

本人が言ってる。「僕は遅咲きだ。でも最終的に、子供の頃の夢を叶えた。」

27歳。このW杯が、世界にその名を刻む舞台になる。`,
    sources: [
      { label: "Premier League - スーパーからマンCへ", url: "https://www.premierleague.com/en/news/4323584" },
      { label: "Man City 公式 - 10のこと", url: "https://www.mancity.com/news/mens/tijjani-reijnders-10-things-man-city-63885225" },
      { label: "FIFA.com - レインデルス インタビュー", url: "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/reijnders-leader-netherlands" },
      { label: "Sky Sports - マンC移籍4630万ポンド", url: "https://www.skysports.com/football/news/11095/13379209/tijjani-reijnders-transfer-man-city-complete-lb46-3m-deal-to-sign-midfielder-from-ac-milan-on-five-year-contract" },
      { label: "BBN Times - 両親の影響", url: "https://www.bbntimes.com/society/how-angelina-lekatompessy-and-martin-reijnders-shaped-tijjani-reijnders-football-career" },
    ],
  },

  // ──────────── 8. ユリエン・ティンバー ────────────
  {
    id: 8,
    playerName: "Jurrien Timber",
    playerNameJa: "ユリエン・ティンバー",
    position: "CB / RB / LB",
    club: "アーセナル",
    hookTitle: "プレミアデビューで膝の靭帯断裂——地獄から蘇った万能ディフェンダー",
    body: `2023年8月。アーセナルのプレミアリーグ開幕戦。

約65億円（3400万ポンド）で加入した新戦力が、ピッチに立った。

ユリエン・ティンバー。

その試合で、膝の前十字靭帯を断裂。選手生命に関わる大怪我だ。

プレミアリーグデビュー戦で、シーズン全休が確定した。

普通なら心が折れる。

でも、この男はそこから完全に這い上がった。

2025-26シーズン、全コンペティション43試合に出場。

センターバック、右サイドバック、左サイドバック——守備のどこでも高水準でプレーできる万能性。

しかも双子の弟、キンテン・ティンバーもオランダ代表。
2024年9月、兄弟揃ってオランダ代表として同じピッチに立った。

オランダ代表で双子が同時にプレーするのは史上3組目。

身長179cmとセンターバックとしては小柄だが、1対1の強さと後方からの正確なパスで攻撃の起点を作る力は一級品。

アーセナルの右サイドを完全に支配する25歳。

W杯2026、最終ラインの要になる男だ。`,
    sources: [
      { label: "Arsenal 公式 - ティンバー プロフィール", url: "https://www.arsenal.com/men/players/jurrien-timber" },
      { label: "Sky Sports - ACL断裂", url: "https://www.skysports.com/football/news/11670/12940070/jurrien-timber-arsenal-defender-sidelined-for-long-term-period-after-sustaining-acl-injury-on-premier-league-debut" },
      { label: "Transfermarkt - ティンバー", url: "https://www.transfermarkt.us/jurrien-timber/profil/spieler/420243" },
      { label: "FotMob - 2025-26成績", url: "https://www.fotmob.com/players/942381/jurrien-timber" },
      { label: "Flashscore - キンテン・ティンバー マルセイユ移籍", url: "https://www.flashscore.com/news/soccer-ligue-1-marseille-announce-signing-of-netherlands-international-quinten-timber-from-feyenoord/x2RRGGBT/" },
    ],
  },

  // ──────────── 9. ミッキー・ファン・デ・フェン ────────────
  {
    id: 9,
    playerName: "Micky van de Ven",
    playerNameJa: "ミッキー・ファン・デ・フェン",
    position: "CB",
    club: "トッテナム",
    hookTitle: "プレミア史上最速の男は、センターバックだった",
    body: `プレミアリーグ史上、最も速い選手は誰か？

サラー？　三笘？　サカ？

違う。センターバックだ。

ミッキー・ファン・デ・フェン。時速37.38km。

これはプレミアリーグの計測史上、最速の記録。

参考までに、ウサイン・ボルトの100m世界記録時の平均速度は時速37.58km。

その差、わずか0.2km。

センターバックなのに、ボルトとほぼ同じ速度で走る。

193cmの長身を活かした空中戦の強さ。
左利きのセンターバックとして、後方から正確なパスで攻撃の組み立てにも貢献。
さらに最終ラインからドリブルで持ち上がる推進力。

FCフォレンダム、ヴォルフスブルクを経て、
2023年に約66億円（3450万ポンド）でトッテナムへ。

2025年のヨーロッパリーグ決勝では、
マンチェスター・ユナイテッド相手にゴールライン上で体を張ってシュートを弾き出し——
トッテナムの17年ぶりのタイトルに貢献した。

25歳。世界最速のセンターバックが、W杯の舞台に立つ。`,
    sources: [
      { label: "Tottenham 公式 - プレミア史上最速", url: "https://www.tottenhamhotspur.com/news/2024/february/van-de-ven-officially-the-fastest-ever-premier-league-player/" },
      { label: "Premier League - 最速記録", url: "https://www.premierleague.com/en/news/3884168" },
      { label: "Transfermarkt - ファン・デ・フェン", url: "https://www.transfermarkt.us/micky-van-de-ven/profil/spieler/557459" },
      { label: "Wikipedia - Micky van de Ven", url: "https://en.wikipedia.org/wiki/Micky_van_de_Ven" },
    ],
  },

  // ──────────── 10. ジョレル・ハト ────────────
  {
    id: 10,
    playerName: "Jorrel Hato",
    playerNameJa: "ジョレル・ハト",
    position: "LB / CB",
    club: "チェルシー",
    hookTitle: "17歳でオランダA代表デビュー——20歳のW杯戦士",
    body: `2023年11月。オランダ対ジブラルタル。

後半、ファン・ダイクに代わってピッチに入った17歳がいた。

ジョレル・ハト。

2006年3月7日生まれ。現在20歳。

ロッテルダム出身。父はキュラソー系、母はカーボベルデ系。

16歳でアヤックスのオランダリーグデビュー——
アヤックス史上3番目の若さ。

すぐにレギュラーに定着し、副キャプテンに任命された。

2025年夏、チェルシーが約67億円（3550万ポンド）で獲得。7年契約。

今季チェルシーで30試合に出場。左サイドバックでもセンターバックでもプレーできる。

FAカップではゴールも決めている。

オランダ代表では、あのファン・ダイクの後継者候補と目されている。

W杯2026の時点で、まだ20歳。

オランダの未来を背負う男が、最初のW杯を迎える。`,
    sources: [
      { label: "Chelsea FC 公式 - ハト加入", url: "https://www.chelseafc.com/en/news/article/jorrel-hato-joins-chelsea" },
      { label: "Sky Sports - チェルシー移籍3550万ポンド", url: "https://www.skysports.com/football/news/11668/13405232/jorrel-hato-transfer-news-chelsea-sign-teenage-defender-from-ajax-for-an-initial-lb35-5m-plus-add-ons" },
      { label: "Transfermarkt - ハト プロフィール", url: "https://www.transfermarkt.us/jorrel-hato/profil/spieler/904802" },
      { label: "Ajax 公式 - ハトの急成長", url: "https://english.ajax.nl/articles/jorrel-hato-rapid-rise-and-impressive-statistics" },
    ],
  },

  // ──────────── 11. デンゼル・ダンフリース ────────────
  {
    id: 11,
    playerName: "Denzel Dumfries",
    playerNameJa: "デンゼル・ダンフリース",
    position: "RWB",
    club: "インテル",
    hookTitle: "アマチュアリーグから這い上がった遅咲きの右サイド",
    body: `オランダにはアカデミーの超エリートが揃ってる。

でも、この男だけは違う。

デンゼル・ダンフリース。

名前の由来は俳優のデンゼル・ワシントン。

父がアルバ出身、母がスリナム出身。ロッテルダムで育った。

7歳から16歳まで、アマチュアクラブのスミッツフックでプレー。
オランダのどのプロアカデミーにも引っかからなかった。

18歳でようやくスパルタ・ロッテルダムのプロ契約。
オランダ1部リーグでプレーしたのは20歳になってから。

そこからヘーレンフェーン、PSVとステップアップ。
PSVではキャプテンを任された。

そして2021年のEURO——

グループステージ初戦、ウクライナ戦。
終了間際のヘディングで決勝ゴール。
次のオーストリア戦でも得点。

大会のグループステージベストイレブンに選出。

インテルに移籍金約23億円（1250万ユーロ）で加入。
イタリアリーグ優勝、イタリア杯2回制覇。

代表通算71キャップ11ゴール。

アマチュアから世界の舞台へ。これが雑草魂だ。`,
    sources: [
      { label: "ESPN - アマチュアからCL決勝へ", url: "https://www.espn.com/soccer/story/_/id/45362323/inter-milan-denzel-dumfries-remarkable-rise-amateur-soccer-champions-league" },
      { label: "Transfermarkt - ダンフリース", url: "https://www.transfermarkt.us/denzel-dumfries/profil/spieler/321528" },
      { label: "Sky Sports - EURO ウクライナ戦", url: "https://www.skysports.com/football/news/12021/12331925/netherlands-3-2-ukraine-denzel-dumfries-late-header-rescues-victory-for-hosts-in-amsterdam" },
      { label: "UEFA - EURO オーストリア戦", url: "https://www.uefa.com/uefaeuro-2020/news/026a-128b441d499e-31697d90799a-1000--netherlands-2-0-austria-dutch-impress-to-reach-last-16/" },
    ],
  },

  // ──────────── 12. ジェレミー・フリンポン ────────────
  {
    id: 12,
    playerName: "Jeremie Frimpong",
    playerNameJa: "ジェレミー・フリンポン",
    position: "RWB / RW",
    club: "リバプール",
    hookTitle: "ドイツ史上初の無敗優勝を支えた爆速サイドアタッカー",
    body: `2023-24シーズン。ドイツサッカーに歴史的な出来事が起きた。

バイヤー・レバークーゼンが、ドイツリーグ史上初の無敗優勝を達成。

その右サイドを完全に支配していたのが、この男。

ジェレミー・フリンポン。

アムステルダム生まれ。ガーナにルーツを持つ。
7歳でイギリスに渡り、9歳でマンチェスター・シティの下部組織に入団。

セルティックを経て、2021年にレバークーゼンへ。

そして無敗優勝シーズン——全コンペティション47試合で14ゴール7アシスト。

守備が本職の右サイドなのに14ゴール。もはやフォワードの数字。

左サイドのグリマルドと合わせて、ドイツリーグだけで39ゴールに絡んだ。

ガーナ代表からもアプローチを受けたが、オランダ代表を選択。

レバークーゼンでの通算成績は190試合30ゴール44アシスト。

2025年夏、約65億円（3500万ユーロ）でリバプールへ。

172cmの小柄な体から繰り出す爆発的なスピード。

右サイドの切り裂き役が、W杯の舞台でも暴れる。`,
    sources: [
      { label: "Bundesliga.com - フリンポン プロフィール", url: "https://www.bundesliga.com/en/bundesliga/news/jeremie-frimpong-who-is-bayer-leverkusen-s-dutch-right-back-liverpool-14503" },
      { label: "Liverpool FC 公式 - フリンポン", url: "https://www.liverpoolfc.com/team/mens/player/jeremie-frimpong" },
      { label: "Bundesliga.com - フリンポン&グリマルド分析", url: "https://www.bundesliga.com/en/bundesliga/news/jeremie-frimpong-alejandro-grimaldo-best-wing-backs-in-europe-alonso-s-leverkusen-25481" },
      { label: "GhanaSoccerNet - ガーナ代表からのアプローチ", url: "https://ghanasoccernet.com/jeremie-frimpong-confirms-ghana-fa-approach-before-holland-debut" },
      { label: "Transfermarkt - フリンポン", url: "https://www.transfermarkt.us/jeremie-frimpong/profil/spieler/484547" },
    ],
  },

  // ──────────── 13. バルト・フェルブルッヘン ────────────
  {
    id: 13,
    playerName: "Bart Verbruggen",
    playerNameJa: "バルト・フェルブルッヘン",
    position: "GK",
    club: "ブライトン",
    hookTitle: "23歳でオランダの正キーパー——欧州で伝説を作った男",
    body: `オランダの正ゴールキーパー。まだ23歳。

バルト・フェルブルッヘン。身長194cm。

12歳でNACブレダの下部組織に入団し、18歳でアンデルレヒトへ。

最初は3番手のキーパーだった。

でもそこから一気にレギュラーを奪い、
2022-23シーズンにはアンデルレヒトの年間最優秀選手に選出。

しかもこのシーズン、UEFAカンファレンスリーグで伝説を作った。

ルドゴレツ戦のPK戦——相手のPKを全て止めた。
ヨーロッパの大会でPKを全て止めたキーパーは1987年以来。

この活躍を受けて、ブライトンが約37億円（2000万ユーロ）で獲得。

プレミアリーグ1年目から正キーパーとして定着。

今季は31試合に出場し、7試合で無失点。

2024年のヨーロッパ選手権でも正キーパーとしてオランダのゴールを守った。

194cmの長身を活かしたセービング。
足元の技術も高く、後方からパスをつないで攻撃を組み立てることもできる。

23歳にしてオランダの最後の壁。W杯でも、ゴールマウスに立つ。`,
    sources: [
      { label: "Transfermarkt - フェルブルッヘン", url: "https://www.transfermarkt.co.uk/bart-verbruggen/profil/spieler/565093" },
      { label: "Brighton 公式 - GK成績", url: "https://www.brightonandhovealbion.com/player-detail-statistics-goalkeeper/489639" },
      { label: "Wikipedia - Bart Verbruggen", url: "https://en.wikipedia.org/wiki/Bart_Verbruggen" },
      { label: "LiveScore - 2025-26成績", url: "https://www.livescore.com/en/season-stats/bart-verbruggen/9102/" },
    ],
  },
];

export default function NetherlandsScriptsPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const positionColor = (pos: string) => {
    if (pos.includes("GK")) return "from-yellow-500 to-yellow-600";
    if (pos.includes("CB") || pos.includes("LB") || pos.includes("RB") || pos.includes("RWB") || pos.includes("LWB"))
      return "from-blue-500 to-blue-600";
    if (pos.includes("CM") || pos.includes("DM") || pos.includes("AM"))
      return "from-green-500 to-green-600";
    return "from-red-500 to-red-600";
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* ヘッダー */}
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a0a0a] to-[#0a0a1a]" />
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#FF6600]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#003DA5]/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">
              Confidential / 非公開資料
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-4">
            <span className="bg-gradient-to-r from-[#FF6600] to-[#FF8833] bg-clip-text text-transparent">
              オランダ代表
            </span>
            <br />
            <span className="text-white/90 text-2xl sm:text-3xl lg:text-4xl">
              選手紹介ショート台本集
            </span>
          </h1>

          <p className="text-white/40 text-sm max-w-xl leading-relaxed mb-6">
            FIFA W杯2026 オランダ代表主要選手の60秒ショート動画用プレーンテキスト台本。
            とやっちFC観戦部スタイル。全{scripts.length}選手。
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50">
              フォワード/攻撃: {scripts.filter((s) => s.position.includes("FW") || s.position.includes("W") && !s.position.includes("WB")).length}名
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50">
              ミッドフィルダー/中盤: {scripts.filter((s) => s.position.includes("CM") || s.position.includes("DM") || s.position.includes("AM")).length}名
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50">
              ディフェンダー/守備: {scripts.filter((s) => s.position.includes("CB") || s.position.includes("RB") || s.position.includes("LB") || s.position.includes("RWB")).length}名
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50">
              キーパー: {scripts.filter((s) => s.position.includes("GK")).length}名
            </div>
          </div>
        </div>
      </header>

      {/* 台本一覧 */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {scripts.map((script) => {
            const isOpen = openId === script.id;
            return (
              <div
                key={script.id}
                className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                {/* カード見出し */}
                <button
                  onClick={() => setOpenId(isOpen ? null : script.id)}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left cursor-pointer"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg font-black text-white/30">
                    {script.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${positionColor(script.position)} text-white`}
                      >
                        {script.position}
                      </span>
                      <span className="text-xs text-white/30">{script.club}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-white/90 truncate">
                      {script.playerNameJa}
                      <span className="text-white/30 font-normal text-sm ml-2">
                        {script.playerName}
                      </span>
                    </h2>
                    <p className="text-xs text-white/40 mt-0.5 truncate">
                      {script.hookTitle}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-white/30 text-xl transition-transform duration-300" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                    &#9660;
                  </div>
                </button>

                {/* 台本本文（展開時） */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-white/5">
                    {/* フックタイトル */}
                    <div className="mt-4 mb-4 px-4 py-3 bg-gradient-to-r from-[#FF6600]/10 to-transparent border-l-2 border-[#FF6600] rounded-r-lg">
                      <p className="text-[10px] text-[#FF6600] font-bold tracking-wider uppercase mb-1">
                        Hook / タイトル
                      </p>
                      <p className="text-white/90 font-bold text-sm">
                        {script.hookTitle}
                      </p>
                    </div>

                    {/* 台本テキスト */}
                    <div className="relative">
                      <div className="bg-black/30 border border-white/5 rounded-xl p-5">
                        <p className="text-[10px] text-white/30 font-bold tracking-wider uppercase mb-3">
                          Script / 台本（約60秒）
                        </p>
                        <pre className="whitespace-pre-wrap text-sm text-white/80 leading-[1.9] font-sans">
                          {script.body}
                        </pre>
                      </div>
                      <button
                        onClick={() => handleCopy(script.body, script.id)}
                        className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        {copiedId === script.id ? "Copied!" : "Copy"}
                      </button>
                    </div>

                    {/* 参照元 */}
                    <div className="mt-4">
                      <p className="text-[10px] text-white/30 font-bold tracking-wider uppercase mb-2">
                        Sources / 参照元
                      </p>
                      <div className="space-y-1.5">
                        {script.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-xs text-white/40 hover:text-[#FF6600] transition-colors group"
                          >
                            <span className="text-white/20 group-hover:text-[#FF6600]/50 flex-shrink-0 mt-0.5">
                              [{i + 1}]
                            </span>
                            <span className="break-all">{src.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* フッター注意書き */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            この資料は非公開です。検索エンジンにインデックスされません。
          </p>
          <p className="text-white/15 text-[10px] mt-2">
            とやっちFC観戦部 / W杯2026 オランダ代表選手紹介台本 / {new Date().toISOString().slice(0, 10)}作成
          </p>
        </div>
      </main>
    </div>
  );
}
