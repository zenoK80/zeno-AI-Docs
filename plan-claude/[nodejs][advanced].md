# Node.js — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/NodeJs/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 문제마다 `<Collapse title="정답 보기">`와 `<Collapse title="해설 보기">`를 따로 둔다. 해설은 왜 정답인지·왜 나머지 보기가 틀렸는지를 초보 눈높이 용어로 설명하고, 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

만든 것을 **안정적으로 굴리는** 단계다.
에러를 제대로 처리하고, 테스트를 붙이고, 성능을 재고, 배포한다.

## 과목 지침

- 에러 처리 편은 **비동기 에러가 왜 `try/catch`로 안 잡히는지**를 원리로 설명한다.
- 테스트는 외부 도구보다 **내장 `node:test`를 먼저** 다룬다. 설치 없이 바로 해볼 수 있는 게 학습에 유리하다.
- 성능 편(Part 9)은 **"먼저 측정하라"** 를 원칙으로 세운다. 워커 스레드·클러스터는 만능이 아니며 언제 효과가 없는지도 적는다.
- 보안 편은 OWASP·Node.js 공식 보안 모범 사례를 확인하고 쓴다.

### 참고 자료

- API 레퍼런스 — https://nodejs.org/api/
- 공식 Learn / 가이드 — https://nodejs.org/en/learn
- 진단 도구 가이드 — https://nodejs.org/en/learn/diagnostics
- npm 공식 문서 — https://docs.npmjs.com
- GitHub — https://github.com/nodejs/node

## 목차 (15편)

### Part 7. 에러 처리와 디버깅

- `01_error-objects.mdx` — 에러 객체와 `try` / `catch`
- `02_async-error-handling.mdx` — 비동기 에러 처리 (`unhandledRejection` 포함)
- `03_debugger-and-logging.mdx` — 디버거와 로깅
- `04_diagnostics.mdx` — 진단(diagnostics) 도구

### Part 8. 테스트와 패키지 관리

- `05_node-test-runner.mdx` — 내장 테스트 러너 (`node:test`)
- `06_assert.mdx` — `assert` 모듈
- `07_jest-and-vitest.mdx` — 외부 도구 (Jest, Vitest) 개요
- `08_npm-commands.mdx` — npm 기본 명령과 `npx`
- `09_dependencies.mdx` — 의존성 관리 (dependencies / devDependencies)
- `10_scripts-and-global-packages.mdx` — 스크립트, 로컬 / 글로벌 패키지

### Part 9. 성능과 운영

- `11_worker-threads.mdx` — 워커 스레드 (`worker_threads`)
- `12_cluster.mdx` — 클러스터 (`cluster`)
- `13_child-process.mdx` — 자식 프로세스 (`child_process`)
- `14_profiling.mdx` — 메모리·성능 프로파일링
- `15_security-and-deployment.mdx` — 보안 모범 사례, 배포와 프로세스 매니저(PM2 등)
