# Zeno AI Docs

GPT와 명세 주도 문서화(Spec-Driven Documentation)를 활용해 만드는 개인 학습 문서입니다.

---

## How It Works

- **GPT 단일 작업 흐름**: 하나의 GPT가 학습 과목과 웹 기술 문서를 일관된 기준으로 작성하고 검토합니다.
- **분야별 작업 규칙**: `study.md`와 `skill.md`에 문서 형식, 폴더 구조, 시각화와 실습 규칙을 기록합니다. (Instruction-Driven Development)
- **과목별 계획 기반 작성**: `plan-study/`와 `plan-skill/`의 범위와 목차를 먼저 읽고 MDX 문서를 만듭니다. (Plan-Driven Content)
- **문서도 코드처럼 관리**: 문서, 메뉴 설정, 작업 규칙을 Git으로 함께 기록하고 변경 이력을 남깁니다. (Docs as Code)
- **자동 빌드와 배포**: GitHub에 푸시하면 GitHub Actions가 사이트를 빌드하고 GitHub Pages에 배포합니다. (CI/CD)

---

## 디자인 방향

홈 화면은 **Minimal Bento Grid**를 지향합니다. 중앙 프레임 안에 얇은 선과 흑백 카드로 정보를 나누고 실제 학습 흐름을 미리 보여줍니다.

- **Bento Grid**: 과목과 시리즈를 규칙적인 2열 카드로 그룹화
- **Technical Lines**: 얇은 가이드선과 구분선으로 화면 구조를 표현
- **Neutral Palette**: 흰색·회색·검정을 중심으로 사용하고 Zeno 보라색은 활성 상태에만 제한
- **Functional Preview**: 코드, 브라우저, 수식과 차트를 장식이 아닌 학습 미리보기로 사용
- **Typography**: 한글은 Pretendard, 영문과 숫자는 Montserrat 사용

참고 방향: [Cal.com](https://cal.com/), [Laravel](https://laravel.com/)

---

## Structure

- `content/`: 학습 문서(MDX)와 메뉴 설정
- `study.md`: 독학사·시험·자격 학습 문서 지침
- `skill.md`: JavaScript·React 등 웹 기술 문서 지침
- `plan-study/`: 학습 과목별 범위와 목차
- `plan-skill/`: 웹 기술별 범위와 목차
- `AGENTS.md`: 요청한 과목에 맞는 지침을 GPT가 자동으로 찾게 하는 안내 파일

---

## 핵심 패키지

- Next.js: React 기반 웹사이트 제작과 정적 페이지 빌드
- React: 컴포넌트 기반 사용자 인터페이스 구성
- Nextra: MDX 문서를 Next.js 문서 사이트로 변환
- Nextra Docs Theme: 문서 레이아웃, 사이드바, 목차와 검색 UI 제공
- Pagefind: 정적 배포 사이트의 문서 검색 색인 생성
- Tailwind CSS: 프로젝트 스타일 작성과 빌드 처리
- TypeScript: JavaScript 코드의 타입 검사
- ESLint: 코드 오류와 작성 규칙 검사

---

## 추가 패키지

- Mermaid: MDX에서 흐름도, 순서도, 상태도와 관계도 작성 (Nextra의 하위 패키지)
- Recharts: 통계 자료를 막대·선·산점도 등 React 차트로 표현
- JSXGraph: 함수, 벡터, 도형과 미적분을 직접 조작하는 수학 그래프로 표현
- React Flow (`@xyflow/react`): 노드와 연결선을 움직일 수 있는 상호작용 흐름도 제작
- MathJax (`better-react-mathjax`): LaTeX 문법으로 수학·통계 수식을 접근성 있게 표시
- Sandpack (`@codesandbox/sandpack-react`): 문서 안에서 JavaScript·React 코드를 편집하고 실행 결과를 바로 확인
- Montserrat (`@fontsource/montserrat`): 사이트의 영문과 숫자에 사용하는 산세리프 웹폰트

설치 패키지는 필요한 시각화·실습 컴포넌트를 `app/components/`에 만든 뒤 MDX에서 재사용합니다.

---

## Nextra 컴포넌트
- Callout: 중요한 설명·주의사항
- Table: 비교표
- Tabs: 탭 전환
- Steps: 단계별 과정
- Collapse: 접었다 펼치는 설명
- Cards: 문서 링크 카드
- FileTree: 폴더 구조
- Playground: MDX·JSX 예제를 클라이언트에서 동적으로 렌더링 (일반 JavaScript 실행기는 아님)
- ImageZoom: 이미지 확대
- Button, Banner, Popup, Select, Bleed
- Search: 검색

---

## 커스텀 컴포넌트
- Quiz: 선택하면 정답과 해설이 표시되는 퀴즈
- CodePlayground: Sandpack 기반 JavaScript·React 코드 편집 및 실행 실습
- DocsTabs: 프로젝트에 맞게 만든 탭
- DocsBreadcrumb: 상단 경로 표시
- DocsNavbar: 커스텀 헤더와 드롭다운

---
