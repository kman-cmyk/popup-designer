"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/ui/AppBar";

interface BriefData {
  projectName?: string;
  overview?: { eventType?: string; duration?: string; location?: string; openDate?: string; spaceSize?: string };
  audience?: { primary?: string; insights?: string[]; visitPattern?: string };
  concept?: { keyword?: string; tone?: string; colorPalette?: string; lighting?: string };
  mustHaves?: string[];
  successMetrics?: { metric: string; target: string }[];
  budget?: string;
  additionalNotes?: string;
}

const SECTIONS = [
  { key: "summary", code: "00", label: "전체 요약" },
  { key: "overview", code: "01", label: "프로젝트 개요" },
  { key: "audience", code: "02", label: "타겟 & 인사이트" },
  { key: "concept", code: "03", label: "희망 공간 컨셉" },
  { key: "must", code: "04", label: "필수 요구사항" },
  { key: "success", code: "05", label: "성공 기준" },
];

function Skeleton({ h = 20, w = "100%" }: { h?: number; w?: string }) {
  return <div className="shimmer" style={{ height: h, width: w, borderRadius: 4, marginBottom: 6 }} />;
}

export default function BriefPage() {
  const router = useRouter();
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState("summary");

  useEffect(() => {
    async function generate() {
      try {
        // sessionStorage에서 상담 데이터 가져오기
        const rawMessages = sessionStorage.getItem("mona-messages");
        const rawBriefData = sessionStorage.getItem("mona-brief");

        if (!rawMessages && !rawBriefData) {
          // 데이터 없으면 mock으로 fallback (개발용)
          await new Promise(r => setTimeout(r, 1500));
          setBrief(getMockBrief());
          setLoading(false);
          return;
        }

        const messages = rawMessages ? JSON.parse(rawMessages) : [];
        const briefData = rawBriefData ? JSON.parse(rawBriefData) : {};

        const res = await fetch("/api/brief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages, briefData }),
        });

        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        // 생성된 정의서 저장
        sessionStorage.setItem("mona-generated-brief", JSON.stringify(data));
        setBrief(data);
      } catch (e) {
        console.error(e);
        setError("정의서 생성 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.");
        setBrief(getMockBrief()); // 오류 시 mock fallback
      } finally {
        setLoading(false);
      }
    }
    generate();
  }, []);

  function getMockBrief(): BriefData {
    return {
      projectName: "스킨케어 신제품 팝업",
      overview: { eventType: "팝업스토어", duration: "2주", location: "성수 / 홍대", openDate: "2025년 6월 1주차", spaceSize: "5×4m (20m²)" },
      audience: { primary: "20-30대 여성, 미니멀·자연 무드 선호", insights: ["발색 직접 테스트 후 구매 결정", "셀피 촬영 후 SNS 공유 패턴", "방문 전 인스타 #팝업 검색"], visitPattern: "평균 체류 7분, 친구·커플 2인 방문 多" },
      concept: { keyword: "미니멀 스킨케어 살롱", tone: "Warm Minimal — 화이트 + 우드 톤", colorPalette: "Off-white / Oak / Sage Green", lighting: "3000K 자연광 LED" },
      mustHaves: ["신제품 5종 동시 디스플레이 (발색 비교 가능)", "셀피 미러 1면 (정면, 자연광)", "발색 테스트 카운터 + 티슈/거울 비치", "결제 카운터 (POS 1대)", "예산 500만원 이내"],
      successMetrics: [{ metric: "일 평균 방문자", target: "200명 이상" }, { metric: "인스타 노출", target: "5만 회 이상" }, { metric: "평균 체류 시간", target: "7분 이상" }, { metric: "체험 참여율", target: "방문자 60% 이상" }],
      budget: "500만원 이내",
      additionalNotes: "SNS 배경이 되는 포토 스팟 필수. 체험 동선이 자연스럽게 카운터로 이어지도록.",
    };
  }

  const sec = SECTIONS.find(s => s.key === active)!;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm" onClick={() => {
            const blob = new Blob([JSON.stringify(brief, null, 2)], { type: "application/json" });
            const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "requirements.json"; a.click();
          }}>JSON 다운로드</button>
        </div>
      } />

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 280px", height: "calc(100vh - 60px)", overflow: "hidden" }}>
        {/* 왼쪽 네비 */}
        <aside style={{ borderRight: "1px solid var(--line)", padding: "24px 20px", background: "var(--bg-soft)", overflowY: "auto" }}>
          <span className="t-eyebrow">REQUIREMENTS DOC</span>
          {loading ? <Skeleton h={18} w="70%" /> : <div className="t-h3" style={{ marginTop: 6 }}>{brief?.projectName ?? "프로젝트 정의서"}</div>}
          <div className="t-small" style={{ marginTop: 4 }}>v1 · AI 초안</div>
          <div className="col" style={{ marginTop: 20, gap: 2 }}>
            {SECTIONS.map((s, i) => {
              const isA = s.key === active;
              return (
                <div key={s.key} onClick={() => setActive(s.key)} style={{ padding: "10px 12px", borderRadius: "var(--r-sm)", background: isA ? "var(--ink-1)" : "transparent", color: isA ? "#fff" : "var(--ink-2)", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", borderTop: i === 1 ? "1px solid var(--line)" : "none", paddingTop: i === 1 ? 14 : 10, marginTop: i === 1 ? 8 : 0 }}>
                  <span className="t-mono" style={{ fontSize: 11, opacity: 0.7 }}>{s.code}</span>
                  <span style={{ fontSize: 13, fontWeight: isA ? 600 : 500 }}>{s.label}</span>
                </div>
              );
            })}
          </div>
          <div className="divider" />
          {loading ? (
            <div className="row gap-2"><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand)", animation: "pulse 1.2s infinite" }} /><span className="t-small">AI가 작성 중이에요…</span></div>
          ) : (
            <p className="t-small" style={{ lineHeight: 1.7 }}>각 섹션을 클릭하시면<br />상세 내용을 보실 수 있어요.</p>
          )}
        </aside>

        {/* 메인 */}
        <div style={{ padding: "32px 40px", overflowY: "auto" }} key={active}>
          <div className="row gap-2 fade-up"><span className="accent-dot" /><span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>{sec.code} · {sec.label}</span></div>

          {loading ? (
            <div style={{ marginTop: 16 }}>
              <Skeleton h={32} w="60%" />
              <Skeleton h={16} w="90%" />
              <Skeleton h={16} w="75%" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20 }}>
                {[1,2,3,4].map(i => <Skeleton key={i} h={72} />)}
              </div>
            </div>
          ) : error ? (
            <div style={{ marginTop: 16, padding: 20, border: "1px solid #fca5a5", borderRadius: "var(--r-md)", background: "#fef2f2", color: "#dc2626" }}>{error}</div>
          ) : (
            <div className="fade-up">
              {active === "summary" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>{brief?.projectName}</h1>
                  <p className="t-body" style={{ marginTop: 8, color: "var(--ink-3)" }}>AI가 상담 내용을 바탕으로 작성한 요구사항 정의서예요. 좌측 메뉴에서 각 항목을 자세히 확인하세요.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 22 }}>
                    {[
                      ["행사", brief?.overview?.eventType ?? "-"],
                      ["기간", brief?.overview?.duration ?? "-"],
                      ["타겟", brief?.audience?.primary?.split(",")[0] ?? "-"],
                      ["예산", brief?.budget ?? "-"],
                    ].map(([k, v]) => (
                      <div key={k} className="surface" style={{ padding: "12px 14px" }}>
                        <div className="t-eyebrow">{k}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="col gap-3" style={{ marginTop: 24 }}>
                    {SECTIONS.slice(1).map(s => (
                      <div key={s.key} onClick={() => setActive(s.key)} className="surface" style={{ padding: "16px 18px", cursor: "pointer", transition: "all .15s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ink-1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(2px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                        <div className="row gap-3">
                          <span className="t-mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-4)" }}>{s.code}</span>
                          <span style={{ fontSize: 14, fontWeight: 600, flex: 1 }}>{s.label}</span>
                          <span style={{ fontSize: 14, color: "var(--ink-3)" }}>→</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {brief?.additionalNotes && (
                    <div className="surface" style={{ marginTop: 20, padding: 16, background: "var(--bg-soft)", borderLeft: "3px solid var(--brand)" }}>
                      <span className="t-eyebrow">추가 메모</span>
                      <p className="t-body" style={{ marginTop: 6 }}>{brief.additionalNotes}</p>
                    </div>
                  )}
                </div>
              )}

              {active === "overview" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>프로젝트 개요</h1>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 18 }}>
                    {[
                      ["행사 종류", brief?.overview?.eventType],
                      ["운영 기간", brief?.overview?.duration],
                      ["희망 지역", brief?.overview?.location],
                      ["오픈 예정", brief?.overview?.openDate],
                      ["공간 크기", brief?.overview?.spaceSize],
                      ["예산", brief?.budget],
                    ].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k} className="surface" style={{ padding: "14px 16px" }}>
                        <div className="t-eyebrow">{k}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active === "audience" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>타겟 & 인사이트</h1>
                  <div className="surface" style={{ padding: "16px 18px", marginTop: 18, borderLeft: "3px solid var(--brand)" }}>
                    <div className="t-eyebrow">주 타겟</div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{brief?.audience?.primary}</div>
                  </div>
                  {brief?.audience?.insights && (
                    <div style={{ marginTop: 16 }}>
                      <div className="t-eyebrow" style={{ marginBottom: 10 }}>타겟 인사이트</div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {brief.audience.insights.map((ins, i) => (
                          <li key={i} className="row" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--brand)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                            <span style={{ fontSize: 14 }}>{ins}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {brief?.audience?.visitPattern && (
                    <div className="surface accent-tint" style={{ marginTop: 16, padding: "14px 16px" }}>
                      <div className="t-eyebrow">방문 패턴</div>
                      <p className="t-body" style={{ marginTop: 6 }}>{brief.audience.visitPattern}</p>
                    </div>
                  )}
                </div>
              )}

              {active === "concept" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>희망 공간 컨셉</h1>
                  <div className="surface" style={{ padding: "20px 22px", marginTop: 18, background: "var(--ink-1)", color: "#fff", borderColor: "var(--ink-1)" }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>{brief?.concept?.keyword}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 12 }}>
                    {[
                      ["톤 & 무드", brief?.concept?.tone],
                      ["컬러 팔레트", brief?.concept?.colorPalette],
                      ["조명", brief?.concept?.lighting],
                    ].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k} className="surface" style={{ padding: "12px 14px" }}>
                        <div className="t-eyebrow">{k}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active === "must" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>필수 요구사항</h1>
                  <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none" }}>
                    {brief?.mustHaves?.map((item, i) => (
                      <li key={i} className="row" style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--ink-1)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 14 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active === "success" && (
                <div>
                  <h1 className="t-h1" style={{ marginTop: 6 }}>성공 기준</h1>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 18 }}>
                    {brief?.successMetrics?.map((sm, i) => (
                      <div key={i} className="surface" style={{ padding: 18 }}>
                        <div className="t-eyebrow">{sm.metric}</div>
                        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6, fontFamily: "var(--font-en)" }}>{sm.target}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 오른쪽 CTA */}
        <aside style={{ borderLeft: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", display: "flex", flexDirection: "column" }}>
          <span className="t-eyebrow">다음 단계</span>
          <div className="t-h3" style={{ marginTop: 6 }}>이대로 제안 받아볼게요!</div>
          <p className="t-small" style={{ marginTop: 8 }}>전문가가 빠르게 3가지 공간 구성 제안을 준비해 드릴게요.</p>
          <div className="surface" style={{ padding: 14, marginTop: 16, background: "#fff" }}>
            <div className="t-eyebrow">예상 소요</div>
            <div className="t-h3" style={{ marginTop: 4 }}>8시간 이내</div>
            <div className="divider" />
            <div className="t-eyebrow">받게 될 것</div>
            <ul style={{ marginTop: 6, padding: 0, listStyle: "none", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.9 }}>
              {["맞춤 제안서 3가지", "2D / 3D 도면", "모듈별 견적"].map(t => (
                <li key={t} className="row"><span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-1)", marginRight: 8 }} />{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-accent btn-lg" style={{ width: "100%" }} disabled={loading}
            onClick={() => {
              if (brief) sessionStorage.setItem("mona-generated-brief", JSON.stringify(brief));
              router.push("/signup");
            }}>
            {loading ? "정의서 작성 중…" : "제안 받기 →"}
          </button>
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }} onClick={() => router.push("/chat")}>다시 상담하기</button>
        </aside>
      </div>
    </div>
  );
}
