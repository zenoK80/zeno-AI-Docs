# Zeno AI Docs

AI 에이전트 협업과 명세 주도 문서화(Spec-Driven Documentation)를 적용한 개인 학습 플랫폼입니다. 웹 개발, 독학사, 자격증 학습을 개념 - 예제 - 실습 흐름으로 축적합니다.

## Engineering Approach

- **Multi-Agent Workflow**: Codex와 Claude의 역할을 분리해 문서 생성과 검토에 활용
- **Instruction-Driven Development**: `AGENTS.md`, `CLAUDE.md`에 공통 작업 규칙과 문서 구조를 명세
- **Plan-Driven Content**: `plan-codex/`, `plan-claude/`의 과목별 계획을 기준으로 MDX 문서 작성
- **Docs as Code**: 문서, 메뉴 구조, 작업 규칙을 Git으로 함께 버전 관리
- **CI/CD**: GitHub Actions로 정적 사이트를 자동 빌드하고 GitHub Pages에 배포

## Tech Stack

- Next.js 15, React 19, TypeScript
- Nextra 4, `nextra-theme-docs`
- Tailwind CSS 4, Pagefind
- GitHub Pages, GitHub Actions

## Structure

- `content/`: 학습 문서(MDX)와 메뉴 설정
- `AGENTS.md`, `CLAUDE.md`: AI 에이전트별 작업 지침
- `plan-codex/`, `plan-claude/`: 과목별 문서 작성 계획
