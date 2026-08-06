# Next.js — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/NextJs/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 이 단계의 목표

Next.js 프로젝트를 만들고 **페이지를 추가해 배포까지** 해 본다.
공식 *Getting Started*가 다루는 범위이고, 이것만으로도 웹사이트 하나를 완성할 수 있다.

## 과목 지침

- **App Router 기준**으로 쓴다. Pages Router는 고급 단계에서 레거시로만 다룬다.
- Next.js는 버전마다 동작이 크게 바뀐다. **캐싱 기본값, Turbopack, 서버 컴포넌트 규칙은 반드시 공식 문서에서 현재 버전 기준을 확인**하고 쓴다.
- 이 저장소가 쓰는 버전은 `package.json`에서 확인한다. 학습 문서는 최신 안정 버전을 기준으로 쓰되, 저장소 버전과 다르면 그 차이를 각주로 남긴다.

### 참고 자료

- 공식 사이트 — https://nextjs.org
- 문서 (App Router) — https://nextjs.org/docs
- Getting Started — https://nextjs.org/docs/app/getting-started
- Learn 코스 (공식 튜토리얼) — https://nextjs.org/learn
- 블로그 (버전별 변경사항) — https://nextjs.org/blog

## 목차 (16편)

- `01_installation.mdx` — 설치 (create-next-app, TypeScript·ESLint 설정)
- `02_project-structure.mdx` — 프로젝트 구조 (폴더·파일 규칙)
- `03_layouts-and-pages.mdx` — 레이아웃과 페이지 (`layout.tsx`, `page.tsx`)
- `04_linking-and-navigating.mdx` — 링크와 내비게이션 (`next/link`, 프리페칭)
- `05_server-and-client-components.mdx` — 서버 컴포넌트와 클라이언트 컴포넌트
- `06_fetching-data.mdx` — 데이터 가져오기 (fetch, Server Components)
- `07_updating-data.mdx` — 데이터 수정하기 (Server Actions)
- `08_caching-and-revalidating.mdx` — 캐싱과 재검증
- `09_error-handling.mdx` — 에러 처리 (`error.tsx`, `not-found.tsx`)
- `10_css.mdx` — CSS (Tailwind, CSS Modules)
- `11_image-optimization.mdx` — 이미지 최적화 (`next/image`)
- `12_font-optimization.mdx` — 폰트 최적화 (`next/font`)
- `13_metadata-and-og-images.mdx` — 메타데이터와 OG 이미지
- `14_route-handlers-and-middleware.mdx` — 라우트 핸들러와 미들웨어
- `15_deploying.mdx` — 배포하기
- `16_upgrading.mdx` — 업그레이드
