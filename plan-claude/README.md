# plan-claude — Claude 과목 계획

Claude가 담당하는 과목의 **목차와 과목별 작성 지침**이 들어 있다.
공통 작성 규칙은 저장소 루트의 `CLAUDE.md`에 있다.

## 파일 이름 규칙

```txt
[과목][단계].md
```

첫 번째 대괄호는 상위 메뉴(과목), 두 번째 대괄호는 하위 분류(단계)다.
`AGENTS.md`(Codex)와 공유하는 규칙이다.

## 본편과 복습편

- 계획 목차의 일반 본편 `NN_slug.mdx`는 `NN_slug-review.mdx`와 한 쌍이다.
- 실제 사이드바에서는 `01 본편 -> 01-복습 -> 02 본편 -> 02-복습` 순서로 배치한다.
- 기출·모의고사·종합 프로젝트·해설 전용 문서는 복습편을 추가하지 않는다.
- 복습편은 새 진도가 아니라 해당 본편을 회상하고 직접 풀어 보는 10~15분 학습 단계다.

## 단계 구분

기술 과목은 **기초(basic) → 중급(middle) → 고급(advanced)** 3단계로 나눈다.
**JavaScript만 예외**로, 단계 대신 ECMAScript와 Browser 둘로 나눈다.

## 파일 목록

| 계획 파일 | 콘텐츠 폴더 | 편 수 |
| --- | --- | --- |
| `[javascript][ecmascript].md` | `content/javascript/ECMAscript/` | 47 |
| `[javascript][webapis].md` | `content/javascript/WebAPIs/` | 128 |
| `[react][basic].md` | `content/React/Basic/` | 20 |
| `[react][middle].md` | `content/React/Middle/` | 20 |
| `[react][advanced].md` | `content/React/Advanced/` | 15 |
| `[nextjs][basic].md` | `content/NextJs/Basic/` | 16 |
| `[nextjs][middle].md` | `content/NextJs/Middle/` | 15 |
| `[nextjs][advanced].md` | `content/NextJs/Advanced/` | 16 |
| `[typescript][basic].md` | `content/Typescript/Basic/` | 14 |
| `[typescript][middle].md` | `content/Typescript/Middle/` | 11 |
| `[typescript][advanced].md` | `content/Typescript/Advanced/` | 14 |
| `[nodejs][basic].md` | `content/NodeJs/Basic/` | 15 |
| `[nodejs][middle].md` | `content/NodeJs/Middle/` | 18 |
| `[nodejs][advanced].md` | `content/NodeJs/Advanced/` | 15 |
| `[html][basic].md` | `content/html/Basic/` | 10 |
| `[html][middle].md` | `content/html/Middle/` | 14 |
| `[html][advanced].md` | `content/html/Advanced/` | 16 |
| `[css][basic].md` | `content/css/Basic/` | 21 |
| `[css][middle].md` | `content/css/Middle/` | 15 |
| `[css][advanced].md` | `content/css/Advanced/` | 12 |

## 계획 파일에 들어가는 것

- 담당자, 대응하는 콘텐츠 폴더
- **이 단계의 목표** — 여기까지 배우면 무엇을 할 수 있는지
- **과목 지침** — 그 과목에서만 적용되는 규칙, 주의할 함정
- **참고 자료** — 그 과목에서 근거로 삼을 공식 문서
- **목차** — 파일명과 한 줄 설명
