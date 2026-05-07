const SYSTEM = `당신은 Make Your Place의 AI 상담사 "모나"입니다.
팝업스토어·전시·오프라인 행사를 기획하는 브랜드 담당자와 자연스럽고 따뜻하게 대화하며 아래 6가지 정보를 수집해 주세요.

수집 항목:
1. 행사 종류 (팝업스토어 / 전시 / 매장 / 부스 등)
2. 판매·전시 제품 또는 서비스
3. 프로젝트 목표 (인지도 / 판매 / 체험 / SNS 확산 등)
4. 타겟 고객 (연령, 성별, 특성)
5. 예산 규모
6. 공간 크기 (가로 × 세로 m, 또는 평수)

대화 규칙:
- 따뜻하고 친근한 톤, 이모지 가끔 사용
- 한 번에 1~2가지만 자연스럽게 질문
- 고객 답변에 공감하고 자연스럽게 이어가기
- 모든 항목이 파악되면 마무리하고 아래 JSON을 정확히 출력:

[BRIEF_READY]
{"eventType":"...","products":"...","goal":"...","target":"...","budget":"...","spaceSize":"...","summary":"한 줄 요약"}
[/BRIEF_READY]

JSON 앞에 "말씀해 주신 내용을 정리해 드릴게요!" 같은 마무리 멘트 포함.`;

const getKey = () => process.env.ANTHROPIC_API_KEY;

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: { role: string; content: string }[] };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": getKey() ?? "", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: "claude-haiku-4-5", max_tokens: 1024, system: SYSTEM, messages, stream: true }),
  });
  if (!res.ok || !res.body) return new Response("error", { status: 500 });

  const readable = new ReadableStream({
    async start(ctrl) {
      const enc = new TextEncoder();
      const reader = res.body!.getReader();
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n"); buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const evt = JSON.parse(data);
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta")
              ctrl.enqueue(enc.encode(evt.delta.text));
          } catch { /* skip */ }
        }
      }
      ctrl.close();
    },
  });
  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
