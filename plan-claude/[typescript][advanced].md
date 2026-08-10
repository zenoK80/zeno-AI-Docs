# TypeScript — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/Typescript/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

**타입으로 타입을 만드는** 고급 조작을 익히고, 프로젝트 구성과 실전 생태계를 다룬다.
라이브러리 타입 정의를 읽고 쓸 수 있는 수준이 목표다.

## 과목 지침

- 고급 타입 조작(Part 7)은 재미있어서 **과용하기 쉽다.** 매 편마다 "이걸 정말 써야 하는가"를 묻고, 읽기 어려운 타입은 그 자체로 비용임을 명시한다.
- 유틸리티 타입(`04`)은 전부 나열하지 말고 **실제로 자주 쓰는 것 위주**로 다룬다.
- 런타임 검증(`08`)은 TypeScript의 가장 큰 오해 — "타입이 런타임을 지켜준다" — 를 깨는 편이다. 중요하게 다룬다.
- 생태계·툴체인(Part 9)은 **변화가 가장 빠른 영역**이다. 컴파일러 버전, tsgo 전환 상태, 타입 인식 ESLint 지원 여부는 반드시 **공식 블로그로 현재 상태를 확인**하고 쓴다. 확인한 기준 날짜를 문서에 남긴다.

### 참고 자료

- 공식 핸드북 — https://www.typescriptlang.org/docs/handbook/intro.html
- 타입 조작 — https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
- 공식 블로그 (버전별 변경사항) — https://devblogs.microsoft.com/typescript/
- DefinitelyTyped — https://github.com/DefinitelyTyped/DefinitelyTyped
- typescript-eslint — https://typescript-eslint.io/

## 목차 (14편)

### Part 7. 고급 타입 조작

- `01_conditional-types.mdx` — 조건부 타입, `infer`
- `02_mapped-types.mdx` — 매핑된 타입, 수정자(`+`/`-`·`readonly`·`?`)
- `03_template-literal-types.mdx` — 템플릿 리터럴 타입
- `04_utility-types.mdx` — `Partial`·`Pick`·`Omit`·`Record`·`ReturnType` 등 내장 유틸리티

### Part 8. 모듈과 프로젝트 구성

- `05_es-modules.mdx` — `import`/`export`, ESM, 모듈 해석
- `06_declaration-files.mdx` — `.d.ts`, `@types`, DefinitelyTyped, `declare`
- `07_tsconfig-deep-dive.mdx` — 주요 컴파일러 옵션, 프로젝트 참조

### Part 9. 실전과 생태계

- `08_runtime-validation.mdx` — 런타임 검증(Zod 등), 타입과 런타임의 경계
- `09_migrating-js-to-ts.mdx` — 점진적 마이그레이션, `allowJs`·`checkJs`
- `10_decorators.mdx` — Stage 3 데코레이터와 메타데이터
- `11_enums-symbols-iterators.mdx` — enum·symbol·이터레이터/제너레이터 타입
- `12_typescript-with-react.mdx` — React 실전 패턴
- `13_typescript-with-node.mdx` — Node 실전 패턴
- `14_modern-toolchain-and-pitfalls.mdx` — 최신 컴파일러 동향, 타입 인식 ESLint, 자주 하는 실수
