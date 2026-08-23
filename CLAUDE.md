# Claude Code 작업 지침

이 프로젝트는 **Next.js + Nextra** 기반 학습 문서 사이트입니다.
MDX 파일을 작성하거나 수정할 때 아래 규칙을 **반드시** 지켜야 합니다.
규칙을 어기면 빌드가 깨져 사이트가 배포되지 않습니다.

---

## MDX 파싱 규칙 (빌드 에러 방지)

### ❌ JSX prop 안에 작은따옴표 중첩 금지

JSX 컴포넌트의 `{}` 배열이나 문자열 prop 안에서 작은따옴표를 중첩하면 acorn 파싱 에러가 납니다.

```mdx
// ❌ 에러 — 작은따옴표 안에 또 작은따옴표
options={['변수를 'let'으로 선언한다']}
explanation="typeof는 'string'을 반환한다"

// ✅ 수정 — 내부 따옴표 제거
options={['변수를 let으로 선언한다']}
explanation="typeof는 string을 반환한다"
```

### ❌ JSX prop 안에 `<`, `>` 날것 사용 금지

`question=""` 같은 큰따옴표 속성에서 꺾쇠괄호를 쓰면 JSX 태그로 해석됩니다.

```mdx
// ❌ 에러
question="T<string>이란?"
options={['List<T>를 사용한다']}

// ✅ 수정 — HTML entity 사용
question="T&lt;string&gt;이란?"
options={['List&lt;T&gt;를 사용한다']}

// ✅ 또는 꺾쇠 없이 설명
question="제네릭 T(string)이란?"
```

### ❌ 산문(코드블록 밖)에 날것의 `{`, `}` 금지

MDX는 `{}`를 JSX 표현식으로 해석합니다.

```mdx
// ❌ 에러
프로세스 ID는 {pid}로 확인합니다.
환경변수 ${HOME}을 출력합니다.

// ✅ 수정 — 인라인 코드 스팬 사용
프로세스 ID는 `{pid}`로 확인합니다.
환경변수 `$HOME`을 출력합니다.
```

### ❌ 산문에 날것의 `<`, `>` 금지 (코드블록 밖)

```mdx
// ❌ 에러
IP 주소 범위는 0.0.0.0 ~ 255.255.255.255 <클래스 A 이상>

// ✅ 수정
IP 주소 범위는 0.0.0.0 ~ 255.255.255.255 (클래스 A 이상)
```

### ❌ 큰따옴표 속성 안에 백슬래시 이스케이프 금지

```mdx
// ❌ 에러
explanation="브라우저에서 \"module\" 속성이 필요합니다."

// ✅ 수정 — 이스케이프 없이 표현
explanation="브라우저에서 module 속성이 필요합니다."
```

---

## MDX 파일 구조

```mdx
---
title: 'NN. 제목'
description: '설명'
---

<Callout type="info">
  **이번 문서의 목표:** 목표.
</Callout>

## 소제목

내용

## 핵심 정리

## 마무리 복습

<Quiz
  questionNumber={1}
  question="문제?"
  options={['①보기1', '②보기2', '③보기3', '④보기4']}
  correctAnswer={1}
  explanation="해설"
  optionExplanations={['설명1', '설명2', '설명3', '설명4']}
/>
```

---

## Quiz 컴포넌트 규칙

- `import` 없이 전역 컴포넌트로 바로 사용
- `correctAnswer`: **1-indexed** 정수 (1, 2, 3, 4 중 하나)
- 문서 당 마무리 복습 Quiz는 **5~8개** (기출/모의고사 파일은 **15~25개**)
- `question`, `explanation` 속성은 큰따옴표(`"`)로 감싸기
- `options`, `optionExplanations` 배열 원소는 작은따옴표(`'`)로 감싸기
  - **배열 원소 안에 작은따옴표 절대 사용 금지**

---

## 수식 표기

- 인라인 수식: `$수식$`
- 블록 수식: `$$수식$$`
- MathJax 렌더링됨

---

## 기타 전역 컴포넌트

`Callout`, `Quiz`, `Table` — import 없이 사용 가능

---

## 커밋 규칙

- 커밋 메시지에 `Co-Authored-By: Claude` 등 AI 기여자 표시 **절대 금지**
- 커밋 메시지 형식: `docs: 내용 설명`
