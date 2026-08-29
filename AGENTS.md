# AGENTS.md — 프로젝트 안내판

이 프로젝트는 **Next.js + Nextra** 기반 학습 문서 사이트입니다.
이 파일은 얇은 안내판입니다. 세부 규칙은 아래 문서 지도의 각 파일에 있으므로,
작업 종류에 맞는 파일을 **먼저 읽고** 시작하세요.

## 문서 지도

| 파일 | 내용 |
|------|------|
| [guide/tech-stack.md](guide/tech-stack.md) | 프레임워크, 전역 컴포넌트, 시각화 라이브러리와 래퍼 매핑, 실행·빌드 명령어 |
| [guide/menu-structure.md](guide/menu-structure.md) | content 폴더 구조 = 메뉴 구조 원리, `_meta.js` 작성법, 문서·과목·카테고리 추가/삭제 절차 |
| [prompts/01_학습방향.md](prompts/01_학습방향.md) | 1단계: 과목 컨셉 정의 |
| [prompts/02_목차구성.md](prompts/02_목차구성.md) | 2단계: 자료 조사 + 목차 설계 (Perplexity 담당) |
| [prompts/03_초안작성.md](prompts/03_초안작성.md) | 3단계: 순수 마크다운 초안 작성 + 글 품질 규칙 (GPT 담당) |
| [prompts/04_검수.md](prompts/04_검수.md) | 4단계: 사실 확인·검산·퀴즈 검증 (Gemini 담당) |
| [prompts/05_최종완성.md](prompts/05_최종완성.md) | 5단계: MDX 변환·배치·빌드·커밋 + MDX 금지 규칙 (Claude 담당) |

## 과목 제작 흐름 (5단계)

과목 하나를 만들 때 아래 순서로 진행합니다.
각 단계의 중간 산출물은 `prompts/plan/[과목]/`에 저장하고,
**사용자가 검토·승인한 뒤에만** 다음 단계로 넘어갑니다.

1. **학습 방향** — 과목 컨셉 정의 → `prompts/plan/[과목]/01_학습방향.md`
2. **목차 구성** — 자료 조사 + 목차 설계 → `prompts/plan/[과목]/02_목차.md`
3. **초안 작성** — 편별 순수 마크다운 초안 → `prompts/plan/[과목]/03_초안/NN_파일명.md`
4. **검수** — 사실 확인·검산·퀴즈 정답 검증 → `prompts/plan/[과목]/04_검수.md`
5. **최종 완성** — 검수 반영 + MDX 변환 + content 배치 + 빌드 확인 + 커밋

## 공통 규칙

- **파일명**: `NN_kebab-case.mdx` (NN은 두 자리 숫자: 01, 02, … 10, 11, …)
- **frontmatter**: `title`, `description` 두 개만 사용
- **참고 자료**: 모든 MDX 파일은 예외 없이 맨 아래에 `## 참고 자료` 섹션을 두고, 실제 참고한 공식 문서·1차 출처만 링크
- **content 파일과 `_meta.js`는 항상 세트**: 문서를 추가·삭제하면 반드시 해당 폴더의 `_meta.js`도 함께 수정 (자세한 절차는 guide/menu-structure.md)
- **커밋 규칙**:
  - 메시지 형식: `docs: 내용 설명`
  - AI 어시스턴트 서명·공동 작성자 표시(Co-Authored-By 등) 금지
  - 과목 1개 완성 후 즉시 커밋·push
