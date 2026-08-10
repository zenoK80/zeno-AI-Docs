# TypeScript — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/Typescript/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

TypeScript의 **핵심 사고방식인 타입 좁히기**를 익히고, 클래스와 제네릭을 다룬다.
"타입을 붙이는 것"에서 "타입으로 설계하는 것"으로 넘어가는 단계다.

## 과목 지침

- 좁히기(Part 4)는 이 시리즈에서 **가장 중요한 파트**다. 코드 흐름에 따라 타입이 자동으로 좁혀지는 감각을 예제로 반복시킨다.
- 판별 유니온(`03`)은 실무에서 가장 자주 쓰는 패턴이다. **API 응답 처리** 같은 현실적인 예로 다룬다.
- 제네릭(Part 6)은 초보가 가장 겁내는 부분이다. **"타입을 나중에 정하는 것"** 이라는 한 줄 정의로 시작하고, 화살괄호 문법은 나중에 붙인다.
- 클래스는 React·Node 실무에서 사용 빈도가 낮다. **문법 나열보다 "언제 쓰는가"** 에 무게를 둔다.

### 참고 자료

- 공식 핸드북 — https://www.typescriptlang.org/docs/handbook/intro.html
- 좁히기 (Narrowing) — https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- 제네릭 — https://www.typescriptlang.org/docs/handbook/2/generics.html
- Playground — https://www.typescriptlang.org/play

## 목차 (11편)

### Part 4. 타입 좁히기 (Narrowing)

- `01_narrowing-basics.mdx` — `typeof`·truthiness·동등성·`in`·`instanceof`
- `02_type-guards-and-predicates.mdx` — 사용자 정의 타입 가드(`is`), 단언 함수(`asserts`)
- `03_discriminated-unions.mdx` — 판별 유니온, `never`로 완전성 검사

### Part 5. 클래스와 객체지향

- `04_class-basics.mdx` — 필드·생성자·메서드, 매개변수 프로퍼티
- `05_access-modifiers.mdx` — public·private·protected·readonly, `#private`
- `06_inheritance-and-abstract.mdx` — 상속, 추상 클래스, `implements`
- `07_static-and-accessors.mdx` — 정적 멤버, getter/setter

### Part 6. 제네릭

- `08_generic-functions.mdx` — 제네릭 함수와 타입 추론
- `09_generic-constraints.mdx` — 제약(`extends`), 기본 타입 매개변수
- `10_generic-classes-interfaces.mdx` — 제네릭 클래스·인터페이스
- `11_keyof-and-typeof.mdx` — `keyof`·`typeof` 타입 연산자, 인덱스 접근 타입
