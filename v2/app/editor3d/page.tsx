"use client";
import { useState } from "react";
import Link from "next/link";
import { AppBar } from "@/components/ui/AppBar";

const MODULES_PANEL = [
  { id: "shelf", label: "선반 2단", icon: "🗄️", active: true },
  { id: "counter", label: "체험 카운터", icon: "🪑", active: true },
  { id: "mirror", label: "셀피 미러", icon: "🪞", active: true },
  { id: "panel", label: "백라이트 패널", icon: "💡", active: true },
  { id: "hanger", label: "행거 랙", icon: "👗", active: false },
  { id: "photo", label: "포토월", icon: "📸", active: true },
];

const PROPS = [
  { k: "공간 크기", v: "5.0m × 4.0m" },
  { k: "층고", v: "2.8m" },
  { k: "조명", v: "3000K 자연광 LED" },
  { k: "바닥재", v: "내추럴 우드 시트" },
];

export default function Editor3DPage() {
  const [mode, setMode] = useState<"orbit" | "fps" | "top">("orbit");
  const [mods, setMods] = useState(MODULES_PANEL);
  const [selected, setSelected] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  const toggle = (id: string) => setMods(ms => ms.map(m => m.id === id ? { ...m, active: !m.active } : m));

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#0a0a0f" }}>
      {/* 헤더 */}
      <div style={{ height: 52, background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 20px", gap: 16, flexShrink: 0 }}>
        <Link href="/proposal-detail"><span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer" }}>← 제안서</span></Link>
        <div style={{ flex: 1 }} />
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 600 }}>3D 에디터 · 스탠다드 안 B</span>
        <div style={{ flex: 1 }} />
        {/* 뷰 모드 */}
        <div className="row gap-1" style={{ background: "rgba(255,255,255,0.06)", borderRadius: "var(--r-sm)", padding: "3px" }}>
          {(["orbit", "fps", "top"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ height: 26, padding: "0 12px", border: "none", borderRadius: "var(--r-xs)", background: mode === m ? "rgba(255,255,255,0.15)" : "transparent", color: mode === m ? "#fff" : "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-en)", textTransform: "uppercase" }}>{m}</button>
          ))}
        </div>
        <button onClick={() => setShowGrid(g => !g)} style={{ height: 28, padding: "0 10px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "var(--r-xs)", background: showGrid ? "rgba(107,143,255,0.2)" : "transparent", color: showGrid ? "#6B8FFF" : "rgba(255,255,255,0.4)", fontSize: 12, cursor: "pointer" }}>
          그리드
        </button>
        <Link href="/complete"><button style={{ height: 32, padding: "0 14px", border: "none", borderRadius: "var(--r-sm)", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>이 구성 확정하기 →</button></Link>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "240px 1fr 220px", overflow: "hidden" }}>
        {/* 왼쪽: 모듈 패널 */}
        <div style={{ background: "rgba(10,10,15,0.98)", borderRight: "1px solid rgba(255,255,255,0.07)", overflowY: "auto", padding: "16px 14px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 10 }}>모듈 · {mods.filter(m => m.active).length}개 활성</span>
          <div className="col gap-1">
            {mods.map(m => (
              <div key={m.id} onClick={() => { setSelected(m.id); }} style={{ padding: "9px 10px", borderRadius: "var(--r-xs)", border: "1px solid", borderColor: selected === m.id ? "rgba(107,143,255,0.5)" : "rgba(255,255,255,0.07)", background: selected === m.id ? "rgba(107,143,255,0.1)" : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all .15s" }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: m.active ? "#fff" : "rgba(255,255,255,0.3)", flex: 1 }}>{m.label}</span>
                <button onClick={e => { e.stopPropagation(); toggle(m.id); }} style={{ width: 28, height: 16, borderRadius: 8, border: "none", background: m.active ? "var(--accent)" : "rgba(255,255,255,0.12)", cursor: "pointer", position: "relative", transition: "background .2s" }}>
                  <span style={{ position: "absolute", width: 12, height: 12, borderRadius: "50%", background: "#fff", top: 2, left: m.active ? 14 : 2, transition: "left .2s" }} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: "12px 10px", borderRadius: "var(--r-xs)", border: "1px dashed rgba(255,255,255,0.1)", textAlign: "center" }}>
            <button style={{ border: "none", background: "transparent", color: "rgba(107,143,255,0.8)", fontSize: 12, cursor: "pointer" }}>+ 모듈 추가</button>
          </div>
        </div>

        {/* 3D 뷰포트 */}
        <div style={{ position: "relative", background: "#0d1117" }}>
          {/* 3D 뷰 플레이스홀더 */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 320, height: 240, border: "1px solid rgba(107,143,255,0.2)", borderRadius: "var(--r-md)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(107,143,255,0.04)", position: "relative" }}>
              {/* 그리드 바닥 */}
              {showGrid && (
                <svg viewBox="0 0 320 240" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
                  {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 26.7} y1={0} x2={i * 26.7} y2={240} stroke="#6B8FFF" strokeWidth="0.5" />)}
                  {Array.from({ length: 10 }).map((_, i) => <line key={`h${i}`} x1={0} y1={i * 26.7} x2={320} y2={i * 26.7} stroke="#6B8FFF" strokeWidth="0.5" />)}
                </svg>
              )}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🏪</div>
                <div style={{ color: "rgba(107,143,255,0.8)", fontSize: 13, fontWeight: 600 }}>Three.js 3D 뷰</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 4 }}>GLB 모델 로드 대기 중</div>
              </div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, fontFamily: "ui-monospace" }}>
              {mode === "orbit" ? "드래그: 회전  /  스크롤: 줌  /  우클릭: 이동" : mode === "fps" ? "WASD 이동  /  마우스: 시점 변경" : "상단 뷰 · 드래그: 패닝"}
            </div>
          </div>

          {/* 뷰포트 오버레이 정보 */}
          <div style={{ position: "absolute", bottom: 16, left: 16, color: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "ui-monospace" }}>
            <div>MODE: {mode.toUpperCase()}</div>
            <div>MODULES: {mods.filter(m => m.active).length} / {mods.length}</div>
            <div>SPACE: 5.0m × 4.0m × 2.8m</div>
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, display: "flex", gap: 6 }}>
            {["⟳", "⊞", "⛶"].map(icon => (
              <button key={icon} style={{ width: 30, height: 30, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "var(--r-xs)", background: "rgba(10,10,15,0.7)", color: "rgba(255,255,255,0.6)", fontSize: 14, cursor: "pointer" }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* 오른쪽: 속성 패널 */}
        <div style={{ background: "rgba(10,10,15,0.98)", borderLeft: "1px solid rgba(255,255,255,0.07)", overflowY: "auto", padding: "16px 14px" }}>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: 10 }}>공간 속성</span>
          <div className="col gap-2">
            {PROPS.map(({ k, v }) => (
              <div key={k} style={{ padding: "9px 10px", borderRadius: "var(--r-xs)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{v}</div>
              </div>
            ))}
          </div>

          {selected && (
            <>
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "14px 0" }} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(107,143,255,0.7)", display: "block", marginBottom: 10 }}>선택된 모듈</span>
              <div style={{ padding: "10px 10px", borderRadius: "var(--r-xs)", border: "1px solid rgba(107,143,255,0.2)", background: "rgba(107,143,255,0.06)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mods.find(m => m.id === selected)?.label}</div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "10px 0" }} />
                {[["위치 X", "1200mm"], ["위치 Y", "0"], ["회전", "0°"]].map(([k, v]) => (
                  <div key={k} className="row" style={{ padding: "5px 0" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", flex: 1 }}>{k}</span>
                    <span className="t-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
