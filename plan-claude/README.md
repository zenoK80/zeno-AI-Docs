# plan-claude — Claude 과목 계획

Claude가 담당하는 과목의 **목차와 과목별 작성 지침**이 들어 있다.
공통 작성 규칙은 저장소 루트의 `CLAUDE.md`에 있다.

## 파일 이름 규칙

```txt
[과목][단계].md
```

첫 번째 대괄호는 상위 메뉴(과목), 두 번째 대괄호는 하위 분류(단계)다.
`AGENTS.md`(Codex)와 공유하는 규칙이다.

## 본편과 복습

- 복습은 **별도 파일이 아니라 본편(`NN_slug.mdx`) 맨 아래의 `## 마무리 복습` 절**이다. `NN_slug-review.mdx` 파일은 만들지 않는다.
- 기출·모의고사·종합 프로젝트·해설 전용 문서는 마무리 복습을 추가하지 않는다.
- 마무리 복습은 새 진도가 아니라 해당 본편의 핵심을 4지선다 2~4문제로 확인하는 절이다. 자세한 규칙은 `CLAUDE.md`를 따른다.

## 지금 작업 범위

지금은 `[javascript][ecmascript].md`, `[javascript][webapis].md` **두 계획만 작업 중**이다. 한 편씩 완성하며 진행한다.

React, Next.js, TypeScript, Node.js, HTML, CSS의 계획 파일과 콘텐츠는 관리를 단순하게 유지하려고 전부 지운 상태다. `content/_meta.js` 헤더에도 없다. 이 두 시리즈가 새 형식(본편+복습 한 파일, 5분 이내 분량)으로 자리 잡으면, 그때 과목별로 계획 파일을 새로 쓰고 `content/_meta.js`에 다시 추가한다.

## 단계 구분

기술 과목은 **기초(basic) → 중급(middle) → 고급(advanced)** 3단계로 나눈다.
**JavaScript만 예외**로, 단계 대신 ECMAScript와 Browser 둘로 나눈다. (다른 과목을 재개할 때 적용할 규칙)

## 파일 목록

| 계획 파일 | 콘텐츠 폴더 |
| --- | --- |
| `[javascript][ecmascript].md` | `content/javascript/ECMAscript/` |
| `[javascript][webapis].md` | `content/javascript/WebAPIs/` |

## 계획 파일에 들어가는 것

- 담당자, 대응하는 콘텐츠 폴더
- **이 단계의 목표** — 여기까지 배우면 무엇을 할 수 있는지
- **과목 지침** — 그 과목에서만 적용되는 규칙, 주의할 함정
- **참고 자료** — 그 과목에서 근거로 삼을 공식 문서
- **목차** — 파일명과 한 줄 설명
