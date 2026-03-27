---
name: create-news-article
description: サッカーニュース記事を生成して articles.ts に追加する。トピックを指定するとWeb検索でリサーチし、日英バイリンガルのニュース記事を自動生成する。
argument-hint: "[ニュースのトピック]"
---

# サッカーニュース記事の作成

ユーザーが指定したトピックのニュース記事を生成し、`/src/data/articles.ts` に追加します。

## 手順

### 1. ユーザーから情報を収集

以下の情報をユーザーから取得してください:

- **ニュースのトピック**（必須）— 例: 移籍情報、試合結果、大会情報、戦術分析など
- **カテゴリ**（以下から選択、未指定ならトピックから推定）:
  - `日本代表` — 代表チームに関するニュース
  - `Jリーグ` — 国内リーグのニュース
  - `W杯` — ワールドカップ関連
  - `海外組` — 海外で活躍する日本人選手
  - `コラム` — 分析・考察・意見記事
- **特に含めたい情報やデータ**

### 2. トピックのリサーチ

WebSearch ツールを使って以下の最新情報を調査:

- トピックの最新状況と事実関係
- 関連する統計データや数字
- 関係者のコメントや発言（引用可能なもの）
- 背景情報や文脈
- 情報ソースのURL（sources用）

### 3. 記事データの生成

以下の形式で記事オブジェクトを作成:

```typescript
{
  id: "タイムスタンプベースのユニークID",
  slug: "トピックを表す英語スラッグ",  // 例: "japan-world-cup-2026-group-stage-draw"
  title: "ニュースの核心を伝える日本語タイトル",
  titleEn: "English title",
  excerpt: "日本語の概要（1〜2文、150字以内）",
  excerptEn: "English excerpt",
  category: "日本代表" as const,  // 適切なカテゴリを選択
  tags: ["関連タグ1", "関連タグ2", ...],
  tagsEn: ["Tag1", "Tag2", ...],
  publishedAt: "今日の日付（YYYY-MM-DD形式）",
  updatedAt: "今日の日付（YYYY-MM-DD形式）",
  isPopular: false,
  sources: [
    { name: "ソース名", url: "https://..." },
    // 最低2つのソースを含める
  ],
  content: `（下記のコンテンツ構成に従う）`,
  contentEn: `（contentの英語版）`,
}
```

### 4. コンテンツ（content）の構成 — ニュース記事の種類別テンプレート

#### A. 速報・ストレートニュース（移籍、結果、発表など）

```
[リード文 — 5W1Hを含む要約（1段落）]

## 概要：何が起きたか
[事実の詳細（2〜3段落）]

<div class="highlight-box">
<span class="point-label">POINT</span>
<span class="point-title">このニュースの重要ポイント</span>
<p class="point-body">なぜこれが重要なのか、具体的な影響を解説。</p>
</div>

## 背景と経緯
[このニュースに至った背景（2〜3段落）]

## 数字で見る
<table class="schedule-table">
  <thead><tr><th>項目</th><th>データ</th></tr></thead>
  <tbody>
    <tr><td>関連する統計1</td><td>数値</td></tr>
    <!-- 必要な統計データ -->
  </tbody>
</table>

## 今後の展望
[今後どうなるか、影響の見通し（1〜2段落）]

<div class="takeaway-card">
<span class="point-label">TAKEAWAY</span>
<span class="point-title">まとめ</span>
<p class="point-body">読者が押さえるべき要点を簡潔に。</p>
</div>
```

#### B. 分析・コラム記事

```
[導入 — 問題提起や注目すべきテーマの提示（1〜2段落）]

## テーマの概要
[何について分析するか（1〜2段落）]

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">分析ポイント1</span>
<p class="point-body">データや根拠に基づいた分析。</p>
</div>

## 詳細分析
[深掘り（2〜3段落）]

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">分析ポイント2</span>
<p class="point-body">別の切り口からの分析。</p>
</div>

<div class="quote-box">
<p>関係者の発言や印象的な引用</p>
</div>

## データで見る
<table class="schedule-table">
  <!-- 比較データや統計 -->
</table>

## 結論：W杯への影響
[W杯2026との関連を踏まえた結論（1〜2段落）]

<div class="takeaway-card">
<span class="point-label">TAKEAWAY</span>
<span class="point-title">この分析から言えること</span>
<p class="point-body">要点を3つ程度にまとめる。</p>
</div>
```

#### C. 試合レポート

```
[リード文 — スコア、対戦カード、一言で伝える試合の印象]

<table class="profile-table">
  <tbody>
    <tr><th>大会</th><td>大会名</td></tr>
    <tr><th>対戦</th><td>チームA vs チームB</td></tr>
    <tr><th>スコア</th><td>X - X</td></tr>
    <tr><th>日時</th><td>YYYY年M月D日</td></tr>
    <tr><th>会場</th><td>スタジアム名</td></tr>
    <tr><th>得点者</th><td>選手名（XX分）, ...</td></tr>
  </tbody>
</table>

## 試合展開
[前半・後半の流れ（2〜3段落）]

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">試合のキープレー</span>
<p class="point-body">ターニングポイントとなったシーンの解説。</p>
</div>

## 選手評価
<table class="schedule-table">
  <thead><tr><th>選手</th><th>評価</th><th>コメント</th></tr></thead>
  <tbody>
    <tr><td>選手名</td><td>7.5</td><td>短評</td></tr>
    <!-- 主要選手 -->
  </tbody>
</table>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">戦術的な注目点</span>
<p class="point-body">フォーメーションや戦術の分析。</p>
</div>

## 次の試合に向けて
[今後の展望（1段落）]

<div class="takeaway-card">
<span class="point-label">TAKEAWAY</span>
<span class="point-title">この試合のポイント</span>
<p class="point-body">要点まとめ。</p>
</div>
```

### 5. contentEn の作成

content の英語版を作成。直訳ではなく、英語圏の読者に自然に読める文体で:
- 表の項目名も英語化
- POINT / TAKEAWAY のラベルはそのまま
- 固有名詞は英語表記に統一

### 6. articles.ts への追加

1. `/src/data/articles.ts` を読み込む
2. `articles` 配列の**先頭**（最新記事として）に新しい記事オブジェクトを追加
3. 既存の slug と重複しないことを確認
4. TypeScript の型に準拠していることを確認

### 7. 確認

- ビルドエラーがないか `npm run build` で確認（エスケープ文字の問題に注意）
- content 内のバッククォート `` ` `` やテンプレートリテラル `${}` はエスケープが必要: `` \` `` や `\${}`

## 注意事項

- ニュース記事は「正確さ」と「速報性」を重視
- 事実と意見は明確に区別する
- 数字やデータを積極的に使い、説得力のある記事にする
- W杯2026との関連性を可能な限り含める（サイトのテーマ）
- 1記事あたり1500〜3000字程度（日本語）を目安にする
- content 内の文字列でバッククォートを使う場合は `\`` にエスケープすること
- `${` が含まれる場合は `\${` にエスケープすること
