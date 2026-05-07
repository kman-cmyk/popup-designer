"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar } from "@/components/ui/AppBar";

const CATALOG = [
  { name: "선반", spec: "600 × 1800", color: "#FFD93D" },
  { name: "백라이트 패널", spec: "600 × 2400", color: "#4ECDC4" },
  { name: "거울", spec: "600 × 1800", color: "#A78BFA" },
  { name: "가챠머신", spec: "600 × 1800", color: "#FF6B9D" },
  { name: "테이블", spec: "1200 × 600", color: "#6BCF7F" },
  { name: "카운터", spec: "1200 × 900", color: "#FF9F43" },
  { name: "행거", spec: "900 × 1800", color: "#5DADE2" },
  { name: "포토월", spec: "1800 × 2400", color: "#EC7063" },
];

function LayoutAnim() {
  const FLOOR = { w: 100, h: 70 };
  const MODS = [
    { x: 8, y: 10, w: 24, h: 14, label: "선반", kind: "shelf" },
    { x: 36, y: 10, w: 28, h: 14, label: "백라이트", kind: "panel" },
    { x: 68, y: 10, w: 24, h: 22, label: "거울", kind: "mirror" },
    { x: 8, y: 32, w: 18, h: 30, label: "가챠", kind: "gacha" },
    { x: 30, y: 38, w: 38, h: 12, label: "테이블", kind: "table" },
    { x: 72, y: 40, w: 20, h: 22, label: "카운터", kind: "counter" },
  ];
  const COLORS: Record<string, { fill: string; stroke: string; text: string }> = {
    shelf: { fill: "#FFD93D", stroke: "#B8951E", text: "#5C4A0F" },
    panel: { fill: "#4ECDC4", stroke: "#2A9D94", text: "#0F4944" },
    mirror: { fill: "#A78BFA", stroke: "#7C5CD9", text: "#2E1B5E" },
    gacha: { fill: "#FF6B9D", stroke: "#D63D77", text: "#5C0F2E" },
    table: { fill: "#6BCF7F", stroke: "#3FA557", text: "#0F4920" },
    counter: { fill: "#FF9F43", stroke: "#D67318", text: "#5C2F0A" },
  };
  const PLACE_DUR = 0.55, HOLD = 1.4, FADE = 0.6;
  const TOTAL = MODS.length * PLACE_DUR + HOLD + FADE;
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number, start: number | undefined;
    const tick = (now: number) => { if (!start) start = now; setT(((now - start) / 1000) % TOTAL); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const progresses = MODS.map((_, i) => Math.max(0, Math.min(1, (t - i * PLACE_DUR) / PLACE_DUR)));
  const fadeOut = t > MODS.length * PLACE_DUR + HOLD ? Math.min(1, (t - MODS.length * PLACE_DUR - HOLD) / FADE) : 0;

  return (
    <div style={{ height: 340, position: "relative", overflow: "hidden", borderRadius: "var(--r-md)", border: "1px solid var(--line)", background: "var(--bg-soft)" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 32, borderBottom: "1px solid var(--line)", background: "#fff", display: "flex", alignItems: "center", padding: "0 14px", gap: 10, zIndex: 2 }}>
        <div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--ink-5)" }} />)}</div>
        <div style={{ flex: 1 }} />
        <span className="t-eyebrow" style={{ fontSize: 10, color: "var(--ink-3)" }}>AI · 2D LAYOUT</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 1.6s infinite" }} />
      </div>
      <svg viewBox={`0 0 ${FLOOR.w} ${FLOOR.h}`} preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", top: 32, left: 0, right: 0, bottom: 56, width: "100%", height: "calc(100% - 88px)" }}>
        <g opacity={0.3}>{Array.from({ length: 11 }).map((_, gx) => Array.from({ length: 8 }).map((_, gy) => <circle key={`${gx}-${gy}`} cx={gx * 10} cy={gy * 10} r="0.3" fill="#9aa0a6" />))}</g>
        <rect x="2" y="2" width={FLOOR.w - 4} height={FLOOR.h - 4} fill="none" stroke="#1a1a1a" strokeWidth="0.4" strokeDasharray="1.5 1" opacity={1 - fadeOut} />
        {MODS.map((m, i) => {
          const p = progresses[i]; if (p === 0) return null;
          const e = ease(p); const c = COLORS[m.kind];
          return (
            <g key={i} opacity={e * (1 - fadeOut)} style={{ transform: `translateY(${(1 - e) * -14}px)` }}>
              <rect x={m.x + 0.4} y={m.y + 0.6} width={m.w} height={m.h} fill="#1a1a1a" opacity={0.1 * e} rx="0.6" />
              <rect x={m.x} y={m.y} width={m.w} height={m.h} fill={c.fill} stroke={c.stroke} strokeWidth="0.5" rx="0.6" />
              <text x={m.x + m.w / 2} y={m.y + m.h / 2 + 0.8} fontSize="2" fontFamily="ui-monospace" fontWeight="700" fill={c.text} textAnchor="middle" opacity={Math.max(0, (e - 0.5) / 0.5)}>{m.label}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 56, borderTop: "1px solid var(--line)", background: "#fff", padding: "8px 16px", zIndex: 2 }}>
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
          <span className="t-eyebrow" style={{ fontSize: 10, color: "var(--ink-3)" }}>모듈 배치 중</span>
          <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-2)" }}>{Math.min(MODS.length, Math.ceil(t / PLACE_DUR))} / {MODS.length}</span>
        </div>
        <div className="row gap-2" style={{ flexWrap: "wrap" }}>
          {MODS.slice(0, Math.min(MODS.length, Math.ceil(t / PLACE_DUR))).map((m, i) => (
            <span key={i} style={{ fontSize: 10, padding: "1px 8px", border: "1px solid var(--line)", borderRadius: 999, fontFamily: "ui-monospace", background: i === Math.ceil(t / PLACE_DUR) - 1 ? "var(--ink-1)" : "#fff", color: i === Math.ceil(t / PLACE_DUR) - 1 ? "#fff" : "var(--ink-2)" }}>{m.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="home" />

      {/* Hero */}
      <section style={{ padding: "72px 80px 40px", textAlign: "center" }}>
        <div className="stagger" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="row gap-2" style={{ justifyContent: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>FOR BRAND TEAMS · 팝업·전시·매장</span>
          </div>
          <h1 className="t-display" style={{ marginTop: 16 }}>
            팝업스토어, <span>설계부터 제작까지</span><br />
            한 곳에서 편하게.
          </h1>
          <p className="t-body-lg" style={{ marginTop: 20, color: "var(--ink-3)", maxWidth: 580, margin: "20px auto 0" }}>
            AI랑 공간 마케팅 전문가가 정성스럽게 제안을 작성해 드릴게요.<br />
            평균 8시간 정도 걸리고, 완성이 되면 바로 알림을 보내드릴게요!
            <span style={{ display: "block", fontSize: 13, marginTop: 8, color: "var(--ink-4)" }}>※ 접수 건이 많을 때는 조금 더 걸릴 수 있어요.</span>
          </p>
          <div className="row gap-3" style={{ marginTop: 32, justifyContent: "center" }}>
            <Link href="/chat"><button className="btn btn-accent btn-lg">설계 받아보기 →</button></Link>
          </div>
          <div style={{ marginTop: 48 }}><LayoutAnim /></div>
        </div>
      </section>

      {/* 모듈 카탈로그 */}
      <section style={{ padding: "56px 80px 64px", borderTop: "1px solid var(--line)" }}>
        <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <span className="t-eyebrow">OUR MODULES · 50+</span>
            <h2 className="t-h1" style={{ marginTop: 8 }}>검증된 모듈로 빠르게 조립해 드려요.</h2>
            <p className="t-body" style={{ marginTop: 10, color: "var(--ink-3)", maxWidth: 540 }}>하나하나 직접 제작·검수한 모듈이에요. 브랜드 정체성에 맞춰 조합·커스텀해 드려요.</p>
          </div>
          <button className="btn btn-ghost">전체 모듈 보기 →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
          {CATALOG.map((m, i) => (
            <div key={m.name} className="surface" style={{ padding: 0, overflow: "hidden", cursor: "pointer", transition: "transform .2s, border-color .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ink-1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.borderColor = ""; }}>
              <div style={{ height: 120, background: m.color, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--line)", position: "relative" }}>
                <div style={{ width: 50, height: 76, background: "rgba(255,255,255,0.85)", border: "2px solid rgba(0,0,0,0.18)", borderRadius: 4, boxShadow: "2px 3px 0 rgba(0,0,0,0.12)" }} />
                <span className="t-mono" style={{ position: "absolute", top: 8, left: 10, fontSize: 9, fontWeight: 700, color: "rgba(0,0,0,0.55)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>{m.spec}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 통계 */}
        <div className="row gap-6" style={{ marginTop: 48, justifyContent: "center", color: "var(--ink-3)" }}>
          {[["1,287+", "분석된 팝업·전시"], ["8시간", "평균 제안 작성"], ["50+", "검증된 모듈"]].map(([v, l], i) => (
            <div key={l} className="row gap-6">
              {i > 0 && <div style={{ width: 1, height: 28, background: "var(--line)" }} />}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 800, color: "var(--ink-1)", fontSize: 22, fontFamily: "var(--font-en)" }}>{v}</div>
                <div className="t-small">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
