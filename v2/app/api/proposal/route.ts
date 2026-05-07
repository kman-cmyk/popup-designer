const getKey = () => process.env.ANTHROPIC_API_KEY;

const SYSTEM = `당신은 팝업스토어·오프라인 행사 공간 기획 전문가입니다.
요구사항 정의서를 바탕으로 예산에 맞는 3가지 공간 구성 제안(에센셜/스탠다드/프리미엄)을 JSON으로 작성하세요.
반드시 유효한 JSON만 출력하고, 마크다운 코드블록 없이 순수 JSON만 반환하세요.

사용 가능한 모듈 목록:
- 선반 1단 (600×1800mm, 45만원)
- 선반 2단 (600×1800mm, 70만원)
- 선반 3단 (600×1800mm, 90만원)
- 체험 카운터 (1200×600mm, 120만원)
- 아일랜드 카운터 (1200×900mm, 180만원)
- 결제 카운터 (900×600mm, 95만원)
- 셀피 미러 (600×1800mm, 65만원)
- 백라이트 패널 (600×2400mm, 85만원)
- 포토월 반쪽 (1200×2400mm, 95만원)
- 포토월 전체 (1800×2400mm, 160만원)
- 행거 랙 (900×1800mm, 55만원)
- 가챠 머신 (600×1800mm, 110만원)
- 아크릴 사이니지 (600×200mm, 40만원)

출력 JSON 형식:
{
  "proposals": [
    {
      "id": "A",
      "tier": "에센셜",
      "price": "XXX만원",
      "priceNum": 000,
      "concept": "한 줄 컨셉",
      "desc": "2~3문장 설명",
      "tags": ["모듈명1", "모듈명2"],
      "modules": [
        {"name": "모듈명", "spec": "크기", "price": "XX만원", "note": "배치/용도 설명"}
      ],
      "flow": "입구→...→카운터 동선 설명",
      "highlight": false,
      "strengths": ["장점1", "장점2"]
    }
  ]
}

주의:
- 에센셜: 예산의 60~70% 사용
- 스탠다드: 예산의 85~95% 사용, highlight: true
- 프리미엄: 예산의 110~130% 사용 (업그레이드 제안)
- 각 안의 priceNum은 숫자(만원 단위)로
- 각 안에 최소 4개, 최대 8개 모듈`;

export async function POST(req: Request) {
  const { brief } = await req.json() as { brief: Record<string, unknown> };

  const userContent = `다음 요구사항 정의서를 바탕으로 3가지 공간 구성 제안을 작성해 주세요:\n\n${JSON.stringify(brief, null, 2)}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": getKey() ?? "", "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 3000,
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
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try { return Response.json(JSON.parse(match[0])); } catch { /* fall through */ }
    }
    return Response.json({ error: "parse error", raw: text }, { status: 500 });
  }
}
