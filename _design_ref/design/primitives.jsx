/* global React */
const { useState, useEffect } = React;

// Brand wordmark
function Brand({ size = 15 }) {
  return (
    <div className="brand" style={{ fontSize: size }}>
      <span className="brand-mark" />
      MAKE YOUR PLACE
    </div>
  );
}

// Standard appbar
function AppBar({ active = "home", right }) {
  const items = [
    ["home", "홈"],
    ["explore", "둘러보기"],
    ["how", "이용방법"],
    ["pricing", "요금"],
  ];
  return (
    <div className="appbar">
      <Brand />
      <div className="row gap-4" style={{ marginLeft: 16 }}>
        {items.map(([k, label]) => (
          <span key={k} style={{
            fontSize: 13,
            fontWeight: active === k ? 700 : 500,
            color: active === k ? "var(--ink-1)" : "var(--ink-3)",
            cursor: "pointer",
          }}>{label}</span>
        ))}
      </div>
      <div className="grow" />
      {right || (
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm">로그인</button>
          <button className="btn btn-sm">설계 받기</button>
        </div>
      )}
    </div>
  );
}

// Compact stepper top bar (used inside flows)
function FlowBar({ step, total, title, onBack }) {
  return (
    <div className="appbar" style={{ height: 56 }}>
      {onBack !== false && (
        <span style={{ cursor: "pointer", fontSize: 13, color: "var(--ink-3)", marginRight: 8 }}>← 이전</span>
      )}
      <Brand size={13} />
      <div className="grow" />
      <span className="t-eyebrow">{title}</span>
      <div style={{ width: 180 }}>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${(step/total)*100}%` }} />
        </div>
      </div>
      <span className="t-mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{step}/{total}</span>
    </div>
  );
}

// Section eyebrow + heading helper
function Eyebrow({ children }) {
  return <div className="t-eyebrow">{children}</div>;
}

window.MYP2 = { Brand, AppBar, FlowBar, Eyebrow };
