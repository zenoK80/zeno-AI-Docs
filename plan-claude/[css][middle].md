# CSS — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/css/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 본편 `NN_slug.mdx` 맨 아래에 마무리 복습(`## 마무리 복습`)을 포함한다. 별도 `-review.mdx` 파일은 만들지 않는다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 마무리 복습의 퀴즈는 4지선다 객관식 2~4문제로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 필요하면 손으로 해보는 아주 짧은 실습도 뒤에 덧붙인다.
- 마무리 복습을 포함해도 본편 전체가 5분을 넘지 않게 조절한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

**레이아웃**을 자유롭게 짤 수 있게 된다. Flexbox와 Grid로 화면을 배치하고,
화면 크기에 반응하게 만들고, 움직임(모션)을 넣는 단계다.

기초에서 배운 재료로 **실제 페이지를 완성할 수 있는 수준**이 목표다.

## 과목 지침

- 레이아웃 편은 "언제 Flexbox, 언제 Grid"의 판단 기준을 반드시 넣는다.
- 모션 편은 성능(합성 레이어, `will-change`)과 접근성(`prefers-reduced-motion`)을 함께 언급한다.
- 신문법(Subgrid, Masonry, 앵커 포지셔닝, View Transitions)은 **Baseline 표기를 확인하고 명시**한다.
- 참고: MDN CSS, web.dev(Learn CSS · Learn Responsive Design), Chrome for Developers 블로그

## 목차 (15편)

### Part 5. 레이아웃

- `01_display-and-flow.mdx` — `display` 값, 일반 흐름, BFC
- `02_flexbox.mdx` — Flexbox 완전 정복
- `03_grid.mdx` — Grid 레이아웃
- `04_subgrid.mdx` — Subgrid로 중첩 그리드 정렬
- `05_masonry.mdx` — 메이슨리(Grid lanes) 레이아웃
- `06_positioning.mdx` — static/relative/absolute/fixed/sticky, `z-index`
- `07_anchor-positioning.mdx` — 앵커 포지셔닝(툴팁·팝오버 배치)

### Part 6. 반응형 · 컨텍스트

- `08_responsive-media-queries.mdx` — 반응형 설계, 미디어 쿼리, 범위 문법
- `09_container-queries.mdx` — 컨테이너 크기 쿼리 + 스타일 쿼리

### Part 7. 모션

- `10_transforms.mdx` — translate/rotate/scale, 3D, perspective
- `11_transitions.mdx` — `transition`, timing-function, `transition-behavior`
- `12_animations.mdx` — `@keyframes`, `animation` 속성
- `13_scroll-driven-animations.mdx` — 스크롤 기반 애니메이션(scroll/view timeline)
- `14_view-transitions.mdx` — View Transitions API(동일/교차 문서)
- `15_entry-exit-animations.mdx` — `@starting-style`, `display` 애니메이션, 진입/퇴장
