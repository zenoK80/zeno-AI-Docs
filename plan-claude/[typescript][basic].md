# TypeScript — 기초 (Basic)

- 담당: Claude
- 콘텐츠 폴더: `content/Typescript/Basic/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 문제마다 `<Collapse title="정답 보기">`와 `<Collapse title="해설 보기">`를 따로 둔다. 해설은 왜 정답인지·왜 나머지 보기가 틀렸는지를 초보 눈높이 용어로 설명하고, 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

TypeScript를 **왜 쓰는지** 이해하고 환경을 갖춘 뒤, 매일 쓰는 기본 타입을 익힌다.
실무 TypeScript 코드의 90%는 이 단계 문법으로 되어 있다.

## 과목 지침

- "타입을 붙이면 좋다"가 아니라 **"어떤 실수를 잡아주는가"** 를 구체적인 예로 보여준다.
- 타입 추론이 잘 되는 곳에는 **타입을 쓰지 않는 것이 낫다**는 점을 초반부터 강조한다. 초보가 모든 곳에 `: string`을 붙이는 습관을 예방한다.
- `any`는 "쓰면 안 되는 것"이 아니라 **"왜 위험한지"** 를 설명하고 `unknown`과 비교한다.
- TypeScript는 릴리스 주기가 빠르다. **버전별 기본값(target·module 등)은 공식 문서에서 현재 기준을 확인**하고 쓴다.

### 참고 자료

- 공식 사이트 (한국어) — https://www.typescriptlang.org/ko/
- 공식 핸드북 — https://www.typescriptlang.org/docs/handbook/intro.html
- Playground — https://www.typescriptlang.org/play
- 공식 블로그 (버전별 변경사항) — https://devblogs.microsoft.com/typescript/

## 목차 (14편)

### Part 1. 시작하기

- `01_what-is-typescript.mdx` — TS란 무엇인가, JS와의 관계(상위집합), 정적 타입이 잡아주는 것
- `02_dev-environment.mdx` — 설치(`tsc`), Playground, Node 네이티브 실행, 첫 컴파일
- `03_tsconfig-basics.mdx` — `tsconfig.json` 기초, `strict`·`target`·`module`
- `04_how-compilation-works.mdx` — 타입 검사 vs 트랜스파일, 타입 소거(type erasure)

### Part 2. 기본 타입

- `05_primitive-types.mdx` — string·number·boolean·null·undefined
- `06_arrays-and-tuples.mdx` — 배열, 튜플, readonly 배열
- `07_annotation-and-inference.mdx` — 명시적 타입 표기 vs 타입 추론
- `08_any-unknown-never-void.mdx` — 특수 타입 네 가지와 언제 무엇을
- `09_union-and-literal-types.mdx` — 유니온, 리터럴 타입, `as const`
- `10_object-types.mdx` — 객체 타입, 선택적·readonly 프로퍼티, 인덱스 시그니처
- `11_type-alias-vs-interface.mdx` — `type`과 `interface` 차이·선택 기준

### Part 3. 함수

- `12_function-types.mdx` — 매개변수·반환 타입, 함수 타입 표현식
- `13_parameters.mdx` — 선택적·기본값·나머지(rest) 매개변수
- `14_signatures-and-overloads.mdx` — 호출 시그니처, 오버로드, `this` 타입
