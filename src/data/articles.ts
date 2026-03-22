export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "日本代表" | "Jリーグ" | "W杯" | "海外組" | "コラム";
  tags: string[];
  publishedAt: string;
  isPopular?: boolean;
  thumbnail?: string;
};

export const articles: Article[] = [
  {
    id: "1",
    slug: "japan-2026-uk-tour",
    title: "【完全版】日本代表3月招集メンバー28人発表｜W杯前最後の試金石、冨安復帰・塩貝初招集の意味",
    excerpt: "3月19日、JFAが発表した28人のメンバーを徹底分析。約1年9ヶ月ぶり復帰の冨安健洋、初招集の塩貝健人ら注目選手の選考背景を解説。",
    category: "日本代表",
    tags: ["冨安健洋", "塩貝健人", "イギリス遠征", "スコットランド", "イングランド", "森保一", "W杯2026"],
    publishedAt: "2026-03-22",
    isPopular: true,
    content: `## 森保ジャパン、W杯前最後のイギリス遠征メンバー28名を発表

3月19日、日本サッカー協会（JFA）は2026年FIFAワールドカップ前最後の強化活動となるイギリス遠征の招集メンバー28名を発表した。

<div class="highlight-box">
  <div class="point-label">POINT 1</div>
  <div class="point-title">冨安健洋、約1年9ヶ月ぶりの"待望の復帰"</div>
  <div class="point-body">最大のサプライズは、<strong>冨安健洋</strong>（アヤックス）の代表復帰だ。2025年にアーセナルからアヤックスへ移籍し、コンスタントに出場機会を得てきた冨安が、2024年6月以来約1年9ヶ月ぶりにサムライブルーのユニフォームに袖を通す。森保一監督は「冨安の経験値と対人守備の強さは替えが利かない。W杯本番を見据えて、チームに組み込む時間を確保したかった」とコメント。</div>
</div>

<div class="highlight-box">
  <div class="point-label">POINT 2</div>
  <div class="point-title">塩貝健人、20歳での"サプライズ初招集"</div>
  <div class="point-body">もう一つの話題が、ヴォルフスブルク所属の<strong>塩貝健人</strong>（20歳）の初招集だ。森保監督は「W杯に向けて、1%でも勝つ可能性を上げていくという意味で招集した。チャレンジして舞台を変えてステップアップしているところを評価した」と語った。W杯直前のこの時期に初招集された意味は重い。</div>
</div>

<div class="highlight-box">
  <div class="point-label">POINT 3</div>
  <div class="point-title">伊藤洋輝もバイエルンから約1年ぶりに復帰</div>
  <div class="point-body"><strong>伊藤洋輝</strong>（バイエルン・ミュンヘン）も復帰組。左利きのCBとしてブンデスリーガ王者で定位置を確保し、約1年3ヶ月ぶりの代表復帰となった。冨安とのCBコンビは、W杯本番での守備の柱となる可能性がある。</div>
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

<div class="summary-card">
  <div class="summary-label">SUMMARY</div>
  <p>W杯本番まで約3ヶ月。この遠征が実質的なW杯メンバー選考の最終テストとなる見通しだ。欧州トップレベルの2チームとのアウェー連戦は、チーム力を測る絶好の機会となるだろう。冨安・伊藤洋輝の復帰組がチームにどう組み込まれるか、塩貝がA代表の舞台でもゴールへの嗅覚を発揮できるか——注目ポイントは尽きない。</p>
</div>`,
  },
  {
    id: "2",
    slug: "shiogai-kento-story",
    title: "無名の高校生から、欧州を震わせる20歳へ——塩貝健人という物語",
    excerpt: "ユース昇格を逃した少年が、移籍金18.5億円でブンデスリーガへ。そして日本代表初招集。塩貝健人、20年間の物語。",
    category: "日本代表",
    tags: ["塩貝健人", "ヴォルフスブルク", "ブンデスリーガ", "日本代表", "W杯2026", "NECナイメヘン"],
    publishedAt: "2026-03-22",
    isPopular: true,
    content: `## 「ユース昇格できなかった少年」が夢を諦めなかった

2005年3月26日、東京都に生まれた塩貝健人は、幼少期からボールを蹴り続けた。バディSC江東でサッカーの基礎を学び、横浜FCジュニアユースへ進んだ。ここで彼は最初の挫折を経験する。中学卒業時、横浜FCユースへの昇格を果たせなかったのだ。

多くの選手がそこで夢を諦める。しかし塩貝は違った。國學院久我山高校へ進学した彼は、高校サッカーの舞台で静かに数字を叩き出した。シーズン通算では公式戦14試合出場・9ゴール。ヨーロッパのスカウトたちは見逃さなかった。

---

## 移籍金18.5億円——20歳以下日本人史上最高額でブンデスへ

2026年1月20日、VfLヴォルフスブルクへの移籍が決定。移籍金は推定1000万ユーロ（約18.5億円）。20歳以下の日本人選手としては史上最高額だ。背番号は「7」。かつて長谷部誠がプレーしたクラブで、塩貝健人は新たな歴史を刻もうとしていた。

---

## 「あとはゴールだけ」——ブンデスでの葛藤と本音

移籍後、塩貝はGoal.comの取材でこう語った。「一回も招集歴がないので、もう誰も文句が言えないぐらい結果を残さないといけない。同世代の選手が何人も（日本代表に）入っていて、すごく悔しさや焦りはあります。でも、自分も結果は出してきた。本当に、あとはゴールだけだと思っています」。

その言葉どおり、塩貝はブンデスリーガの舞台でゴールを積み重ねていった。

---

## そして、代表の扉が開いた

2026年3月19日、JFAが発表したイギリス遠征メンバー28名の中に、塩貝健人の名前があった。A代表初招集。ユース昇格を逃し、高校サッカーから這い上がり、オランダを経てドイツへ渡った20歳の青年が、ついにサムライブルーの一員となった。

森保一監督は「塩貝はゴール前での嗅覚が際立っている。年齢は関係ない。結果を出している選手を呼ぶのは当然のこと」とコメントした。

---

## まとめ

横浜FCユースに上がれなかった少年が、わずか数年後に移籍金18.5億円でブンデスリーガへ。そして日本代表初招集——。塩貝健人の物語は、夢を諦めなかったすべての若者への希望そのものだ。

W杯本番まで約3ヶ月。スコットランド戦、イングランド戦で塩貝がどんなプレーを見せるか。彼の物語は、まだ始まったばかりだ。`,
  },
];
