import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🏴 スコットランド代表 | 日本代表対戦国情報",
  description:
    "日本代表の対戦国・スコットランド代表ページ。監督、FIFAランキング、W杯情報、全メンバー一覧。",
};

type Player = {
  position: "GK" | "DF" | "MF" | "FW";
  nameJa: string;
  club: string;
  comment: string;
};

const posLabel: Record<Player["position"], string> = {
  GK: "ゴールキーパー",
  DF: "ディフェンダー",
  MF: "ミッドフィルダー",
  FW: "フォワード",
};

const posColor: Record<Player["position"], string> = {
  GK: "from-amber-500 to-amber-600",
  DF: "from-blue-500 to-blue-600",
  MF: "from-emerald-500 to-emerald-600",
  FW: "from-red-500 to-rose-600",
};

const posBorder: Record<Player["position"], string> = {
  GK: "border-amber-400",
  DF: "border-blue-400",
  MF: "border-emerald-400",
  FW: "border-red-400",
};

const players: Player[] = [
  { position: "GK", nameJa: "アンガス・ガン", club: "ノッティンガム・フォレスト", comment: "ユーロ2024のスタメンGK。負傷離脱中のクレイグ・ゴードンに代わって復帰" },
  { position: "GK", nameJa: "スコット・ベイン", club: "フォルカーク", comment: "スコットランド国内リーグで安定したパフォーマンスを見せるベテランGK" },
  { position: "DF", nameJa: "アンディ・ロバートソン", club: "リバプール", comment: "リバプールの絶対的左SB。スコットランドの精神的支柱、60キャップ超" },
  { position: "DF", nameJa: "キーラン・ティアニー", club: "セルティック", comment: "アーセナルからセルティックに復帰。左SBの名手、代表歴10年超のベテラン" },
  { position: "DF", nameJa: "ネイサン・パターソン", club: "エヴァートン", comment: "右SBのレギュラー候補。エヴァートンで安定した活躍" },
  { position: "DF", nameJa: "グラント・ハンリー", club: "ハイバーニアン", comment: "経験豊富なCB。スコットランドの守備の要として長年貢献" },
  { position: "DF", nameJa: "ジャック・ヘンドリー", club: "アル・エティファク", comment: "サウジアラビアリーグで活躍する大型CB。フィジカルの強さが武器" },
  { position: "DF", nameJa: "ドミニク・ハイアム", club: "レクサム", comment: "チャンピオンシップで安定感を発揮するCB" },
  { position: "DF", nameJa: "ロス・マクロリー", club: "ブリストル・シティ", comment: "右SBもこなせるユーティリティDF" },
  { position: "DF", nameJa: "スコット・マッケナ", club: "ディナモ・ザグレブ", comment: "クロアチアリーグで主力を張る左利きのCB" },
  { position: "DF", nameJa: "アンソニー・ラルストン", club: "セルティック", comment: "セルティックの右SBとして国内屈指のパフォーマンス" },
  { position: "DF", nameJa: "ジョン・サウター", club: "レンジャーズ", comment: "負傷からの復帰を経てレンジャーズで奮闘するCB" },
  { position: "MF", nameJa: "スコット・マクトミネイ", club: "ナポリ", comment: "セリエA MVP受賞の別格の存在。デンマーク戦のオーバーヘッドキックは伝説的。コンテ監督の下で覚醒" },
  { position: "MF", nameJa: "ジョン・マクギン", club: "アストン・ビラ", comment: "代表の心臓部。90分間走り続けるスタミナと豊富な運動量が武器" },
  { position: "MF", nameJa: "ルイス・ファーガソン", club: "ボローニャ", comment: "セリエAで台頭した新世代MF。ゴール・アシスト両面で存在感" },
  { position: "MF", nameJa: "ビリー・ギルモア", club: "ナポリ", comment: "小柄ながらパス精度が高いテクニシャン。マクトミネイと同じナポリでプレー" },
  { position: "MF", nameJa: "ケニー・マクリーン", club: "ノリッジ", comment: "デンマーク戦で劇的ゴールを決めた中盤の職人。展開力が高い" },
  { position: "MF", nameJa: "ライアン・クリスティ", club: "ボーンマス", comment: "プレミアリーグで奮闘するボックス・トゥ・ボックスMF" },
  { position: "MF", nameJa: "アンディ・アーヴィング", club: "スパルタ・プラハ", comment: "チェコリーグで活躍する若手MF。代表でも存在感を増す" },
  { position: "MF", nameJa: "レノン・ミラー", club: "ウディネーゼ", comment: "セリエAで成長著しい19歳の新星。スコットランド期待の未来" },
  { position: "FW", nameJa: "チェ・アダムス", club: "トリノ", comment: "イタリアでゴールを量産するスコットランドの主軸FW。フィジカルと技術を兼備" },
  { position: "FW", nameJa: "ジョージ・ハースト", club: "イプスウィッチ", comment: "イプスウィッチの得点源。高さと強さを活かしたポストプレーが持ち味" },
  { position: "FW", nameJa: "リンドン・ダイクス", club: "チャールトン", comment: "高さと強さが武器の大型FW。パワープレー時の頼れる存在" },
  { position: "FW", nameJa: "トミー・コンウェイ", club: "ミドルズブラ", comment: "チャンピオンシップで躍動する若手FW。切れ味鋭いドリブルが武器" },
  { position: "FW", nameJa: "ファインドレー・カーティス", club: "キルマーノック/レンジャーズ期限付き移籍", comment: "19歳のサプライズ招集。スティーブ・クラーク監督が直接視察して選んだ俊足ウインガー" },
];

function byPos(pos: Player["position"]) {
  return players.filter((p) => p.position === pos);
}

export default function ScotlandOpponentPage() {
  const positions: Player["position"][] = ["GK", "DF", "MF", "FW"];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001845 0%, #003087 50%, #012f6b 100%)" }} />
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 20% 20%, #ffffff 0, transparent 40%), radial-gradient(circle at 80% 80%, #CF2B37 0, transparent 35%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-5xl mb-3">🏴</p>
          <h1 className="text-4xl sm:text-6xl font-black mb-3">スコットランド代表</h1>
          <p className="text-blue-100">監督：スティーブ・クラーク ｜ FIFAランキング：38位 ｜ W杯グループC（ハイチ・モロッコ・ブラジル）</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">全メンバー一覧</h2>
        <p className="text-sm text-gray-500 mb-8">GK/DF/MF/FW別（選手名・所属クラブ・ひとこと紹介）</p>
        {positions.map((pos) => {
          const list = byPos(pos);
          return (
            <div key={pos} className="mb-10">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${posColor[pos]}`}>{pos}</span>
                {posLabel[pos]}
                <span className="text-gray-400 font-normal text-sm">（{list.length}名）</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <div key={`${pos}-${p.nameJa}`} className={`rounded-2xl border-l-4 ${posBorder[pos]} bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}>
                    <div className="p-5">
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{p.nameJa}</h4>
                      <p className="text-xs text-gray-400 mb-1">所属クラブ</p>
                      <p className="text-sm font-medium text-gray-800 mb-3">🏢 {p.club}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{p.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/japan" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003087] text-white text-sm font-bold hover:bg-[#00286f] transition-colors">
            ← 日本代表ページに戻る
          </Link>
        </div>
      </section>
    </div>
  );
}

