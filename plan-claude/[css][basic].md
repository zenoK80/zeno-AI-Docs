# CSS — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/css/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심, 복습편은 회상 질문·퀴즈·실습·오류 진단·정답 해설 중심으로 구성한다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

CSS가 화면에 적용되는 **원리**와, 어떤 규칙이 이기는지(캐스케이드)를 이해한다.
그다음 선택자로 원하는 요소를 정확히 집어내고, 색·단위·박스 모델·글꼴 같은 **기본 재료**를 다룰 수 있게 된다.

## 과목 지침

- 예제는 결과를 눈으로 상상할 수 있게 작고 시각적으로 만든다.
- 신문법(`:has()`, `oklch()`, `@layer` 등)은 **MDN Baseline 표기를 확인하고 명시**한다.
- 참고: MDN CSS, web.dev(Learn CSS), W3C CSS 명세, Chrome for Developers 블로그

## 목차 (21편)

### Part 1. 기초 원리

- `01_what-is-css.mdx` — CSS란 무엇인가, 브라우저 렌더링 원리, 역사
- `02_syntax-and-how-to-apply.mdx` — 문법 구조, 적용 방법(inline/internal/external), `@import`
- `03_cascade-specificity-inheritance.mdx` — 캐스케이드·명시도·상속, `!important`
- `04_cascade-layers.mdx` — `@layer`로 우선순위 관리하기

### Part 2. 선택자

- `05_basic-selectors.mdx` — 타입·클래스·ID·전체 선택자
- `06_combinators-attributes.mdx` — 결합자(`>`, `+`, `~`, 공백), 속성 선택자
- `07_modern-selectors.mdx` — `:is()`, `:where()`, `:has()`, `:not()`
- `08_pseudo-classes.mdx` — 상태/구조 가상 클래스(`:hover`, `:nth-child`, `:focus-visible` …)
- `09_pseudo-elements.mdx` — `::before`, `::after`, `::marker`, `::selection`, `::backdrop`

### Part 3. 값 · 색상 · 변수

- `10_values-and-units.mdx` — 절대/상대 단위, `%`, 키워드
- `11_modern-units.mdx` — `dvh`/`svh`/`lvh`, `cqw`/`cqi` 등 뷰포트·컨테이너 단위
- `12_color-basics.mdx` — hex, `rgb()`, `hsl()`, 투명도
- `13_modern-color.mdx` — `oklch()`/`oklab()`, `color-mix()`, 상대 색상
- `14_custom-properties.mdx` — CSS 변수(`--var`), `var()` 폴백, 스코프
- `15_registered-properties.mdx` — `@property`로 타입 있는 변수 만들기

### Part 4. 박스 모델 · 타이포그래피

- `16_box-model.mdx` — content/padding/border/margin, `box-sizing`, 마진 상쇄
- `17_logical-properties.mdx` — inline/block 논리 속성, 다국어·방향 대응
- `18_backgrounds-and-borders.mdx` — 배경, 다중 배경, `border-radius`, `outline`
- `19_gradients.mdx` — linear/radial/conic, 반복 그라디언트
- `20_typography.mdx` — 폰트, 웹폰트, `line-height`, `letter-spacing`
- `21_modern-text.mdx` — `text-wrap: balance/pretty`, `hyphens`, 최신 텍스트 제어
