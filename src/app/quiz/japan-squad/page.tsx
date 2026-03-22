"use client";

import { useState, useEffect, useCallback } from "react";
import { QUIZ_JAPAN_SQUAD } from "@/data/quiz";
import type { QuizQuestion } from "@/data/quiz";

type Phase = "start" | "level-select" | "playing" | "result";

const LEVEL_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "Lv.1 超初級", color: "from-green-600 to-green-500" },
  2: { label: "Lv.2 初級", color: "from-blue-600 to-blue-500" },
  3: { label: "Lv.3 中級", color: "from-yellow-600 to-yellow-500" },
  4: { label: "Lv.4 上級", color: "from-orange-600 to-orange-500" },
  5: { label: "Lv.5 超上級", color: "from-red-600 to-red-500" },
};

const RAKUTEN_BUY_URL =
  "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9";

const RAKUTEN_BANNER_HTML =
  '<a href="https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;display:block;text-align:center;"><img src="https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1278256&item_id=10122368&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2F2024fw%2Fkd3345-mn1_d.jpg%3F_ex%3D400x400&s=400x400&t=picttext" border="0" style="margin:2px;max-height:180px;width:auto;object-fit:contain;border-radius:8px;" alt="日本代表ユニフォーム 半袖" title="日本代表ユニフォーム 半袖" /></a>';

interface FeedbackPopupProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  note?: string;
  onNext: () => void;
  nextLabel: string;
}

function FeedbackPopup({ isCorrect, correctAnswer, explanation, note, onNext, nextLabel }: FeedbackPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden
          ${isCorrect
            ? "bg-gradient-to-br from-[#0a2e1a] to-[#0d3b22] border-t-4 sm:border-4 border-green-500"
            : "bg-gradient-to-br from-[#2e0a0a] to-[#3b0d0d] border-t-4 sm:border-4 border-red-500"
          }`}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
        <div className={`px-6 pt-4 pb-4 flex items-center gap-3 ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
          <span className="text-4xl">{isCorrect ? "⭕" : "❌"}</span>
          <div>
            <p className={`text-xl font-extrabold ${isCorrect ? "text-green-300" : "text-red-300"}`}>
              {isCorrect ? "正解！" : "不正解…"}
            </p>
            {!isCorrect && (
              <p className="text-sm text-gray-300 mt-0.5">
                正解は「<span className="font-bold text-green-300">{correctAnswer}</span>」でした
              </p>
            )}
          </div>
        </div>
        <div className="px-6 py-4">
          <p className="text-blue-400 text-sm font-bold mb-2">📖 解説</p>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed">{explanation}</p>
          {note && (
            <p className="mt-3 text-xs text-yellow-400/80 bg-yellow-400/10 rounded-lg px-3 py-2">{note}</p>
          )}
        </div>
        <div className="px-6 pb-8 sm:pb-6 pt-2">
          <button
            onClick={onNext}
            className={`w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg transition-all active:scale-95
              ${isCorrect
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white"
              }`}
          >
            {nextLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function JapanSquadQuizPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);

  const current = questions[currentIndex];
  const total = questions.length;

  const handleStart = () => {
    setPhase("level-select");
  };

  const handleLevelSelect = (level: number) => {
    const levelQuestions = QUIZ_JAPAN_SQUAD.filter((q) => q.level === level);
    setQuestions(levelQuestions);
    setSelectedLevel(level);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setPhase("playing");
  };

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) {
      setScore((s) => s + 1);
    }
    setTimeout(() => setShowFeedback(true), 350);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  };

  const handleRetry = () => {
    setPhase("level-select");
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
  };

  useEffect(() => {
    if (phase !== "result") return;
    const timer = setTimeout(() => {
      setShowAdPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  const getResultMessage = useCallback(() => {
    const pct = score / total;
    if (pct === 1) return "パーフェクト！代表マニア！🏆";
    if (pct >= 0.8) return "素晴らしい！かなりの知識です！🌟";
    if (pct >= 0.6) return "なかなか詳しいですね！👏";
    if (pct >= 0.4) return "もう少し！復習してみよう！💪";
    return "これから一緒に学んでいきましょう！⚽";
  }, [score, total]);

  const levelInfo = LEVEL_LABELS[selectedLevel];
  const shareText = `日本代表イギリス遠征メンバークイズ（${levelInfo.label}）で${score}/${total}問正解しました！\n${getResultMessage()}\n\nあなたも挑戦してみよう！`;
  const shareUrl = "https://samurai-football.jp/quiz/japan-squad";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Start Screen */}
          {phase === "start" && (
            <div className="text-center">
              <div className="mb-8">
                <span className="text-6xl">🇯🇵</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                日本代表 イギリス遠征メンバークイズ
              </h1>
              <p className="text-blue-300 font-semibold text-lg mb-2">
                招集28名を全部知ってる？
              </p>
              <p className="text-gray-400 text-sm mb-8">
                レベル1〜5の50問に挑戦！
              </p>
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                レベルを選ぶ
              </button>
            </div>
          )}

          {/* Level Select */}
          {phase === "level-select" && (
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                レベルを選択
              </h2>
              <p className="text-gray-400 mb-8">
                各レベル10問ずつ出題されます
              </p>
              <div className="space-y-4 max-w-sm mx-auto">
                {[1, 2, 3, 4, 5].map((level) => {
                  const info = LEVEL_LABELS[level];
                  return (
                    <button
                      key={level}
                      onClick={() => handleLevelSelect(level)}
                      className={`w-full bg-gradient-to-r ${info.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg transition-all hover:scale-105`}
                    >
                      {info.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Playing */}
          {phase === "playing" && current && (
            <div>
              {/* Level badge + Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span
                    className={`bg-gradient-to-r ${levelInfo.color} text-white text-xs font-bold px-3 py-1 rounded-full`}
                  >
                    {levelInfo.label}
                  </span>
                  <span>
                    第{currentIndex + 1}問 / {total}問
                    <span className="ml-3 text-blue-400">スコア: {score}</span>
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((currentIndex) / total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
                  Q{currentIndex + 1}. {current.question}
                </h2>

                <div className="space-y-3">
                  {current.options.map((option, idx) => {
                    let btnClass =
                      "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ";

                    if (selected === null) {
                      btnClass +=
                        "border-white/20 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 cursor-pointer active:scale-[0.98]";
                    } else if (idx === current.correct) {
                      btnClass +=
                        "border-green-400 bg-green-500/20 text-green-300";
                    } else if (idx === selected) {
                      btnClass +=
                        "border-red-400 bg-red-500/20 text-red-300";
                    } else {
                      btnClass += "border-white/10 text-gray-500";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={btnClass}
                        disabled={selected !== null}
                      >
                        <span className="mr-3 inline-block w-6 h-6 rounded-full border border-current text-center text-xs leading-6">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selected === null && (
                <p className="text-center text-gray-600 text-xs">
                  選択肢をタップして回答してください
                </p>
              )}
            </div>
          )}

          {/* Result */}
          {phase === "result" && (
            <div className="text-center">
              <div className="mb-6">
                <span className="text-6xl">🏆</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                クイズ結果
              </h2>
              <p className="text-gray-400 mb-6">
                日本代表イギリス遠征メンバークイズ ─{" "}
                {levelInfo.label}
              </p>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-8">
                <p className="text-5xl sm:text-6xl font-bold text-white mb-2">
                  {score}
                  <span className="text-2xl text-gray-400">/{total}</span>
                </p>
                <p className="text-blue-300 font-semibold text-lg">
                  {getResultMessage()}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Xで結果をシェア
                </a>
                <button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  もう一度挑戦する
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedback && current && selected !== null && (
        <FeedbackPopup
          isCorrect={selected === current.correct}
          correctAnswer={current.options[current.correct]}
          explanation={current.explanation}
          note={current.note}
          onNext={handleNext}
          nextLabel={currentIndex + 1 < total ? "次の問題へ →" : "結果を見る →"}
        />
      )}

      {/* Ad Popup */}
      {showAdPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setShowAdPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl leading-none"
              aria-label="閉じる"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-2 text-center">
              日本代表ユニフォームはもう手に入れた？
            </h3>
            <p className="text-gray-400 text-sm text-center mb-4">
              W杯本番着用モデルが楽天市場で購入できます！
            </p>
            <div
              className="flex justify-center mb-4"
              dangerouslySetInnerHTML={{ __html: RAKUTEN_BANNER_HTML }}
            />
            <div className="flex flex-col gap-3">
              <a
                href={RAKUTEN_BUY_URL}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="block w-full bg-[#BF0000] hover:bg-[#a00000] text-white font-bold py-3 px-6 rounded-xl text-center transition-all"
              >
                楽天市場で見る →
              </a>
              <button
                onClick={() => setShowAdPopup(false)}
                className="text-gray-400 hover:text-gray-200 text-sm transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
