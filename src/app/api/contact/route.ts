import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "必須項目が入力されていません" }, { status: 400 });
    }

    await resend.emails.send({
      from: "SAMURAI FOOTBALL <onboarding@resend.dev>",
      to: ["contact@samurai-football.jp"],
      subject: `【お問い合わせ】${subject}`,
      text: `お名前: ${name}\nメールアドレス: ${email}\n\n【内容】\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
