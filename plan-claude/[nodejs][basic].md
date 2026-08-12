# Node.js — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/NodeJs/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 본편 `NN_slug.mdx` 맨 아래에 마무리 복습(`## 마무리 복습`)을 포함한다. 별도 `-review.mdx` 파일은 만들지 않는다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 마무리 복습의 퀴즈는 4지선다 객관식 2~4문제로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 필요하면 손으로 해보는 아주 짧은 실습도 뒤에 덧붙인다.
- 마무리 복습을 포함해도 본편 전체가 5분을 넘지 않게 조절한다.
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
