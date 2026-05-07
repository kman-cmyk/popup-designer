"use client";
import { useEffect, useState } from "react";
import { AppBar } from "@/components/ui/AppBar";

const UPDATES = [
  { t: 0,    text: "제안 접수가 완료됐어요." },
  { t: 2000, text: "모나가 브리프를 전문가에게 전달하고 있어요…" },
  { t: 5000, text: "공간 마케팅 전문가가 배정됐어요!" },
  { t: 8000, text: "도면 작업이 시작됐어요. 조금만 기다려 주세요 ☕" },
  { t: 12000, text: "3D 모델 렌더링 중이에요…" },
];

export default function WaitingPage() {
  const [shown, setShown] = useState<string[]>([UPDATES[0].text]);
  const [eta, setEta] = useState(480); // 8h in min
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timers = UPDATES.slice(1).map(u =>
      setTimeout(() => { setShown(p => [...p, u.text]); setPulse(true); setTimeout(() => setPulse(false), 400); }, u.t)
    );
    const ticker = setInterval(() => setEta(p => Math.max(0, p - 1)), 60000);
    return () => { timers.forEach(clearTimeout); clearInterval(ticker); };
  }, []);

  const hours = Math.floor(eta / 60);
  const mins = eta % 60;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={<div className="row gap-2">
        <button className="btn btn-ghost btn-sm">마이페이지</button>
      </div>} />

      <div style={{ padding: "48px 80px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48 }}>
        {/* 왼쪽 - 진행 상태 */}
        <div>
          <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>WAITING · 제안 준비 중</span></div>
          <h1 className="t-h1" style={{ marginTop: 10 }}>전문가가 지금 열심히<br />설계안을 만들고 있어요.</h1>
          <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>완성되면 이메일로 바로 알려드릴게요. 이 페이지를 닫아도 괜찮아요!</p>

          {/* ETA 카드 */}
          <div className="surface" style={{ marginTop: 24, padding: 20, background: "var(--ink-1)", color: "#fff", borderColor: "var(--ink-1)" }}>
            <div className="row gap-3">
              <div>
                <span className="t-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>예상 완료까지</span>
                <div style={{ fontFamily: "var(--font-en)", fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 4 }}>
                  {hours}h {mins.toString().padStart(2, "0")}m
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <div style={{ textAlign: "right" }}>
                <div className="t-small" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>알림 수신</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>me@brand.com</div>
              </div>
            </div>
            <div style={{ marginTop: 16, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "18%", background: "#fff", borderRadius: 999, transition: "width 1s" }} />
            </div>
            <div className="row" style={{ justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>접수 완료</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>설계 중</span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>제안 도착</span>
            </div>
          </div>

          {/* 업데이트 로그 */}
          <div style={{ marginTop: 24 }}>
            <span className="t-eyebrow" style={{ marginBottom: 12, display: "block" }}>진행 업데이트</span>
            <div className="col gap-2">
              {shown.map((text, i) => (
                <div key={i} className="row gap-3 fade-up" style={{ padding: "10px 14px", background: i === shown.length - 1 && pulse ? "var(--brand-tint)" : "#fff", border: "1px solid", borderColor: i === shown.length - 1 ? "var(--ink-1)" : "var(--line)", borderRadius: "var(--r-sm)", transition: "all .3s" }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--ink-1)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13 }}>{text}</span>
                  <span className="t-mono" style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-4)" }}>방금</span>
                </div>
              ))}
              <div className="row gap-3" style={{ padding: "10px 14px", border: "1px dashed var(--line)", borderRadius: "var(--r-sm)", opacity: 0.5 }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", border: "1px dashed var(--line-strong)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>⏳</span>
                <span style={{ fontSize: 13, color: "var(--ink-4)" }}>제안서 최종 검토 중…</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 - 정보 카드 */}
        <div className="col gap-4">
          <div className="surface" style={{ padding: 24, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-1)" }} />
            <span className="t-eyebrow">접수 요약</span>
            <div className="col gap-2" style={{ marginTop: 14 }}>
              {[["행사 종류", "팝업스토어"], ["운영 기간", "2주"], ["공간 크기", "5 × 4m"], ["예산", "500만원 이내"], ["목표", "인지도 + SNS 회자"]].map(([k, v]) => (
                <div key={k} className="row" style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
                  <span className="t-eyebrow" style={{ flex: 1, fontSize: 11 }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface accent-tint" style={{ padding: 20, borderColor: "var(--accent-soft)" }}>
            <span className="t-eyebrow" style={{ color: "var(--accent-ink)" }}>잠깐, 알고 계셨나요?</span>
            <p className="t-body" style={{ marginTop: 10, lineHeight: 1.7, color: "var(--ink-2)" }}>
              팝업스토어 성공의 <b>78%</b>는 입구에서 3미터 안의 첫인상이 좌우해요. 전문가가 이 부분에 특히 신경 써서 설계할 거예요.
            </p>
          </div>

          <div style={{ padding: 20, border: "1px dashed var(--line)", borderRadius: "var(--r-md)", textAlign: "center" }}>
            <span className="t-eyebrow" style={{ display: "block", marginBottom: 8 }}>비슷한 공간 미리 보기</span>
            <div className="imgph" style={{ height: 120, marginBottom: 12 }}>[ 비슷한 팝업 레퍼런스 ]</div>
            <button className="btn btn-ghost btn-sm">레퍼런스 더 보기 →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
