"use client";

import { useEffect, useState, useRef } from "react";

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

function FadeDigit({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (value !== display) {
      setDisplay(value);
      setFading(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setFading(false);
      }, 200);
    }
  }, [value, display]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className="block tabular-nums font-extrabold text-white text-2xl md:text-4xl leading-none"
      style={{
        fontVariantNumeric: "tabular-nums",
        animation: fading ? "fadeNum 0.2s ease" : undefined,
      }}
    >
      {display}
    </span>
  );
}

function Block({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center overflow-visible"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <FadeDigit value={value} />
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
      className="text-xl md:text-2xl font-bold self-start mt-6 md:mt-8"
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
        <Block value={s} label="Sec" />
      </div>
    </div>
  );
}
