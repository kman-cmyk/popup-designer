"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar } from "@/components/ui/AppBar";

export default function CompletePage() {
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => { setTimeout(() => setShowConfetti(true), 300); }, []);

  const ORDER_ID = "MYP-2025-" + Math.floor(Math.random() * 9000 + 1000);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <AppBar active="" right={<Link href="/"><span style={{ fontSize: 13, color: "var(--ink-3)", cursor: "pointer" }}>홈으로 →</span></Link>} />

      {/* 배경 장식 */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 8, height: 8,
              left: `${Math.random() * 100}%`,
              top: -20,
              background: ["#FF6B35", "#6B8FFF", "#22c55e", "#A78BFA", "#FFD93D"][i % 5],
              borderRadius: Math.random() > 0.5 ? "50%" : 2,
              animation: `confetti-${i % 3} ${1.5 + Math.random() * 2}s ${Math.random() * 1}s ease-in forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confettiDrop { 0% { top: -20px; opacity: 1; transform: rotate(0deg); } 100% { top: 110vh; opacity: 0.3; transform: rotate(720deg); } }
        @keyframes confetti-0 { 0% { top: -20px; opacity: 1; } 100% { top: 110vh; opacity: 0.2; transform: translateX(40px) rotate(540deg); } }
        @keyframes confetti-1 { 0% { top: -20px; opacity: 1; } 100% { top: 110vh; opacity: 0.2; transform: translateX(-30px) rotate(-360deg); } }
        @keyframes confetti-2 { 0% { top: -20px; opacity: 1; } 100% { top: 110vh; opacity: 0.2; transform: translateX(20px) rotate(720deg); } }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "48px 40px" }}>
        {/* 완료 헤더 */}
        <div className="col" style={{ alignItems: "center", textAlign: "center", paddingBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, boxShadow: "0 8px 30px rgba(34,197,94,0.3)", animation: "fadeUp .5s var(--ease-spring)" }}>
            ✓
          </div>
          <h1 className="t-display fade-up" style={{ marginTop: 20, fontSize: 36 }}>예약이 완료됐어요! 🎉</h1>
          <p className="t-body-lg fade-up" style={{ marginTop: 12, color: "var(--ink-3)", maxWidth: 520 }}>
            스탠다드 안 B로 확정됐어요. 담당자가 곧 연락드릴 거예요.<br />
            설치 당일까지 편하게 문의해 주세요!
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, padding: "8px 18px", border: "1px solid var(--line)", borderRadius: 999, background: "var(--bg-soft)" }}>
            <span className="t-mono" style={{ fontSize: 13, fontWeight: 700 }}>{ORDER_ID}</span>
            <span className="t-small">예약 번호</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* 예약 요약 */}
          <div className="surface fade-up" style={{ padding: 28 }}>
            <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">예약 요약</span></div>
            <div className="col" style={{ marginTop: 18, gap: 0 }}>
              {[["선택한 안", "스탠다드 안 B"], ["총 금액", "490만원"], ["공간 크기", "5.0m × 4.0m"], ["오픈 예정", "2025년 6월 1주차"], ["모듈 수", "6개 설치"], ["결제 방법", "계좌이체 · 3영업일 내"]].map(([k, v], i) => (
                <div key={k} className="row" style={{ padding: "11px 0", borderBottom: i < 5 ? "1px solid var(--line)" : "none" }}>
                  <span className="t-eyebrow" style={{ flex: 1, fontSize: 11 }}>{k}</span>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 다음 단계 */}
          <div className="col gap-3">
            <div className="surface fade-up" style={{ padding: 24, background: "var(--ink-1)", borderColor: "var(--ink-1)", color: "#fff" }}>
              <div className="t-eyebrow" style={{ color: "rgba(255,255,255,0.6)" }}>다음 단계</div>
              <div className="col" style={{ marginTop: 14, gap: 14 }}>
                {[{ n: "01", t: "계약서 이메일 도착", d: "1영업일 내" }, { n: "02", t: "입금 확인", d: "3영업일 내" }, { n: "03", t: "담당자 전화 연락", d: "영업일 2일 내" }, { n: "04", t: "설치 일정 확정", d: "계약 후 즉시" }].map(s => (
                  <div key={s.n} className="row gap-3">
                    <span style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{s.n}</span>
                    <div className="grow"><div style={{ fontSize: 13, fontWeight: 600 }}>{s.t}</div></div>
                    <div className="t-mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", flexShrink: 0 }}>{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface accent-tint fade-up" style={{ padding: 20 }}>
              <span className="t-eyebrow" style={{ color: "var(--accent-ink)" }}>계속 확인하려면</span>
              <p className="t-body" style={{ marginTop: 8, color: "var(--ink-2)" }}>마이페이지에서 진행 상황과 설치 일정을 실시간으로 확인하실 수 있어요.</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }}>마이페이지 가기 →</button>
            </div>
          </div>
        </div>

        {/* 공유 & 리뷰 */}
        <div className="surface fade-up" style={{ marginTop: 20, padding: "24px 28px", display: "flex", gap: 24, alignItems: "center" }}>
          <div className="grow">
            <div className="t-eyebrow">첫 번째 팝업을 준비 중이신가요?</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>SNS에 공유하면 친구들도 기대하게 만들 수 있어요 🎨</div>
          </div>
          <div className="row gap-2">
            {[["📷 인스타", "#6B8FFF"], ["🐦 트위터", "#6B8FFF"], ["🔗 링크 복사", "var(--ink-2)"]].map(([t, c]) => (
              <button key={t} className="btn btn-ghost btn-sm" style={{ color: c }}>{t}</button>
            ))}
          </div>
        </div>

        {/* 팁 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginTop: 20 }}>
          {[{ icon: "📋", t: "준비물 체크리스트", d: "오픈 전 꼭 챙겨야 할 것들이에요." },
            { icon: "📱", t: "SNS 홍보 가이드", d: "팝업 오픈 전 buzz 만드는 법!" },
            { icon: "📊", t: "방문자 데이터 수집", d: "운영 중 데이터 모으는 팁이에요." }].map(({ icon, t, d }) => (
            <div key={t} className="surface fade-up" style={{ padding: "16px 18px", cursor: "pointer", transition: "all .15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ink-1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ""; }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{t}</div>
              <p className="t-small" style={{ marginTop: 4 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
