# 기술 스택 가이드

이 문서는 사이트를 구성하는 프레임워크·컴포넌트·라이브러리의 지도입니다.
MDX 작성 시 지켜야 하는 문법 금지 규칙은 [prompts/05_최종완성.md](../prompts/05_최종완성.md)에 있습니다.

## 프레임워크

| 기술 | 역할 | 비고 |
|------|------|------|
| Next.js 15 | 앱 프레임워크 | `output: 'export'` 정적 사이트 빌드 |
| Nextra 4 (+ nextra-theme-docs) | 문서 사이트 엔진 | `content/`의 MDX를 페이지로 렌더링 |
| React 19 | UI | |
| TypeScript 5 | 타입 | |
| Tailwind CSS 4 | 스타일 | `@tailwindcss/postcss` |
| Pagefind | 전문 검색 | `postbuild` 스크립트에서 인덱스 생성 |

- 라우팅: `app/[[...mdxPath]]/page.tsx`가 `content/` 경로를 그대로 URL로 매핑
- 수식: `next.config.ts`의 `nextra({ latex: { renderer: 'katex' } })` — KaTeX 내장 렌더링 (`$...$`, `$$...$$`)

## 전역 컴포넌트 (import 없이 MDX에서 바로 사용)

`mdx-components.tsx`에 등록되어 있습니다. 새 컴포넌트를 추가하면 여기에도 등록해야 전역으로 쓸 수 있습니다.

### Nextra 기본 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| `Callout` | 중요 설명·주의사항 (`type="info"`, `"warning"`, `"error"`) |
| `Table` | 비교표 |
| `Tabs` / `Tabs.Tab` | 탭 전환 (내부적으로 `docs-tabs.tsx` 래퍼 사용) |
| `Steps` | 단계별 과정 |
| `Collapse` | 접었다 펼치는 설명 |
| `Cards` | 문서 링크 카드 |
| `FileTree` | 폴더 구조 표현 |

### 커스텀 컴포넌트 (`app/components/`)

| 컴포넌트 | 파일 | 용도 |
|----------|------|------|
| `Quiz` | `quiz.tsx` | 4지선다 퀴즈 (정답·해설 표시) |
| `CodePlayground` | `code-playground.tsx` | Sandpack 기반 JS·React 코드 편집·실행 |
| `OneDriveVideo` | `one-drive-video.tsx` | OneDrive 학습 영상 iframe 삽입 |
| `DataBarChart` | `data-bar-chart.tsx` | Recharts 기반 차트 |
| `SetDiagram` | `set-diagram.tsx` | JSXGraph 기반 수학 그래프·도형 |
| `ConceptFlow` | `concept-flow.tsx` | React Flow 기반 노드 흐름도 |
| `HomeLanding` | `home-landing.tsx` | 홈 랜딩 (문서용 아님, 홈 전용) |

## 시각화 라이브러리 ↔ 래퍼 매핑

라이브러리를 MDX에서 직접 import하지 않습니다. 반드시 아래 래퍼 컴포넌트를 거칩니다.

| 라이브러리 | 래퍼 | 적합한 상황 |
|-----------|------|-------------|
| KaTeX | (내장, 래퍼 없음) | 수학·통계 공식 |
| Recharts | `data-bar-chart.tsx` | 데이터 비교·분포 차트 |
| JSXGraph | `set-diagram.tsx` | 함수·벡터·도형 직접 조작 |
| React Flow (`@xyflow/react`) | `concept-flow.tsx` | 사용자가 노드를 움직여야 의미가 있을 때만 |
| Sandpack (`@codesandbox/sandpack-react`) | `code-playground.tsx` | JS·React 코드 실습 |
| gsap | `home-landing.tsx` | 홈 랜딩 애니메이션 전용 — 학습 문서에서 사용 금지 |

**주의:**

- **Mermaid는 이 프로젝트에서 작동하지 않습니다.** ` ```mermaid ` 코드펜스는 빌드 에러 없이 내용이 통째로 사라지고, `<Mermaid>` 컴포넌트도 없습니다. 흐름·관계·계층은 `Table`, `Steps`, `ConceptFlow` 또는 산문으로 표현합니다.
- 모든 시각화를 한 문서에 억지로 넣지 않습니다. 이해에 실질적으로 도움이 될 때만 사용합니다.
- `better-react-mathjax`는 사용처가 없어 제거되었습니다. 수식은 KaTeX만 사용합니다.

## 명령어

```bash
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 정적 빌드 + postbuild에서 Pagefind 검색 인덱스 생성
```

빌드 성공 여부만 믿지 말 것 — 볼드 렌더링 깨짐 등 일부 문제는 빌드를 통과하므로 브라우저에서 직접 확인이 필요합니다.
