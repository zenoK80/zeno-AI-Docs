# JavaScript — Web APIs

- 담당: Claude
- 콘텐츠 폴더: `content/javascript/WebAPIs/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

> JavaScript는 기초/중급/고급으로 나누지 않고 **ECMAScript**와 **Web APIs** 둘로만 나눈다.

## 본편과 복습 문서 구성

- 목차의 일반 본편 `NN_slug.mdx`마다 바로 뒤에 `NN_slug-review.mdx`를 한 쌍으로 작성한다.
- 본편은 개념과 예제 중심으로 쓰되, 용어는 등장하는 자리에서 바로 풀어 설명해 흐름이 끊기지 않게 한다.
- 복습편의 퀴즈는 4지선다 객관식으로 만든다. 문제마다 `<Collapse title="정답 보기">`와 `<Collapse title="해설 보기">`를 따로 둔다. 해설은 왜 정답인지·왜 나머지 보기가 틀렸는지를 초보 눈높이 용어로 설명하고, 손으로 해보는 짧은 실습도 함께 담는다.
- 복습편은 10~15분 안에 끝낼 수 있게 만들고 `_meta.js`에서도 본편 바로 다음에 배치한다.
- 기출문제, 실전 모의고사, 종합 프로젝트, 정답·해설 전용 문서, 시험 직전 체크리스트에는 별도 복습편을 만들지 않는다.

## 이 시리즈의 정체성 (가장 중요)

이 시리즈는 **브라우저(호스트 환경)가 제공하는 API**를 다룬다.
ECMAScript 언어 자체(클로저, 프로토타입, `this`, 이터러블 등)는 다루지 않는다.

### 경계선 판별 기준

어떤 주제를 넣을지 헷갈리면 아래 질문을 던진다.

| 질문 | 예 → 이 시리즈 | 아니오 → ECMAScript 시리즈 |
| --- | --- | --- |
| Node.js(브라우저 밖)에는 기본적으로 없는가? | `document`, `fetch`\*, `localStorage` | `Promise`, `class`, `Map` |
| 명세가 WHATWG/W3C에 있는가? | DOM, Fetch, HTML | ECMA-262 (TC39) |
| 렌더링·사용자 상호작용·네트워크와 관련 있는가? | 이벤트, 리플로우, CORS | 스코프, 호이스팅 |

\* `fetch`, `setTimeout`처럼 Node.js에도 이식된 API는 **"원래 브라우저(WHATWG) 명세의 API"** 임을 명시하고 다룬다.

ECMAScript 개념이 전제 지식으로 필요한 경우(예: 이벤트 루프의 Promise, Worker의 구조화 복제)에는
**"전제 지식" 콜아웃으로 짧게 링크만** 하고 본문에서 재설명하지 않는다.

## 참고 자료와 검증

- 1차 출처: **MDN Web Docs**, **WHATWG 명세**(HTML Living Standard, DOM Standard, Fetch Standard)
- 설명 방식 참고: ko.javascript.info 2·3부 (친절한 단계식 설명 + 실습 과제 스타일)
- 모든 API는 작성 시점의 MDN 문서와 대조해 시그니처·동작을 검증한다. **기억에 의존해 쓰지 않는다.**
- 브라우저 지원 현황은 MDN의 **Baseline** 표기를 기준으로 적는다. (예: "Baseline 2023", "실험적 — Chrome만 지원")

## 품질 체크리스트 (문서 완성 시 확인)

- [ ] ECMAScript 내용이 본문에 섞여 있지 않은가? (콜아웃 링크로 처리했는가)
- [ ] 모든 코드가 실제로 실행되는가?
- [ ] MDN 최신 문서와 대조했는가? (deprecated API를 현행처럼 쓰지 않았는가)
- [ ] Baseline·호환성 정보가 있는가?
- [ ] "흔한 실수" 섹션에 실무 함정이 최소 1개 있는가?
- [ ] 보안에 민감한 API(`innerHTML`, `postMessage`, cookie 등)에 경고가 있는가?
- [ ] 요약과 참고 자료 섹션이 있는가?

## 목차 (128편)

### Part 1. 브라우저와 실행 환경

- `01_what-is-web-apis.mdx` — Web APIs란?
- `02_ecmascript-web-api-boundary.mdx` — ECMAScript와 Web API의 경계
- `03_browser-architecture-process-model.mdx` — 브라우저 구조와 프로세스 모델
- `04_rendering-engine-and-javascript-engine.mdx` — 렌더링 엔진과 JavaScript 엔진
- `05_window-and-global-environment.mdx` — `window`와 브라우저 전역 환경
- `06_bom-dom-cssom.mdx` — BOM·DOM·CSSOM의 관계
- `07_document-navigator-screen.mdx` — document·navigator·screen 객체
- `08_script-loading.mdx` — 스크립트 로딩: defer·async·module
- `09_es-modules-and-import-maps.mdx` — ES Module·동적 import·Import Maps
- `10_parsing-and-execution-order.mdx` — 문서 파싱과 스크립트 실행 순서
- `11_browser-event-loop.mdx` — 브라우저 이벤트 루프: 태스크·마이크로태스크·rAF
- `12_page-lifecycle.mdx` — 페이지 라이프사이클: DOMContentLoaded·load·visibilitychange·bfcache

### Part 2. HTML과 DOM

- `13_html-to-dom-tree.mdx` — HTML이 DOM 트리로 만들어지는 과정
- `14_dom-tree-and-node-types.mdx` — DOM 트리와 노드 타입
- `15_node-element-htmlelement.mdx` — Node·Element·HTMLElement의 관계
- `16_dom-traversal.mdx` — DOM 탐색과 부모·자식·형제 관계
- `17_nodelist-and-htmlcollection.mdx` — NodeList·HTMLCollection·라이브 컬렉션
- `18_queryselector-matches-closest.mdx` — 요소 검색: querySelector·matches·closest
- `19_node-properties.mdx` — 주요 노드 프로퍼티
- `20_innerhtml-textcontent-innertext.mdx` — innerHTML·textContent·innerText
- `21_attribute-property-dataset.mdx` — Attribute·Property·dataset·boolean attribute
- `22_creating-and-removing-elements.mdx` — DOM 요소 생성·삽입·교체·삭제
- `23_insertadjacenthtml-documentfragment.mdx` — insertAdjacentHTML·DocumentFragment
- `24_clonenode-importnode-adoptnode.mdx` — cloneNode·importNode·adoptNode
- `25_dom-string-injection-security.mdx` — DOM 문자열 삽입과 보안
- `26_form-elements.mdx` — HTML 폼 요소와 form.elements
- `27_constraint-validation-api.mdx` — 폼 입력값과 Constraint Validation API
- `28_focus-and-accessibility.mdx` — focus·tabindex·inert·dialog·Popover·접근성

### Part 3. CSSOM과 렌더링

- `29_cssom-and-style-computation.mdx` — CSSOM과 스타일 계산
- `30_classlist-style-getcomputedstyle.mdx` — classList·style·getComputedStyle
- `31_stylesheets-and-cssrule.mdx` — styleSheets·CSSRule·동적 스타일시트
- `32_custom-properties-with-js.mdx` — CSS Custom Properties와 JavaScript
- `33_matchmedia-and-typed-om.mdx` — matchMedia와 CSS Typed OM
- `34_element-size-and-position.mdx` — 요소의 크기와 좌표
- `35_offset-client-scroll.mdx` — offset·client·scroll 계열 프로퍼티
- `36_getboundingclientrect-and-viewport.mdx` — getBoundingClientRect·Viewport·Visual Viewport
- `37_scroll-control.mdx` — 스크롤 제어와 scrollIntoView
- `38_rendering-pipeline.mdx` — 렌더링 파이프라인: 레이아웃·페인트·컴포지팅
- `39_reflow-and-layout-thrashing.mdx` — 리플로우·리페인트·레이아웃 스래싱
- `40_web-animations-api.mdx` — Web Animations API·CSS Animation 제어·View Transitions

### Part 4. Template과 Web Components

- `41_template-element.mdx` — template 요소와 template.content
- `42_template-cloning-and-rendering.mdx` — Template 복제와 렌더링
- `43_shadow-dom-basics.mdx` — Shadow DOM 기초와 attachShadow
- `44_shadow-dom-styling.mdx` — 스타일 격리와 :host·::slotted·::part
- `45_adoptedstylesheets.mdx` — adoptedStyleSheets와 Declarative Shadow DOM
- `46_custom-elements.mdx` — Custom Elements와 class extends HTMLElement
- `47_custom-element-lifecycle.mdx` — Custom Element 생명주기 콜백
- `48_observedattributes.mdx` — observedAttributes와 Attribute·Property 연결
- `49_slot-and-customevent.mdx` — slot·Shadow DOM 이벤트·CustomEvent
- `50_elementinternals.mdx` — ElementInternals와 실전 Web Component 설계·배포

### Part 5. 브라우저 이벤트와 사용자 입력

- `51_events-and-event-object.mdx` — 브라우저 이벤트와 Event 객체
- `52_addeventlistener-options.mdx` — addEventListener와 리스너 옵션
- `53_target-and-event-path.mdx` — target·currentTarget·이벤트 경로
- `54_bubbling-and-capturing.mdx` — 버블링·캡처링·전파 중단
- `55_event-delegation.mdx` — 이벤트 위임
- `56_preventdefault.mdx` — 기본 동작과 preventDefault
- `57_customevent-and-dispatchevent.mdx` — CustomEvent와 dispatchEvent
- `58_mouse-pointer-touch-keyboard.mdx` — 마우스·포인터·터치·키보드 이벤트
- `59_input-and-composition-events.mdx` — input·beforeinput·change·submit·Composition Event
- `60_drag-and-drop-clipboard.mdx` — 드래그 앤 드롭과 Clipboard API

### Part 6. URL·탐색·창

- `61_url-and-searchparams.mdx` — URL API와 URLSearchParams
- `62_location.mdx` — Location과 페이지 이동
- `63_history-api.mdx` — History API와 SPA 라우팅
- `64_navigation-api.mdx` — Navigation API
- `65_window-open-iframe-postmessage.mdx` — window.open·iframe·sandbox·postMessage

### Part 7. HTTP와 네트워크

- `66_http-from-browser.mdx` — 브라우저 관점의 HTTP
- `67_http-methods-status-headers.mdx` — HTTP 메서드·상태 코드·헤더
- `68_http-cache.mdx` — 브라우저 HTTP 캐시와 Cache-Control·ETag
- `69_fetch-basics.mdx` — Fetch API 기본
- `70_request-response-headers.mdx` — Request·Response·Headers
- `71_response-body-types.mdx` — JSON·텍스트·Blob 응답 처리
- `72_fetch-streams.mdx` — Fetch 스트림과 Streams API
- `73_abortcontroller.mdx` — AbortController·취소·타임아웃
- `74_formdata-and-upload.mdx` — FormData·파일 업로드·XMLHttpRequest
- `75_same-origin-policy-and-cors.mdx` — 동일 출처 정책과 CORS
- `76_preflight-and-credentials.mdx` — Preflight·Credentials·쿠키 전송
- `77_websocket-and-sse.mdx` — WebSocket·Server-Sent Events
- `78_webrtc-and-webtransport.mdx` — WebRTC·WebTransport
- `79_sendbeacon-and-resource-hints.mdx` — sendBeacon·리소스 힌트·Speculation Rules API

### Part 8. 쿠키·저장소·파일

- `80_cookies.mdx` — 쿠키와 document.cookie
- `81_cookie-attributes.mdx` — SameSite·Secure·HttpOnly·Cookie Store API
- `82_web-storage.mdx` — localStorage·sessionStorage·storage 이벤트
- `83_indexeddb.mdx` — IndexedDB
- `84_cache-api.mdx` — Cache API
- `85_storage-api-and-opfs.mdx` — Storage API·quota·persist·OPFS
- `86_choosing-storage.mdx` — 브라우저 저장소 선택 기준
- `87_arraybuffer-and-typedarray.mdx` — ArrayBuffer·TypedArray·DataView
- `88_blob-and-file.mdx` — Blob·Object URL·File·FileReader
- `89_file-system-access-api.mdx` — File System Access API
- `90_textencoder-and-compression.mdx` — TextEncoder·TextDecoder·Compression Streams

### Part 9. 그래픽·미디어·실시간 처리

- `91_canvas-2d.mdx` — Canvas 2D
- `92_canvas-images-and-offscreen.mdx` — Canvas 이미지·픽셀·OffscreenCanvas
- `93_svg-dom.mdx` — SVG와 SVG DOM
- `94_webgl-and-webgpu.mdx` — WebGL과 WebGPU
- `95_media-elements.mdx` — video·audio와 HTMLMediaElement
- `96_mse-and-webcodecs.mdx` — Media Source Extensions와 WebCodecs
- `97_getusermedia.mdx` — getUserMedia와 MediaDevices
- `98_mediarecorder-and-screen-capture.mdx` — MediaRecorder와 Screen Capture API
- `99_web-audio-api.mdx` — Web Audio API
- `100_fullscreen-pip-wakelock.mdx` — Fullscreen·Picture-in-Picture·Wake Lock

### Part 10. Observer·Worker·PWA

- `101_mutationobserver.mdx` — MutationObserver
- `102_intersectionobserver.mdx` — IntersectionObserver와 Lazy Loading
- `103_resizeobserver.mdx` — ResizeObserver와 브라우저 상태 감지
- `104_web-workers.mdx` — Web Workers
- `105_structured-clone-and-transferable.mdx` — 구조화 복제·Transferable·postMessage
- `106_messagechannel-and-broadcastchannel.mdx` — MessageChannel·BroadcastChannel·SharedWorker
- `107_service-worker-lifecycle.mdx` — Service Worker 생명주기와 요청 가로채기
- `108_service-worker-caching.mdx` — Service Worker 캐싱 전략
- `109_background-sync-and-push.mdx` — Background Sync·Push·Notification
- `110_pwa.mdx` — PWA·Web App Manifest·설치·오프라인·업데이트

### Part 11. 운영체제·디바이스·사용자 기능

- `111_web-share-and-handlers.mdx` — Web Share·Badging·File Handling·Protocol Handler
- `112_geolocation.mdx` — Geolocation API
- `113_device-sensors.mdx` — Device Orientation·Device Motion·Vibration
- `114_web-bluetooth-usb-serial.mdx` — Web Bluetooth·Web USB·Web Serial
- `115_permissions-api.mdx` — Permissions API와 권한 UX
- `116_credential-management-and-webauthn.mdx` — Credential Management API와 WebAuthn
- `117_payment-speech-and-misc.mdx` — Payment Request·Web Speech·Contact Picker·EyeDropper

### Part 12. 성능·메모리·보안·개발

- `118_performance-api.mdx` — Performance API와 Timing API
- `119_core-web-vitals.mdx` — Core Web Vitals·PerformanceObserver·Long Tasks
- `120_requestidlecallback-and-scheduler.mdx` — requestIdleCallback·scheduler.postTask
- `121_browser-memory.mdx` — 브라우저 메모리와 메모리 누수
- `122_cleanup-patterns.mdx` — 분리된 DOM·리스너·타이머·Observer 정리
- `123_origin-and-site.mdx` — Origin·Site·동일 출처 정책 총정리
- `124_csp-xss-trusted-types.mdx` — Content Security Policy·XSS·Trusted Types
- `125_clickjacking-and-web-crypto.mdx` — Clickjacking·Web Crypto·Secure Context
- `126_coop-coep.mdx` — COOP·COEP·교차 출처 격리·SharedArrayBuffer
- `127_intl.mdx` — 브라우저 국제화와 Intl
- `128_devtools-and-compatibility.mdx` — Chrome DevTools·호환성·MDN Baseline·용어집
