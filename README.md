# Zeno AI Docs

AI를 활용해 설계하고, 직접 검토하며 쌓아가는 개인 학습 문서 사이트입니다. 웹 개발, 독학사, 자격증 학습을 개념 - 예제 - 실습 흐름으로 정리합니다.

## Highlights

- Codex와 Claude를 목차 설계, 초안 작성, 문서 구조화에 활용
- 최종 학습 내용은 직접 확인하고 보완
- MDX 기반 문서, 과목별 드롭다운, 현재 학습 경로 중심의 사이드바
- 정적 검색과 GitHub Actions 자동 배포

## Tech Stack

- Next.js 15, React 19, TypeScript
- Nextra 4, `nextra-theme-docs`
- Tailwind CSS 4, Pagefind
- GitHub Pages, GitHub Actions

`shadcn/ui`는 현재 사용하지 않습니다. Nextra 기본 문서 테마와 프로젝트 스타일을 사용합니다.

## Run

```bash
npm install
npm run dev
```

## Project Structure

- `content/`: 학습 문서(MDX)와 메뉴 설정
- `plan-codex/`, `plan-claude/`: AI별 문서 작성 계획
- 헤더는 `content/` 폴더 구조를 바탕으로 만들고, 사이드바는 Nextra가 현재 문서 경로를 펼쳐서 보여줍니다.
