"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────
   とやっちFC × W杯2026 × 完全栄養食
   スポンサーシップ提案 一枚ペラ ページ
   ────────────────────────────────────────────── */

export default function ProposalPage() {
  const [showTips, setShowTips] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white selection:bg-[#E8192C]/30">
      {/* ティーチングモード切替 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setShowTips(!showTips)}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-white/20 transition-all"
        >
          {showTips ? "💡 解説を非表示" : "💡 解説を表示"}
        </button>
      </div>

      {/* ═══════════════════════════════════════
          SECTION 1: ヘッダー / フック
          秦式「表紙」= 一行で心を掴む
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* 背景アニメーション */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0d1f3c] to-[#0a0a1a]" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E8192C]/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0057A8]/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#00843D]/6 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
          {/* ロゴ＆ブランド */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8192C] to-[#ff4757] flex items-center justify-center font-black text-sm">
              T
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">Toyacchi FC</p>
              <p className="text-[10px] text-white/25">Partnership Proposal 2026</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-[10px] text-white/30">CONFIDENTIAL</p>
              <p className="text-[10px] text-white/20">2026.04</p>
            </div>
          </div>

          {/* メインキャッチ */}
          <div className="max-w-4xl">
            <p className="text-[#E8192C] font-bold text-sm tracking-[0.2em] uppercase mb-6">
              FIFA World Cup 2026 Partnership
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-8">
              <span className="text-white/90">W杯2026、</span>
              <br />
              <span className="bg-gradient-to-r from-[#E8192C] via-[#ff6b6b] to-[#E8192C] bg-clip-text text-transparent">
                47億人
              </span>
              <span className="text-white/90">が熱狂する舞台で</span>
              <br />
              <span className="text-white/60 text-3xl sm:text-4xl lg:text-5xl">
                &ldquo;食べるだけで勝てるカラダ&rdquo;を届けませんか。
              </span>
            </h1>

            <p className="text-white/40 text-base sm:text-lg max-w-2xl leading-relaxed">
              サッカーファン
              <span className="text-white/70 font-semibold">月間○○万人</span>
              が訪れるメディア
              「サムライフットボール」を活用した、完全栄養食ブランド向けタイアッププランのご提案。
            </p>
          </div>

          {/* KPI バッジ */}
          <div className="flex flex-wrap gap-3 mt-12">
            {[
              { label: "累計視聴者数（W杯2022）", value: "○○億人" },
              { label: "日本戦 平均視聴率", value: "○○%" },
              { label: "W杯期間 検索量増加", value: "○○倍" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-3"
              >
                <span className="text-white/90 font-black text-lg">{item.value}</span>
                <span className="text-white/40 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teaching Tip */}
        {showTips && (
          <TeachingTip position="bottom-left">
            <strong>秦式①「表紙＝フック」</strong>
            <br />
            ・相手の&quot;理想の未来&quot;をキャッチコピーで描く
            <br />
            ・数字を1つ入れる（視聴者数・視聴率等）
            <br />
            ・「あなたの商品が主役になれる場所がある」と思わせる
            <br />
            <span className="text-amber-300">→ ○○は実数値に差し替えてください</span>
          </TeachingTip>
        )}
      </section>

      {/* 区切り線 */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 2: 課題提起
          秦式「相手の痛みを言語化」
         ═══════════════════════════════════════ */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[#E8192C] font-black text-xs tracking-[0.3em] uppercase">Problem</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white/90 mb-4">
          完全栄養食マーケット、こんな課題はありませんか？
        </h2>
        <p className="text-white/30 text-sm mb-12 max-w-xl">
          急成長市場だからこそ、今このタイミングで「スポーツ×栄養」の文脈を押さえた企業が勝ちます。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: "01",
              title: "スポーツ文脈での\n認知が弱い",
              desc: "完全栄養食の市場規模は○○億円（前年比○○%増）。しかし「スポーツ×栄養」の文脈での想起率はわずか○○%。健康意識の高いスポーツファン層へのリーチが不十分です。",
              color: "#E8192C",
            },
            {
              num: "02",
              title: "W杯期間中の広告枠は\n大手に独占される",
              desc: "テレビCM・大手スポンサー枠は○○億円規模の大企業が独占。中堅ブランドが同じ「W杯の熱狂」に乗る手段が限られているのが現状です。",
              color: "#0057A8",
            },
            {
              num: "03",
              title: "ファン層への\nデジタル接点が少ない",
              desc: "サッカーファンの○○%がスマホで情報収集。しかし完全栄養食ブランドのSNS/Web施策でスポーツファンをターゲットにした事例はほぼありません。",
              color: "#00843D",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
            >
              <span
                className="text-5xl font-black opacity-10 absolute top-4 right-6"
                style={{ color: item.color }}
              >
                {item.num}
              </span>
              <h3 className="text-lg font-bold text-white/90 mb-4 whitespace-pre-line leading-snug">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {showTips && (
          <TeachingTip position="right">
            <strong>秦式②「課題提起」</strong>
            <br />
            ・相手が社内で「そうなんだよ…」と思う言葉で書く
            <br />
            ・業界データや市場規模を入れると刺さる
            <br />
            ・<span className="text-amber-300">提案先ごとにカスタマイズ</span>するだけで成約率が激変
            <br />
            例）BASE FOOD→コンビニ以外のチャネル / COMP→認知度向上
          </TeachingTip>
        )}
      </section>

      {/* 区切り */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 3: 解決策・提案内容
          秦式「課題に対する答えとしてサービスを提示」
         ═══════════════════════════════════════ */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[#0057A8] font-black text-xs tracking-[0.3em] uppercase">Solution</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white/90 mb-4">
          「W杯の熱狂」×「完全栄養」を繋ぐ3つの施策
        </h2>
        <p className="text-white/30 text-sm mb-12 max-w-xl">
          サムライフットボールが持つメディアアセットを活用し、W杯期間中の最大リーチを実現します。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 施策1 */}
          <div className="relative bg-gradient-to-b from-[#E8192C]/10 to-transparent border border-[#E8192C]/20 rounded-2xl p-8 hover:border-[#E8192C]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#E8192C]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#E8192C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">タイアップ記事制作</h3>
            <p className="text-[#E8192C]/60 text-xs font-bold mb-4">→ 課題①「認知が弱い」を解決</p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex gap-2">
                <span className="text-[#E8192C] mt-0.5">&#10003;</span>
                W杯特設コンテンツ内に御社商品のタイアップ記事を○本掲載
              </li>
              <li className="flex gap-2">
                <span className="text-[#E8192C] mt-0.5">&#10003;</span>
                「選手の食事管理」「試合日の完全栄養メシ」等のSEO記事を制作
              </li>
              <li className="flex gap-2">
                <span className="text-[#E8192C] mt-0.5">&#10003;</span>
                検索トラフィックを御社LPに自然誘導
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-white/20 text-xs">想定効果</p>
              <p className="text-white/70 font-bold text-lg">月間○○万 imp</p>
            </div>
          </div>

          {/* 施策2 */}
          <div className="relative bg-gradient-to-b from-[#0057A8]/10 to-transparent border border-[#0057A8]/20 rounded-2xl p-8 hover:border-[#0057A8]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#0057A8]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#0057A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 6v2m0-2a2 2 0 100-4m0 4a2 2 0 110-4m10-2V2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 6v2m0-2a2 2 0 100-4m0 4a2 2 0 110-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">SNSコラボ企画</h3>
            <p className="text-[#0057A8]/60 text-xs font-bold mb-4">→ 課題③「デジタル接点が少ない」を解決</p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex gap-2">
                <span className="text-[#0057A8] mt-0.5">&#10003;</span>
                X / YouTube での「W杯観戦×完全栄養食」コラボ投稿
              </li>
              <li className="flex gap-2">
                <span className="text-[#0057A8] mt-0.5">&#10003;</span>
                「観戦メシ企画」「選手栄養クイズ」等の参加型コンテンツ
              </li>
              <li className="flex gap-2">
                <span className="text-[#0057A8] mt-0.5">&#10003;</span>
                W杯の試合日に合わせたリアルタイム投稿
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-white/20 text-xs">想定効果</p>
              <p className="text-white/70 font-bold text-lg">○○万 エンゲージメント</p>
            </div>
          </div>

          {/* 施策3 */}
          <div className="relative bg-gradient-to-b from-[#00843D]/10 to-transparent border border-[#00843D]/20 rounded-2xl p-8 hover:border-[#00843D]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#00843D]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#00843D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white/90 mb-2">サイト内広告枠</h3>
            <p className="text-[#00843D]/60 text-xs font-bold mb-4">→ 課題②「広告枠が大手独占」を解決</p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex gap-2">
                <span className="text-[#00843D] mt-0.5">&#10003;</span>
                サムライフットボール全ページにバナー広告を掲載
              </li>
              <li className="flex gap-2">
                <span className="text-[#00843D] mt-0.5">&#10003;</span>
                日本戦ページ・選手ページ等の高トラフィックページに優先配置
              </li>
              <li className="flex gap-2">
                <span className="text-[#00843D] mt-0.5">&#10003;</span>
                大手スポンサー費用の<span className="text-[#00843D] font-bold">1/100以下</span>のコストで同じ「W杯の文脈」に露出
              </li>
            </ul>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-white/20 text-xs">想定効果</p>
              <p className="text-white/70 font-bold text-lg">月間○○万 PV</p>
            </div>
          </div>
        </div>

        {showTips && (
          <TeachingTip position="right">
            <strong>秦式③「解決策」</strong>
            <br />
            ・課題と1対1で対応させる（課題①→施策①）
            <br />
            ・具体的な施策名を書く
            <br />
            ・「御社は何もしなくていい」感を出す
            <br />
            ・<span className="text-amber-300">想定効果を数字で明示</span>
          </TeachingTip>
        )}
      </section>

      {/* 区切り */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 4: 実績・信頼の証拠
          秦式「数字・事例で信じさせる」
         ═══════════════════════════════════════ */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-[#00843D] font-black text-xs tracking-[0.3em] uppercase">Evidence</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white/90 mb-4">
          なぜ「サムライフットボール」なのか
        </h2>
        <p className="text-white/30 text-sm mb-12 max-w-xl">
          W杯2026に特化した日本最大級のファンメディアとして、確かな実績があります。
        </p>

        {/* 数字カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "○○万", label: "月間PV", sub: "Google Analytics実測値" },
            { value: "○○万", label: "月間UU", sub: "ユニークユーザー数" },
            { value: "○○%", label: "20-40代男性比率", sub: "コアターゲット一致率" },
            { value: "○○位", label: "W杯関連 検索順位", sub: "主要キーワード平均" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center hover:bg-white/[0.05] transition-all"
            >
              <p className="text-3xl sm:text-4xl font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-white/70 text-sm font-bold mt-2">{stat.label}</p>
              <p className="text-white/25 text-[10px] mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* メディアの強み */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <h3 className="text-white/70 font-bold text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8192C]" />
              サイト掲載コンテンツ
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "○○+", label: "W杯出場国 分析記事" },
                { num: "○○+", label: "選手プロフィール" },
                { num: "○○+", label: "日本代表 特集記事" },
                { num: "○○+", label: "Jリーグ関連記事" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-white/80 font-black text-xl">{item.num}</p>
                  <p className="text-white/30 text-xs">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8">
            <h3 className="text-white/70 font-bold text-sm mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0057A8]" />
              SNSアカウント実績
            </h3>
            <div className="space-y-4">
              {[
                { platform: "X (Twitter)", followers: "○○人", engagement: "○○%" },
                { platform: "YouTube", followers: "○○人", engagement: "○○%" },
                { platform: "Instagram", followers: "○○人", engagement: "○○%" },
              ].map((sns) => (
                <div key={sns.platform} className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">{sns.platform}</span>
                  <div className="flex gap-6">
                    <div className="text-right">
                      <p className="text-white/80 font-bold text-sm">{sns.followers}</p>
                      <p className="text-white/20 text-[10px]">フォロワー</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 font-bold text-sm">{sns.engagement}</p>
                      <p className="text-white/20 text-[10px]">エンゲージメント率</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ポテンシャル */}
        <div className="bg-gradient-to-r from-[#E8192C]/5 via-[#0057A8]/5 to-[#00843D]/5 border border-white/[0.06] rounded-2xl p-8">
          <h3 className="text-white/70 font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            W杯期間中のポテンシャル予測
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-white/30 text-xs mb-1">W杯2022実績 → 2026予測</p>
              <p className="text-white/80 font-bold">
                PV <span className="text-amber-400">○○倍</span> 増加
              </p>
              <p className="text-white/25 text-xs mt-1">
                ※2022年大会期間中の実測トラフィック増加率をベースに算出
              </p>
            </div>
            <div>
              <p className="text-white/30 text-xs mb-1">W杯期間 想定月間PV</p>
              <p className="text-white/80 font-bold">
                <span className="text-amber-400">○○万</span> PV / 月
              </p>
              <p className="text-white/25 text-xs mt-1">
                ※通常月PVの○○倍として算出
              </p>
            </div>
            <div>
              <p className="text-white/30 text-xs mb-1">タイアップ記事 想定CVR</p>
              <p className="text-white/80 font-bold">
                <span className="text-amber-400">○○%</span>
              </p>
              <p className="text-white/25 text-xs mt-1">
                ※同規模メディアのタイアップ記事平均CVRを参考
              </p>
            </div>
          </div>
        </div>

        {showTips && (
          <TeachingTip position="right">
            <strong>秦式④「実績・証拠」</strong>
            <br />
            ・数字は「大きく見せる」より「相手に関係ある」ものを選ぶ
            <br />
            ・<span className="text-amber-300">「20-40代男性が多い」は完全栄養食メーカーに超刺さる</span>
            <br />
            ・実績が少なければ「ポテンシャル数字」を使う
            <br />
            ・GA/Search Console/SNS分析から洗い出して3つ厳選
          </TeachingTip>
        )}
      </section>

      {/* 区切り */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════
          SECTION 5: プラン・料金・CTA
          秦式「条件・次のアクション」
         ═══════════════════════════════════════ */}
      <section className="relative max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <span className="text-amber-400 font-black text-xs tracking-[0.3em] uppercase">Plan &amp; Pricing</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white/90 mb-12">
          3つのプランをご用意しています
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* ライト */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all">
            <p className="text-white/30 text-xs font-bold tracking-wider uppercase mb-2">Light</p>
            <h3 className="text-xl font-bold text-white/90 mb-1">ライトプラン</h3>
            <p className="text-3xl font-black text-white/80 mb-6">
              ○○<span className="text-base font-normal text-white/30">万円〜</span>
            </p>
            <ul className="space-y-3 text-white/40 text-sm">
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>タイアップ記事 ○本</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>バナー掲載 ○ヶ月</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>月次レポート</li>
            </ul>
          </div>

          {/* スタンダード（推奨） */}
          <div className="relative bg-gradient-to-b from-[#E8192C]/10 to-transparent border-2 border-[#E8192C]/40 rounded-2xl p-8 scale-[1.02]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8192C] text-white text-[10px] font-black px-4 py-1 rounded-full tracking-wider uppercase">
              Recommended
            </div>
            <p className="text-[#E8192C]/50 text-xs font-bold tracking-wider uppercase mb-2">Standard</p>
            <h3 className="text-xl font-bold text-white/90 mb-1">スタンダードプラン</h3>
            <p className="text-3xl font-black text-white/80 mb-6">
              ○○<span className="text-base font-normal text-white/30">万円〜</span>
            </p>
            <ul className="space-y-3 text-white/50 text-sm">
              <li className="flex gap-2"><span className="text-[#E8192C]">&#10003;</span>タイアップ記事 ○本</li>
              <li className="flex gap-2"><span className="text-[#E8192C]">&#10003;</span>SNSコラボ投稿 ○回</li>
              <li className="flex gap-2"><span className="text-[#E8192C]">&#10003;</span>バナー掲載 ○ヶ月</li>
              <li className="flex gap-2"><span className="text-[#E8192C]">&#10003;</span>週次レポート</li>
              <li className="flex gap-2"><span className="text-[#E8192C]">&#10003;</span>W杯特設ページ内 専用枠</li>
            </ul>
          </div>

          {/* プレミアム */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:border-white/10 transition-all">
            <p className="text-white/30 text-xs font-bold tracking-wider uppercase mb-2">Premium</p>
            <h3 className="text-xl font-bold text-white/90 mb-1">プレミアムプラン</h3>
            <p className="text-3xl font-black text-white/80 mb-6">
              ○○<span className="text-base font-normal text-white/30">万円〜</span>
            </p>
            <ul className="space-y-3 text-white/40 text-sm">
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>スタンダード全内容</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>独占スポンサー表記</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>オリジナル動画制作 ○本</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>メルマガ配信</li>
              <li className="flex gap-2"><span className="text-white/20">&#9632;</span>リアルイベント協賛枠</li>
            </ul>
          </div>
        </div>

        {/* 早期特典 */}
        <div className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-400/20 rounded-2xl p-8 mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-400/10 flex items-center justify-center">
              <span className="text-amber-400 text-2xl">&#9200;</span>
            </div>
            <div>
              <h3 className="text-white/90 font-bold text-lg">早期契約特典</h3>
              <p className="text-white/40 text-sm">
                <span className="text-amber-400 font-bold">2026年○月末まで</span>にご契約いただいた企業様は、
                全プラン<span className="text-amber-400 font-bold">○○%OFF</span>でご提供。
                W杯開幕（2026年6月11日）に向けた準備期間を確保いただけます。
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/30 text-sm mb-6">
            まずは30分のオンラインMTGで、御社に最適なプランをご提案させてください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:example@toyacchi-fc.com"
              className="inline-flex items-center gap-2 bg-[#E8192C] hover:bg-[#c81525] text-white font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#E8192C]/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              無料相談を予約する
            </a>
            <span className="text-white/20 text-sm">or</span>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-bold px-8 py-4 rounded-full transition-all"
            >
              資料をダウンロード (PDF)
            </a>
          </div>
          <p className="text-white/15 text-xs mt-8">
            ※ 料金は税別表記です。詳細はお打ち合わせにて調整いたします。
          </p>
        </div>

        {showTips && (
          <TeachingTip position="right">
            <strong>秦式⑤「条件・CTA」</strong>
            <br />
            ・料金は「幅」で書く（確定額は商談で詰める）
            <br />
            ・<span className="text-amber-300">W杯は開幕日が決まっているので期限付き特典が最強</span>
            <br />
            ・CTAは「契約して」ではなく「まず話しましょう」→ハードルを下げる
            <br />
            ・松竹梅の3段階で「真ん中を選ばせる」心理を使う
          </TeachingTip>
        )}
      </section>

      {/* ═══════════════════════════════════════
          フッター
         ═══════════════════════════════════════ */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E8192C] to-[#ff4757] flex items-center justify-center font-black text-xs">
              T
            </div>
            <div>
              <p className="text-white/50 text-sm font-bold">とやっちFC</p>
              <p className="text-white/20 text-[10px]">サムライフットボール 運営</p>
            </div>
          </div>
          <div className="text-right text-white/20 text-xs">
            <p>お問い合わせ: example@toyacchi-fc.com</p>
            <p>© 2026 Toyacchi FC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Teaching Tip Component ─── */
function TeachingTip({
  children,
  position = "right",
}: {
  children: React.ReactNode;
  position?: "right" | "bottom-left";
}) {
  return (
    <div
      className={`mt-8 mx-auto max-w-2xl ${
        position === "bottom-left" ? "ml-6" : ""
      }`}
    >
      <div className="bg-amber-500/10 border border-amber-400/20 rounded-xl p-5 text-amber-200/80 text-xs leading-relaxed">
        <div className="flex items-start gap-3">
          <span className="text-amber-400 text-base flex-shrink-0 mt-0.5">&#128161;</span>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
