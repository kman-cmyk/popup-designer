"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/ui/AppBar";

const SECTIONS = {
  summary:  { code: "00", label: "요약",          eyebrow: "한 장 요약 · 이거 맞으신가요?" },
  overview: { code: "01", label: "프로젝트 개요",  eyebrow: "PROJECT OVERVIEW" },
  audience: { code: "02", label: "타겟 & 인사이트", eyebrow: "AUDIENCE & INSIGHT" },
  concept:  { code: "03", label: "희망 공간 컨셉", eyebrow: "SPACE CONCEPT" },
  must:     { code: "04", label: "필수 요구사항",  eyebrow: "MUST-HAVES" },
  success:  { code: "05", label: "성공 기준",      eyebrow: "SUCCESS METRICS" },
};
type SKey = keyof typeof SECTIONS;
const ORDER: SKey[] = ["summary", "overview", "audience", "concept", "must", "success"];

export default function BriefPage() {
  const router = useRouter();
  const [active, setActive] = useState<SKey>("summary");
  const sec = SECTIONS[active];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <AppBar active="" right={
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm">PDF 다운로드</button>
          <button className="btn btn-ghost btn-sm">공유 링크 복사</button>
        </div>
      } />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 280px", height: "calc(100vh - 60px)", overflow: "hidden" }}>

        {/* 왼쪽 네비 */}
        <aside style={{ borderRight: "1px solid var(--line)", padding: "24px 20px", background: "var(--bg-soft)", overflowY: "auto" }}>
          <span className="t-eyebrow">REQUIREMENTS DOC</span>
          <div className="t-h3" style={{ marginTop: 6 }}>스킨케어 신제품 팝업</div>
          <div className="t-small" style={{ marginTop: 4 }}>v1 · AI 초안</div>
          <div className="col" style={{ marginTop: 20, gap: 2 }}>
            {ORDER.map((key, i) => {
              const s = SECTIONS[key]; const isA = key === active;
              return (
                <div key={key} onClick={() => setActive(key)} style={{ padding: "10px 12px", borderRadius: "var(--r-sm)", background: isA ? "var(--ink-1)" : "transparent", color: isA ? "#fff" : "var(--ink-2)", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", borderTop: i === 1 ? "1px solid var(--line)" : "none", paddingTop: i === 1 ? 14 : 10, marginTop: i === 1 ? 8 : 0 }}>
                  <span className="t-mono" style={{ fontSize: 11, opacity: 0.7 }}>{s.code}</span>
                  <span style={{ fontSize: 13, fontWeight: isA ? 600 : 500 }}>{s.label}</span>
                  {key === "summary" && <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 999, background: isA ? "rgba(255,255,255,0.15)" : "var(--ink-1)", color: "#fff" }}>전체</span>}
                </div>
              );
            })}
          </div>
          <div className="divider" />
          <p className="t-small" style={{ lineHeight: 1.7 }}>각 섹션을 클릭하시면<br />상세 내용을 보실 수 있어요.</p>
        </aside>

        {/* 메인 */}
        <div style={{ padding: "32px 40px", overflowY: "auto" }} key={active}>
          <div className="row gap-2 fade-up"><span className="accent-dot" /><span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>{sec.eyebrow}</span></div>
          <h1 className="t-h1 fade-up" style={{ marginTop: 6 }}>
            {active === "summary" && "전체 내용 한눈에"}
            {active === "overview" && "어떤 행사인지 정리해 봤어요"}
            {active === "audience" && "어떤 분들이 오실까요?"}
            {active === "concept" && "어떤 분위기를 만들고 싶으세요?"}
            {active === "must" && "꼭 들어가야 할 것들이에요"}
            {active === "success" && "이번 프로젝트가 잘 됐다고 판단할 기준"}
          </h1>

          {active === "summary" && (
            <div className="fade-up">
              <p className="t-body" style={{ marginTop: 8, color: "var(--ink-3)" }}>입력해 주신 답변을 모나가 정리해 봤어요. 좌측 메뉴에서 각 항목을 자세히 보실 수 있어요.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 22 }}>
                {[["행사", "팝업 · 2주"], ["타겟", "20-30대 여성"], ["목표", "인지 + 회자"], ["예산·공간", "500만 / 5×4m"]].map(([k, v]) => (
                  <div key={k} className="surface" style={{ padding: "12px 14px" }}>
                    <div className="t-eyebrow">{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="col gap-3" style={{ marginTop: 24 }}>
                {(["overview","audience","concept","must","success"] as SKey[]).map(key => {
                  const s = SECTIONS[key];
                  return (
                    <div key={key} onClick={() => setActive(key)} className="surface" style={{ padding: "16px 18px", cursor: "pointer", transition: "all .15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--ink-1)"; (e.currentTarget as HTMLDivElement).style.transform = "translateX(2px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = ""; (e.currentTarget as HTMLDivElement).style.transform = ""; }}>
                      <div className="row gap-3">
                        <span className="t-mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-4)" }}>{s.code}</span>
                        <div className="grow"><div style={{ fontSize: 14, fontWeight: 600 }}>{s.label}</div></div>
                        <span style={{ fontSize: 14, color: "var(--ink-3)" }}>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="surface" style={{ marginTop: 22, padding: 16, background: "var(--bg-soft)" }}>
                <span className="t-eyebrow">이거 맞나요? 빠진 거 있나요?</span>
                <div className="row gap-2" style={{ marginTop: 10, flexWrap: "wrap" }}>
                  {["네, 정확해요!", "타겟을 더 구체적으로", "예산 늘려야 할 것 같아요", "공간 정보 수정"].map(c => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === "overview" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              <p className="t-body">스킨케어 브랜드의 신제품 5종을 알리는 <b>2주 팝업스토어</b>예요. 인스타그램에서 자연스럽게 회자되는 것이 1차 목표이고, 직접 체험이 2차 목표예요.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 16 }}>
                {[["행사 종류", "팝업스토어"], ["운영 기간", "2주"], ["장소", "성수 · 5×4m"], ["오픈 희망", "2025년 6월 1주차"]].map(([k, v]) => (
                  <div key={k} className="surface" style={{ padding: "12px 14px" }}><div className="t-eyebrow">{k}</div><div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v}</div></div>
                ))}
              </div>
            </div>
          )}

          {active === "audience" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.8, fontSize: 14 }}>
                {["20-30대 여성, 미니멀·자연 무드 선호", "평균 체류 시간 7분, 셀피 1.6장/방문", "'발색 직접 테스트 가능'이 회자 트리거", "방문 전 인스타에서 #스킨케어팝업 검색"].map(t => (
                  <li key={t} className="row" style={{ alignItems: "flex-start", marginBottom: 4 }}><span className="tick-list-item" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
          )}

          {active === "concept" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              <p className="t-body"><b>'발라보고 가는, 미니멀 스킨케어 살롱'</b> — 화이트 + 우드 톤, 자연광 느낌의 LED로 부담 없이 머무르실 수 있는 공간을 만들 거예요.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
                {[["톤 & 무드", "Warm Minimal"], ["메인 컬러", "Off-white · Oak"], ["조명", "3000K 자연광"]].map(([k, v]) => (
                  <div key={k} className="surface" style={{ padding: "12px 14px" }}><div className="t-eyebrow">{k}</div><div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{v}</div></div>
                ))}
              </div>
            </div>
          )}

          {active === "must" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", lineHeight: 1.8, fontSize: 14 }}>
                {["신제품 5종 동시 디스플레이 (발색 비교 가능)", "셀피 미러 1면 (정면, 자연광)", "발색 테스트 카운터 + 티슈/거울 비치", "결제 카운터 (POS 1대)", "예산 500만원 이내 · 5×4m 안에서 운영"].map(t => (
                  <li key={t} className="row" style={{ alignItems: "flex-start", marginBottom: 4 }}><span className="tick-list-item" /><span>{t}</span></li>
                ))}
              </ul>
            </div>
          )}

          {active === "success" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["일 평균 방문자", "200명 이상"], ["인스타 노출", "5만 회 이상"], ["체류 시간", "평균 7분 이상"], ["체험 참여율", "방문자 60% 이상"]].map(([k, v]) => (
                  <div key={k} className="surface" style={{ padding: 16 }}><div className="t-eyebrow">{k}</div><div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{v}</div></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 우측 CTA */}
        <aside style={{ borderLeft: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", display: "flex", flexDirection: "column" }}>
          <span className="t-eyebrow">다음 단계</span>
          <div className="t-h3" style={{ marginTop: 6 }}>이대로 제안 받아볼게요!</div>
          <p className="t-small" style={{ marginTop: 8 }}>전문가가 빠르게 견적과 도면을 작성해 드릴게요. 평균 8시간이면 충분해요.</p>
          <div className="surface" style={{ padding: 14, marginTop: 16, background: "#fff" }}>
            <div className="t-eyebrow">예상 소요</div>
            <div className="t-h3" style={{ marginTop: 4, color: "var(--ink-1)" }}>8시간 이내</div>
            <div className="t-small" style={{ marginTop: 4, fontSize: 11, color: "var(--ink-4)" }}>접수 건이 많으면 조금 더 걸릴 수 있어요</div>
            <div className="divider" />
            <div className="t-eyebrow">받게 될 것</div>
            <ul style={{ marginTop: 6, padding: 0, listStyle: "none", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.9 }}>
              {["맞춤 제안서", "2D / 3D 도면", "모듈별 견적"].map(t => (
                <li key={t} className="row"><span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-1)", marginRight: 8 }} />{t}</li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-accent btn-lg" style={{ width: "100%" }} onClick={() => router.push("/signup")}>제안 받기 →</button>
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>조금 더 수정할게요</button>
        </aside>
      </div>
    </div>
  );
}
