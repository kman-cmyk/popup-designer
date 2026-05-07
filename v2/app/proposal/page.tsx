"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/ui/AppBar";

interface ProposalModule { name: string; spec: string; price: string; note: string }
interface Proposal {
  id: string; tier: string; price: string; priceNum: number; concept: string;
  desc: string; tags: string[]; modules: ProposalModule[]; flow: string;
  highlight: boolean; strengths: string[];
}

function Skeleton({ h = 20, w = "100%" }: { h?: number; w?: string }) {
  return <div className="shimmer" style={{ height: h, width: w, borderRadius: 4, marginBottom: 6 }} />;
}

const COLORS: Record<string, string> = { A: "#6B8FFF", B: "#FF6B35", C: "#A78BFA" };

export default function ProposalPage() {
  const router = useRouter();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("B");

  useEffect(() => {
    async function generate() {
      try {
        const rawBrief = sessionStorage.getItem("mona-generated-brief");
        if (!rawBrief) {
          // brief 없으면 자동 생성 or mock
          await new Promise(r => setTimeout(r, 2000));
          setProposals(getMockProposals());
          setLoading(false);
          return;
        }
        const brief = JSON.parse(rawBrief);
        const res = await fetch("/api/proposal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brief }),
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        const ps: Proposal[] = data.proposals;
        setProposals(ps);
        // 기본 선택은 highlight=true인 항목
        const highlighted = ps.find(p => p.highlight);
        if (highlighted) setSelected(highlighted.id);
      } catch (e) {
        console.error(e);
        setError("제안 생성 중 오류가 발생했어요.");
        setProposals(getMockProposals());
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, []);

  function getMockProposals(): Proposal[] {
    return [
      { id: "A", tier: "에센셜", price: "320만원", priceNum: 320, concept: "미니멀 & 실용", desc: "필수 모듈만 깔끔하게 배치한 효율형 구성이에요.", tags: ["선반 2단", "결제 카운터", "행거 랙"], modules: [], flow: "입구→선반→카운터", highlight: false, strengths: ["비용 효율적", "운영 동선 단순"] },
      { id: "B", tier: "스탠다드", price: "490만원", priceNum: 490, concept: "체험 + 포토존", desc: "체험 존과 셀피 포인트를 균형 있게 구성했어요. 가장 인기 있는 옵션이에요!", tags: ["체험 카운터", "백라이트 패널", "셀피 미러", "선반 2단"], modules: [], flow: "입구→체험→셀피→카운터", highlight: true, strengths: ["SNS 회자 최적화", "체험 → 구매 전환 높음"] },
      { id: "C", tier: "프리미엄", price: "680만원", priceNum: 680, concept: "몰입형 브랜드 경험", desc: "몰입감 있는 브랜드 경험을 원하신다면 이 구성이에요.", tags: ["포토월 전체", "아일랜드 카운터", "백라이트 패널 2개", "셀피 미러"], modules: [], flow: "입구→포토월→체험→아일랜드→카운터", highlight: false, strengths: ["최고 몰입도", "인스타 바이럴 최적화"] },
    ];
  }

  const selProposal = proposals.find(p => p.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={<button className="btn btn-ghost btn-sm">마이페이지</button>} />

      {/* 헤더 */}
      <div style={{ padding: "48px 80px 32px", borderBottom: "1px solid var(--line)" }}>
        <div className="row gap-2">
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: loading ? "var(--brand)" : "#22c55e", animation: loading ? "pulse 1.2s infinite" : "none" }} />
          <span className="t-eyebrow" style={{ color: loading ? "var(--brand-ink)" : "#22c55e" }}>
            {loading ? "AI가 제안을 생성하고 있어요…" : "NEW · AI 제안서가 준비됐어요!"}
          </span>
        </div>
        <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between", marginTop: 10 }}>
          <div>
            {loading ? <Skeleton h={36} w="320px" /> : <h1 className="t-h1">맞춤 공간 구성 — 3가지 제안</h1>}
            {loading ? <Skeleton h={18} w="440px" /> : <p className="t-body" style={{ marginTop: 6, color: "var(--ink-3)" }}>마음에 드시는 안을 선택하시면 상세 제안서와 견적을 바로 확인하실 수 있어요.</p>}
          </div>
          {!loading && <div className="row gap-2">
            <button className="btn btn-ghost btn-sm">PDF 다운로드</button>
          </div>}
        </div>
      </div>

      {/* 3안 카드 */}
      <div style={{ padding: "32px 80px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {loading ? (
          [0,1,2].map(i => (
            <div key={i} className="surface" style={{ overflow: "hidden" }}>
              <div style={{ height: 180 }} className="shimmer" />
              <div style={{ padding: 20 }}>
                <Skeleton h={22} w="60%" />
                <Skeleton h={32} w="40%" />
                <Skeleton h={16} /> <Skeleton h={16} w="80%" />
                <div className="row gap-2" style={{ marginTop: 10 }}>{[1,2,3].map(j => <Skeleton key={j} h={26} w="70px" />)}</div>
              </div>
            </div>
          ))
        ) : (
          proposals.map(p => {
            const color = COLORS[p.id] ?? "#888";
            return (
              <div key={p.id} onClick={() => setSelected(p.id)} style={{ border: "2px solid", borderColor: selected === p.id ? "var(--ink-1)" : "var(--line)", borderRadius: "var(--r-lg)", overflow: "hidden", cursor: "pointer", transition: "all .2s", transform: selected === p.id ? "translateY(-4px)" : "none", boxShadow: selected === p.id ? "var(--shadow-lg)" : "none", position: "relative" }}>
                {p.highlight && <div style={{ position: "absolute", top: 14, right: 14, background: "var(--accent)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, zIndex: 2 }}>추천</div>}
                <div style={{ height: 180, background: color + "22", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(45deg,transparent,transparent 18px,${color}11 18px,${color}11 19px)` }} />
                  <div className="imgph" style={{ width: 110, height: 130, background: "rgba(255,255,255,0.7)", fontSize: 11, color }}>[ 3D 미리보기 ]</div>
                </div>
                <div style={{ padding: 20 }}>
                  <div className="row gap-2">
                    <span style={{ width: 22, height: 22, borderRadius: "50%", background: color, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800 }}>{p.id}</span>
                    <span className="t-eyebrow">{p.tier}</span>
                    {selected === p.id && <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--ink-1)", fontWeight: 700 }}>선택됨 ✓</span>}
                  </div>
                  <div style={{ fontFamily: "var(--font-en)", fontSize: 24, fontWeight: 800, marginTop: 10, letterSpacing: "-0.02em" }}>{p.price}</div>
                  <p className="t-small" style={{ marginTop: 8, lineHeight: 1.6 }}>{p.desc}</p>
                  <div className="row gap-1" style={{ marginTop: 12, flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} className="chip" style={{ height: 24, fontSize: 11 }}>{t}</span>)}
                  </div>
                  <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--bg-soft)", borderRadius: "var(--r-sm)" }}>
                    <div className="t-eyebrow" style={{ fontSize: 10 }}>컨셉</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{p.concept}</div>
                    {p.strengths?.[0] && <div className="t-small" style={{ marginTop: 4, fontSize: 11 }}>✓ {p.strengths[0]}</div>}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && <div style={{ margin: "0 80px 16px", padding: "12px 16px", border: "1px solid #fca5a5", borderRadius: "var(--r-sm)", background: "#fef2f2", color: "#dc2626", fontSize: 13 }}>{error} (샘플 데이터로 표시 중)</div>}

      {/* 하단 CTA */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, borderTop: "1px solid var(--line)", background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", padding: "14px 80px", display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div className="t-eyebrow">선택된 안</div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>
            {loading ? "생성 중…" : selProposal ? `${selProposal.tier} — ${selProposal.price}` : "-"}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-ghost" disabled={loading} onClick={() => {
          if (selProposal) {
            sessionStorage.setItem("selected-proposal", JSON.stringify(selProposal));
            router.push("/proposal-detail");
          }
        }}>상세 제안서 보기</button>
        <button className="btn btn-accent btn-lg" disabled={loading} onClick={() => {
          if (selProposal) {
            sessionStorage.setItem("selected-proposal", JSON.stringify(selProposal));
            router.push("/complete");
          }
        }}>이 안으로 예약하기 →</button>
      </div>
      <div style={{ height: 72 }} />
    </div>
  );
}
