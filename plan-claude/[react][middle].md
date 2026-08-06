# React — 중급 (Middle)

- 담당: Claude
- 콘텐츠 폴더: `content/React/Middle/`
- 공통 작성 규칙은 `CLAUDE.md`를 따른다.

## 이 단계의 목표

**불변성**과 **useEffect**를 제대로 이해한다.
React 초보가 가장 많이 막히는 두 지점이고, 여기를 넘으면 실제 데이터를 다루는 앱을 만들 수 있다.

## 과목 지침

- 불변성은 문법이 아니라 **원리(참조 비교)** 를 먼저 잡고 들어간다. 21~22편이 그 역할이다.
- useEffect 편에서는 **"이 작업이 정말 Effect가 맞는가"** 를 매번 되묻게 한다. 공식 문서의 *You Might Not Need an Effect* 관점을 반영한다.
- 비동기 편(33편)은 ECMAScript 시리즈의 이벤트 루프와 겹친다. 여기서는 **React 관점**으로만 짧게 짚는다.

### 참고 자료

- React 공식 문서 — https://react.dev
- React 한국어 문서 — https://ko.react.dev
- Effect가 필요 없을지도 모릅니다 — https://ko.react.dev/learn/you-might-not-need-an-effect

## 목차 (20편)

### Part 4. 불변성

- `01_pure-components.mdx` — 순수 함수와 순수 컴포넌트, Strict Mode가 두 번 실행하는 이유
- `02_immutability-principle.mdx` — 불변성의 원리, 참조 비교(`Object.is`)와 변화 감지
- `03_immutable-objects.mdx` — 객체 State 업데이트
- `04_immutable-nested.mdx` — 중첩 객체와 깊은 구조 다루기
- `05_immutable-arrays.mdx` — 배열 추가·삭제·수정
- `06_immutable-array-objects.mdx` — 배열 속 객체 일괄 업데이트

### Part 5. State 구조 설계

- `07_lifting-state-up.mdx` — State 끌어올리기, 형제 컴포넌트 간 상태 공유
- `08_state-location-and-key.mdx` — State의 위치와 생명, key로 상태를 보존·리셋하는 원리

### Part 6. 폼

- `09_controlled-vs-uncontrolled.mdx` — 제어 컴포넌트 vs 비제어 컴포넌트
- `10_multiple-inputs.mdx` — 여러 Input 다루기, 객체 State로 폼 관리
- `11_select-checkbox-radio.mdx` — Select · Checkbox · Radio 제어하기
- `12_form-submit-and-validation.mdx` — Form 제출과 유효성 검사

### Part 7. Effect와 비동기

- `13_sync-vs-async.mdx` — 동기 vs 비동기의 원리 (이벤트 루프, 태스크 큐, Promise)
- `14_useeffect-basics.mdx` — useEffect 기초, 화면 밖과 대화하는 법
- `15_useeffect-dependencies.mdx` — 의존성 배열 (없음 / 빈 배열 / 특정 값)과 클로저의 함정
- `16_cleanup-function.mdx` — Cleanup 함수, 정리가 필요한 순간들

### Part 8. 데이터 패칭

- `17_http-basics.mdx` — HTTP의 기본 원리 (요청/응답, 메서드, 상태 코드, CORS)
- `18_fetch-and-axios.mdx` — fetch와 axios, 비동기 요청 다루기
- `19_fetching-with-useeffect.mdx` — useEffect로 데이터 가져오기, 실전 패칭 패턴
- `20_abort-and-error-handling.mdx` — 요청 취소와 에러 처리, AbortController 실무 패턴
