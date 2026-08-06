# Next.js — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/NextJs/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 이 단계의 목표

App Router의 **라우팅 기능을 끝까지** 쓰고, **렌더링 방식**을 이해해 선택할 수 있게 된다.
"이 페이지는 정적인가 동적인가", "이 데이터는 언제 캐시되는가"를 스스로 판단하는 단계다.

## 과목 지침

- 렌더링·캐싱은 Next.js에서 **가장 자주 바뀌는 영역**이다. 각 편마다 공식 문서를 다시 확인하고, 기준 버전을 문서에 명시한다.
- 병렬·인터셉트 라우트는 개념이 추상적이다. **실제 UI 사례(모달, 대시보드 탭)** 로 시작한다.
- 캐싱 편은 여러 계층이 얽혀 헷갈리기 쉽다. **표로 정리한 뒤 개별 설명**하는 순서를 지킨다.

### 참고 자료

- 문서 (App Router) — https://nextjs.org/docs
- 블로그 (버전별 변경사항) — https://nextjs.org/blog
- React 서버 컴포넌트 — https://react.dev/reference/rsc/server-components

## 목차 (15편)

### Part 1. 라우팅 심화

- `01_dynamic-routes.mdx` — 동적 라우트 (`[slug]`, `[...catchAll]`)
- `02_nested-routes-and-layouts.mdx` — 중첩 라우트와 레이아웃
- `03_route-groups.mdx` — 라우트 그룹 `(group)`
- `04_parallel-routes.mdx` — 병렬 라우트 `@slot`
- `05_intercepting-routes.mdx` — 인터셉트 라우트 `(.)`, `(..)`
- `06_loading-ui-and-streaming.mdx` — 로딩 UI와 스트리밍 (`loading.tsx`, Suspense)

### Part 2. 렌더링

- `07_server-components.mdx` — 서버 컴포넌트 (RSC)
- `08_client-components.mdx` — 클라이언트 컴포넌트 (`'use client'`)
- `09_static-vs-dynamic.mdx` — 정적 렌더링 vs 동적 렌더링
- `10_ssr-ssg-isr.mdx` — SSR / SSG / ISR
- `11_partial-prerendering.mdx` — 부분 프리렌더링 (PPR)
- `12_runtimes.mdx` — Edge와 Node.js 런타임

### Part 3. 데이터와 스타일

- `13_caching-layers.mdx` — 캐싱 계층 이해와 재검증 (`revalidatePath`, `revalidateTag`)
- `14_client-side-fetching.mdx` — 클라이언트 패칭 (SWR, TanStack Query)
- `15_styling-and-assets.mdx` — CSS 방식 선택, 정적 파일(`public`)
