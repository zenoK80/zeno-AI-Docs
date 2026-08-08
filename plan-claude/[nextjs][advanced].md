# Next.js — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/NextJs/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심, 복습편은 회상 질문·퀴즈·실습·오류 진단·정답 해설 중심으로 구성한다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

인증·국제화·테스트·보안 같은 **실전 운영 주제**를 다루고,
API 레퍼런스와 설정을 익혀 프로젝트를 스스로 설계할 수 있게 된다.

## 과목 지침

- 인증·보안 편은 잘못 쓰면 실제 사고로 이어진다. **공식 문서와 검증된 라이브러리 문서를 반드시 확인**하고, 직접 구현을 권하지 않는다.
- API 레퍼런스 편(09~13)은 사전 성격이다. 전부 나열하지 말고 **자주 쓰는 것 위주 + 공식 문서 링크**로 구성한다.
- Pages Router(15편)는 "새로 배우지 말고 읽을 줄만 알면 되는 것"으로 다룬다.

### 참고 자료

- 문서 (App Router) — https://nextjs.org/docs
- API 레퍼런스 — https://nextjs.org/docs/app/api-reference
- 블로그 — https://nextjs.org/blog
- Vercel 배포 문서 — https://vercel.com/docs
- GitHub — https://github.com/vercel/next.js

## 목차 (16편)

### Part 4. 실전 가이드

- `01_authentication.mdx` — 인증
- `02_internationalization.mdx` — 국제화 (i18n)
- `03_testing.mdx` — 테스트 (Jest, Vitest, Playwright)
- `04_mdx.mdx` — MDX 사용하기
- `05_forms-and-validation.mdx` — 폼과 유효성 검사
- `06_seo-and-metadata.mdx` — SEO와 메타데이터 심화
- `07_security.mdx` — 보안 (데이터 보안, CSP)
- `08_self-hosting.mdx` — 셀프 호스팅

### Part 5. API 레퍼런스

- `09_directives.mdx` — 디렉티브 (`'use client'`, `'use server'`)
- `10_built-in-components.mdx` — 내장 컴포넌트 (Link, Image, Script, Form)
- `11_file-conventions.mdx` — 파일 규칙 (layout, page, route, loading, error …)
- `12_functions-and-hooks.mdx` — 함수와 훅 (useRouter, cookies, headers, redirect …)
- `13_next-config.mdx` — `next.config.ts` 설정과 CLI

### Part 6. 도구와 마이그레이션

- `14_turbopack.mdx` — Turbopack과 빌드 성능
- `15_pages-router-legacy.mdx` — Pages Router (레거시) 개요와 마이그레이션
- `16_debugging.mdx` — 디버깅
