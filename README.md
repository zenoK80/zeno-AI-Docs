# Zeno AI Docs

AI를 활용해 개인 학습 내용을 정리하는 문서 사이트입니다. 웹 개발, 독학사, 자격증 학습 내용을 초보자도 따라가기 쉽게 MDX 문서로 기록합니다.

## Tech Stack

- **Framework**: Next.js 15, React 19, TypeScript
- **Documentation**: Nextra 4, `nextra-theme-docs`
- **Styling**: Tailwind CSS 4, Nextra Docs Theme
- **Search**: Pagefind
- **Deployment**: GitHub Pages, GitHub Actions

> `shadcn/ui`는 현재 사용하지 않습니다. Nextra의 기본 문서 테마와 프로젝트 스타일을 사용합니다.

## AI Workflow

- Codex와 Claude를 문서 작성과 구조화에 활용합니다.
- 과목별 계획 문서를 기준으로 학습용 MDX를 작성합니다.
- 최종 내용은 직접 확인하고 보완합니다.

## Run

```bash
npm install
npm run dev
```

## Structure

- `content/`: 실제 학습 문서(MDX)와 Nextra 메뉴 설정
- `plan-codex/`, `plan-claude/`: AI별 문서 작성 계획
- `AGENTS.md`, `CLAUDE.md`: 작업 규칙과 문서 구조 가이드

## Navigation

- **Header**: `app/components/docs-navbar.tsx`가 `content/`의 폴더 구조를 읽어 상단 메뉴와 드롭다운을 만듭니다. 폴더명 표시는 각 `_meta.js`에서 정합니다.
- **Sidebar**: Nextra 기본 사이드바입니다. 현재 문서 경로만 펼치고, 다른 과목은 자동으로 접힙니다.
- 새 문서나 폴더를 추가할 때는 해당 폴더의 `_meta.js`도 함께 수정합니다.
