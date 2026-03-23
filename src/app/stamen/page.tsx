"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";

/* ─── Types ─── */
interface Position {
  pos: string;
  x: number;
  y: number;
}
interface Formation {
  id: string;
  name: string;
  tag: string;
  positions: Position[];
}
interface Player {
  name: string;
  pos: string;
}

/* ─── Formations ─── */
const FORMATIONS: Formation[] = [
  {
    id: "3421",
    name: "3-4-2-1",
    tag: "現在のメイン布陣",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "CB", x: 25, y: 75 },
      { pos: "CB", x: 50, y: 75 },
      { pos: "CB", x: 75, y: 75 },
      { pos: "WB", x: 10, y: 55 },
      { pos: "MF", x: 35, y: 55 },
      { pos: "MF", x: 65, y: 55 },
      { pos: "WB", x: 90, y: 55 },
      { pos: "SH", x: 30, y: 35 },
      { pos: "SH", x: 70, y: 35 },
      { pos: "FW", x: 50, y: 18 },
    ],
  },
  {
    id: "4231",
    name: "4-2-3-1",
    tag: "カタール前の基本形",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 35, y: 57 },
      { pos: "MF", x: 65, y: 57 },
      { pos: "MF", x: 18, y: 38 },
      { pos: "MF", x: 50, y: 38 },
      { pos: "MF", x: 82, y: 38 },
      { pos: "FW", x: 50, y: 18 },
    ],
  },
  {
    id: "433",
    name: "4-3-3",
    tag: "攻撃的オプション",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "DF", x: 18, y: 75 },
      { pos: "DF", x: 38, y: 75 },
      { pos: "DF", x: 62, y: 75 },
      { pos: "DF", x: 82, y: 75 },
      { pos: "MF", x: 25, y: 52 },
      { pos: "MF", x: 50, y: 52 },
      { pos: "MF", x: 75, y: 52 },
      { pos: "FW", x: 18, y: 25 },
      { pos: "FW", x: 50, y: 18 },
      { pos: "FW", x: 82, y: 25 },
    ],
  },
  {
    id: "352",
    name: "3-5-2",
    tag: "守備的3バック",
    positions: [
      { pos: "GK", x: 50, y: 92 },
      { pos: "CB", x: 25, y: 75 },
      { pos: "CB", x: 50, y: 75 },
      { pos: "CB", x: 75, y: 75 },
      { pos: "WB", x: 8, y: 52 },
      { pos: "MF", x: 30, y: 52 },
      { pos: "MF", x: 50, y: 52 },
      { pos: "MF", x: 70, y: 52 },
      { pos: "WB", x: 92, y: 52 },
      { pos: "FW", x: 35, y: 22 },
      { pos: "FW", x: 65, y: 22 },
    ],
  },
];

/* ─── Squad (28 players) ─── */
const SQUAD: Player[] = [
  { name: "鈴木彩艶", pos: "GK" },
  { name: "大迫敬介", pos: "GK" },
  { name: "谷晃生", pos: "GK" },
  { name: "早川友基", pos: "GK" },
  { name: "板倉滉", pos: "DF" },
  { name: "冨安健洋", pos: "DF" },
  { name: "町田浩樹", pos: "DF" },
  { name: "橋岡大樹", pos: "DF" },
  { name: "高井幸大", pos: "DF" },
  { name: "長友佑都", pos: "DF" },
  { name: "瀬古歩夢", pos: "DF" },
  { name: "遠藤航", pos: "MF" },
  { name: "守田英正", pos: "MF" },
  { name: "田中碧", pos: "MF" },
  { name: "鎌田大地", pos: "MF" },
  { name: "旗手怜央", pos: "MF" },
  { name: "堂安律", pos: "MF" },
  { name: "安藤智哉", pos: "MF" },
  { name: "三笘薫", pos: "FW" },
  { name: "伊東純也", pos: "FW" },
  { name: "中村敬斗", pos: "FW" },
  { name: "前田大然", pos: "FW" },
  { name: "南野拓実", pos: "FW" },
  { name: "小川航基", pos: "FW" },
  { name: "鈴木唯人", pos: "FW" },
  { name: "後藤啓介", pos: "FW" },
  { name: "塩貝健人", pos: "FW" },
];

/* ─── Half-court Y remap: newY = 8 + (oldY - 18) * 80 / 74 ─── */
function toHalfY(y: number): number {
  return Math.round(8 + ((y - 18) * 80) / 74);
}

/* ─── Toast ─── */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-fade-in">
      <div className="bg-red-600 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-bold flex items-center gap-3">
        <span>{message}</span>
        <button onClick={onClose} className="text-white/70 hover:text-white text-lg leading-none">
          ✕
        </button>
      </div>
    </div>
  );
}

/* ─── Step Bar ─── */
const STEP_LABELS = ["フォーメーション", "スタメン", "ベンチ", "確認・シェア"];
function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                done
                  ? "bg-blue-500 border-blue-500 text-white"
                  : active
                  ? "bg-red-500 border-red-500 text-white"
                  : "bg-white/10 border-white/20 text-gray-500"
              }`}
            >
              {done ? "✓" : i + 1}
            </div>
            <span className={`text-[10px] mt-1 ${active ? "text-red-400 font-bold" : done ? "text-blue-400" : "text-gray-600"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Half-court Pitch component ─── */
function Pitch({
  positions,
  slots,
  onSlotClick,
  readonly,
}: {
  positions: Position[];
  slots: (Player | null)[];
  onSlotClick?: (index: number) => void;
  readonly?: boolean;
}) {
  return (
    <div className="relative w-full aspect-[5/3] bg-gradient-to-b from-[#2d8a4e] to-[#1e6b3a] rounded-2xl overflow-hidden border border-white/10">
      {/* pitch lines (half-court) */}
      <div className="absolute inset-0">
        {/* border */}
        <div className="absolute inset-[4%] border-2 border-white/30 rounded-sm" />
        {/* penalty area (top) */}
        <div className="absolute left-[22%] right-[22%] top-[4%] h-[18%] border-2 border-t-0 border-white/30" />
        {/* goal area (top) */}
        <div className="absolute left-[34%] right-[34%] top-[4%] h-[9%] border-2 border-t-0 border-white/30" />
        {/* penalty arc (bottom, simulated as half-circle at bottom edge) */}
        <div className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[30%] h-[12%] border-2 border-b-0 border-white/30 rounded-t-full" />
      </div>

      {/* player slots */}
      {positions.map((p, i) => {
        const player = slots[i];
        const isGK = p.pos === "GK";
        const filled = !!player;
        const mappedY = toHalfY(p.y);
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${mappedY}%` }}
          >
            <button
              onClick={() => !readonly && onSlotClick?.(i)}
              disabled={readonly}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all ${
                filled
                  ? isGK
                    ? "bg-[#c8960c] text-white shadow-lg shadow-yellow-900/40"
                    : "bg-[#003087] text-white shadow-lg shadow-blue-900/40"
                  : "border-2 border-dashed border-white/50 text-white/50 hover:border-white hover:text-white cursor-pointer"
              }`}
            >
              {filled ? player.name.slice(0, 2) : "+"}
            </button>
            <span className="text-[9px] sm:text-[10px] text-white mt-0.5 font-medium text-center whitespace-nowrap drop-shadow">
              {filled ? player.name : p.pos}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Player Select Modal ─── */
function PlayerModal({
  squad,
  usedNames,
  posFilter,
  onSelect,
  onClose,
}: {
  squad: Player[];
  usedNames: Set<string>;
  posFilter: string;
  onSelect: (p: Player) => void;
  onClose: () => void;
}) {
  const posMap: Record<string, string[]> = {
    GK: ["GK"],
    CB: ["DF"],
    SB: ["DF"],
    DF: ["DF"],
    WB: ["DF", "MF"],
    SH: ["MF", "FW"],
    MF: ["MF"],
    FW: ["FW"],
  };
  const matchPos = posMap[posFilter] ?? [posFilter];
  const recommended = squad.filter((p) => matchPos.includes(p.pos));
  const others = squad.filter((p) => !matchPos.includes(p.pos));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[480px] bg-[#1a1a2e] border-t border-white/20 rounded-t-3xl max-h-[65vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#1a1a2e] px-5 pt-5 pb-3 border-b border-white/10 z-10">
          <div className="w-10 h-1 rounded-full bg-white/30 mx-auto mb-3" />
          <h3 className="text-white font-bold text-base">
            選手を選択 <span className="text-gray-400 text-sm font-normal">（{posFilter}）</span>
          </h3>
        </div>
        <div className="p-4">
          {recommended.length > 0 && (
            <>
              <p className="text-xs text-blue-400 font-bold mb-2">おすすめ</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {recommended.map((p) => {
                  const used = usedNames.has(p.name);
                  return (
                    <button
                      key={p.name}
                      onClick={() => !used && onSelect(p)}
                      disabled={used}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left text-sm transition-all ${
                        used
                          ? "opacity-35 cursor-not-allowed bg-white/5 text-gray-500"
                          : "bg-white/10 hover:bg-blue-500/20 text-white hover:border-blue-400 border border-white/10"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          p.pos === "GK" ? "bg-[#c8960c]" : "bg-[#003087]"
                        } text-white`}
                      >
                        {p.name.slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-bold text-xs">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.pos}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
          {others.length > 0 && (
            <>
              <p className="text-xs text-gray-400 font-bold mb-2">その他</p>
              <div className="grid grid-cols-2 gap-2 pb-4">
                {others.map((p) => {
                  const used = usedNames.has(p.name);
                  return (
                    <button
                      key={p.name}
                      onClick={() => !used && onSelect(p)}
                      disabled={used}
                      className={`flex items-center gap-2 px-3 py-3 rounded-xl text-left text-sm transition-all ${
                        used
                          ? "opacity-35 cursor-not-allowed bg-white/5 text-gray-500"
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          p.pos === "GK" ? "bg-[#c8960c]" : "bg-[#003087]"
                        } text-white`}
                      >
                        {p.name.slice(0, 2)}
                      </span>
                      <div>
                        <p className="font-bold text-xs">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.pos}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function StamenPage() {
  const [step, setStep] = useState(0);
  const [formation, setFormation] = useState<Formation | null>(null);
  const [slots, setSlots] = useState<(Player | null)[]>(Array(11).fill(null));
  const [bench, setBench] = useState<Player[]>([]);
  const [modalSlot, setModalSlot] = useState<number | null>(null);
  const [benchModal, setBenchModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const usedNames = new Set([
    ...slots.filter(Boolean).map((p) => p!.name),
    ...bench.map((p) => p.name),
  ]);

  const filledCount = slots.filter(Boolean).length;

  /* ── slide transition helper ── */
  const changeStep = useCallback((newStep: number, direction: "forward" | "back") => {
    const exitClass = direction === "forward" ? "stamen-exit-left" : "stamen-exit-right";
    setAnimClass(exitClass);
    setTimeout(() => {
      setStep(newStep);
      const enterClass = direction === "forward" ? "stamen-enter-right" : "stamen-enter-left";
      setAnimClass(enterClass);
      setTimeout(() => setAnimClass(""), 300);
    }, 150);
  }, []);

  /* ── handlers ── */
  const handleFormationSelect = (f: Formation) => {
    setFormation(f);
    setSlots(Array(11).fill(null));
    setBench([]);
  };

  const handleSlotSelect = (player: Player) => {
    if (modalSlot === null) return;
    setSlots((prev) => {
      const next = [...prev];
      next[modalSlot] = player;
      return next;
    });
    setModalSlot(null);
  };

  const handleBenchSelect = (player: Player) => {
    setBench((prev) => [...prev, player]);
  };

  const handleBenchRemove = (name: string) => {
    setBench((prev) => prev.filter((p) => p.name !== name));
  };

  const handleSlotClear = (index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };

  const nextStep = () => {
    if (step === 0) {
      if (!formation) {
        showToast("フォーメーションを選択してください");
        return;
      }
      changeStep(1, "forward");
    } else if (step === 1) {
      const remaining = 11 - filledCount;
      if (remaining > 0) {
        showToast(`あと${remaining}人選択してください`);
        return;
      }
      changeStep(2, "forward");
    } else if (step === 2) {
      changeStep(3, "forward");
    }
  };

  const prevStep = () => {
    if (step > 0) changeStep(step - 1, "back");
  };

  const reset = () => {
    setAnimClass("stamen-exit-left");
    setTimeout(() => {
      setStep(0);
      setFormation(null);
      setSlots(Array(11).fill(null));
      setBench([]);
      setAnimClass("stamen-enter-left");
      setTimeout(() => setAnimClass(""), 300);
    }, 150);
  };

  const handleShare = async () => {
    const el = cardRef.current;
    if (!el) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(el, {
        backgroundColor: "#0a1628",
        scale: 2,
        useCORS: true,
      });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

      const text = `日本代表スタメン予想！${formation?.name ?? ""} #サムライブルー #SAMURAIFOOTBALL #W杯2026`;
      const url = "https://samurai-football.jp/stamen";

      if (blob && navigator.share && navigator.canShare) {
        const file = new File([blob], "stamen.png", { type: "image/png" });
        const shareData = { text: `${text}\n${url}`, files: [file] };
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      }

      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(tweetUrl, "_blank", "noopener");
    } catch {
      const text = `日本代表スタメン予想！${formation?.name ?? ""} #サムライブルー #SAMURAIFOOTBALL #W杯2026`;
      const url = "https://samurai-football.jp/stamen";
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(tweetUrl, "_blank", "noopener");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] py-8 px-4">
      <div className="max-w-[480px] mx-auto">
        {/* header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">スタメンメーカー</h1>
          <p className="text-gray-400 text-sm mt-1">あなたの理想のスタメンを組もう！</p>
        </div>

        <StepBar current={step} />

        {/* animated wrapper */}
        <div className={`stamen-step ${animClass}`}>
          {/* ━━ STEP 0: Formation ━━ */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">フォーメーションを選択</h2>
              <p className="text-gray-400 text-xs mb-5">森保ジャパンで使われるフォーメーション</p>
              <div className="grid grid-cols-2 gap-3">
                {FORMATIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFormationSelect(f)}
                    className={`rounded-xl p-4 text-left transition-all border-2 ${
                      formation?.id === f.id
                        ? "bg-blue-500/20 border-blue-400 scale-[1.02]"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <p className="text-white font-bold text-lg">{f.name}</p>
                    <p className="text-gray-400 text-xs mt-1">{f.tag}</p>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  ← トップへ
                </Link>
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  次へ →
                </button>
              </div>
            </div>
          )}

          {/* ━━ STEP 1: Starting 11 ━━ */}
          {step === 1 && formation && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">スターティング11</h2>
              <p className="text-gray-400 text-xs mb-5">
                {filledCount < 11
                  ? `ポジションをタップして選手を選んでください（${filledCount}/11）`
                  : "全員選択済み！次へ進めます"}
              </p>
              <Pitch
                positions={formation.positions}
                slots={slots}
                onSlotClick={(i) => {
                  if (slots[i]) {
                    handleSlotClear(i);
                  } else {
                    setModalSlot(i);
                  }
                }}
              />
              <p className="text-center text-[10px] text-gray-600 mt-2">※ 配置済みの選手をタップで解除</p>
              <div className="mt-6 flex justify-between items-center">
                <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  ← 戻る
                </button>
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  次へ →
                </button>
              </div>
            </div>
          )}

          {/* ━━ STEP 2: Bench ━━ */}
          {step === 2 && formation && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">ベンチメンバー（任意）</h2>
              <p className="text-gray-400 text-xs mb-5">
                ベンチに入れたい選手を選んでください（スキップ可）
              </p>
              {bench.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {bench.map((p) => (
                    <span
                      key={p.name}
                      className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {p.name}
                      <button
                        onClick={() => handleBenchRemove(p.name)}
                        className="text-gray-400 hover:text-red-400 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <button
                onClick={() => setBenchModal(true)}
                className="w-full bg-white/5 border-2 border-dashed border-white/20 hover:border-blue-400 text-gray-400 hover:text-blue-400 rounded-xl py-4 text-sm font-medium transition-all"
              >
                ＋ 選手を追加
              </button>
              <div className="mt-6 flex justify-between items-center">
                <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  ← 戻る
                </button>
                <button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all"
                >
                  次へ →
                </button>
              </div>
            </div>
          )}

          {/* ━━ STEP 3: Result & Share ━━ */}
          {step === 3 && formation && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 text-center">あなたのスタメン</h2>

              {/* Share card */}
              <div
                ref={cardRef}
                className="bg-gradient-to-b from-[#0a1628] to-[#152238] rounded-2xl overflow-hidden border border-white/10 p-5"
              >
                <div className="text-center mb-3">
                  <p className="text-white font-bold text-lg">MY STARTING XI</p>
                  <p className="text-blue-400 text-sm font-medium">{formation.name}</p>
                </div>
                <Pitch positions={formation.positions} slots={slots} readonly />
                {bench.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 font-bold mb-2">BENCH</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bench.map((p) => (
                        <span
                          key={p.name}
                          className="text-[10px] bg-white/10 text-gray-300 px-2 py-1 rounded-md"
                        >
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-center text-[10px] text-gray-500 mt-4">
                  &copy; SAMURAI FOOTBALL 2026
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Xにシェアする
                </button>
                <button
                  onClick={reset}
                  className="w-full text-gray-500 hover:text-gray-300 text-sm py-2 transition-colors"
                >
                  最初からやり直す
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ━━ Player Select Modal (for starting 11) ━━ */}
        {modalSlot !== null && formation && (
          <PlayerModal
            squad={SQUAD}
            usedNames={usedNames}
            posFilter={formation.positions[modalSlot].pos}
            onSelect={handleSlotSelect}
            onClose={() => setModalSlot(null)}
          />
        )}

        {/* ━━ Bench Select Modal ━━ */}
        {benchModal && (
          <PlayerModal
            squad={SQUAD}
            usedNames={usedNames}
            posFilter="ALL"
            onSelect={(p) => {
              handleBenchSelect(p);
              setBenchModal(false);
            }}
            onClose={() => setBenchModal(false)}
          />
        )}

        {/* ━━ Toast ━━ */}
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>

      {/* animations */}
      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }

        /* Step slide transitions */
        .stamen-step {
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
          opacity: 1;
          transform: translateX(0);
        }
        .stamen-exit-left {
          opacity: 0;
          transform: translateX(-40px);
        }
        .stamen-exit-right {
          opacity: 0;
          transform: translateX(40px);
        }
        .stamen-enter-right {
          animation: enter-from-right 0.3s ease-in-out forwards;
        }
        .stamen-enter-left {
          animation: enter-from-left 0.3s ease-in-out forwards;
        }
        @keyframes enter-from-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes enter-from-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
