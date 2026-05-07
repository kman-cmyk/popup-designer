"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FlowBar } from "@/components/ui/FlowBar";

const STEPS_DEF = [
  "입력해 주신 6개 답변 정리하기",
  "유사 팝업·전시 1,287건 매칭하기",
  "타겟 동선 패턴 분석 중이에요",
  "공간 모듈 조합 시뮬레이션",
  "요구사항 정의서 작성",
];

export default function AnalyzingPage() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const timers = STEPS_DEF.map((_, i) => setTimeout(() => setActive(i), i * 1200));
    const pctTimer = setInterval(() => setPct(p => Math.min(100, p + 1)), 80);
    const done = setTimeout(() => { clearInterval(pctTimer); router.push("/brief"); }, 8000);
    return () => { timers.forEach(clearTimeout); clearInterval(pctTimer); clearTimeout(done); };
  }, [router]);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <FlowBar step={6} total={6} title="AI 분석 중" onBack={false} />
      <div style={{ padding: "40px 60px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, maxWidth: 1200, margin: "0 auto" }}>
        <div className="col">
          <div className="row gap-2">
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-1)", animation: "pulse 1.6s infinite" }} />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>AI 분석 중 · {100 - pct}초 남았어요</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 10 }}>입력해 주신 내용을<br />지금 열심히 분석하고 있어요.</h2>
          <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>입력해 주신 정보로 가장 비슷한 사례를 찾고, 동선과 모듈 구성을 시뮬레이션하고 있어요. 조금만 기다려 주세요!</p>
          <div className="col gap-2 stagger" style={{ marginTop: 28 }}>
            {STEPS_DEF.map((text, i) => {
              const state = i < active ? "done" : i === active ? "active" : "wait";
              return (
                <div key={i} className="surface" style={{ padding: "14px 16px", background: state === "active" ? "var(--ink-1)" : "#fff", color: state === "active" ? "#fff" : state === "wait" ? "var(--ink-4)" : "var(--ink-1)", borderColor: state === "wait" ? "var(--line)" : "var(--ink-1)", borderStyle: state === "wait" ? "dashed" : "solid", display: "flex", alignItems: "center", gap: 12, transition: "all .4s" }}>
                  <span style={{ width: 24, height: 24, borderRadius: "50%", background: state === "done" ? "var(--ink-1)" : state === "active" ? "#fff" : "transparent", color: state === "done" ? "#fff" : "var(--ink-1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, border: state === "wait" ? "1px dashed var(--line-strong)" : "none", flexShrink: 0 }}>
                    {state === "done" ? "✓" : state === "active" ? <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid var(--ink-1)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite" }} /> : ""}
                  </span>
                  <span style={{ fontWeight: state === "active" ? 600 : 500, fontSize: 14 }}>{text}</span>
                  {state === "active" && <span className="t-mono" style={{ marginLeft: "auto", color: "rgba(255,255,255,0.85)", fontSize: 12 }}>{pct}%</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="col gap-3">
          <div className="row gap-2">
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>기다리는 동안 살펴보세요 · 알고 계셨어요?</span>
          </div>
          <div className="surface fade-up" style={{ padding: 24, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: "var(--ink-1)" }} />
            <h3 className="t-h2" style={{ lineHeight: 1.3 }}>팝업스토어의 평균 체류 시간은 <span style={{ color: "var(--ink-1)" }}>7분</span>이에요.</h3>
            <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>입구에서 카운터까지의 거리, 거울의 높이, 체험 공간 배치가 회자 트리거가 된답니다.</p>
            <div className="imgph" style={{ height: 160, marginTop: 16 }}>[ 통계 차트: 평균 체류시간 / 회자 빈도 ]</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="surface" style={{ padding: 16, background: "var(--ink-1)", color: "#fff", borderColor: "var(--ink-1)" }}>
              <div className="t-eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>셀피 빈도</div>
              <div className="t-h2" style={{ marginTop: 6, fontFamily: "var(--font-en)" }}>1.6장 <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.8 }}>/ 방문</span></div>
            </div>
            <div className="surface accent-tint" style={{ padding: 16 }}>
              <div className="t-eyebrow" style={{ color: "var(--ink-2)" }}>회자 트리거 1위</div>
              <div className="t-h3" style={{ marginTop: 6 }}>체험 비교 보드</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
