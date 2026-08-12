# 웹 기술 문서 지침

이 문서는 GPT가 JavaScript·React 등 웹 기술 학습 문서를 작성할 때 따르는 공통 규칙이다. 현재 계획은 `plan-skill/`의 JavaScript ECMAScript와 Web APIs다.

## 작업 흐름과 범위

- 요청받은 기술과 일치하는 `plan-skill/*.md`의 범위와 목차를 먼저 읽는다.
- 해당 계획의 다음 MDX와 같은 폴더의 `_meta.js`만 작성한다.
- 같은 요청에서 지정되지 않은 기술과 `plan-study/`의 학습 과목 콘텐츠는 건드리지 않는다.
- 커밋과 push는 사용자가 명시적으로 요청했을 때만 한다.

## 폴더와 Nextra 규칙

- 문서는 `content/<상위 메뉴>/<하위 분류>/NN_slug.mdx`에 둔다.
- 헤더는 `app/components/docs-navbar.tsx`가 전체 `pageMap`의 폴더 구조로 만든다. `content/` 바로 아래 폴더가 상위 메뉴이고 그 안의 폴더가 드롭다운 항목이다.
- `content/_meta.js`의 상위 메뉴는 `type: 'menu'`와 `items`를 사용하고, 항목 링크는 실제 첫 문서를 가리킨다.
- 과목별 `_meta.js`의 하위 분류는 `type: 'page'`로 둔다. 하위 분류의 `_meta.js`가 사이드바 순서와 이름을 결정한다.
- `app/layout.tsx`에는 전체 `getPageMap()`을 넘긴다. CSS 숨김이나 별도 필터로 사이드바를 다시 만들지 않는다.
- 파일을 추가·삭제·이름 변경하면 관련 `_meta.js`를 실제 파일과 함께 갱신한다. 아직 없는 문서는 등록하지 않는다.

## 모바일 규칙

- 모바일에서는 Nextra 사이드바를 여는 햄버거 버튼을 사용하고 커스텀 헤더 메뉴는 숨긴다.
- `모바일 메뉴 열기 -> 문서 이동 -> 데스크톱 폭 복귀` 뒤에도 사이드바와 본문 폭이 정상이어야 한다.
- Nextra 사이드바의 `width`, `height`, `transform`을 고정값으로 덮어쓰지 않는다.

## MDX 작성 규칙

- 첫 편부터 실제 개념으로 시작한다. 시리즈 소개만 담은 문서는 만들지 않는다.
- 파일명은 `NN_kebab-case.mdx`로 하고 frontmatter에는 `title`, `description`만 둔다.
- frontmatter가 페이지 제목을 만들므로 본문은 `##`부터 시작한다.
- 본문은 약 5분, 마지막 복습은 2~3분 안에 끝낼 분량으로 쓴다.
- 한 편에는 직접 연결되는 핵심 개념 2~4개만 담는다. 긴 도입과 반복 요약은 뺀다.
- 처음 나오는 용어는 그 자리에서 쉬운 말로 설명한다. 따로 검색해야 문장을 이해하는 상태를 만들지 않는다.
- 설명은 `작은 결과 또는 코드 -> 뜻 -> 동작 과정 -> 헷갈리는 점 -> 핵심 정리` 순서를 우선한다.
- 일반 JavaScript 예제는 코드 블록과 예상 실행 결과를 함께 보여 준다.
- 독자가 JavaScript·React 코드를 직접 수정하고 실행 결과를 확인해야 하는 실습은 Sandpack 기반 전역 `<CodePlayground>`를 사용한다.
- MDX·JSX 내용을 클라이언트에서 동적으로 렌더링하는 예제는 Nextra `Playground`를 사용한다. Nextra Playground와 CodePlayground의 용도를 혼동하지 않는다.
- 단순 문법 확인까지 모두 실습기로 만들지 않는다. 값을 바꾸며 결과 차이를 관찰해야 학습 효과가 있는 예제에 CodePlayground를 넣는다.
- 실행 순서·상태·클래스 관계는 Mermaid를 우선하고, 이벤트 루프·DOM·네트워크처럼 사용자가 노드를 움직이며 살펴볼 가치가 있을 때만 React Flow를 사용한다.
- 성능 수치나 시간에 따른 값은 Recharts로 표현한다. MathJax는 알고리즘 수식처럼 수학 표기가 필요한 경우에만 사용하며 JSXGraph는 JavaScript 수치·그래픽 실습 외에는 강제하지 않는다.
- 패키지 기반 시각화는 `app/components/`에 클라이언트 컴포넌트로 만든 뒤 MDX에서 재사용하며, 코드만큼 실행 결과가 잘 보이게 구성한다.
- `Callout`, `Table`, `Collapse`, `Quiz`는 import 없이 사용하며 이해에 도움 될 때만 넣는다.

## 마무리 복습

- 별도 복습 파일을 만들지 않고 같은 문서 끝에 `## 마무리 복습`을 둔다.
- 전역 `<Quiz>`로 4지선다 3문제를 만든다. 개념 확인, 코드 결과 판단, 흔한 오해를 섞는다.
- `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 작성한다.
- 해설은 정답 근거와 각 오답이 틀린 이유를 짧고 쉬운 말로 설명한다.

## JavaScript 경계와 검증

- ECMAScript는 변수, 타입, 함수, 객체처럼 JavaScript 언어 자체의 규칙을 다룬다.
- Web APIs는 DOM, 이벤트, 네트워크, 저장소처럼 실행 환경이 제공하는 기능을 다룬다.
- 같은 코드가 브라우저 밖에서도 언어 규칙만으로 동작하면 ECMAScript, 환경이 제공해야 하면 Web APIs로 분류한다.
- 최신 문법과 브라우저 지원 범위는 ECMA-262, WHATWG, MDN 등 공식 자료로 확인한다.
- 끝에는 실제 작성에 사용한 공식·신뢰 자료만 `## 참고 자료`에 링크한다.
- 일반 문서 작업은 `npm.cmd run lint`로 확인한다. 라우팅이나 Nextra 구조를 바꾼 경우에만 전체 빌드를 한 번 실행한다.
