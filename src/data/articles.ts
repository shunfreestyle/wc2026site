export type ArticleSource = {
  name: string;
  url: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  category: "日本代表" | "Jリーグ" | "W杯" | "海外組" | "コラム" | "選手紹介";
  tags: string[];
  tagsEn?: string[];
  publishedAt: string;
  updatedAt?: string;
  isPopular?: boolean;
  thumbnail?: string;
  sources?: ArticleSource[];
};

export const articles: Article[] = [
  {
    id: "1774602001001",
    slug: "goto-keisuke-profile",
    title: "191cmの異次元ストライカー——後藤啓介という、日本サッカーが待ち望んだ「規格外」",
    titleEn: "The 191cm Phenomenon — Keisuke Goto, the 'Outlier' Japanese Football Has Been Waiting For",
    excerpt: "ジュビロ磐田の最年少得点記録を塗り替え、ベルギーで得点を量産する191cmの20歳。高さ・速さ・技術を兼ね備えた「新世代の9番」が、W杯のピッチに立つ日は近い。",
    excerptEn: "Breaking Jubilo Iwata's youngest scorer record and finding the net regularly in Belgium, this 191cm 20-year-old combines height, speed, and technique. The day this 'new generation number 9' takes the World Cup pitch is drawing near.",
    category: "選手紹介" as const,
    tags: ["後藤啓介", "日本代表", "シント・トロイデン", "アンデルレヒト", "ジュビロ磐田", "W杯2026", "ストライカー"],
    tagsEn: ["Keisuke Goto", "Japan National Team", "Sint-Truiden", "Anderlecht", "Jubilo Iwata", "World Cup 2026", "Striker"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `191cm——この数字を聞いて、ポストプレーヤーを想像するだろうか。足元の技術に乏しい空中戦専門のターゲットマンを思い浮かべるかもしれない。後藤啓介は、そのすべての先入観を裏切る。高さに加え、スピード、そして「191cmとは思えない」繊細なファーストタッチを持つ。日本サッカーが長年渇望してきた「規格外のストライカー」が、ベルギーの地で着実に牙を研いでいる。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>後藤 啓介（ごとう けいすけ）</td></tr>
    <tr><th>生年月日</th><td>2005年6月3日（20歳）</td></tr>
    <tr><th>出身地</th><td>静岡県浜松市</td></tr>
    <tr><th>身長/体重</th><td>191cm / 82kg</td></tr>
    <tr><th>ポジション</th><td>FW（CF）</td></tr>
    <tr><th>現所属</th><td>シント・トロイデン（ベルギー1部／アンデルレヒトからレンタル）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表2試合（2025年〜）</td></tr>
  </tbody>
</table>

## ジュビロ磐田——「高原以来の逸材」

静岡県浜松市で育った後藤は、ジュビロ磐田U-15からU-18へと順調に昇格。2022年7月、天皇杯4回戦の東京ヴェルディ戦でトップチームデビューを果たした。

そして2023年2月18日、J2リーグ開幕戦のファジアーノ岡山戦。この日、後藤は2得点を挙げてプロ初ゴールを記録した。17歳260日でのJリーグ得点は、ジュビロ磐田のクラブ史上最年少記録——高原直泰が25年間保持していた記録を大幅に更新するものだった。J2で33試合7得点を記録し、チームのJ1昇格に貢献。「高原以来の逸材」と呼ばれ始めた背番号が、ベルギーへの切符を掴んだのは必然だった。

## ベルギーで磨く「欧州基準のCF」

2023年11月、ベルギーの名門RSCアンデルレヒトがレンタルで後藤を獲得。まずはセカンドチーム（チャレンジャー・プロリーグ）で経験を積み、2シーズンで約30試合13得点を記録した。2025年1月にはトップチームのベルギー1部でもデビューし、KVメヘレン戦で初ゴール。さらにヨーロッパリーグでもゴールネットを揺らした。

2024年12月にはアンデルレヒトが約110万ユーロで完全移籍を確定。そして2025年8月、出場機会を求めてシント・トロイデンへレンタル移籍。ベルギー1部のフルシーズンを主力として戦い、2026年3月時点で10得点5アシストを記録している。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">「191cmの技巧派」——日本が待ち望んだ規格外のCF像</span>
<p class="point-body">後藤啓介の最大の武器は、191cmの大型FWでありながら足元の技術が極めて高いことだ。ヘディングでの得点力はもちろん、地上戦でもスピードとファーストタッチの質でDFを置き去りにする。<strong>ジュビロ磐田</strong>時代からジェイ・ボスロイドのヘディングを参考にしたと語る一方で、「典型的なターゲットマンにはなりたくない」という意志が、この選手の多面的な成長を支えている。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">20歳でベルギー1部10得点——急成長の適応曲線</span>
<p class="point-body"><strong>シント・トロイデン</strong>でのレンタル1年目で10得点5アシストという数字は、20歳のストライカーとしては特筆すべき結果だ。<strong>アンデルレヒト</strong>のセカンドチームで下積みを経てから1部に上がるという段階的な適応プロセスが奏功した。欧州のフィジカルコンタクトの強度に慣れ、空中戦の勝率を上げながらも持ち前のスピードを失わない。この「高さ＋速さ＋技術」の三拍子は、W杯本番で対戦国のDFにとって未知の脅威となる。</p>
</div>

## 日本代表——W杯の切り札候補

2025年11月、キリンチャレンジカップのガーナ戦でA代表初招集・初出場。2026年3月のイギリス遠征にも28名のメンバーに選ばれ、W杯本大会への扉は確実に開きつつある。

上田綺世がエースとして君臨する日本代表FW陣において、後藤は「異なるオプション」を提供できる存在だ。空中戦での圧倒的な強さ、ポストプレーからの展開力、そしてクロスに対するヘディングの精度——上田とは異なるタイプのCFとして、試合の局面を変える切り札になり得る。

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">W杯26人枠に食い込めるか——「高さ」という戦術的武器</span>
<p class="point-body">日本代表には191cmのCFがいない。<strong>後藤啓介</strong>が26人枠に入れば、リードされた終盤にパワープレーで投入する選択肢が生まれる。W杯という短期決戦において「タイプの異なるFW」をベンチに置く戦術的価値は極めて高い。高原直泰以来の<strong>ジュビロ</strong>育ちのFWが、日本のW杯史に新たな1ページを刻む可能性を秘めている。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2022-23</td><td>ジュビロ磐田</td><td>J2リーグ</td><td>33試合</td><td>7得点</td></tr>
    <tr><td>2023-25</td><td>アンデルレヒト（B・1部）</td><td>ベルギー</td><td>40試合</td><td>16得点</td></tr>
    <tr><td>2025-26</td><td>シント・トロイデン</td><td>ベルギー1部</td><td>25試合</td><td>10得点</td></tr>
  </tbody>
</table>

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>静岡県浜松市出身の<strong>後藤啓介</strong>は、<strong>ジュビロ磐田</strong>で高原直泰の最年少得点記録を塗り替え、J2で33試合7得点を記録した191cmの大型ストライカーだ。2023年に<strong>アンデルレヒト</strong>へ渡り、セカンドチームで下積みを重ねた後、2025-26シーズンは<strong>シント・トロイデン</strong>で10得点5アシストと飛躍。20歳にして「高さ・速さ・技術」を兼ね備えた規格外のCFとして、2026年W杯の26人枠に食い込む可能性を持つ。日本代表には稀有な大型FWの存在は、戦術的なオプションとして計り知れない価値がある。</p>
</div>`,
  },
  {
    id: "1774602001002",
    slug: "ito-junya-profile",
    title: "日本最速の右翼——伊東純也が駆け抜けた10年と、北中米W杯への最終章",
    titleEn: "Japan's Fastest Right Winger — Junya Ito's Decade-Long Journey and His Final Chapter at the 2026 World Cup",
    excerpt: "カタールW杯スペイン戦のアシスト、アジアカップでの試練を乗り越え、古巣ゲンクで再起した33歳。日本代表史上最速のウイングが、集大成のW杯に挑む。",
    excerptEn: "From the assist against Spain at the Qatar World Cup to overcoming adversity at the Asian Cup, this 33-year-old has rebuilt himself at former club Genk. The fastest winger in Japan national team history takes on his crowning World Cup.",
    category: "選手紹介" as const,
    tags: ["伊東純也", "日本代表", "KRCゲンク", "ベルギー", "W杯2026", "カタールW杯", "スピード"],
    tagsEn: ["Junya Ito", "Japan National Team", "KRC Genk", "Belgium", "World Cup 2026", "Qatar World Cup", "Speed"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `時速33km超——伊東純也の最高速度は、欧州5大リーグのウイングと比較しても屈指の数値だ。右サイドを切り裂く直線的なスプリントと、そこから繰り出される正確なクロス。10年にわたるプロキャリアの中で、伊東はその武器を一度も失わなかった。試練の時期さえも。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>伊東 純也（いとう じゅんや）</td></tr>
    <tr><th>生年月日</th><td>1993年3月9日（33歳）</td></tr>
    <tr><th>出身地</th><td>神奈川県横須賀市</td></tr>
    <tr><th>身長/体重</th><td>176cm / 68kg</td></tr>
    <tr><th>ポジション</th><td>MF/FW（右ウイング/ウイングバック）</td></tr>
    <tr><th>現所属</th><td>KRCゲンク（ベルギー・ジュピラープロリーグ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表55試合以上12得点以上（2018年〜）</td></tr>
  </tbody>
</table>

## 甲府から柏へ——遅咲きの才能が開花するまで

伊東純也のプロキャリアは、決して華々しいスタートではなかった。神奈川大学を経て2015年にヴァンフォーレ甲府に加入。J1で27試合2得点という成績は、目立つ数字ではない。だが翌年に移籍した柏レイソルで、すべてが変わる。

柏では右サイドの主力として定着し、J1通算95試合15得点を記録。2018年にはJリーグベストイレブンに選出された。右サイドを縦に突破してクロスを供給するプレースタイルは、この時期にすでに完成形に近づいていた。

## 欧州挑戦——ゲンク、ランス、そして再びゲンクへ

2019年夏、ベルギー1部KRCゲンクへ移籍。リーグ65試合10得点を記録し、2022年にフランス・リーグアンのスタッド・ランスへステップアップした。

ランスでは2022-23シーズンに主力として活躍。2024-25シーズンには34試合出場しチャンスクリエイト数83回でリーグ1位を記録するなど、圧倒的な突破力を見せた。しかしチームはリーグ16位で入れ替え戦に敗れ2部降格。伊東は2025年8月、約280万ユーロで古巣ゲンクに復帰した。背番号10を託されたベテランは、2025-26シーズンに4得点を記録しながら、W杯への準備を進めている。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">時速33km超——欧州屈指の「縦への推進力」</span>
<p class="point-body">伊東純也の最大の武器は、右サイドからの圧倒的なスプリント力だ。相手SBの外側を一気に抜き去り、精度の高いクロスを供給する。<strong>リーグアン</strong>でチャンスクリエイト数1位を記録した実績が示すように、単なるスピードスターではなく「速さ＋正確さ」を両立している。33歳を迎えてもその速度は健在であり、W杯本番で対戦国の左SBにとって最大の脅威となる。</p>
</div>

## 日本代表——試練を越えて

2018年10月、コスタリカ戦でA代表デビュー。以降、右サイドの主力として定着した。2022年カタールW杯ではグループリーグ3試合に出場。特にスペイン戦では堂安律の同点ゴール、そして田中碧の決勝ゴールの起点となるクロスを供給し、歴史的勝利の立役者となった。

2024年1月のアジアカップでは週刊誌報道により大会途中でチームを離脱するという困難を経験した。だが不起訴処分を受けた後、2024年9月のW杯アジア最終予選で代表に復帰。逆境を乗り越えた精神力は、33歳のベテランの真価を示している。

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">カタールW杯での決定的仕事——スペイン戦のクロス</span>
<p class="point-body"><strong>カタールW杯</strong>スペイン戦、後半開始直後。右サイドを駆け上がった伊東のクロスが<strong>堂安律</strong>の同点ゴールを演出した。さらに田中碧の決勝点に至る攻撃でも起点となり、日本の歴史的勝利を支えた。ドイツ戦でも途中出場から流れを変えるスプリントを見せ、大会を通じて右サイドの脅威であり続けた。W杯の大舞台で結果を残した経験は、北中米大会でもチームに安定感をもたらすだろう。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">33歳のラストチャンス——集大成のW杯へ</span>
<p class="point-body">2026年W杯は伊東にとって最後のW杯となる可能性が高い。<strong>ゲンク</strong>で背番号10を背負い、コンディションを維持しながら本番に備える。三笘薫が左サイド、伊東が右サイドという日本代表の両翼は、世界でも屈指の破壊力を持つ。33歳のベテランが持つ経験値と、衰えを知らないスプリント力。その組み合わせは、W杯本番で必ず日本の武器になる。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2015</td><td>ヴァンフォーレ甲府</td><td>J1リーグ</td><td>27試合</td><td>2得点</td></tr>
    <tr><td>2016-19</td><td>柏レイソル</td><td>J1リーグ</td><td>95試合</td><td>15得点</td></tr>
    <tr><td>2019-22</td><td>KRCゲンク</td><td>ベルギー1部</td><td>65試合</td><td>10得点</td></tr>
    <tr><td>2022-25</td><td>スタッド・ランス</td><td>リーグアン</td><td>90試合</td><td>12得点</td></tr>
    <tr><td>2025-26</td><td>KRCゲンク（復帰）</td><td>ベルギー1部</td><td>25試合</td><td>4得点</td></tr>
  </tbody>
</table>

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>神奈川県横須賀市出身の<strong>伊東純也</strong>は、<strong>甲府</strong>、<strong>柏レイソル</strong>を経てベルギー・フランスで活躍する日本代表の右ウイングだ。時速33km超のスプリントと正確なクロスを武器に、<strong>リーグアン</strong>ではチャンスクリエイト数1位を記録。<strong>カタールW杯</strong>ではスペイン戦の歴史的勝利に貢献した。2024年のアジアカップでの試練を乗り越え、古巣<strong>ゲンク</strong>で背番号10を背負い再起。33歳で迎える2026年北中米W杯は、キャリア集大成の舞台となる。三笘薫と並ぶ日本代表の両翼として、世界を驚かせるスプリントを再び見せる。</p>
</div>`,
  },
  {
    id: "1774602001003_TEMP",
    slug: "nakamura-keito-profile",
    title: "左足一閃——中村敬斗、「ゴールを奪うウイング」の覚醒と北中米への野望",
    titleEn: "A Flash of the Left Foot — Keito Nakamura, the Awakening of a 'Goal-Scoring Winger' and His Ambitions for 2026",
    excerpt: "U-17W杯で日本人初ハットトリック、LASKで14得点、ランスでリーグアン11得点。左サイドからゴールを量産する25歳が、W杯で世界にその名を刻む。",
    excerptEn: "The first Japanese player to score a hat trick at a U-17 World Cup, 14 goals at LASK, 11 goals in Ligue 1 with Reims. This 25-year-old left winger who keeps finding the net aims to make his mark on the World Cup stage.",
    category: "選手紹介" as const,
    tags: ["中村敬斗", "日本代表", "スタッド・ランス", "ガンバ大阪", "W杯2026", "LASK"],
    tagsEn: ["Keito Nakamura", "Japan National Team", "Stade de Reims", "Gamba Osaka", "World Cup 2026", "LASK"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `2017年、インド。FIFA U-17ワールドカップの舞台で、16歳の少年がホンジュラス相手にハットトリックを達成した。日本人選手としてFIFA主催大会初のハットトリック——中村敬斗の名前が世界に知れ渡った最初の瞬間だった。

あれから9年。左サイドから中央へ切り込み、右足で叩き込む。そのゴールパターンは少年時代から変わらない。ただし、その威力と精度は比較にならないほど進化した。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>中村 敬斗（なかむら けいと）</td></tr>
    <tr><th>生年月日</th><td>2000年7月28日（25歳）</td></tr>
    <tr><th>出身地</th><td>千葉県我孫子市</td></tr>
    <tr><th>身長/体重</th><td>181cm / 75kg</td></tr>
    <tr><th>ポジション</th><td>FW/MF（左ウイング）</td></tr>
    <tr><th>現所属</th><td>スタッド・ランス（フランス・リーグ2）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表22試合10得点（2023年〜）</td></tr>
  </tbody>
</table>

## ガンバ大阪ユースから欧州への「3カ国修業」

ガンバ大阪のアカデミーで育った中村は、2017年にトップチーム昇格。J1で24試合1得点を記録するも、18歳でオランダのFCトゥエンテへレンタル移籍し欧州への一歩を踏み出した。エールディヴィジで17試合4得点と一定の結果を残すも、その後はベルギーのシント・トロイデン、オーストリアのFCジュニアーズOOとレンタルが続き、定位置を掴めない時期が続いた。

転機は2021年夏、オーストリア・ブンデスリーガのLASKへの移籍だった。2022-23シーズンにリーグ31試合14得点を記録し、リバプールなど欧州ビッグクラブからの関心を集めるほどのブレイクを果たした。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">LASK14得点で覚醒——「得点を奪えるウイング」への変貌</span>
<p class="point-body"><strong>LASK</strong>での2022-23シーズンは中村にとって転換点だった。オーストリア・ブンデスリーガで31試合14得点を記録し、左サイドからカットインしてシュートを決めるパターンを確立。<strong>リバプール</strong>など欧州ビッグクラブの注目を集めた。ドリブルで仕掛けるだけでなく「自らゴールを奪う」ウイングとしての完成度が一段階上がった瞬間だ。右足の精度は高く、ペナルティエリア外からのミドルシュートも大きな武器となっている。</p>
</div>

## スタッド・ランスでのリーグアン挑戦

2023年8月、フランス・リーグアンのスタッド・ランスへ完全移籍。初年度は25試合4得点と適応に時間を要したが、2024-25シーズンにはリーグ32試合11得点と大幅に数字を伸ばした。

しかしチームはリーグ16位で入れ替え戦に敗れ、2025-26シーズンはリーグ2（フランス2部）で戦うことに。それでも中村はチームに残留し、リーグ2で22試合9得点とチーム内得点王としてプレー。「降格したから移籍する」という選択をしなかった姿勢は、クラブへのリスペクトと自身の成長への確信の表れだ。

## 日本代表——22試合10得点の破壊力

2023年3月のウルグアイ戦で代表デビュー。同年6月のトルコ戦では2得点を挙げ、A代表22試合で10得点という驚異的な得点率を誇る。得点率0.45はFW陣と比較しても突出した数字だ。

2024年1月のアジアカップではベトナム戦でペナルティエリア外からの強烈なシュートをゴール上隅に叩き込み、その得点力をアジアの舞台でも証明した。

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">代表得点率0.45——FW顔負けの数字を叩き出す左ウイング</span>
<p class="point-body">A代表22試合10得点。この数字はポジションがウイングであることを考えると驚異的だ。<strong>中村敬斗</strong>は単にアシストを量産する従来型のウイングではなく、「自らゴールを奪う」タイプの攻撃者だ。左サイドからカットインして右足で叩き込むパターンに加え、ペナルティエリア内への飛び込み、ヘディングでの得点もある。この多彩さが、<strong>三笘薫</strong>とは異なるタイプの左サイドの選択肢として森保監督に重宝されている理由だ。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">U-17ハットトリックから9年——「世界を知る左足」の集大成</span>
<p class="point-body">16歳で<strong>FIFA U-17 W杯</strong>のピッチに立ち、日本人初のハットトリックを達成した中村は、誰よりも早く「世界の舞台」を経験した選手だ。その後オランダ、ベルギー、オーストリア、フランスと4カ国を渡り歩き、それぞれのリーグで結果を残してきた。2026年北中米W杯は、少年時代からの夢だった「A代表でのW杯」。25歳の左足が、世界最高峰の舞台でどんなゴールを刻むか。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2017-19</td><td>ガンバ大阪</td><td>J1リーグ</td><td>24試合</td><td>1得点</td></tr>
    <tr><td>2019-20</td><td>FCトゥエンテ</td><td>エールディヴィジ</td><td>17試合</td><td>4得点</td></tr>
    <tr><td>2021-23</td><td>LASK</td><td>オーストリア1部</td><td>53試合</td><td>20得点</td></tr>
    <tr><td>2023-25</td><td>スタッド・ランス</td><td>リーグアン</td><td>57試合</td><td>15得点</td></tr>
    <tr><td>2025-26</td><td>スタッド・ランス</td><td>リーグ2</td><td>22試合</td><td>9得点</td></tr>
  </tbody>
</table>

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>千葉県我孫子市出身の<strong>中村敬斗</strong>は、<strong>ガンバ大阪</strong>ユースから欧州4カ国を渡り歩いた左ウイングだ。16歳で<strong>U-17 W杯</strong>日本人初のハットトリックを達成し、<strong>LASK</strong>で14得点のブレイクシーズンを経て<strong>スタッド・ランス</strong>へ。リーグアン2年目には32試合11得点を記録した。日本代表ではA代表22試合10得点と驚異的な得点率を誇り、三笘薫とは異なるタイプの「ゴールを奪うウイング」として重宝される。2026年北中米W杯では、左サイドからの得点力で日本の攻撃に厚みを加える存在として期待される。</p>
</div>`,
  },
  {
    id: "1774602001004",
    slug: "sano-kaishu-profile",
    title: "ボール奪取王——佐野海舟、ブンデスリーガを支配する「日本の新アンカー」",
    titleEn: "The Ball-Winning King — Kaishu Sano, the 'New Japanese Anchor' Dominating the Bundesliga",
    excerpt: "町田ゼルビアからブンデスリーガへ。マインツで走行距離・デュエル勝利数リーグ1位を記録した25歳が、遠藤航の後継者として日本代表の中盤を担う。",
    excerptEn: "From FC Machida Zelvia to the Bundesliga. This 25-year-old recorded the league's highest distance covered and duel wins at Mainz, and now steps into Wataru Endo's shoes as Japan's midfield anchor.",
    category: "選手紹介" as const,
    tags: ["佐野海舟", "日本代表", "マインツ", "ブンデスリーガ", "W杯2026", "鹿島アントラーズ", "町田ゼルビア"],
    tagsEn: ["Kaishu Sano", "Japan National Team", "Mainz", "Bundesliga", "World Cup 2026", "Kashima Antlers", "FC Machida Zelvia"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `ブンデスリーガ2024-25シーズン、あるスタッツが日本のサッカーファンの間で話題になった。デュエル勝利数209回、走行距離394km——いずれもリーグ1位。その数字の持ち主が、J2の町田ゼルビアから鹿島アントラーズを経てわずか2年前にドイツへ渡った25歳の日本人だと知れば、驚く人も多いだろう。

佐野海舟。遠藤航の後継者と呼ばれるこの男は、ボールを奪う「技術」においてブンデスリーガ屈指の水準に達している。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>佐野 海舟（さの かいしゅう）</td></tr>
    <tr><th>生年月日</th><td>2000年12月30日（25歳）</td></tr>
    <tr><th>出身地</th><td>岡山県津山市</td></tr>
    <tr><th>身長/体重</th><td>176cm / 67kg</td></tr>
    <tr><th>ポジション</th><td>MF（守備的MF/セントラルMF）</td></tr>
    <tr><th>現所属</th><td>1.FSVマインツ05（ブンデスリーガ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表11試合（2023年〜）</td></tr>
  </tbody>
</table>

## 町田ゼルビアから鹿島へ——J2で磨いた「奪う技術」

米子北高校から2019年にFC町田ゼルビアへ加入した佐野は、J2の舞台で4シーズンを過ごした。116試合7得点。華やかな舞台ではなかったが、ここで佐野は「ボールを奪う技術」の基礎を徹底的に磨いた。

2023年に鹿島アントラーズへ移籍すると、J1の舞台でも即座に主力に定着。27試合1得点を記録し、守備的MFとしてチームの心臓部を担った。そのパフォーマンスが欧州の目に留まるのに、時間はかからなかった。

## マインツで「リーグ1位」の衝撃

2024年7月、ブンデスリーガの1.FSVマインツ05へ移籍。移籍金は約250万ユーロ。初年度からスタメンに定着し、リーグ34試合に出場。デュエル勝利数209回と走行距離394kmでいずれもブンデスリーガ1位を記録するという衝撃的なデビューシーズンとなった。

マインツはこのシーズン6位（クラブ歴代最高レベル）でフィニッシュし、ヨーロッパの舞台への切符を手にした。佐野の貢献は数字以上に大きい。

2025-26シーズンもブンデスリーガ27試合に全試合先発。UEFAカンファレンスリーグでも8試合に出場し、欧州の舞台でも堂々とプレーしている。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">「誘い込んで奪う」——力ではなく知性で勝つボール奪取</span>
<p class="analysis-body">佐野のボール奪取の特徴は、闇雲にタックルに行くのではなく、相手を不利なポジションに「誘い込んで」からクリーンに奪うことだ。結果としてファウル数が少なく、奪った瞬間に縦パスを繰り出してカウンターの起点になれる。<strong>ブンデスリーガ</strong>でデュエル勝利数1位を記録しながらも退場ゼロという事実が、その「知性的なボール奪取」の質を証明している。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">兄弟で日本代表——佐野航大との「32年ぶりの兄弟選出」</span>
<p class="analysis-body">弟の<strong>佐野航大</strong>（NECナイメーヘン）も2025年6月にA代表デビューを果たし、兄弟同時の代表選出は1993年の三浦知良・三浦泰年以来32年ぶりの快挙となった。岡山県津山市で育った兄弟が、それぞれオランダとドイツでプレーしながら日本代表の座を勝ち取った事実は、日本サッカーの育成ルートの多様性を示している。</p>
</div>

## 日本代表——「遠藤航の後継者」

2023年11月のミャンマー戦でA代表デビュー。以降、W杯アジア最終予選やアジアカップにも出場し、通算11キャップを積み重ねている。

リバプールで長年日本代表の中盤を支えてきた遠藤航の後継者として、佐野への期待は大きい。遠藤と佐野のダブルボランチが実現すれば、世界でも屈指のボール奪取力を誇る中盤が完成する。

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">W杯の中盤を支える「盾」——マインツで培った欧州基準</span>
<p class="point-body"><strong>マインツ</strong>でブンデスリーガ全試合先発を果たし、<strong>カンファレンスリーグ</strong>でも欧州の舞台を経験した佐野は、W杯本番で求められるインテンシティを日常的に体感している。<strong>遠藤航</strong>と組むダブルボランチ、あるいは遠藤の休息時のアンカーとして、佐野は日本代表の「守備の盾」を担える。J2から始まったキャリアが、わずか数年でW杯の中盤を任されるレベルに到達した成長曲線は驚異的だ。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2019-22</td><td>FC町田ゼルビア</td><td>J2リーグ</td><td>116試合</td><td>7得点</td></tr>
    <tr><td>2023-24</td><td>鹿島アントラーズ</td><td>J1リーグ</td><td>47試合</td><td>1得点</td></tr>
    <tr><td>2024-25</td><td>マインツ05</td><td>ブンデスリーガ</td><td>34試合</td><td>1得点</td></tr>
    <tr><td>2025-26</td><td>マインツ05</td><td>ブンデスリーガ</td><td>27試合</td><td>1得点</td></tr>
  </tbody>
</table>

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li>岡山県津山市出身の<strong>佐野海舟</strong>は、<strong>町田ゼルビア</strong>でJ2を4シーズン戦い、<strong>鹿島アントラーズ</strong>を経て2024年に<strong>マインツ05</strong>へ移籍したボランチだ。ブンデスリーガ初年度でデュエル勝利数209回・走行距離394kmのリーグ1位を記録し、クラブの6位フィニッシュに大きく貢献。</li>
    <li>2025-26シーズンもリーグ全試合先発を続け、<strong>カンファレンスリーグ</strong>でも欧州の舞台を経験している。日本代表では<strong>遠藤航</strong>の後継者として期待され、A代表11試合を記録。</li>
    <li>弟の<strong>佐野航大</strong>とともに32年ぶりの兄弟代表入りも話題に。2026年W杯では日本の中盤を支える「盾」としての役割が期待される。</li>
  </ul>
</div>`,
  },
  {
    id: "1774602001005",
    slug: "kamada-daichi-profile",
    title: "ヨーロッパリーグ制覇、FAカップ優勝——鎌田大地が歩んだ「タイトルハンター」の道",
    titleEn: "Europa League and FA Cup Champion — The Path of Daichi Kamada, a 'Title Hunter'",
    excerpt: "サガン鳥栖からフランクフルト、ラツィオ、クリスタルパレスへ。EL優勝とFAカップ制覇を経験した日本屈指のゲームメーカーが、W杯で「違い」を生む。",
    excerptEn: "From Sagan Tosu to Frankfurt, Lazio, and Crystal Palace. One of Japan's finest playmakers, with a Europa League title and an FA Cup triumph to his name, is ready to make the difference at the World Cup.",
    category: "選手紹介" as const,
    tags: ["鎌田大地", "日本代表", "クリスタルパレス", "プレミアリーグ", "W杯2026", "フランクフルト", "EL優勝"],
    tagsEn: ["Daichi Kamada", "Japan National Team", "Crystal Palace", "Premier League", "World Cup 2026", "Eintracht Frankfurt", "Europa League"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `2022年5月18日、セビージャ。UEFAヨーロッパリーグ決勝。アイントラハト・フランクフルトがPK戦の末にグラスゴー・レンジャーズを下した夜、優勝トロフィーを掲げる選手たちの中に鎌田大地がいた。大会13試合で5得点——その活躍なしにフランクフルトの戴冠はなかった。

3年後の2025年5月17日、ウェンブリー。FAカップ決勝。クリスタルパレスがマンチェスター・シティを1-0で下す番狂わせを演じた試合で、鎌田は決勝ゴールの起点となるプレーで貢献した。

ヨーロッパの2つの異なる舞台で、タイトルの瞬間に立ち会った日本人——鎌田大地は、紛れもなく「大舞台の男」だ。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>鎌田 大地（かまだ だいち）</td></tr>
    <tr><th>生年月日</th><td>1996年8月5日（29歳）</td></tr>
    <tr><th>出身地</th><td>愛媛県伊予市</td></tr>
    <tr><th>身長/体重</th><td>180cm / 76kg</td></tr>
    <tr><th>ポジション</th><td>MF（攻撃的MF/セントラルMF）</td></tr>
    <tr><th>現所属</th><td>クリスタルパレス（プレミアリーグ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表47試合12得点（2019年〜）</td></tr>
  </tbody>
</table>

## サガン鳥栖——九州が生んだ司令塔

愛媛県伊予市で生まれた鎌田は、東福岡高校を経て2015年にサガン鳥栖に加入。J1で54試合13得点を記録し、18歳でプロデビューした瞬間から攻撃的MFとしての才能は明らかだった。ボールを受けてからの判断の速さ、スルーパスの精度、そして自らゴールを狙う積極性——鳥栖の小さなスタジアムから、世界への扉が開いた。

## フランクフルト6シーズン——EL制覇の立役者

2017年夏、ドイツ・ブンデスリーガのアイントラハト・フランクフルトへ移籍。初年度はベルギーのシント・トロイデンへレンタルされ、21試合12得点と爆発的な結果を残した。

フランクフルトに復帰してからはレギュラーとして定着。ブンデスリーガ通算100試合20得点25アシストを記録し、チームの攻撃の中核を担った。特に2022-23シーズンはリーグ25試合9得点6アシストとキャリアハイを更新。だがそれ以上にインパクトを残したのが、2021-22シーズンのUEFAヨーロッパリーグだ。大会13試合5得点でチームの優勝に大きく貢献し、EL決勝の舞台で日本人初のトロフィーを掲げた。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">EL5得点＋FAカップ優勝——欧州タイトルを知る男</span>
<p class="analysis-body"><strong>フランクフルト</strong>でのUEFAヨーロッパリーグ優勝（2022年）と、<strong>クリスタルパレス</strong>でのFAカップ優勝（2025年）。鎌田は異なるクラブで2つの欧州タイトルに関わった数少ない日本人選手だ。ELでは大会5得点で優勝の立役者となり、FAカップ決勝では<strong>マンチェスター・シティ</strong>相手に決勝点の起点となった。「勝負どころで結果を出す」経験値は、W杯という最高の舞台で必ず活きる。</p>
</div>

## ラツィオ、そしてプレミアリーグへ

2023年夏、フリートランスファーでセリエAのSSラツィオへ移籍。しかし17試合2得点にとどまり、1シーズンで退団。2024年7月、プレミアリーグのクリスタルパレスへ移籍した。

パレスでは2024-25シーズンにFAカップ優勝を経験。2025-26シーズンはプレミアリーグ20試合1得点2アシスト、カンファレンスリーグ9試合2得点と着実に出場機会を重ねている。プレミアリーグの強度の中で、鎌田の戦術的知性はさらに磨かれた。

## 日本代表——攻撃の「頭脳」

2019年3月のコロンビア戦でA代表デビュー。カタールW杯では4試合に出場し、ドイツ戦・スペイン戦の歴史的勝利にも2列目の一角として貢献した。

A代表通算47試合12得点。ボランチからトップ下まで幅広いポジションをこなし、攻撃に創造性をもたらす「頭脳」として欠かせない存在だ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">「ライン間」を支配する戦術眼——プレス耐性と縦パスの質</span>
<p class="analysis-body">鎌田の真骨頂は、相手DFとMFの間（ライン間）でボールを受ける技術にある。プレスを受けても冷静にボールをキープし、味方の動き出しを見逃さない視野の広さと、ワンタッチで決定的なスルーパスを出す判断速度。<strong>フランクフルト</strong>時代にオリバー・グラスナー監督のハイプレスシステムで磨かれたプレス耐性は、<strong>プレミアリーグ</strong>でも十分に通用している。W杯では相手の守備ブロックを「知性」で切り崩す役割が期待される。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">4カ国のリーグ経験——「どこでも機能する」適応力</span>
<p class="point-body">J1（<strong>鳥栖</strong>）、ベルギー（<strong>シント・トロイデン</strong>）、ブンデスリーガ（<strong>フランクフルト</strong>）、セリエA（<strong>ラツィオ</strong>）、プレミアリーグ（<strong>クリスタルパレス</strong>）——鎌田は5つの異なるリーグ文化を経験した。それぞれの戦術・インテンシティ・スタイルに適応してきた柔軟性は、W杯のように対戦相手が毎試合変わる短期決戦において大きなアドバンテージとなる。攻撃的MFとしてもセントラルMFとしても機能する汎用性は、森保監督の戦術オプションを広げる。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2015-17</td><td>サガン鳥栖</td><td>J1リーグ</td><td>54試合</td><td>13得点</td></tr>
    <tr><td>2017-23</td><td>フランクフルト</td><td>ブンデスリーガ</td><td>100試合</td><td>20得点</td></tr>
    <tr><td>2018-19</td><td>シント・トロイデン（レンタル）</td><td>ベルギー1部</td><td>21試合</td><td>12得点</td></tr>
    <tr><td>2023-24</td><td>SSラツィオ</td><td>セリエA</td><td>17試合</td><td>2得点</td></tr>
    <tr><td>2024-26</td><td>クリスタルパレス</td><td>プレミアリーグ</td><td>34試合</td><td>1得点</td></tr>
  </tbody>
</table>

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li>愛媛県伊予市出身の<strong>鎌田大地</strong>は、<strong>サガン鳥栖</strong>からドイツ、ベルギー、イタリア、イングランドと5つのリーグを渡り歩いた攻撃的MFだ。<strong>フランクフルト</strong>ではブンデスリーガ100試合20得点を記録し、2022年<strong>UEFAヨーロッパリーグ</strong>優勝に大会5得点で貢献。</li>
    <li><strong>クリスタルパレス</strong>では2025年<strong>FAカップ</strong>優勝を経験した。日本代表ではA代表47試合12得点を記録し、カタールW杯では歴史的なドイツ・スペイン撃破にも貢献。</li>
    <li>ライン間でのボールキープ力と決定的なスルーパスを武器に、2026年北中米W杯では日本の攻撃を操る「頭脳」としての活躍が期待される。</li>
  </ul>
</div>`,
  },
  {
    id: "1774497525635",
    slug: "堂安律-profile",
    title: "ドイツとスペインを射抜いた左足——堂安律という「大舞台の男」の軌跡",
    titleEn: "The Left Foot That Pierced Germany and Spain — The Journey of Ritsu Doan, the 'Big-Game Player'",
    excerpt: "カタールW杯でドイツ戦・スペイン戦の2試合連続ゴール。ガンバ大阪ユースからオランダ、ドイツを渡り歩き、フランクフルトで円熟期を迎えた27歳の右ウイングが、北中米W杯で再び世界を驚かせる。",
    excerptEn: "Back-to-back goals against Germany and Spain at the Qatar World Cup. The 27-year-old right winger, who rose through Gamba Osaka's youth academy and honed his craft in the Netherlands and Germany, now thrives at Eintracht Frankfurt and is set to stun the world again at the 2026 FIFA World Cup.",
    category: "選手紹介" as const,
    tags: ["堂安律", "日本代表", "W杯2026", "アイントラハト・フランクフルト", "ブンデスリーガ", "カタールW杯", "選手紹介"],
    tagsEn: ["Ritsu Doan", "Japan National Team", "World Cup 2026", "Eintracht Frankfurt", "Bundesliga", "Qatar World Cup", "Player Profile"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `2022年11月23日、カタール。後半26分にピッチへ送り出された堂安律は、わずか4分後にドイツ代表のゴールネットを揺らした。そして8日後のスペイン戦でも後半開始直後に同点弾を叩き込んだ。W杯のグループリーグで優勝経験国から連続ゴール——堂安律という男の「大舞台での勝負強さ」が、あの夜から世界に知れ渡った。

<table class="profile-table"><tbody>
<tr><th>名前</th><td>堂安 律（どうあん りつ）</td></tr>
<tr><th>生年月日</th><td>1998年6月16日（27歳）</td></tr>
<tr><th>出身地</th><td>兵庫県尼崎市</td></tr>
<tr><th>身長/体重</th><td>172cm / 70kg</td></tr>
<tr><th>ポジション</th><td>MF/FW（右ウイング）</td></tr>
<tr><th>現所属</th><td>アイントラハト・フランクフルト（ブンデスリーガ）</td></tr>
<tr><th>代表歴</th><td>日本代表 A代表62試合11得点（2018年〜）</td></tr>
</tbody></table>

## ガンバ大阪ユースが育てた「左足の申し子」

兵庫県尼崎市で生まれた堂安は、浦風FCを経てガンバ大阪のジュニアユースに加入した。セレッソ大阪、ヴィッセル神戸など複数のJクラブからオファーを受けた中で、ガンバを選んだ決断がキャリアの起点となる。ジュニアユース、ユースと一貫してガンバの育成システムで育ち、2015年6月3日の鹿島アントラーズ戦でJ1デビュー。16歳352日でのデビューはクラブ史上最年少記録だった。

2017年にはJ1で10試合3得点を記録するとともに、U-23チームが参戦したJ3リーグでは21試合10得点と圧倒的な数字を残す。右サイドからのカットインで左足を振り抜くプレースタイルはこの頃から明確で、欧州クラブのスカウトたちの目に留まった。

## 欧州5クラブを渡り歩いた「武者修行」

2017年6月、堂安はオランダ・エールディヴィジのFCフローニンゲンへ移籍。当初はレンタルだったが、2018年4月に完全移籍へ切り替えられた。通算63試合15得点という成績がPSVアイントホーフェンの目に留まり、2019年夏にステップアップを果たす。

PSVでは出場機会を確保しきれず、2020-21シーズンはブンデスリーガのアルミニア・ビーレフェルトへレンタル移籍。ここでドイツサッカーの強度を体感し、35試合5得点で1部残留に貢献した。PSV復帰後も定位置を掴めなかったが、2022年7月、SCフライブルクへの完全移籍でキャリアは大きく転回する。

フライブルクでの3シーズンは堂安にとって最も充実した時期だった。クリスティアン・シュトライヒ監督の組織的な戦術の中で、守備の負荷を引き受けながらも得点に絡む「完成度の高い右ウイング」へと進化を遂げた。3シーズン通算で約123試合26得点。特に2024-25シーズンはブンデスリーガ10得点を記録し、自己最高の数字を刻んだ。

そして2025年8月、約2100万ユーロ（約33億円）でアイントラハト・フランクフルトへ移籍。かつて長谷部誠がキャプテンを務めた名門で、背番号20を引き継いだ。2025-26シーズンはブンデスリーガ27試合4得点を記録しながら、W杯本番への準備を進めている。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">カットインからの左足シュート——「予測できても止められない」武器</span>
<p class="point-body">堂安律の代名詞は右サイドからの鋭いカットインだ。相手DFを外側に誘導してから瞬時に中央へ切れ込み、左足で狙い澄ましたシュートを放つ。身長172cmと小柄ながら、低重心を活かした素早い方向転換は<strong>ブンデスリーガ</strong>屈指の脅威として認知されている。<strong>フライブルク</strong>での3年間で26得点、<strong>フランクフルト</strong>移籍後も安定して数字を残しており、2026年W杯では世界の名だたるDFを相手にこの武器が試される。「相手がわかっていても止められない」——それが堂安のカットインの恐ろしさだ。</p>
</div>

## 日本代表——W杯2試合連続ゴールの衝撃

堂安のA代表デビューは2018年9月11日、キリンチャレンジカップのコスタリカ戦だった。翌10月16日のウルグアイ戦（4-3で日本勝利）で代表初ゴールを記録。2019年のAFCアジアカップではトルクメニスタン戦で得点を挙げ、チームの準優勝に貢献した。

しかし堂安の真価が世界に示されたのは、2022年カタールW杯だった。グループリーグ初戦のドイツ戦、後半26分に途中出場した堂安は75分に同点ゴールを決める。ノイアーが一度弾いたこぼれ球を冷静に押し込んだ——試合は浅野拓磨の決勝弾で歴史的な逆転勝利。そして第3戦のスペイン戦でも後半開始直後の48分、伊東純也のパスを受けた堂安が強烈な左足で同点弾を叩き込んだ。田中碧の決勝ゴールにつなげ、日本はまたも逆転勝ちを収めた。

W杯の舞台でドイツとスペインという2つの優勝経験国から連続ゴール——この事実が、堂安律のメンタリティの強さを何よりも雄弁に物語っている。

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">欧州5クラブの経験値——「どこでも適応できる」柔軟性</span>
<p class="point-body">堂安はオランダ（<strong>フローニンゲン</strong>・<strong>PSV</strong>）、ドイツ（<strong>ビーレフェルト</strong>・<strong>フライブルク</strong>・<strong>フランクフルト</strong>）と異なる環境を渡り歩いてきた。各クラブで求められる役割は異なり、攻撃の自由を与えられた環境もあれば、守備のタスクを厳格に課されたチームもあった。その都度適応し、結果を残してきた経験は、W杯のような短期決戦で環境が変わる中でも力を発揮できる強みとなる。右ウイングだけでなくトップ下やインサイドハーフもこなせる戦術的柔軟性は、森保監督にとって貴重なオプションだ。</p>
</div>

A代表通算62試合11得点（2026年3月時点）。日本代表においては攻撃の核として欠かせない存在であり続けている。

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">「大舞台の男」——プレッシャーを力に変える精神力</span>
<p class="point-body"><strong>カタールW杯</strong>でのドイツ・スペイン連続ゴールが示すように、堂安は大舞台で真価を発揮するタイプの選手だ。重圧のかかる場面で冷静さを失わず、むしろギアを上げてくる。<strong>フランクフルト</strong>でもUEFAカンファレンスリーグの大一番で結果を出すなど、「勝負どころ」での勝負強さは一貫している。2026年北中米W杯では、4年前のカタールの記憶を胸に、再び世界を驚かせるゴールを狙う。27歳、心身ともに円熟期を迎えた堂安の左足が、日本の命運を左右する瞬間は必ず訪れるだろう。</p>
</div>

## 選手経歴

<table class="schedule-table"><thead><tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr></thead><tbody>
<tr><td>2015-17</td><td>ガンバ大阪</td><td>J1リーグ</td><td>15試合</td><td>3得点</td></tr>
<tr><td>2017-19</td><td>FCフローニンゲン</td><td>エールディヴィジ</td><td>63試合</td><td>15得点</td></tr>
<tr><td>2019-22</td><td>PSVアイントホーフェン</td><td>エールディヴィジ</td><td>55試合</td><td>11得点</td></tr>
<tr><td>2020-21</td><td>ビーレフェルト（レンタル）</td><td>ブンデスリーガ</td><td>35試合</td><td>5得点</td></tr>
<tr><td>2022-25</td><td>SCフライブルク</td><td>ブンデスリーガ</td><td>123試合</td><td>26得点</td></tr>
<tr><td>2025-26</td><td>フランクフルト</td><td>ブンデスリーガ</td><td>27試合</td><td>4得点</td></tr>
</tbody></table>

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p><strong>堂安律</strong>は<strong>ガンバ大阪</strong>ユース出身の27歳。16歳でJ1デビューを果たし、オランダの<strong>フローニンゲン</strong>、<strong>PSV</strong>を経てドイツへ渡った。<strong>フライブルク</strong>での3シーズンで123試合26得点と飛躍し、2025年夏に約2100万ユーロで<strong>アイントラハト・フランクフルト</strong>へ移籍。日本代表ではA代表62試合11得点を記録し、2022年<strong>カタールW杯</strong>ではドイツ戦・スペイン戦で2試合連続ゴールという離れ業を演じた。右サイドからのカットインと左足のシュートを最大の武器とし、大舞台での勝負強さは日本サッカー界屈指。2026年北中米W杯では、4年前の記憶を超える活躍が期待される。</p>
</div>`,
  },
  {
    id: "1774515902101",
    slug: "ueda-ayase-profile",
    title: "ゴール前の哲学者——上田綺世という、日本サッカー史上最も「論理的な」ストライカー",
    titleEn: "The Philosopher in Front of Goal — Ayase Ueda, the Most 'Logical' Striker in Japanese Football History",
    excerpt: "鹿島ノルテでユース昇格を逃した少年が、法政大学を経てJ1で得点を量産し、ベルギー、オランダへ。フェイエノールトで得点王を争うエースは、2026年W杯で日本の「9番問題」に終止符を打つ。",
    excerptEn: "A boy who failed to earn promotion to Kashima Antlers' youth team went on to score prolifically in J1 via Hosei University, then moved to Belgium and the Netherlands. Now competing for the Eredivisie golden boot at Feyenoord, this ace striker aims to settle Japan's long-standing 'number 9 problem' at the 2026 World Cup.",
    category: "選手紹介" as const,
    tags: ["上田綺世", "日本代表", "フェイエノールト", "エールディヴィジ", "W杯2026", "鹿島アントラーズ", "セルクル・ブルッヘ", "ストライカー"],
    tagsEn: ["Ayase Ueda", "Japan National Team", "Feyenoord", "Eredivisie", "World Cup 2026", "Kashima Antlers", "Cercle Brugge", "Striker"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: true,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `ゴール前で息を潜め、一瞬で仕留める——。上田綺世とは、そういうストライカーだ。

茨城県水戸市。この地で生まれた少年は、中学時代に鹿島アントラーズの下部組織「ノルテ」に所属した。だが当時170cm程度だった体格では、ユース昇格の壁を越えられなかった。3つのジュニアユースから15名ほどが選ばれるユース昇格の選考——上田はその枠に入れなかった。「いつか戻ってやる」。その悔しさが、上田綺世の原点だ。

鹿島学園高校に進学するも、1年次はフィジカルが未成熟で出場機会に恵まれなかった。2年次からようやく身体が仕上がり始め、高校年代で頭角を現す。そして法政大学へ進学。関東大学リーグで圧倒的な得点力を見せつけ、2年次の2018年には全日本大学サッカー選手権（インカレ）で42年ぶりとなる法政大の優勝に貢献した。Jクラブによる争奪戦を勝ち抜いたのは、かつて自分をユースに上げなかった鹿島アントラーズだった。

## プロフィール

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>上田 綺世（うえだ あやせ）</td></tr>
    <tr><th>生年月日</th><td>1998年8月28日（27歳）</td></tr>
    <tr><th>出身地</th><td>茨城県水戸市</td></tr>
    <tr><th>身長/体重</th><td>182cm / 76kg</td></tr>
    <tr><th>ポジション</th><td>FW（CF/ST）</td></tr>
    <tr><th>現所属</th><td>フェイエノールト（オランダ・エールディヴィジ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表34試合16得点（2019年〜）</td></tr>
  </tbody>
</table>

## 鹿島で開花した「得点感覚」

2021年シーズンからの加入が内定していた上田だが、2019年夏に前倒しで鹿島へ加入する決断を下した。法政大サッカー部を3年で退部し、7月28日にチーム合流。わずか3日後の7月31日、浦和レッズ戦で途中出場しプロデビューを飾った。8月10日の横浜F・マリノス戦ではプロ初ゴールを記録。そこから得点を量産し始める。

鹿島での3シーズン半でJ1リーグ通算86試合38得点。得点率は0.44——つまり2試合に1点近いペースで得点を重ねた。特筆すべきは、そのゴールパターンの多彩さだ。DFの背後への抜け出し、ヘディング、ワンタッチフィニッシュ。どの形からでもゴールを奪える。30年以上この世界を見てきたが、大学経由でこれほどの得点率を叩き出した日本人ストライカーは記憶にない。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">「大学経由」が生んだ知性派ストライカー</span>
<p class="point-body">ユース昇格を逃した経験が、上田を「考えるストライカー」に変えた。<strong>法政大学</strong>での4年間（※3年で退部）で磨かれたのは、DFとの駆け引きを論理的に組み立てる力だ。<strong>鹿島アントラーズ</strong>ではJ1通算得点率0.44という驚異的な数字を叩き出し、リーグ屈指の点取り屋へと成長した。プロユース出身でないからこそ、自分の武器を言語化し、再現性のある得点パターンを構築できた点が上田の最大の特異性だ。</p>
</div>

## ベルギーで証明した「欧州で通用する身体」

2022年7月、上田は海を渡った。ベルギー1部セルクル・ブルッヘへの完全移籍。日本人ストライカーが欧州で苦しむケースは少なくない。フィジカルの壁、言語の壁、戦術の違い——だが上田は違った。

移籍初年度から得点を重ね、シーズン途中にポジションがCFからセカンドトップに変更されると覚醒。後半戦は12試合で11得点というハイペースでゴールを量産した。最終的にベルギーリーグ（プレーオフ含む）で40試合22得点を記録し、得点ランキング2位に食い込んだ。この22得点は、当時鈴木優磨（シント・トロイデン）が持っていた17得点の日本人最多記録を大幅に更新するものだった。

「日本のロケットシュート」と現地メディアに評された腰の回転から繰り出す強烈なシュートは、ベルギーのGKたちを震え上がらせた。

なぜ上田は欧州で即座に結果を出せたのか。答えは「準備」にある。鹿島時代から欧州移籍を見据えたフィジカル強化を続けていた。ゴール前での駆け引きは万国共通だが、そこに至るまでの身体の使い方は欧州仕様にアップデートする必要がある。上田はそれを移籍前に済ませていたのだ。

## フェイエノールトで「エース」の称号を掴む

2023年8月、オランダの名門フェイエノールトが800万ユーロ（約12億円）で上田を獲得。背番号9を託された。

初年度の2023-24シーズンは苦しんだ。リーグ26試合で5得点、先発はわずか5試合。オランダのサッカーは組織的でテンポが速く、ベルギーとは異なるインテンシティが求められた。

だが上田は腐らなかった。2024-25シーズンにはリーグ22試合7得点と数字を伸ばし、チーム内での序列を確実に上げた。そして迎えた2025-26シーズン——上田は完全に覚醒する。

開幕戦から3試合連続得点でスタートダッシュに成功。10月19日にはエールディヴィジで日本人選手史上初のハットトリックを達成。このゴールはフェイエノールトのクラブ通算5,000ゴール目という歴史的な一撃でもあった。12月6日のPECズヴォレ戦では自身2度目のハットトリックを記録し、18得点でリーグにおける日本人最多得点記録を塗り替えた。2026年3月時点でリーグ22得点を積み上げ、得点王争いの真っただ中にいる。

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2019-22</td><td>鹿島アントラーズ</td><td>J1リーグ</td><td>86試合</td><td>38得点</td></tr>
    <tr><td>2022-23</td><td>セルクル・ブルッヘ</td><td>ベルギー1部</td><td>40試合</td><td>22得点</td></tr>
    <tr><td>2023-24</td><td>フェイエノールト</td><td>エールディヴィジ</td><td>26試合</td><td>5得点</td></tr>
    <tr><td>2024-25</td><td>フェイエノールト</td><td>エールディヴィジ</td><td>22試合</td><td>7得点</td></tr>
    <tr><td>2025-26</td><td>フェイエノールト</td><td>エールディヴィジ</td><td>24試合</td><td>22得点</td></tr>
  </tbody>
</table>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">フェイエノールト3年目の「覚醒」——適応曲線が示すもの</span>
<p class="point-body">初年度5得点、2年目7得点、そして3年目に22得点。この適応曲線は偶然ではない。<strong>フェイエノールト</strong>の戦術システムを理解し、<strong>エールディヴィジ</strong>特有のハイプレスに対応する動き出しを体得した結果だ。特に2025-26シーズンは<strong>ハットトリック</strong>を2度達成するなど、得点パターンの幅が格段に広がった。ペナルティエリア内での嗅覚と味方との連携が高次元で融合し、欧州トップリーグの得点王争いに名を連ねている。</p>
</div>

## 日本代表——コパ・アメリカからW杯のエースへ

上田の代表デビューは2019年6月18日、コパ・アメリカのチリ戦だった。法政大在学中の3年生、20歳。大学生のA代表選出は2010年の永井謙佑以来9年ぶりという快挙だった。南米の強豪相手にスタメンで臨んだものの、大会3試合で決定機を5度外すという苦い経験も味わった。だがこの悔しさが、後の上田を形作った。

以降、着実にキャップを積み重ね、A代表通算34試合16得点（2025年11月時点）。特に2024年以降はエースストライカーの座を確固たるものにした。W杯アジア最終予選では重要な場面でゴールを決め、日本の本大会出場に貢献。その決定力は、かつての日本代表が最も渇望していたものだ。

30年以上W杯を現地で取材してきた立場から言えば、日本代表がこれほど信頼できるセンターフォワードを持つのは初めてかもしれない。高原直泰、大迫勇也といった歴代エースたちもW杯で奮闘したが、上田には彼らにはなかった「欧州トップリーグでの得点王争い」という裏付けがある。

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">日本代表の「9番問題」に終止符を打つ存在</span>
<p class="point-body">長年、日本代表は世界基準のセンターフォワード不在に悩まされてきた。<strong>上田綺世</strong>はその課題に正面から答えを出しつつある。<strong>コパ・アメリカ</strong>でのデビューから約7年、代表通算16得点を積み上げた。<strong>フェイエノールト</strong>でエールディヴィジ得点王を争う実績は、W杯本番で対戦国のDFにとって明確な脅威となる。ペナルティエリア内での冷静さと多彩なフィニッシュは、日本サッカー史上最も完成度の高いストライカーと評しても過言ではない。</p>
</div>

## 北中米W杯へ——エースが背負う「期待」と「覚悟」

2026年6月、北中米W杯が開幕する。上田に求められるのはシンプルだ——「ゴール」である。

エールディヴィジで見せている爆発的な得点力を、W杯という最高峰の舞台で再現できるか。欧州の屈強なDFを相手に、あの鋭い腰の回転から繰り出すシュートが突き刺さるか。

上田にはその準備ができている。ユース昇格を逃したあの日から、すべての経験が今につながっている。大学で磨いた知性、鹿島で開花した得点感覚、ベルギーで証明したフィジカル、そしてフェイエノールトで手にした自信と実績。

水戸市で生まれた少年は、世界最高の舞台で日本の「9番」を背負う。

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>茨城県水戸市出身の<strong>上田綺世</strong>は、<strong>鹿島アントラーズ</strong>下部組織のユース昇格を逃しながらも、<strong>法政大学</strong>を経て鹿島でJ1通算86試合38得点を記録した。2022年に<strong>セルクル・ブルッヘ</strong>へ移籍し欧州初年度からベルギーリーグ40試合22得点で日本人最多記録を樹立。翌年には名門<strong>フェイエノールト</strong>へ800万ユーロで移籍し、背番号9を背負う。初年度こそ5得点に留まったが、3年目の2025-26シーズンには日本人初のエールディヴィジ・ハットトリックを含む22得点を叩き出し、得点王争いの中心にいる。日本代表でもA代表通算34試合16得点を誇り、2026年北中米W杯ではエースストライカーとして日本サッカーの歴史を塗り替える使命を帯びる。</p>
</div>`,
  },
  {
    id: "1774515902101",
    slug: "kubo-takefusa-profile",
    title: "【選手紹介】久保建英｜ラ・マシアからレアル・ソシエダへ——日本が誇る左足のテクニシャン",
    titleEn: "Player Profile: Takefusa Kubo — From La Masia to Real Sociedad, Japan's Left-Footed Maestro",
    excerpt: "10歳でバルセロナのカンテラに入団し、15歳でJリーグ最年少記録を樹立。レアル・マドリードとの契約、4クラブへのレンタル修業を経てレアル・ソシエダで開花した久保建英の軌跡を、データと戦術分析で読み解く。",
    excerptEn: "Joining Barcelona's academy at age 10, setting the J.League's youngest player record at 15, and signing with Real Madrid — Takefusa Kubo's journey through four loan spells to his breakthrough at Real Sociedad, analyzed through data and tactical insight.",
    category: "選手紹介" as const,
    tags: ["久保建英", "レアル・ソシエダ", "ラ・リーガ", "日本代表", "W杯2026", "海外組", "FCバルセロナ", "レアル・マドリード", "選手プロフィール"],
    tagsEn: ["Takefusa Kubo", "Real Sociedad", "La Liga", "Japan National Team", "World Cup 2026", "Overseas Players", "FC Barcelona", "Real Madrid", "Player Profile"],
    publishedAt: "2026-03-26",
    updatedAt: "2026-03-26",
    isPopular: true,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `<p class="article-lead">10歳でバルセロナのカンテラに飛び込み、15歳でJリーグ最年少記録を塗り替え、18歳でレアル・マドリードと契約した男——久保建英。2026年現在、レアル・ソシエダの攻撃を牽引する24歳の左足は、日本サッカー史上最も早熟にして最も正統派のテクニシャンである。7大会連続でW杯を現地取材してきた筆者が、この稀有な才能の軌跡を読み解く。</p>

<table class="profile-table">
<tbody>
<tr><th>名前</th><td>久保 建英（くぼ たけふさ）</td></tr>
<tr><th>生年月日</th><td>2001年6月4日（24歳）</td></tr>
<tr><th>出身地</th><td>神奈川県川崎市麻生区</td></tr>
<tr><th>身長/体重</th><td>173cm / 67kg</td></tr>
<tr><th>ポジション</th><td>MF/FW（右ウイング、トップ下）</td></tr>
<tr><th>所属クラブ</th><td>レアル・ソシエダ（ラ・リーガ）</td></tr>
<tr><th>代表歴</th><td>48試合7得点（2019年デビュー）</td></tr>
</tbody>
</table>

## ラ・マシアが認めた「日本の神童」

久保建英のサッカー人生は、3歳でボールを蹴り始めたところから動き出す。川崎フロンターレの下部組織で基礎を磨いた後、FCバルセロナが日本で開催したキャンプでMVPを獲得。この結果がスカウトの目に留まり、2011年8月、わずか**10歳**でラ・マシアの入団テストに合格した。バルセロナのカンテラに正式入団した日本人選手として初の事例であり、少年はアレビンCからインファンティルへと順調に昇格。2013-14シーズンには地中海カップ（MIC）U-12大会で**MVPに選出**される。

しかし2014年、FIFAがバルセロナに対して18歳未満の外国人選手獲得に関する規定違反で制裁を発動。久保は公式戦への出場機会を失い、スペインでの夢は一時中断を余儀なくされた。13歳で帰国し、FC東京U-15むさしに加入。ここで彼は「挫折」ではなく「再始動」を選んだ。U-18への飛び級昇格を経て、**2016年11月5日**、J3リーグ第28節・AC長野パルセイロ戦で**15歳5ヶ月1日**のJリーグ史上最年少出場記録を樹立した。翌2017年4月にはJリーグ最年少得点（**15歳10ヶ月11日**）も記録し、11月にFC東京とプロ契約を締結。同月26日にはJ1リーグ・サンフレッチェ広島戦でJ1デビューを飾り、**16歳5ヶ月22日**でのJ1出場はリーグ歴代3位の年少記録となった。

## レアル・マドリード契約とレンタル修業の真実

2018年には横浜F・マリノスへ期限付き移籍し、J1で5試合1得点を記録。FC東京に復帰した2019年前半はJ1で13試合4得点と結果を出し、同年6月、18歳でレアル・マドリードと契約を結ぶ。だがトップチームでの出場機会は訪れなかった。ここから始まる4クラブへのレンタル移籍は、挫折の連続に見えて、実は**ラ・リーガの荒波で生き残る術**を叩き込まれた3年間だった。

<table class="schedule-table">
<thead><tr><th>期間</th><th>所属クラブ</th><th>リーグ</th><th>出場</th><th>得点</th></tr></thead>
<tbody>
<tr><td>2019-20</td><td>RCDマジョルカ</td><td>ラ・リーガ</td><td>35</td><td>4</td></tr>
<tr><td>2020-21前半</td><td>ビジャレアルCF</td><td>ラ・リーガ</td><td>13</td><td>0</td></tr>
<tr><td>2020-21後半</td><td>ヘタフェCF</td><td>ラ・リーガ</td><td>18</td><td>1</td></tr>
<tr><td>2021-22</td><td>RCDマジョルカ（2回目）</td><td>ラ・リーガ</td><td>28</td><td>1</td></tr>
<tr><td>2022-23</td><td>レアル・ソシエダ</td><td>ラ・リーガ</td><td>35</td><td>9</td></tr>
<tr><td>2023-24</td><td>レアル・ソシエダ</td><td>ラ・リーガ</td><td>30</td><td>7</td></tr>
<tr><td>2024-25</td><td>レアル・ソシエダ</td><td>ラ・リーガ</td><td>36</td><td>5</td></tr>
<tr><td>2025-26</td><td>レアル・ソシエダ</td><td>ラ・リーガ</td><td>18</td><td>2</td></tr>
</tbody>
</table>

マジョルカでの1年目は鮮烈だった。2019年9月にラ・リーガデビューを果たすと、11月10日のビジャレアル戦でスペイン初得点をミドルシュートで叩き込む。**18歳5ヶ月6日**は、欧州4大リーグにおける日本人最年少得点記録となった。ビジャレアルではラ・リーガで13試合出場も無得点に終わり半年で移籍。ヘタフェでは残留争いの中で泥臭いサッカーを経験した。2度目のマジョルカではラ・リーガ28試合で1得点。華やかさとは無縁の3年間で、久保は**フィジカルコンタクトへの対応力**と**守備意識**を身につけていった。

## レアル・ソシエダで開花——キャリアハイの2022-23

2022年7月19日、レアル・ソシエダへ完全移籍。クラブ史上初の日本人選手として、ここが本当の居場所となる。2022-23シーズンはラ・リーガ35試合で**9得点7アシスト**のキャリアハイを叩き出し、チームのシーズンMVPに選出された。翌2023-24シーズンも7得点4アシストを記録し、エースとしての地位を固めた。

2024-25シーズンはラ・リーガでアシスト0に終わるなど数字上の波があったものの、チーム戦術の中核として起用され続けている。2025-26シーズンも負傷離脱を挟みながら18試合2得点3アシストを記録中だ。2024年2月に契約を延長し、**2029年6月30日**までレアル・ソシエダに在籍する。違約金条項は6,000万ユーロ。クラブの長期的な構想に不可欠な存在として評価されている証拠だ。

## 日本代表——背番号10の重み

2019年6月9日、キリンチャレンジカップのエルサルバドル戦で18歳5日でA代表デビュー。これは**市川大祐**に次ぐ日本代表史上2番目の年少記録だった。同月のコパ・アメリカ2019にも選出され、グループリーグ3試合に出場。以降着実にキャップを重ね、2026年3月時点で**48試合7得点**を記録している。

2021年東京五輪ではU-24代表のエースとして、グループリーグ**全3試合で連続得点**という快挙を達成。南アフリカ戦の決勝点、メキシコ戦の先制点、フランス戦の先制点と、すべてが勝利に直結するゴールだった。2022年カタールW杯ではグループリーグのドイツ戦・スペイン戦で**2試合先発出場**。歴史的なドイツ撃破（2-1）にも2列目の一角として貢献した。

そして2025年6月10日、W杯アジア最終予選のインドネシア戦。**背番号10を背負い、初のゲームキャプテン**として臨んだ久保は、1得点2アシストでチームの6-0大勝を演出した。遠藤航から託されたキャプテンマークを巻くその姿は、日本代表の新時代を象徴するものだった。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">左足のカットイン——5大リーグ屈指のドリブラー</span>
<p class="point-body">久保建英の最大の武器は、右サイドから中央へ切り込む<strong>左足のカットイン</strong>だ。2024-25シーズンのドリブル成功数は欧州5大リーグ全体で<strong>3位</strong>（87回）に入り、<strong>ラミン・ヤマル</strong>（116回）、<strong>バイノー=ギッテンス</strong>（88回）に次ぐ数字を記録した。ボールを左足のすぐそばに置いたまま急加速で相手を抜き去る<strong>クローズコントロール</strong>は、ラ・マシア仕込みの技術が凝縮されたものだ。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">ドリブラーにしてプレーメーカー——得点を演出する視野</span>
<p class="point-body">久保が単なる突破型のアタッカーと一線を画すのは、その<strong>パスビジョン</strong>にある。<strong>レアル・ソシエダ</strong>での2022-23シーズンには9得点に加え7アシストを記録し、得点と演出の両面でチームを牽引した。右サイドからカットインした際、シュートを選ぶかスルーパスを出すか、瞬時に最適解を選べる判断速度は、<strong>バルセロナのカンテラ</strong>で10歳から叩き込まれた「サッカーIQ」の賜物だろう。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">レンタル修業が鍛えた「戦える身体と精神」</span>
<p class="point-body">173cm・67kgという体格は<strong>ラ・リーガ</strong>では決して恵まれていない。しかし久保は<strong>マジョルカ</strong>、<strong>ビジャレアル</strong>、<strong>ヘタフェ</strong>という3つのクラブでの武者修行を通じ、フィジカルバトルで倒されても即座に立ち上がるメンタリティと、守備時のポジショニングを習得した。華麗な技術だけでは生き残れないスペインで泥臭さを身につけたことが、<strong>レアル・ソシエダ</strong>での飛躍に直結している。</p>
</div>

<div class="summary-card">
<div class="summary-label">SUMMARY</div>
<p><strong>久保建英</strong>は、10歳で<strong>FCバルセロナ</strong>のカンテラに入団し、15歳でJリーグ最年少記録を樹立、18歳で<strong>レアル・マドリード</strong>と契約した日本サッカー界の至宝である。4クラブへのレンタル移籍で実戦力を磨き、2022年から<strong>レアル・ソシエダ</strong>で完全に開花。ラ・リーガ通算27得点を積み上げ、日本代表でも48キャップ7得点を記録する。2024-25シーズンには欧州5大リーグのドリブル成功数で3位に入る突破力を誇り、2026年W杯を控えた今、背番号10を背負う24歳は日本サッカーの歴史を塗り替える存在へと成長を続けている。</p>
</div>

<p class="article-source">出典：JFA公式、Transfermarkt、FBref、Jリーグ公式データサイト、サッカーキング、ゲキサカ、Football Zone（2026年3月時点のデータ）</p>`,
  },
  {
    id: "1774364639198",
    slug: "news-1774364639197",
    title: "【ブンデスリーガ】マインツが日本人対決制す！佐野海舟・川崎颯太がインフルエンサーにサイン",
    excerpt: "マインツがフランクフルトに2-1で勝利。試合後、MF佐野海舟とMF川崎颯太が有名インフルエンサーのウンパルンパにサインするシーンがリーグ公式Xで話題に。",
    category: "海外組" as const,
    tags: ["ブンデスリーガ","1.FSVマインツ05","佐野海舟","川崎颯太","アイントラハト・フランクフルト","日本人選手"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
    ],
    content: `## ブンデスリーガ第27節、マインツがフランクフルトを撃破

1.FSVマインツ05は22日、ドイツ・ブンデスリーガ第27節でアイントラハト・フランクフルトと対戦した。試合は2-1でマインツが勝利を掴む。この一戦は日本人選手の活躍が目立つものとなった。

## サイン攻防で日本人対決制す

試合後、現地の光景が話題を呼んだ。マインツのMF佐野海舟（日本代表）とMF川崎颯太（日本代表）が、有名インフルエンサーの"ウンパルンパ"にサインを求められたのだ。両選手とも応じた。その映像はブンデスリーガ公式の日本語Xアカウントで配信された。

ファンサービスに応じる姿勢は、海外で活動する日本人選手の好感度を高める。マインツでのポジション争いも白熱している中、こうした一場面が注目される背景には、日本からのサポート層の厚さがある。

<div class="stat-box">
<span class="stat-number">2-1</span>
<span class="stat-label">マインツの勝利を支えた日本人MFコンビ</span>
<p class="stat-body"><strong>マインツ</strong>がフランクフルトを2-1で下した試合で、<strong>佐野海舟</strong>と<strong>川崎颯太</strong>の日本代表MFコンビが中盤の攻守で存在感を示した。ブンデスリーガで同じクラブに所属する日本代表級の選手が複数在籍し、チーム内で切磋琢磨する環境は、W杯に向けた個々の成長を加速させている。マインツの首脳陣も日本人選手の勤勉さと技術力を高く評価しており、クラブのアジア戦略にも好影響を与えている。</p>
</div>

<div class="quote-box">
<span class="quote-label">INSIGHT</span>
<p class="quote-body"><strong>リーグ公式が日本語で配信——マーケティング戦略の一端</strong> — <strong>ブンデスリーガ公式</strong>の日本語Xアカウントが、<strong>佐野海舟</strong>と<strong>川崎颯太</strong>がインフルエンサー<strong>ウンパルンパ</strong>にサインする映像を配信した。リーグ公式がわざわざ日本語で発信する背景には、東アジア市場への戦略的な拡大意図がある。日本人選手の存在がリーグのグローバル展開に直接寄与している証拠であり、選手個人のブランド価値向上にもつながる好循環が生まれている。</p>
</div>

## 海外での認知度向上へ

試合終了後のこのやり取りは、単なる選手とファンのふれあいではない。日本代表選手の海外での認知拡大につながる機会だ。インフルエンサーを通じた情報発信力は侮れない。

ブンデスリーガがわざわざ日本語で配信した点も、東アジア地域への販売戦略が反映されている。マインツの両日本人選手への注目は、今後の移籍市場でも影響を与えるだろう。

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>W杯を控えたマインツの「日本人枠」——クラブと代表の相乗効果</strong> — <strong>佐野海舟</strong>はブンデスリーガ2024-25シーズンにデュエル勝利数・走行距離でリーグ1位を記録した守備的MF。<strong>川崎颯太</strong>も中盤の構成力でチームに不可欠な存在だ。同じクラブで日常的にトレーニングを共にする日本代表級の選手が複数いることは、W杯本番での連携面にもプラスに働く。マインツというクラブが、日本代表の「欧州拠点」の一つとして機能し始めている現実は、日本サッカーの国際化を象徴する好事例だ。</p>
</div>

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li><strong>マインツ</strong>はブンデスリーガ第27節で<strong>フランクフルト</strong>に2-1で勝利。試合後、MF<strong>佐野海舟</strong>とMF<strong>川崎颯太</strong>の日本代表コンビがインフルエンサー<strong>ウンパルンパ</strong>にサインを求められ応じた。</li>
    <li>この映像が<strong>ブンデスリーガ公式</strong>の日本語Xアカウントで配信され話題となった。リーグ公式が日本語で積極発信する背景には、日本人選手の活躍を軸とした東アジア市場へのマーケティング戦略がある。</li>
    <li>ピッチ上の勝利とピッチ外の話題性、両面でマインツの日本人選手が存在感を高めている。</li>
  </ul>
</div>`,
  },
  {
    id: "1774347470509",
    slug: "news-1774347470509",
    title: "【物議】試合中ベンチでスマホ操作→チームスタッフが注意！デパイの行動に元ブラジル代表FWが言及",
    excerpt: "オランダ代表FWデパイがコリンチャンスのフラメンゴ戦で試合中にベンチでスマートフォンを操作し、スタッフから注意される場面があった。元ブラジル代表FWが批判コメン",
    category: "海外組" as const,
    tags: ["デパイ","コリンチャンス","フラメンゴ","ブラジル","プロフェッショナル意識"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: false,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
    ],
    content: `## ベンチでスマホ操作、デパイに厳しい視線

コリンチャンス（ブラジル）に所属するメンフィス・デパイ（オランダ代表）。22日のフラメンゴ戦での一場面が波紋を呼んでいる。試合中、ベンチに下りた同選手がスマートフォンを手にしたのだ。

チームスタッフが即座に注意。だがこの光景は、ブラジルサッカー界のOBから批判の声を招いた。元ブラジル代表FWルイス・ファビアーノ氏（元ACミラン）がこの件に言及。ESPN Brasilが24日に報じている。

## 欧州基準との落差を指摘

「欧州のクラブならあり得ない」。ファビアーノ氏の言葉は明確だ。一流クラブの規律感、プロ意識の違いを強調した。試合中のベンチでのスマホ使用は、集中力の散漫を示す行為。特にチームの主力FWの立場では許されない振る舞いと指摘される。

デパイはコリンチャンスの主力として期待される選手である。だからこそ周囲の目も厳しい。ブラジルでのプレーはプレースタイルだけでなく、規律面でも適応が求められることを改めて露呈させた。

<div class="stat-box">
<span class="stat-number">3クラブ</span>
<span class="stat-label">異なるサッカー文化の衝突</span>
<p class="stat-body"><strong>メンフィス・デパイ</strong>は<strong>マンチェスター・ユナイテッド</strong>、<strong>バルセロナ</strong>、<strong>アトレティコ・マドリード</strong>と欧州のビッグクラブを渡り歩いてきた。そこでは試合中のベンチでの振る舞いまで厳格に管理される。ブラジルサッカーの自由で情熱的な文化とのギャップが、この一件で鮮明になった。環境の違いへの適応は、ピッチ上の戦術だけではなく、クラブ文化への順応も含まれるという教訓だ。</p>
</div>

デパイの加入はコリンチャンスにとって大きなニュースだった。エンターテイメント性と得点力を兼ね備えた攻撃手として期待された。だが実際のブラジル舞台での適応は、単なるテクニックの問題ではない。

<div class="quote-box">
<span class="quote-label">INSIGHT</span>
<p class="quote-body"><strong>プロフェッショナリズムの可視化</strong> — <strong>ルイス・ファビアーノ</strong>氏（元ACミラン・元ブラジル代表）の指摘は、南米と欧州のプロ意識の温度差を浮き彫りにした。年俸に見合う振る舞いが常に求められる現代サッカーにおいて、ベンチでの数秒間の行動すらSNSで拡散される時代。選手の「見えない時間」の過ごし方が、評価を左右する現実を示している。</p>
</div>

スマホを触った時間は数秒だったろう。だがスポーツの現場では、こうした瞬間が評価を左右する。ベンチでの振る舞いはチームメイト、指揮官、サポーターの目に映る。

実は欧州の一流クラブでは、ベンチでの姿勢管理は厳格だ。スポーツドリンクを飲む角度、うなずく仕草まで指導される。デパイはそうした環境を知っている。ブラジルでの自由度の高さに甘えたのか、単なる習慣の違いか。いずれにせよ、改善が急務だ。

フラメンゴ戦はコリンチャンスにとって重要な試合だった。その緊張感の中で、選手のメンタル状態が露わになることもある。スマホ操作に走った理由も考慮すべきだろう。

だがファビアーノ氏の言葉は重い。「欧州のクラブなら絶対にしない」。この一言に凝縮された現場感覚は、デパイへの期待の大きさを逆説的に示している。

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>SNS時代の選手管理——「ベンチの数秒」が世界に拡散される現実</strong> — かつてなら見過ごされたベンチでの振る舞いが、スマートフォンのカメラとSNSによって瞬時に世界中へ拡散される時代だ。<strong>デパイ</strong>のスマホ操作は試合中継のカメラが捉え、即座にSNSで拡散された。欧州の一流クラブではベンチでの姿勢管理まで指導される。選手のブランド価値がSNS上で形成される現代において、ピッチ外の行動管理は契約交渉やスポンサー獲得にも影響する。「見えない時間」の過ごし方こそが、プロフェッショナルの真価を問うという教訓を残した一件だ。</p>
</div>

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li><strong>メンフィス・デパイ</strong>（<strong>コリンチャンス</strong>）が<strong>フラメンゴ</strong>戦の試合中にベンチでスマートフォンを操作し、チームスタッフから即座に注意を受けた。元ブラジル代表FWの<strong>ルイス・ファビアーノ</strong>氏は「欧州のクラブなら絶対にあり得ない」と批判。</li>
    <li><strong>マンチェスター・ユナイテッド</strong>や<strong>バルセロナ</strong>を経験したデパイだからこそ、その行動は余計に注目を浴びた。</li>
    <li>プロ選手の規律意識は、ピッチ外の数秒間の行動にこそ表れるという現実を突きつけた一件だ。</li>
  </ul>
</div>`,
  },
  {
    id: "1774346895440",
    slug: "1986-po-mn4gbuq8",
    title: "【デンマーク代表】ヒュンメル、1986年ユニに敬意を表したアウェイユニフォームを発表！欧州PO決勝でお披露目予定",
    titleEn: "Hummel Unveils Denmark Away Kit Paying Tribute to Iconic 1986 Design — Set to Debut in European Playoff Final",
    excerpt: "デンマークのスポーツブランドhummelが、1986年デザインに敬意を表したデンマーク代表アウェイユニフォームを発表。交差するピンストライプが特徴で、欧州PO決",
    excerptEn: "Danish sportswear brand Hummel has unveiled a new Denmark national team away kit paying tribute to the 1986 design. Featuring distinctive crossed pinstripes, it is set to debut in the European Playoff final.",
    category: "海外組" as const,
    tags: ["デンマーク代表","ユニフォーム","hummel","欧州PO","1986年レトロ"],
    tagsEn: ["Denmark National Team", "Kit", "Hummel", "European Playoff", "1986 Retro"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: false,
    sources: [
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `# ヒュンメル、1986年ユニに敬意を表したデンマーク代表のアウェイユニフォームを発表！ 欧州PO決勝でお披露目予定

デンマークの老舗スポーツブランド・hummel（ヒュンメル）が、デンマーク代表の新しいアウェイユニフォームを発表した。歴史的デザインへの敬意を込めた仕上がりが特徴だ。

## 1986年の栄光を現代に

新ユニフォームの最大の見どころは交差するピンストライプにある。これはデンマーク国旗のグラフィックを表現したもので、1986年のデンマーク代表ユニフォームへのオマージュとなっている。

デンマークサッカーの歴史において、1986年は特別な意味を持つ。当時のユニフォームデザインが現在でも多くのサポーターに愛されており、ヒュンメルはその伝統を尊重する形で新作を企画した。

ピンストライプの配置や色合いは、往年の名作を思わせながらも、最新のユニフォーム技術を活用した現代的な解釈がなされている。懐かしさと新しさが融合したデザインの実現だ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">1986年W杯メキシコ大会への敬意をデザインに昇華</span>
<p class="analysis-body">交差するピンストライプは<strong>デンマーク国旗</strong>（ダネブロ）のクロスをグラフィカルに表現したもので、1986年メキシコW杯で「デニッシュ・ダイナマイト」と呼ばれた黄金期のユニフォームへのオマージュだ。当時のデンマーク代表はミカエル・ラウドルップらを擁してW杯初出場でベスト16入りを果たし、そのユニフォームは今なお世界的に高い人気を誇る。ヒュンメルは歴代デザインのDNAを受け継ぎながら最新素材と製法を投入し、懐古と革新を一着に凝縮している。</p>
</div>

## 欧州プレーオフ決勝での初陣

このアウェイユニフォームが初めて着用される舞台は、欧州プレーオフ決勝戦となる。国を代表する選手たちが、この新しいデザインに身を包んで戦うことになる。

大きな舞台での初登場は、このユニフォームに対する期待の大きさを示している。デンマークサッカー界にとって重要な試合で、歴史的デザインが新たな歴史を刻む瞬間となるだろう。

ユニフォームの機能面でも手は抜かれていない。最新のテクノロジーにより、選手のパフォーマンスをサポートする設計になっている。快適性と耐久性を兼ね備えた仕上がりだ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">W杯出場をかけた欧州PO決勝で初着用</span>
<p class="analysis-body">新アウェイユニフォームが初めて着用されるのは、2026年W杯出場をかけた<strong>欧州プレーオフ決勝</strong>戦だ。デンマークにとってW杯切符がかかった大一番で歴史的デザインを纏うことは、選手とサポーターの結束力を高める心理的効果も期待される。1986年の黄金期を彷彿とさせるユニフォームが、新たな歴史の目撃者となる可能性を秘めている。</p>
</div>

## 伝統と革新の絶妙なバランス

ヒュンメルは長年、デンマーク代表ユニフォームの製造を担当してきた。そうした実績があるからこそ、過去のデザインを敬いながらも現代的な表現に昇華させることができたのだろう。

デザイン面だけでなく、カラーリングにおいても細かい配慮がなされている。赤と白のコンビネーションはデンマーク国旗の伝統的な配色を踏襲しつつ、トーンの微妙な調整で現代的な印象に仕上げられた。

47年にわたるパートナーシップの蓄積があるからこそ、過去の名作を敬いながらも現代の技術で昇華させることが可能だった。1986年の記憶と2026年の挑戦が一枚の布地に凝縮されたユニフォーム——それがヒュンメルの新作の本質だ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">「レトロユニ」ブームの最前線——ファン心理とマーケティングの融合</span>
<p class="analysis-body">近年のサッカー界では、過去の名作ユニフォームをオマージュした「レトロデザイン」が世界的なトレンドとなっている。<strong>ナイキ</strong>のオランダ代表、<strong>アディダス</strong>のドイツ代表など、各メーカーが1980〜90年代のデザインを復刻する動きが加速。<strong>ヒュンメル</strong>のデンマーク代表ユニフォームもこの潮流に乗りつつ、単なる復刻ではなく機能性を両立させた点が評価される。レプリカユニフォームの売上はクラブ・協会の重要な収益源であり、「歴史を纏う」という付加価値がファンの購買意欲を刺激する構造だ。</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>ヒュンメル</strong>が発表した<strong>デンマーク代表</strong>の新アウェイユニフォームは、1986年メキシコW杯の「デニッシュ・ダイナマイト」時代への敬意を込めたデザインが特徴だ。交差するピンストライプは<strong>デンマーク国旗</strong>（ダネブロ）のクロスをグラフィカルに表現したもので、<strong>ミカエル・ラウドルップ</strong>らが活躍した黄金期の記憶を現代の素材・技術で蘇らせた。W杯出場をかけた<strong>欧州プレーオフ決勝</strong>での初着用が予定されており、1979年から続くヒュンメルとデンマーク代表の47年のパートナーシップが生んだ傑作と言える。</p>
</div>`,
    contentEn: `# Hummel Unveils Denmark Away Kit Paying Tribute to 1986 Design — Set to Debut in European Playoff Final

Danish heritage sportswear brand Hummel has unveiled a new away kit for the Denmark national team. The design is characterized by its tribute to a historic kit.

## Bringing the Glory of 1986 into the Modern Era

The standout feature of the new kit is its crossed pinstripes. These represent a graphic interpretation of the Danish flag and serve as an homage to Denmark's 1986 national team kit.

In Danish football history, 1986 holds special significance. The kit design from that era remains beloved by countless supporters, and Hummel conceived this new release as a mark of respect for that tradition.

The placement and coloring of the pinstripes evoke the classic original while incorporating a modern interpretation through the latest kit manufacturing technology. The result is a design that fuses nostalgia with innovation.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">A Tribute to the 1986 World Cup in Mexico, Elevated Through Design</span>
<p class="analysis-body">The crossed pinstripes graphically represent the cross of the <strong>Danish flag</strong> (Dannebrog) and pay homage to the kits worn during the golden era when Denmark were dubbed "Danish Dynamite" at the 1986 Mexico World Cup. The Danish squad of that era, featuring the likes of Michael Laudrup, reached the Round of 16 on their World Cup debut, and their kit remains hugely popular worldwide to this day. Hummel has carried forward the DNA of its historic designs while introducing cutting-edge materials and manufacturing techniques, condensing heritage and innovation into a single jersey.</p>
</div>

## Debut in the European Playoff Final

The away kit will be worn for the first time in the European Playoff final. The nation's players will take to the pitch dressed in this new design.

Its debut on such a grand stage underscores the high expectations surrounding the kit. In a match of immense importance for Danish football, this historic design could be present as new history is written.

The kit's functional aspects have not been neglected either. It has been engineered using the latest technology to support player performance, delivering both comfort and durability.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">First Worn in the European Playoff Final with a World Cup Spot on the Line</span>
<p class="analysis-body">The new away kit will make its debut in the <strong>European Playoff final</strong>, where a place at the 2026 World Cup is at stake. For Denmark, donning a historically inspired design in such a decisive match is also expected to bolster unity between players and supporters. The kit, reminiscent of the 1986 golden era, could become a witness to new history being made.</p>
</div>

## The Perfect Balance of Tradition and Innovation

Hummel has been producing Denmark's national team kits for many years. It is precisely this track record that has enabled them to honor past designs while elevating them into modern expression.

Careful attention has been paid not only to the design but also to the color scheme. The red and white combination follows the traditional colors of the Danish flag, while subtle tonal adjustments give it a contemporary feel.

The accumulated knowledge from a 47-year partnership has made it possible to honor past masterpieces while elevating them with modern technology. A kit that condenses the memories of 1986 and the challenge of 2026 into a single piece of fabric — that is the essence of Hummel's new creation.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">At the Forefront of the "Retro Kit" Boom — Where Fan Psychology Meets Marketing</span>
<p class="analysis-body">In recent years, "retro designs" paying homage to classic kits have become a global trend in football. <strong>Nike</strong> with the Netherlands, <strong>Adidas</strong> with Germany — manufacturers have accelerated the revival of designs from the 1980s and 1990s. <strong>Hummel</strong>'s Denmark kit rides this wave while earning acclaim for achieving functionality alongside retro aesthetics rather than being a mere replica. Replica kit sales are a vital revenue stream for clubs and federations, and the added value of "wearing history" creates a structure that stimulates fans' desire to purchase.</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>The new <strong>Denmark national team</strong> away kit unveiled by <strong>Hummel</strong> features a design paying tribute to the "Danish Dynamite" era of the 1986 Mexico World Cup. The crossed pinstripes graphically represent the cross of the <strong>Danish flag</strong> (Dannebrog), reviving memories of the golden era when <strong>Michael Laudrup</strong> and others starred, using modern materials and technology. The kit is set to debut in the <strong>European Playoff final</strong> with a World Cup spot on the line, and can be considered a masterpiece born from Hummel and Denmark's 47-year partnership dating back to 1979.</p>
</div>`,
  },
  {
    id: "1774345939003",
    slug: "fifa2026-12dazn-mn4frcqj",
    title: "いよいよ日本の対戦相手が決まる！「FIFAワールドカップ2026 欧州予選プレーオフ」全12試合をDAZNが独占ライブ配信",
    titleEn: "Japan's Opponents Are About to Be Decided! DAZN to Exclusively Stream All 12 FIFA World Cup 2026 European Playoff Matches",
    excerpt: "スポーツ・チャンネル「DAZN（ダゾーン）」は24日、日本時間3月27日（金）と4月1日（水）に行われる「FIFAワールドカップ2026」における日本の対戦相·",
    excerptEn: "Sports streaming service DAZN announced on the 24th that it will exclusively live-stream all matches of the FIFA World Cup 2026 European Playoffs, which will determine Japan's opponents, on March 27 and April 1 (Japan time).",
    category: "日本代表" as const,
    tags: ["サッカーキング"],
    tagsEn: ["Soccer King"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: false,
    sources: [
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
      { name: "DAZN", url: "https://www.dazn.com/ja-JP" },
    ],
    content: `# 日本の次なる敵はこいつだ。W杯欧州予選プレーオフ全12試合、DAZNで独占配信

動画配信サービス「DAZN」が大型企画を打ち出した。2026年FIFAワールドカップの欧州予選プレーオフ全12試合を、独占ライブ配信する。日本代表の進路を左右する重要な試合だけに、視聴環境の整備は急務だ。

## 3月27日と4月1日。運命の決戦が始まる

プレーオフは日本時間3月27日（金）と4月1日（水）にかけて開催される。全12試合の生配信により、日本代表が次のラウンドで対戦する相手が決定する仕組みだ。

欧州勢のしのぎを削る戦いの行方は、日本の今後を大きく左右する。どのチームが勝ち上がるのか。その過程を完全網羅できる環境が整った。

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>欧州PO全12試合をDAZNが独占ライブ配信</strong> — W杯欧州予選プレーオフ全12試合を<strong>DAZN</strong>が独占でライブ配信する。欧州の強豪国がW杯出場をかけてしのぎを削る試合は、日本代表のグループリーグ対戦相手を確定させる重要な局面だ。どの国が勝ち上がるかによって日本の準備方針や戦術プランが大きく変わるため、代表スタッフにとっても貴重な映像資料となる。ファンもリアルタイムで日本の運命を左右する試合を追える環境が整った。</p>
</div>

## 日本代表の運命を左右するプレーオフ

2026年W杯の欧州予選では、グループリーグ2位の国々がプレーオフに回る。ここで勝ち残ったチームが本大会出場権を獲得し、日本代表の対戦相手として北中米W杯の舞台に立つことになる。

日本がすでに突破を決めている以上、次は相手チーム選定が焦眉の課題だ。欧州の強豪がしのぎを削る中、どのチームが勝ち抜けるか。その結果次第で、日本代表の準備方針も大きく変わる。

強豪との対戦を望むのか、相対的に有利な相手との対戦を想定するのか。戦術面での判断材料となる以上、プレーオフの推移は単なる情報ではなく、戦略立案の核となる。

DAZNによる全試合配信は、こうした状況判断を素早く、そして正確に行うために不可欠だ。日本代表スタッフも視聴するであろうこれらの試合から、得られる情報は多い。

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>日本の対戦相手が決まる——プレーオフ結果の戦略的影響</strong> — 欧州予選の各グループ2位が集うプレーオフの結果次第で、日本代表のW杯グループリーグ対戦相手が確定する。どの欧州勢が勝ち上がるかは日本の戦術準備に直結するため、単なる「他地域の試合」ではない。森保ジャパンのスカウティングスタッフにとっても、プレーオフの映像は対策立案の核心的な資料となる。</p>
</div>

## 配信体制の充実は視聴者へのサービス

スポーツ観戦における配信環境の充実は、もはや必須である。DAZNが12試合全てを独占配信する決定は、ユーザーの満足度を高めるだけでなく、日本代表の分析環境も整備する。

相手チームの選定後、日本代表はより詳細な対策を講じなければならない。その際、プレーオフの映像資料がどれだけ揃っているかが、準備の質を左右する。DAZNの配信により、こうした準備面での課題も一つ解消される。

強化試合や本大会への道は、こうした細部の詰めから始まる。配信体制の充実は、まさに現代サッカーにおける「強化体制の一部」と言えるだろう。

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>「配信戦争」の中のDAZN——サッカーコンテンツの覇権争い</strong> — W杯予選の独占配信は、<strong>DAZN</strong>にとって加入者獲得の最大の武器だ。地上波テレビの視聴率が低下する中、スポーツのライブ配信は動画配信サービスにとって最も価値の高いコンテンツとなっている。Jリーグの独占配信権を保持するDAZNが欧州予選プレーオフも押さえたことで、日本のサッカーファンにとって「DAZNなしではサッカーを追えない」環境が一段と強化された。この構造は視聴者の利便性とコスト負担の両面で議論を呼ぶ可能性もある。</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>DAZN</strong>がW杯欧州予選プレーオフ全12試合の独占ライブ配信を発表。日本時間3月27日と4月1日に開催されるプレーオフの結果が、日本代表のW杯グループリーグ対戦相手を確定させる。森保ジャパンのスカウティングにとっても不可欠な映像資料となるこれらの試合を、ファンは漏れなく視聴できる環境が整った。配信体制の充実は、現代サッカーの「強化体制の一部」と言える。</p>
</div>`,
    contentEn: `# Here Come Japan's Next Opponents: All 12 World Cup European Playoff Matches Streaming Exclusively on DAZN

Streaming service DAZN has announced a major initiative: exclusive live coverage of all 12 matches in the 2026 FIFA World Cup European Playoffs. With these being crucial matches that will shape the path of the Japan national team, ensuring viewing access is a pressing priority.

## March 27 and April 1: The Decisive Battles Begin

The playoffs will take place on March 27 (Friday) and April 1 (Wednesday), Japan time. Live coverage of all 12 matches will reveal which teams Japan will face in the next round.

The outcome of these fiercely contested European matches will have a major impact on Japan's future. Which teams will advance? The infrastructure to follow this process in its entirety is now in place.

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>DAZN to Exclusively Live-Stream All 12 European Playoff Matches</strong> — <strong>DAZN</strong> will exclusively live-stream all 12 matches of the World Cup European Qualifying Playoffs. These matches, where European powerhouses battle for World Cup berths, represent a crucial juncture that will determine Japan's group stage opponents. Depending on which nations advance, Japan's preparation strategy and tactical plans could change significantly, making the footage an invaluable resource for the national team staff as well. Fans can now follow in real time the matches that will shape Japan's destiny.</p>
</div>

## The Playoffs That Will Shape Japan's Fate

In the 2026 World Cup European qualifiers, teams finishing second in their groups advance to the playoffs. The winners earn places at the finals and will face Japan on the stage of the North American World Cup.

With Japan having already secured qualification, the next priority is identifying their opponents. As European heavyweights battle it out, the question of which teams advance becomes paramount. The outcome will significantly alter Japan's preparation plans.

Whether hoping for matches against top-tier opponents or anticipating relatively favorable draws, the playoffs' progress is not mere information but the core of strategic planning.

DAZN's full-match coverage is indispensable for making these situational assessments quickly and accurately. The Japan national team staff will surely be watching these matches, from which a wealth of information can be gleaned.

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>Japan's Opponents to Be Determined — The Strategic Impact of Playoff Results</strong> — The playoff results, which bring together the runners-up from each European qualifying group, will determine Japan's World Cup group stage opponents. Which European teams advance directly affects Japan's tactical preparations, making these far more than just "matches from another region." For the scouting staff of Moriyasu's Japan, the playoff footage will be core material for devising countermeasures.</p>
</div>

## Enhanced Streaming Infrastructure Serves the Viewers

Robust streaming infrastructure for sports viewing is now essential. DAZN's decision to exclusively stream all 12 matches not only boosts user satisfaction but also strengthens Japan's analytical capabilities.

After the opponent teams are identified, Japan must devise more detailed countermeasures. The quality of preparation will depend on how much playoff footage is available. DAZN's coverage resolves one such challenge in the preparation process.

The road to friendlies and the finals begins with attention to these details. Enhanced streaming infrastructure is truly "part of the team development system" in modern football.

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>DAZN in the "Streaming Wars" — The Battle for Football Content Supremacy</strong> — Exclusive World Cup qualifying coverage is <strong>DAZN</strong>'s most powerful tool for acquiring subscribers. As traditional TV viewership declines, live sports streaming has become the most valuable content for streaming services. With DAZN already holding exclusive J.League broadcasting rights and now securing the European Qualifying Playoffs, the environment where Japanese football fans "cannot follow football without DAZN" has been further reinforced. This structure may spark debate regarding both viewer convenience and cost burden.</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>DAZN</strong> has announced exclusive live coverage of all 12 World Cup European Qualifying Playoff matches. The playoff results, taking place on March 27 and April 1 (Japan time), will determine Japan's World Cup group stage opponents. These matches, which will also serve as indispensable scouting material for Moriyasu's Japan, can now be viewed in full by fans. Enhanced streaming infrastructure can be considered "part of the team development system" in modern football.</p>
</div>`,
  },
  {
    id: "1774342208751",
    slug: "dentsu-japan-broadcast-rights-2027-2030-fc",
    title: "サッカー日本代表の放送・配信権を｢電通｣が取得！ JFAと2027〜2030年まで基本合意。なでしこジャパンなどの試合も中継へ",
    titleEn: "Dentsu Acquires Japan National Team Broadcasting and Streaming Rights! Basic Agreement Reached with JFA Through 2027-2030, Including Nadeshiko Japan Matches",
    excerpt: "株式会社電通は24日、日本サッカー協会（JFA）と「サッカー日本代表放送権（2027年～2030年）」契約について基本合意に達したことを発表した。これにより、契",
    excerptEn: "Dentsu Inc. announced on the 24th that it has reached a basic agreement with the Japan Football Association (JFA) on a contract for Japan national team broadcasting rights from 2027 to 2030. This agreement covers broadcasting of matches including Nadeshiko Japan.",
    category: "日本代表" as const,
    tags: ["フットボールチャンネル"],
    tagsEn: ["Football Channel"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: false,
    sources: [
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
      { name: "DAZN", url: "https://www.dazn.com/ja-JP" },
    ],
    content: `## 電通が日本代表の放送権を獲得

株式会社電通は3月24日、日本サッカー協会（JFA）との間で大型契約の基本合意を発表した。対象は2027年から2030年までの4年間。サッカー日本代表の放送・配信権を一手に担うことになる。

この契約により、国内開催試合の地上波放送が実現する。U-23日本代表も対象だ。なでしこジャパンら女子代表の試合も中継される予定。電通がメディア戦略の中核を握ることで、より多くの国民がナショナルチームの活動を観戦できる環境が整備される。

放送・配信の具体的な内容については、今後の詳細協議で詰められるという段階。電通とJFAは基本合意後、詳細契約に向けた協議を進める方針だ。

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>4年間の放送権を一括取得——2026年W杯後の新サイクル</strong> — <strong>電通</strong>が<strong>2027年～2030年</strong>のサッカー日本代表試合の放送・配信権を一括取得した。この4年間には次期W杯予選とオリンピックが含まれる重要な期間だ。放映権の安定確保はJFAの財政基盤強化にも直結し、育成環境やクラブ支援へのリソース配分を左右する。地上波放送の実現により、日本全国のファンが日本代表の戦いを追える環境が整う。</p>
</div>

## 女子代表も視野に

対象範囲は男子代表にとどまらない。なでしこジャパンを含む女子代表の試合も配信対象となる予定だ。近年、女子サッカーの人気上昇に伴い、メディア露出の拡大は急務とされていた。電通の参入によって、その課題解決が前進する。

U-23日本代表の国内開催試合についても、地上波放送の実現が目指される。若い世代の成長過程を国民が応援できる体制が構築されることになる。

放送業界では大型スポーツコンテンツの争奪が激化している。日本代表は視聴率の獲得が確実な素材だ。電通が獲得したことで、今後のメディア展開がどう変わるか注視する必要がある。

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>なでしこジャパン・U-23代表も中継対象に</strong> — <strong>なでしこジャパン</strong>を含む女子代表、さらに<strong>U-23日本代表</strong>の国内開催試合も放送対象に含まれる。近年の女子サッカー人気の高まりを受け、メディア露出の拡大は急務とされていた。若い世代が日本代表として成長する過程を国民がリアルタイムで追える環境が構築されることで、サッカー人気の底上げと次世代ファン層の開拓が期待される。</p>
</div>

## 詳細協議が進む

基本合意の発表にとどまり、正式な契約締結はこれからだ。両者は詳細な放送・配信内容について協議を続ける。放送時間帯、配信プラットフォーム、放映権の分配など、詰めるべき項目は多い。

2027年の開始まで、まだ時間がある。この期間を活用して、より充実した放送体制を築くべく、電通とJFAが緻密な検討を重ねるわけだ。スポーツ放送の在り方も急速に変化している。デジタル配信の強化も視野に入った協議になるだろう。

契約内容がどう落ち着くかで、サッカー日本代表の国内での認知度・応援体制が大きく変わる可能性がある。今後の動きが重要だ。

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>放映権料の行方——JFAの財政基盤と育成投資への影響</strong> — サッカー日本代表の放映権料は、<strong>JFA</strong>の財政基盤を支える最大の収益源の一つだ。この契約規模がどの程度になるかは、国内のクラブ支援、育成環境整備、指導者養成へのリソース配分に直結する。2026年W杯での結果次第では日本代表のコンテンツ価値がさらに上昇し、2027年以降の放映権料にも影響を与える。<strong>電通</strong>との4年間の契約は、単なるメディア戦略にとどまらず、日本サッカー全体の成長戦略と密接に結びついている。</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>電通</strong>が<strong>JFA</strong>と基本合意し、2027年～2030年のサッカー日本代表放送・配信権を取得した。対象は男子A代表に加え、<strong>なでしこジャパン</strong>や<strong>U-23代表</strong>の国内開催試合も含まれ、地上波放送の実現が目指される。放映権料はJFAの財政基盤を支える最大の収益源であり、国内の育成環境やクラブ支援への投資に直結する重要な契約だ。正式契約に向けた詳細協議がこれから進められる。</p>
</div>`,
  },
  {
    id: "1",
    slug: "japan-2026-uk-tour",
    title: "【完全版】日本代表3月招集メンバー28人発表｜W杯前最後の試金石、冨安復帰・塩貝初招集の意味",
    titleEn: "Japan's 28-Man Squad for March UK Tour Announced: Tomiyasu Returns, Shiogai Earns First Call-Up Ahead of World Cup",
    excerpt: "3月19日、JFAが発表した28人のメンバーを徹底分析。約1年9ヶ月ぶり復帰の冨安健洋、初招集の塩貝健人ら注目選手の選考背景を解説。",
    excerptEn: "A deep dive into the 28-man squad announced by the JFA on March 19. We break down the selection rationale behind Takehiro Tomiyasu's return after 21 months and Kento Shiogai's surprise first call-up.",
    category: "日本代表",
    tags: ["冨安健洋", "塩貝健人", "イギリス遠征", "スコットランド", "イングランド", "森保一", "W杯2026"],
    tagsEn: ["Takehiro Tomiyasu", "Kento Shiogai", "UK Tour", "Scotland", "England", "Hajime Moriyasu", "World Cup 2026"],
    publishedAt: "2026-03-22",
    updatedAt: "2026-03-22",
    isPopular: true,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
    ],
    content: `## 森保ジャパン、W杯前最後のイギリス遠征メンバー28名を発表

3月19日、日本サッカー協会（JFA）は2026年FIFAワールドカップ前最後の強化活動となるイギリス遠征の招集メンバー28名を発表した。

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>冨安健洋、約1年9ヶ月ぶりの"待望の復帰"</strong> — 最大のサプライズは、<strong>冨安健洋</strong>（アヤックス）の代表復帰だ。2025年にアーセナルからアヤックスへ移籍し、コンスタントに出場機会を得てきた冨安が、2024年6月以来約1年9ヶ月ぶりにサムライブルーのユニフォームに袖を通す。森保一監督は「冨安の経験値と対人守備の強さは替えが利かない。W杯本番を見据えて、チームに組み込む時間を確保したかった」とコメント。</p>
</div>

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>塩貝健人、20歳での"サプライズ初招集"——森保監督が見た「チャレンジ精神」</strong> — もう一つの話題が、ヴォルフスブルク所属の<strong>塩貝健人</strong>（20歳）の初招集だ。森保監督は「W杯に向けて、1%でも勝つ可能性を上げていくという意味で招集した。チャレンジして舞台を変えてステップアップしているところを評価した」と語った。W杯直前のこの時期に初招集された意味は重い。</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>伊藤洋輝もバイエルンから約1年ぶりに復帰</strong> — <strong>伊藤洋輝</strong>（バイエルン・ミュンヘン）も復帰組。左利きのCBとしてブンデスリーガ王者で定位置を確保し、約1年3ヶ月ぶりの代表復帰となった。冨安とのCBコンビは、W杯本番での守備の柱となる可能性がある。</p>
</div>

## 招集外の主力選手

一方で、以下の主力が招集外となった：

<div class="absent-list">
  <div class="absent-item">
    <span class="absent-name">遠藤航</span>
    <span class="absent-club">リバプール</span>
    <span class="absent-reason">コンディション調整</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">久保建英</span>
    <span class="absent-club">レアル・ソシエダ</span>
    <span class="absent-reason">怪我</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">南野拓実</span>
    <span class="absent-club">モナコ</span>
    <span class="absent-reason">コンディション面</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">守田英正</span>
    <span class="absent-club">スポルティングCP</span>
    <span class="absent-reason">コンディション調整</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">板倉滉</span>
    <span class="absent-club">ボルシアMG</span>
    <span class="absent-reason">選外</span>
  </div>
</div>

## 対戦スケジュール

| 日時 | 対戦相手 | 会場 |
|------|---------|------|
| 3月28日（土）17:00（現地）/ 29日 2:00（日本時間） | スコットランド | ハムデン・パーク（グラスゴー） |
| 3月31日（月）19:45（現地）/ 4月1日 3:45（日本時間） | イングランド | ウェンブリー・スタジアム（ロンドン） |

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>W杯本番まで約3ヶ月。この遠征が実質的なW杯メンバー選考の最終テストとなる見通しだ。欧州トップレベルの2チームとのアウェー連戦は、チーム力を測る絶好の機会となるだろう。冨安・伊藤洋輝の復帰組がチームにどう組み込まれるか、塩貝がA代表の舞台でもゴールへの嗅覚を発揮できるか——注目ポイントは尽きない。</p>
</div>`,
    contentEn: `## Moriyasu's Japan Announce 28-Man Squad for Final UK Tour Before the World Cup

On March 19, the Japan Football Association (JFA) announced the 28-man squad for the UK tour, Japan's final preparation camp before the 2026 FIFA World Cup.

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>Takehiro Tomiyasu: A Long-Awaited Return After 21 Months</strong> — The biggest surprise was the international recall of <strong>Takehiro Tomiyasu</strong> (Ajax). Having moved from Arsenal to Ajax in 2025 and earned consistent playing time, Tomiyasu will wear the Samurai Blue shirt for the first time since June 2024 — a gap of roughly 21 months. Manager Hajime Moriyasu commented: "Tomiyasu's experience and strength in one-on-one defending are irreplaceable. With the World Cup in mind, I wanted to secure time to integrate him into the team."</p>
</div>

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>Kento Shiogai: A Surprise First Call-Up at 20 — Moriyasu Sees a "Challenger's Spirit"</strong> — The other headline was the first senior call-up of <strong>Kento Shiogai</strong> (20), who plays for VfL Wolfsburg. Manager Moriyasu explained: "I called him up to raise our chances of winning by even 1%. I valued the way he has challenged himself by changing environments and stepping up." The significance of a first call-up at this late stage before the World Cup cannot be overstated.</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>Hiroki Ito Also Returns from Bayern After About a Year</strong> — <strong>Hiroki Ito</strong> (Bayern Munich) is another returning player. The left-footed centre-back has cemented a starting spot at the Bundesliga champions and returns to the national team after roughly 15 months. A centre-back partnership with Tomiyasu could form the defensive spine at the World Cup.</p>
</div>

## Key Absentees

Meanwhile, the following regulars were left out of the squad:

<div class="absent-list">
  <div class="absent-item">
    <span class="absent-name">Wataru Endo</span>
    <span class="absent-club">Liverpool</span>
    <span class="absent-reason">Fitness management</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">Takefusa Kubo</span>
    <span class="absent-club">Real Sociedad</span>
    <span class="absent-reason">Injury</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">Takumi Minamino</span>
    <span class="absent-club">Monaco</span>
    <span class="absent-reason">Fitness concerns</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">Hidemasa Morita</span>
    <span class="absent-club">Sporting CP</span>
    <span class="absent-reason">Fitness management</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">Ko Itakura</span>
    <span class="absent-club">Borussia MG</span>
    <span class="absent-reason">Not selected</span>
  </div>
</div>

## Match Schedule

| Date & Time | Opponent | Venue |
|------|---------|------|
| Sat 28 March, 17:00 (local) / Sun 29 March, 02:00 (JST) | Scotland | Hampden Park (Glasgow) |
| Mon 31 March, 19:45 (local) / Tue 1 April, 03:45 (JST) | England | Wembley Stadium (London) |

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>With roughly three months until the World Cup, this tour is expected to serve as the final selection trial for the tournament squad. Back-to-back away matches against two of Europe's top teams offer an ideal opportunity to gauge the team's strength. How the returning players Tomiyasu and Ito will be integrated, and whether Shiogai can demonstrate his goal-scoring instincts on the senior international stage — there is no shortage of talking points.</p>
</div>`,
  },
  {
    id: "2",
    slug: "shiogai-kento-story",
    title: "無名の高校生から、欧州を震わせる20歳へ——塩貝健人という物語",
    titleEn: "From Unknown High Schooler to a 20-Year-Old Shaking Up Europe — The Kento Shiogai Story",
    excerpt: "ユース昇格を逃した少年が、移籍金18.5億円でブンデスリーガへ。そして日本代表初招集。塩貝健人、20年間の物語。",
    excerptEn: "A boy who failed to make a youth academy rose to the Bundesliga in a transfer worth 1.85 billion yen, then earned his first Japan call-up. The story of Kento Shiogai's 20 years.",
    category: "日本代表",
    tags: ["塩貝健人", "ヴォルフスブルク", "ブンデスリーガ", "日本代表", "W杯2026", "NECナイメヘン"],
    tagsEn: ["Kento Shiogai", "VfL Wolfsburg", "Bundesliga", "Japan National Team", "World Cup 2026", "NEC Nijmegen"],
    publishedAt: "2026-03-22",
    updatedAt: "2026-03-22",
    isPopular: true,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `## 「ユース昇格できなかった少年」が夢を諦めなかった

2005年3月26日、東京都に生まれた塩貝健人は、幼少期からボールを蹴り続けた。バディSC江東でサッカーの基礎を学び、横浜FCジュニアユースへ進んだ。ここで彼は最初の挫折を経験する。中学卒業時、横浜FCユースへの昇格を果たせなかったのだ。

多くの選手がそこで夢を諦める。しかし塩貝は違った。國學院久我山高校へ進学した彼は、高校サッカーの舞台で静かに数字を叩き出した。シーズン通算では公式戦14試合出場・9ゴール。ヨーロッパのスカウトたちは見逃さなかった。

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>塩貝 健人（しおがい けんと）</td></tr>
    <tr><th>生年月日</th><td>2005年3月26日（21歳）</td></tr>
    <tr><th>出身地</th><td>東京都</td></tr>
    <tr><th>身長</th><td>175cm（推定）</td></tr>
    <tr><th>ポジション</th><td>FW（左ウィング/セカンドトップ）</td></tr>
    <tr><th>現所属</th><td>VfLヴォルフスブルク（ブンデスリーガ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 2026年3月初招集</td></tr>
  </tbody>
</table>

## 移籍金18.5億円——20歳以下日本人史上最高額でブンデスへ

2026年1月20日、VfLヴォルフスブルクへの移籍が決定。移籍金は推定1000万ユーロ（約18.5億円）。20歳以下の日本人選手としては史上最高額だ。背番号は「7」。かつて長谷部誠がプレーしたクラブで、塩貝健人は新たな歴史を刻もうとしていた。

<div class="quote-box">
<span class="quote-label">EDITOR'S NOTE</span>
<p class="quote-body"><strong>横浜FCユース不合格→高校サッカー→欧州——異色のキャリアパス</strong> — Jクラブのユース昇格を逃した選手が、高校サッカーを経てオランダへ渡り、わずか数年で<strong>ブンデスリーガ</strong>のクラブに移籍金18.5億円で引き抜かれる。<strong>塩貝健人</strong>のキャリアパスは、日本サッカーの育成ルートの多様性を証明している。プロユース出身でなくとも世界の舞台に立てるという事実は、全国の高校サッカー選手たちに希望を与える。</p>
</div>

## 「あとはゴールだけ」——ブンデスでの葛藤と本音

移籍後、塩貝はGoal.comの取材でこう語った。「一回も招集歴がないので、もう誰も文句が言えないぐらい結果を残さないといけない。同世代の選手が何人も（日本代表に）入っていて、すごく悔しさや焦りはあります。でも、自分も結果は出してきた。本当に、あとはゴールだけだと思っています」。

その言葉どおり、塩貝はブンデスリーガの舞台でゴールを積み重ねていった。

<div class="quote-box">
<span class="quote-label">CONTEXT</span>
<p class="quote-body"><strong>NECでの「途中出場2桁得点」——即戦力の証明</strong> — オランダの<strong>NECナイメーヘン</strong>時代、塩貝は途中出場のみでリーグ2桁得点という前代未聞の記録を打ち立てた。先発ではなく限られた出場時間の中でこれだけの結果を出せるのは、「即座にギアを上げられる」能力の証明だ。W杯のような大舞台では後半の選手交代が試合を決定的に左右する。塩貝はまさに「スーパーサブ」として理想的な適性を持つ選手だ。</p>
</div>

## そして、代表の扉が開いた

2026年3月19日、JFAが発表したイギリス遠征メンバー28名の中に、塩貝健人の名前があった。A代表初招集。ユース昇格を逃し、高校サッカーから這い上がり、オランダを経てドイツへ渡った21歳の青年が、ついにサムライブルーの一員となった。

森保一監督は「塩貝はゴール前での嗅覚が際立っている。年齢は関係ない。結果を出している選手を呼ぶのは当然のこと」とコメントした。

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>W杯直前のサプライズ招集——森保監督が見た「1%の可能性」</strong> — W杯本番まで約3カ月というタイミングでの初招集は異例だ。<strong>森保一監督</strong>は「W杯に向けて1%でも勝つ可能性を上げていく」と語った。裏を返せば、塩貝のゴールへの嗅覚が、既存メンバーにはない「上積み」になると判断したことを意味する。スコットランド戦・イングランド戦で結果を出せば、W杯本大会メンバー入りは現実味を帯びてくる。</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>塩貝健人</strong>は横浜FCユース昇格を逃した挫折を経て、<strong>國學院久我山高校</strong>から欧州へ渡ったストライカーだ。オランダの<strong>NECナイメーヘン</strong>で途中出場のみのリーグ2桁得点という前代未聞の記録を打ち立て、2026年1月に移籍金18.5億円で<strong>VfLヴォルフスブルク</strong>へ移籍。20歳以下の日本人選手として史上最高額の移籍を実現した。3月にはA代表初招集を果たし、W杯本番でのサプライズ起用も視野に入る。夢を諦めなかった21歳の物語は、まだ始まったばかりだ。</p>
</div>`,
    contentEn: `## The Boy Who Refused to Give Up After Missing Youth Promotion

Born on March 26, 2005, in Tokyo, Kento Shiogai had been kicking a ball for as long as he could remember. He learned the fundamentals at Buddy SC Koto before joining Yokohama FC's junior youth team. It was there that he encountered his first setback: upon graduating from junior high school, he failed to earn promotion to the Yokohama FC youth squad.

Many players would have given up on their dream at that point. But Shiogai was different. After enrolling at Kokugakuin Kugayama High School, he quietly put up impressive numbers on the high school football stage, tallying 9 goals in 14 official matches across the season. European scouts took notice.

<table class="profile-table">
  <tbody>
    <tr><th>Name</th><td>Kento Shiogai</td></tr>
    <tr><th>Date of Birth</th><td>March 26, 2005 (age 21)</td></tr>
    <tr><th>Birthplace</th><td>Tokyo</td></tr>
    <tr><th>Height</th><td>175cm (estimated)</td></tr>
    <tr><th>Position</th><td>FW (Left Winger / Second Striker)</td></tr>
    <tr><th>Current Club</th><td>VfL Wolfsburg (Bundesliga)</td></tr>
    <tr><th>International Career</th><td>Japan, first call-up March 2026</td></tr>
  </tbody>
</table>

## A Record-Breaking 1.85 Billion Yen Transfer to the Bundesliga at Age 20

On January 20, 2026, Shiogai's move to VfL Wolfsburg was confirmed. The reported transfer fee of 10 million euros (approximately 1.85 billion yen) set a new record as the highest ever for a Japanese player under the age of 20. He was handed the number 7 shirt. At the same club where Makoto Hasebe once played, Shiogai was poised to write a new chapter of history.

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">Rejected by Yokohama FC Youth, Then High School Football, Then Europe — An Unconventional Career Path</span>
<p class="point-body">A player who missed out on J-League youth promotion went through high school football, crossed to the Netherlands, and within just a few years was signed by a <strong>Bundesliga</strong> club for 1.85 billion yen. <strong>Kento Shiogai</strong>'s career path is proof of the diversity of development routes in Japanese football. The fact that a player can reach the world stage without coming through a professional youth academy offers hope to high school footballers across the country.</p>
</div>

## "All That's Left Is Goals" — Struggles and Honest Words in the Bundesliga

After his transfer, Shiogai told Goal.com: "I have never been called up, so I need to produce results so undeniable that nobody can argue against it. Seeing players my age getting into the national team is incredibly frustrating and I feel the pressure. But I have been producing results too. Honestly, I think all that is left now is goals."

True to his word, Shiogai went on to rack up goals on the Bundesliga stage.

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">Double-Digit Goals as a Substitute at NEC — Proof of Instant Impact</span>
<p class="point-body">During his time at <strong>NEC Nijmegen</strong> in the Netherlands, Shiogai achieved the unprecedented feat of reaching double-digit league goals exclusively as a substitute. Delivering that level of output from limited minutes is proof of his ability to shift into top gear instantly. In major tournaments like the World Cup, second-half substitutions can decisively swing a match. Shiogai possesses the ideal attributes of a super sub.</p>
</div>

## Then the Door to the National Team Opened

On March 19, 2026, Kento Shiogai's name appeared among the 28-man squad announced by the JFA for the UK tour. A first senior call-up. The 21-year-old who had been rejected from youth promotion, fought his way up through high school football, crossed to the Netherlands, and then moved on to Germany had finally become a member of the Samurai Blue.

Manager Hajime Moriyasu commented: "Shiogai has outstanding instincts in front of goal. Age is irrelevant. It is only natural to call up players who are producing results."

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">A Surprise Call-Up Just Before the World Cup — Moriyasu Sees That Extra 1 Percent</span>
<p class="point-body">A first call-up with roughly three months to go before the World Cup is highly unusual. Manager <strong>Hajime Moriyasu</strong> said he wanted to raise the team's chances of winning by even 1 percent. Read another way, this means he judged that Shiogai's nose for goal offers something the existing squad members cannot. If Shiogai delivers against Scotland and England, a place in the World Cup squad becomes a very real prospect.</p>
</div>

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>Kento Shiogai</strong> is a striker who overcame the setback of missing out on Yokohama FC's youth promotion and headed to Europe from <strong>Kokugakuin Kugayama High School</strong>. At <strong>NEC Nijmegen</strong> in the Netherlands, he set an unprecedented record of double-digit league goals solely as a substitute, then moved to <strong>VfL Wolfsburg</strong> in January 2026 for 1.85 billion yen, the highest transfer fee ever for a Japanese player under 20. In March, he earned his first senior call-up, and a surprise World Cup selection is now within sight. The story of this 21-year-old who refused to give up on his dream is only just beginning.</p>
</div>`,
  },
  {
    id: "3",
    slug: "tomiyasu-takehiro-profile",
    title: "不屈の男が帰ってきた——冨安健洋という、終わらないストーリー",
    titleEn: "The Indomitable Man Returns — The Never-Ending Story of Takehiro Tomiyasu",
    excerpt: "福岡の路地を走り回っていた少年が、アーセナルのスタジアムを沸かせ、そして怪我という試練を乗り越え、再び日本代表へ——冨安健洋の27年間を紐解く。",
    excerptEn: "A boy who sprinted through the alleys of Fukuoka went on to electrify the Emirates, overcame the trials of injury, and returned to the Japan national team — tracing the 27-year journey of Takehiro Tomiyasu.",
    category: "選手紹介",
    tags: ["冨安健洋", "日本代表", "アヤックス", "アーセナル", "W杯2026"],
    tagsEn: ["Takehiro Tomiyasu", "Japan National Team", "Ajax", "Arsenal", "World Cup 2026"],
    publishedAt: "2026-03-23",
    updatedAt: "2026-03-23",
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `福岡市博多区。住宅街のマンション通路を、一人の少年がとてつもないスピードで駆け抜けていた。それを偶然目撃したのが、地元の少年サッカーチーム「三筑キッカーズ」の総監督だった。

「あの子をチームに入れてくれないか」

その一言が、冨安健洋（27）のサッカー人生を動かした最初の歯車だった。

## プロフィール

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>冨安 健洋（とみやす たけひろ）</td></tr>
    <tr><th>生年月日</th><td>1998年11月5日（27歳）</td></tr>
    <tr><th>出身地</th><td>福岡県福岡市博多区</td></tr>
    <tr><th>身長/体重</th><td>188cm / 78kg</td></tr>
    <tr><th>ポジション</th><td>DF（CB/SB/MF）</td></tr>
    <tr><th>現所属</th><td>アヤックス（オランダ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表42試合1得点（2018年〜）</td></tr>
  </tbody>
</table>

## バルセロナスクールで磨かれた素質

11歳のとき、冨安は福岡に開校したばかりのバルセロナスクールに入会する。そこでのコーチは彼をFCバルセロナ本体に推薦するほど才能を評価したが、小学生を単身スペインに送ることは叶わなかった。

それでもその経験は確かに実を結ぶ。中学生でアビスパ福岡の下部組織に入り、ジュニアユース3学年すべてでキャプテンを務めた。中学3年のとき、すでにトップチームの練習に飛び級参加するほどの存在感を放っていた。

2015年、高校2年でアビスパ福岡にプロ登録。同年10月の天皇杯で公式戦デビューを果たし、翌2016年にはJ1の舞台に立った。高校3年でのプロ契約——その事実だけで、この選手の規格外ぶりが伝わる。

## ヨーロッパへの道：ベルギー、イタリアを経てアーセナルへ

2018年夏、ベルギー1部のシント・トロイデンに移籍。27試合に出場し、欧州の水に馴染んでいく。

そして2019年夏、セリエAのボローニャへ移籍。イタリアの地でその名声は急速に高まった。「ヨーロッパのワンダーキッド トップ20」では、当時新星として話題になっていたサンチョやエムバペらと並んで10位にランクイン。20歳そこそこの日本人DFが、世界の注目を集め始めていた。

2020年には左足のミドルシュートでセリエA初得点を記録。イタリアの名物記者はこう絶賛した——「冨安は黄金の選手。監督にとってなくてはならない男だ」。

## アーセナル時代：栄光と試練

2021年夏、プレミアリーグの名門アーセナルへ移籍。チームは3連敗中という危機的状況だったが、冨安は右サイドバックの定位置を即座に確保し守備を立て直した。4シーズンで公式戦84試合に出場し、確固たる地位を築いた。

しかし度重なる怪我がキャリアに影を落とす。特に2023年以降は膝の負傷で長期離脱を繰り返し、2024-25シーズンは出場機会が大幅に減少。最終的に双方合意のもとアーセナルとの契約を解除した。

「プレミアに戻るチャンスもあると思っている」

退団後もそう語っていた冨安の言葉に、諦めの色はなかった。

## アヤックスで「再出発」——そして代表復帰へ

5カ月に及ぶ無所属期間を経て、2025年12月、オランダの名門アヤックスと今季終了までの短期契約を結んだ。決断の後押しとなったのは、アーセナルの元チームメイトであるオランダ代表のユリエン・ティンバーのアドバイスと、日本代表の盟友・板倉滉がすでに所属していたことだった。

「アヤックスと話したとき、クラブが自分を信じてくれていると感じた」

2026年2月1日、エクセルシオール戦で後半35分から途中出場。484日ぶりの公式戦復帰だった。3月14日のスパルタ・ロッテルダム戦では加入後初先発を果たした。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">484日ぶりの復帰——チームの守備に欠かせないピース</span>
<p class="point-body">アーセナルで4シーズンにわたりチームの守備に多大な貢献を示した男が、北中米でも再びそのピースになろうとしている。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">CB・SB・ボランチをこなすユーティリティ性が最大の武器</span>
<p class="point-body">身長188cmながら俊足を誇り、センターバック・サイドバック・守備的ミッドフィールダーをハイレベルでこなせる。相手のポジションに応じて最適なポジションに入れる「万能型DF」は、多様な戦術を駆使する森保ジャパンにとって替えの利かない存在だ。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">「この決断をしてよかったと思えるように」——不屈のメンタリティ</span>
<p class="point-body">アーセナルを退団し、無所属期間を経てアヤックスへ。その決断を自ら正解にするべく、冨安は今もピッチで証明し続けている。W杯本番まで3カ月、コンディションを上げながら日本代表の守備の中心を担う覚悟は揺るぎない。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>年度</th><th>所属クラブ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2016-18</td><td>アビスパ福岡（J1/J2）</td><td>45試合</td><td>1得点</td></tr>
    <tr><td>2018-19</td><td>シント・トロイデン（ベルギー）</td><td>27試合</td><td>1得点</td></tr>
    <tr><td>2019-21</td><td>ボローニャ（イタリア）</td><td>61試合</td><td>3得点</td></tr>
    <tr><td>2021-25</td><td>アーセナル（イングランド）</td><td>84試合</td><td>2得点</td></tr>
    <tr><td>2025-26</td><td>アヤックス（オランダ）</td><td>復帰中</td><td>-</td></tr>
  </tbody>
</table>

---

福岡の路地を駆け抜けた少年は、世界中の試練をくぐり抜け、今また走り続けている。W杯本番まで、残り3カ月。冨安健洋の物語は、まだ終わっていない。

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>福岡市博多区出身の<strong>冨安健洋</strong>は、<strong>アビスパ福岡</strong>で高校2年からプロ登録され、<strong>シント・トロイデン</strong>、<strong>ボローニャ</strong>を経て<strong>アーセナル</strong>へ移籍。プレミアリーグ4シーズンで84試合に出場したが、度重なる怪我で2025年に退団。5カ月の無所属期間を経て<strong>アヤックス</strong>で再起し、484日ぶりの公式戦復帰を果たした。CB・SB・ボランチをハイレベルでこなすユーティリティ性は森保ジャパンにとって替えが利かない武器であり、2026年W杯の守備の柱として期待される。</p>
</div>`,
  },
  {
    id: "4",
    slug: "mitoma-kaoru-profile",
    title: "「ボールの置きどころ」が世界を変えた——三笘薫という、芸術家の軌跡",
    titleEn: "Where He Places the Ball Changed the World — The Artistic Journey of Kaoru Mitoma",
    excerpt: "筑波大からJリーグを経て、プレミアリーグへ。日本人初の2桁ゴールを刻んだ左の魔法使いが、北中米W杯で日本を勝利へ導く。",
    excerptEn: "From the University of Tsukuba through the J-League to the Premier League. The left-footed magician who became the first Japanese player to score double-digit goals in the Premier League aims to lead Japan to victory at the 2026 World Cup.",
    category: "選手紹介",
    tags: ["三笘薫", "日本代表", "ブライトン", "プレミアリーグ", "W杯2026"],
    tagsEn: ["Kaoru Mitoma", "Japan National Team", "Brighton", "Premier League", "World Cup 2026"],
    publishedAt: "2026-03-23",
    updatedAt: "2026-03-23",
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `「常に自分の置きどころにボールを置くことを大切にしています」

三笘薫（28）はドリブルの秘訣をそう語る。その「置きどころ」とは右足のつま先の真ん中——たった数センチの話なのに、それが世界屈指のDFたちを翻弄し続けている。

## プロフィール

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>三笘 薫（みとま かおる）</td></tr>
    <tr><th>生年月日</th><td>1997年5月20日（28歳）</td></tr>
    <tr><th>出身地</th><td>神奈川県川崎市</td></tr>
    <tr><th>身長</th><td>178cm</td></tr>
    <tr><th>ポジション</th><td>MF/FW（左ウィング）</td></tr>
    <tr><th>現所属</th><td>ブライトン（イングランド）</td></tr>
    <tr><th>代表歴</th><td>日本代表 A代表38試合9得点（2021年〜）</td></tr>
  </tbody>
</table>

## 川崎で花開いた才能

三笘の原点は川崎フロンターレだ。小学校の卒業文集に「憧れの選手は中村憲剛」と書いた少年は、川崎の下部組織で育ち、高校3年次にはトップチームへの昇格を打診された。しかし彼が選んだのは、筑波大学への進学だった。

大学2年次に天皇杯でベガルタ仙台から2得点を挙げ、ユニバーシアードでは全日本大学選抜の一員として金メダルを獲得。充実した4年間を経て2020年、満を持して川崎フロンターレに加入した。

プロ1年目の結果は衝撃的だった。J1リーグ新人記録となる13ゴールを記録し、チームをJ1優勝へと導く。翌2021年の東京五輪3位決定戦・メキシコ戦では鮮やかなドリブル突破からゴールを決めた。その直後、ブライトンへの移籍が発表された。

## プレミアへの道：ベルギーで磨いた牙

イギリスの労働許可証の関係でベルギーのロイヤル・ユニオン・サン＝ジロワーズへ期限付き移籍した三笘は、1年間でリーグ27試合に出場し7得点を記録する。

特筆すべきはカップ戦での活躍だ。2点ビハインドかつ数的不利の状況でハットトリックを達成し、チームを逆転勝利へと導いた。そのメンタルの強さは、その後のプレミアリーグでさらに輝くことになる。

## ブライトンでの衝撃：日本人の限界を塗り替えた

2022年夏にブライトンへ復帰した三笘は、プレミアリーグで次々と歴史を刻んでいく。

2022-23シーズンには7ゴールを挙げ、日本人選手のプレミアリーグ1シーズン最多得点記録を更新。翌シーズンにはウルヴァーハンプトン戦で4人のDFを個人で抜き去って決めたゴールが、日本人初のプレミアリーグ月間最優秀ゴールに選出された。2024-25シーズンにはリーグ10得点を達成し、日本人初のプレミアリーグ2桁得点者となった。

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">筑波大学で「ドリブル」を研究した異色のアスリート</span>
<p class="point-body">「なぜドリブルは抜けるのか」——筑波大学で自らのプレーを学術的に分析した三笘。感覚だけに頼らず、科学的にプレーを言語化できることが、彼の進化を支え続けている。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">世界最高峰のドリブラーが誇る「縦への推進力」</span>
<p class="point-body">2025-26シーズン、三笘は今季プレミアリーグ3番目の最速選手に選出されるデータも記録。1対1で仕掛けて縦に突破し、右足アウトサイドで正確なクロスを送るプレーは「芸術の域」と評される。ブライトンの指揮官も「日本の若手のロールモデルだ」と最大限の賛辞を贈った。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">W杯3カ月前に怪我から復帰——左サイドの絶対的エース</span>
<p class="point-body">2026年3月のアーセナル戦で左足首を痛めるアクシデントがあったものの、指揮官は「大きな怪我ではない」とコメント。3月のイギリス遠征には無事招集され、W杯本番に向けてコンディションを整えている。日本代表左サイドの核として、三笘の存在感は絶対だ。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>年度</th><th>所属クラブ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2020-21</td><td>川崎フロンターレ（J1）</td><td>31試合</td><td>13得点</td></tr>
    <tr><td>2021-22</td><td>ユニオンSG（ベルギー）</td><td>27試合</td><td>7得点</td></tr>
    <tr><td>2022-23</td><td>ブライトン（イングランド）</td><td>29試合</td><td>7得点</td></tr>
    <tr><td>2023-24</td><td>ブライトン（イングランド）</td><td>31試合</td><td>8得点</td></tr>
    <tr><td>2024-25</td><td>ブライトン（イングランド）</td><td>36試合</td><td>10得点</td></tr>
    <tr><td>2025-26</td><td>ブライトン（イングランド）</td><td>出場中</td><td>-</td></tr>
  </tbody>
</table>

---

川崎の少年が中村憲剛に憧れた日から、十数年が経った。今や三笘薫自身が、無数の子どもたちの「憧れの選手」になっている。2026年北中米W杯——その舞台で三笘がどんな軌跡を描くか、世界中のサッカーファンが注目している。

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>神奈川県川崎市出身の<strong>三笘薫</strong>は、<strong>筑波大学</strong>で自らのドリブルを学術的に研究し、<strong>川崎フロンターレ</strong>でJ1新人記録13ゴールを記録した後、<strong>ブライトン</strong>へ移籍。プレミアリーグで日本人初の2桁得点を達成し、月間最優秀ゴールにも選出された。日本代表ではA代表38試合9得点を記録し、左サイドの絶対的エースとして君臨する。「ボールの置きどころ」にこだわる芸術的なドリブルは世界屈指の水準に達しており、2026年北中米W杯で日本を勝利へ導く最大の武器となる。</p>
</div>`,
  },
  {
    id: "5",
    slug: "ueda-naomichi-profile",
    title: "「血を流す」覚悟の男——植田直通という、闘将の帰還",
    titleEn: "The Man Who Bleeds for Victory — Naomichi Ueda, the Return of a Warrior",
    excerpt: "顔面69針。50mを6.1秒で走る俊足。鹿島で欧州で磨かれた闘将が、2025年Jベストイレブンを経てW杯への挑戦権を手にした。",
    excerptEn: "69 stitches to the face. A 50m sprint time of 6.1 seconds. Forged at Kashima and refined in Europe, this warrior earned J-League Best XI honors in 2025 and now has his sights set on the World Cup.",
    category: "選手紹介",
    tags: ["植田直通", "日本代表", "鹿島アントラーズ", "W杯2026"],
    tagsEn: ["Naomichi Ueda", "Japan National Team", "Kashima Antlers", "World Cup 2026"],
    publishedAt: "2026-03-23",
    updatedAt: "2026-03-23",
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `「自分は試合中に血を流すというのが目標でもある」

植田直通（31）はかつてそう語った。2016年の段階で顔面を69針縫っていた男の言葉は、冗談ではない。身長186cmの鋼のような体を持ちながら、50m走6.1秒の俊足を誇る。闘志と身体能力を兼ね備えた「闘将型CB」——それが植田直通だ。

## プロフィール

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>植田 直通（うえだ なおみち）</td></tr>
    <tr><th>生年月日</th><td>1994年10月24日（31歳）</td></tr>
    <tr><th>出身地</th><td>熊本県宇土市</td></tr>
    <tr><th>身長</th><td>186cm</td></tr>
    <tr><th>ポジション</th><td>DF（CB）</td></tr>
    <tr><th>現所属</th><td>鹿島アントラーズ</td></tr>
    <tr><th>代表歴</th><td>日本代表（2017年〜）</td></tr>
  </tbody>
</table>

## 「こいつが守備で負けたのを見たことがない」

熊本・大津高校時代の植田について、元チームメイトの豊川雄太はこう語っている——「大学生でも、プロでも吹っ飛ばしていた」。

高校3年間で主将を務めた植田は、2011年のU-17ワールドカップに出場。5試合1得点でチームのベスト8進出に貢献した。本来は大学進学を希望していたが、この世界大会での経験がプロへの覚悟を固めさせた。

浦和、横浜FM、川崎Fなど複数のJ1クラブからオファーを受けた植田が選んだのは鹿島アントラーズだった。2013年、プロキャリアをスタートさせる。

## 鹿島アントラーズ：若き闘将の台頭

鹿島では加入2年目からレギュラーに定着。2016年のFIFAクラブワールドカップではレアル・マドリード相手に堂々と渡り合い、世界にその名を知らしめた。空中戦の勝率の高さと恐れを知らないタックルで、鹿島の守備の要として君臨した。

## 欧州で磨かれた「総合力」：ベルギー、フランスを経て

2018年夏、鹿島からベルギー1部のサークル・ブルッヘへ完全移籍。2年半でリーグ55試合に出場した。

しかし植田は「この環境にいては、自分の成長がないかもしれないという危機感をずっと持っていた」と振り返っている。成長への渇望が次の一手を促した。

2021年1月、フランス1部のニーム・オリンピックへ期限付き移籍し、その夏に完全移籍。フランスリーグの技術力の高い攻撃陣と対峙する中で、ポジショニングと読みの精度を磨いた。

## 鹿島への帰還——そして2025年Jリーグベストイレブン

2023年、原点である鹿島アントラーズに復帰。欧州で培った経験を還元し、守備のリーダーとしてチームを牽引した。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">2025年Jリーグベストイレブン——国内復帰後の「証明」</span>
<p class="analysis-body">2025シーズン、植田は全38試合にフルタイム出場し2得点。チームの優勝を守備の柱として支え、Jリーグベストイレブンに初選出された。JPFAアワード2025でも鈴木優磨と並んでベストイレブン入り——国内でプレーする選手2名同時受賞という史上初の快挙だった。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">50mを6.1秒で走る「闘将型CB」——強さと速さを兼備</span>
<p class="analysis-body">身長186cmの恵まれた体格を持ちながら、筋肉量・体脂肪率・筋肉指数など6項目すべてでU-22日本代表トップを誇っていた植田。強烈なプレスとフィジカルコンタクトを得意とし、空中戦・対人戦で圧倒的な強さを示す。好きな選手が守備の英雄カルレス・プジョルというのも納得の、格闘的なスタイルだ。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">「年中夢求」——31歳の闘将がW杯の舞台を目指す</span>
<p class="point-body">母校・大津高校のスローガン「年中夢求（つねに夢に向かい続ける）」。先輩の谷口彰悟も30代でW杯を勝ち取った。2025年のJリーグでMVP級の活躍を見せた植田には、北中米の大舞台で日本の守備を支える力がある。</p>
</div>

## 選手経歴

<table class="schedule-table">
  <thead>
    <tr><th>年度</th><th>所属クラブ</th><th>出場</th><th>得点</th></tr>
  </thead>
  <tbody>
    <tr><td>2013-18</td><td>鹿島アントラーズ（J1）</td><td>130試合</td><td>5得点</td></tr>
    <tr><td>2018-20</td><td>サークル・ブルッヘ（ベルギー）</td><td>55試合</td><td>2得点</td></tr>
    <tr><td>2021-23</td><td>ニーム・オリンピック（フランス）</td><td>48試合</td><td>1得点</td></tr>
    <tr><td>2023</td><td>鹿島アントラーズ（J1）</td><td>30試合</td><td>1得点</td></tr>
    <tr><td>2024</td><td>鹿島アントラーズ（J1）</td><td>38試合</td><td>3得点</td></tr>
    <tr><td>2025</td><td>鹿島アントラーズ（J1）</td><td>38試合</td><td>2得点</td></tr>
  </tbody>
</table>

---

「血を流す」覚悟を持つ男が、W杯を目指している。2025年のJベストイレブンという証明を携えて。植田直通、31歳——その闘将の物語は、まだクライマックスを迎えていない。

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li>熊本県宇土市出身の<strong>植田直通</strong>は、大津高校から<strong>鹿島アントラーズ</strong>に加入し、FIFAクラブW杯でレアル・マドリードと渡り合った闘将型CBだ。<strong>サークル・ブルッヘ</strong>、<strong>ニーム</strong>で欧州5年間の経験を積み、2023年に鹿島へ復帰。</li>
    <li>2025シーズンは全38試合フルタイム出場で<strong>Jリーグベストイレブン</strong>に初選出された。186cmの体格と50m走6.1秒の俊足を兼ね備え、空中戦・対人戦で圧倒的な強さを誇る。</li>
    <li>31歳で迎える2026年W杯では、経験と闘志を武器に日本の最終ラインを支える候補の一人だ。</li>
  </ul>
</div>`,
  },
  {
    id: "6",
    slug: "japan-uk-tour-2026-preview",
    title: "W杯前最後の試金石——スコットランド＆イングランドと激突、森保ジャパンは何を問われるか",
    titleEn: "The Final Litmus Test Before the World Cup — Japan Face Scotland and England as Moriyasu's Side Is Put to the Test",
    excerpt: "3月28日スコットランド戦、31日イングランド戦。W杯メンバー選考最終テストとなるイギリス遠征を、戦術・選手起用・チーム戦略の全方位から徹底プレビューする。",
    excerptEn: "Scotland on March 28, England on March 31. A comprehensive preview of the UK tour — the final audition for World Cup squad selection — covering tactics, player selection, and team strategy from every angle.",
    category: "日本代表",
    tags: ["日本代表", "W杯2026", "スコットランド", "イングランド", "森保一", "キリンワールドチャレンジ"],
    tagsEn: ["Japan National Team", "World Cup 2026", "Scotland", "England", "Hajime Moriyasu", "Kirin World Challenge"],
    publishedAt: "2026-03-23",
    updatedAt: "2026-03-23",
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
    ],
    content: `森保一監督率いる日本代表28名が、W杯本大会前の最大な試練に向かって出国の準備を整えている。

W杯本大会前の最後の強化試合となる「キリンワールドチャレンジ2026」——3月28日（現地時間）にスコットランドのハムデン・パークでスコットランド代表と、31日にはウェンブリー・スタジアムでイングランド代表と対戦する。

この2試合は単なる親善試合ではない。ワールドカップ本大会メンバー確定前、最後の選考試験だ。

## キリンワールドチャレンジ2026とは

今回の遠征は、JFAのオフィシャルトップパートナーであるキリンホールディングスの特別協賛を得て「キリンワールドチャレンジ2026」として実施される。JFAが管轄する全ての日本代表カテゴリーにおいて、パートナー企業の協賛を得た海外遠征は史上初めてだ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS</span>
<span class="analysis-title">キリンワールドチャレンジ2026 対戦日程</span>
<p class="analysis-body">第1戦：3月28日（土）17:00（現地）／29日 2:00（日本時間）vs スコットランド＠ハムデン・パーク（グラスゴー）<br>第2戦：3月31日（月）19:45（現地）／4月1日 3:45（日本時間）vs イングランド＠ウェンブリー・スタジアム（ロンドン）</p>
</div>

## 招集メンバーの注目ポイント

今回の28名には、約1年9カ月ぶり復帰の冨安健洋（アヤックス）、約1年3カ月ぶり復帰の伊藤洋輝（バイエルン）、そしてサプライズ初招集の塩貝健人（ヴォルフスブルク）が含まれる。一方で遠藤航・久保建英・守田英正・南野拓実・板倉滉ら主力が招集外となった。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">スコットランド戦の戦術的課題——ブロック崩しと守備強度</span>
<p class="analysis-body">スコットランドはFIFAランキング38位。堅固なブロックを敷きカウンターを狙うスタイルで知られ、ハムデン・パークの熱狂的サポーターはアウェーチームに強烈なプレッシャーをかける。日本が問われるのは、狭いスペースを動き崩す崩しの精度と、縦に速い攻撃への守備応答力だ。最終ラインのコンビネーション確認としても重要な一戦になる。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">イングランド戦——「ベスト4」候補との世界基準テスト</span>
<p class="analysis-body">FIFAランク4位のイングランドはW杯優勝候補の一角だ。ベリンガム、サカ、フォーデン、ケインら世界最高峰のタレントが並ぶ攻撃陣に対して、日本の守備ブロックがどこまで耐えられるか。ウェンブリーでの90分間は、W杯本番のシミュレーションとして最高の舞台となる。</p>
</div>

## 最大の注目——冨安＆伊藤洋輝のCBコンビは実現するか

この遠征で最も注目すべきポイントは、冨安健洋と伊藤洋輝の同時起用が実現するかどうかだ。この2人がセンターバックに入れば、ワールドカップ本大会で想定される最強の守備ブロックが完成する。冨安のアヤックスでのプレータイムはまだ限定的だが、コンディション次第ではスタメンの可能性もある。

中盤では、鎌田大地が「クリエイター」として攻撃を操り、佐野海舟が「デストロイヤー」として守備の骨格を作る2列目コンビが機能するかが鍵を握る。縦への推進力を担う三笘薫と伊東純也の左右ウィングが高い位置を取り、上田綺世がゴール前でフィニッシュするというメカニズムが、世界ランク上位の相手に通用するかを検証する最後のチャンスだ。

## 「最高の景色」へ、残り80日

森保監督は会見でこう述べた——「W杯に向けて選手選考の場となること、チームの強化をしていくこと、その両方をこの遠征で果たしたい」。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">塩貝健人のサプライズ招集——W杯本番を見据えた「1%の上積み」</span>
<p class="analysis-body">21歳の塩貝健人がW杯直前にサプライズ初招集を果たした。森保監督は「W杯に向けて1%でも勝つ可能性を上げていく」と語った。ヴォルフスブルクでの活躍が認められた形だが、この2試合で結果を出せばW杯本大会メンバー入りも現実味を帯びてくる。</p>
</div>

<table class="schedule-table">
  <thead>
    <tr><th>日時</th><th>対戦相手</th><th>会場</th></tr>
  </thead>
  <tbody>
    <tr><td>3月28日 17:00（現地）</td><td>スコットランド（FIFAランク38位）</td><td>ハムデン・パーク（グラスゴー）</td></tr>
    <tr><td>3月31日 19:45（現地）</td><td>イングランド（FIFAランク4位）</td><td>ウェンブリー・スタジアム（ロンドン）</td></tr>
  </tbody>
</table>

---

W杯本番まで3カ月を切った。この2試合で何を証明し、何を修正するか——森保ジャパンにとって、残された時間はあまりにも少ない。

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>W杯前最後の強化試合「キリンワールドチャレンジ2026」として、日本代表は3月28日に<strong>スコットランド</strong>（ハムデン・パーク）、31日に<strong>イングランド</strong>（ウェンブリー）と対戦する。約1年9カ月ぶり復帰の<strong>冨安健洋</strong>、初招集の<strong>塩貝健人</strong>、約1年3カ月ぶり復帰の<strong>伊藤洋輝</strong>が注目を集める一方、遠藤航・久保建英・守田英正ら主力が招集外。冨安＆伊藤洋輝のCBコンビ実現の可否が最大の焦点であり、W杯メンバー確定前の最終選考として極めて重要な2試合となる。</p>
</div>`,
  },
  {
    id: "7",
    slug: "jleague-100nen-east-week8-kashima-7wins",
    title: "鹿島7連勝で独走、川崎F大量5失点の衝撃——Jリーグ百年構想リーグEAST第8節全分析",
    titleEn: "Kashima Run Away With Seven Straight Wins as Kawasaki Concede Five in Shock Defeat — J.League 100-Year Vision League EAST Matchday 8 Full Analysis",
    excerpt: "3月22日のJ1百年構想リーグEAST第8節。鹿島が植田直通の決勝弾で7連勝を達成する一方、川崎Fが横浜FMに0-5で惨敗。首位独走の鹿島と、混戦を演じる各クラブの現状を戦術的視点で解析する。",
    excerptEn: "J1 100-Year Vision League EAST Matchday 8 on March 22. Kashima secured a seventh consecutive win thanks to Naomichi Ueda's decisive goal, while Kawasaki suffered a 0-5 hammering at the hands of Yokohama F. Marinos. A tactical breakdown of league-leading Kashima and the scramble among the chasing pack.",
    category: "Jリーグ",
    tags: ["Jリーグ", "百年構想リーグ", "鹿島アントラーズ", "川崎フロンターレ", "横浜Fマリノス"],
    tagsEn: ["J.League", "100-Year Vision League", "Kashima Antlers", "Kawasaki Frontale", "Yokohama F. Marinos"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    sources: [
      { name: "Jリーグ公式", url: "https://www.jleague.jp/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `## 鹿島アントラーズ、圧巻の7連勝——植田直通が試合を決めた

百年構想リーグEAST第8節、鹿島アントラーズはホームで1-0の勝利を収め、開幕から7勝1分・勝ち点22で首位を独走している。この試合を決めたのは、日本代表CB植田直通のヘディングによる決勝弾だった。後半68分、CKからニアサイドに飛び込んだ植田が力強いヘッドでゴールネットを揺らし、試合を決めた。

<div class="stat-box">
<span class="stat-number">7連勝</span>
<span class="stat-label">鹿島が首位独走、浦和・町田が2位争い</span>
<p class="stat-body">鹿島が8節で7勝1分の勝ち点22で首位独走。第2位争いは浦和・町田が拮抗。FC東京も勝ち点を積み上げ上位に食い込んでいる。最下位の千葉は8試合で1勝にとどまり、格差が広がっている。</p>
</div>

## 川崎F 0-5の大惨敗——守備崩壊の解剖

この日最大のニュースは川崎フロンターレの0-5大敗だ。国立競技場で行われた横浜FM戦、川崎は守備が完全に機能不全に陥った。

横浜FMは谷村海那（30分）の先制点に続き、途中出場の天野純が53分・62分と2得点。さらにユーリ・アラウージョ（72分）、キニョーネス（78分）と後半だけで4ゴールを奪い、川崎を圧倒した。

川崎の問題は明確だ。中盤のプレス強度が低下した後半、横浜FMにボールを自由に回され、サイドチェンジを繰り返されることで守備ラインが左右に振られ続けた。特に天野純の投入後、川崎の守備は完全に崩壊した。

<div class="quote-box">
<span class="quote-label">INSIGHT</span>
<p class="quote-body"><strong>鹿島の「勝ち切る力」——植田直通のセットプレー決勝弾</strong> — 鹿島の7連勝を支えているのは堅守速攻のスタイルだけではない。セットプレーからの得点力が今季のEASTでトップクラスであり、植田直通の空中戦の強さがその中核を担っている。CKからの得点は今季4点目——高さと強さを武器にした「闘将」が、攻守両面で試合を決めた。</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>横浜FM 5-0圧勝の構造的要因——天野純の投入で一変</strong> — 横浜FMが川崎に5-0で圧勝した構造的要因は、途中出場の天野純（2得点1アシスト）のクオリティにある。前半は1-0の接戦だったが、天野投入後に中盤のリズムが一変。川崎のプレスを外すパス回しと、逆サイドへの展開が機能し始め、後半だけで4ゴールを奪う猛攻となった。</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>東京ダービーはPK戦で東京Vが制す——「5戦4ドロー」の膠着</strong> — 東京V対FC東京は0-0（PK4-2）で東京Vが勝ち点2を獲得。直近5戦で4度目のドローという異様な膠着状態が続く"伝統の一戦"だが、戦術的にはお互いが相手の長所を消し合う過密な試合展開が続いている。PK戦では東京V・長沢祐弥が2本ストップし、チームに勝ち点をもたらした。</p>
</div>

## 百年構想リーグという「実験場」

2026年から導入された百年構想リーグは、J1を東西に分けたカンファレンス制だ。レギュラーシーズンの後にプレーオフラウンドが控えており、上位チームにとっては「何位で通過するか」が重要な戦略的課題となっている。鹿島の独走は、プレーオフに向けて理想的なポジションを確保しているといえる。

## EAST第8節 全結果

<table class="schedule-table">
  <thead>
    <tr><th>対戦カード</th><th>スコア</th><th>ハイライト</th></tr>
  </thead>
  <tbody>
    <tr><td>鹿島 vs 対戦相手</td><td>1-0</td><td>植田直通CKから決勝ヘッド</td></tr>
    <tr><td>横浜FM vs 川崎F</td><td>5-0</td><td>天野純2得点、後半4発の猛攻</td></tr>
    <tr><td>東京V vs FC東京</td><td>0-0（PK4-2）</td><td>長沢祐弥がPK2本ストップ</td></tr>
    <tr><td>千葉 vs 相模原</td><td>1-2</td><td>望月ヘンリー先制、相馬PK決勝弾</td></tr>
    <tr><td>柏 vs 水戸</td><td>3-0</td><td>中川敦瑛ミドル含む3発快勝</td></tr>
  </tbody>
</table>

---

EAST首位の鹿島は次節（4月4日）、アウェーで水戸ホーリーホックと対戦する。7連勝の勢いを保ちつつプレーオフラウンドへの最高の布石を打てるか。川崎は立て直しが急務だ。

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li>百年構想リーグEAST第8節、<strong>鹿島アントラーズ</strong>が<strong>植田直通</strong>の決勝ヘッドで1-0勝利し、開幕7勝1分・勝ち点22で首位を独走。一方、<strong>川崎フロンターレ</strong>は<strong>横浜FM</strong>に0-5の大惨敗を喫し、天野純の途中出場後に後半だけで4失点と守備が崩壊した。</li>
    <li>東京ダービーは0-0からPK戦で<strong>東京V</strong>が勝ち点2を獲得。</li>
    <li>2026年から導入されたカンファレンス制の中で、鹿島の独走とプレーオフに向けた各クラブの思惑が交錯する第8節となった。</li>
  </ul>
</div>`,
  },
  {
    id: "8",
    slug: "wc2026-japan-group-netherlands-analysis",
    title: "W杯開幕まで80日——日本の初戦・オランダ戦を戦術的に解剖する",
    titleEn: "80 Days Until the World Cup — A Tactical Dissection of Japan's Opening Match Against the Netherlands",
    excerpt: "2026年北中米W杯、日本の初戦はオランダ。FIFAランク7位の難敵をどう攻略するか。コバルコフ新体制のオランダの特徴と、日本が勝つための3つの戦略的キーポイントを戦術家の視点で解説。",
    excerptEn: "At the 2026 North America World Cup, Japan's opening match is against the Netherlands. How can they overcome the FIFA No. 7-ranked opponents? An expert tactical breakdown of the Netherlands under their new regime and three strategic keys to a Japanese victory.",
    category: "W杯",
    tags: ["W杯2026", "日本代表", "オランダ代表", "戦術分析", "グループリーグ"],
    tagsEn: ["World Cup 2026", "Japan National Team", "Netherlands National Team", "Tactical Analysis", "Group Stage"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    sources: [
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `## 80日後、日本はオランダと対峙する

2026年北中米W杯の開幕が迫っている。日本が入ったグループの初戦は、FIFAランキング7位のオランダ代表。欧州予選を無敗で突破したオランダは、プレッシングと縦への速さを維持しながら、よりポジショナルな構造を加えた「ハイブリッド型」への移行を進めている。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">オランダの「ハイプレス4-3-3」——日本の弱点を直撃する構造</span>
<p class="analysis-body">オランダの最大の武器は、フロント3（ガクポ、デパイ、ムルドゥイク）による前線からのプレスと、中盤3枚による中間ポジション支配だ。日本がビルドアップ段階でボールを失うと、そのままゴール前まで運ばれる危険性がある。3-4-2-1や4-2-3-1など、ビルドアップの形を複数持てるかがポイントだ。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">日本の勝機——「カウンターの精度」と「守備ブロックの密度」</span>
<p class="analysis-body">オランダがボールを持つ時間が長くなることは避けられない。日本の勝機はミドルブロックからのカウンターにある。三笘薫と伊東純也の両翼が高い位置で相手SBの裏を突き、上田綺世がゴール前で仕留める——このメカニズムの精度をW杯までにどこまで高められるかが勝敗を分ける。</p>
</div>

## 日本とオランダの対戦史

日本とオランダのW杯での対戦は2010年南アフリカ大会のグループリーグまで遡る。そのときは0-1で惜敗したが、スナイデルのゴールだけに抑えた守備組織は高く評価された。しかし親善試合では0-3（2013）など大差で敗れてきた歴史もある。

あれから16年——日本サッカーは別次元の進化を遂げた。欧州5大リーグでプレーする選手が20名を超え、個の質は確実に向上している。その差は縮まっているか——それを測る意味でも、今回のスコットランド・イングランド戦は非常に重要な試金石だ。

## W杯「ベスト8」への道を試算する

日本が今大会でベスト8以上を達成するためのシナリオを整理すると、グループリーグ突破には最低でも2勝（または1勝2分）が必要だ。オランダに勝てれば一気に突破が見えるが、仮に敗れても第2・第3戦で挽回する余地はある。

重要なのは、W杯本番の6月時点でどこまで選手のコンディションが整っているかだ。遠藤航（リヴァプール）・久保建英（レアル・ソシエダ）・板倉滉（アヤックス）などが本大会までに復帰できれば、戦力は大幅に上がる。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">鍵を握る「3月遠征組」のパフォーマンス</span>
<p class="analysis-body">W杯本番のスタメンを占う上で、3月のスコットランド・イングランド戦は最終試験だ。冨安健洋と伊藤洋輝のCBコンビが機能すれば、オランダの攻撃を封じる土台ができる。鎌田大地と佐野海舟の中盤コンビが世界レベルの相手に通用するかも、この遠征で答えが出る。</p>
</div>

<table class="schedule-table">
  <thead>
    <tr><th>選手</th><th>所属</th><th>現状</th><th>W杯本番の見通し</th></tr>
  </thead>
  <tbody>
    <tr><td>遠藤航</td><td>リヴァプール</td><td>コンディション調整中</td><td>復帰見込み◎</td></tr>
    <tr><td>久保建英</td><td>レアル・ソシエダ</td><td>怪我から復帰中</td><td>復帰見込み○</td></tr>
    <tr><td>板倉滉</td><td>アヤックス</td><td>選外</td><td>選出見込み○</td></tr>
    <tr><td>冨安健洋</td><td>アヤックス</td><td>3月遠征招集</td><td>主力候補◎</td></tr>
    <tr><td>守田英正</td><td>スポルティング</td><td>選外（CL出場中）</td><td>選出見込み◎</td></tr>
  </tbody>
</table>

---

W杯開幕まで80日。オランダとの初戦で日本が勝利を掴めるかどうかは、3月遠征での最終調整と、5月までの選手コンディション管理にかかっている。

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>2026年北中米W杯、日本の初戦はFIFAランク7位の<strong>オランダ代表</strong>。ハイプレス4-3-3を基本とするオランダに対し、日本はミドルブロックからのカウンターと守備ブロックの密度で勝機を見出す必要がある。<strong>三笘薫</strong>と<strong>伊東純也</strong>の両翼が相手SBの裏を突き、<strong>上田綺世</strong>がフィニッシュするメカニズムの精度が鍵を握る。3月のスコットランド・イングランド戦は本番のシミュレーションとして最高の機会であり、<strong>冨安健洋</strong>と<strong>伊藤洋輝</strong>のCBコンビが機能すれば、オランダの攻撃を封じる土台が完成する。</p>
</div>`,
  },
  {
    id: "9",
    slug: "morita-hidemasa-cl-best8-excluded-analysis",
    title: "CLベスト8に導いた男が代表を外れた——守田英正「選外」の真相と、W杯への残された道",
    titleEn: "The Man Who Led His Club to the CL Quarterfinals Was Left Off the Squad — The Truth Behind Hidemasa Morita's Omission and His Remaining Path to the World Cup",
    excerpt: "スポルティングをCLベスト8に導きながら日本代表から選外となった守田英正（30）。「そこには競争がある」という森保監督の言葉の真意と、ボランチ激戦区の序列、そしてW杯への逆転可能性を深く掘り下げる。",
    excerptEn: "Despite leading Sporting CP to the Champions League quarterfinals, Hidemasa Morita (30) was left out of the Japan squad. We delve deep into the true meaning behind Manager Moriyasu's words — 'there is competition' — the pecking order in the fiercely contested central midfield, and Morita's remaining chances of making the World Cup.",
    category: "海外組",
    tags: ["守田英正", "スポルティング", "チャンピオンズリーグ", "日本代表", "海外組"],
    tagsEn: ["Hidemasa Morita", "Sporting CP", "Champions League", "Japan National Team", "Players Abroad"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-03-25",
    sources: [
      { name: "UEFA.com", url: "https://www.uefa.com/uefachampionsleague/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `3月17日、リスボン。スポルティングのホームスタジアム「ホセ・アルバラーデ」に轟く歓声の中、守田英正は後半23分までピッチに立ち続けていた。チャンピオンズリーグ・ラウンド16を突破し、クラブ史上に名を刻んだ夜——その2日後に発表された日本代表メンバーに、守田の名前はなかった。

## CLベスト8の立役者、しかし代表選外

スポルティングのCLベスト8進出において、守田はグループステージから欠かせない存在だった。中盤の底でボールを捌き、相手の攻撃の芽を摘み、チーム全体のリズムを作る——地味だが不可欠な仕事を高い水準で遂行した。ポルトガルメディア「A BOLA」は守田を「ボールをいつどこで出すべきかを的確に判断する知性が平均以上」と評した。

それだけに、代表選外の報は衝撃だった。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">守田英正という選手の「本質的価値」</span>
<p class="analysis-body">守田英正の最大の武器はポジショニングとパスの出口選択の速さだ。ボールを持ってからの判断が0.1秒単位で正確であり、チーム全体をスムーズに機能させる「潤滑油」的役割を担える。これはCLベスト8に貢献した事実が証明している。A BOLAの評価「ボールをいつどこで出すべきかを的確に判断する知性が平均以上」という言葉が、守田の本質を表している。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">ボランチ激戦区の現状——守田が外れた「構造的理由」</span>
<p class="analysis-body">今の日本代表ボランチ陣は史上最強レベルだ。鎌田大地（プレミアリーグ・クリスタルパレス）、佐野海舟（ブンデスリーガ・マインツ）、田中碧（リーズ）、藤田譲瑠チマ（シント・トロイデン）——いずれも欧州で実戦経験を積む実力者揃い。守田が外れたのは「実力不足」ではなく、「競争の激しさ」ゆえの構造的帰結だ。</p>
</div>

## 森保監督の選考哲学——「目先の成績」より「チームへの統合性」

森保監督は会見で「そこには競争がある」と述べた。この言葉の裏には、「CLで活躍した守田より、リーズで出場機会が減少している田中碧を選ぶ」という判断がある。ファンの間では「なぜ守田を外すのか」という反応が広がったが、これは「目先の成績よりもチームへの統合性を重視する」という森保監督の一貫した選考哲学の表れとも読める。

守田は「いつでも入ってこられる」戦力だからこそ、今は別の選手を試す優先順位があるというロジックだ。3月の遠征は最後の「テストの場」であり、既に実力が証明されている守田よりも、まだ見極めが必要な選手に出場機会を与えたい——そう読み解くこともできる。

## 「守田英正なしのW杯」はあり得るか

今後のスケジュールを考えると、W杯本番のメンバー発表（5月頃）まで残り約2カ月。守田が5月まで高いパフォーマンスを維持し続ければ、選外のリスクはほぼないと見ていい。問題は「競争」の激しさだ——遠藤航・鎌田大地・佐野海舟・田中碧・藤田譲瑠チマが全員健康であれば、26人枠のボランチは最大でも4名。誰かが外れる残酷な競争が続く。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">守田のW杯メンバー入り確率——冷静に分析する</span>
<p class="analysis-body">CLベスト8の実績、ポルトガルリーグでの安定した出場、そして大舞台での経験値。これらを総合すると、守田がW杯本大会メンバーから外れる可能性は低い。しかし3月遠征の結果次第では、ボランチの序列が変動する可能性もゼロではない。守田にとっては「結果で証明し続ける」以外に道はない。</p>
</div>

<table class="schedule-table">
  <thead>
    <tr><th>選手</th><th>所属</th><th>今季成績</th><th>3月遠征</th></tr>
  </thead>
  <tbody>
    <tr><td>遠藤航</td><td>リヴァプール</td><td>プレミア25試合</td><td>招集外</td></tr>
    <tr><td>鎌田大地</td><td>クリスタルパレス</td><td>プレミア28試合4得点</td><td>招集</td></tr>
    <tr><td>守田英正</td><td>スポルティング</td><td>リーガ24試合・CL8試合</td><td>選外</td></tr>
    <tr><td>佐野海舟</td><td>マインツ</td><td>ブンデス26試合</td><td>招集</td></tr>
    <tr><td>田中碧</td><td>リーズ</td><td>チャンピオンシップ20試合</td><td>招集</td></tr>
    <tr><td>藤田譲瑠チマ</td><td>シント・トロイデン</td><td>ベルギー27試合3得点</td><td>招集</td></tr>
  </tbody>
</table>

---

CLベスト8に導いた男が、代表のユニフォームを着られなかった。しかし守田英正のW杯への道は閉ざされていない。残り2カ月、スポルティングでの戦いが彼の運命を決める——その答えは5月に出る。

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p><strong>スポルティング</strong>をCLベスト8に導いた<strong>守田英正</strong>が、3月の日本代表イギリス遠征メンバーから選外となった。CLで不可欠な存在だった守田が外れた背景には、<strong>鎌田大地</strong>・<strong>佐野海舟</strong>・<strong>田中碧</strong>・<strong>藤田譲瑠チマ</strong>ら欧州組が揃うボランチ激戦区の構造がある。森保監督は「そこには競争がある」と語り、最後のテスト機会を他の選手に与える判断を下した。守田のW杯本大会メンバー入り確率は依然高いが、日本代表史上最強レベルの中盤争いはW杯開幕まで続く。</p>
</div>`,
  },
  {
    id: "10",
    slug: "japan-football-world-standard-analysis-2026",
    title: "「世界基準」という言葉の罠——日本サッカーは本当に進化しているのか？",
    titleEn: "The Trap of 'World Class' — Is Japanese Football Truly Evolving?",
    excerpt: "W杯開幕まで80日、日本サッカーの「強さ」を冷静に問い直す。カタールでのドイツ・スペイン撃破は本物の実力か、それとも組み合わせの妙か。欧州サッカーの最前線に立つ海外組の現状から、日本サッカーの真の姿を探る。",
    excerptEn: "With 80 days until the World Cup, it is time to soberly reassess Japan's strength. Were the victories over Germany and Spain in Qatar genuine quality or favorable circumstances? We examine the true state of Japanese football through the lens of its European-based players.",
    category: "コラム",
    tags: ["コラム", "日本代表", "W杯2026", "戦術分析", "日本サッカー"],
    tagsEn: ["Column", "Japan National Team", "World Cup 2026", "Tactical Analysis", "Japanese Football"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-03-25",
    sources: [
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `「世界基準」——この言葉が日本のサッカーメディアに溢れるようになって久しい。カタールW杯でドイツとスペインを撃破したあの歴史的な夜から3年。日本サッカーは確かに変わった。しかし「世界基準に達した」と言い切ることは、果たして正確だろうか。

W杯開幕まで80日。このタイミングだからこそ、日本サッカーの「現在地」を冷静に検証してみたい。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">海外組26人——量の拡大と質の深化</span>
<p class="analysis-body">2025-26シーズン、欧州5大リーグでプレーする日本人選手は過去最多水準に達している。三笘薫（ブライトン）、久保建英（レアル・ソシエダ）、遠藤航（リヴァプール）、鎌田大地（クリスタルパレス）——かつては「日本人が行けるリーグ」ではなかった場所に、当たり前のように名前が並ぶ。この「量的拡大」は確実に質的変化をもたらしている。</p>
</div>

## カタールW杯の「神話」を解体する

ドイツ戦の逆転勝利、スペイン戦の「三笘の1ミリ」——あの2試合は間違いなく日本サッカー史に刻まれる名勝負だった。しかし冷静に分析すると、どちらもグループリーグという「3試合中の1試合」であり、相手にとってはトーナメントと同じ緊迫感があったわけではない。

実際、その後のクロアチア戦ではPK戦で敗退している。90分を通じて相手を上回るパフォーマンスを維持する「安定性」が、日本に欠けていたものだ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">「守備から入る」哲学の限界——ボール保持の質が問われる時代</span>
<p class="analysis-body">現代サッカーの趨勢は「ポジショナルプレー」の精度競争だ。バルセロナ、マンチェスター・シティが示したように、ボールを持ちながら相手を動かし、構造的にスペースを作り出す能力が求められている。日本は「守備からカウンター」の質を高めてきたが、ボール保持時の質的向上は次の課題だ。</p>
</div>

## ノックアウトラウンドという「真のテスト」

日本サッカーの真価が問われるのは、決勝トーナメントに入ってからだ——ノックアウト方式での1試合に、90分間の「組織力と個の爆発力の融合」が問われる。カタールでクロアチアに敗れた原因は、90分を通じて相手を上回るパフォーマンスを維持できなかったことにある。

W杯は「一発勝負の連続」だ。コンディションのピークを本番に合わせられるかという準備の問題も、いつも日本の前に立ちはだかる課題だ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">「個の力」と「組織の力」——その融合が北中米で試される</span>
<p class="analysis-body">三笘のドリブル、久保のパス、遠藤のデュエル——個の力は確実に上がった。しかし「個の力の総和」がそのまま「チームの強さ」になるわけではない。森保監督が構築してきた守備組織に、個のクオリティをどう統合するか。その答えが北中米の地で試される。</p>
</div>

## 日本サッカーが越えるべき「最後の壁」

技術・戦術・フィジカル——すべての面で日本は着実に進歩している。しかし「世界基準」と呼ぶためには、まだ一つの壁がある。それは「強豪国との真剣勝負で安定して勝てるか」という実績の積み重ねだ。

今回の英国遠征でスコットランドとイングランドと対戦する。この2試合の結果と内容が、日本サッカーの「現在地」を正確に映し出すだろう。

「世界基準」という言葉は、到達点ではなくプロセスだ。日本サッカーが今、そのプロセスのどこにいるのか——冷静に見極める目を持ち続けたい。

---

W杯開幕まで80日。「世界基準」という美しい言葉に酔うことなく、残された時間で何を積み上げるか。日本サッカーの真価が問われる夏が、すぐそこまで来ている。

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>カタールW杯でのドイツ・スペイン撃破から3年。日本サッカーは「世界基準に達した」と語られるが、その評価は冷静に検証する必要がある。欧州5大リーグでプレーする選手は過去最多水準に達し、<strong>三笘薫</strong>・<strong>久保建英</strong>・<strong>遠藤航</strong>ら個の力は確実に向上した。しかしカタールでのクロアチア戦PK敗退が示すように、90分間の「安定性」は課題として残る。「守備からカウンター」の質に加え、ボール保持時の構造的なスペース創出が次のステップだ。北中米W杯は、日本サッカーがプロセスのどこにいるかを正確に映し出す鏡となる。</p>
</div>`,
    contentEn: `"World class" — this phrase has flooded Japanese football media for some time now. Three years have passed since that historic night in Qatar when Japan defeated both Germany and Spain. Japanese football has certainly changed. But is it truly accurate to declare that it has "reached world-class level"?

With 80 days until the World Cup kicks off, now is the time to calmly assess where Japanese football truly stands.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">26 Players Abroad — Expanding Numbers and Deepening Quality</span>
<p class="analysis-body">In the 2025-26 season, the number of Japanese players competing in Europe's top five leagues has reached an all-time high. Kaoru Mitoma (Brighton), Takefusa Kubo (Real Sociedad), Wataru Endo (Liverpool), Daichi Kamada (Crystal Palace) — names now appear as a matter of course in leagues that were once considered beyond reach for Japanese players. This quantitative expansion is undeniably driving qualitative change.</p>
</div>

## Deconstructing the Qatar World Cup 'Myth'

The comeback victory against Germany, Mitoma's "1mm" goal-line clearance against Spain — those two matches were undoubtedly among the greatest in Japanese football history. Yet a sober analysis reveals that both were group-stage matches — one of three games — where the opponents did not face the same do-or-die intensity as in the knockout rounds.

In fact, Japan went on to lose to Croatia on penalties. The "consistency" required to sustain superior performance over a full 90 minutes was precisely what Japan lacked.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">The Limits of a 'Defend First' Philosophy — An Era That Demands Quality in Possession</span>
<p class="analysis-body">The prevailing trend in modern football is a competition of precision in positional play. As Barcelona and Manchester City have demonstrated, the ability to move opponents while in possession and structurally create space is essential. Japan has refined its quality in defensive transitions and counter-attacks, but improving quality in possession remains the next challenge.</p>
</div>

## The Knockout Rounds — The True Test

The real measure of Japanese football will come in the knockout stage — where a single match demands a 90-minute fusion of organizational strength and individual brilliance. The reason Japan fell to Croatia in Qatar was their inability to sustain superior performance across the full 90 minutes.

The World Cup is a series of winner-take-all matches. The perennial challenge of peaking fitness at exactly the right moment continues to stand in Japan's way.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 3</span>
<span class="analysis-title">Individual Talent and Collective Strength — Their Fusion Will Be Tested in North America</span>
<p class="analysis-body">Mitoma's dribbling, Kubo's passing, Endo's duels — individual quality has clearly improved. But the sum of individual talents does not automatically equal team strength. How to integrate individual quality into the defensive structure that manager Hajime Moriyasu has built — that answer will be tested on North American soil.</p>
</div>

## The 'Final Wall' Japanese Football Must Overcome

In technique, tactics, and physicality, Japan has made steady progress across the board. Yet to truly earn the label "world class," one wall remains: building a track record of consistently winning in serious matches against elite nations.

During the upcoming British tour, Japan will face Scotland and England. The results and performances in these two matches will accurately reflect the true state of Japanese football.

"World class" is not a destination but a process. We must keep a clear-eyed perspective on exactly where Japanese football stands within that process.

---

Eighty days until the World Cup. Rather than being intoxicated by the beautiful phrase "world class," the question is what Japan can build in the time remaining. The summer that will reveal Japanese football's true worth is fast approaching.

<div class="verdict-card">
  <div class="verdict-label">VERDICT</div>
  <p>Three years after defeating Germany and Spain at the Qatar World Cup, Japanese football is often described as having "reached world-class level," but that assessment requires sober examination. The number of players competing in Europe's top five leagues has reached an all-time high, and individual quality from the likes of <strong>Kaoru Mitoma</strong>, <strong>Takefusa Kubo</strong>, and <strong>Wataru Endo</strong> has clearly improved. However, as the penalty shootout loss to Croatia in Qatar demonstrated, 90-minute "consistency" remains a challenge. Beyond the quality of defensive transitions and counter-attacks, creating space structurally while in possession is the next step. The 2026 World Cup in North America will serve as a mirror that accurately reflects where Japanese football stands in this ongoing process.</p>
</div>`,
  },
  {
    id: "11",
    slug: "shiogai-kento-tactical-profile",
    title: "途中出場だけで2桁得点——塩貝健人の「スーパーサブ戦術」を解剖する",
    titleEn: "Double Digits from the Bench Alone — Dissecting Kento Shiogai's 'Super Sub' Tactics",
    excerpt: "NECナイメーヘンで途中出場のみでリーグ2桁得点という前代未聞の記録を打ち立てた塩貝健人。21歳のサプライズ招集の裏にある、森保監督の戦術的意図とは。",
    excerptEn: "Kento Shiogai set an unprecedented record of double-digit league goals entirely from substitute appearances at NEC Nijmegen. Behind the surprise call-up of this 21-year-old lies manager Moriyasu's tactical intent.",
    category: "選手紹介",
    tags: ["塩貝健人", "ヴォルフスブルク", "日本代表", "W杯2026", "戦術分析"],
    tagsEn: ["Kento Shiogai", "VfL Wolfsburg", "Japan National Team", "World Cup 2026", "Tactical Analysis"],
    publishedAt: "2026-03-25",
    updatedAt: "2026-03-25",
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "Transfermarkt", url: "https://www.transfermarkt.com/" },
    ],
    content: `3月19日の招集メンバー発表後、日本のサッカーファンの間に一つの名前が広まった。

**塩貝健人（21歳）——ヴォルフスブルク所属FW。**

「誰だ？」という声も上がる中、森保監督は彼の招集理由をこう説明した。

「W杯に向けて1%でも勝つ可能性を上げていくという意味で招集した。チャレンジして舞台を変えてステップアップしているところを評価した」

## プロフィール

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>塩貝 健人（しおがい けんと）</td></tr>
    <tr><th>生年月日</th><td>2005年3月26日（21歳）</td></tr>
    <tr><th>身長</th><td>175cm（推定）</td></tr>
    <tr><th>ポジション</th><td>FW（左ウィング・セカンドトップ）</td></tr>
    <tr><th>現所属</th><td>VfLヴォルフスブルク（ブンデスリーガ）</td></tr>
    <tr><th>代表歴</th><td>日本代表 2026年3月初招集</td></tr>
  </tbody>
</table>

## 前代未聞の記録——途中出場だけで2桁得点

塩貝健人を語る上で避けて通れないのが、NECナイメーヘン時代に打ち立てた「途中出場のみでリーグ2桁得点」という前代未聞の記録だ。先発ではなく途中出場という限られた時間の中で、これだけの得点を積み重ねられる選手は世界的にも極めて稀だ。

この記録が示しているのは、塩貝の「即座にギアを上げられる」能力だ。試合のテンポを読み、投入直後から最高出力のプレーができる。まさにこのスーパーサブの役割に最適化された選手だ。

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">「スーパーサブ」としての戦術的価値——W杯での使い方</span>
<p class="analysis-body">疲弊した守備ラインに対して、フレッシュなスピードと得点感覚で「追加点」または「逆転ゴール」を奪う——これが塩貝に期待される使命だ。W杯のような大舞台では、後半の選手交代が試合の流れを決定的に変えることが多い。塩貝はまさにこのスーパーサブの役割に最適化された選手だ。</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">ブンデスリーガへのステップアップ——21歳でヴォルフスブルク</span>
<p class="analysis-body">2026年1月、塩貝はオランダのNECナイメーヘンからドイツ・ブンデスリーガのヴォルフスブルクへ移籍した。移籍金は推定1000万ユーロ（約18.5億円）で、20歳以下の日本人選手としては史上最高額。欧州5大リーグへの移籍を21歳で果たしたことは、彼のポテンシャルの高さを証明している。ブンデスリーガという世界屈指の強度の高いリーグで実践経験を積みながら、W杯本番に備えている。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">森保監督の「1%の上積み」哲学——塩貝招集の真意</span>
<p class="point-body">森保監督が語った「1%でも勝つ可能性を上げる」という言葉は、塩貝のような「ゲームチェンジャー」をベンチに置くことの戦術的価値を指している。W杯は7試合を戦う長丁場。スタメン11人だけでは勝ち抜けない。26人全員の質がものを言う舞台で、塩貝の存在は確実に「1%以上」の上積みとなる。</p>
</div>

## 塩貝が代表で見せるべきもの

スコットランド戦、イングランド戦——この2試合で塩貝に求められるのは「結果」だ。途中出場の限られた時間で、ゴールに直結するプレーを見せられるか。A代表初招集の緊張感の中で、NECで見せたような爆発力を発揮できるか。この2試合のパフォーマンスが、W杯本大会メンバー入りの運命を決める。

<table class="schedule-table">
  <thead>
    <tr><th>年度</th><th>所属</th><th>活躍内容</th></tr>
  </thead>
  <tbody>
    <tr><td>〜2025</td><td>NECナイメーヘン（オランダ）</td><td>途中出場のみでリーグ2桁得点（史上初）</td></tr>
    <tr><td>2026年1月〜</td><td>VfLヴォルフスブルク（ドイツ）</td><td>移籍金18.5億円でブンデスリーガへ</td></tr>
    <tr><td>2026年3月</td><td>日本代表</td><td>W杯前最後の遠征でサプライズ初招集</td></tr>
  </tbody>
</table>

---

21歳。全てがこれからの男が、世界最高の舞台に向けて踏み出した。塩貝健人という名前を、今のうちに覚えておいてほしい。

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li><strong>塩貝健人</strong>は<strong>NECナイメーヘン</strong>で途中出場のみのリーグ2桁得点という前代未聞の記録を打ち立て、2026年1月に移籍金18.5億円で<strong>VfLヴォルフスブルク</strong>へ移籍した21歳のFWだ。W杯直前の3月にサプライズ初招集を受け、森保監督は「1%でも勝つ可能性を上げる」と塩貝の「ゲームチェンジャー」としての価値を評価した。</li>
    <li>スコットランド・イングランド戦で結果を出せばW杯本大会メンバー入りが現実味を帯びる。</li>
    <li>「即座にギアを上げられる」スーパーサブの適性は、W杯の長丁場で大きな戦力となる。</li>
  </ul>
</div>`,
    contentEn: `After the squad announcement on March 19, one name began to circulate among Japanese football fans.

**Kento Shiogai (age 21) — VfL Wolfsburg forward.**

Amid voices asking "Who is he?", manager Moriyasu explained his reasoning for the call-up:

"We called him up with the intention of increasing our chances of winning by even 1%. We valued the fact that he has taken on challenges, changed stages, and continued to step up."

## Profile

<table class="profile-table">
  <tbody>
    <tr><th>Name</th><td>Kento Shiogai</td></tr>
    <tr><th>Date of Birth</th><td>March 26, 2005 (age 21)</td></tr>
    <tr><th>Height</th><td>175cm (estimated)</td></tr>
    <tr><th>Position</th><td>FW (Left Wing / Second Striker)</td></tr>
    <tr><th>Current Club</th><td>VfL Wolfsburg (Bundesliga)</td></tr>
    <tr><th>International Career</th><td>Japan National Team — first call-up March 2026</td></tr>
  </tbody>
</table>

## An Unprecedented Record — Double Digits from Substitute Appearances Alone

Any discussion of Kento Shiogai must address the unprecedented record he set at NEC Nijmegen: reaching double-digit league goals exclusively from substitute appearances. To accumulate that many goals in the limited minutes afforded to a substitute is extraordinarily rare on a global scale.

What this record demonstrates is Shiogai's ability to "instantly shift into top gear." He reads the tempo of a match and delivers maximum output immediately after being brought on. He is a player perfectly optimized for the super sub role.

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 1</span>
<span class="analysis-title">Tactical Value as a 'Super Sub' — How He Could Be Used at the World Cup</span>
<p class="analysis-body">Exploiting a tiring defensive line with fresh pace and clinical finishing to score an insurance goal or a comeback winner — that is the mission expected of Shiogai. On the biggest stages like the World Cup, second-half substitutions often decisively change the flow of a match. Shiogai is a player perfectly optimized for precisely this super sub role.</p>
</div>

<div class="analysis-box">
<span class="analysis-label">ANALYSIS 2</span>
<span class="analysis-title">Stepping Up to the Bundesliga — Wolfsburg at 21</span>
<p class="analysis-body">In January 2026, Shiogai transferred from NEC Nijmegen in the Netherlands to VfL Wolfsburg in the German Bundesliga. His transfer fee was an estimated 10 million euros (approximately 1.85 billion yen), the highest ever for a Japanese player under 20. Completing a move to one of Europe's top five leagues at age 21 is proof of his immense potential. He is gaining experience in the Bundesliga, one of the most physically demanding leagues in the world, while preparing for the World Cup.</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 3</span>
<span class="point-title">Moriyasu's '1% Improvement' Philosophy — The True Intent Behind Shiogai's Call-Up</span>
<p class="point-body">Moriyasu's statement about "increasing our chances of winning by even 1%" points to the tactical value of having a "game-changer" like Shiogai on the bench. The World Cup is a grueling tournament spanning seven matches. You cannot win it with just 11 starters. On a stage where the quality of all 26 squad members matters, Shiogai's presence will provide an improvement of well over 1%.</p>
</div>

## What Shiogai Must Show with the National Team

The Scotland and England matches — in these two games, what is demanded of Shiogai is "results." Can he deliver goal-scoring plays in the limited minutes of a substitute appearance? Can he unleash the same explosiveness he showed at NEC amid the tension of a first senior call-up? His performances in these two matches will determine his fate regarding World Cup squad selection.

<table class="schedule-table">
  <thead>
    <tr><th>Period</th><th>Club</th><th>Highlights</th></tr>
  </thead>
  <tbody>
    <tr><td>Through 2025</td><td>NEC Nijmegen (Netherlands)</td><td>Double-digit league goals from substitute appearances only (a first in history)</td></tr>
    <tr><td>January 2026 onward</td><td>VfL Wolfsburg (Germany)</td><td>Transferred to Bundesliga for 1.85 billion yen</td></tr>
    <tr><td>March 2026</td><td>Japan National Team</td><td>Surprise first call-up for final pre-World Cup tour</td></tr>
  </tbody>
</table>

---

Twenty-one years old. A young man with everything ahead of him has taken his first step toward the biggest stage in world football. Remember the name Kento Shiogai.

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li><strong>Kento Shiogai</strong> set an unprecedented record of double-digit league goals from substitute appearances alone at <strong>NEC Nijmegen</strong>, then transferred to <strong>VfL Wolfsburg</strong> in January 2026 for 1.85 billion yen. The 21-year-old forward received a surprise first call-up in March, with manager Moriyasu citing Shiogai's value as a "game-changer" who "increases the chances of winning by even 1%."</li>
    <li>If he delivers results in the Scotland and England matches, a spot in the World Cup squad becomes a real possibility.</li>
    <li>His aptitude as a super sub who can "instantly shift into top gear" makes him a significant asset for the long haul of a World Cup tournament.</li>
  </ul>
</div>`,
  },
  {
    id: "12",
    slug: "ando-out-hashioka-in-march-2026",
    title: "安藤智哉が離脱、橋岡大樹が追加招集——英国遠征メンバーに変更",
    titleEn: "Ando Withdraws, Hashioka Called Up — Changes to the British Tour Squad",
    excerpt: "ザンクトパウリDF安藤智哉が怪我により英国遠征不参加が決定。代わりにKAAヘントDF橋岡大樹が追加招集された。深刻なDF陣の怪我人続出の中、W杯前最後の試合に臨む。",
    excerptEn: "St. Pauli defender Tomoya Ando has been ruled out of the British tour due to injury. KAA Gent defender Daiki Hashioka has been called up as his replacement. With a serious wave of defensive injuries, Japan faces its final pre-World Cup matches under difficult circumstances.",
    category: "日本代表",
    tags: ["安藤智哉", "橋岡大樹", "KAAヘント", "ザンクトパウリ", "イギリス遠征", "W杯2026", "怪我"],
    tagsEn: ["Tomoya Ando", "Daiki Hashioka", "KAA Gent", "St. Pauli", "British Tour", "World Cup 2026", "Injury"],
    publishedAt: "2026-03-24",
    updatedAt: "2026-03-24",
    isPopular: true,
    sources: [
      { name: "JFA公式サイト", url: "https://www.jfa.jp/samuraiblue/" },
      { name: "FIFA.com", url: "https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/26" },
    ],
    content: `## またも負傷者——安藤智哉が英国遠征を離脱

日本サッカー協会（JFA）は3月24日、ドイツのザンクトパウリに所属するDF**安藤智哉**（24）が怪我のため、英国遠征メンバーから離脱することを発表した。安藤は3月22日のブンデスリーガ・フライブルク戦に先発出場し自身初のアシストを記録するも、89分に途中交代。その後の検査で怪我が判明し、遠征不参加が決定した。

<div class="stat-box">
<span class="stat-number">6名離脱</span>
<span class="stat-label">安藤智哉 離脱の経緯</span>
<p class="stat-body">3月22日：ブンデスリーガ第27節フライブルク戦に先発、初アシスト記録も89分に負傷交代。3月24日：JFAが英国遠征離脱を正式発表。</p>
</div>

## 代わりに橋岡大樹を追加招集

安藤の離脱を受け、代わりにベルギー・KAAヘントに所属するDF**橋岡大樹**（26）が追加招集された。橋岡は今回のW杯アジア最終予選でも重要な役割を担った実績がある。

<div class="quote-box">
<span class="quote-label">INSIGHT</span>
<p class="quote-body"><strong>橋岡大樹 プロフィール</strong> — 1999年5月17日生まれ（26歳）、身長180cm。現所属はベルギー・KAAヘント。右SBとして攻守にわたる運動量と対人守備の強度が持ち味。2025年10月以来の代表復帰となる。</p>
</div>

## 深刻なDF陣の負傷者続出——W杯前に募る不安

今回の英国遠征を前に、日本代表のDF陣は深刻な負傷者問題を抱えている。

<div class="absent-list">
  <div class="absent-item">
    <span class="absent-name">板倉滉</span>
    <span class="absent-club">ボルシアMG</span>
    <span class="absent-reason">離脱済み</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">高井幸大</span>
    <span class="absent-club">川崎フロンターレ</span>
    <span class="absent-reason">離脱済み</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">長友佑都</span>
    <span class="absent-club">FC東京</span>
    <span class="absent-reason">離脱済み</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">町田浩樹</span>
    <span class="absent-club">ユニオンSG</span>
    <span class="absent-reason">離脱済み</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">冨安健洋</span>
    <span class="absent-club">アヤックス</span>
    <span class="absent-reason">出場可否未定（3月22日フェイエノールト戦で負傷交代）</span>
  </div>
  <div class="absent-item">
    <span class="absent-name">安藤智哉</span>
    <span class="absent-club">ザンクトパウリ</span>
    <span class="absent-reason">今回離脱（3月24日発表）</span>
  </div>
</div>

## 対戦スケジュール（英国遠征）

| 日時 | 対戦相手 | 会場 |
|------|---------|------|
| 3月28日（土）17:00現地 / 29日 2:00（日本時間） | スコットランド | ハムデン・パーク（グラスゴー） |
| 3月31日（月）19:45現地 / 4月1日 3:45（日本時間） | イングランド | ウェンブリー・スタジアム（ロンドン） |

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>DF6名が離脱・出場不透明——W杯3カ月前の危機的状況</strong> — <strong>板倉滉</strong>、<strong>高井幸大</strong>、<strong>長友佑都</strong>、<strong>町田浩樹</strong>、<strong>安藤智哉</strong>の5名が離脱済み。さらに<strong>冨安健洋</strong>も出場可否が未定という異常事態だ。W杯本番まで約3カ月というタイミングでDF陣の半数近くが揃わない状況は、守備の組み合わせテストという遠征の目的を根底から揺るがす。森保監督にとって、限られたDF陣で最適な組み合わせを見つけるという難題が突きつけられている。</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>橋岡大樹の追加招集——「準備していた男」の真価</strong> — 安藤の離脱で追加招集された<strong>橋岡大樹</strong>は、<strong>KAAヘント</strong>で右SBとして安定したパフォーマンスを見せている。2025年10月以来の代表復帰となるが、W杯アジア最終予選での出場経験を持つ。「いつ呼ばれてもいい準備をしていた」という姿勢が、まさにこの緊急招集で試される。負傷者続出の中で結果を残せれば、W杯本大会メンバー入りの可能性が一気に高まる。</p>
</div>

<div class="quote-box">
<span class="quote-label">PERSPECTIVE</span>
<p class="quote-body"><strong>「怪我のマネジメント」がW杯の勝敗を分ける</strong> — 今回のDF陣の負傷者続出は、W杯前のコンディション管理の難しさを改めて浮き彫りにした。欧州のシーズン終盤は試合が密集し、選手の身体への負荷が最大化する時期だ。3月の親善試合で無理をさせれば本番に響き、温存すれば連携構築の時間を失う。<strong>森保監督</strong>にとって、6月のW杯開幕までの約80日間で全選手を最高のコンディションに仕上げるマネジメント力が、ピッチ上の戦術以上に重要な勝敗の鍵を握ることになる。</p>
</div>

<div class="takeaway-card">
  <div class="takeaway-label">KEY TAKEAWAYS</div>
  <ul>
    <li><strong>安藤智哉</strong>（<strong>ザンクトパウリ</strong>）がブンデスリーガ第27節フライブルク戦での負傷により英国遠征を離脱。代わりに<strong>橋岡大樹</strong>（<strong>KAAヘント</strong>）が追加招集された。</li>
    <li>日本代表のDF陣は板倉滉・高井幸大・長友佑都・町田浩樹・安藤の5名が離脱済み、冨安健洋も出場可否未定という深刻な状況にある。</li>
    <li>W杯本番まで約3カ月、限られたDF陣での守備構築と、選手のコンディション管理が森保ジャパンの最大の課題として浮上している。</li>
  </ul>
</div>`,
  },
];
