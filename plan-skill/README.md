# plan-skill

JavaScript·React 등 웹 기술 과목의 범위와 목차를 관리한다. 공통 작성·네비게이션 규칙은 루트 `skill.md`를 따른다.

## 현재 계획

| 계획 파일 | 콘텐츠 폴더 |
| --- | --- |
| `[javascript][ecmascript].md` | `content/javascript/ECMAscript/` |
| `[javascript][webapis].md` | `content/javascript/WebAPIs/` |

## 공통 방식

- 계획 파일명은 `[상위 메뉴][하위 분류].md`로 쓴다.
- GPT는 요청받은 기술의 계획 파일을 읽고 목차 순서대로 MDX를 작성한다.
- 첫 편부터 개념 학습을 시작하며 별도 소개편과 복습편을 만들지 않는다.
- 본문은 약 5분, 같은 파일의 `마무리 복습`은 2~3분 분량으로 구성한다.
- 콘텐츠 파일과 `_meta.js`를 같은 작업에서 갱신하고 아직 없는 편은 메뉴에 넣지 않는다.
- 과목 계획에는 목표, 범위, 작성 기준, 목차, 기준 자료를 기록한다.