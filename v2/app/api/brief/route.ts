const getKey = () => process.env.ANTHROPIC_API_KEY;

const SYSTEM = `당신은 공간 마케팅 기획자입니다.
고객과의 상담 대화 및 수집된 정보를 바탕으로 아래 JSON 형식의 요구사항 정의서를 작성해 주세요.
반드시 유효한 JSON만 출력하고, 마크다운 코드블록 없이 순수 JSON만 반환하세요.

{
  "projectName": "브랜드명 + 행사 종류 조합 (예: 라운드랩 신제품 팝업)",
  "overview": {
    "eventType": "행사 종류",
    "duration": "운영 기간",
    "location": "희망 지역 (없으면 '미정')",
    "openDate": "오픈 희망 시기",
    "spaceSize": "공간 크기"
  },
  "audience": {
    "primary": "주 타겟 (연령, 성별, 특성)",
    "insights": ["타겟 인사이트 2~3개 배열"],
    "visitPattern": "예상 방문 패턴"
  },
  "concept": {
    "keyword": "컨셉 키워드 1~3단어",
    "tone": "분위기/톤",
    "colorPalette": "주요 컬러",
    "lighting": "조명 방향"
  },
  "mustHaves": ["필수 요구사항 4~6개 배열"],
  "successMetrics": [
    {"metric": "지표명", "target": "목표치"}
  ],
  "budget": "예산 범위",
  "additionalNotes": "기타 특이사항 또는 주의점"
}`;

export async function POST(req: Request) {
  const { messages, briefData } = await req.json() as {
    messages: { role: string; content: string }[];
    briefData: Record<string, string>;
  };

  const userContent = `다음은 고객과의 상담 대화입니다:\n\n${messages.map(m => `[${m.role === "user" ? "고객" : "모나"}]: ${m.content}`).join("\n\n")}\n\n추출된 핵심 정보:\n${JSON.stringify(briefData, null, 2)}\n\n위 내용을 바탕으로 요구사항 정의서 JSON을 작성해 주세요.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": getKey() ?? "", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 2000,
      system: SYSTEM,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!res.ok) return Response.json({ error: "API error" }, { status: 500 });
  const data = await res.json();
  const text = data.content?.[0]?.text ?? "{}";

  try {
    const parsed = JSON.parse(text);
    return Response.json(parsed);
  } catch {
    // JSON 파싱 실패 시 텍스트에서 JSON 추출 시도
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return Response.json(JSON.parse(match[0])); } catch { /* fall through */ }
    }
    return Response.json({ error: "parse error", raw: text }, { status: 500 });
  }
}
