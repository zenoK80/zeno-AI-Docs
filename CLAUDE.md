# Claude 작업 지침

이 저장소는 Nextra 4 + Next.js 기반의 개인 학습 문서 사이트다. Claude는 `plan-claude/`에 있는 웹 개발 과목의 MDX 문서 작성을 담당한다.

## 역할 분리

- Claude 담당 계획: `plan-claude/`
- Codex 담당 계획: `plan-codex/`
- Claude는 사용자가 별도로 요청하지 않는 한 `AGENTS.md`, `plan-codex/`, `content/독학사/`, `content/자격증/`을 수정하지 않는다.
- 파일을 추가, 삭제, 이동, 이름 변경하면 같은 폴더의 `_meta.js`도 반드시 함께 갱신한다.

## 절대 잊지 말아야 할 헤더/사이드바 구조

이 사이트는 **헤더에서 과목과 하위 분류를 고르고, 사이드바는 선택된 하위 분류의 문서만 보여 주는 구조**다. 모든 문서를 사이드바에 한꺼번에 나열하지 않는다.

### 헤더 규칙

- 헤더의 최상위 메뉴는 `content/` 바로 아래의 과목 폴더다. 예: JavaScript, React, HTML, CSS.
- 마우스를 올리면 해당 과목의 직접 하위 분류만 드롭다운으로 보인다.
  - JavaScript: `WebAPIs`, `ECMAscript`
  - React / Next.js / TypeScript / Node.js / HTML / CSS: `Basic`, `Middle`, `Advanced`
- 드롭다운에서 하위 분류를 클릭하면 그 분류의 첫 번째 문서로 이동한다.
- 최상위 과목의 비어 있는 `index.mdx`는 만들지 않는다. 과목은 헤더 메뉴이고, 실제 문서는 하위 분류에서 시작한다.
- Nextra 기본 검색과 테마 전환은 유지한다. 헤더를 수정할 때 제거하거나 대체하지 않는다.

### 사이드바 규칙

- 현재 URL과 같은 하위 분류의 문서만 사이드바에 표시한다.
  - `/javascript/WebAPIs/...`: Web APIs 문서만
  - `/javascript/ECMAscript/...`: ECMAScript 문서만
  - `/React/Basic/...`: React Basic 문서만
  - `/css/Middle/...`: CSS Middle 문서만
- 다른 과목이나 형제 분류의 문서는 사이드바에 보이면 안 된다.
- 사이드바 순서와 표시 이름은 그 하위 분류의 `_meta.js`가 기준이다.
- 문서가 늘어도 전체 트리를 펼쳐 놓지 않는다. 헤더에서 분류를 고르면 그 분류의 사이드바로 바뀌어야 한다.

### 이 구조를 만드는 Nextra 규칙

- `app/layout.tsx`의 `<Layout>`에는 전체 `getPageMap()` 구조를 넘긴다. 한글 폴더 경로는 브라우저 URL과 맞추기 위해 route만 `encodeURI`로 정규화할 수 있지만, URL마다 `pageMap`을 잘라 넘기는 별도 필터 코드를 만들지 않는다.
- `content/_meta.js`의 최상위 과목은 반드시 `type: 'menu'`와 `items`를 사용한다.
- 각 과목의 `_meta.js`에서 실제 사이드바 범위가 되는 하위 분류(`WebAPIs`, `Basic` 등)는 반드시 `type: 'page'`로 선언한다.
- 이 `menu -> page -> 문서` 계층이 Nextra 기본 사이드바를 현재 분류의 문서 목록으로 자동 제한한다. 배포된 `https://zeno.it.kr/`의 헤더/사이드바 방식이 이 기준이다.
- 이 동작을 CSS 숨김, DOM 조작, 별도 라우트별 사이드바 데이터로 대체하지 않는다.
- `app/[[...mdxPath]]/page.tsx`의 `generateStaticParams()`는 홈을 `[]`로, 한글을 포함한 각 경로 조각은 `encodeURIComponent(decodeURIComponent(segment))`으로 반환한다. `output: 'export'`에서 한글 과목 경로가 누락됐다고 판단되는 오류를 막기 위한 규칙이다.

### 모바일 규칙

- 모바일에서는 헤더 드롭다운 대신 Nextra 기본 햄버거 메뉴를 사용한다.
- 모바일에서 메뉴를 열고 문서를 클릭한 뒤 데스크톱 폭으로 되돌려도, 사이드바와 본문이 정상 폭으로 돌아와야 한다.
- Nextra 사이드바에 고정 `width`, `transform`, `height` 값을 직접 덮어써서 문제를 해결하지 않는다.
- 헤더/사이드바/CSS를 수정했다면 모바일 폭 -> 메뉴 열기 -> 문서 이동 -> 데스크톱 폭 복귀를 확인한다.

## Claude 담당 과목과 폴더

| 계획 파일 | 콘텐츠 폴더 |
| --- | --- |
| `[javascript][ecmascript].md` | `content/javascript/ECMAscript/` |
| `[javascript][webapis].md` | `content/javascript/WebAPIs/` |
| `[react][basic].md`, `[middle].md`, `[advanced].md` | `content/React/Basic/`, `Middle/`, `Advanced/` |
| `[nextjs][basic].md`, `[middle].md`, `[advanced].md` | `content/NextJs/Basic/`, `Middle/`, `Advanced/` |
| `[typescript][basic].md`, `[middle].md`, `[advanced].md` | `content/Typescript/Basic/`, `Middle/`, `Advanced/` |
| `[nodejs][basic].md`, `[middle].md`, `[advanced].md` | `content/NodeJs/Basic/`, `Middle/`, `Advanced/` |
| `[html][basic].md`, `[middle].md`, `[advanced].md` | `content/html/Basic/`, `Middle/`, `Advanced/` |
| `[css][basic].md`, `[middle].md`, `[advanced].md` | `content/css/Basic/`, `Middle/`, `Advanced/` |

## MDX 작성 규칙

- 작성 전에 해당 `plan-claude/[과목][단계].md`에서 목차와 범위를 읽는다.
- 파일명은 `NN_kebab-case.mdx`다. 번호는 각 하위 분류 폴더에서 `01`부터 시작한다.
- Frontmatter에는 `title`, `description`만 넣는다.
- 본문 제목은 `##`부터 시작한다. `#`은 쓰지 않는다.
- 독자는 프로그래밍 초보다. **낯설 수 있는 용어·개념은 등장하는 바로 그 자리에서** 짧게 풀어 설명한다. "이건 나중에 나온다"며 미루지 말고, 그 문장을 이해하는 데 필요한 최소한은 즉시 준다. 독자가 흐름을 끊고 용어를 따로 검색하러 가야 하는 상황을 만들지 않는다.
- 핵심 개념뿐 아니라 **주변 개념·비교 대상**도 짧게 짚는다 (예: "리플로우"를 설명하면 "페인트와 뭐가 다른지"도 한 줄 덧붙인다). 완전히 새로운 절을 만들 필요는 없고, 괄호나 한 문장으로 충분하다.
- 작은 코드 예제를 통해 바로 확인할 수 있게 쓴다.
- 한 편은 약 30~50분 학습량을 목표로 한다. 설명이 길어지면 다음 편으로 나눈다.
- 끝에는 항상 `## 참고 자료`를 넣고 공식 문서 중심으로 링크한다.

## 복습 문서 — 본편마다 짝을 붙인다

**모든 본편(`NN_slug.mdx`) 바로 다음에는 그 편의 복습 문서를 만든다.**

- 파일명: `NN_slug-review.mdx` — 본편과 **같은 번호**, 뒤에 `-review`만 붙인다
- 본편은 개념·설명·완성된 예제에 집중하고 긴 문제와 전체 정답을 중복해서 넣지 않는다. 본편 끝에서는 다음 진도보다 같은 번호 복습편으로 먼저 연결한다
- 퀴즈는 **주관식 문답이 아니라 4지선다(보기 4개) 객관식**으로 만든다. 보기는 그럴듯한 오답(흔한 오해)을 섞어서 진짜 이해했는지 가려낼 수 있게 짠다
- 객관식 문제는 전역 등록된 `<Quiz>` 컴포넌트로 작성한다. `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 빠짐없이 채운다. `options`는 4개, `correctAnswer`는 1부터 시작하는 정답 보기 번호다. `optionExplanations`는 보기 순서에 맞춰 4개를 전부 쓰고, 각 보기가 **왜 맞고 왜 틀렸는지**를 초보 눈높이로 설명한다. 독자가 보기를 실제로 클릭하면 그 자리에서 정답 여부와 전체 해설이 바로 나온다 — 선택지·정답·해설을 일반 텍스트 목록이나 `Collapse`로 나열하지 않는다
- `Collapse`는 실습 문제의 정답·예시 답안처럼 자유 서술형 내용에만 쓴다
- 해설에서도 어려운 용어가 나오면 그 자리에서 풀어준다. 본편을 다시 읽어야 이해되는 해설은 쓰지 않는다
- 퀴즈 외에 손으로 직접 해보는 **짧은 실습**도 함께 담는다. 개념 위주 편은 퀴즈 비중을, 실습 위주 편(환경 설정, Canvas 등)은 실습 비중을 높인다
- 분량은 본편보다 훨씬 짧게 — 10~15분 안에 끝낼 수 있는 정도가 목표다
- `_meta.js`에는 본편 바로 다음 줄에 등록해 사이드바 순서를 맞춘다
- 새 본편을 만들 때 복습편을 미루지 않고 두 파일과 `_meta.js`를 같은 작업에서 완성한다

**예외 — 짝을 붙이지 않는 경우**: 기출문제, 실전 모의고사, 종합·미니 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트. 그 문서 자체가 이미 평가나 실습 목적이므로 별도 복습 문서를 만들지 않는다.

## Nextra 컴포넌트

전역 등록된 컴포넌트는 import 없이 사용한다. 장식이 아니라 이해에 도움이 될 때만 쓴다.

- `Callout`: 핵심 정의와 주의점
- `Steps`: 설치/실습 순서
- `Tabs`: 환경별 코드나 비교
- `FileTree`: 파일 구조
- `Table`: 용어와 선택지 비교
- `Collapse`: 보조 설명, 실습 문제의 정답·예시 답안
- `Cards`: 관련 문서 이동
- `Quiz`: 복습편의 4지선다 객관식 문제 (클릭하면 정답·해설이 바로 나온다)

## 확인 규칙

- API, 브라우저 지원 범위, 라이브러리 버전처럼 최신성이 필요한 내용은 공식 문서에서 확인한다.
- 라우팅 또는 Nextra 문서 구조를 크게 바꾼 경우에만 `npm.cmd run build`를 한 번 실행한다.
- 일반 문서 작성이나 작은 스타일 변경은 `npm.cmd run lint`로 확인한다.
- 커밋과 push는 사용자가 요청했을 때만 한다.
