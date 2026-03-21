import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🏴 イングランド代表 | 日本代表対戦国情報",
  description:
    "日本代表の対戦国・イングランド代表ページ。監督、FIFAランキング、W杯情報、全メンバー一覧。",
};

type Player = {
  position: "GK" | "DF" | "MF" | "FW";
  nameJa: string;
  club: string;
  comment: string;
  featured?: boolean;
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
  { position: "GK", nameJa: "ジョーダン・ピックフォード", club: "エヴァートン", featured: true, comment: "イングランド不動の1番。エヴァートンの守護神として反射神経抜群" },
  { position: "GK", nameJa: "ディーン・ヘンダーソン", club: "クリスタル・パレス", comment: "プレミアリーグで安定したパフォーマンスを誇るNo.2候補" },
  { position: "GK", nameJa: "アーロン・ラムズデール", club: "ニューカッスル", comment: "アーセナルから移籍後、ニューカッスルで復活を遂げた実力派" },
  { position: "GK", nameJa: "ジェームス・トラフォード", club: "マンチェスター・シティ", comment: "シティが誇る次世代GK。将来の正GK候補" },
  { position: "GK", nameJa: "ジェイソン・スティール", club: "ブライトン", comment: "練習用GKとしてW杯帯同も視野。経験豊富なチーム貢献型" },
  { position: "DF", nameJa: "ジョン・ストーンズ", club: "マンチェスター・シティ", comment: "シティの絶対的CBだが今季は出場機会が減少。経験値は代表随一" },
  { position: "DF", nameJa: "マーク・ゲーイ", club: "マンチェスター・シティ", comment: "代表のCBの柱。落ち着いたビルドアップと対人守備が光る" },
  { position: "DF", nameJa: "ハリー・マグワイア", club: "マンチェスター・ユナイテッド", featured: true, comment: "カーリック監督の下で復活。トゥヘル体制初招集でセットプレーの切り札" },
  { position: "DF", nameJa: "エズリ・コンサ", club: "アストン・ビラ", comment: "ビラで急成長を遂げた若手CB。スピードと読みが武器" },
  { position: "DF", nameJa: "ジャレル・クアンサー", club: "バイヤー・レヴァークーゼン", comment: "ドイツで揉まれた逸材CB。リバプール育ちの将来性豊かなDF" },
  { position: "DF", nameJa: "ダン・バーン", club: "ニューカッスル", comment: "長身CBとして安定感抜群。セットプレーでの存在感も大きい" },
  { position: "DF", nameJa: "ルイス・ホール", club: "ニューカッスル", comment: "怪我から復帰した左SBの新星。ニューカッスルで躍動中" },
  { position: "DF", nameJa: "ティノ・リブラメント", club: "ニューカッスル", comment: "怪我から復帰した右SBの有望株。リース・ジェームス不在の穴を埋める" },
  { position: "DF", nameJa: "フィカヨ・トモリ", club: "ACミラン", featured: true, comment: "2023年以来の代表復帰。ミランで存在感を取り戻した大型CB" },
  { position: "DF", nameJa: "ジェド・スペンス", club: "トッテナム", comment: "右SBをこなせるユーティリティDF" },
  { position: "DF", nameJa: "ニコ・オライリー", club: "マンチェスター・シティ", comment: "中盤もこなせる万能型。シティの若手として台頭" },
  { position: "MF", nameJa: "デクラン・ライス", club: "アーセナル", featured: true, comment: "アーセナルの心臓。守備力と展開力を兼ね備えたイングランド最高のMF" },
  { position: "MF", nameJa: "ジュード・ベリンガム", club: "レアル・マドリード", featured: true, comment: "レアル・マドリードで世界最高峰の輝き。得点力も兼ね備えた次世代のスター" },
  { position: "MF", nameJa: "コビー・メイヌー", club: "マンチェスター・ユナイテッド", featured: true, comment: "ユナイテッドで復活した21歳の天才。ユーロ2024準優勝の立役者" },
  { position: "MF", nameJa: "コール・パーマー", club: "チェルシー", comment: "チェルシーの絶対的エース。ラストパスとシュートの精度が別格" },
  { position: "MF", nameJa: "モーガン・ロジャース", club: "アストン・ビラ", comment: "アストン・ビラで急成長。創造性豊かなアタッキングMF" },
  { position: "MF", nameJa: "エリオット・アンダーソン", club: "ノッティンガム・フォレスト", comment: "フォレストで頭角を現した新鋭MF。ライスのパートナー候補" },
  { position: "MF", nameJa: "アダム・ウォートン", club: "クリスタル・パレス", comment: "守備的MFの新星。冷静な判断力と豊富な運動量が武器" },
  { position: "MF", nameJa: "ジョーダン・ヘンダーソン", club: "ブレントフォード", comment: "元リバプール主将。ベテランとしてチームに経験をもたらす" },
  { position: "FW", nameJa: "ハリー・ケイン", club: "バイエルン・ミュンヘン", featured: true, comment: "イングランド歴代最多71得点の絶対的エース。バイエルンでも得点王争い" },
  { position: "FW", nameJa: "ブカヨ・サカ", club: "アーセナル", comment: "アーセナルの右翼を担う快速ウインガー。代表でも不可欠な存在" },
  { position: "FW", nameJa: "フィル・フォーデン", club: "マンチェスター・シティ", comment: "シティの天才。テクニックとビジョンはイングランド随一" },
  { position: "FW", nameJa: "マーカス・ラッシュフォード", club: "バルセロナ/期限付き移籍", featured: true, comment: "バルサでの移籍で復活の兆し。スピードと突破力は健在" },
  { position: "FW", nameJa: "ジャロッド・ボーウェン", club: "ウェストハム", comment: "ウェストハムの顔。ハードワークと得点力を兼備するWG" },
  { position: "FW", nameJa: "アンソニー・ゴードン", club: "ニューカッスル", comment: "ニューカッスルの快速ウインガー。縦への推進力が魅力" },
  { position: "FW", nameJa: "エベレチ・エゼ", club: "アーセナル", comment: "アーセナル移籍後も輝きを放つ技巧派アタッカー" },
  { position: "FW", nameJa: "ノニ・マドゥエケ", club: "アーセナル", comment: "アーセナルで急成長。ドリブルとシュートで違いを生み出す" },
  { position: "FW", nameJa: "ドミニク・カルバート＝ルーウィン", club: "リーズ", comment: "5年ぶりの代表復帰。リーズ昇格に貢献したゴールゲッター" },
  { position: "FW", nameJa: "ドミニク・ソランケ", club: "トッテナム", comment: "ケインの控えNo.1候補。ポストプレーと決定力が高い" },
  { position: "FW", nameJa: "コール・パーマー", club: "チェルシー", comment: "※兼用表記：前線でも起用可能。狭い局面で違いを作る決定的アタッカー" },
];

function byPos(pos: Player["position"]) {
  return players.filter((p) => p.position === pos);
}

export default function EnglandOpponentPage() {
  const positions: Player["position"][] = ["GK", "DF", "MF", "FW"];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #001845 0%, #003087 45%, #1f355e 100%)" }} />
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 20% 20%, #CF2B37 0, transparent 40%), radial-gradient(circle at 80% 80%, #ffffff 0, transparent 35%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-5xl mb-3">🏴</p>
          <h1 className="text-4xl sm:text-6xl font-black mb-3">イングランド代表</h1>
          <p className="text-blue-100">監督：トーマス・トゥヘル ｜ FIFAランキング：5位 ｜ W杯グループ：TBD</p>
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
                {list.map((p, idx) => (
                  <div key={`${pos}-${p.nameJa}-${idx}`} className={`rounded-2xl border-l-4 ${posBorder[pos]} bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden`}>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{p.nameJa}</h4>
                        {p.featured && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#CF2B37]/10 text-[#CF2B37]">注目</span>}
                      </div>
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

