# React — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/React/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 문제마다 `<Collapse title="정답 보기">`와 `<Collapse title="해설 보기">`를 따로 둔다. 해설은 왜 정답인지·왜 나머지 보기가 틀렸는지를 초보 눈높이 용어로 설명하고, 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

훅이 **어떻게 값을 기억하는지** 원리를 이해하고, 커스텀 훅으로 로직을 재사용한다.
성능 최적화와 스타일링 전략까지 다뤄 **실무 수준의 React 코드**를 짤 수 있게 된다.

## 과목 지침

- 성능 최적화 편(08)은 반드시 **"먼저 측정하라"** 는 원칙을 앞세운다. `memo`/`useMemo`/`useCallback`을 습관적으로 바르는 것은 안티패턴임을 분명히 한다.
- React Compiler가 이 판단을 바꾸고 있으므로, 작성 시점의 **공식 문서에서 현재 상태를 확인**하고 쓴다.
- 마지막 편(15)은 버전 변화 정리다. React 18 → 19에서 무엇이 바뀌었는지 **공식 블로그로 확인**하고 쓴다.

### 참고 자료

- React 공식 문서 — https://react.dev
- React 한국어 문서 — https://ko.react.dev
- React 블로그(버전별 변경사항) — https://react.dev/blog
- 레거시 문서(구버전 확인용) — https://legacy.reactjs.org

## 목차 (15편)

### Part 9. 훅의 원리와 재사용

- `01_how-hooks-work.mdx` — 훅의 동작 원리, 호출 순서 규칙과 훅이 값을 기억하는 방법
- `02_custom-hooks.mdx` — 커스텀 훅 만들기, 재사용 가능한 로직 분리
- `03_useref-values.mdx` — useRef ① 렌더링과 무관한 값 기억하기
- `04_useref-dom.mdx` — useRef ② DOM 직접 접근하기 (focus, 스크롤)
- `05_usecontext.mdx` — useContext, Props 드릴링 없이 데이터 내려보내기
- `06_usereducer.mdx` — useReducer, 복잡한 State 로직을 한곳에 모으기

### Part 10. 성능과 디버깅

- `07_memoization-principle.mdx` — 메모이제이션의 원리, 참조 동일성과 리렌더링의 관계
- `08_performance-optimization.mdx` — memo, useMemo, useCallback 언제 쓰고 언제 안 쓰나
- `09_error-boundary.mdx` — Error Boundary, 에러가 나도 앱 전체가 죽지 않게
- `10_react-devtools.mdx` — React Developer Tools로 컴포넌트·상태 디버깅하기

### Part 11. 스타일링

- `11_css-principles.mdx` — CSS 적용의 원리, 캐스케이드·명시도와 전역 범위의 문제
- `12_vanilla-css-and-modules.mdx` — 스타일링 ① Vanilla CSS와 CSS Modules
- `13_css-in-js.mdx` — 스타일링 ② CSS-in-JS와 조건부 스타일
- `14_tailwind-and-ui-libraries.mdx` — 스타일링 ③ Tailwind CSS와 UI 라이브러리

### Part 12. 마무리

- `15_react-18-to-19.mdx` — React 18 → 19 변화 정리, 구버전 문법과 새 문법 비교
