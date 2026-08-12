# HTML — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/html/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 본편과 복습 문서 구성

- 본편 `NN_slug.mdx` 맨 아래에 마무리 복습(`## 마무리 복습`)을 포함한다. 별도 `-review.mdx` 파일은 만들지 않는다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 마무리 복습의 퀴즈는 4지선다 객관식 2~4문제로 만든다. 전역 등록된 `<Quiz>` 컴포넌트에 `questionNumber`, `question`, `options`, `correctAnswer`, `explanation`, `optionExplanations`를 모두 채워서 쓴다. `correctAnswer`는 1부터 시작하는 정답 보기 번호이고, `optionExplanations`는 4개 보기 순서에 맞춰 각 보기가 왜 맞고 왜 틀렸는지 전부 설명한다. 독자가 보기를 클릭하면 그 자리에서 정답 여부와 해설이 나오므로 `Collapse`나 텍스트 목록으로 나열하지 않는다. 필요하면 손으로 해보는 아주 짧은 실습도 뒤에 덧붙인다.
- 마무리 복습을 포함해도 본편 전체가 5분을 넘지 않게 조절한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 단계의 목표

**미디어와 폼**을 다룬다. 이미지·영상을 반응형으로 넣고,
사용자 입력을 받는 폼을 제대로 만들고, JS 없이도 동작하는 모던 인터랙티브 요소를 쓸 수 있게 된다.

## 과목 지침

- 폼 편은 **접근성(label 연결, 에러 안내)** 을 반드시 함께 다룬다.
- `dialog`, `popover`, invoker commands, customizable select 등 모던 요소는 **Baseline 표기와 폴백**을 명시한다.
- iframe·embed는 **sandbox·allow 등 보안 속성**을 반드시 함께 설명한다.
- 참고: MDN HTML, WHATWG HTML Living Standard, [Open UI](https://open-ui.org/), web.dev(Learn Forms)

## 목차 (14편)

### Part 3. 이미지 · 미디어

- `01_images-and-responsive-images.mdx` — img·alt, srcset/sizes/picture, `loading="lazy"`
- `02_audio-and-video.mdx` — audio·video, track(자막), 미디어 속성과 제어
- `03_svg-in-html.mdx` — 인라인 SVG 기초, 아이콘·도형
- `04_embedding-content.mdx` — iframe·embed·object, sandbox·allow 보안 속성

### Part 4. 폼

- `05_forms-basics.mdx` — form·input·label, method/action, 제출 흐름
- `06_input-types.mdx` — text·email·number·date·range·color·file 등 input 타입 총정리
- `07_form-validation.mdx` — 제약 검증(required·pattern·min/max), Constraint Validation API
- `08_advanced-form-controls.mdx` — textarea·select·optgroup·datalist·fieldset·output
- `09_customizable-select.mdx` — `appearance: base-select`, `::picker(select)`, selectedcontent

### Part 5. 인터랙티브 · 모던 컴포넌트

- `10_details-and-summary.mdx` — 네이티브 디스클로저·아코디언
- `11_dialog-element.mdx` — 네이티브 모달, `showModal()`, light dismiss
- `12_popover-api.mdx` — popover 속성, popovertarget, top layer
- `13_invoker-commands.mdx` — command/commandfor로 만드는 선언적 액션(JS 없는 UI)
- `14_tooltips-and-interest-invokers.mdx` — `popover="hint"`, interest invokers로 툴팁·하버카드
