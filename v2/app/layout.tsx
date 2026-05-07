import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Make Your Place — 팝업스토어 설계 솔루션",
  description: "AI랑 공간 마케팅 전문가가 팝업스토어 설계부터 제작까지 도와드려요.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
