# CSS — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/css/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 본편 `NN_slug.mdx` 맨 아래에 마무리 복습(`## 마무리 복습`)을 포함한다. 별도 `-review.mdx` 파일은 만들지 않는다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 마무리 복습의 퀴즈는 4지선다 객관식 2~4문제로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 필요하면 손으로 해보는 아주 짧은 실습도 뒤에 덧붙인다.
- 마무리 복습을 포함해도 본편 전체가 5분을 넘지 않게 조절한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

최신 CSS 문법으로 **코드를 구조화**하고, 시각 효과를 다루고,
접근성·성능·설계 방법론까지 챙겨 **유지보수 가능한 CSS**를 짜는 단계다.

## 과목 지침

- 이 단계는 신기능 비중이 높다. **모든 기능에 Baseline 표기와 폴백 전략을 함께 적는다.**
- `@supports`를 이용한 점진적 향상 패턴을 반복해서 보여준다.
- 설계 방법론(BEM, ITCSS, 유틸리티 퍼스트)은 정답을 고르지 말고 **선택 기준**을 제시한다.
- 참고: MDN CSS, W3C CSS 명세, Chrome for Developers 블로그, web.dev

## 목차 (12편)

### Part 8. 최신 고급 문법

- `01_nesting.mdx` — 네이티브 CSS 중첩(`&` 사용법)
- `02_scope.mdx` — `@scope`로 스타일 범위 제한
- `03_math-functions.mdx` — `calc()`, `clamp()`, `min()`, `max()`, `round()`
- `04_conditional-css.mdx` — `if()` 함수, 스타일 쿼리 기반 조건 스타일
- `05_mixins.mdx` — `@mixin` / `@apply` (네이티브 믹스인)

### Part 9. 시각 효과

- `06_filters-and-blend.mdx` — `filter`, `backdrop-filter`, `mix-blend-mode`
- `07_clipping-masking-shapes.mdx` — `clip-path`, `mask`, `shape-outside`

### Part 10. 접근성 · 성능 · 아키텍처

- `08_accessibility.mdx` — `prefers-reduced-motion`/`color-scheme`, `forced-colors`, `accent-color`
- `09_performance.mdx` — `contain`, `content-visibility`, `will-change`
- `10_forms-ui-styling.mdx` — 폼 스타일링, 커스터마이즈 가능한 `select`
- `11_architecture-methodologies.mdx` — BEM, ITCSS, 유틸리티 퍼스트, 설계 전략
- `12_debugging-devtools.mdx` — DevTools 활용, `@supports`, 폴백·점진적 향상
