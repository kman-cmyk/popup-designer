/* global React */
const { useState, useEffect } = React;
const { Brand, AppBar, FlowBar, Eyebrow } = window.MYP2;

// ============================================================
// Screen 07 — 이메일 확인 + 작성중
// ============================================================
function Screen07() {
  const [pct, setPct] = useState(40);
  useEffect(() => {
    const t = setInterval(() => setPct(p => (p < 95 ? p + 0.3 : p)), 600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="frame-desktop">
      <AppBar active="" />
      <div style={{ padding: "60px 80px", textAlign: "center", height: "calc(100% - 60px)", overflow: "auto", position: "relative" }}>
        {/* deco dots */}
        <div style={{ position: "absolute", top: 40, left: 60, display: "flex", flexDirection: "column", gap: 6 }}>
          {[0,1,2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "var(--ink-1)" : "var(--ink-5)" }} />)}
        </div>
        <div className="fade-up" style={{ maxWidth: 720, margin: "0 auto" }}>
          <span className="chip is-accent is-active" style={{ height: 32, padding: "0 14px", fontSize: 12, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", animation: "pulse 1.6s infinite" }} />
            정성껏 작성 중이에요
          </span>
          <h1 className="t-display" style={{ marginTop: 18, fontSize: 48 }}>
            AI랑 전문가가<br />
            <span style={{ color: "var(--ink-1)" }}>제안서를 만들고 있어요.</span>
          </h1>
          <p className="t-body-lg" style={{ marginTop: 18, color: "var(--ink-3)" }}>
            평균 8시간이면 완성돼요. 다 되면 <b style={{ color: "var(--ink-1)" }}>your@email.com</b>으로 알림 보내드릴게요.<br />
            이 페이지는 편하게 닫으셔도 괜찮아요!
            <span style={{ display: "block", fontSize: 13, marginTop: 10, color: "var(--ink-4)" }}>
              ※ 접수 건이 많을 때는 조금 더 걸릴 수 있어요.
            </span>
          </p>

          <div style={{ maxWidth: 520, margin: "32px auto 0" }}>
            <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
              <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>진행도</span>
              <span className="t-mono" style={{ fontSize: 12, fontWeight: 600 }}>
                {Math.floor(pct)}% · 약 {Math.max(1, Math.floor((100 - pct) / 25 * 4))}시간 남았어요
              </span>
            </div>
            <div className="progress" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="surface" style={{ maxWidth: 520, margin: "32px auto 0", padding: 18, textAlign: "left", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: "var(--ink-1)" }} />
            <div className="row gap-3">
              <div style={{
                width: 40, height: 40, borderRadius: "var(--r-sm)",
                background: "var(--bg-soft)", color: "var(--ink-2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
              }}>✉</div>
              <div className="grow">
                <div className="t-small">알림 받을 이메일</div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>your@email.com</div>
              </div>
              <button className="btn btn-ghost btn-sm">변경할게요</button>
            </div>
          </div>

          <div style={{ marginTop: 56 }}>
            <div className="row gap-2" style={{ alignItems: "center", justifyContent: "center" }}>
              <span className="accent-dot" />
              <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>기다리는 동안 둘러보세요</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 14, textAlign: "left" }}>
              {[
                ["50+ 모듈 라이브러리", "어떤 가구가 있는지 보여드릴게요"],
                ["내가 입력한 정보", "다시 보거나 수정하실 수 있어요"],
              ].map(([t, d], i) => (
                <div key={t} className="surface" style={{ padding: 18, cursor: "pointer", transition: "all .15s var(--ease-out)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--line)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = ""; }}>
                  <span className="numbered-circle" style={{ width: 28, height: 28, fontSize: 12 }}>{i+1}</span>
                  <div className="t-h3" style={{ marginTop: 12 }}>{t}</div>
                  <div className="t-small" style={{ marginTop: 6 }}>{d}</div>
                  <div style={{ marginTop: 10, fontSize: 12, fontWeight: 600, color: "var(--ink-1)" }}>둘러보기 →</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 08 — 제안 도착
// ============================================================
function Screen08() {
  return (
    <div className="frame-desktop">
      <AppBar active="" />
      <div style={{ padding: "56px 80px", height: "calc(100% - 60px)", overflow: "auto" }}>
        <div className="fade-up">
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>드디어 완성됐어요!</span>
          </div>
          <h1 className="t-display" style={{ marginTop: 12 }}>
            ○○님, 제안서가<br />
            <span style={{ color: "var(--ink-1)" }}>도착했어요!</span> 🎉
          </h1>
          <p className="t-body-lg" style={{ marginTop: 16, color: "var(--ink-3)", maxWidth: 560 }}>
            AI랑 공간 마케팅 전문가가 함께 정성껏 작성한 맞춤 제안서예요. 천천히 살펴봐 주세요.
            마음에 드시면 그대로 설계도면으로 이어서 편집하실 수 있어요!
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 32 }}>
            {[
              ["분석", "5섹션", "체류·동선·회자", "tint"],
              ["기획 포인트", "3개", "미러월 · 발색보드 · 라운지", "white"],
              ["설계도", "2D + 3D", "그대로 편집 가능", "white"],
              ["견적", "₩4,920,000", "예산 -2%", "accent"],
            ].map(([t, v, d, kind], i) => (
              <div key={t} className="surface" style={{
                padding: 20,
                background: kind === "accent" ? "var(--ink-1)" : kind === "tint" ? "var(--bg-soft)" : "#fff",
                color: kind === "accent" ? "#fff" : "var(--ink-1)",
                borderColor: kind === "accent" ? "var(--ink-1)" : kind === "tint" ? "var(--line)" : "var(--line)",
                animation: `fadeUp .5s var(--ease-out) both`, animationDelay: `${0.1 + i*0.08}s`,
              }}>
                <div className="t-eyebrow" style={{ color: kind === "accent" ? "rgba(255,255,255,0.85)" : kind === "tint" ? "var(--ink-2)" : "var(--ink-3)" }}>{t}</div>
                <div className="t-h2" style={{ marginTop: 6, fontFamily: kind === "accent" ? "var(--font-en)" : "inherit" }}>{v}</div>
                <div className="t-small" style={{ marginTop: 6, color: kind === "accent" ? "rgba(255,255,255,0.85)" : undefined }}>{d}</div>
              </div>
            ))}
          </div>

          <div className="surface" style={{ marginTop: 24, overflow: "hidden", display: "grid", gridTemplateColumns: "1.4fr 1fr" }}>
            <div className="imgph" style={{ height: 280, borderRadius: 0, border: "none", borderRight: "1px solid var(--line)" }}>
              [ 제안 페이지 미리보기 / 무드보드 ]
            </div>
            <div style={{ padding: 24 }}>
              <Eyebrow>한 줄 컨셉</Eyebrow>
              <div className="t-h2" style={{ marginTop: 8, lineHeight: 1.3 }}>
                ‘<span style={{ color: "var(--ink-1)" }}>발라보고 가는</span>’<br />미니멀 스킨케어 살롱.
              </div>
              <p className="t-small" style={{ marginTop: 12 }}>
                담당: 김메이크 · 010-XXXX-XXXX
              </p>
              <div className="row gap-2" style={{ marginTop: 18 }}>
                <button className="btn btn-accent">제안서 열어보기 →</button>
                <button className="btn btn-ghost">PDF로 받기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 09 — 한 장 제안서
// ============================================================
function Screen09() {
  return (
    <div className="frame-desktop">
      <AppBar active="" right={
        <div className="row gap-2">
          <span className="t-small">제안서 v1 · 2025.05.07</span>
          <button className="btn btn-ghost btn-sm">PDF</button>
          <button className="btn btn-ghost btn-sm">공유</button>
        </div>
      } />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% - 60px)" }}>
        <div style={{ padding: "32px 40px", overflowY: "auto", borderRight: "1px solid var(--line)" }}>
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>설계 제안서</span>
          </div>
          <h1 className="t-h1" style={{ marginTop: 6 }}>
            ○○ 스킨케어 신제품 팝업
          </h1>
          <div className="row gap-3" style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 13 }}>
            <span>2주 운영</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-4)" }} />
            <span>5m × 4m</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-4)" }} />
            <span style={{ color: "var(--ink-1)", fontWeight: 600 }}>500만원</span>
          </div>

          <div style={{ marginTop: 28 }}>
            <Eyebrow>01. 제품 분석</Eyebrow>
            <p className="t-body" style={{ marginTop: 6 }}>
              5종의 신제품 중 <b style={{ color: "var(--ink-1)" }}>주력 2종</b>은 발색 차이가 핵심이에요. 비교가 가능한 디스플레이가
              회자 트리거가 될 거예요.
            </p>
          </div>
          <div style={{ marginTop: 22 }}>
            <Eyebrow>02. 요구사항</Eyebrow>
            <ul style={{ marginTop: 6, paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.8 }}>
              {["20-30대 여성 7분 체류 → U자 동선", "셀피 미러 1면 (회자용)", "발색 테스트 카운터 1개", "예산 안에서 모듈 8개 조합"].map(t => (
                <li key={t} className="row" style={{ alignItems: "flex-start", marginBottom: 2 }}>
                  <span className="tick-list-item" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ marginTop: 22 }}>
            <Eyebrow>03. 기획 포인트</Eyebrow>
            <div className="col gap-2" style={{ marginTop: 8 }}>
              {[
                ["미러월", "입구 정면, 셀피 동선이 자연스럽게 만들어져요"],
                ["발색 보드", "신제품 5종을 한눈에 비교할 수 있어요"],
                ["라운지", "바스켓 챙긴 후 천천히 결제하실 수 있는 공간이에요"],
              ].map(([t, d], i) => (
                <div key={t} className="surface" style={{ padding: "12px 14px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 3, background: "var(--ink-1)" }} />
                  <div style={{ fontWeight: 600, fontSize: 14, paddingLeft: 6 }}>{i+1}. {t}</div>
                  <div className="t-small" style={{ marginTop: 4, paddingLeft: 6 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface" style={{ marginTop: 24, padding: 18, background: "var(--ink-1)", color: "#fff", borderColor: "var(--ink-1)" }}>
            <div className="t-eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>예상 견적</div>
            <div className="row" style={{ alignItems: "baseline", gap: 10, marginTop: 6 }}>
              <span style={{ fontFamily: "var(--font-en)", fontSize: 32, fontWeight: 800 }}>₩4,920,000</span>
              <span style={{ fontSize: 12, opacity: 0.85 }}>모듈 + 설치 + 철거 모두 포함이에요</span>
            </div>
          </div>

          <div className="row gap-2" style={{ marginTop: 28 }}>
            <button className="btn btn-ghost">전문가에게 질문해 볼게요</button>
            <button className="btn btn-accent grow">2D/3D 설계도면 보러가기 →</button>
          </div>
        </div>

        <div style={{ padding: "32px 40px", overflowY: "auto", background: "var(--bg-soft)" }}>
          <Eyebrow>예상 무드 + 도면</Eyebrow>
          <div className="imgph" style={{ height: 220, marginTop: 8, fontSize: 12 }}>
            [ AI 렌더링 / 무드 이미지 ]
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
            <div className="imgph" style={{ height: 80, fontSize: 10 }}>화이트+우드</div>
            <div className="imgph" style={{ height: 80, fontSize: 10 }}>자연광 LED</div>
            <div className="imgph" style={{ height: 80, fontSize: 10 }}>미러월</div>
          </div>

          <div style={{ marginTop: 24 }}>
            <Eyebrow>도면 미리보기 (2D)</Eyebrow>
            <div className="surface" style={{
              height: 220, marginTop: 8, position: "relative",
              backgroundImage: "linear-gradient(var(--bg-muted) 1px, transparent 1px), linear-gradient(90deg, var(--bg-muted) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}>
              {[
                ["슬림랙", "10%", "18%", "16%", "26%", "soft"],
                ["발색 보드", "30%", "18%", "26%", "26%", "accent"],
                ["미러월", "60%", "18%", "16%", "26%", "soft"],
                ["라운지", "10%", "55%", "44%", "26%", "dashed"],
                ["테이블", "60%", "55%", "16%", "26%", "soft"],
              ].map(([n, l, t, w, h, kind]) => (
                <div key={n} style={{
                  position: "absolute", left: l, top: t, width: w, height: h,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600,
                  border: kind === "dashed" ? "1.5px dashed var(--ink-1)" : "1.5px solid " + (kind === "accent" ? "var(--ink-1)" : "var(--ink-1)"),
                  background: kind === "accent" ? "var(--ink-1)" : "#fff",
                  color: kind === "accent" ? "#fff" : "var(--ink-1)",
                  borderRadius: "var(--r-xs)",
                }}>{n}</div>
              ))}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <path d="M 30 180 Q 150 150 220 130 T 380 90 T 540 130" stroke="var(--ink-1)" strokeWidth="1.8" strokeDasharray="5 4" fill="none" />
              </svg>
            </div>
            <div className="t-small" style={{ marginTop: 6 }}>5m × 4m · 1:50 · <span style={{ color: "var(--ink-1)", fontWeight: 600 }}>주황 점선</span> = 동선이에요</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Screen 10 — 설계 + 견적
// ============================================================
function Screen10() {
  return (
    <div className="frame-desktop">
      <div style={{ height: 52, padding: "0 20px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 14, background: "#fff" }}>
        <span style={{ fontSize: 13, color: "var(--ink-3)", cursor: "pointer" }}>← 제안서로 돌아가기</span>
        <div style={{ width: 1, height: 20, background: "var(--line)" }} />
        <div>
          <div className="t-eyebrow" style={{ color: "var(--ink-2)" }}>EDITING</div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>○○ 스킨케어 신제품 팝업</div>
        </div>
        <div className="grow" />
        <div className="row" style={{ border: "1px solid var(--line-strong)", borderRadius: "var(--r-pill)", overflow: "hidden", height: 32 }}>
          {["2D", "3D"].map(t => (
            <span key={t} style={{
              padding: "0 16px",
              fontSize: 12, fontWeight: 700,
              display: "inline-flex", alignItems: "center",
              background: t === "3D" ? "var(--ink-1)" : "transparent",
              color: t === "3D" ? "#fff" : "var(--ink-3)",
              cursor: "pointer",
            }}>{t}</span>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm">AI가 재배치해 줄게요</button>
        <button className="btn btn-ghost btn-sm">저장</button>
        <button className="btn btn-accent btn-sm">바로 결제하기 →</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr 280px", height: "calc(100% - 52px)" }}>
        <aside style={{ borderRight: "1px solid var(--line)", padding: 16, overflowY: "auto", background: "var(--bg-soft)" }}>
          <Eyebrow>모듈 라이브러리</Eyebrow>
          <div className="row gap-2" style={{ marginTop: 8, flexWrap: "wrap" }}>
            {["전체", "프레임", "유닛", "기타"].map((t, i) => (
              <span key={t} className={`chip ${i === 0 ? "is-active" : ""}`} style={{ height: 24, fontSize: 11, padding: "0 10px" }}>{t}</span>
            ))}
          </div>

          {/* 프레임 */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--ink-3)", letterSpacing: "0.06em" }}>FRAME</span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 10, color: "var(--ink-4)" }}>4</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
            {[
              ["슬림프레임", "600×1800"],
              ["와이드프레임", "900×1800"],
              ["테이블", "디자인출력"],
              ["카운터", "디자인출력"],
            ].map(([n, sub]) => (
              <div key={n} className="surface" style={{ background: "#fff", padding: 6, cursor: "grab", display: "flex", flexDirection: "column", gap: 2 }}>
                <div className="imgph" style={{ height: 44, fontSize: 9, background: "var(--bg-muted)" }}>▢</div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{n}</div>
                <div style={{ fontSize: 9, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* 유닛 */}
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--ink-3)", letterSpacing: "0.06em" }}>UNIT · 600×xxx</span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 10, color: "var(--ink-4)" }}>9</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
            {[
              ["기본 선반", "600×600"],
              ["가챠머신", "600×1200"],
              ["경사 선반", "600×600"],
              ["거울", "600×1200"],
              ["태블릿", "600×1200"],
              ["백라이트 패널", "600/1200/1800"],
              ["타공판", "600×600"],
              ["수납박스", "600×600"],
              ["상단 사이니지", "600×200"],
            ].map(([n, sub]) => (
              <div key={n} className="surface" style={{ background: "#fff", padding: 6, cursor: "grab", display: "flex", flexDirection: "column", gap: 2 }}>
                <div className="imgph" style={{ height: 44, fontSize: 9, background: "var(--bg-muted)" }}>▢</div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{n}</div>
                <div style={{ fontSize: 9, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* 기타 */}
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10, fontFamily: "var(--font-en)", fontWeight: 700, color: "var(--ink-3)", letterSpacing: "0.06em" }}>ETC</span>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <span style={{ fontSize: 10, color: "var(--ink-4)" }}>4</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8, marginBottom: 16 }}>
            {[
              ["네컷사진기", "디자인출력"],
              ["행거", ""],
              ["배너", "디자인출력"],
              ["백월/포토월", "디자인출력"],
            ].map(([n, sub]) => (
              <div key={n} className="surface" style={{ background: "#fff", padding: 6, cursor: "grab", display: "flex", flexDirection: "column", gap: 2 }}>
                <div className="imgph" style={{ height: 44, fontSize: 9, background: "var(--bg-muted)" }}>▢</div>
                <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{n}</div>
                <div style={{ fontSize: 9, color: "var(--ink-4)", fontFamily: "var(--font-mono)" }}>{sub || "\u00A0"}</div>
              </div>
            ))}
          </div>
        </aside>

        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, #fafafa 0%, #efefef 100%)",
          overflow: "hidden",
        }}>
          <svg viewBox="0 0 800 500" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <polygon points="120,320 400,200 680,320 400,440" fill="#fff" stroke="#0a0a0a" strokeWidth="1.2" />
            <g stroke="#cfcfcf" strokeWidth="0.6" opacity="0.7">
              <line x1="190" y1="290" x2="470" y2="170" />
              <line x1="260" y1="260" x2="540" y2="140" />
              <line x1="330" y1="230" x2="610" y2="110" />
              <line x1="330" y1="350" x2="610" y2="230" />
              <line x1="260" y1="380" x2="540" y2="260" />
            </g>
            <g>
              <polygon points="200,275 290,235 290,285 200,325" fill="#f4f4f4" stroke="#0a0a0a" strokeWidth="1.2" />
              <polygon points="200,275 200,325 200,235" fill="none" stroke="#0a0a0a" strokeWidth="1.2" />
            </g>
            {/* color board (selected) */}
            <g>
              <polygon points="320,235 470,170 470,220 320,285" fill="#FF6B35" stroke="#C44A1B" strokeWidth="1.4" />
              <polygon points="470,170 470,220 510,200 510,150" fill="#ff5a1f" stroke="#C44A1B" strokeWidth="1.4" />
              <polygon points="320,235 510,150 510,160 320,245" fill="#ff7a4a" stroke="#C44A1B" strokeWidth="0.8" />
            </g>
            <g>
              <polygon points="510,210 620,265 620,335 510,280" fill="#fafafa" stroke="#0a0a0a" strokeWidth="1.2" />
            </g>
            <g>
              <polygon points="280,355 460,280 460,310 280,385" fill="#fff" stroke="#0a0a0a" strokeWidth="1.2" strokeDasharray="4 3" />
            </g>
          </svg>

          <div className="surface" style={{ position: "absolute", top: 14, left: 14, padding: "6px 12px", display: "flex", gap: 14, fontSize: 12 }}>
            <span className="t-mono" style={{ color: "var(--ink-1)", fontWeight: 600 }}>5m × 4m</span>
            <span style={{ color: "var(--ink-3)" }}>스케일 1:50</span>
            <span style={{ color: "var(--ink-3)" }}>모듈 8개</span>
          </div>

          <div style={{ position: "absolute", top: 14, right: 14, display: "flex", flexDirection: "column", borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid var(--line-strong)", background: "#fff" }}>
            {["+", "−", "↻"].map((t, i) => (
              <span key={i} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", borderTop: i ? "1px solid var(--line)" : "none" }}>{t}</span>
            ))}
          </div>

          <div className="surface fade-up" style={{
            position: "absolute", bottom: 18, right: 18, width: 248, padding: 16,
            boxShadow: "var(--shadow-lg)", borderTop: "3px solid var(--ink-1)",
          }}>
            <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
              <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>실시간 견적</span>
              <span className="t-small" style={{ fontSize: 11, color: "var(--ink-1)", fontWeight: 600 }}>예산 -2%</span>
            </div>
            <div style={{ fontFamily: "var(--font-en)", fontSize: 28, fontWeight: 800, marginTop: 4, color: "var(--ink-1)" }}>₩4,920,000</div>
            <div className="col gap-2" style={{ marginTop: 12, fontSize: 12 }}>
              {[["모듈 ×8", "₩3,200,000"], ["설치", "₩900,000"], ["철거", "₩820,000"]].map(([k, v]) => (
                <div key={k} className="row" style={{ justifyContent: "space-between" }}>
                  <span style={{ color: "var(--ink-3)" }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{v}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-accent" style={{ width: "100%", marginTop: 14 }}>바로 결제하기 →</button>
            <div className="t-small" style={{ marginTop: 8, textAlign: "center", fontSize: 11 }}>
              또는 <span style={{ textDecoration: "underline", cursor: "pointer", fontWeight: 600, color: "var(--ink-1)" }}>담당자에게 연결해 드릴게요</span>
            </div>
          </div>
        </div>

        <aside style={{ borderLeft: "1px solid var(--line)", padding: 18, overflowY: "auto", background: "var(--bg-soft)" }}>
          <div className="row gap-2" style={{ alignItems: "center" }}>
            <span className="accent-dot" />
            <span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>선택된 모듈</span>
          </div>
          <div className="t-h3" style={{ marginTop: 6 }}>발색 보드</div>
          <div className="t-small" style={{ marginTop: 4 }}>120 × 60 × 180cm · 화이트 + 우드</div>

          <div className="imgph" style={{ height: 120, marginTop: 14, fontSize: 11, background: "var(--bg-soft)", borderColor: "var(--line)" }}>모듈 미리보기</div>

          <div className="surface" style={{ marginTop: 14, padding: 14, background: "#fff" }}>
            <Eyebrow>위치 · 회전</Eyebrow>
            <div className="col gap-2" style={{ marginTop: 8 }}>
              {[["X", "1.2 m"], ["Y", "0.8 m"], ["회전", "0°"]].map(([k, v]) => (
                <div key={k} className="row" style={{ justifyContent: "space-between" }}>
                  <span className="t-small">{k}</span>
                  <span className="t-mono" style={{ fontSize: 12 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="row gap-2" style={{ marginTop: 14 }}>
            <button className="btn btn-ghost btn-sm grow">↻ 회전</button>
            <button className="btn btn-ghost btn-sm grow">제거</button>
          </div>

          <div className="divider" />
          <Eyebrow>레이어</Eyebrow>
          <div className="col gap-2" style={{ marginTop: 8 }}>
            {[
              ["발색 보드", true],
              ["슬림랙", false],
              ["미러월", false],
              ["라운지", false],
              ["테이블", false],
            ].map(([n, sel]) => (
              <div key={n} className="row gap-2" style={{
                padding: "6px 10px", borderRadius: "var(--r-sm)",
                background: sel ? "var(--ink-1)" : "transparent",
                color: sel ? "#fff" : "var(--ink-2)",
                fontSize: 12, cursor: "pointer",
              }}>
                <span style={{ width: 14, height: 14, border: "1px solid currentColor", borderRadius: 2, opacity: 0.7 }} />
                <span>{n}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

// ============================================================
// Screen 11 — 결제 완료 / 주문 확정
// ============================================================
function Screen11() {
  const order = {
    no: "MYP-26-0507-1294",
    title: "감각 코스메틱 브랜드 팝업스토어",
    venue: "성수 스타필드 · 1F 중앙 광장",
    period: "2026.06.10 (수) — 2026.06.16 (화) · 7일",
    area: "8m × 6m · 48㎡",
    items: [
      { name: "와이드 프레임 900×1800", qty: 4, price: 1800000 },
      { name: "디스플레이 테이블 1200×600", qty: 2, price: 1200000 },
      { name: "가챠머신 600×1800", qty: 1, price: 850000 },
      { name: "거울 600×1800", qty: 2, price: 720000 },
      { name: "백라이트 패널 600×2400", qty: 3, price: 2100000 },
      { name: "카운터 1200×900", qty: 1, price: 950000 },
      { name: "디자인 출력 + 시공 + 운반", qty: 1, price: 4380000 },
    ],
    total: 12000000,
  };
  const fmt = (n) => n.toLocaleString("ko-KR");

  return (
    <div className="frame-desktop">
      <AppBar active="" />

      {/* hero confetti dots */}
      <div style={{ position: "relative", padding: "48px 80px 24px", textAlign: "center", overflow: "hidden" }}>
        {/* tiny floating decoration dots */}
        {[
          { x: "8%", y: "20%", c: "var(--accent)", s: 8 },
          { x: "14%", y: "60%", c: "var(--brand)", s: 6 },
          { x: "88%", y: "18%", c: "var(--brand)", s: 10 },
          { x: "92%", y: "62%", c: "var(--accent)", s: 6 },
          { x: "20%", y: "85%", c: "var(--brand-soft)", s: 14 },
          { x: "82%", y: "82%", c: "var(--accent)", s: 8 },
        ].map((d, i) => (
          <span key={i} style={{
            position: "absolute", left: d.x, top: d.y,
            width: d.s, height: d.s, borderRadius: "50%",
            background: d.c, opacity: 0.7,
            animation: `float ${2 + (i % 3)}s ease-in-out ${i * 0.2}s infinite alternate`,
          }} />
        ))}

        <div className="fade-up" style={{ maxWidth: 720, margin: "0 auto", position: "relative" }}>
          {/* big check mark */}
          <div style={{
            width: 88, height: 88, margin: "0 auto", borderRadius: "50%",
            background: "var(--accent)", color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 44, fontWeight: 800, boxShadow: "0 12px 32px rgba(255,107,53,0.35)",
          }}>✓</div>

          <span className="chip" style={{ marginTop: 22, height: 30, padding: "0 14px", fontSize: 12, fontWeight: 600,
            background: "var(--brand-soft)", color: "var(--brand-ink)", borderColor: "var(--brand-soft)" }}>
            결제가 완료됐어요
          </span>

          <h1 className="t-display" style={{ marginTop: 14, fontSize: 44 }}>
            함께해 주셔서 정말 감사해요!<br />
            <span style={{ color: "var(--ink-1)" }}>지금부터 정성껏 준비할게요.</span>
          </h1>
          <p className="t-body-lg" style={{ marginTop: 16, color: "var(--ink-3)" }}>
            결제 영수증과 일정 안내 메일을 잠시 후 보내드릴게요.<br />
            제작·시공 진행 상황은 알림과 마이페이지에서 실시간으로 확인하실 수 있어요.
          </p>
        </div>
      </div>

      {/* receipt + next steps */}
      <div style={{ padding: "0 80px 48px", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
        {/* RECEIPT */}
        <div className="surface" style={{ padding: 24, position: "relative" }}>
          <div className="row" style={{ alignItems: "baseline" }}>
            <div className="t-eyebrow">ORDER · 영수증</div>
            <div className="grow" />
            <div className="t-mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{order.no}</div>
          </div>
          <h3 className="t-h2" style={{ marginTop: 6 }}>{order.title}</h3>
          <div className="row gap-3" style={{ marginTop: 8, color: "var(--ink-3)", fontSize: 13, flexWrap: "wrap" }}>
            <span>📍 {order.venue}</span>
            <span>· {order.period}</span>
            <span>· {order.area}</span>
          </div>

          <div className="divider" />

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {order.items.map((it, i) => (
              <div key={i} className="row" style={{ alignItems: "baseline" }}>
                <span style={{ fontWeight: 500 }}>{it.name}</span>
                <span className="t-small" style={{ marginLeft: 8 }}>× {it.qty}</span>
                <span className="grow" />
                <span className="t-mono" style={{ fontWeight: 600 }}>{fmt(it.price)}원</span>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="row" style={{ alignItems: "baseline" }}>
            <span className="t-h3">총 결제 금액</span>
            <span className="grow" />
            <span style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)" }}>{fmt(order.total)}원</span>
          </div>
          <div className="t-small" style={{ marginTop: 6, textAlign: "right", color: "var(--ink-4)" }}>
            카드 결제 · 일시불 · 부가세 포함
          </div>
        </div>

        {/* NEXT STEPS */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="surface" style={{ padding: 22, background: "var(--brand-tint)", borderColor: "var(--brand-soft)" }}>
            <div className="t-eyebrow" style={{ color: "var(--brand-ink)" }}>NEXT STEPS</div>
            <h3 className="t-h3" style={{ marginTop: 6 }}>이렇게 진행될 거예요</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
              {[
                { d: "오늘", t: "디자인 시안 확정 미팅 (담당 PM 배정)" },
                { d: "D+3일", t: "출력물 시안 컨펌 · 제작 착수" },
                { d: "D+10일", t: "프레임 · 모듈 제작 완료" },
                { d: "D-1일", t: "현장 입고 + 시공" },
                { d: "오픈일", t: "최종 점검 + 운영 시작 🎉" },
              ].map((s, i) => (
                <div key={i} className="row" style={{ alignItems: "flex-start", gap: 10 }}>
                  <span style={{
                    width: 56, flexShrink: 0, padding: "3px 0", textAlign: "center",
                    background: "#fff", border: "1px solid var(--brand-soft)",
                    borderRadius: 4, fontSize: 11, fontWeight: 700, color: "var(--brand-ink)",
                  }}>{s.d}</span>
                  <span style={{ fontSize: 13, lineHeight: 1.55 }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="surface" style={{ padding: 18 }}>
            <div className="t-eyebrow">담당 PM</div>
            <div className="row gap-3" style={{ marginTop: 10, alignItems: "center" }}>
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), #FF8F65)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 18,
              }}>모</div>
              <div>
                <div style={{ fontWeight: 700 }}>모나 · AI 상담사</div>
                <div className="t-small">평일 10시–19시 · 카톡 알림 발송</div>
              </div>
            </div>
            <div className="row gap-2" style={{ marginTop: 14 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>카톡 채널 열기</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>전화 연결</button>
            </div>
          </div>
        </aside>
      </div>

      {/* bottom CTA bar */}
      <div style={{
        borderTop: "1px solid var(--line)", padding: "16px 80px",
        display: "flex", alignItems: "center", gap: 12, background: "#fff",
      }}>
        <div className="t-small">영수증과 안내 메일은 <b style={{ color: "var(--ink-1)" }}>주문자 이메일</b>로 발송됐어요.</div>
        <div className="grow" />
        <button className="btn btn-ghost">영수증 다운로드</button>
        <button className="btn btn-ghost">진행 현황 보기</button>
        <button className="btn btn-accent">홈으로 돌아가기 →</button>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

window.MYP2_SCREENS = window.MYP2_SCREENS || {};
Object.assign(window.MYP2_SCREENS, { "07": Screen07, "08": Screen08, "09": Screen09, "10": Screen10, "11": Screen11 });
