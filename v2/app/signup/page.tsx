"use client";
import { useRouter } from "next/navigation";
import { FlowBar } from "@/components/ui/FlowBar";

export default function SignupPage() {
  const router = useRouter();
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <FlowBar step={6} total={6} title="마지막 단계" onBack="/chat" />
      <div style={{ position: "fixed", inset: 0, top: 56, background: "rgba(0,0,0,0.32)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, animation: "fadeIn .25s ease" }}>
        <div className="surface fade-up" style={{ width: 480, padding: "36px 36px 28px", background: "#fff", boxShadow: "var(--shadow-lg)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-1)" }} />
          <div className="row gap-2"><span className="accent-dot" /><span className="t-eyebrow" style={{ color: "var(--ink-2)" }}>잠시만요!</span></div>
          <h2 className="t-h1" style={{ marginTop: 8 }}>제안서가 완성되면<br /><span>이메일로 살짝</span> 알려드릴게요.</h2>
          <p className="t-body" style={{ marginTop: 12, color: "var(--ink-3)" }}>
            AI랑 공간 마케팅 전문가가 정성스럽게 제안을 작성해 드릴게요. 평균 8시간 정도 걸리고요, 다 되면 바로 알림 보내드릴게요!
            <span style={{ display: "block", fontSize: 12, marginTop: 6, color: "var(--ink-4)" }}>※ 접수 건이 많을 때는 조금 더 걸릴 수 있어요.</span>
          </p>
          <div className="col gap-3" style={{ marginTop: 24 }}>
            <div><div className="t-eyebrow" style={{ marginBottom: 6 }}>이메일</div><input className="input" placeholder="your@email.com" /></div>
            <div><div className="t-eyebrow" style={{ marginBottom: 6 }}>비밀번호</div><input className="input" type="password" placeholder="8자 이상으로 만들어 주세요" /></div>
          </div>
          <div className="accent-tint" style={{ marginTop: 16, padding: "12px 14px", borderRadius: "var(--r-sm)" }}>
            <div className="t-small" style={{ lineHeight: 1.7, color: "var(--ink-2)" }}>
              <div>✓ 입력해 주신 이메일은 <b>제안 완료 알림 외에는 절대 사용하지 않아요</b>.</div>
              <div>✓ 마케팅 메일 보내지 않을게요. 언제든 편하게 탈퇴하실 수 있어요.</div>
            </div>
          </div>
          <button className="btn btn-accent btn-lg" style={{ width: "100%", marginTop: 18 }} onClick={() => router.push("/analyzing")}>가입하고 제안 받기 →</button>
          <div className="row gap-2" style={{ marginTop: 14, justifyContent: "center" }}>
            <span className="t-small">이미 계정이 있으세요?</span>
            <span style={{ fontSize: 12, fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>로그인</span>
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
