# HTML — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/html/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심, 복습편은 회상 질문·퀴즈·실습·오류 진단·정답 해설 중심으로 구성한다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

HTML 문서의 **뼈대를 스스로 짤 수 있게** 된다.
문서 구조와 메타데이터, 텍스트 마크업, 링크와 시맨틱 레이아웃까지 — 여기까지가 "HTML을 읽고 쓸 줄 안다"의 기준선이다.

## 과목 지침

- 기준은 **HTML Living Standard(WHATWG)** 다. "HTML5"라는 버전 구분이 아니라 계속 갱신되는 표준임을 전제로 쓴다.
- 항상 **시맨틱(의미)과 접근성**을 함께 언급한다. "어떻게 보이나"보다 "무엇을 의미하나"가 우선이다.
- 참고: MDN HTML, [WHATWG HTML Living Standard](https://html.spec.whatwg.org/), web.dev(Learn HTML)

## 목차 (10편)

### Part 1. 기초 다지기

- `01_introduction-to-modern-html.mdx` — HTML의 역사, HTML Living Standard란, 브라우저 렌더링 흐름 개요
- `02_document-structure.mdx` — DOCTYPE, html/head/body, 최소 보일러플레이트
- `03_head-and-metadata.mdx` — meta(charset·viewport), base, link, 문서 메타데이터
- `04_global-attributes.mdx` — id·class·lang·dir·title·hidden·contenteditable 등 전역 속성과 문자 엔티티
- `05_text-content-and-lists.mdx` — 제목·문단·구분선, ul/ol/dl 목록
- `06_inline-text-semantics.mdx` — strong·em·mark·small·abbr·code·kbd 등 인라인 시맨틱

### Part 2. 하이퍼링크 · 시맨틱 구조

- `07_links-and-navigation.mdx` — a·href, 절대/상대 경로, target·rel, 프래그먼트 앵커
- `08_semantic-layout.mdx` — header·nav·main·section·article·aside·footer와 문서 아웃라인
- `09_tables.mdx` — 표 구조, thead/tbody/tfoot, 접근성 있는 테이블
- `10_other-semantic-elements.mdx` — figure·blockquote·q·cite·time·address 등 기타 시맨틱
