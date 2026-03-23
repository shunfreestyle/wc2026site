"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { QUIZ_JAPAN_SQUAD, QUIZ_ENGLAND, QUIZ_SCOTLAND, QUIZ_WC } from "@/data/quiz";
import type { QuizQuestion } from "@/data/quiz";
import { useLanguage } from "@/contexts/LanguageContext";

type Category = "japan" | "england" | "scotland" | "wc";
type Screen = "category" | "level" | "quiz" | "result";

const levelLabels = ["Lv.1 超初級 ⚽", "Lv.2 初級 🌟", "Lv.3 中級 🔥", "Lv.4 上級 💎", "Lv.5 超上級 👑"];

const RAKUTEN_BUY_URL =
  "https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=pict&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0Iiwic2l6ZSI6IjQwMHg0MDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9";

const RAKUTEN_BANNER_HTML =
  '<a href="https://hb.afl.rakuten.co.jp/ichiba/521aa121.b7b3d243.521aa122.9bcc9825/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fadidas%2Fkd3345-mn1%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiI0MDB4NDAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;display:block;text-align:center;"><img src="https://hbb.afl.rakuten.co.jp/hgb/521aa121.b7b3d243.521aa122.9bcc9825/?me_id=1278256&item_id=10122368&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fadidas%2Fcabinet%2F2024fw%2Fkd3345-mn1_d.jpg%3F_ex%3D400x400&s=400x400&t=picttext" border="0" style="margin:2px;max-height:180px;width:auto;object-fit:contain;border-radius:8px;" alt="日本代表ユニフォーム 半袖" title="日本代表ユニフォーム 半袖" /></a>';

function getQuestions(category: Category | null, level: number | null): QuizQuestion[] {
  if (!category) return [];
  if (category === "japan") return QUIZ_JAPAN_SQUAD.filter((q) => q.level === (level ?? 1));
  if (category === "wc") return QUIZ_WC.filter((q) => q.level === (level ?? 1));
  if (category === "england") return QUIZ_ENGLAND;
  if (category === "scotland") return QUIZ_SCOTLAND;
  return [];
}

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={`relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden ${
          isCorrect
            ? "bg-gradient-to-br from-[#0a2e1a] to-[#0d3b22] border-t-4 sm:border-4 border-green-500"
            : "bg-gradient-to-br from-[#2e0a0a] to-[#3b0d0d] border-t-4 sm:border-4 border-red-500"
        }`}
      >
        <div className={`px-6 pt-6 pb-4 flex items-center gap-3 ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
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
          {note && <p className="mt-3 text-xs text-yellow-400/80 bg-yellow-400/10 rounded-lg px-3 py-2">{note}</p>}
        </div>
        <div className="px-6 pb-8 sm:pb-6 pt-2">
          <button
            onClick={onNext}
            className={`w-full py-4 rounded-2xl font-extrabold text-lg shadow-lg transition-all active:scale-95 ${
              isCorrect
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

export default function QuizPage() {
  const { t } = useLanguage();
  const categories = [
    { key: "japan" as Category, flag: "🇯🇵", title: `${t.quiz.categories.japan}クイズ`, sub: "イギリス遠征メンバー 50問" },
    { key: "england" as Category, flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", title: `${t.quiz.categories.england}クイズ`, sub: "対戦相手を知ろう 10問" },
    { key: "scotland" as Category, flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", title: `${t.quiz.categories.scotland}クイズ`, sub: "対戦相手を知ろう 10問" },
    { key: "wc" as Category, flag: "🌍", title: "ワールドカップクイズ", sub: "W杯の歴史・記録 Lv.1〜5" },
  ];
  const [screen, setScreen] = useState<Screen>("category");
  const [category, setCategory] = useState<Category | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);

  const questions = category ? getQuestions(category, level) : [];
  const current = questions[currentIndex];
  const total = questions.length;

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    if (cat === "japan" || cat === "wc") {
      setScreen("level");
    } else {
      setLevel(null);
      setCurrentIndex(0);
      setScore(0);
      setSelected(null);
      setShowFeedback(false);
      setScreen("quiz");
    }
  };

  const handleLevelSelect = (lv: number) => {
    setLevel(lv);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setScreen("quiz");
  };

  const handleSelect = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.correct) setScore((s) => s + 1);
    setTimeout(() => setShowFeedback(true), 350);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelected(null);
    if (currentIndex + 1 < total) setCurrentIndex((i) => i + 1);
    else setScreen("result");
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setScreen("quiz");
  };

  const handleBackToTop = () => {
    setScreen("category");
    setCategory(null);
    setLevel(null);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setShowAdPopup(false);
  };

  useEffect(() => {
    if (screen !== "result") return;
    const timer = setTimeout(() => setShowAdPopup(true), 1500);
    return () => clearTimeout(timer);
  }, [screen]);

  const getResultMessage = useCallback(() => {
    const pct = score / total;
    if (pct === 1) return "パーフェクト！W杯博士！🏆";
    if (pct >= 0.8) return "素晴らしい！かなりの知識です！🌟";
    if (pct >= 0.6) return "なかなか詳しいですね！👏";
    if (pct >= 0.4) return "もう少し！復習してみよう！💪";
    return "これから一緒に学んでいきましょう！⚽";
  }, [score, total]);

  const categoryLabel = categories.find((c) => c.key === category);
  const shareText = `${categoryLabel?.title ?? "W杯クイズ"}${level ? `（Lv.${level}）` : ""}で${score}/${total}問正解！\n${getResultMessage()}\n\nあなたも挑戦してみよう！`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://samurai-football.jp/quiz")}`;

  return (
    <>
      <div className="min-h-[80vh] bg-gradient-to-b from-[#0a1628] to-[#1a1a2e] py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* ━━ Category Selection ━━ */}
          {screen === "category" && (
            <div className="text-center">
              <div className="mb-6">
                <span className="text-5xl">⚽</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">W杯2026 クイズ</h1>
              <p className="text-gray-400 mb-10">カテゴリを選んでクイズに挑戦！</p>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => handleCategorySelect(cat.key)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-2xl p-5 sm:p-6 text-left transition-all hover:scale-[1.02] group"
                  >
                    <span className="text-3xl block mb-2">{cat.flag}</span>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1 group-hover:text-blue-300 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500 text-xs">{cat.sub}</p>
                  </button>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                  ← トップページへ戻る
                </Link>
              </div>
            </div>
          )}

          {/* ━━ Level Selection ━━ */}
          {screen === "level" && (
            <div className="text-center">
              <div className="mb-6">
                <span className="text-5xl">{category === "wc" ? "🏆" : "🇯🇵"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{category === "wc" ? "ワールドカップクイズ" : "日本代表クイズ"}</h2>
              <p className="text-gray-400 mb-8">レベルを選んでください</p>
              <div className="space-y-3">
                {levelLabels.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => handleLevelSelect(i + 1)}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-400/50 rounded-xl py-4 px-6 text-left transition-all group flex items-center justify-between"
                  >
                    <span className="text-white font-semibold group-hover:text-blue-300 transition-colors">{label}</span>
                    <span className="text-gray-500 text-sm">10問</span>
                  </button>
                ))}
              </div>
              <button onClick={handleBackToTop} className="mt-8 text-gray-500 hover:text-gray-300 text-sm transition-colors">
                ← カテゴリ選択に戻る
              </button>
            </div>
          )}

          {/* ━━ Quiz Playing ━━ */}
          {screen === "quiz" && current && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-500">
                  {categoryLabel?.flag} {categoryLabel?.title}
                  {level ? ` Lv.${level}` : ""}
                </p>
                <button onClick={handleBackToTop} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                  やめる
                </button>
              </div>
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>第{currentIndex + 1}問 / {total}問</span>
                  <span>スコア: {score}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentIndex / total) * 100}%` }}
                  />
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8 mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
                  Q{currentIndex + 1}. {current.question}
                </h2>
                <div className="space-y-3">
                  {current.options.map((option, idx) => {
                    let btnClass =
                      "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all text-sm sm:text-base ";
                    if (selected === null)
                      btnClass +=
                        "border-white/20 text-gray-200 hover:border-blue-400 hover:bg-blue-500/10 cursor-pointer active:scale-[0.98]";
                    else if (idx === current.correct)
                      btnClass += "border-green-400 bg-green-500/20 text-green-300";
                    else if (idx === selected)
                      btnClass += "border-red-400 bg-red-500/20 text-red-300";
                    else btnClass += "border-white/10 text-gray-500";
                    return (
                      <button key={idx} onClick={() => handleSelect(idx)} className={btnClass} disabled={selected !== null}>
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
                <p className="text-center text-gray-600 text-xs">選択肢をタップして回答してください</p>
              )}
            </div>
          )}

          {/* ━━ Result ━━ */}
          {screen === "result" && (
            <div className="text-center">
              <div className="mb-6">
                <span className="text-6xl">🏆</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{t.quiz.resultTitle}</h2>
              <p className="text-gray-400 text-sm mb-6">
                {categoryLabel?.flag} {categoryLabel?.title}
                {level ? ` Lv.${level}` : ""}
              </p>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 mb-8">
                <p className="text-5xl sm:text-6xl font-bold text-white mb-2">
                  {score}
                  <span className="text-2xl text-gray-400">/{total}</span>
                </p>
                <p className="text-blue-300 font-semibold text-lg">{getResultMessage()}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all border border-white/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Xで結果をシェア
                </a>
                <button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all"
                >
                  {t.quiz.retry}
                </button>
              </div>
              <button onClick={handleBackToTop} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                ← カテゴリ選択に戻る
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ━━ Feedback Popup ━━ */}
      {showFeedback && current && selected !== null && (
        <FeedbackPopup
          isCorrect={selected === current.correct}
          correctAnswer={current.options[current.correct]}
          explanation={current.explanation}
          note={current.note}
          onNext={handleNext}
          nextLabel={currentIndex + 1 < total ? `${t.quiz.nextBtn} →` : `${t.quiz.resultTitle} →`}
        />
      )}

      {/* ━━ Ad Popup ━━ */}
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
            <h3 className="text-xl font-bold text-white mb-2 text-center">日本代表ユニフォームはもう手に入れた？</h3>
            <p className="text-gray-400 text-sm text-center mb-4">W杯本番着用モデルが楽天市場で購入できます！</p>
            <div
              className="flex justify-center mb-4"
              dangerouslySetInnerHTML={{ __html: RAKUTEN_BANNER_HTML }}
            />
            <div className="text-center">
              <a
                href={RAKUTEN_BUY_URL}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-block bg-[#BF0000] hover:bg-[#a00000] text-white font-bold py-3 px-8 rounded-xl transition-colors text-sm"
              >
                楽天市場で見る →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
