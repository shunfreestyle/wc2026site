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
  firstCallUp?: boolean;
  career: string[];
  japanConnection?: string;
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
  // ── GK ──
  { position: "GK", nameJa: "ジョーダン・ピックフォード", club: "エヴァートン", featured: true, comment: "イングランド不動の1番。エヴァートンの守護神として反射神経抜群", career: ["サンダーランド（2011-17）", "エヴァートン（2017-）"] },
  { position: "GK", nameJa: "ディーン・ヘンダーソン", club: "クリスタル・パレス", comment: "プレミアリーグで安定したパフォーマンスを誇るNo.2候補", career: ["マンチェスター・ユナイテッド（2015-23）", "シェフィールド・ユナイテッド（2018-20・レンタル）", "ノッティンガム・フォレスト（2022-23・レンタル）", "クリスタル・パレス（2023-）"] },
  { position: "GK", nameJa: "アーロン・ラムズデール", club: "ニューカッスル", comment: "アーセナルから移籍後、ニューカッスルで復活を遂げた実力派", career: ["シェフィールド・ユナイテッド（2016-21）", "ボーンマス（2019-20・レンタル）", "アーセナル（2021-24）", "ニューカッスル（2024-）"], japanConnection: "アーセナル時代（2021-24年）に冨安健洋と同チーム。練習場での仲の良さが知られ、日本から来た冨安をサポートした。" },
  { position: "GK", nameJa: "ジェームス・トラフォード", club: "マンチェスター・シティ", comment: "シティが誇る次世代GK。将来の正GK候補", career: ["マンチェスター・シティU21", "ボルトン（2022-23・レンタル）", "バーンリー（2023-24・レンタル）", "マンチェスター・シティ（2024-）"] },
  { position: "GK", nameJa: "ジェイソン・スティール", club: "ブライトン", comment: "練習用GKとしてW杯帯同も視野。経験豊富なチーム貢献型", career: ["ミドルズブラ（2011-16）", "サンダーランド（2016-18）", "ブライトン（2018-）"], japanConnection: "ブライトン（2022-）で三笘薫と同チーム。三笘の活躍を最も近くで見ている一人。" },

  // ── DF ──
  { position: "DF", nameJa: "ジョン・ストーンズ", club: "マンチェスター・シティ", comment: "シティの絶対的CBだが今季は出場機会が減少。経験値は代表随一", career: ["バーンリー（2011-14）", "エヴァートン（2014-16）", "マンチェスター・シティ（2016-）"] },
  { position: "DF", nameJa: "マーク・ゲイ", club: "マンチェスター・シティ", comment: "代表のCBの柱。落ち着いたビルドアップと対人守備が光る", career: ["チェルシーU21", "クリスタル・パレス（2021-25）", "マンチェスター・シティ（2025-）"] },
  { position: "DF", nameJa: "ハリー・マグワイア", club: "マンチェスター・ユナイテッド", featured: true, comment: "カーリック監督の下で復活。トゥヘル体制初招集でセットプレーの切り札", career: ["シェフィールド・ユナイテッド（2011-14）", "ハル・シティ（2014-17）", "レスター（2017-19）", "マンチェスター・ユナイテッド（2019-）"] },
  { position: "DF", nameJa: "エズリ・コンサ", club: "アストン・ビラ", comment: "ビラで急成長を遂げた若手CB。スピードと読みが武器", career: ["チャールトン（2016-19）", "ブレントフォード（2019-19）", "アストン・ビラ（2019-）"] },
  { position: "DF", nameJa: "ジャレル・クアンサー", club: "バイヤー・レヴァークーゼン", comment: "ドイツで揉まれた逸材CB。リバプール育ちの将来性豊かなDF", career: ["リバプールU21", "リバプール（2023-24）", "バイヤー・レヴァークーゼン（2024-）"], japanConnection: "リバプール在籍時（2023-24年）に遠藤航と同チーム。若手ながら遠藤の練習への姿勢から学ぶことが多かったとコメント。" },
  { position: "DF", nameJa: "ダン・バーン", club: "ニューカッスル", comment: "長身CBとして安定感抜群。セットプレーでの存在感も大きい", career: ["フルハム（2012-16）", "ウィガン（2018-20）", "ブライトン（2020-23）", "ニューカッスル（2023-）"], japanConnection: "ブライトン在籍時（2022-23年）に三笘薫と半シーズン同チーム。三笘のドリブルを「紅白戦で止められなかった」と語っている。" },
  { position: "DF", nameJa: "ルイス・ホール", club: "ニューカッスル", comment: "怪我から復帰した左SBの新星。ニューカッスルで躍動中", career: ["チェルシーU21", "ニューカッスル（2023-）"] },
  { position: "DF", nameJa: "ティノ・リブラメント", club: "ニューカッスル", comment: "怪我から復帰した右SBの有望株。リース・ジェームス不在の穴を埋める", career: ["チェルシーU21", "サウサンプトン（2021-23）", "ニューカッスル（2023-）"] },
  { position: "DF", nameJa: "フィカヨ・トモリ", club: "ACミラン", featured: true, comment: "2023年以来の代表復帰。ミランで存在感を取り戻した大型CB", career: ["チェルシー（2016-21）", "ダービー（2018-19・レンタル）", "ACミラン（2021-）"] },
  { position: "DF", nameJa: "ジェド・スペンス", club: "トッテナム", comment: "右SBをこなせるユーティリティDF", career: ["ミドルズブラ（2018-22）", "ノッティンガム・フォレスト（2021-22・レンタル）", "トッテナム（2022-）"] },
  { position: "DF", nameJa: "ニコ・オライリー", club: "マンチェスター・シティ", comment: "中盤もこなせる万能型。シティの若手として台頭", career: ["マンチェスター・シティU21", "マンチェスター・シティ（2024-）"] },

  // ── MF ──
  { position: "MF", nameJa: "デクラン・ライス", club: "アーセナル", featured: true, comment: "アーセナルの心臓。守備力と展開力を兼ね備えたイングランド最高のMF", career: ["ウェストハム（2017-23）", "アーセナル（2023-）"], japanConnection: "アーセナル時代（2023-25年）に冨安健洋と同チーム。冨安を「最も信頼できるディフェンダーの一人」と評価している。" },
  { position: "MF", nameJa: "ジュード・ベリンガム", club: "レアル・マドリード", featured: true, comment: "レアル・マドリードで世界最高峰の輝き。得点力も兼ね備えた次世代のスター", career: ["バーミンガム（2019-20）", "ボルシア・ドルトムント（2020-23）", "レアル・マドリード（2023-）"] },
  { position: "MF", nameJa: "コビー・マイヌー", club: "マンチェスター・ユナイテッド", featured: true, comment: "ユナイテッドで復活した21歳の天才。ユーロ2024準優勝の立役者", career: ["マンチェスター・ユナイテッドU21", "マンチェスター・ユナイテッド（2023-）"] },
  { position: "MF", nameJa: "コール・パーマー", club: "チェルシー", comment: "チェルシーの絶対的エース。ラストパスとシュートの精度が別格", career: ["マンチェスター・シティU21", "チェルシー（2023-）"] },
  { position: "MF", nameJa: "エリオット・アンダーソン", club: "ノッティンガム・フォレスト", comment: "フォレストで頭角を現した新鋭MF。ライスのパートナー候補", career: ["ニューカッスル（2020-24）", "ブリストル・ロヴァーズ（2021-22・レンタル）", "ノッティンガム・フォレスト（2024-）"] },
  { position: "MF", nameJa: "アダム・ウォートン", club: "クリスタル・パレス", comment: "守備的MFの新星。冷静な判断力と豊富な運動量が武器", career: ["ブラックバーン（2021-24）", "クリスタル・パレス（2024-）"], japanConnection: "クリスタル・パレス（2024-）で鎌田大地と同チーム。中盤でコンビを組む機会が増え、鎌田のゲームメイクを「別次元」と評している。" },
  { position: "MF", nameJa: "ジェームズ・ガーナー", club: "エバートン", firstCallUp: true, comment: "エバートンで中盤の要として活躍。初の代表招集を勝ち取った実力派MF", career: ["マンチェスター・ユナイテッドU21", "ワトフォード（2020-21・レンタル）", "ノッティンガム・フォレスト（2021-22・レンタル）", "エバートン（2022-）"] },
  { position: "MF", nameJa: "ジョーダン・ヘンダーソン", club: "アヤックス", comment: "元リバプール主将。アヤックスに移籍しオランダで経験をもたらすベテラン", career: ["サンダーランド（2008-11）", "リバプール（2011-23）", "アル・エティファド（2023-24）", "アヤックス（2024-）"], japanConnection: "リバプール時代（2023年）に遠藤航と半シーズン一緒にプレー。キャプテンとして遠藤の加入を歓迎し、チームへの順応をサポートした。南野拓実（2020-22年）ともリバプールで同僚だった。" },

  // ── FW ──
  { position: "FW", nameJa: "ハリー・ケイン", club: "バイエルン・ミュンヘン", featured: true, comment: "イングランド歴代最多71得点の絶対的エース。バイエルンでも得点王争い", career: ["トッテナム（2009-23）", "ノリッジ（2012・レンタル）", "レスター（2012-13・レンタル）", "バイエルン・ミュンヘン（2023-）"] },
  { position: "FW", nameJa: "ブカヨ・サカ", club: "アーセナル", comment: "アーセナルの右翼を担う快速ウインガー。代表でも不可欠な存在", career: ["アーセナルU21", "アーセナル（2019-）"], japanConnection: "アーセナル時代（2021-25年）に冨安健洋と同チーム。右SBの冨安と右ウイングのサカのコンビはアーセナルサポーターを熱狂させた。" },
  { position: "FW", nameJa: "フィル・フォーデン", club: "マンチェスター・シティ", comment: "シティの天才。テクニックとビジョンはイングランド随一", career: ["マンチェスター・シティU21", "マンチェスター・シティ（2017-）"] },
  { position: "FW", nameJa: "マーカス・ラッシュフォード", club: "バルセロナ/期限付き移籍", featured: true, comment: "バルサでの移籍で復活の兆し。スピードと突破力は健在", career: ["マンチェスター・ユナイテッド（2015-）", "バルセロナ（2025-・レンタル）"] },
  { position: "FW", nameJa: "ジャロッド・ボーウェン", club: "ウェストハム", comment: "ウェストハムの顔。ハードワークと得点力を兼備するWG", career: ["ハル・シティ（2016-20）", "ウェストハム（2020-）"] },
  { position: "FW", nameJa: "アンソニー・ゴードン", club: "ニューカッスル", comment: "ニューカッスルの快速ウインガー。縦への推進力が魅力", career: ["エヴァートンU21", "エヴァートン（2020-23）", "ニューカッスル（2023-）"] },
  { position: "FW", nameJa: "エベレチ・エゼ", club: "アーセナル", comment: "アーセナル移籍後も輝きを放つ技巧派アタッカー", career: ["QPR（2016-20）", "クリスタル・パレス（2020-24）", "アーセナル（2024-）"], japanConnection: "アーセナルで冨安健洋（2021-25年在籍）と同チームだった。" },
  { position: "FW", nameJa: "ノニ・マドゥエケ", club: "チェルシー", comment: "チェルシーで急成長。ドリブルとシュートで違いを生み出す", career: ["PSV（2018-23）", "チェルシー（2023-）"] },
  { position: "FW", nameJa: "ドミニク・カルバート＝ルーウィン", club: "リーズ", comment: "5年ぶりの代表復帰。リーズ昇格に貢献したゴールゲッター", career: ["シェフィールド・ユナイテッド（2014-16）", "エヴァートン（2016-24）", "リーズ（2024-）"] },
  { position: "FW", nameJa: "ドミニク・ソランケ", club: "トッテナム", comment: "ケインの控えNo.1候補。ポストプレーと決定力が高い", career: ["チェルシーU21", "リバプール（2017-19）", "ボーンマス（2019-24）", "トッテナム（2024-）"], japanConnection: "ボーンマス在籍時に日本代表FW候補だった中村敬斗と2023年に対戦。ボーンマスには当時、コーチとして元日本代表監督の森保氏のスタッフと交流があった。" },
  { position: "FW", nameJa: "モーガン・ロジャース", club: "アストン・ビラ", comment: "アストン・ビラで急成長。創造性豊かなアタッキングMF", career: ["マンチェスター・シティU21", "リンカーン（2020-21・レンタル）", "ボーンマス（2021-22・レンタル）", "ミドルズブラ（2023-24）", "アストン・ビラ（2024-）"] },
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
                        {p.firstCallUp && <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-300">初</span>}
                      </div>
                      <p className="text-xs text-gray-400 mb-1">現在所属</p>
                      <p className="text-sm font-medium text-gray-800 mb-3">🏢 {p.club}</p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">{p.comment}</p>

                      {/* これまでの経歴（アコーディオン） */}
                      <details className="group border-t border-gray-100 pt-3">
                        <summary className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                          <span className="inline-block transition-transform group-open:rotate-90 text-[10px]">▶</span>
                          これまでの経歴
                        </summary>
                        <ul className="mt-2 space-y-1">
                          {p.career.map((c) => (
                            <li key={c} className="text-xs text-gray-500 pl-4 relative before:content-['•'] before:absolute before:left-1 before:text-gray-300">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </details>

                      {/* 日本との縁 */}
                      {p.japanConnection && (
                        <div className="mt-3 rounded-lg bg-red-50 border border-red-100 p-3">
                          <p className="text-xs font-bold text-red-700 mb-1">💡 日本との縁</p>
                          <p className="text-xs text-red-600 leading-relaxed">{p.japanConnection}</p>
                        </div>
                      )}
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
