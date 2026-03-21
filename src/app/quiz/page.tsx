"use client";

import { useState, useEffect, useCallback } from "react";
import { QUIZ_BEGINNER } from "@/data/quiz";

type Phase = "start" | "playing" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const questions = QUIZ_BEGINNER;
  const current = questions[currentIndex];
  const total = questions.length;

  const handleStart = () => {
    setPhase("playing");
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
  };

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  };

  const handleRetry = () => {
    setPhase("start");
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
  };

  // Popup after result
  useEffect(() => {
    if (phase !== "result") return;
    const alreadyShown = localStorage.getItem("quizPopupShown");
    if (alreadyShown) return;
    const timer = setTimeout(() => {
      setShowPopup(true);
      localStorage.setItem("quizPopupShown", "1");
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  const closePopup = () => setShowPopup(false);

  const getResultMessage = useCallback(() => {
    const pct = score / total;
    if (pct === 1) return "パーフェクト！W杯博士！";
    if (pct >= 0.8) return "素晴らしい！かなりの知識です！";
    if (pct >= 0.6) return "なかなか詳しいですね！";
    if (pct >= 0.4) return "もう少し！復習してみよう！";
    return "これから一緒に学んでいきましょう！";
  }, [score, total]);

  const shareText = `FIFAワールドカップ2026クイズで${score}/${total}問正解しました！\n${getResultMessage()}\n\nあなたも挑戦してみよう！`;
  const shareUrl = "https://samurai-football.jp/quiz";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const rakutenAffiliateUrl =
    "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9";
  const rakutenImageUrl =
    "https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1278256&item_id=10122368&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2Fproduct%2F69%2Fkd3345_01_laydown.jpg%3F_ex%3D400x400&s=400x400&t=pict";

  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Start Screen */}
          {phase === "start" && (
            <div className="text-center">
              <div className="mb-8">
                <span className="text-6xl">⚽</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                FIFAワールドカップ2026
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-6">
                W杯クイズに挑戦！
              </h2>
              <p className="text-gray-300 mb-2">全{total}問のクイズに挑戦しよう！</p>
              <p className="text-gray-400 text-sm mb-8">
                大会概要・日本代表・歴史から出題されます
              </p>
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-12 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                クイズを始める
              </button>
            </div>
          )}

          {/* Playing */}
          {phase === "playing" && (
            <div>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>
                    第{currentIndex + 1}問 / {total}問
                  </span>
                  <span>スコア: {score}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
                  Q{currentIndex + 1}. {current.question}
                </h2>

                <div className="space-y-3">
                  {current.options.map((option, idx) => {
                    let btnClass =
                      "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ";

                    if (selected === null) {
                      btnClass +=
                        "border-white/20 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 cursor-pointer";
                    } else if (idx === current.correct) {
                      btnClass +=
                        "border-green-400 bg-green-500/20 text-green-300";
                    } else if (idx === selected) {
                      btnClass +=
                        "border-red-400 bg-red-500/20 text-red-300";
                    } else {
                      btnClass +=
                        "border-white/10 text-gray-500";
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

              {/* Feedback & Next */}
              {selected !== null && (
                <div className="text-center">
                  <p
                    className={`text-lg font-bold mb-4 ${
                      selected === current.correct
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selected === current.correct
                      ? "⭕ 正解！"
                      : `❌ 不正解… 正解は「${current.options[current.correct]}」`}
                  </p>
                  <button
                    onClick={handleNext}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all"
                  >
                    {currentIndex + 1 < total ? "次の問題へ →" : "結果を見る →"}
                  </button>
                </div>
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
              <p className="text-gray-400 mb-6">FIFAワールドカップ2026</p>

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

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a2e] border border-white/20 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={closePopup}
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
            <div className="flex justify-center mb-4">
              <a href={rakutenAffiliateUrl} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rakutenImageUrl}
                  alt="日本代表ユニフォーム"
                  className="rounded-lg max-h-48 object-contain"
                />
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={rakutenAffiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#BF0000] hover:bg-[#a00000] text-white font-bold py-3 px-6 rounded-xl text-center transition-all"
              >
                楽天市場で見る →
              </a>
              <button
                onClick={closePopup}
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
