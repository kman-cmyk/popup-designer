"use client";
import Link from "next/link";
import { Brand } from "./Brand";

export function AppBar({ active = "home", right }: { active?: string; right?: React.ReactNode }) {
  const items = [["home", "홈", "/"], ["explore", "둘러보기", "/explore"], ["how", "이용방법", "/how"], ["pricing", "요금", "/pricing"]];
  return (
    <div className="appbar">
      <Brand />
      <div className="row gap-4" style={{ marginLeft: 16 }}>
        {items.map(([k, label, href]) => (
          <Link key={k} href={href} style={{ fontSize: 13, fontWeight: active === k ? 700 : 500, color: active === k ? "var(--ink-1)" : "var(--ink-3)", textDecoration: "none" }}>
            {label}
          </Link>
        ))}
      </div>
      <div className="grow" />
      {right ?? (
        <div className="row gap-2">
          <button className="btn btn-ghost btn-sm">로그인</button>
          <Link href="/chat"><button className="btn btn-sm">설계 받기</button></Link>
        </div>
      )}
    </div>
  );
}
