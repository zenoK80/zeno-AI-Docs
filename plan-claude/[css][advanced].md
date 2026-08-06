# CSS — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/css/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

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
