"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

type SectionId =
  | "entry"
  | "bag"
  | "prohibited"
  | "conduct"
  | "ticket"
  | "heat"
  | "fanfest"
  | "japan"
  | "visa"
  | "cost"
  | "transport"
  | "sources";

interface NavItem {
  id: SectionId;
  labelJa: string;
  labelEn: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: "entry", labelJa: "入場ルール", labelEn: "Entry Rules", icon: "🏟️" },
  { id: "bag", labelJa: "バッグポリシー", labelEn: "Bag Policy", icon: "👜" },
  { id: "prohibited", labelJa: "持ち込み禁止物", labelEn: "Prohibited Items", icon: "🚫" },
  { id: "conduct", labelJa: "禁止行為", labelEn: "Code of Conduct", icon: "⚖️" },
  { id: "ticket", labelJa: "チケット規則", labelEn: "Ticket Rules", icon: "🎫" },
  { id: "heat", labelJa: "暑さ対策", labelEn: "Heat Measures", icon: "🌡️" },
  { id: "fanfest", labelJa: "ファンフェスティバル", labelEn: "Fan Festival", icon: "🎉" },
  { id: "japan", labelJa: "日本代表日程", labelEn: "Japan Schedule", icon: "🇯🇵" },
  { id: "visa", labelJa: "渡航準備", labelEn: "Travel Prep", icon: "✈️" },
  { id: "cost", labelJa: "費用の目安", labelEn: "Cost Estimate", icon: "💰" },
  { id: "transport", labelJa: "交通・通信", labelEn: "Transport & Comms", icon: "🚆" },
  { id: "sources", labelJa: "出典一覧", labelEn: "Sources", icon: "📚" },
];

export default function FanGuidePage() {
  const { locale } = useLanguage();
  const t = (ja: string, en: string) => (locale === "en" ? en : ja);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen light" data-theme="light" style={{ colorScheme: "light", background: "linear-gradient(to bottom, #f9fafb, #ffffff)", color: "#1f2937" }}>
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-[#0057A8] via-[#003875] to-[#001d3d] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-blue-200 mb-3">
              FIFA World Cup 2026
            </p>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              {t("現地観戦 完全ガイド", "Stadium Fan Guide")}
            </h1>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {t(
                "FIFA公式ドキュメント＋各種メディアを基に、現地に行く人が知るべき全情報をまとめました",
                "Everything you need to know for attending matches, based on FIFA official documents and media sources"
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
              <span className="bg-[#ffffff]/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t("🇺🇸🇨🇦🇲🇽 3カ国16都市", "🇺🇸🇨🇦🇲🇽 3 Countries, 16 Cities")}
              </span>
              <span className="bg-[#ffffff]/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t("📅 2026年6月11日〜7月19日", "📅 Jun 11 – Jul 19, 2026")}
              </span>
              <span className="bg-[#ffffff]/15 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {t("⚽ 48カ国・104試合", "⚽ 48 Teams, 104 Matches")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#ffffff] border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="w-full px-4 py-3 text-sm font-medium text-[#374151] flex items-center justify-between"
        >
          <span>{t("📋 目次を開く", "📋 Table of Contents")}</span>
          <svg className={`w-4 h-4 transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileNavOpen && (
          <div className="px-4 pb-3 grid grid-cols-2 gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-xs px-3 py-2 rounded-lg bg-[#f9fafb] hover:bg-[#eff6ff] text-[#374151] hover:text-[#0057A8] transition-colors"
              >
                {item.icon} {locale === "en" ? item.labelEn : item.labelJa}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:flex lg:gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-56 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3 px-3">
              {t("目次", "Contents")}
            </p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="w-full text-left text-sm px-3 py-2 rounded-lg text-[#4b5563] hover:bg-[#eff6ff] hover:text-[#0057A8] transition-colors"
              >
                {item.icon} {locale === "en" ? item.labelEn : item.labelJa}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-10">
          {/* ======== 第1部ヘッダー ======== */}
          <div className="bg-gradient-to-r from-[#0057A8] to-[#003875] text-white rounded-2xl p-6">
            <h2 className="text-lg sm:text-xl font-bold">
              {t("第1部：FIFA公式ドキュメントに基づくルール", "Part 1: Rules Based on FIFA Official Documents")}
            </h2>
            <p className="text-sm text-blue-100 mt-1">
              {t(
                "Stadium Code of Conduct（35ページ）、チケット規約等の公式文書から抜粋",
                "Extracted from the Stadium Code of Conduct (35 pages), ticket terms, and official documents"
              )}
            </p>
          </div>

          {/* 1. 入場ルール */}
          <section id="entry">
            <SectionHeader icon="🏟️" titleJa="スタジアム入場時のルール" titleEn="Stadium Entry Rules" t={t} />
            <div className="space-y-5">
              <Card titleJa="入場に必要なもの" titleEn="Required for Entry" t={t}>
                <ul className="space-y-2">
                  <Li t={t}
                    ja="有効な試合チケット（FIFA公式チケットアプリのモバイルチケットのみ）"
                    en="Valid match ticket (mobile ticket via FIFA official ticket app only)"
                  />
                  <Li t={t}
                    ja="政府発行の写真付き身分証明書（海外からの観客はパスポート必携）"
                    en="Government-issued photo ID (international visitors must carry passport)"
                  />
                  <Li t={t}
                    ja="チケット記載の氏名と身分証が一致しない場合、入場拒否の可能性あり"
                    en="Entry may be refused if the name on the ticket doesn't match your ID"
                  />
                </ul>
              </Card>
              <Card titleJa="セキュリティ検査" titleEn="Security Screening" t={t}>
                <ul className="space-y-2">
                  <Li t={t}
                    ja="空港レベルのセキュリティ：金属探知機、ボディチェック、バッグ検査・スキャン"
                    en="Airport-level security: metal detectors, pat-downs, bag inspections & scans"
                  />
                  <Li t={t}
                    ja="監視カメラ、アクセス制御、デジタルチケット認証を全16会場で統一実施"
                    en="CCTV, access control, and digital ticket authentication at all 16 venues"
                  />
                  <Li t={t}
                    ja="スタジアム外周にフェンス付きセキュリティゾーンが設置"
                    en="Fenced security perimeter zones with metal detector gates"
                  />
                </ul>
              </Card>
              <AlertBox type="info" t={t}
                ja="推奨到着時間：キックオフの2〜3時間前"
                en="Recommended arrival: 2-3 hours before kickoff"
              />
            </div>
          </section>

          {/* 2. バッグポリシー */}
          <section id="bag">
            <SectionHeader icon="👜" titleJa="バッグポリシー（クリアバッグポリシー）" titleEn="Bag Policy (Clear Bag Policy)" t={t} />
            <p className="text-sm mb-4" style={{ color: "#4b5563" }}>
              {t("全16会場で「クリアバッグポリシー」が義務化。", "Clear Bag Policy is mandatory at all 16 venues.")}
            </p>
            <div className="rounded-2xl border border-gray-200 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-green-100" style={{ backgroundColor: "#f0fdf4" }}>
                    <th className="px-4 py-3 text-left text-[#166534] font-bold" colSpan={2}>
                      ✅ {t("持ち込みOK", "Allowed")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 font-medium w-1/2" style={{ color: "#374151" }}>
                      {t("透明プラスチック/ビニール/PVCバッグ", "Clear plastic/vinyl/PVC bags")}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#6b7280" }}>
                      {t("最大 30×30×15cm", "Max 12\"×12\"×6\"")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium" style={{ color: "#374151" }}>
                      {t("透明ジッパー袋（1ガロンサイズ）", "Clear zip-lock bags (1 gallon)")}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#6b7280" }}>
                      {t("最大 28×28cm", "Max 11\"×11\"")}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium" style={{ color: "#374151" }}>
                      {t("小型クラッチ/ウォレット（透明でなくてもOK）", "Small clutch/wallet (non-clear OK)")}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#6b7280" }}>
                      {t("最大 16.5×11.5cm", "Max 6.5\"×4.5\"")}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="w-full text-sm border-t border-gray-200">
                <thead>
                  <tr className="border-b border-red-100" style={{ backgroundColor: "#fef2f2" }}>
                    <th className="px-4 py-3 text-left text-[#991b1b] font-bold" colSpan={2}>
                      ❌ {t("持ち込みNG", "Not Allowed")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3" style={{ color: "#374151" }} colSpan={2}>
                      {t(
                        "不透明なバックパック、大型バッグ、スーツケース、リュックサック",
                        "Opaque backpacks, large bags, suitcases, rucksacks"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <AlertBox type="warning" t={t}
              ja="医療上の必要物（インスリン、エピペン等）は試合2週間前までに会場の医療チームに事前申請が必要。医師の診断書を持参し、専用入口でセキュリティ検査を受ける"
              en="Medical necessities (insulin, EpiPen, etc.) require prior application to the venue's medical team at least 2 weeks before the match. Bring a doctor's note and use the designated medical entrance."
            />
          </section>

          {/* 3. 持ち込み禁止物 */}
          <section id="prohibited">
            <SectionHeader icon="🚫" titleJa="持ち込み禁止物リスト" titleEn="Prohibited Items List" t={t} />
            <div className="space-y-4">
              <ProhibitedCategory t={t}
                titleJa="武器・危険物" titleEn="Weapons & Dangerous Items"
                items={[
                  { ja: "武器、ナイフ、はさみ、鋭利な物品", en: "Weapons, knives, scissors, sharp objects" },
                  { ja: "花火、発煙筒、煙玉、爆発物", en: "Fireworks, flares, smoke bombs, explosives" },
                  { ja: "違法薬物", en: "Illegal drugs" },
                  { ja: "レーザーポインター", en: "Laser pointers" },
                ]}
              />
              <ProhibitedCategory t={t}
                titleJa="電子機器・撮影機器" titleEn="Electronics & Recording Equipment"
                items={[
                  { ja: "ドローン・無人航空機", en: "Drones / UAVs" },
                  { ja: "GoPro・ビデオカメラ", en: "GoPro / video cameras" },
                  { ja: "三脚・一脚", en: "Tripods / monopods" },
                  { ja: "自撮り棒・あらゆる棒状のもの", en: "Selfie sticks / any stick-like objects" },
                  { ja: "プロ用カメラ（メディア認定なしの一眼レフ等）", en: "Professional cameras (DSLR without media accreditation)" },
                ]}
              />
              <ProhibitedCategory t={t}
                titleJa="飲食物" titleEn="Food & Beverages"
                items={[
                  { ja: "外部からの食品・飲料すべて（缶、ボトル、クーラーボックス含む）", en: "All outside food & beverages (cans, bottles, coolers)" },
                ]}
              />
              <ProhibitedCategory t={t}
                titleJa="騒音器具・投擲物" titleEn="Noisemakers & Projectiles"
                items={[
                  { ja: "ブブゼラ、エアホーン、ブルホーン、ノイズメーカー", en: "Vuvuzelas, air horns, bullhorns, noisemakers" },
                  { ja: "風船、ビーチボール、膨らませたサッカーボール", en: "Balloons, beach balls, inflated soccer balls" },
                ]}
              />
              <ProhibitedCategory t={t}
                titleJa="その他" titleEn="Other"
                items={[
                  { ja: "傘", en: "Umbrellas" },
                  { ja: "折りたたみ椅子", en: "Folding chairs" },
                  { ja: "ベビーカー・ベビーシート", en: "Strollers / baby seats" },
                  { ja: "ホバーボード、セグウェイ", en: "Hoverboards, Segways" },
                  { ja: "動物（介助犬を除く）", en: "Animals (except service dogs)" },
                  { ja: "ポール付きの大型旗（ポールなし手持ち旗はOK）", en: "Large flags with poles (hand-held flags without poles OK)" },
                ]}
              />

              <Card titleJa="持ち込みOKなもの" titleEn="Items You CAN Bring" t={t} accent="green">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    { ja: "スマートフォン", en: "Smartphones" },
                    { ja: "財布・鍵", en: "Wallet & keys" },
                    { ja: "小型モバイルバッテリー", en: "Small power banks" },
                    { ja: "通常の薬", en: "Regular medications" },
                    { ja: "サングラス・帽子", en: "Sunglasses & hats" },
                    { ja: "日焼け止め", en: "Sunscreen" },
                    { ja: "コンパクトカメラ", en: "Compact cameras" },
                    { ja: "旗・バナー（ポールなし）", en: "Flags/banners (no poles)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#374151]">
                      <span className="text-[#22c55e] text-xs">●</span>
                      {t(item.ja, item.en)}
                    </div>
                  ))}
                </div>
              </Card>

              <AlertBox type="danger" t={t}
                ja="スタジアムに保管サービスはなく、没収された物品は返却されません"
                en="There are no storage services at the stadium and confiscated items will NOT be returned"
              />
            </div>
          </section>

          {/* 4. 禁止行為 */}
          <section id="conduct">
            <SectionHeader icon="⚖️" titleJa="禁止行為・行動規範" titleEn="Code of Conduct" t={t} />
            <p className="text-sm mb-4" style={{ color: "#4b5563" }}>
              {t(
                "FIFA公式「FIFA World Cup 2026 Stadium Code of Conduct」（35ページ文書）に基づく。",
                "Based on the official \"FIFA World Cup 2026 Stadium Code of Conduct\" (35-page document)."
              )}
            </p>
            <Card titleJa="以下の行為は厳禁" titleEn="The Following Actions Are Strictly Prohibited" t={t} accent="red">
              <ul className="space-y-3">
                {[
                  { ja: "差別行為：人種差別、性差別、その他あらゆる差別的言動", en: "Discrimination: racism, sexism, and all discriminatory behavior" },
                  { ja: "ピッチへの侵入", en: "Pitch invasion" },
                  { ja: "投擲行為：フィールドや他の観客への物品の投げ入れ", en: "Throwing objects onto the field or at other spectators" },
                  { ja: "攻撃的・暴力的行為", en: "Offensive or violent behavior" },
                  { ja: "不適切な旗やバナーの掲示（政治的・攻撃的内容）", en: "Displaying inappropriate flags/banners (political or offensive content)" },
                  { ja: "無許可の商業活動（アンブッシュマーケティング含む）", en: "Unauthorized commercial activities (including ambush marketing)" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#374151]">
                    <span className="text-[#ef4444] mt-0.5 flex-shrink-0">✖</span>
                    {t(item.ja, item.en)}
                  </li>
                ))}
              </ul>
            </Card>
            <AlertBox type="warning" t={t}
              ja="反差別プロトコル：FIFA懲戒規程第15条に基づく3段階プロトコルが適用。差別的行為に対する最高罰金は500万スイスフラン（約8.5億円）"
              en="Anti-discrimination protocol: A 3-step protocol under FIFA Disciplinary Code Art. 15 applies. Maximum fine for discriminatory acts: CHF 5 million (~$5.7M)"
            />
          </section>

          {/* 5. チケット規則 */}
          <section id="ticket">
            <SectionHeader icon="🎫" titleJa="チケットに関する規則" titleEn="Ticket Regulations" t={t} />
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <StatCard t={t} labelJa="1試合あたり購入上限" labelEn="Per-match limit" value="4" unitJa="枚" unitEn="tickets" />
                <StatCard t={t} labelJa="全体の購入上限" labelEn="Overall limit" value="40" unitJa="枚" unitEn="tickets" />
              </div>
              <Card titleJa="重要ルール" titleEn="Important Rules" t={t}>
                <ul className="space-y-2">
                  <Li t={t}
                    ja="全販売は最終（All Sales Final）：決済後のキャンセル・返品は不可"
                    en="All Sales Final: No cancellations or refunds after payment processing"
                  />
                  <Li t={t}
                    ja="チケット形式：FIFA公式チケットアプリのモバイルチケットのみ有効"
                    en="Ticket format: Mobile ticket via FIFA official ticket app ONLY"
                  />
                  <Li t={t}
                    ja="転売はFIFA公式リセールプラットフォームのみ公認"
                    en="Resale only through FIFA's official resale platform"
                  />
                  <Li t={t}
                    ja="非公認チャネルで購入したチケットはFIFAにより予告なく無効化される"
                    en="Tickets from unauthorized channels may be voided by FIFA without notice"
                  />
                </ul>
              </Card>
              <Card titleJa="価格帯" titleEn="Price Range" t={t}>
                <ul className="space-y-2">
                  <Li t={t}
                    ja="ダイナミックプライシング採用（需要に応じ変動）"
                    en="Dynamic pricing (varies based on demand)"
                  />
                  <Li t={t}
                    ja="グループリーグ：約1万〜4万円程度"
                    en="Group stage: approx. $65–$270"
                  />
                  <Li t={t}
                    ja="決勝戦：最高6,730ドル（約100万円超）"
                    en="Final: up to $6,730"
                  />
                </ul>
              </Card>
              <AlertBox type="danger" t={t}
                ja="非公認サイトでのチケット購入は絶対にやめましょう。FIFAは予告なくチケットを無効化できます"
                en="NEVER buy tickets from unauthorized sites. FIFA can void tickets without notice"
              />
            </div>
          </section>

          {/* 6. 暑さ対策 */}
          <section id="heat">
            <SectionHeader icon="🌡️" titleJa="暑さ対策（会場側の措置）" titleEn="Heat Countermeasures" t={t} />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { ja: "WBGT 32°C以上で両ハーフに自動クーリングブレイク", en: "Auto cooling breaks in both halves when WBGT exceeds 32°C", icon: "⏸️" },
                { ja: "50mごとに無料の給水ステーション設置", en: "Free water stations every 50 meters", icon: "💧" },
                { ja: "ミストゾーン設置", en: "Mist zones installed", icon: "🌫️" },
                { ja: "スタジアム外に冷却バス配備", en: "Cooling buses stationed outside stadiums", icon: "🚌" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4 flex items-start gap-3" style={{ backgroundColor: "#ffffff" }}>
                  <span className="text-2xl">{item.icon}</span>
                  <p className="text-sm text-[#374151]">{t(item.ja, item.en)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. ファンフェスティバル */}
          <section id="fanfest">
            <SectionHeader icon="🎉" titleJa="FIFAファンフェスティバル" titleEn="FIFA Fan Festival" t={t} />
            <Card titleJa="概要" titleEn="Overview" t={t}>
              <ul className="space-y-2">
                <Li t={t} ja="チケット不要の無料パブリックビューイングエリア" en="Free public viewing area — no match ticket needed" />
                <Li t={t} ja="大型スクリーンで全試合を生中継" en="All matches broadcast live on giant screens" />
                <Li t={t} ja="毎晩のコンサート・ライブエンターテインメント" en="Nightly concerts & live entertainment" />
                <Li t={t} ja="地元フード・ドリンク販売（アルコール含む）" en="Local food & drink vendors (including alcohol)" />
                <Li t={t} ja="大会期間中39日間連続開催（6/11〜7/19）" en="39 consecutive days during the tournament (Jun 11 – Jul 19)" />
              </ul>
            </Card>
            <div className="mt-4 bg-[#ffffff] rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200" style={{ backgroundColor: "#f9fafb" }}>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "#374151" }}>{t("都市", "City")}</th>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "#374151" }}>{t("会場", "Venue")}</th>
                    <th className="px-4 py-3 text-left font-bold text-[#374151] hidden sm:table-cell">{t("期間", "Period")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { city: { ja: "ロサンゼルス", en: "Los Angeles" }, venue: { ja: "LAメモリアル・コロシアム → 市内各所", en: "LA Memorial Coliseum → citywide" }, period: "6/11–6/15 → 39 days" },
                    { city: { ja: "マイアミ", en: "Miami" }, venue: { ja: "Bayfront Park", en: "Bayfront Park" }, period: "6/13–7/5" },
                    { city: { ja: "フィラデルフィア", en: "Philadelphia" }, venue: { ja: "Lemon Hill, Fairmount Park", en: "Lemon Hill, Fairmount Park" }, period: { ja: "全39日間", en: "All 39 days" } },
                    { city: { ja: "カンザスシティ", en: "Kansas City" }, venue: { ja: "WWI Museum周辺（要事前登録）", en: "WWI Museum area (pre-registration req.)" }, period: { ja: "18日間", en: "18 days" } },
                    { city: { ja: "ニューヨーク", en: "New York" }, venue: { ja: "USTA Tennis Center → Rockefeller Center", en: "USTA Tennis Center → Rockefeller Center" }, period: "6/17–6/28 → 7/4–7/19" },
                    { city: { ja: "バンクーバー", en: "Vancouver" }, venue: { ja: "PNE", en: "PNE" }, period: { ja: "全期間", en: "Full duration" } },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 font-medium" style={{ color: "#111827" }}>
                        {t(row.city.ja, row.city.en)}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#4b5563" }}>
                        {t(row.venue.ja, row.venue.en)}
                      </td>
                      <td className="px-4 py-3 text-[#6b7280] hidden sm:table-cell">
                        {typeof row.period === "string" ? row.period : t(row.period.ja, row.period.en)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[#6b7280] mt-3">
              {t(
                "※ トロント、ダラス、ヒューストン、アトランタ、ボストン、サンフランシスコ、シアトル、メキシコシティ、グアダラハラ、モンテレーでも開催予定",
                "* Also planned for Toronto, Dallas, Houston, Atlanta, Boston, San Francisco, Seattle, Mexico City, Guadalajara, and Monterrey"
              )}
            </p>
          </section>

          {/* ======== 第2部ヘッダー ======== */}
          <div className="bg-gradient-to-r from-[#C8102E] to-[#8B0000] text-white rounded-2xl p-6">
            <h2 className="text-lg sm:text-xl font-bold">
              {t("第2部：日本人ファン向け補足情報", "Part 2: Supplementary Info for Japanese Fans")}
            </h2>
            <p className="text-sm text-red-100 mt-1">
              {t("各種メディア・旅行サイトを参照", "Referenced from various media and travel sites")}
            </p>
          </div>

          {/* 8. 日本代表日程 */}
          <section id="japan">
            <SectionHeader icon="🇯🇵" titleJa="日本代表の試合日程（グループF）" titleEn="Japan Schedule (Group F)" t={t} />
            <div className="space-y-3">
              {[
                { matchJa: "第1戦", matchEn: "Match 1", dateJa: "6月15日（月）日本時間 5:00", dateEn: "Jun 15 (Mon) 5:00 AM JST", opponent: { ja: "vs オランダ", en: "vs Netherlands" }, venue: { ja: "ダラス（アメリカ）", en: "Dallas (USA)" } },
                { matchJa: "第2戦", matchEn: "Match 2", dateJa: "6月21日（日）日本時間 13:00", dateEn: "Jun 21 (Sun) 1:00 PM JST", opponent: { ja: "vs チュニジア", en: "vs Tunisia" }, venue: { ja: "モンテレイ（メキシコ）", en: "Monterrey (Mexico)" } },
                { matchJa: "第3戦", matchEn: "Match 3", dateJa: "6月26日（金）日本時間 8:00", dateEn: "Jun 26 (Fri) 8:00 AM JST", opponent: { ja: "vs スウェーデン", en: "vs Sweden" }, venue: { ja: "ダラス（アメリカ）", en: "Dallas (USA)" } },
              ].map((m, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex-shrink-0">
                    <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {t(m.matchJa, m.matchEn)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-[#111827]">{t(m.opponent.ja, m.opponent.en)}</p>
                    <p className="text-sm text-[#6b7280]">{t(m.dateJa, m.dateEn)}</p>
                  </div>
                  <div className="text-sm text-[#4b5563]">
                    📍 {t(m.venue.ja, m.venue.en)}
                  </div>
                </div>
              ))}
            </div>
            <AlertBox type="info" t={t}
              ja="ダラスとモンテレイの2都市をまたぐ観戦計画が必要です"
              en="Your travel plan needs to cover 2 cities: Dallas and Monterrey"
            />
          </section>

          {/* 9. 渡航準備 */}
          <section id="visa">
            <SectionHeader icon="✈️" titleJa="渡航準備" titleEn="Travel Preparation" t={t} />
            <div className="space-y-4">
              <Card titleJa="🇺🇸 アメリカ入国（ダラス等）" titleEn="🇺🇸 US Entry (Dallas, etc.)" t={t}>
                <ul className="space-y-2">
                  <Li t={t} ja="ESTA（電子渡航認証）の事前取得が必須。ESTAなしでは飛行機に搭乗不可" en="ESTA (Electronic System for Travel Authorization) required. Cannot board without it" />
                  <Li t={t} ja="有効期間は最長2年間（パスポート有効期限に準ずる）" en="Valid for up to 2 years (subject to passport expiry)" />
                  <Li t={t} ja="ESTA却下の場合はBビザ申請が必要（面接予約枠が数ヶ月先まで埋まる可能性）" en="If ESTA is denied, B-visa required (interview slots may be booked months out)" />
                </ul>
              </Card>
              <AlertBox type="danger" t={t}
                ja="重要：滞在上限90日間。メキシコ・カナダに一時出国しても90日はリセットされません"
                en="IMPORTANT: 90-day stay limit. Trips to Mexico/Canada do NOT reset the 90-day clock"
              />
              <Card titleJa="🇲🇽 メキシコ入国（モンテレイ）" titleEn="🇲🇽 Mexico Entry (Monterrey)" t={t}>
                <ul className="space-y-2">
                  <Li t={t} ja="日本人は観光目的180日以内はビザ不要" en="Japanese citizens: visa-free for tourism up to 180 days" />
                  <Li t={t} ja="パスポート有効期間6ヶ月以上が必要" en="Passport must be valid for at least 6 months" />
                </ul>
              </Card>
              <Card titleJa="🇨🇦 カナダ入国" titleEn="🇨🇦 Canada Entry" t={t}>
                <ul className="space-y-2">
                  <Li t={t} ja="eTA（電子渡航認証）の取得が必要" en="eTA (Electronic Travel Authorization) required" />
                </ul>
              </Card>
            </div>
          </section>

          {/* 10. 費用 */}
          <section id="cost">
            <SectionHeader icon="💰" titleJa="費用の目安" titleEn="Cost Estimates" t={t} />
            <div className="rounded-2xl border border-gray-200 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200" style={{ backgroundColor: "#f9fafb" }}>
                    <th className="px-4 py-3 text-left font-bold" style={{ color: "#374151" }}>{t("項目", "Item")}</th>
                    <th className="px-4 py-3 text-right font-bold" style={{ color: "#374151" }}>{t("目安", "Estimate")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { ja: "往復航空券（東京発）", en: "Round-trip flight (from Tokyo)", costJa: "約25〜30万円", costEn: "~$1,700–2,000" },
                    { ja: "宿泊費（1泊）", en: "Accommodation/night", costJa: "3〜8万円/泊（大会中高騰）", costEn: "$200–550/night (inflated)" },
                    { ja: "チケット（GL1試合）", en: "Ticket (1 group match)", costJa: "約1〜4万円", costEn: "~$65–270" },
                    { ja: "都市間移動", en: "Inter-city travel", costJa: "数万〜十数万円", costEn: "$200–1,000" },
                    { ja: "食費・雑費", en: "Food & misc.", costJa: "約1万円/日", costEn: "~$65/day" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3" style={{ color: "#374151" }}>{t(row.ja, row.en)}</td>
                      <td className="px-4 py-3 text-right font-medium" style={{ color: "#111827" }}>{t(row.costJa, row.costEn)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="bg-[#eff6ff] rounded-xl border border-blue-100 p-5 text-center">
                <p className="text-xs text-[#2563eb] font-medium">{t("1試合観戦（4泊）", "1 match (4 nights)")}</p>
                <p className="text-2xl font-black text-[#1e3a5f] mt-1">{t("約50万円〜", "~$3,300+")}</p>
              </div>
              <div className="bg-[#fef2f2] rounded-xl border border-red-100 p-5 text-center">
                <p className="text-xs text-[#dc2626] font-medium">{t("GL3試合（複数都市）", "3 group matches (multi-city)")}</p>
                <p className="text-2xl font-black text-[#7f1d1d] mt-1">{t("約80〜100万円", "~$5,500–6,800")}</p>
              </div>
            </div>
          </section>

          {/* 11. 交通・通信 */}
          <section id="transport">
            <SectionHeader icon="🚆" titleJa="交通・通信のポイント" titleEn="Transport & Communication Tips" t={t} />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { titleJa: "鉄道", titleEn: "Rail", ja: "東部エリア（ボストン〜NY〜フィラデルフィア）はアムトラック鉄道網が充実", en: "East Coast (Boston–NY–Philadelphia) has good Amtrak connections", icon: "🚄" },
                { titleJa: "バス", titleEn: "Bus", ja: "Greyhound、FlixBus等の長距離バスは飛行機より安価", en: "Greyhound, FlixBus are cheaper than flying", icon: "🚌" },
                { titleJa: "配車アプリ", titleEn: "Ride-sharing", ja: "Uber/Lyftの活用が便利。チップ文化に注意（15〜20%）", en: "Use Uber/Lyft. Remember tipping culture (15-20%)", icon: "🚗" },
                { titleJa: "通信", titleEn: "Mobile", ja: "渡航前にeSIMの事前購入を推奨。チケット提示やナビに通信必須", en: "Pre-purchase eSIM before travel. Data essential for tickets & navigation", icon: "📱" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4" style={{ backgroundColor: "#ffffff" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <h4 className="font-bold text-[#111827] text-sm">{t(item.titleJa, item.titleEn)}</h4>
                  </div>
                  <p className="text-sm text-[#4b5563]">{t(item.ja, item.en)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 12. 出典一覧 */}
          <section id="sources">
            <SectionHeader icon="📚" titleJa="出典一覧" titleEn="Sources" t={t} />
            <div className="space-y-4">
              <Card titleJa="FIFA公式ドキュメント" titleEn="FIFA Official Documents" t={t}>
                <ul className="space-y-2 text-sm">
                  <SourceLi label="Stadium Code of Conduct (PDF)" url="https://digitalhub.fifa.com/m/50ebae81c412b7d5/original/FIFA-World-Cup-2026-Stadium-Code-of-Conduct.pdf" />
                  <SourceLi label="FIFA Fan Festival 2026" url="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/fifa-fan-festival" />
                  <SourceLi label="FIFA Tickets" url="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets" />
                </ul>
              </Card>
              <Card titleJa="英語メディア" titleEn="English Media" t={t}>
                <ul className="space-y-2 text-sm">
                  <SourceLi label="World Cup Banned Items - Football Ground Guide" url="https://footballgroundguide.com/news/world-cup-stadium-banned-items-list-what-you-can-and-cant-bring.html" />
                  <SourceLi label="Entry Rules - WorldCupTrackers" url="https://worldcuptrackers.com/fifa-world-cup-2026-allowed-items/" />
                  <SourceLi label="Bag Policy - WorldCupTourism" url="https://worldcuptourism.com/guides/stadium-bag-policy" />
                  <SourceLi label="Security Guide" url="https://fifa-2026.com/world-cup-2026-security-guide" />
                  <SourceLi label="Ticket Fine Print - The World Cup Guide" url="https://theworldcupguide.com/world-cup-2026-ticket-terms/" />
                  <SourceLi label="Fan Fest Guide - The World Cup Guide" url="https://theworldcupguide.com/fifa-world-cup-2026-fan-fest-guide/" />
                  <SourceLi label="Fan Zones Guide - Football Ground Guide" url="https://footballgroundguide.com/news/2026-world-cup-fan-zones-guide-locations-security-rules-bag-checks-and-alcohol-laws-explained.html" />
                </ul>
              </Card>
              <Card titleJa="日本語メディア" titleEn="Japanese Media" t={t}>
                <ul className="space-y-2 text-sm">
                  <SourceLi label="観戦情報まとめ - FootyTix" url="https://footballtickets-by-gakuseimiler.com/entry/wc2026_tickets" />
                  <SourceLi label="チケット購入完全ガイド - SportsMap" url="https://www.spocafe.jp/spo-map/%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC/9899/" />
                  <SourceLi label="観戦のためにすべきこと - 行政書士法人IMS" url="https://imsvisa.support/post-7199/" />
                  <SourceLi label="観戦費用シミュレーション - フットボール戦士" url="https://footballwarr.com/2026wc-cost/" />
                  <SourceLi label="観戦旅ガイド - ナショジオ日本版" url="https://natgeo.nikkeibp.co.jp/atcl/news/25/112700651/" />
                  <SourceLi label="組み合わせ決定 - JFA" url="https://www.jfa.jp/samuraiblue/news/00035825/" />
                  <SourceLi label="予選観戦ルール - JFA" url="https://www.jfa.jp/samuraiblue/worldcup_2026/final_q_2026/20241015/manners.html" />
                  <SourceLi label="チケット購入方法 - Goal.com日本版" url="https://www.goal.com/jp/%E3%83%AA%E3%82%B9%E3%83%88/how-to-buy-tickets-for-japan-matches-at-the-2026-fifa-world-cup/bltd6ff1ba2a4027e65" />
                </ul>
              </Card>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center text-xs text-[#9ca3af] pt-8 pb-4 border-t border-gray-100">
            <p>{t(
              "※ 本ガイドは2026年4月時点の情報です。最新情報はFIFA公式サイトをご確認ください。",
              "* This guide reflects information as of April 2026. Please check the FIFA official site for the latest updates."
            )}</p>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============ Reusable Components ============ */

function SectionHeader({ icon, titleJa, titleEn, t }: { icon: string; titleJa: string; titleEn: string; t: (ja: string, en: string) => string }) {
  return (
    <h3 className="text-xl sm:text-2xl font-black mb-4 flex items-center gap-2 scroll-mt-24" style={{ color: "#111827" }}>
      <span>{icon}</span> {t(titleJa, titleEn)}
    </h3>
  );
}

function Card({ titleJa, titleEn, t, children, accent }: { titleJa: string; titleEn: string; t: (ja: string, en: string) => string; children: React.ReactNode; accent?: "red" | "green" }) {
  const borderColor = accent === "red" ? "border-red-200" : accent === "green" ? "border-green-200" : "border-gray-200";
  const headerBg = accent === "red" ? "bg-[#fef2f2]" : accent === "green" ? "bg-green-50" : "bg-[#f9fafb]";
  const headerColor = accent === "red" ? "text-[#991b1b]" : accent === "green" ? "text-[#166534]" : "text-[#1f2937]";
  return (
    <div className={`rounded-xl border ${borderColor} overflow-hidden`} style={{ backgroundColor: "#ffffff" }}>
      <div className={`px-4 py-3 border-b ${borderColor}`} style={{ backgroundColor: accent === "red" ? "#fef2f2" : accent === "green" ? "#f0fdf4" : "#f9fafb" }}>
        <h4 className={`font-bold text-sm`} style={{ color: accent === "red" ? "#991b1b" : accent === "green" ? "#166534" : "#1f2937" }}>{t(titleJa, titleEn)}</h4>
      </div>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
}

function Li({ ja, en, t }: { ja: string; en: string; t: (ja: string, en: string) => string }) {
  return (
    <li className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
      <span className="mt-1 flex-shrink-0" style={{ color: "#0057A8" }}>•</span>
      <span>{t(ja, en)}</span>
    </li>
  );
}

function AlertBox({ type, ja, en, t }: { type: "info" | "warning" | "danger"; ja: string; en: string; t: (ja: string, en: string) => string }) {
  const styles = {
    info: { bg: "bg-[#eff6ff]", border: "border-blue-200", text: "text-blue-800", icon: "ℹ️" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", icon: "⚠️" },
    danger: { bg: "bg-[#fef2f2]", border: "border-red-200", text: "text-[#991b1b]", icon: "🚨" },
  };
  const s = styles[type];
  return (
    <div className={`mt-4 border ${s.border} rounded-xl px-4 py-3 flex items-start gap-3`} style={{ backgroundColor: type === "info" ? "#eff6ff" : type === "warning" ? "#fffbeb" : "#fef2f2" }}>
      <span className="flex-shrink-0">{s.icon}</span>
      <p className="text-sm" style={{ color: type === "info" ? "#1e40af" : type === "warning" ? "#92400e" : "#991b1b" }}>{t(ja, en)}</p>
    </div>
  );
}

function StatCard({ labelJa, labelEn, value, unitJa, unitEn, t }: { labelJa: string; labelEn: string; value: string; unitJa: string; unitEn: string; t: (ja: string, en: string) => string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 text-center" style={{ backgroundColor: "#ffffff" }}>
      <p className="text-xs font-medium" style={{ color: "#6b7280" }}>{t(labelJa, labelEn)}</p>
      <p className="text-3xl font-black mt-1" style={{ color: "#0057A8" }}>{value}<span className="text-base font-medium ml-1" style={{ color: "#6b7280" }}>{t(unitJa, unitEn)}</span></p>
    </div>
  );
}

function ProhibitedCategory({ titleJa, titleEn, items, t }: { titleJa: string; titleEn: string; items: { ja: string; en: string }[]; t: (ja: string, en: string) => string }) {
  return (
    <div className="rounded-xl border border-red-100 overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      <div className="px-4 py-2.5 border-b border-red-100" style={{ backgroundColor: "#fef2f2" }}>
        <h4 className="font-bold text-sm" style={{ color: "#991b1b" }}>{t(titleJa, titleEn)}</h4>
      </div>
      <ul className="px-4 py-3 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
            <span className="mt-0.5 flex-shrink-0" style={{ color: "#f87171" }}>✖</span>
            <span>{t(item.ja, item.en)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourceLi({ label, url }: { label: string; url: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-[#9ca3af] mt-0.5 flex-shrink-0">→</span>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#0057A8] hover:underline break-all">
        {label}
      </a>
    </li>
  );
}
