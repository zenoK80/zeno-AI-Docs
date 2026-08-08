# React — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/React/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심, 복습편은 회상 질문·퀴즈·실습·오류 진단·정답 해설 중심으로 구성한다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

React가 **왜 필요한지**, 그리고 **어떻게 화면을 그리는지**를 원리부터 이해한다.
컴포넌트·Props·State를 익혀 간단한 화면을 스스로 만들 수 있게 되는 단계다.

## 과목 지침

- 이 시리즈의 특징은 **원리 이해 챕터를 문법 직전에 배치**한 것이다. 목차 순서를 지킨다.
  - 렌더링 원리(02·03) → JSX·Virtual DOM(05~07)
  - 렌더링 사이클(17) → State 심화(18~20)
- 구버전 문법과 새 문법을 함께 표기한다. 클래스 컴포넌트는 "읽을 줄만 알면 되는 것"으로 다룬다.
- 실무에서 자주 쓰이는 패턴 위주로 쓴다.

### 참고 자료

- React 공식 문서 — https://react.dev
- React 한국어 문서 — https://ko.react.dev
- 레거시 문서(구버전 확인용) — https://legacy.reactjs.org
- CodeSandbox(실습 환경) — https://codesandbox.io

## 목차 (20편)

### Part 1. 왜 React이고, 어떻게 동작하나

- `01_why-react.mdx` — 웹의 역사와 React의 탄생
- `02_browser-rendering.mdx` — 브라우저는 화면을 어떻게 그릴까 (렌더링 엔진, DOM/CSSOM)
- `03_javascript-engine.mdx` — JavaScript 엔진의 동작 원리 (V8, 콜스택, 이벤트 루프)
- `04_cdn-and-babel.mdx` — React 개발 환경 이해하기 (CDN + Babel로 원리 체험)
- `05_jsx.mdx` — JSX 완전 정복 (Babel과 createElement의 진짜 얼굴)
- `06_virtual-dom.mdx` — Virtual DOM의 원리 (diff와 재조정)
- `07_fiber-architecture.mdx` — Fiber 아키텍처, React는 어떻게 렌더링을 쪼개는가
- `08_bundler-and-modules.mdx` — 번들러와 모듈 시스템의 원리, Vite는 왜 빠른가
- `09_vite-setup.mdx` — Vite로 실무 개발 환경 세팅하기

### Part 2. 컴포넌트와 Props

- `10_components.mdx` — 컴포넌트, UI를 만드는 기본 단위
- `11_props.mdx` — Props로 데이터 전달하기
- `12_children-and-composition.mdx` — children과 컴포넌트 합성, 단방향 데이터 흐름
- `13_conditional-rendering.mdx` — 조건부 렌더링 (삼항 연산자와 `&&` 패턴)
- `14_list-rendering.mdx` — 리스트 렌더링 (map, filter 그리고 key의 원리)
- `15_handling-events.mdx` — 이벤트 다루기 (onClick, onChange와 합성 이벤트)

### Part 3. State 기초

- `16_usestate-basics.mdx` — State 기초, useState로 변하는 값 다루기
- `17_rendering-cycle.mdx` — 렌더링 사이클의 원리 (트리거 → 렌더 → 커밋, 스냅샷)
- `18_state-vs-props.mdx` — State vs Props, 언제 무엇을 쓸까
- `19_multiple-states.mdx` — 여러 개의 State 관리하기
- `20_batching-and-updater.mdx` — 배치 업데이트와 함수형 업데이트, 왜 +1만 되는가
