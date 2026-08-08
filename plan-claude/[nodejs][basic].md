# Node.js — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/NodeJs/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심, 복습편은 회상 질문·퀴즈·실습·오류 진단·정답 해설 중심으로 구성한다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

Node.js가 **무엇이고 왜 필요한지** 이해하고, 코드를 실행할 수 있게 된다.
모듈 시스템과 비동기 처리까지 — Node.js를 쓰기 위한 최소 지식이 여기 다 들어 있다.

## 과목 지침

- **LTS 버전 기준**으로 쓴다. 버전·릴리스 정책은 공식 릴리스 페이지에서 확인한다.
- 내장 모듈은 `node:` 프리픽스(`node:fs`) 표기를 기본으로 한다.
- 비동기(Part 3)는 ECMAScript 시리즈와 겹친다. 여기서는 **Node.js의 이벤트 루프 단계(phase)** 처럼 Node 고유 관점에 무게를 둔다.
- CommonJS와 ESM은 둘 다 실무에 존재한다. **어느 쪽이 정답이라고 하지 말고 구분 기준**을 준다.

### 참고 자료

- 공식 사이트 / 다운로드 — https://nodejs.org
- API 레퍼런스 — https://nodejs.org/api/
- 공식 Learn / 가이드 — https://nodejs.org/en/learn
- 릴리스 · LTS 일정 — https://nodejs.org/en/about/previous-releases
- npm 공식 문서 — https://docs.npmjs.com

## 목차 (15편)

### Part 1. Node.js 시작하기

- `01_what-is-nodejs.mdx` — Node.js란 무엇인가 (V8 엔진, 런타임 개념)
- `02_install-and-versions.mdx` — 설치와 버전 관리 (nvm, LTS)
- `03_browser-vs-node.mdx` — 브라우저 JS와 Node.js의 차이
- `04_first-program-and-repl.mdx` — 첫 프로그램 실행과 REPL

### Part 2. 모듈 시스템

- `05_commonjs.mdx` — CommonJS (`require`, `module.exports`)
- `06_es-modules.mdx` — ES 모듈 (`import`/`export`, `.mjs`)
- `07_built-in-modules-overview.mdx` — 내장 모듈 개요
- `08_npm-and-package-json.mdx` — npm과 `package.json`
- `09_semver.mdx` — 시맨틱 버저닝 (semver)

### Part 3. 비동기 프로그래밍

- `10_event-loop.mdx` — 이벤트 루프 (Node.js의 단계별 동작)
- `11_callbacks.mdx` — 콜백과 에러 우선 콜백 규약
- `12_promises.mdx` — 프로미스
- `13_async-await.mdx` — async / await
- `14_timers.mdx` — 타이머 (`setTimeout`, `setImmediate`, `process.nextTick`)
- `15_event-emitter.mdx` — 이벤트 이미터 (`EventEmitter`)
