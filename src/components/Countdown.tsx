"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T10:00:00Z"); // 2026/6/11 19:00 JST

function calcDiff() {
  const now = Date.now();
  const diff = TARGET.getTime() - now;
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const s = Math.floor(diff / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

function Block({ value, label, flip }: { value: string; label: string; flip?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <span
          key={flip ? value : undefined}
          className="block tabular-nums font-extrabold text-white text-2xl md:text-[2.5rem] leading-none"
          style={{
            fontVariantNumeric: "tabular-nums",
            animation: flip ? "flipDown 0.4s ease-out" : undefined,
          }}
        >
          {value}
        </span>
      </div>
      <span
        className="mt-1.5 uppercase tracking-[0.12em] text-[9px]"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="text-xl md:text-2xl font-bold self-start mt-2 sm:mt-2.5"
      style={{ color: "rgba(255,255,255,0.2)" }}
    >
      :
    </span>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    setTime(calcDiff());
    const id = setInterval(() => setTime(calcDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  const d = time ? String(time.d) : "---";
  const h = time ? String(time.h).padStart(2, "0") : "--";
  const m = time ? String(time.m).padStart(2, "0") : "--";
  const s = time ? String(time.s).padStart(2, "0") : "--";

  return (
    <div className="flex flex-col items-center">
      {/* Accent line */}
      <div
        className="mb-4 rounded-full"
        style={{
          width: "40px",
          height: "2px",
          background: "linear-gradient(90deg, #E8192C, #0057A8, #00843D)",
        }}
      />

      <div className="flex items-start gap-2 sm:gap-3">
        <Block value={d} label="Days" />
        <Colon />
        <Block value={h} label="Hours" />
        <Colon />
        <Block value={m} label="Min" />
        <Colon />
        <Block value={s} label="Sec" flip />
      </div>
    </div>
  );
}
