/* global React */
const { useState, useEffect } = React;
const { Brand, AppBar, FlowBar, Eyebrow } = window.MYP2;

// ============================================================
// Screen 04 — 가입하기 (A안: 모달 + 마이크로카피)
// ============================================================
function Screen04() {
  return (
    <div className="frame-desktop">
      <FlowBar step={6} total={6} title="마지막 단계" />
      <div style={{
        padding: "24px 36px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 24,
        height: "calc(100% - 56px)", filter: "blur(2px) opacity(0.5)", pointerEvents: "none",
      }}>
        <div className="surface-soft" style={{ height: "100%" }} />
        <div className="surface" style={{ height: "100%" }} />
      </div>

      <div style={{
        position: "absolute", inset: 0, top: 56,
        background: "rgba(0,0,0,0.32)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn .25s ease",
      }}>
        <div className="surface fade-up" style={{
          width: 480, padding: "36px 36px 28px", background: "#fff",
          boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-1)" }} />
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>잠시만요!</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 8 }}>
            제안서가 완성되면<br />
            <span style={{ color: "var(--ink-1)" }}>이메일로 살짝</span> 알려드릴게요.
          </h2>
          <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>
            AI랑 공간 마케팅 전문가가 정성스럽게 제안을 작성해 드릴게요.
            평균 8시간 정도 걸리고요, 다 되면 바로 알림 보내드릴게요!
            <span style={{ display: "block", fontSize: 12, marginTop: 6, color: "var(--ink-4)" }}>
              ※ 접수 건이 많을 때는 조금 더 걸릴 수 있어요.
            </span>
          </p>

          <div className="col gap-3" style={{ marginTop: 24 }}>
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>이메일</div>
              <input className="input" placeholder="your@email.com" />
            </div>
            <div>
              <div className="t-eyebrow" style={{ marginBottom: 6 }}>비밀번호</div>
              <input className="input" type="password" placeholder="8자 이상으로 만들어 주세요" defaultValue="••••••••" />
            </div>
          </div>

          <div className="accent-tint" style={{ marginTop: 16, padding: "12px 14px", borderRadius: "var(--r-sm)" }}>
            <div className="t-small" style={{ lineHeight: 1.7, color: "var(--ink-2)" }}>
              <div>✓ 입력해 주신 이메일은 <b>제안 완료 알림 외에는 절대 사용하지 않아요</b>.</div>
              <div>✓ 마케팅 메일 보내지 않을게요. 언제든 편하게 탈퇴하실 수 있어요.</div>
            </div>
          </div>

          <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 18 }}>
            가입하고 제안 받기 →
          </button>

          <div className="row gap-2" style={{ marginTop: 14, justifyContent: "center" }}>
            <span className="t-small">이미 계정이 있으세요?</span>
            <span style={{ fontSize: 12, fontWeight: 600, textDecoration: "underline", cursor: "pointer", color: "var(--ink-1)" }}>로그인</span>
          </div>

          <div className="row gap-2" style={{ marginTop: 16, alignItems: "center" }}>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span className="t-small" style={{ fontSize: 11 }}>또는</span>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>
          <div className="row gap-2" style={{ marginTop: 12 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }}>Google로 시작</button>
            <button className="btn btn-ghost" style={{ flex: 1 }}>Kakao로 시작</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 05 — AI 분석 진행
// ============================================================
function Screen05() {
  const steps = [
    ["입력해 주신 6개 답변 정리하기", "done"],
    ["유사 팝업·전시 1,287건 매칭하기", "done"],
    ["타겟 동선 패턴 분석 중이에요", "active"],
    ["공간 모듈 조합 시뮬레이션", "wait"],
    ["요구사항 정의서 작성", "wait"],
  ];
  return (
    <div className="frame-desktop">
      <FlowBar step={6} total={6} title="AI 분석 중" onBack={false} />
      <div style={{ padding: "40px 60px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, height: "calc(100% - 56px)", overflow: "hidden" }}>
        <div className="col">
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-1)", animation: "pulse 1.6s infinite" }} />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>AI 분석 중 · 약 30초 남았어요</span>
          </div>
          <h2 className="t-h1" style={{ marginTop: 10 }}>
            <span style={{ color: "var(--ink-1)" }}>스킨케어 신제품 팝업</span>을<br />
            지금 열심히 분석하고 있어요.
          </h2>
          <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>
            입력해 주신 정보로 가장 비슷한 사례를 찾고, 동선과 모듈 구성을 시뮬레이션하고 있는 중이에요. 조금만 기다려 주세요!
          </p>

          <div className="col gap-2 stagger" style={{ marginTop: 28 }}>
            {steps.map(([text, state], i) => (
              <div key={i} className="surface" style={{
                padding: "14px 16px",
                background: state === "active" ? "var(--ink-1)" : "#fff",
                color: state === "active" ? "#fff" : state === "wait" ? "var(--ink-4)" : "var(--ink-1)",
                borderColor: state === "wait" ? "var(--line)" : state === "active" ? "var(--ink-1)" : "var(--ink-1)",
                borderStyle: state === "wait" ? "dashed" : "solid",
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: state === "done" ? "var(--ink-1)" : state === "active" ? "#fff" : "transparent",
                  color: state === "done" ? "#fff" : "var(--ink-1)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                  border: state === "wait" ? "1px dashed var(--line-strong)" : "none",
                  flexShrink: 0,
                }}>
                  {state === "done" ? "✓" : state === "active" ? <span style={{ display: "inline-block", width: 12, height: 12, border: "2px solid var(--ink-1)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : ""}
                </span>
                <span style={{ fontWeight: state === "active" ? 600 : 500, fontSize: 14 }}>{text}</span>
                {state === "active" && (
                  <span className="t-small" style={{ marginLeft: "auto", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-mono)" }}>
                    62%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col" style={{ overflow: "hidden" }}>
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>기다리는 동안 살펴보세요 · 알고 계셨어요?</span>
          </div>
          <div className="surface fade-up" style={{ padding: 24, marginTop: 10, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: "var(--ink-1)" }} />
            <h3 className="t-h2" style={{ lineHeight: 1.3 }}>
              스킨케어 팝업의 평균 체류 시간은 <span style={{ color: "var(--ink-1)" }}>7분</span>이에요.
            </h3>
            <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>
              그래서 ‘직접 만져보고 발라보는’ 체험 동선이 정말 중요해요. 입구에서 카운터까지의 거리,
              미러월의 높이, 발색 테스트 공간이 회자 트리거가 된답니다.
            </p>
            <div className="imgph" style={{ height: 180, marginTop: 16 }}>
              [ 통계 차트: 평균 체류시간 / 회자 빈도 ]
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div className="surface" style={{ padding: 16, background: "var(--ink-1)", color: "#fff", borderColor: "var(--ink-1)" }}>
              <div className="t-eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>셀피 빈도</div>
              <div className="t-h2" style={{ marginTop: 6, fontFamily: "var(--font-en)" }}>1.6장 <span style={{ fontSize: 13, fontWeight: 400, opacity: 0.85 }}>/ 방문</span></div>
            </div>
            <div className="surface accent-tint" style={{ padding: 16 }}>
              <div className="t-eyebrow" style={{ color: "var(--ink-2)" }}>회자 트리거 1위</div>
              <div className="t-h3" style={{ marginTop: 6 }}>발색 비교 보드</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 06 — 요구사항 정의서 (요약 + 5섹션 탭)
// ============================================================
const REQ_SECTIONS = {
  summary: {
    label: "요약",
    code: "00",
    eyebrow: "ONE-PAGE OVERVIEW",
    title: "전체 내용 한눈에",
    body: null, // rendered specially below
  },
  overview: {
    label: "프로젝트 개요",
    code: "01",
    eyebrow: "PROJECT OVERVIEW",
    title: "어떤 행사인지 정리해 봤어요",
    body: (
      <>
        <p className="t-body">
          스킨케어 브랜드의 신제품 5종을 알리는 <b>2주 팝업스토어</b>예요.
          인스타그램에서 자연스럽게 회자되는 것이 1차 목표이고요,
          매장에 와주신 분들이 신제품을 직접 체험하시는 게 2차 목표예요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, marginTop: 16 }}>
          {[["행사 종류", "팝업스토어"],["운영 기간", "2주"],["장소", "성수 · 5×4m"],["오픈 희망", "2025년 6월 1주차"]].map(([k,v]) => (
            <div key={k} className="surface" style={{ padding: "12px 14px" }}>
              <div className="t-eyebrow">{k}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  audience: {
    label: "타겟 & 인사이트",
    code: "02",
    eyebrow: "AUDIENCE & INSIGHT",
    title: "어떤 분들이 오실까요?",
    body: (
      <>
        <ul style={{ marginTop: 0, paddingLeft: 0, listStyle: "none", lineHeight: 1.8, fontSize: 14 }}>
          {[
            "20-30대 여성, 미니멀·자연 무드 선호",
            "평균 체류 시간 7분, 셀피 1.6장/방문",
            "‘발색 직접 테스트 가능’이 회자 트리거",
            "방문 전 인스타에서 #스킨케어팝업 검색",
          ].map(t => (
            <li key={t} className="row" style={{ alignItems: "flex-start", marginBottom: 4 }}>
              <span className="tick-list-item" /><span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="surface" style={{ marginTop: 16, padding: 16, background: "var(--bg-soft)" }}>
          <Eyebrow>AI 분석 · 유사 사례 1,287건</Eyebrow>
          <p className="t-small" style={{ marginTop: 6, lineHeight: 1.7 }}>
            비슷한 타겟의 팝업에서 평균 인스타 노출 17만 회를 기록했어요. ‘셀피존 + 발색 비교 보드’가
            가장 강력한 회자 조합이었습니다.
          </p>
        </div>
      </>
    ),
  },
  concept: {
    label: "희망 공간 컨셉",
    code: "03",
    eyebrow: "SPACE CONCEPT",
    title: "어떤 분위기를 만들고 싶으세요?",
    body: (
      <>
        <p className="t-body">
          <b>‘발라보고 가는, 미니멀 스킨케어 살롱’</b> — 화이트 + 우드 톤,
          자연광 느낌의 LED, 조용한 음악으로 부담 없이 머무르실 수 있는 공간을 만들 거예요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 16 }}>
          {[["톤 & 무드", "Warm Minimal"],["메인 컬러", "Off-white · Oak"],["조명", "3000K 자연광"]].map(([k,v]) => (
            <div key={k} className="surface" style={{ padding: "12px 14px" }}>
              <div className="t-eyebrow">{k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  must: {
    label: "필수 요구사항",
    code: "04",
    eyebrow: "MUST-HAVES",
    title: "꼭 들어가야 할 것들이에요",
    body: (
      <ul style={{ marginTop: 0, paddingLeft: 0, listStyle: "none", lineHeight: 1.8, fontSize: 14 }}>
        {[
          "신제품 5종 동시 디스플레이 (발색 비교 가능)",
          "셀피 미러 1면 (정면, 자연광)",
          "발색 테스트 카운터 + 티슈/거울 비치",
          "결제 카운터 (POS 1대)",
          "예산 500만원 이내 · 5×4m 안에서 운영",
        ].map(t => (
          <li key={t} className="row" style={{ alignItems: "flex-start", marginBottom: 4 }}>
            <span className="tick-list-item" /><span>{t}</span>
          </li>
        ))}
      </ul>
    ),
  },
  success: {
    label: "성공 기준",
    code: "05",
    eyebrow: "SUCCESS METRICS",
    title: "이번 프로젝트가 잘 됐다고 판단할 기준",
    body: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          ["일 평균 방문자", "200명 이상"],
          ["인스타 #해시태그 노출", "5만 회 이상"],
          ["체류 시간", "평균 7분 이상"],
          ["발색 테스트 참여율", "방문자 60% 이상"],
        ].map(([k,v]) => (
          <div key={k} className="surface" style={{ padding: 16 }}>
            <div className="t-eyebrow">{k}</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{v}</div>
          </div>
        ))}
      </div>
    ),
  },
};

function Screen06() {
  const [active, setActive] = useState("summary");
  const navOrder = ["summary", "overview", "audience", "concept", "must", "success"];
  const sec = REQ_SECTIONS[active];

  return (
    <div className="frame-desktop">
      <AppBar active="" right={
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm">PDF 다운로드</button>
          <button className="btn btn-ghost btn-sm">공유 링크 복사</button>
        </div>
      } />
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 280px", height: "calc(100% - 60px)" }}>
        <aside style={{ borderRight: "1px solid var(--line)", padding: "24px 20px", background: "var(--bg-soft)", overflowY: "auto" }}>
          <Eyebrow>REQUIREMENTS DOC</Eyebrow>
          <div className="t-h3" style={{ marginTop: 6 }}>스킨케어 신제품 팝업</div>
          <div className="t-small" style={{ marginTop: 4 }}>v1 · AI 초안</div>

          <div className="col" style={{ marginTop: 20, gap: 2 }}>
            {navOrder.map(key => {
              const s = REQ_SECTIONS[key];
              const isActive = key === active;
              const isSummary = key === "summary";
              return (
                <div key={key} onClick={() => setActive(key)} style={{
                  padding: "10px 12px", borderRadius: "var(--r-sm)",
                  background: isActive ? "var(--ink-1)" : "transparent",
                  color: isActive ? "#fff" : "var(--ink-2)",
                  display: "flex", gap: 10, alignItems: "center", cursor: "pointer",
                  marginTop: isSummary ? 0 : (key === "overview" ? 8 : 0),
                  borderTop: key === "overview" ? "1px solid var(--line)" : "none",
                  paddingTop: key === "overview" ? 14 : 10,
                }}>
                  <span className="t-mono" style={{ fontSize: 11, opacity: 0.7 }}>{s.code}</span>
                  <span style={{ fontSize: 13, fontWeight: isActive ? 600 : 500 }}>{s.label}</span>
                  {isSummary && (
                    <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700,
                      padding: "2px 6px", borderRadius: 999,
                      background: isActive ? "rgba(255,255,255,0.15)" : "var(--ink-1)",
                      color: "#fff", letterSpacing: "0.04em",
                    }}>전체</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="divider" />
          <div className="t-small" style={{ lineHeight: 1.7 }}>
            각 섹션을 클릭하시면<br />상세 내용을 보실 수 있어요.
          </div>
        </aside>

        <div style={{ padding: "32px 40px", overflowY: "auto" }} key={active}>
          <div className="row gap-2 fade-up" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>
              {sec.code === "00" ? "한 장 요약 · 이거 맞으신가요?" : sec.eyebrow}
            </span>
          </div>
          <h1 className="t-h1 fade-up" style={{ marginTop: 6 }}>{sec.title}</h1>

          {/* Summary view */}
          {active === "summary" && (
            <div className="fade-up">
              <p className="t-body" style={{ marginTop: 8, color: "var(--ink-3)", maxWidth: 540 }}>
                입력해 주신 답변을 모나가 정리해 봤어요. 좌측 메뉴에서 각 항목을 자세히 보실 수 있어요.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 22 }}>
                {[
                  ["행사", "팝업 · 2주"],
                  ["타겟", "20-30대 여성"],
                  ["목표", "인지 + 회자"],
                  ["예산·공간", "500만 / 5×4m"],
                ].map(([k, v]) => (
                  <div key={k} className="surface" style={{ padding: "12px 14px" }}>
                    <div className="t-eyebrow">{k}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>

              <div className="col gap-3" style={{ marginTop: 24 }}>
                {["overview", "audience", "concept", "must", "success"].map(key => {
                  const s = REQ_SECTIONS[key];
                  return (
                    <div key={key} onClick={() => setActive(key)} className="surface" style={{
                      padding: "16px 18px", cursor: "pointer", transition: "all .15s var(--ease-out)",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--ink-1)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; }}>
                      <div className="row gap-3" style={{ alignItems: "center" }}>
                        <span className="t-mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-4)" }}>{s.code}</span>
                        <div className="grow">
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{s.label}</div>
                          <div className="t-small" style={{ marginTop: 2 }}>
                            {key === "overview" && "팝업스토어 · 2주 · 신제품 5종 인지·회자"}
                            {key === "audience" && "20-30대 여성 · 평균 체류 7분 · 셀피 1.6장"}
                            {key === "concept" && "Warm Minimal · 화이트+우드 · 자연광 LED"}
                            {key === "must" && "발색 비교 보드, 셀피 미러, 결제 카운터 등 5개"}
                            {key === "success" && "방문 200명/일 · 노출 5만 회 · 체류 7분"}
                          </div>
                        </div>
                        <span style={{ fontSize: 14, color: "var(--ink-3)" }}>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="surface" style={{ marginTop: 22, padding: 16, background: "var(--bg-soft)", borderColor: "var(--line)" }}>
                <Eyebrow>이거 맞나요? 빠진 거 있나요?</Eyebrow>
                <div className="row gap-2" style={{ marginTop: 10, flexWrap: "wrap" }}>
                  {["네, 정확해요!", "타겟을 더 구체적으로", "예산 늘려야 할 것 같아요", "공간 정보 수정", "+ 다른 점 추가하기"].map(c => (
                    <span key={c} className="chip">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Detail view */}
          {active !== "summary" && (
            <div className="fade-up" style={{ marginTop: 16 }}>
              {sec.body}
              <div className="row gap-2" style={{ marginTop: 24 }}>
                <button className="btn btn-ghost btn-sm" onClick={() => setActive("summary")}>← 요약으로</button>
                <div className="grow" />
                <button className="btn btn-ghost btn-sm">이 부분 수정할게요</button>
              </div>
            </div>
          )}
        </div>

        <aside style={{ borderLeft: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", display: "flex", flexDirection: "column" }}>
          <Eyebrow>다음 단계</Eyebrow>
          <div className="t-h3" style={{ marginTop: 6 }}>이대로 제안 받아볼게요!</div>
          <p className="t-small" style={{ marginTop: 8 }}>
            전문가가 빠르게 견적과 도면을 작성해 드릴게요. 평균 8시간이면 충분해요.
          </p>

          <div className="surface" style={{ padding: 14, marginTop: 16, background: "#fff" }}>
            <div className="t-eyebrow">예상 소요</div>
            <div className="t-h3" style={{ marginTop: 4, color: "var(--ink-1)" }}>8시간 이내</div>
            <div className="t-small" style={{ marginTop: 4, fontSize: 11, color: "var(--ink-4)" }}>접수 건이 많으면 조금 더 걸릴 수 있어요</div>
            <div className="divider" />
            <div className="t-eyebrow">받게 될 것</div>
            <ul style={{ marginTop: 6, paddingLeft: 0, listStyle: "none", fontSize: 12, color: "var(--ink-2)", lineHeight: 1.9 }}>
              {["맞춤 제안서", "2D / 3D 도면", "모듈별 견적"].map(t => (
                <li key={t} className="row" style={{ alignItems: "center" }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--ink-1)", marginRight: 8 }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grow" />
          <button className="btn btn-accent btn-lg" style={{ width: "100%" }}>제안 받기 →</button>
          <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}>조금 더 수정할게요</button>
        </aside>
      </div>
    </div>
  );
}

window.MYP2_SCREENS = window.MYP2_SCREENS || {};
Object.assign(window.MYP2_SCREENS, { "04": Screen04, "05": Screen05, "06": Screen06 });
