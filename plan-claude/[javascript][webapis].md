# JavaScript — Web APIs

## 범위와 목표

- 위치: `content/javascript/WebAPIs/`
- 브라우저와 웹 플랫폼이 JavaScript에 제공하는 기능을 배운다.
- 문서 변경, 이벤트, 네트워크, 저장소처럼 실제 웹 화면을 다루는 흐름을 익힌다.
- 변수, 함수, 객체 등 언어 자체의 규칙은 ECMAScript 계획에서 다룬다.

## 작성 기준

- 각 API가 해결하는 문제를 작은 화면·데이터 사례로 먼저 보여 준다.
- 코드만 두지 않고 실행 뒤 화면이나 데이터가 어떻게 바뀌는지 함께 설명한다.
- 지원 범위, 보안 조건, 사용자 권한이 필요한 API는 그 자리에서 짚는다.
- 비슷한 API는 선택 기준을 표로 비교하고, 처리 흐름은 필요할 때 Mermaid로 보여 준다.
- 본문 약 5분 뒤 같은 문서의 4지선다 3문제로 복습한다.

## 목차 (30편)

1. `01_what-are-web-apis.mdx` — Web API와 ECMAScript의 경계
2. `02_browser-and-web-page.mdx` — 브라우저, 탭, 문서의 관계
3. `03_dom-tree-and-selection.mdx` — DOM 트리와 요소 찾기
4. `04_changing-the-dom.mdx` — 내용과 요소 변경
5. `05_attributes-classes-and-styles.mdx` — 속성, 클래스, 인라인 스타일
6. `06_events.mdx` — 이벤트 등록과 이벤트 객체
7. `07_event-flow.mdx` — 캡처링, 버블링, 위임
8. `08_forms-and-validation.mdx` — 폼 값과 유효성 검사
9. `09_fetch-basics.mdx` — 서버에 요청 보내기
10. `10_http-response-and-json.mdx` — 상태 코드, 헤더, JSON
11. `11_network-errors-and-abort.mdx` — 실패 처리와 요청 취소
12. `12_url-location-and-history.mdx` — 주소와 브라우저 기록
13. `13_cookies-and-web-storage.mdx` — 쿠키, localStorage, sessionStorage
14. `14_indexeddb.mdx` — 구조화된 브라우저 데이터 저장
15. `15_timers-and-animation-frame.mdx` — 타이머와 화면 갱신 예약
16. `16_rendering-pipeline.mdx` — 스타일, 레이아웃, 페인트
17. `17_observer-apis.mdx` — Intersection, Resize, Mutation Observer
18. `18_canvas-basics.mdx` — Canvas 2D 그리기
19. `19_media.mdx` — 오디오와 비디오 제어
20. `20_files-and-blobs.mdx` — 파일 선택, Blob, Object URL
21. `21_clipboard-and-drag-drop.mdx` — 클립보드와 드래그 앤 드롭
22. `22_web-workers.mdx` — 별도 스레드에서 계산하기
23. `23_service-workers-and-pwa.mdx` — 오프라인 처리와 설치형 웹 앱
24. `24_websocket-and-sse.mdx` — 실시간 통신
25. `25_geolocation-and-device-apis.mdx` — 위치와 기기 기능
26. `26_permissions.mdx` — 사용자 권한 확인과 요청
27. `27_origin-cors-and-csp.mdx` — 출처, CORS, 콘텐츠 보안 정책
28. `28_performance-apis.mdx` — 성능 측정과 병목 찾기
29. `29_accessibility-apis.mdx` — 접근 가능한 DOM과 사용자 설정
30. `30_web-apis-mini-project.mdx` — 웹 API 종합 미니 프로젝트

## 기준 자료

- [MDN Web APIs](https://developer.mozilla.org/docs/Web/API)
- [WHATWG DOM Standard](https://dom.spec.whatwg.org/)
- [WHATWG HTML Standard](https://html.spec.whatwg.org/)
- [Web IDL Standard](https://webidl.spec.whatwg.org/)
