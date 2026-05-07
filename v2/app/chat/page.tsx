"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FlowBar } from "@/components/ui/FlowBar";

interface Msg { id: string; role: "user" | "assistant"; content: string }
let _n = 0; const uid = () => `m${++_n}`;

function Avatar({ size = 44 }: { size?: number }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: "linear-gradient(135deg,#FF8B5C,#FF6B35)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.3, boxShadow: "0 2px 8px rgba(255,107,53,0.25)" }}>모나</div>
      <span style={{ position: "absolute", bottom: 0, right: 0, width: size * 0.28, height: size * 0.28, borderRadius: "50%", background: "#22c55e", border: "2px solid #fff" }} />
    </div>
  );
}

const STEPS = ["행사 이야기", "판매·전시 제품", "프로젝트 목표", "타겟 고객", "예산", "공간 사이즈"];

export default function ChatPage() {
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([{ id: uid(), role: "assistant", content: "안녕하세요! 저는 공간 마케팅을 도와드리는 AI 상담사 **모나**예요 :)\n\n오늘 함께 이야기 나누게 되어 정말 반가워요. 상담은 약 5분 정도 걸려요. ⏱\n\n그럼 천천히 시작해 볼까요?\n\n**지금 어떤 행사**를 준비하고 계신가요? 편하게 한두 문장으로 말씀해 주세요 :)" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [intro, setIntro] = useState(true);
  const [step, setStep] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function parseMarkdown(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  }

  function checkDone(text: string) {
    const m = text.match(/\[BRIEF_READY\]([\s\S]*?)\[\/BRIEF_READY\]/);
    if (!m) return false;
    try {
      const data = JSON.parse(m[1].trim());
      sessionStorage.setItem("mona-brief", JSON.stringify(data));
      return true;
    } catch { return false; }
  }

  async function send() {
    const t = input.trim(); if (!t || loading || done) return;
    const userMsg: Msg = { id: uid(), role: "user", content: t };
    const history = [...msgs, userMsg];
    setMsgs(history); setInput(""); setLoading(true);
    setStep(s => Math.min(6, s + 1));
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }) });
      if (!res.ok || !res.body) throw new Error();
      const aid = uid();
      setMsgs(p => [...p, { id: aid, role: "assistant", content: "" }]);
      const reader = res.body.getReader(); const dec = new TextDecoder(); let full = "";
      while (true) {
        const { done: d, value } = await reader.read(); if (d) break;
        full += dec.decode(value, { stream: true });
        setMsgs(p => p.map(m => m.id === aid ? { ...m, content: full } : m));
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      if (checkDone(full)) { setDone(true); setTimeout(() => router.push("/brief"), 1000); }
    } catch { setMsgs(p => [...p, { id: uid(), role: "assistant", content: "잠깐 오류가 생겼어요. 다시 시도해 주세요." }]); }
    finally { setLoading(false); inputRef.current?.focus(); }
  }

  function clean(t: string) { return t.replace(/\[BRIEF_READY\][\s\S]*?\[\/BRIEF_READY\]/g, "").trim(); }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
      <FlowBar step={step} total={6} title="AI 상담사 모나와 함께" />
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1, overflow: "hidden" }}>

        {/* 사이드바 */}
        <aside style={{ borderRight: "1px solid var(--line)", padding: "24px 22px", background: "var(--bg-soft)", overflowY: "auto" }}>
          <div className="row gap-3">
            <Avatar size={40} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>모나 <span style={{ fontSize: 10, fontWeight: 500, color: "var(--ink-3)" }}>· AI 상담사</span></div>
              <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>● 지금 함께하고 있어요</div>
            </div>
          </div>
          <div className="divider" />
          <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow">상담 진행 · {step}/6</span></div>
          <div className="col gap-2" style={{ marginTop: 14 }}>
            {STEPS.map((q, i) => {
              const idx = i + 1;
              const state = idx < step ? "done" : idx === step ? "active" : "wait";
              return (
                <div key={q} className="surface" style={{ padding: "10px 12px", background: state === "active" ? "var(--ink-1)" : state === "done" ? "#fff" : "transparent", color: state === "active" ? "#fff" : state === "wait" ? "var(--ink-4)" : "var(--ink-1)", borderColor: state === "wait" ? "var(--line)" : state === "active" ? "var(--ink-1)" : "var(--line)", borderStyle: state === "wait" ? "dashed" : "solid" }}>
                  <div className="row gap-2">
                    <span style={{ width: 16, height: 16, borderRadius: "50%", background: state === "done" ? "var(--ink-1)" : state === "active" ? "#fff" : "transparent", border: state === "wait" ? "1px dashed var(--line-strong)" : "none", color: state === "done" ? "#fff" : "var(--ink-1)", fontSize: 9, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>{state === "done" ? "✓" : ""}</span>
                    <span style={{ fontSize: 12, fontWeight: 600 }}>{q}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="divider" />
          <p className="t-small" style={{ lineHeight: 1.7 }}>천천히 답해 주셔도 괜찮아요.<br />중간에 자리를 비우셔도 모나가 여기서 기다릴게요.</p>
        </aside>

        {/* 채팅 패널 */}
        <div className="col" style={{ overflow: "hidden", background: "#fff" }}>
          <div className="row gap-3" style={{ padding: "14px 24px", borderBottom: "1px solid var(--line)" }}>
            <Avatar size={36} />
            <div className="grow"><div style={{ fontWeight: 700, fontSize: 14 }}>모나</div><div className="t-small" style={{ fontSize: 11 }}>공간 마케팅 AI 상담사 · 평균 응답 2초</div></div>
          </div>

          {/* 메시지 영역 */}
          <div className="col gap-3" style={{ flex: 1, overflowY: "auto", padding: "24px 36px 16px" }}>
            {msgs.map(msg => {
              const c = clean(msg.content);
              if (!c && msg.role === "assistant") return null;
              return (
                <div key={msg.id} style={{ display: "flex", gap: 10, alignItems: "flex-end", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  {msg.role === "assistant" && <Avatar size={28} />}
                  <div className={msg.role === "assistant" ? "bubble-ai" : "bubble-me"} dangerouslySetInnerHTML={{ __html: parseMarkdown(c) }} />
                </div>
              );
            })}
            {loading && msgs[msgs.length - 1]?.role === "user" && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <Avatar size={24} />
                <div className="bubble-ai" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 14px" }}>
                  <span className="typing"><span /><span /><span /></span>
                  <span className="t-small" style={{ fontSize: 11 }}>모나가 답하고 있어요</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* 입력창 */}
          <div style={{ borderTop: "1px solid var(--line)", padding: "14px 36px 20px", background: "#fff" }}>
            <div className="row gap-2" style={{ marginBottom: 10, flexWrap: "wrap" }}>
              <span className="t-small" style={{ width: "100%", marginBottom: 4, fontSize: 11 }}>빠른 답변:</span>
              {["팝업스토어", "전시회", "오프라인 매장", "체험 부스"].map(c => (
                <span key={c} className="chip" onClick={() => setInput(c)}>{c}</span>
              ))}
            </div>
            <div className="row gap-2">
              <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                disabled={loading || done} rows={2} placeholder={done ? "상담이 완료됐어요!" : "모나에게 편하게 말씀해 주세요… (Shift+Enter 줄바꿈)"}
                className="input" style={{ flex: 1, height: "auto", padding: "10px 14px", resize: "none", lineHeight: 1.5 }} />
              <button onClick={send} disabled={!input.trim() || loading || done} className="btn btn-accent">보내기 →</button>
            </div>
          </div>
        </div>
      </div>

      {/* 인트로 모달 */}
      {intro && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, backdropFilter: "blur(2px)", animation: "fadeIn .25s ease" }}>
          <div className="surface fade-up" style={{ width: 480, padding: "36px 36px 28px", background: "#fff", boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-1)" }} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}><Avatar size={72} /></div>
            <div className="t-eyebrow" style={{ marginTop: 18, color: "var(--ink-2)" }}>AI 상담사</div>
            <h2 className="t-h1" style={{ marginTop: 6 }}>안녕하세요, 저는 <span style={{ color: "var(--accent)" }}>모나</span>예요.</h2>
            <p className="t-body" style={{ marginTop: 14, color: "var(--ink-2)", lineHeight: 1.7 }}>공간 마케팅을 도와드리는 AI 상담사예요.<br />지금부터 <b>약 5분 동안</b> 짧은 대화를 나눠 볼게요.<br />편하게 답해 주시면, 맞춤 <b>제안서</b>를 준비해 드릴게요.</p>
            <div className="accent-tint" style={{ marginTop: 20, padding: "14px 16px", borderRadius: "var(--r-sm)", textAlign: "left" }}>
              <div className="row gap-3" style={{ marginBottom: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--ink-1)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>⏱</span>
                <div className="grow"><div style={{ fontSize: 13, fontWeight: 600 }}>예상 소요 시간</div><div className="t-small" style={{ fontSize: 11 }}>여유 있게 5분 정도예요</div></div>
                <div style={{ fontFamily: "var(--font-en)", fontSize: 18, fontWeight: 700 }}>5min</div>
              </div>
              <div className="row gap-3">
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--ink-1)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>💬</span>
                <div className="grow"><div style={{ fontSize: 13, fontWeight: 600 }}>나누게 될 이야기</div><div className="t-small" style={{ fontSize: 11 }}>행사·제품·목표·타겟·예산·공간</div></div>
                <div style={{ fontFamily: "var(--font-en)", fontSize: 18, fontWeight: 700 }}>6</div>
              </div>
            </div>
            <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 22 }} onClick={() => setIntro(false)}>모나와 이야기 시작하기 →</button>
            <div className="t-small" style={{ marginTop: 10, fontSize: 11 }}>대화 내용은 제안서 작성에만 사용해요.</div>
          </div>
        </div>
      )}
    </div>
  );
}
