# Node.js — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/NodeJs/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

**내장 모듈로 실제 일을 시킨다.** 파일을 읽고 쓰고, 서버를 띄우고, 대용량 데이터를 스트림으로 처리한다.
여기까지 하면 간단한 백엔드를 스스로 만들 수 있다.

## 과목 지침

- 모든 파일 I/O 예제는 **`fs.promises` + async/await**를 기본으로 한다. 동기 버전(`readFileSync`)은 "언제 써도 되는지"만 짚는다.
- 경로 처리는 Windows/macOS 차이가 실제 버그로 이어진다. `path` 편에서 **하드코딩된 `/` 금지**를 강조한다.
- 웹 서버 편은 프레임워크 없이 `node:http`로 시작해 **프레임워크가 왜 필요한지**를 체감시킨 뒤 Express를 소개한다.
- `crypto` 편은 **직접 암호를 구현하지 말라**는 원칙을 앞세우고, 비밀번호 해싱 등 검증된 용법만 보여준다.

### 참고 자료

- API 레퍼런스 — https://nodejs.org/api/
- 공식 Learn / 가이드 — https://nodejs.org/en/learn
- MDN (HTTP 개념) — https://developer.mozilla.org/ko/docs/Web/HTTP

## 목차 (18편)

### Part 4. 핵심 내장 모듈

- `01_fs.mdx` — 파일 시스템 (`fs`, `fs.promises`)
- `02_path.mdx` — 경로 (`path`)
- `03_os.mdx` — 운영체제 정보 (`os`)
- `04_process-and-env.mdx` — 프로세스와 환경변수 (`process`, `.env`)
- `05_buffer.mdx` — 버퍼 (`Buffer`)
- `06_stream.mdx` — 스트림 (`Stream`)
- `07_util.mdx` — 유틸리티 (`util`)
- `08_crypto.mdx` — 암호화 (`crypto`)
- `09_url-and-querystring.mdx` — URL / querystring

### Part 5. 네트워킹과 웹 서버

- `10_http-module.mdx` — `http` / `https` 모듈
- `11_request-and-response.mdx` — 요청·응답 다루기
- `12_routing-basics.mdx` — 라우팅 기초
- `13_net-and-dgram.mdx` — `net`(TCP), `dgram`(UDP)
- `14_frameworks-overview.mdx` — Express 등 프레임워크 개요

### Part 6. 파일과 데이터 처리

- `15_read-write-files.mdx` — 파일 읽기·쓰기 (동기 vs 비동기)
- `16_directories.mdx` — 디렉터리 다루기
- `17_streams-for-large-data.mdx` — 스트림으로 대용량 처리
- `18_working-with-json.mdx` — JSON 다루기
