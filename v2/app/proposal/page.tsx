"use client";
import Link from "next/link";
import { useState } from "react";
import { AppBar } from "@/components/ui/AppBar";

const PROPOSALS = [
  {
    id: "A", tier: "에센셜", price: "320만원", desc: "필수 모듈만 깔끔하게 배치한 효율형 구성이에요.",
    tags: ["선반 3단", "카운터", "행거 2개", "포토월"],
    color: "#6B8FFF", highlight: false,
    concept: "미니멀 & 실용", area: "5×4m", modules: 6,
  },
  {
    id: "B", tier: "스탠다드", price: "490만원", desc: "체험 존과 셀피 포인트를 균형 있게 구성했어요. 가장 인기 있는 옵션이에요!",
    tags: ["체험 카운터", "백라이트 패널", "셀피 미러", "선반 2단", "행거"],
    color: "#FF6B35", highlight: true,
    concept: "체험 + 포토존", area: "5×4m", modules: 8,
  },
  {
    id: "C", tier: "프리미엄", price: "680만원", desc: "몰입감 있는 브랜드 경험을 원하신다면 이 구성이에요.",
    tags: ["포토월 풀 크기", "가챠 머신", "아일랜드 카운터", "백라이트 패널 2개", "셀피 미러"],
    color: "#A78BFA", highlight: false,
    concept: "몰입형 브랜드 경험", area: "5×4m", modules: 10,
  },
];

export default function ProposalPage() {
  const [selected, setSelected] = useState("B");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={<div className="row gap-2">
        <button className="btn btn-ghost btn-sm">마이페이지</button>
      </div>} />

      {/* 헤더 */}
      <div style={{ padding: "48px 80px 32px", borderBottom: "1px solid var(--line)" }}>
        <div className="row gap-2">
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span className="t-eyebrow" style={{ color: "#22c55e" }}>NEW · 제안서가 도착했어요!</span>
        </div>
        <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between", marginTop: 10 }}>
          <div>
            <h1 className="t-h1">스킨케어 팝업 — 설계 제안서</h1>
            <p className="t-body" style={{ marginTop: 6, color: "var(--ink-3)" }}>아래 3가지 안 중에서 마음에 드시는 걸 골라 주시면, 바로 예약 진행해 드릴게요.</p>
          </div>
          <div className="row gap-2">
            <button className="btn btn-ghost btn-sm">PDF 다운로드</button>
            <button className="btn btn-ghost btn-sm">공유하기</button>
          </div>
        </div>
      </div>

      {/* 3안 카드 */}
      <div style={{ padding: "32px 80px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {PROPOSALS.map(p => (
          <div key={p.id} onClick={() => setSelected(p.id)} style={{ border: `2px solid`, borderColor: selected === p.id ? "var(--ink-1)" : "var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden", cursor: "pointer", transition: "all .2s", transform: selected === p.id ? "translateY(-4px)" : "none", boxShadow: selected === p.id ? "var(--shadow-lg)" : "none", position: "relative" }}>
            {p.highlight && <div style={{ position: "absolute", top: 14, right: 14, background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, zIndex: 2 }}>추천</div>}
            {/* 프리뷰 */}
            <div style={{ height: 180, background: p.color + "22", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg, transparent, transparent 18px, ${p.color}11 18px, ${p.color}11 19px)` }} />
              <div className="imgph" style={{ width: 110, height: 130, background: "rgba(255,255,255,0.7)", fontSize: 11, color: p.color }}>[ 3D 미리보기 ]</div>
            </div>
            <div style={{ padding: 20 }}>
              <div className="row gap-2">
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: p.color, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>{p.id}</span>
                <span className="t-eyebrow">{p.tier}</span>
                {selected === p.id && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-1)", fontWeight: 700 }}>선택됨 ✓</span>}
              </div>
              <div style={{ fontFamily: "var(--font-en)", fontSize: 24, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>{p.price}</div>
              <p className="t-small" style={{ marginTop: 8, lineHeight: 1.6 }}>{p.desc}</p>
              <div className="row gap-1" style={{ marginTop: 12, flexWrap: "wrap" }}>
                {p.tags.map(t => <span key={t} className="chip" style={{ height: 24, fontSize: 11 }}>{t}</span>)}
              </div>
              <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--bg-soft)", borderRadius: "var(--r-sm)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div><div className="t-eyebrow" style={{ fontSize: 10 }}>컨셉</div><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{p.concept}</div></div>
                <div><div className="t-eyebrow" style={{ fontSize: 10 }}>모듈 수</div><div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{p.modules}개</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 고정 CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: "1px solid var(--line)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", padding: "14px 80px", display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div className="t-eyebrow">선택된 안</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            {PROPOSALS.find(p => p.id === selected)?.tier} — {PROPOSALS.find(p => p.id === selected)?.price}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <Link href="/proposal-detail"><button className="btn btn-ghost">상세 제안서 보기</button></Link>
        <Link href="/complete"><button className="btn btn-accent btn-lg">이 안으로 예약하기 →</button></Link>
      </div>
      <div style={{ height: 72 }} />
    </div>
  );
}
