# Zeno AI Docs

AI 에이전트 협업과 명세 주도 문서화(Spec-Driven Documentation)를 적용한 개인 학습 플랫폼입니다.

## How It Works

- **AI 역할 분리**: Codex와 Claude에 맡길 과목과 작업을 나누고, 문서 생성과 검토에 함께 활용합니다. (Multi-Agent Workflow)
- **작업 규칙 문서화**: `AGENTS.md`, `CLAUDE.md`에 문서 형식, 폴더 구조, 작업 시 지킬 규칙을 기록합니다.
- **과목별 계획 기반 작성**: `plan-codex/`, `plan-claude/`에 목차와 작성 방향을 먼저 정한 뒤 MDX 문서를 만듭니다.
- **문서도 코드처럼 관리**: 문서, 메뉴 설정, 작업 규칙을 Git으로 함께 기록하고 변경 이력을 남깁니다. (Docs as Code)
- **자동 빌드와 배포**: GitHub에 푸시하면 GitHub Actions가 사이트를 빌드하고 GitHub Pages에 배포합니다. (CI/CD)

## Tech Stack

- Next.js 15, React 19, TypeScript
- Nextra 4, `nextra-theme-docs`
- Tailwind CSS 4, Pagefind
- GitHub Pages, GitHub Actions

## Structure

- `content/`: 학습 문서(MDX)와 메뉴 설정
- `AGENTS.md`, `CLAUDE.md`: AI 에이전트별 작업 지침
- `plan-codex/`, `plan-claude/`: 과목별 문서 작성 계획
