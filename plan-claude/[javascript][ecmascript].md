# JavaScript — ECMAScript

- 담당: Claude
- 콘텐츠 폴더: `content/javascript/ECMAscript/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

> JavaScript는 기초/중급/고급으로 나누지 않고 **ECMAScript**와 **Browser** 둘로만 나눈다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 문제마다 `<Collapse title="정답 보기">`와 `<Collapse title="해설 보기">`를 따로 둔다. 해설은 왜 정답인지·왜 나머지 보기가 틀렸는지를 초보 눈높이 용어로 설명하고, 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 시리즈의 정체성

**언어 자체(ECMA-262)** 를 다룬다. 브라우저가 제공하는 기능은 Web APIs 시리즈 담당이다.

《모던 자바스크립트 Deep Dive》를 요약·복제하지 않는다. 개념 범위만 참고하고 설명 경로·비유·예제는 새로 창작한다.
본문에서 특정 책을 언급하지 않는다.

<!-- 예외: 35~40편(브라우저 렌더링·DOM·이벤트·저장소)은 입문자의 학습 흐름을 위해
     이 시리즈에서 기초만 다루고, 심화는 Web APIs 시리즈로 넘긴다. -->

## 과목 지침

- 전문 용어는 처음 등장할 때 반드시 한 줄 정의를 붙인다.
- 아직 안 배운 개념이 필요하면 "N편에서 자세히 다룬다"고 명시하고 최소한만 설명한다.
- 정확성이 애매하면 MDN/명세를 확인하고, 그래도 불확실하면 불확실하다고 표기한다.
- 35~40편은 Web APIs 시리즈와 겹친다. **여기서는 입문자용 기초만** 다루고 심화는 넘긴다.

### 참고 자료와 우선순위

1. **MDN Web Docs** — 문법·API 정확성 검증 기준
2. **ECMAScript 명세 (https://tc39.es/ecma262/)** — 용어와 동작 원리의 최종 근거
3. **https://ko.javascript.info/** — 설명 난이도와 예제 스타일의 벤치마크

최신 문법·지원 현황은 기억에 의존하지 말고 웹 검색으로 현재 기준을 확인한 뒤 작성한다.

## 목차 (47편)

### Part 1. 언어의 기초

- `01_the-javascript-language.mdx` — 자바스크립트라는 언어
- `02_dev-environment-and-first-run.mdx` — 개발 환경 준비와 첫 실행
- `03_variables-and-constants.mdx` — 변수와 상수
- `04_expressions-and-statements.mdx` — 표현식과 문
- `05_data-types.mdx` — 데이터 타입
- `06_operators.mdx` — 연산자
- `07_type-conversion-and-short-circuit.mdx` — 타입 변환과 단축 평가
- `08_control-flow.mdx` — 제어문

### Part 2. 함수와 스코프

- `09_functions.mdx` — 함수 기초
- `10_scope.mdx` — 스코프
- `11_functions-are-values.mdx` — 함수는 값이다

### Part 3. 객체

- `12_object-literals.mdx` — 객체 리터럴
- `13_primitives-vs-objects.mdx` — 원시 값 vs 객체
- `14_spread-and-destructuring.mdx` — 스프레드와 디스트럭처링
- `15_property-deep-dive.mdx` — 프로퍼티 심화
- `16_this.mdx` — `this`
- `17_prototype.mdx` — 프로토타입
- `18_class.mdx` — 클래스

### Part 4. 실행 원리

- `19_execution-context.mdx` — 실행 컨텍스트
- `20_closure.mdx` — 클로저
- `21_event-loop.mdx` — 이벤트 루프와 비동기의 원리

### Part 5. 빌트인 객체

- `22_array-1.mdx` — 배열 ①
- `23_array-2.mdx` — 배열 ②
- `24_string.mdx` — String
- `25_number-and-math.mdx` — Number와 Math
- `26_date.mdx` — Date
- `27_regexp.mdx` — 정규표현식
- `28_set-and-map.mdx` — Set과 Map
- `29_symbol-and-iterable.mdx` — Symbol과 이터러블
- `30_json.mdx` — JSON
- `31_builtin-objects-summary.mdx` — 빌트인 객체 총정리

### Part 6. 비동기

- `32_promise.mdx` — 프로미스
- `33_async-await.mdx` — async/await
- `34_network.mdx` — 네트워크 통신

### Part 7. 브라우저 입문 (기초만)

- `35_browser-rendering.mdx` — 브라우저 렌더링 과정
- `36_dom-1.mdx` — DOM ①
- `37_dom-2.mdx` — DOM ②
- `38_events-1.mdx` — 이벤트 ①
- `39_events-2.mdx` — 이벤트 ②
- `40_browser-storage.mdx` — 브라우저 저장소

### Part 8. 실전과 마무리

- `41_error-handling.mdx` — 에러 처리
- `42_modules.mdx` — 모듈
- `43_build-tools.mdx` — 빌드 도구와 개발 환경
- `44_mini-project.mdx` — 미니 프로젝트
- `45_var-and-legacy.mdx` — `var`와 레거시 패턴
- `46_strict-mode.mdx` — strict mode
- `47_generators.mdx` — 제너레이터
