# Handoff: Make Your Place — 팝업스토어 AI 설계 솔루션 v2

## Overview

Make Your Place는 브랜드/마케팅 담당자가 팝업스토어를 기획·설계·제작하는 전 과정을 한 곳에서 처리할 수 있는 SaaS 솔루션입니다. 이 핸드오프는 **v2 리디자인**의 10개 화면 시안과 그것을 실제 서비스로 구현하기 위한 가이드를 담고 있습니다.

**핵심 플로우:**
1. **랜딩** → 사용자가 서비스를 인지
2. **AI 상담사 "모나"와 5분 대화** → 행사·제품·목표·타겟·예산·공간 정보 수집
3. **회원가입** → 결과물 받기 위해 가입
4. **AI 분석** → 평균 8시간 (실제로는 LLM + 사람 검수 결합)
5. **요구사항 정의서** → 기록·확정용 리포트
6. **이메일 대기 → 제안 도착 알림**
7. **한 장 제안서** → 전체 구상 한눈에
8. **3D 에디터에서 모듈 배치 + 견적**
9. **결제 완료 + 다음 단계 안내**

## About the Design Files

`design/` 폴더의 파일은 **디자인 레퍼런스** 입니다 — 의도된 외관·동작을 보여주는 React + CDN-Babel 기반의 프로토타입이며, 그대로 프로덕션에 올릴 코드가 아닙니다.

**개발 작업의 본질**: 이 HTML 디자인을 **타깃 코드베이스(Next.js + TypeScript 권장)** 에서 그 환경의 기존 패턴·라이브러리를 사용해 **재구현** 하는 것입니다. 픽셀·인터랙션은 충실히 재현하되, 코드 구조는 프로덕션에 맞게 새로 짜야 합니다.

기존 정적 HTML 레포(`kman-cmyk/popup-designer`)는 v1으로, **v2는 완전히 새로 작업**합니다. 기존 레포는 보존하고 새 폴더(또는 새 레포)에 작업 권장.

## Fidelity

**High-fidelity (hifi)** — 색상·타이포·간격·인터랙션이 모두 확정된 픽셀 퍼펙트 시안입니다. 개발자는 코드베이스의 기존 라이브러리·디자인 시스템을 사용해 픽셀 정확도로 재현해야 합니다.

## Tech Stack 권장

- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS + CSS variables (디자인 토큰은 `design/styles.css` 의 CSS 변수 그대로 가져오기)
- **State**: 화면별 상태는 useState/useReducer, 전역(사용자·프로젝트)은 Zustand 또는 Context
- **DB**: PostgreSQL (Supabase 또는 PlanetScale)
- **Auth**: NextAuth.js 또는 Supabase Auth
- **AI**: Anthropic Claude API (Sonnet 4.5 권장)
- **결제**: 토스페이먼츠 또는 포트원 (한국 PG)
- **배포**: Vercel
- **Storage**: 이미지/파일은 S3 또는 Supabase Storage

## Screens / Views

각 화면의 React 소스: `design/screens-1-3.jsx`, `screens-4-6.jsx`, `screens-7-10.jsx`. 공통 컴포넌트(AppBar, FlowBar, Brand): `design/primitives.jsx`. 디자인 토큰·유틸 클래스: `design/styles.css`. 메인 진입: `design/index.html`을 브라우저에서 열면 좌측 메뉴로 모든 화면을 볼 수 있습니다.

### Screen 01 — 랜딩페이지
- **Purpose**: 첫 방문자에게 서비스 소개, "설계 받아보기" CTA로 상담 진입
- **Layout**: AppBar(60px) → Hero(중앙정렬, padding 72/80px) → 2D 도면 애니메이션(IsometricPopupAnimation, 380px 높이) → 보유 모듈 카탈로그(4×2 grid)
- **Key components**: `IsometricPopupAnimation` (SVG 평면도 + 모듈 순차 배치 + 동선 애니메이션), 모듈 카드 8개 (선반/백라이트/거울/가챠/테이블/카운터/행거/포토월)
- **Copy**: "팝업스토어, 설계부터 제작까지 한 곳에서 편하게.", "AI랑 공간 마케팅 전문가가 정성스럽게 제안을 작성해 드릴게요. 평균 8시간 정도 걸리고, 완성이 되면 바로 알림을 보내드릴게요!"
- **CTA**: "설계 받아보기 →" (orange `--accent` 버튼) → Screen 03으로

### Screen 03 — AI 상담사 모나
- **Purpose**: 6단계 질문(행사/제품/목표/타겟/예산/공간)으로 요구사항 수집
- **Layout**: FlowBar(56px) → 좌측 사이드바 280px (모나 프로필 + 진행 6단계) + 우측 채팅 패널
- **Intro overlay**: 첫 진입 시 "안녕하세요, 저는 모나예요" 모달 (480px) — 5분 안내, 6주제 미리보기
- **챗 UI**: AI 말풍선(`--bg-muted`), 사용자 말풍선(`--brand`), 타이핑 인디케이터, 빠른응답 chip
- **Avatar**: `CounselorAvatar` 컴포넌트 — 오렌지 그라데이션 원형, 온라인 도트
- **Behavior**: 사용자 답변 → AI(Claude API)가 다음 질문 생성, 6번째까지 반복

### Screen 04 — 회원가입
- 모나가 1차 답변 받은 후 결과물 보내려면 가입 필요
- 모달 형태, 다정한 마이크로카피("정성껏 작성해 보내드리려고 해요")
- 이메일 + 비밀번호 또는 카카오/구글 SSO

### Screen 05 — AI 분석 진행
- 가입 직후 백그라운드로 분석 시작
- 진행 단계 시각화 + 분석 중 인사이트 콘텐츠(예: "이 카테고리는 평균 X일 운영이 효과적이에요")
- 평균 8시간 안내, "완료되면 이메일로 알려드릴게요" 안내

### Screen 06 — 요구사항 정의서
- AI가 정리한 요구사항 리포트 (브랜드/제품/목표/타겟/예산/공간/일정)
- Sticky 하단 CTA("이 내용으로 제안서 만들어주세요" / "수정할게요")
- 인쇄·PDF 다운로드 옵션

### Screen 07 — 이메일 확인 / 작성 중
- 단일 풀페이지 — "지금 모나가 정성껏 제안서를 작성하고 있어요"
- 진행도 표시(0% → 100%, 8시간 ETA)
- "이메일로 알림 보내드릴게요" 안내
- 사용자가 떠나도 진행됨

### Screen 08 — 제안 도착 (Welcome back)
- 이메일 클릭 후 들어왔을 때 "오래 기다려주셔서 감사해요" 톤
- 완성된 제안서 통계 카드(소요시간/모듈 수/예상 견적)
- "제안서 보러 가기" CTA

### Screen 09 — 한 장 제안서
- 좌측: 텍스트 (컨셉·타겟·키 메시지·운영 전략)
- 우측: 무드보드 + 평면도(2D)
- 인쇄·공유 가능
- "3D로 자세히 보기" → Screen 10

### Screen 10 — 설계 + 견적 (3D 에디터)
- 핵심 화면. 3D 또는 2.5D 평면 에디터
- 좌측 모듈 라이브러리, 중앙 캔버스, 우측 속성/플로팅 견적
- 모듈 추가/제거/이동 시 실시간 견적 갱신
- **권장 라이브러리**: Three.js + React-Three-Fiber, 또는 2.5D면 Konva.js

### Screen 11 — 결제 완료
- 큰 ✓ 배지 + 축하 데코
- 좌: 영수증(주문번호, 라인 아이템, 총액)
- 우: NEXT STEPS(오늘/D+3/D+10/D-1/오픈일) + 담당 PM 카드
- 하단 CTA: 영수증 다운로드 / 진행 현황 / 홈으로

## Interactions & Behavior

- **AppBar/FlowBar 진행 표시**: 6단계/8단계 등 progress bar
- **챗 인터랙션**: 메시지 전송 → typing 인디케이터(1~2초) → AI 응답 페이드인. AI 응답은 스트리밍 권장 (Claude API messages.stream)
- **fade-up 애니메이션**: 각 카드/메시지 등장 시 `transform: translateY(8px) → 0` + opacity 0→1, 0.4s `cubic-bezier(0.2, 0.7, 0.2, 1)`
- **stagger**: 자식 요소 0.05s씩 시차 등장
- **3D 에디터 인터랙션**: 드래그 앤 드롭, 회전, 그리드 스냅, undo/redo (요구사항 별도 정의 필요)
- **결제 플로우**: Screen 10에서 "결제하기" → PG 결제창 → 성공 시 Screen 11

## State Management

**전역 (Zustand 권장)**
- `user`: 가입/로그인 상태, 프로필
- `currentProject`: 진행 중인 프로젝트(id, 단계, 답변 history)

**프로젝트 단위 데이터 (DB 저장)**
- `consultation`: 모나와의 대화 기록 (메시지 array)
- `requirements`: 정리된 요구사항 (브랜드/제품/목표/타겟/예산/공간)
- `proposal`: AI 생성 제안서 (한 장 + 상세)
- `design`: 3D 에디터 모듈 배치 데이터 (모듈 id + position + rotation)
- `quote`: 견적 라인 아이템 + 총액
- `order`: 결제·주문 정보

## Design Tokens

`design/styles.css` 의 `:root` 블록에 모두 정의되어 있습니다. 핵심 발췌:

### Colors
```
--bg: #ffffff
--bg-soft: #f5f7fc
--bg-muted: #eaf0fa
--line: #d6e1f2
--line-strong: #a9bde0
--ink-1: #0a2540   /* primary text */
--ink-2: #14315a
--ink-3: #4a6691
--ink-4: #7a90b6
--ink-5: #a9bde0

/* Brand blue (blueprint) */
--brand: #6B8FFF
--brand-hover: #5577ee
--brand-soft: #E8EEFF
--brand-tint: #F4F7FF

/* Accent orange (highlights, CTAs) */
--accent: #FF6B35
--accent-hover: #ff5a1f
--accent-soft: #FFE8DC
--accent-tint: #FFF4ED
```

### Typography
- **Korean**: Pretendard (CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css`)
- **English/numbers**: Inter
- **Mono**: JetBrains Mono
- Scale: display 44 / h1 32 / h2 24 / h3 18 / body 14 / body-lg 16 / small 12 / eyebrow 11 (uppercase, letter-spacing 0.08em)

### Radius
- xs 4 / sm 8 / md 12 / lg 16 / xl 20 / pill 999
- `[data-radius="sharp"]` 토글 시 모두 0~2px (사용자 옵션)

### Shadow
- sm: `0 1px 2px rgba(0,0,0,0.04)`
- md: `0 4px 14px rgba(0,0,0,0.06)`
- lg: `0 10px 32px rgba(0,0,0,0.08)`

### Motion
- `--ease-out: cubic-bezier(0.2, 0.7, 0.2, 1)`
- `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`

## API / Backend Integration Points

| 화면 | API 호출 |
|------|---------|
| 03 모나 | `POST /api/consultation/message` (Claude messages.stream) |
| 04 가입 | `POST /api/auth/signup` |
| 05 분석 | `POST /api/analysis/start`, 폴링 `GET /api/analysis/:id` |
| 06 요구사항 | `GET/PUT /api/requirements/:id` |
| 08 제안 도착 | 이메일 webhook → 알림 + Magic link |
| 09 제안서 | `GET /api/proposal/:id` |
| 10 에디터 | `GET /api/modules` (카탈로그), `PUT /api/design/:id`, `POST /api/quote/calculate` |
| 11 결제 | `POST /api/order` → PG 결제 → webhook → 확정 |

## Assets

- **모듈 이미지**: 현재 색상 블록으로 placeholder. 실제 모듈 사진 8개+ 필요(브랜드팀에서 제공)
- **포트폴리오 이미지**: v1 레포 `design-01.png ~ design-08.png` 참고
- **Logo**: `brand-mark` SVG 클래스로 인라인 (파랑 사각형 + 오렌지 점)

## Files in this bundle

```
design_handoff_makeyourplace_v2/
├── README.md                 ← 이 파일
└── design/
    ├── index.html            ← 브라우저로 열어 모든 화면 미리보기
    ├── styles.css            ← 디자인 토큰 + 유틸 클래스
    ├── primitives.jsx        ← AppBar, FlowBar, Brand
    ├── screens-1-3.jsx       ← 랜딩, 모나 챗
    ├── screens-4-6.jsx       ← 가입, 분석, 요구사항
    ├── screens-7-10.jsx      ← 대기, 도착, 제안서, 에디터, 결제완료
    └── app.jsx               ← 화면 전환 셸 (개발 시 불필요, 프리뷰용)
```

## Implementation Order 권장

1. **Setup**: Next.js + Tailwind + 토큰 이식, AppBar/FlowBar 컴포넌트화
2. **Screen 01 랜딩** — 정적, 빠르게
3. **Screen 03 모나 + Claude API 연동** — 가장 핵심, 가장 시간 많이 듦
4. **Screen 04 가입** — Auth 셋업
5. **Screen 05/06 분석·요구사항** — 백그라운드 잡 + 리포트 렌더
6. **Screen 07/08 대기·도착** — 이메일 + 알림 인프라
7. **Screen 09 제안서** — PDF 출력 포함
8. **Screen 10 3D 에디터** — 가장 복잡. Three.js or 2.5D Konva. 모듈 데이터 모델 우선
9. **Screen 11 결제** — PG 연동

## 추가 참고

- 기존 v1 레포: https://github.com/kman-cmyk/popup-designer
- v1 `studio.html`은 자체 제작 AI 코드 에디터 — v2와 별개. 건드리지 말 것
- 본 v2의 디자인 누수 방지를 위해 `design/styles.css` 의 CSS 변수를 그대로 Tailwind config에 매핑 권장
