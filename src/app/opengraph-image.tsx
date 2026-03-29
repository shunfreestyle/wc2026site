import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SAMURAI FOOTBALL - 2026 FIFA World Cup Japan Fan Site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1A2E 0%, #0057A8 35%, #E8192C 50%, #00843D 65%, #1A1A2E 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 900, color: "white", display: "flex", alignItems: "center", gap: 20 }}>
          ⚽ SAMURAI FOOTBALL
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginTop: 20 }}>
          2026 FIFA World Cup — Japan National Team Fan Site
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginTop: 30, display: "flex", gap: 16 }}>
          <span style={{ color: "#E8192C" }}>USA</span>
          <span>|</span>
          <span style={{ color: "#00843D" }}>MEXICO</span>
          <span>|</span>
          <span>CANADA</span>
          <span style={{ marginLeft: 8 }}>2026</span>
        </div>
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", marginTop: 60 }}>
          samurai-football.jp
        </div>
      </div>
    ),
    { ...size }
  );
}
