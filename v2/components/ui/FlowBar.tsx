"use client";
import { useRouter } from "next/navigation";
import { Brand } from "./Brand";

export function FlowBar({ step, total, title, onBack }: { step: number; total: number; title: string; onBack?: string | false }) {
  const router = useRouter();
  return (
    <div className="appbar" style={{ height: 56 }}>
      {onBack !== false && (
        <span onClick={() => typeof onBack === "string" ? router.push(onBack) : router.back()}
          style={{ cursor: "pointer", fontSize: 13, color: "var(--ink-3)", marginRight: 8 }}>← 이전</span>
      )}
      <Brand size={13} />
      <div className="grow" />
      <span className="t-eyebrow" style={{ marginRight: 12 }}>{title}</span>
      <div style={{ width: 180 }}>
        <div className="progress"><div className="progress-fill" style={{ width: `${(step / total) * 100}%` }} /></div>
      </div>
      <span className="t-mono" style={{ fontSize: 12, color: "var(--ink-3)", marginLeft: 8 }}>{step}/{total}</span>
    </div>
  );
}
