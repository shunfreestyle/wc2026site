"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "送信に失敗しました");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "送信に失敗しました");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
        <p className="text-sm text-gray-500 mb-8">ご質問・ご意見・ご要望はこちらからお送りください。</p>

        {status === "success" ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">送信が完了しました</h2>
            <p className="text-gray-500 mb-6">内容を確認の上、ご返信いたします。</p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-2 rounded-xl bg-[#0057A8] text-white text-sm font-bold hover:bg-[#004a8f] transition-colors"
            >
              もう一度送る
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お名前 <span className="text-[#E8192C]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="山田 太郎"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス <span className="text-[#E8192C]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                件名 <span className="text-[#E8192C]">*</span>
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8] transition-colors bg-white"
              >
                <option value="">選択してください</option>
                <option value="サイトの内容について">サイトの内容について</option>
                <option value="誤情報の報告">誤情報の報告</option>
                <option value="掲載依頼・提携">掲載依頼・提携</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                お問い合わせ内容 <span className="text-[#E8192C]">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057A8]/30 focus:border-[#0057A8] transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-[#E8192C] bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                ❌ {errorMsg}
              </p>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-xl bg-[#E8192C] hover:bg-[#c0141f] disabled:opacity-50 text-white font-bold text-sm transition-colors"
              >
                {status === "sending" ? "送信中..." : "送信する"}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              ※ 広告・スパム・営業目的のお問い合わせはお断りします。
            </p>
          </form>
        )}

        <p className="text-xs text-gray-400 text-center mt-6">
          運営：SAMURAI FOOTBALL 編集部
        </p>
      </div>
    </div>
  );
}
