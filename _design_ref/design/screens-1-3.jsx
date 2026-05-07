/* global React */
const { useState, useEffect, useRef } = React;
const { Brand, AppBar, FlowBar, Eyebrow } = window.MYP2;

// ============================================================
// Module Layout Animation — 2D 공간 안에 모듈들이 배치되는 모션
// ============================================================
function ModuleLayoutAnimation() {
  // 6 modules placed sequentially into a 2D floor plan, looped
  // Each module: target x/y/w/h on a 100×100 unit floor, label, fillVariant
  const FLOOR = { w: 100, h: 70 }; // unit grid
  const MODULES = [
    { x: 8,  y: 10, w: 24, h: 14, label: "선반 600×1800", kind: "shelf" },
    { x: 36, y: 10, w: 28, h: 14, label: "백라이트 패널", kind: "panel" },
    { x: 68, y: 10, w: 24, h: 22, label: "거울", kind: "mirror" },
    { x: 8,  y: 32, w: 18, h: 30, label: "가챠머신", kind: "gacha" },
    { x: 30, y: 38, w: 38, h: 12, label: "테이블", kind: "table" },
    { x: 72, y: 40, w: 20, h: 22, label: "카운터", kind: "counter" },
  ];
  const PLACE_DUR = 0.55; // seconds per module
  const HOLD = 1.4;
  const FADE = 0.6;
  const TOTAL = MODULES.length * PLACE_DUR + HOLD + FADE;

  const [t, setT] = useState(0);
  useEffect(() => {
    let raf, start;
    const tick = (now) => {
      if (!start) start = now;
      const elapsed = ((now - start) / 1000) % TOTAL;
      setT(elapsed);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // compute progress per module (0..1)
  const progresses = MODULES.map((_, i) => {
    const startT = i * PLACE_DUR;
    const p = (t - startT) / PLACE_DUR;
    return Math.max(0, Math.min(1, p));
  });
  const fadeOut = t > MODULES.length * PLACE_DUR + HOLD
    ? Math.min(1, (t - MODULES.length * PLACE_DUR - HOLD) / FADE)
    : 0;

  const ease = (x) => 1 - Math.pow(1 - x, 3); // easeOutCubic

  // tetris-style colorful palette per module
  const COLORS = {
    shelf:   { fill: "#FFD93D", stroke: "#B8951E", text: "#5C4A0F", pattern: null },        // yellow
    panel:   { fill: "#4ECDC4", stroke: "#2A9D94", text: "#0F4944", pattern: "mla-grid" },   // teal
    mirror:  { fill: "#A78BFA", stroke: "#7C5CD9", text: "#2E1B5E", pattern: "mla-diag" },   // purple
    gacha:   { fill: "#FF6B9D", stroke: "#D63D77", text: "#5C0F2E", pattern: "mla-dots" },   // pink
    table:   { fill: "#6BCF7F", stroke: "#3FA557", text: "#0F4920", pattern: null },         // green
    counter: { fill: "#FF9F43", stroke: "#D67318", text: "#5C2F0A", pattern: null },         // orange
  };

  return (
    <div className="fade-up" style={{
      height: 460, position: "relative", overflow: "hidden",
      borderRadius: "var(--r-md)", border: "1px solid var(--line)",
      background: "var(--bg-soft)",
    }}>
      {/* Top label bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 36,
        borderBottom: "1px solid var(--line)", background: "#fff",
        display: "flex", alignItems: "center", padding: "0 14px", gap: 10,
        zIndex: 2,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-5)" }} />
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <span className="t-eyebrow" style={{ color: "var(--ink-3)", fontSize: 10 }}>
          AI · 2D LAYOUT
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
          animation: "mla-pulse 1.6s ease-in-out infinite" }} />
      </div>

      {/* Floor plan canvas */}
      <svg
        viewBox={`0 0 ${FLOOR.w} ${FLOOR.h}`}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute", top: 36, left: 0, right: 0, bottom: 80,
          width: "100%", height: "calc(100% - 116px)",
        }}
      >
        <defs>
          <pattern id="mla-grid" width="2" height="2" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="#4ECDC4" />
            <path d="M0 0 L2 0 M0 0 L0 2" stroke="#0F4944" strokeWidth="0.18" opacity="0.5" />
          </pattern>
          <pattern id="mla-diag" width="1.5" height="1.5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="1.5" height="1.5" fill="#A78BFA" />
            <line x1="0" y1="0" x2="0" y2="1.5" stroke="#2E1B5E" strokeWidth="0.35" opacity="0.5" />
          </pattern>
          <pattern id="mla-dots" width="2" height="2" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="#FF6B9D" />
            <circle cx="1" cy="1" r="0.3" fill="#5C0F2E" opacity="0.6" />
          </pattern>
        </defs>

        {/* dot grid background */}
        <g opacity="0.35">
          {Array.from({ length: 11 }).map((_, gx) =>
            Array.from({ length: 8 }).map((_, gy) => (
              <circle key={`${gx}-${gy}`} cx={gx * 10} cy={gy * 10} r="0.3" fill="#9aa0a6" />
            ))
          )}
        </g>

        {/* floor outline */}
        <rect
          x="2" y="2" width={FLOOR.w - 4} height={FLOOR.h - 4}
          fill="none" stroke="#1a1a1a" strokeWidth="0.4"
          strokeDasharray="1.5 1"
          opacity={1 - fadeOut}
        />
        {/* entrance arrow */}
        <g opacity={1 - fadeOut}>
          <text x="3" y="68" fontSize="2.8" fontFamily="ui-monospace" fill="#9aa0a6">ENTRANCE ↑</text>
        </g>

        {/* modules — tetris style colorful blocks */}
        {MODULES.map((m, i) => {
          const p = progresses[i];
          if (p === 0) return null;
          const e = ease(p);
          // tetris-style: drop from above with slight overshoot
          const dropOffset = (1 - e) * -14;
          const overshoot = p < 0.85 ? 0 : Math.sin((p - 0.85) / 0.15 * Math.PI) * 0.6;
          const yOffset = dropOffset + overshoot;
          const opacity = e * (1 - fadeOut);
          const c = COLORS[m.kind];
          const fill = c.pattern ? `url(#${c.pattern})` : c.fill;

          return (
            <g key={i} style={{ transform: `translateY(${yOffset}px)` }} opacity={opacity}>
              {/* drop shadow */}
              <rect
                x={m.x + 0.4} y={m.y + 0.6} width={m.w} height={m.h}
                fill="#1a1a1a" opacity={0.12 * e}
                rx="0.6"
              />
              {/* main block */}
              <rect
                x={m.x} y={m.y} width={m.w} height={m.h}
                fill={fill}
                stroke={c.stroke} strokeWidth="0.5"
                rx="0.6"
              />
              {/* tetris bevel — top-left highlight */}
              <path
                d={`M ${m.x + 0.5} ${m.y + m.h - 0.5} L ${m.x + 0.5} ${m.y + 0.5} L ${m.x + m.w - 0.5} ${m.y + 0.5}`}
                fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.5" strokeLinecap="round"
              />
              {/* tetris bevel — bottom-right shadow */}
              <path
                d={`M ${m.x + 0.5} ${m.y + m.h - 0.5} L ${m.x + m.w - 0.5} ${m.y + m.h - 0.5} L ${m.x + m.w - 0.5} ${m.y + 0.5}`}
                fill="none" stroke={c.stroke} strokeWidth="0.4" opacity="0.7" strokeLinecap="round"
              />
              {/* label */}
              <text
                x={m.x + m.w / 2} y={m.y + m.h / 2 + 0.8}
                fontSize="2"
                fontFamily="ui-monospace, 'SF Mono', monospace"
                fontWeight="700"
                fill={c.text}
                textAnchor="middle"
                opacity={Math.max(0, (e - 0.5) / 0.5)}
              >{m.label}</text>
            </g>
          );
        })}

        {/* placement crosshair on the currently-placing module */}
        {(() => {
          const idx = progresses.findIndex(p => p > 0 && p < 1);
          if (idx < 0 || fadeOut > 0) return null;
          const m = MODULES[idx];
          const cx = m.x + m.w / 2;
          const cy = m.y + m.h / 2;
          return (
            <g opacity={0.7}>
              <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke="#FF6B35" strokeWidth="0.3" />
              <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="#FF6B35" strokeWidth="0.3" />
              <circle cx={cx} cy={cy} r="0.8" fill="none" stroke="#FF6B35" strokeWidth="0.3" />
            </g>
          );
        })()}
      </svg>

      {/* Bottom status bar */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: 80,
        borderTop: "1px solid var(--line)", background: "#fff",
        padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8,
        zIndex: 2,
      }}>
        <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
          <div className="t-eyebrow" style={{ color: "var(--ink-3)", fontSize: 10 }}>
            모듈 배치 중
          </div>
          <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-2)", fontWeight: 600 }}>
            {Math.min(MODULES.length, Math.ceil(t / PLACE_DUR))} / {MODULES.length}
          </div>
        </div>
        {/* progress bar */}
        <div style={{ height: 3, background: "var(--bg-soft)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${Math.min(100, (t / (MODULES.length * PLACE_DUR)) * 100)}%`,
            background: "var(--ink-1)",
            transition: "width .12s linear",
          }} />
        </div>
        <div className="row gap-2" style={{ flexWrap: "wrap" }}>
          {MODULES.slice(0, Math.min(MODULES.length, Math.ceil(t / PLACE_DUR))).map((m, i) => (
            <span key={i} style={{
              fontSize: 10, padding: "2px 8px",
              border: "1px solid var(--line)", borderRadius: 999,
              fontFamily: "ui-monospace, monospace", color: "var(--ink-2)",
              background: i === Math.ceil(t / PLACE_DUR) - 1 ? "var(--ink-1)" : "#fff",
              color: i === Math.ceil(t / PLACE_DUR) - 1 ? "#fff" : "var(--ink-2)",
              transition: "all .2s",
            }}>{m.label}</span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes mla-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
// 2D Plan View — 평면도 스타일 팝업스토어
// ============================================================
// 정통 평면도(top-down). 그리드 + 모듈 박스 + 동선 화살표.
// 같은 블루 라인 + 주황 액센트 팔레트 유지.
function IsometricPopupAnimation() {
  const [t, setT] = useState(0);
  const TOTAL = 6.5;
  useEffect(() => {
    let raf, start;
    const tick = (now) => {
      if (!start) start = now;
      setT(((now - start) / 1000) % TOTAL);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const ease = (x) => 1 - Math.pow(1 - x, 3);
  const r = (start, dur = 0.5) => {
    const p = (t - start) / dur;
    return Math.max(0, Math.min(1, p));
  };
  const fadeOut = t > TOTAL - 0.5 ? (t - (TOTAL - 0.5)) / 0.5 : 0;
  const baseOpacity = 1 - fadeOut;

  const STROKE = "#1e3fd9";
  const LIGHT = "#e6ebff";
  const MID = "#bdcaff";
  const DARK = "#8aa0ff";
  const ACCENT = "#FF6B35";

  // === PLAN VIEW (top-down) ===
  // SVG 600 × 380. 평면도 영역: x ∈ [60, 540], y ∈ [40, 340].
  const PLAN = { x0: 60, y0: 40, w: 480, h: 300 };
  // entrance is at bottom-center

  // helper: rect with stagger appear
  const Block = ({ start, x, y, w, h, fill, stroke = STROKE, sw = 1.5, label, labelColor, dy = 0 }) => {
    const op = ease(r(start)) * baseOpacity;
    const ty = (1 - ease(r(start))) * dy;
    return (
      <g opacity={op} style={{ transform: `translateY(${ty}px)` }}>
        <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={sw} rx="2" />
        {label && (
          <text x={x + w / 2} y={y + h / 2 + 3} fontSize="9" fontWeight="700"
            fill={labelColor || stroke} textAnchor="middle"
            fontFamily="ui-monospace, monospace">{label}</text>
        )}
      </g>
    );
  };

  return (
    <div className="fade-up" style={{
      width: "100%", height: 380, position: "relative", overflow: "hidden",
      borderRadius: "var(--r-md)", border: "1px solid var(--line)",
      background: "#f6f7fb",
    }}>
      <svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
        {/* === DOT GRID BACKGROUND === */}
        <defs>
          <pattern id="plan-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill={STROKE} opacity="0.18" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="600" height="380" fill="url(#plan-dots)" />

        {/* === ROOM OUTLINE (dashed walls) === */}
        <g opacity={ease(r(0.0)) * baseOpacity}>
          <rect x={PLAN.x0} y={PLAN.y0} width={PLAN.w} height={PLAN.h}
            fill="#fff" stroke={STROKE} strokeWidth="2.5" />
          {/* entrance gap at bottom-center */}
          <rect x={PLAN.x0 + PLAN.w / 2 - 35} y={PLAN.y0 + PLAN.h - 2}
            width="70" height="4" fill="#f6f7fb" />
          {/* entrance arrow */}
          <g transform={`translate(${PLAN.x0 + PLAN.w / 2}, ${PLAN.y0 + PLAN.h + 18})`}>
            <line x1="0" y1="0" x2="0" y2="-22" stroke={ACCENT} strokeWidth="2" />
            <polygon points="-4,-18 0,-26 4,-18" fill={ACCENT} />
            <text x="0" y="14" fontSize="9" fontWeight="700" fill={ACCENT}
              textAnchor="middle" fontFamily="ui-monospace, monospace">ENTRANCE</text>
          </g>
        </g>

        {/* === N COMPASS === */}
        <g opacity={ease(r(0.0)) * baseOpacity} transform="translate(28, 60)">
          <circle cx="0" cy="0" r="14" fill="#fff" stroke={STROKE} strokeWidth="1.2" />
          <polygon points="0,-9 -4,4 0,1 4,4" fill={STROKE} />
          <text x="0" y="-18" fontSize="9" fontWeight="700" fill={STROKE}
            textAnchor="middle" fontFamily="ui-monospace, monospace">N</text>
        </g>

        {/* === MODULES (placed in sequence) === */}
        {/* Counter — top-left along upper wall */}
        <Block start={0.3} x={80} y={60} w={120} h={36} fill={LIGHT} label="COUNTER" dy={-6} />
        {/* counter accent */}
        <g opacity={ease(r(0.35)) * baseOpacity}>
          <rect x={92} y={70} width={16} height={16} fill={STROKE} rx="1" />
          <circle cx={180} cy={78} r="4" fill={ACCENT} />
        </g>

        {/* Shelf row — left wall */}
        <Block start={0.5} x={62} y={120} w={28} h={140} fill={MID} label="" dy={-6} />
        <g opacity={ease(r(0.5)) * baseOpacity}>
          <text x={102} y={195} fontSize="9" fontWeight="700" fill={STROKE}
            textAnchor="start" fontFamily="ui-monospace, monospace">SHELF</text>
        </g>

        {/* Backlit panel — right wall */}
        <Block start={0.7} x={510} y={70} w={28} h={120} fill={DARK} label="" dy={-6} />
        {/* panel labels (rotated) */}
        <g opacity={ease(r(0.7)) * baseOpacity}>
          <text x={524} y={134} fontSize="9" fontWeight="700" fill="#fff"
            textAnchor="middle" fontFamily="ui-monospace, monospace"
            transform={`rotate(-90, 524, 134)`}>BACKLIT</text>
        </g>

        {/* Display table — center (label moved above) */}
        <g opacity={ease(r(0.9)) * baseOpacity} style={{ transform: `translateY(${(1 - ease(r(0.9))) * -6}px)` }}>
          <text x={300} y={122} fontSize="9" fontWeight="700" fill={STROKE}
            textAnchor="middle" fontFamily="ui-monospace, monospace">DISPLAY TABLE</text>
          <rect x={245} y={130} width={110} height={70} fill="#fff" stroke={STROKE} strokeWidth="1.5" rx="2" />
        </g>
        {/* products on table — blue-leaning palette with one orange accent */}
        <g opacity={ease(r(0.95)) * baseOpacity}>
          <circle cx={270} cy={155} r="6" fill={STROKE} />
          <rect x={290} y={148} width="14" height="14" fill={MID} stroke={STROKE} strokeWidth="1" />
          <circle cx={325} cy={158} r="5" fill={ACCENT} />
          <rect x={278} y={175} width="20" height="14" fill={LIGHT} stroke={STROKE} strokeWidth="1" />
          <circle cx={320} cy={182} r="5" fill={DARK} />
        </g>

        {/* Gacha machine — top-right cluster */}
        <Block start={1.1} x={420} y={70} w={60} h={50} fill={LIGHT} stroke={STROKE} dy={-6} />
        <g opacity={ease(r(1.1)) * baseOpacity}>
          <circle cx={450} cy={95} r="14" fill="#fff" stroke={STROKE} strokeWidth="1.4" />
          <circle cx={444} cy={92} r="3" fill={ACCENT} />
          <circle cx={454} cy={89} r="2.5" fill={STROKE} />
          <circle cx={452} cy={100} r="2.5" fill={DARK} />
          <text x={450} y={135} fontSize="9" fontWeight="700" fill={STROKE}
            textAnchor="middle" fontFamily="ui-monospace, monospace">GACHA</text>
        </g>

        {/* Mirror — right side mid */}
        <Block start={1.3} x={460} y={220} w={50} h={20} fill={MID} label="MIRROR" labelColor="#fff" dy={-6} />

        {/* Photo zone — bottom right */}
        <Block start={1.5} x={400} y={260} w={110} h={60} fill={LIGHT} stroke={STROKE} dy={-6} />
        <g opacity={ease(r(1.5)) * baseOpacity}>
          <text x={455} y={283} fontSize="9" fontWeight="700" fill={STROKE}
            textAnchor="middle" fontFamily="ui-monospace, monospace">PHOTO ZONE</text>
          {/* camera icon */}
          <rect x={445} y={293} width="20" height="14" fill={STROKE} stroke={STROKE} strokeWidth="1.2" rx="1" />
          <circle cx={455} cy={300} r="4" fill="#fff" stroke={STROKE} strokeWidth="1.2" />
          <circle cx={455} cy={300} r="1.8" fill={ACCENT} />
        </g>

        {/* Hanger / rail — bottom-left */}
        <Block start={1.7} x={100} y={280} w={140} h={20} fill={DARK} label="HANGER" labelColor="#fff" dy={-6} />
        {/* hanger items */}
        <g opacity={ease(r(1.7)) * baseOpacity}>
          {[0,1,2,3,4].map(i => (
            <circle key={i} cx={120 + i*26} cy={290} r="2" fill="#fff" />
          ))}
        </g>

        {/* === CIRCULATION PATH (clockwise around display table) === */}
        <g opacity={ease(r(2.2)) * baseOpacity}>
          <path
            d={`M 300 330
                L 380 330
                L 380 250
                L 450 250
                L 450 215
                L 390 215
                L 390 130
                L 280 110
                L 220 110
                L 130 130
                L 130 270
                L 250 270
                L 280 330
                L 295 330`}
            fill="none" stroke={ACCENT} strokeWidth="1.8" strokeDasharray="5 4" strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* path arrowhead pointing back to entrance */}
          <polygon points="298,326 290,332 298,338" fill={ACCENT} />
        </g>

        {/* === VISITOR DOTS (people moving) === */}
        {(() => {
          const path = [
            [300, 330], [380, 330], [380, 250], [450, 250], [450, 215],
            [390, 215], [390, 130], [280, 110], [220, 110],
            [130, 130], [130, 270], [250, 270], [280, 330], [295, 330],
          ];
          const start = 2.5;
          const dur = 3.0;
          const p = Math.max(0, Math.min(1, (t - start) / dur));
          if (p <= 0) return null;
          const seg = p * (path.length - 1);
          const i = Math.floor(seg);
          const f = seg - i;
          if (i >= path.length - 1) return null;
          const [x1, y1] = path[i];
          const [x2, y2] = path[i + 1];
          const x = x1 + (x2 - x1) * f;
          const y = y1 + (y2 - y1) * f;
          return (
            <g opacity={baseOpacity}>
              <circle cx={x} cy={y} r="6" fill={ACCENT} stroke="#fff" strokeWidth="2" />
              <circle cx={x} cy={y} r="11" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.4" />
            </g>
          );
        })()}

        {/* progress dots — top right */}
        <g transform="translate(440, 24)">
          {[0,1,2,3,4,5].map(i => (
            <circle key={i} cx={i * 11} cy="0" r="2.5"
              fill={t > i * 0.45 ? ACCENT : "#cbd5ff"} />
          ))}
        </g>
      </svg>
    </div>
  );
}

// ============================================================
// Screen 01 — 랜딩 (가로 정렬: 텍스트 → 버튼 → iso 애니 → 모듈 소개)
// ============================================================
function Screen01() {
  // 보유 모듈 카탈로그 (하단)
  const MODULES_CATALOG = [
    { name: "선반", spec: "600 × 1800", color: "#FFD93D" },
    { name: "백라이트 패널", spec: "600 × 2400", color: "#4ECDC4" },
    { name: "거울", spec: "600 × 1800", color: "#A78BFA" },
    { name: "가챠머신", spec: "600 × 1800", color: "#FF6B9D" },
    { name: "테이블", spec: "1200 × 600", color: "#6BCF7F" },
    { name: "카운터", spec: "1200 × 900", color: "#FF9F43" },
    { name: "행거", spec: "900 × 1800", color: "#5DADE2" },
    { name: "포토월", spec: "1800 × 2400", color: "#EC7063" },
  ];

  return (
    <div className="frame-desktop">
      <AppBar active="home" />

      {/* Hero — center stack */}
      <div style={{ padding: "72px 80px 40px", textAlign: "center", position: "relative" }}>
        <div className="stagger" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="row gap-2" style={{ alignItems: "center", justifyContent: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>FOR BRAND TEAMS · 팝업·전시·매장</span>
          </div>
          <h1 className="t-display" style={{ marginTop: 16 }}>
            팝업스토어, <span style={{ color: "var(--ink-1)" }}>설계부터 제작까지</span><br />
            한 곳에서 편하게.
          </h1>
          <p className="t-body-lg" style={{ marginTop: 20, color: "var(--ink-3)", maxWidth: 580, margin: "20px auto 0" }}>
            AI랑 공간 마케팅 전문가가 정성스럽게 제안을 작성해 드릴게요.<br />
            평균 8시간 정도 걸리고, 완성이 되면 바로 알림을 보내드릴게요!
            <span style={{ display: "block", fontSize: 13, marginTop: 8, color: "var(--ink-4)" }}>
              ※ 접수 건이 많을 때는 조금 더 걸릴 수 있어요.
            </span>
          </p>
          <div className="row gap-3" style={{ marginTop: 32, justifyContent: "center" }}>
            <button className="btn btn-accent btn-lg">설계 받아보기 →</button>
          </div>
        </div>

        {/* Isometric animation — full width below CTA */}
        <div style={{ marginTop: 48 }}>
          <IsometricPopupAnimation />
        </div>
      </div>

      {/* 보유 모듈 소개 */}
      <div style={{ padding: "56px 80px 64px", borderTop: "1px solid var(--line)" }}>
        <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <Eyebrow>OUR MODULES · 50+</Eyebrow>
            <h2 className="t-h1" style={{ marginTop: 8 }}>
              검증된 모듈로 <span style={{ color: "var(--ink-1)" }}>빠르게 조립</span>해 드려요.
            </h2>
            <p className="t-body" style={{ marginTop: 10, color: "var(--ink-3)", maxWidth: 540 }}>
              하나하나 직접 제작·검수한 모듈이에요. 브랜드 정체성에 맞춰 조합·커스텀해 드려요.
            </p>
          </div>
          <button className="btn btn-ghost">전체 모듈 보기 →</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 32 }}>
          {MODULES_CATALOG.map((m, i) => (
            <div key={m.name} className="surface" style={{
              padding: 0, overflow: "hidden", cursor: "pointer",
              transition: "transform .2s var(--ease-out), border-color .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--ink-1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = ""; }}
            >
              {/* color block visual */}
              <div style={{
                height: 120, background: m.color, position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
                borderBottom: "1px solid var(--line)",
              }}>
                <div style={{
                  width: 50, height: 76,
                  background: "rgba(255,255,255,0.85)",
                  border: "2px solid rgba(0,0,0,0.18)",
                  borderRadius: 4,
                  boxShadow: "2px 3px 0 rgba(0,0,0,0.12)",
                }} />
                <span className="t-mono" style={{
                  position: "absolute", top: 8, left: 10,
                  fontSize: 9, fontWeight: 700, color: "rgba(0,0,0,0.55)",
                  letterSpacing: "0.05em",
                }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{m.name}</div>
                <div className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 3 }}>
                  {m.spec}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row gap-6" style={{ marginTop: 48, justifyContent: "center", color: "var(--ink-3)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, color: "var(--ink-1)", fontSize: 22, fontFamily: "var(--font-en)" }}>1,287+</div>
            <div className="t-small">분석된 팝업·전시</div>
          </div>
          <div style={{ width: 1, height: 28, background: "var(--line)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, color: "var(--ink-1)", fontSize: 22, fontFamily: "var(--font-en)" }}>8시간</div>
            <div className="t-small">평균 제안 작성</div>
          </div>
          <div style={{ width: 1, height: 28, background: "var(--line)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 800, color: "var(--ink-1)", fontSize: 22, fontFamily: "var(--font-en)" }}>50+</div>
            <div className="t-small">검증된 모듈</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 03 — AI 상담사 인트로 + 챗 (사람 같은 다정한 톤)
// ============================================================
function CounselorAvatar({ size = 44, online = true }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg, #FF8B5C 0%, #FF6B35 100%)",
        color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: size * 0.36, fontFamily: "var(--font-en)",
        boxShadow: "0 2px 8px rgba(255,107,53,0.25)",
      }}>모나</div>
      {online && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: size * 0.28, height: size * 0.28, borderRadius: "50%",
          background: "#22c55e", border: "2px solid #fff",
        }} />
      )}
    </div>
  );
}

function Screen03() {
  // overlay shows a warm intro before the chat starts
  const [introOpen, setIntroOpen] = useState(true);
  const [draft, setDraft] = useState("500");

  return (
    <div className="frame-desktop">
      <FlowBar step={1} total={6} title="AI 상담사 모나와 함께" />
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", height: "calc(100% - 56px)" }}>
        {/* Sidebar — progress */}
        <aside style={{ borderRight: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", overflowY: "auto" }}>
          <div className="row gap-3" style={{ alignItems: "center" }}>
            <CounselorAvatar size={40} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>모나 <span style={{ fontSize: 10, fontWeight: 500, color: "var(--ink-3)" }}>· AI 상담사</span></div>
              <div className="t-small" style={{ color: "#22c55e", fontWeight: 600, fontSize: 11 }}>● 지금 함께하고 있어요</div>
            </div>
          </div>

          <div className="divider" />

          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow">상담 진행 · 1/6</span>
          </div>
          <div className="col gap-2" style={{ marginTop: 14 }}>
            {[
              ["행사 이야기", "지금 듣고 있어요", "active"],
              ["판매·전시 제품", null, "wait"],
              ["프로젝트 목표", null, "wait"],
              ["타겟 고객", null, "wait"],
              ["예산", null, "wait"],
              ["공간 사이즈", null, "wait"],
            ].map(([q, a, state]) => (
              <div key={q} className="surface" style={{
                padding: "10px 12px",
                background: state === "active" ? "var(--ink-1)" : state === "done" ? "#fff" : "transparent",
                color: state === "active" ? "#fff" : state === "wait" ? "var(--ink-4)" : "var(--ink-1)",
                borderColor: state === "wait" ? "var(--line)" : state === "active" ? "var(--ink-1)" : "var(--line)",
                borderStyle: state === "wait" ? "dashed" : "solid",
              }}>
                <div className="row gap-2">
                  <span style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: state === "done" ? "var(--ink-1)" : state === "active" ? "#fff" : "transparent",
                    border: state === "wait" ? "1px dashed var(--line-strong)" : "none",
                    color: state === "done" ? "#fff" : "var(--ink-1)",
                    fontSize: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
                    flexShrink: 0,
                  }}>{state === "done" ? "✓" : ""}</span>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{q}</div>
                </div>
                {a && (
                  <div style={{ fontSize: 11, marginTop: 4, paddingLeft: 22, opacity: state === "active" ? 0.95 : 0.7 }}>
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="t-small" style={{ lineHeight: 1.7 }}>
            천천히 답해 주셔도 괜찮아요.<br />
            중간에 잠시 자리를 비우셔도, 모나가 여기서 기다리고 있을게요.
          </div>
        </aside>

        {/* Chat panel */}
        <div className="col" style={{ overflow: "hidden", position: "relative", background: "#fff" }}>
          {/* Chat header */}
          <div className="row gap-3" style={{
            padding: "14px 24px", borderBottom: "1px solid var(--line)",
            alignItems: "center", background: "#fff",
          }}>
            <CounselorAvatar size={36} />
            <div className="grow">
              <div style={{ fontWeight: 700, fontSize: 14 }}>모나</div>
              <div className="t-small" style={{ fontSize: 11 }}>공간 마케팅 AI 상담사 · 평균 응답 2초</div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>대화 저장하기</button>
          </div>

          <div className="col gap-3 stagger" style={{ flex: 1, overflowY: "auto", padding: "24px 36px 16px" }}>
            {/* opening greeting from counselor — explains 5 min, sets warm tone */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <CounselorAvatar size={32} />
              <div className="bubble-ai" style={{ maxWidth: 480 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: "var(--ink-1)" }}>모나</div>
                안녕하세요! 저는 공간 마케팅을 도와드리는 AI 상담사 <b style={{ color: "var(--accent)" }}>모나</b>예요 :)<br />
                오늘 함께 이야기 나누게 되어 정말 반가워요.
              </div>
            </div>

            {/* 5분 안내 — 살짝 강조된 카드 형태 */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 32, flexShrink: 0 }} />
              <div className="bubble-ai" style={{
                maxWidth: 480, background: "var(--bg-soft)",
                borderColor: "var(--line)",
              }}>
                상담은 <b style={{ color: "var(--ink-2)" }}>약 5분 정도</b> 걸려요. ⏱<br />
                커피 한 잔 드시면서 편하게 답해 주시면 돼요. <br />
                정답은 없으니까, 떠오르는 대로 말씀해 주셔도 충분해요.
              </div>
            </div>

            {/* what we'll talk about — preview of 6 topics */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 32, flexShrink: 0 }} />
              <div className="bubble-ai" style={{ maxWidth: 480 }}>
                저희는 이런 이야기를 나눌 거예요 —
                <div className="col gap-1" style={{ marginTop: 10 }}>
                  {[
                    "어떤 행사를 준비하고 계신지",
                    "어떤 제품을 보여주고 싶으신지",
                    "이번 프로젝트로 이루고 싶은 것",
                    "찾아오실 분들이 어떤 분들인지",
                    "예산과 공간은 어느 정도인지",
                  ].map((t, i) => (
                    <div key={t} className="row gap-2" style={{ alignItems: "center" }}>
                      <span style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: "var(--ink-1)", color: "#fff",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 700, flexShrink: 0,
                      }}>{i + 1}</span>
                      <span style={{ fontSize: 13 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* first real question */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 32, flexShrink: 0 }} />
              <div className="bubble-ai" style={{ maxWidth: 480 }}>
                그럼 천천히 시작해 볼까요?<br />
                <b>지금 어떤 행사</b>를 준비하고 계신가요? <br />
                <span style={{ fontSize: 12, color: "var(--ink-3)" }}>편하게 한두 문장으로 말씀해 주세요 :)</span>
              </div>
            </div>

            {/* typing indicator — counselor "still typing" feel */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end", marginTop: 6 }}>
              <CounselorAvatar size={24} />
              <div className="bubble-ai" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 14px" }}>
                <span className="typing"><span /><span /><span /></span>
                <span className="t-small" style={{ fontSize: 11 }}>모나가 듣고 있어요</span>
              </div>
            </div>
          </div>

          {/* Input area */}
          <div style={{ borderTop: "1px solid var(--line)", padding: "16px 36px 20px", background: "#fff" }}>
            <div className="row gap-2" style={{ marginBottom: 10, flexWrap: "wrap" }}>
              <span className="t-small" style={{ width: "100%", marginBottom: 4, fontSize: 11 }}>혹시 떠오르지 않으시면, 이 중에 골라 주셔도 괜찮아요</span>
              {["팝업스토어", "전시회", "오프라인 매장", "체험형 부스", "그 외 / 직접 설명", "나중에 말씀드릴게요!"].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
            <div className="row gap-2">
              <input className="input" placeholder="모나에게 편하게 말씀해 주세요…" />
              <button className="btn btn-accent">보내기 →</button>
            </div>
            <div className="t-small" style={{ marginTop: 8, fontSize: 11 }}>
              💬 답변이 길어져도 괜찮아요. 천천히 말씀해 주세요.
            </div>
          </div>

          {/* Warm intro overlay */}
          {introOpen && (
            <div style={{
              position: "absolute", inset: 0,
              background: "rgba(20, 14, 10, 0.42)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "fadeIn .25s ease",
              backdropFilter: "blur(2px)",
            }}>
              <div className="surface fade-up" style={{
                width: 480, padding: "36px 36px 28px",
                background: "#fff", boxShadow: "var(--shadow-lg)",
                position: "relative", overflow: "hidden", textAlign: "center",
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-1)" }} />

                <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                  <CounselorAvatar size={72} />
                </div>

                <div className="t-eyebrow" style={{ marginTop: 18, color: "var(--ink-2)" }}>
                  AI 상담사
                </div>
                <h2 className="t-h1" style={{ marginTop: 6 }}>
                  안녕하세요, 저는 <span style={{ color: "var(--accent)" }}>모나</span>예요.
                </h2>
                <p className="t-body" style={{ marginTop: 14, color: "var(--ink-2)", lineHeight: 1.7 }}>
                  공간 마케팅을 도와드리는 AI 상담사예요.<br />
                  지금부터 <b style={{ color: "var(--ink-2)" }}>약 5분 동안</b> 짧은 대화를 나눠 볼게요.<br />
                  편하게 답해 주시면, 제가 정성껏 정리해서<br />
                  <b>맞춤 제안서</b>를 준비해 드릴게요.
                </p>

                <div className="accent-tint" style={{
                  marginTop: 22, padding: "14px 16px", borderRadius: "var(--r-sm)",
                  textAlign: "left",
                }}>
                  <div className="row gap-3" style={{ marginBottom: 8, alignItems: "center" }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%", background: "var(--ink-1)", color: "#fff",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                    }}>⏱</span>
                    <div className="grow">
                      <div style={{ fontSize: 13, fontWeight: 600 }}>예상 소요 시간</div>
                      <div className="t-small" style={{ fontSize: 11 }}>여유 있게 5분 정도예요</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-en)", fontSize: 18, fontWeight: 700, color: "var(--ink-1)" }}>5min</div>
                  </div>
                  <div className="row gap-3" style={{ alignItems: "center" }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: "50%", background: "var(--ink-1)", color: "#fff",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                    }}>💬</span>
                    <div className="grow">
                      <div style={{ fontSize: 13, fontWeight: 600 }}>나누게 될 이야기</div>
                      <div className="t-small" style={{ fontSize: 11 }}>행사·제품·목표·타겟·예산·공간</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-en)", fontSize: 18, fontWeight: 700, color: "var(--ink-1)" }}>6</div>
                  </div>
                </div>

                <p className="t-small" style={{ marginTop: 16, lineHeight: 1.7 }}>
                  정답은 없어요. 떠오르는 대로 말씀해 주셔도 충분해요.<br />
                  중간에 잠시 자리를 비우셔도, 제가 여기서 기다리고 있을게요.
                </p>

                <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 22 }}
                  onClick={() => setIntroOpen(false)}>
                  모나와 이야기 시작하기 →
                </button>
                <div className="t-small" style={{ marginTop: 10, fontSize: 11 }}>
                  대화 내용은 제안서 작성에만 사용해요. 안심하고 말씀해 주세요.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.MYP2_SCREENS = window.MYP2_SCREENS || {};
Object.assign(window.MYP2_SCREENS, { "01": Screen01, "03": Screen03 });
