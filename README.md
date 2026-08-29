# Zeno AI Docs

**깊고 자세하게 배우는 학습 문서 사이트** — Next.js + Nextra 기반.
컨셉은 "무조건 깊게(DEEP)": 문서 길이·목차 편수에 제한 없이, 초보자가 읽어도 그 자리에서 전문가가 되는 것을 목표로 한다.

문서는 사람이 일일이 쓰지 않는다. **AI 5개(Grok·Perplexity·Claude·Gemini·GPT)가 단계를 나눠 맡는 파이프라인**이 과목 하나를 통째로 만들어낸다.

## 문서 제작 파이프라인 (5단계)

| 단계 | 담당 AI | 하는 일 | 산출물 |
|------|---------|---------|--------|
| 1 학습방향 | Grok | 과목 컨셉 정의 (대상·목표·범위·깊이) | `prompts/plan/[과목]/01_학습방향.md` |
| 2 목차구성 | Perplexity | 웹 검색으로 자료 조사 + 목차 설계 | `.../02_목차.md` |
| 3 본문작성 | Claude | 편별 **완성 MDX**를 직접 작성 | `.../03_초안/NN.mdx` |
| 4 검수 | Gemini | 사실 확인·계산 검산·퀴즈 정답 검증 | `.../04_검수.md` |
| 5 보강·완성 | GPT | 검수 반영 + 내용 보강 → content 배치 + 빌드 | `content/[경로]/NN.mdx` |

각 단계의 상세 지시문은 `prompts/01~05_*.md`, MDX 작성 규칙은 `prompts/00_MDX규칙.md`에 있다.

## 파이프라인 실행 방법

### 방법 A — API 자동 실행 (bat 더블클릭)

`.env.local`의 API 키로 각 단계 담당 모델을 직접 호출한다. 관련 파일은 전부 **`실행/` 폴더**에 있다.

1. `실행/작업지시.md`에 과목·주제·경로·모델을 적는다
2. `실행/` 폴더에서 원하는 단계의 bat을 더블클릭: `1단계_학습방향.bat` … `5단계_완성.bat`, 전부는 `전체_1부터5.bat`
3. 비용은 호출마다 `costs/`에 자동 기록 — `실행/비용보고서.bat`으로 월별/과목별/단계별 집계

### 방법 B — AI 에이전트에게 시키기 (Claude Code·Codex)

에이전트에게 "react_1 3단계 해줘"라고 말하면, 에이전트가 그 단계의 지시문(`prompts/0N_*.md`)을 자기 지시로 삼아 **직접 그 단계의 AI 역할을 수행**한다. API 크레딧 없이 구독 요금 안에서 처리된다. 규칙은 [AGENTS.md](AGENTS.md)의 "방법 B" 참고.

### 하이브리드 (추천)

A와 B는 **산출물 위치·파일명이 완전히 같아서 단계마다 섞어 쓸 수 있다.** 예:

- 1·2단계는 bat으로 빠르게 (Grok 검색·Perplexity 조사) → 3단계는 에이전트에게 (비용 큰 구간을 무료로) → 4단계는 bat으로 (다른 모델의 눈) → 5단계 보강은 상황 따라
- 품질 확인도 하이브리드: 3단계를 bat으로 돌리기 전에 에이전트에게 1편만 시켜 기준을 잡는 식

자세한 사용법·옵션·트러블슈팅: [guide/run-generate-doc.md](guide/run-generate-doc.md)

## 폴더 구조

```
├── AGENTS.md          # AI 에이전트용 안내판 (문서 지도 + 제작 흐름 + 공통 규칙)
├── 실행/              # 파이프라인 실행 폴더: 작업지시.md + 단계별 bat + 비용보고서.bat
├── guide/             # 사람이 보는 가이드 (기술 스택, 메뉴 구조, 실행법, 코드 해설)
├── prompts/           # AI 지시문 (00 MDX규칙, 01~05 단계별) + plan/ 중간 산출물
├── scripts/           # 파이프라인 실행 코드 (run.js, lib/, steps/, cost-report.js)
├── content/           # 사이트에 올라가는 최종 MDX (폴더 구조 = 메뉴 구조, 폴더명은 react_1처럼 소문자+언더스코어)
├── app/               # Next.js 앱 (전역 컴포넌트: Quiz, CodePlayground 등)
└── costs/             # API 비용 자동 기록 — 커밋 안 됨
```

홈 화면의 과목 카드·문서 수는 `content/`를 스캔해 **자동 생성**된다 (`scripts/gen-home-data.js`, dev/build 시작 시 갱신) — 손으로 수정하지 않는다. 카드 설명을 직접 정하고 싶으면 `app/components/home-overrides.json`에 과목 폴더명 키로 한 줄.

## 개발

```bash
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 정적 빌드 + Pagefind 검색 인덱스
```

기술 스택: Next.js 15, Nextra 4, React 19, TypeScript, Tailwind CSS 4, KaTeX·Mermaid·Recharts·JSXGraph·React Flow·Sandpack — 상세는 [guide/tech-stack.md](guide/tech-stack.md)
