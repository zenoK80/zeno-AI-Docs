# HTML — 고급 (Advanced)

- 담당: Claude
- 콘텐츠 폴더: `content/html/Advanced/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 이 단계의 목표

Canvas로 그림을 그리고, 접근성·성능·SEO를 챙기고,
Web Components 같은 **웹 플랫폼의 고급 기능**까지 다룬다.

## 과목 지침

- Canvas 편은 코드가 길어지기 쉽다. **한 편에 개념 하나**를 지키고, 예제는 짧게 완결시킨다.
- 접근성 편은 "ARIA를 쓰지 않는 것이 최선"이라는 원칙(시맨틱 우선)을 분명히 한다.
- Web Components(33~36편)는 Browser JavaScript 시리즈와 주제가 겹친다. 여기서는 **마크업 관점**으로만 다루고, JS API 심화는 그쪽으로 넘긴다.
- 참고: MDN HTML·Canvas API, WHATWG HTML Living Standard, web.dev, [WAI-ARIA 저작 관행](https://www.w3.org/WAI/ARIA/apg/)

## 목차 (16편)

### Part 6. Canvas · 그래픽

- `01_canvas-basics.mdx` — canvas 요소, 2D 렌더링 컨텍스트 잡기
- `02_canvas-shapes-and-paths.mdx` — 도형·경로, 선/채우기·색상·그라디언트·패턴
- `03_canvas-text-and-images.mdx` — 텍스트 렌더링, drawImage, 픽셀 조작(ImageData)
- `04_canvas-transforms-and-animation.mdx` — 변형(translate·rotate·scale), requestAnimationFrame 애니메이션
- `05_intro-to-webgl.mdx` — WebGL/3D 그래픽 개요와 Canvas와의 관계

### Part 7. 접근성 · 성능 · SEO

- `06_accessibility-and-aria.mdx` — 시맨틱 우선 원칙, ARIA 역할·상태, 키보드 접근성
- `07_performance-optimization.mdx` — loading·decoding·fetchpriority, preload/prefetch, 리소스 힌트
- `08_seo-and-structured-data.mdx` — 메타 태그, Open Graph, JSON-LD 구조화 데이터

### Part 8. 고급 플랫폼 기능

- `09_data-attributes-and-dataset.mdx` — `data-*` 커스텀 속성과 dataset 연동
- `10_web-components-custom-elements.mdx` — Custom Elements, 라이프사이클 콜백
- `11_shadow-dom.mdx` — 캡슐화, 스타일 격리, `::part`
- `12_templates-and-slots.mdx` — template·slot으로 재사용 마크업
- `13_drag-and-drop-api.mdx` — 네이티브 드래그 앤 드롭
- `14_web-storage-and-state.mdx` — localStorage/sessionStorage, 클라이언트 상태 개요
- `15_pwa-and-web-manifest.mdx` — 웹 앱 매니페스트, 설치형 웹 기초
- `16_html-best-practices.mdx` — 마무리: 유효성 검사, 시맨틱 원칙, 실전 체크리스트
