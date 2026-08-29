# 메뉴 구조 가이드

## 원리: content 폴더 구조 = 사이트 메뉴 구조

`content/` 아래의 폴더·파일 구조가 그대로 사이트의 URL과 메뉴가 됩니다.

```
content/
├── _meta.js                  ← 최상위 메뉴 (네비게이션 바)
├── index.mdx                 ← 홈 화면
└── [카테고리]/               ← 예: React
    ├── _meta.js              ← 카테고리 안 과목 목록
    └── [과목]/               ← 예: react
        ├── _meta.js          ← 과목 안 문서 목록 (사이드바)
        └── NN_kebab-case.mdx ← 개별 문서
```

- URL: `content/React/react/04_jsx.mdx` → `/React/react/04_jsx`
- **파일과 `_meta.js` 항목은 항상 세트입니다.** 파일만 만들면 메뉴에 나타나지 않거나 정렬이 깨지고, `_meta.js`에만 적으면 빌드가 깨집니다.

## `_meta.js` 2가지 형식

### 형식 1 — 최하위(과목) 폴더: key-value

파일명(확장자 제외)을 key, 사이드바 표시 제목을 value로 적습니다.
적힌 순서가 곧 사이드바 순서입니다.

```js
const meta = {
  '01_html-css-for-react': '01. HTML·CSS 기초',
  '02_js-for-react': '02. React를 위한 JavaScript',
  '03_react-overview': '03. React란?',
}
export default meta
```

### 형식 2 — 상위(카테고리·최상위) 폴더: `type: 'menu'` + `items` + `href`

최상위 `content/_meta.js`는 네비게이션 바 드롭다운 메뉴를 정의합니다.
`href`는 그 과목의 **첫 번째 문서 전체 경로**로 지정합니다.

```js
const meta = {
  index: {
    title: '홈',
    theme: { layout: 'full', sidebar: false, toc: false },
  },
  React: {
    title: 'React',
    type: 'menu',
    items: {
      react: {
        title: 'React',
        href: '/React/react/01_html-css-for-react',
      },
    },
  },
}
export default meta
```

카테고리 폴더의 `_meta.js`는 과목 폴더를 `type: 'page'`로 나열합니다.

## 절차

### 문서 1개 추가

1. 과목 폴더에 `NN_kebab-case.mdx` 생성 (번호는 기존 순서에 맞게)
2. 같은 폴더 `_meta.js`에 `'NN_파일명': 'NN. 제목'` 항목을 같은 위치에 추가
3. 중간에 끼워 넣는 경우: 뒤 파일들의 번호와 `_meta.js` key·제목을 모두 밀어서 갱신
4. 홈(`content/index.mdx`)에 과목별 문서 수가 표기되어 있으면 그 숫자도 갱신
5. `npm run build`로 확인

### 문서 1개 삭제

1. `.mdx` 파일 삭제
2. `_meta.js`에서 해당 항목 삭제
3. 뒤 파일들의 번호 당김 + 홈 문서 수 갱신 (추가와 동일)

### 과목 추가

1. `content/[카테고리]/[과목]/` 폴더 생성
2. 과목 폴더에 문서들 + 형식 1 `_meta.js` 생성
3. 카테고리 `_meta.js`에 과목 항목 추가
4. 최상위 `content/_meta.js`의 해당 카테고리 `items`에 `href`(첫 문서 경로) 추가
5. 홈 화면에 과목 카드·문서 수 반영

### 과목 삭제

과목 폴더 삭제 → 카테고리 `_meta.js` 항목 삭제 → 최상위 `_meta.js`의 `items` 항목 삭제 → 홈 반영. (역순으로 전부)

### 카테고리 추가·삭제

과목 절차와 동일하되, 최상위 `content/_meta.js`에 `type: 'menu'` 블록 자체를 추가·삭제합니다.

**공통:** 어떤 변경이든 마지막에 `npm run build`가 통과하는지 확인하고, 새 경로로 브라우저 접속까지 확인합니다.
