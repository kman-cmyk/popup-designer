"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar } from "@/components/ui/AppBar";

// 모듈 데이터는 sessionStorage에서 로드
const EMPTY_MODULES: {id:string;name:string;spec:string;price:string;note:string}[] = [];

interface ProposalModule { name: string; spec: string; price: string; note: string }
interface Proposal { id: string; tier: string; price: string; priceNum?: number; concept: string; desc: string; tags: string[]; modules: ProposalModule[]; flow: string; highlight: boolean; strengths?: string[] }

export default function ProposalDetailPage() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");
  const [activeSection, setActiveSection] = useState<"overview" | "modules" | "flow" | "schedule">("overview");
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("selected-proposal");
    if (raw) { try { setProposal(JSON.parse(raw)); } catch { /* ignore */ } }
  }, []);

  const modules: {id:string;name:string;spec:string;price:string;note:string}[] = proposal?.modules?.length
    ? proposal.modules.map((m, i) => ({ id: `M${String(i+1).padStart(2,"0")}`, ...m }))
    : EMPTY_MODULES;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm">PDF 다운로드</button>
          <Link href="/complete" className="btn btn-accent btn-sm" style={{ textDecoration:"none" }}>예약하기 →</Link>
        </div>
      } />

      {/* 서브 네비 */}
      <div style={{ borderBottom: "1px solid var(--line)", padding: "0 80px", display: "flex", gap: 0 }}>
        {(["overview", "modules", "flow", "schedule"] as const).map(s => {
          const labels = { overview: "개요", modules: "모듈 구성", flow: "동선", schedule: "일정" };
          const isA = activeSection === s;
          return (
            <button key={s} onClick={() => setActiveSection(s)} style={{ height: 44, padding: "0 18px", border: "none", borderBottom: isA ? "2px solid var(--ink-1)" : "2px solid transparent", background: "transparent", color: isA ? "var(--ink-1)" : "var(--ink-3)", fontWeight: isA ? 700 : 500, fontSize: 13, cursor: "pointer", transition: "all .15s" }}>
              {labels[s]}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", height: "calc(100vh - 104px)", overflow: "hidden" }}>
        {/* 메인 패널 */}
        <div style={{ overflowY: "auto", padding: "28px 40px" }}>

          {activeSection === "overview" && (
            <div className="fade-up">
              <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">스탠다드 안 B · 개요</span></div>
              <h1 className="t-h1" style={{ marginTop: 8 }}>체험 + 포토존 구성</h1>
              <p className="t-body" style={{ marginTop: 10, color: "var(--ink-3)", maxWidth: 600 }}>방문자가 제품을 직접 발라보고, 셀피를 찍고, 자연스럽게 SNS에 공유하는 동선을 설계했어요. 입구→체험→포토→카운터로 이어지는 흐름이에요.</p>

              {/* 도면 영역 */}
              <div style={{ marginTop: 24, border: "1px solid var(--line)", borderRadius: "var(--r-md)", overflow: "hidden" }}>
                <div className="row" style={{ padding: "10px 16px", borderBottom: "1px solid var(--line)", background: "var(--bg-soft)" }}>
                  <span className="t-eyebrow">2D / 3D 도면</span>
                  <div style={{ flex: 1 }} />
                  <div className="row gap-1" style={{ background: "var(--bg-muted)", borderRadius: "var(--r-sm)", padding: "3px" }}>
                    {(["2d", "3d"] as const).map(m => (
                      <button key={m} onClick={() => setViewMode(m)} style={{ height: 26, padding: "0 12px", border: "none", borderRadius: "var(--r-xs)", background: viewMode === m ? "var(--ink-1)" : "transparent", color: viewMode === m ? "#fff" : "var(--ink-3)", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .15s", fontFamily: "var(--font-en)" }}>
                        {m.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                {viewMode === "2d" ? (
                  <div style={{ height: 400, background: "var(--bg-soft)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* 2D 도면 SVG */}
                    <svg viewBox="0 0 500 360" style={{ width: "90%", height: "90%" }}>
                      <g opacity={0.15}>{Array.from({ length: 21 }).map((_, gx) => Array.from({ length: 16 }).map((_, gy) => <circle key={`${gx}-${gy}`} cx={gx * 25} cy={gy * 25} r="0.8" fill="#6B8FFF" />))}</g>
                      {/* 공간 외벽 */}
                      <rect x="50" y="30" width="400" height="300" fill="none" stroke="#0a2540" strokeWidth="2.5" />
                      {/* 입구 */}
                      <line x1="230" y1="330" x2="270" y2="330" stroke="#fff" strokeWidth="3" />
                      <text x="250" y="348" textAnchor="middle" fontSize="9" fill="#4a6691" fontFamily="ui-monospace">입구</text>
                      {/* 모듈들 */}
                      <rect x="68" y="45" width="70" height="40" fill="#6B8FFF22" stroke="#6B8FFF" strokeWidth="1.2" rx="2" />
                      <text x="103" y="68" textAnchor="middle" fontSize="8" fill="#3a5cc7" fontFamily="ui-monospace">선반 2단</text>
                      <rect x="155" y="45" width="120" height="50" fill="#FF6B3522" stroke="#FF6B35" strokeWidth="1.2" rx="2" />
                      <text x="215" y="72" textAnchor="middle" fontSize="8" fill="#C44A1B" fontFamily="ui-monospace">체험 카운터</text>
                      <rect x="350" y="45" width="82" height="120" fill="#A78BFA22" stroke="#A78BFA" strokeWidth="1.2" rx="2" />
                      <text x="391" y="110" textAnchor="middle" fontSize="8" fill="#7C5CD9" fontFamily="ui-monospace">백라이트 패널</text>
                      <rect x="68" y="110" width="40" height="140" fill="#6B8FFF22" stroke="#6B8FFF" strokeWidth="1.2" rx="2" />
                      <text x="88" y="185" textAnchor="middle" fontSize="8" fill="#3a5cc7" fontFamily="ui-monospace">미러</text>
                      <rect x="130" y="130" width="180" height="80" fill="#22c55e22" stroke="#22c55e" strokeWidth="1.2" rx="2" />
                      <text x="220" y="175" textAnchor="middle" fontSize="8" fill="#16a34a" fontFamily="ui-monospace">포토월</text>
                      <rect x="160" y="260" width="80" height="45" fill="#f59e0b22" stroke="#f59e0b" strokeWidth="1.2" rx="2" />
                      <text x="200" y="287" textAnchor="middle" fontSize="8" fill="#b45309" fontFamily="ui-monospace">카운터</text>
                      {/* 동선 화살표 */}
                      <path d="M250 330 L250 310 L200 310 L200 290 L200 255" stroke="#FF6B35" strokeWidth="1.5" fill="none" strokeDasharray="4 2" markerEnd="url(#arr)" />
                      <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 Z" fill="#FF6B35"/></marker></defs>
                    </svg>
                  </div>
                ) : (
                  <div className="imgph" style={{ height: 400 }}>[ 3D 렌더링 뷰 · 에디터 연동 ]</div>
                )}
              </div>

              {/* 주요 특징 */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 20 }}>
                {[["체류 시간", "목표 9분↑", "셀피 포인트 2곳 배치"], ["예상 방문자", "일 250명↑", "입구-포토-카운터 최단 동선"], ["SNS 잠재력", "높음 ★★★★", "인스타 배경 최적화 구도"]].map(([k, v, d]) => (
                  <div key={k} className="surface" style={{ padding: "14px 16px" }}>
                    <div className="t-eyebrow">{k}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>{v}</div>
                    <div className="t-small" style={{ marginTop: 4, fontSize: 11 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "modules" && (
            <div className="fade-up">
              <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">모듈 구성 · {modules.length}개</span></div>
              <h2 className="t-h2" style={{ marginTop: 8 }}>사용 모듈 상세</h2>
              {modules.length === 0 && <p className="t-body" style={{ marginTop: 16, color: "var(--ink-3)" }}>모듈 상세 정보가 없어요. 제안 목록에서 다시 선택해 주세요.</p>}
              <div className="col gap-3" style={{ marginTop: 20 }}>
                {modules.map((m, i) => (
                  <div key={m.id} className="surface fade-up" style={{ padding: "16px 18px", display: "flex", gap: 16, alignItems: "center" }}>
                    <div className="imgph" style={{ width: 72, height: 72, flexShrink: 0, fontSize: 10 }}>3D</div>
                    <div className="grow">
                      <div className="row gap-2">
                        <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{m.id}</span>
                        <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                        <span className="t-mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.spec}</span>
                      </div>
                      <p className="t-small" style={{ marginTop: 4 }}>{m.note}</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "var(--font-en)" }}>{m.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "flow" && (
            <div className="fade-up">
              <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">고객 동선 분석</span></div>
              <h2 className="t-h2" style={{ marginTop: 8 }}>설계된 동선</h2>
              {proposal?.flow && <p className="t-body" style={{ marginTop: 8, color: "var(--ink-2)", fontWeight: 600 }}>{proposal.flow}</p>}
              <div className="col gap-3" style={{ marginTop: 20 }}>
                {[{ step: "01", title: "입구 → 첫인상", color: "#FF6B35", desc: "입구에서 브랜드 첫인상을 만드는 주요 모듈이 배치돼요." },
                  { step: "02", title: "핵심 체험 존", color: "#6B8FFF", desc: "고객이 제품을 직접 체험하고 SNS에 공유할 수 있는 공간이에요." },
                  { step: "03", title: "카운터 / 결제", color: "#22c55e", desc: "자연스럽게 구매로 이어지는 마지막 동선이에요." }].map(s => (
                  <div key={s.step} className="surface" style={{ padding: "18px 20px", borderLeft: `3px solid ${s.color}` }}>
                    <div className="row gap-3">
                      <span className="t-mono" style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.step}</span>
                      <span style={{ fontSize: 15, fontWeight: 700 }}>{s.title}</span>
                    </div>
                    <p className="t-body" style={{ marginTop: 8 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "schedule" && (
            <div className="fade-up">
              <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">진행 일정</span></div>
              <h2 className="t-h2" style={{ marginTop: 8 }}>오픈까지 3주 플랜</h2>
              <div className="col" style={{ marginTop: 20 }}>
                {[{ week: "D-21", label: "계약 & 발주", tasks: ["계약서 서명", "모듈 제작 시작 (2주 소요)"], done: false },
                  { week: "D-7", label: "세팅 준비", tasks: ["장소 실측", "설치 스케줄 확정"], done: false },
                  { week: "D-1", label: "현장 설치", tasks: ["모듈 반입 & 조립", "조명 세팅", "최종 점검"], done: false },
                  { week: "D-Day", label: "오픈 🎉", tasks: ["운영 시작"], done: false }].map((w, i) => (
                  <div key={w.week} style={{ display: "flex", gap: 20, paddingBottom: i < 3 ? 24 : 0 }}>
                    <div className="col" style={{ alignItems: "center", flexShrink: 0 }}>
                      <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--ink-1)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{i + 1}</span>
                      {i < 3 && <div style={{ width: 1, flex: 1, background: "var(--line)", marginTop: 4 }} />}
                    </div>
                    <div style={{ paddingTop: 4 }}>
                      <div className="row gap-2"><span className="t-mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-3)" }}>{w.week}</span><span style={{ fontSize: 15, fontWeight: 700 }}>{w.label}</span></div>
                      <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none" }}>
                        {w.tasks.map(t => <li key={t} className="row" style={{ fontSize: 13, color: "var(--ink-2)", marginBottom: 3 }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-3)", marginRight: 8, marginTop: 7 }} />{t}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 요약 */}
        <aside style={{ borderLeft: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
          <span className="t-eyebrow">선택된 안</span>
          <div className="t-h3" style={{ marginTop: 6 }}>{proposal ? `${proposal.tier} 안 ${proposal.id}` : "—"}</div>
          <div style={{ fontFamily: "var(--font-en)", fontSize: 28, fontWeight: 800, marginTop: 4, letterSpacing: "-0.02em" }}>{proposal?.price ?? "—"}</div>
          <div className="divider" />
          <div className="col gap-2">
            {modules.length > 0 ? modules.map(m => (
              <div key={m.id} className="row" style={{ padding: "7px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontSize: 12, flex: 1 }}>{m.name}</span>
                <span className="t-mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{m.price}</span>
              </div>
            )) : proposal?.tags?.map(t => (
              <div key={t} className="row" style={{ padding: "7px 0", borderBottom: "1px solid var(--line)" }}>
                <span style={{ fontSize: 12, flex: 1 }}>{t}</span>
              </div>
            ))}
            <div className="row" style={{ padding: "10px 0" }}>
              <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>합계</span>
              <span className="t-mono" style={{ fontWeight: 800, fontSize: 14 }}>{proposal?.price ?? "—"}</span>
            </div>
          </div>
          <div style={{ flex: 1 }} />
          <Link href="/complete" className="btn btn-accent btn-lg" style={{ width:"100%", textDecoration:"none" }}>이 안으로 예약하기 →</Link>
          <Link href="/proposal" className="btn btn-ghost" style={{ width:"100%", marginTop:8, textDecoration:"none" }}>다른 안 비교하기</Link>
        </aside>
      </div>
    </div>
  );
}
