---
name: create-player-article
description: サッカー選手の紹介記事を生成して articles.ts に追加する。選手名を指定するとWeb検索でリサーチし、日英バイリンガルの記事を自動生成する。
argument-hint: "[選手名]"
---

# サッカー選手紹介記事の作成

ユーザーが指定した選手の紹介記事を生成し、`/src/data/articles.ts` に追加します。

## 手順

### 1. ユーザーから情報を収集

以下の情報をユーザーから取得してください（未指定の場合は Web 検索で調査）:

- **選手名**（必須）
- **所属クラブ**
- **ポジション**
- **特に取り上げたいトピックやエピソード**

### 2. 選手情報のリサーチ

WebSearch ツールを使って以下の最新情報を調査してください:

- 基本プロフィール（生年月日、身長/体重、出身地）
- 現在の所属クラブと過去の経歴（キャリアパス）
- 代表歴（A代表、年代別代表）
- 今シーズンの成績（出場試合数、得点、アシスト）
- 特徴的なプレースタイル
- 最近の注目エピソードやニュース
- 情報ソースのURL（sources用）

### 3. 記事データの生成

以下の形式で記事オブジェクトを作成:

```typescript
{
  id: "タイムスタンプベースのユニークID",
  slug: "選手名のローマ字-profile",  // 例: "kubo-takefusa-profile"
  title: "キャッチーな日本語タイトル（——区切りで副題をつける）",
  titleEn: "English title",
  excerpt: "日本語の概要（1〜2文、150字以内）",
  excerptEn: "English excerpt",
  category: "選手紹介" as const,
  tags: ["選手名", "所属クラブ", "日本代表", "W杯2026", ...関連タグ],
  tagsEn: ["Player Name", "Club Name", "Japan National Team", "World Cup 2026", ...],
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

### 4. コンテンツ（content）の構成

以下の構成で日本語の本文を作成してください。Markdownと埋め込みHTMLを使用:

```
[導入文 — 選手の魅力を一文で掴む印象的な書き出し（2〜3段落）]

<table class="profile-table">
  <tbody>
    <tr><th>名前</th><td>選手名（ふりがな）</td></tr>
    <tr><th>生年月日</th><td>YYYY年M月D日（XX歳）</td></tr>
    <tr><th>出身地</th><td>出身地</td></tr>
    <tr><th>身長/体重</th><td>XXXcm / XXkg</td></tr>
    <tr><th>ポジション</th><td>ポジション</td></tr>
    <tr><th>現所属</th><td>クラブ名（リーグ名）</td></tr>
    <tr><th>代表歴</th><td>代表情報</td></tr>
  </tbody>
</table>

## セクション1：経歴の始まり（ユース〜プロデビュー）
[2〜3段落]

## セクション2：キャリアの転機・現在の活躍
[2〜3段落]

<div class="highlight-box">
<span class="point-label">POINT 1</span>
<span class="point-title">選手の特徴的な強み</span>
<p class="point-body">具体的なデータやエピソードを交えた解説。<strong>重要なキーワード</strong>は太字に。</p>
</div>

<div class="highlight-box">
<span class="point-label">POINT 2</span>
<span class="point-title">もう一つの注目ポイント</span>
<p class="point-body">別の角度からの分析。</p>
</div>

## セクション3：代表での役割・W杯への展望
[2〜3段落]

<table class="schedule-table">
  <thead><tr><th>年</th><th>所属</th><th>リーグ</th><th>試合</th><th>得点</th></tr></thead>
  <tbody>
    <tr><td>20XX</td><td>クラブ名</td><td>リーグ名</td><td>XX</td><td>X</td></tr>
    <!-- キャリアの主要シーズンを記載 -->
  </tbody>
</table>

## セクション4：まとめ・W杯での期待
[1〜2段落、力強い締めくくり]

<div class="takeaway-card">
<span class="point-label">TAKEAWAY</span>
<span class="point-title">この選手の注目ポイントまとめ</span>
<p class="point-body">読者に伝えたい要点を3つ程度にまとめる。</p>
</div>
```

### 5. contentEn の作成

content の英語版を作成。直訳ではなく、英語圏の読者に自然に読める文体で:
- プロフィール表の項目名も英語化（Name, Date of Birth, Hometown, Height/Weight, Position, Current Club, International Career）
- POINT / TAKEAWAY のラベルはそのまま英語
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

- 文体は「読み応えのあるスポーツジャーナリズム」を目指す（硬すぎず、軽すぎず）
- 事実に基づいた記述を心がけ、推測や憶測は避ける
- W杯2026への展望を必ず含める（サイトのテーマ）
- 1記事あたり2000〜3000字程度（日本語）を目安にする
- content 内の文字列でバッククォートを使う場合は `\`` にエスケープすること
- `${` が含まれる場合は `\${` にエスケープすること
