/* global React, ReactDOM */
const { useState, useEffect } = React;

const SCREENS = [
  { id: "01", title: "랜딩페이지", subtitle: "브랜드 가치 + 히어로 + 4단계" },
  { id: "03", title: "AI 상담 시작", subtitle: "다정한 인사 + 5분 안내 + 상담" },
  { id: "04", title: "가입하기", subtitle: "모달 + 안심 마이크로카피" },
  { id: "05", title: "AI 분석 진행", subtitle: "단계별 + 인사이트 콘텐츠" },
  { id: "06", title: "요구사항 정의서", subtitle: "리포트 + sticky CTA" },
  { id: "07", title: "이메일 확인 / 작성중", subtitle: "단일 풀페이지 + 진행도" },
  { id: "08", title: "제안 도착", subtitle: "Welcome back + 통계 카드" },
  { id: "09", title: "한 장 제안서", subtitle: "좌 텍스트 + 우 무드/도면" },
  { id: "10", title: "설계 + 견적", subtitle: "3D 에디터 + 플로팅 견적" },
  { id: "11", title: "결제 완료", subtitle: "주문 확정 + 다음 단계 안내" },
];
// Note: Screen 02 removed entirely per user request. Orange accent now reserved for emphasis only.

function App() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [radius, setRadius] = useState("rounded"); // rounded | sharp
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // tweaks protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.radius = radius === "sharp" ? "sharp" : "";
  }, [radius]);

  const screen = SCREENS[activeIdx];
  const ScreenComp = window.MYP2_SCREENS?.[screen.id];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg-muted)" }}>
      {/* Left list */}
      <aside style={{
        width: 320, flexShrink: 0,
        borderRight: "1px solid var(--line)",
        background: "#fff",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        <div style={{ padding: "22px 24px 16px", borderBottom: "1px solid var(--line)" }}>
          <div className="t-eyebrow">DETAILED UI · v2</div>
          <h1 className="t-h2" style={{ marginTop: 6 }}>
            <span className="brand-mark" style={{ width: 18, height: 18, marginRight: 8 }} />
            Make Your Place
          </h1>
          <p className="t-small" style={{ marginTop: 6 }}>
            10화면 상세 디자인 · 흑백 · Pretendard
          </p>
        </div>

        <nav style={{ overflowY: "auto", padding: "8px 0", flex: 1 }}>
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveIdx(i)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                background: activeIdx === i ? "var(--bg-muted)" : "transparent",
                border: "none",
                padding: "12px 24px",
                cursor: "pointer",
                borderLeft: activeIdx === i ? "2px solid var(--ink-1)" : "2px solid transparent",
              }}
              onMouseEnter={e => { if (activeIdx !== i) e.currentTarget.style.background = "var(--bg-soft)"; }}
              onMouseLeave={e => { if (activeIdx !== i) e.currentTarget.style.background = "transparent"; }}
            >
              <div className="row gap-2" style={{ alignItems: "baseline" }}>
                <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{s.id}</span>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{s.title}</span>
              </div>
              <div className="t-small" style={{ marginTop: 2, paddingLeft: 22 }}>
                {s.subtitle}
              </div>
            </button>
          ))}
        </nav>

        <div style={{ padding: "14px 24px", borderTop: "1px solid var(--line)", background: "var(--bg-soft)" }}>
          <div className="t-eyebrow" style={{ marginBottom: 8 }}>SHORTCUTS</div>
          <div className="t-small" style={{ lineHeight: 1.7 }}>
            <div><kbd style={kbdStyle}>↑</kbd> <kbd style={kbdStyle}>↓</kbd> 화면 전환</div>
            <div><kbd style={kbdStyle}>R</kbd> 라운드 토글</div>
          </div>
        </div>
      </aside>

      {/* Right preview */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* toolbar */}
        <div style={{
          height: 64, padding: "0 28px", borderBottom: "1px solid var(--line)",
          background: "#fff", display: "flex", alignItems: "center", gap: 16, flexShrink: 0,
        }}>
          <div>
            <div className="t-eyebrow">SCREEN {screen.id}</div>
            <div className="t-h3" style={{ marginTop: 2 }}>{screen.title}</div>
          </div>
          <div className="grow" />

          {/* Radius toggle */}
          <div style={{ display: "flex", border: "1px solid var(--line-strong)", borderRadius: "var(--r-pill)", overflow: "hidden", height: 32 }}>
            {[["rounded", "둥근"], ["sharp", "각진"]].map(([k, label]) => (
              <button key={k} onClick={() => setRadius(k)}
                style={{
                  border: "none", padding: "0 14px", fontSize: 12, fontWeight: 600,
                  background: radius === k ? "var(--ink-1)" : "transparent",
                  color: radius === k ? "#fff" : "var(--ink-2)",
                  cursor: "pointer",
                }}>{label}</button>
            ))}
          </div>
        </div>

        {/* preview canvas */}
        <div style={{
          flex: 1, overflow: "auto", padding: 32,
          display: "flex", alignItems: "flex-start", justifyContent: "center",
        }}>
          <div style={{
            transform: "scale(0.78)",
            transformOrigin: "top center",
            transition: "filter .25s var(--ease-out)",
          }} key={screen.id}>
            <div className="fade-in">
              {ScreenComp ? <ScreenComp /> : <div>로딩…</div>}
            </div>
          </div>
        </div>
      </main>

      {/* Tweaks */}
      {tweaksOpen && (
        <div className="surface fade-up" style={{
          position: "fixed", bottom: 24, right: 24, width: 280, padding: 18, zIndex: 50,
          boxShadow: "var(--shadow-lg)", background: "#fff",
        }}>
          <div className="row">
            <div className="t-h3">Tweaks</div>
            <div className="grow" />
            <button className="btn btn-ghost btn-sm" onClick={() => {
              setTweaksOpen(false);
              window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
            }}>닫기</button>
          </div>
          <div className="divider" />
          <Eyebrow>모서리</Eyebrow>
          <div className="row gap-2" style={{ marginTop: 8 }}>
            {[["rounded", "둥근"], ["sharp", "각진"]].map(([k, l]) => (
              <button key={k} onClick={() => setRadius(k)} className={`chip ${radius === k ? "is-active" : ""}`} style={{ flex: 1, justifyContent: "center" }}>{l}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const kbdStyle = {
  padding: "1px 6px",
  border: "1px solid var(--line-strong)",
  borderRadius: 3,
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  background: "#fff",
};

function Eyebrow({ children }) { return <div className="t-eyebrow">{children}</div>; }

window.MYP2_App = App;
