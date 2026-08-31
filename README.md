# Zeno AI Docs

Next.js + Nextra로 만든 개인 학습 문서 사이트입니다.

요약본은 이미 많아서, 반대로 갔습니다. 한 편을 다 읽으면 그 주제만큼은 남에게 설명할 수 있을 정도까지 파고듭니다. 분량 제한을 두지 않고, 개념마다 왜 그렇게 동작하는지와 자주 틀리는 지점까지 씁니다.

현재 JavaScript(ECMAScript 35편, Web APIs 30편)와 React(기초·중급·실무 46편)를 다룹니다. 문서 안에서 코드를 바로 실행해볼 수 있고(Sandpack), 퀴즈로 확인까지 합니다.

## 문서 제작 파이프라인

문서를 손으로 쓰지 않고, 과목 하나를 5단계로 나눠 각 단계에 맞는 모델에 맡깁니다. 검색이 필요한 단계와 장문을 써야 하는 단계, 검수하는 단계가 각각 잘하는 모델이 다르다고 봤습니다.

| 단계 | 담당 | 하는 일 |
|------|------|---------|
| 1 | Grok | 대상 독자·목표·범위 정의 |
| 2 | Perplexity | 웹 검색으로 자료 조사, 목차 설계 |
| 3 | Claude | 편별 MDX 본문 작성 |
| 4 | Gemini | 사실 확인, 계산 검산, 퀴즈 정답 검증 |
| 5 | GPT | 검수 반영과 내용 보강 |

단계별 지시문은 `prompts/`에, 빌드를 깨뜨리는 MDX 문법 규칙은 `prompts/00_MDX규칙.md`에 정리해뒀습니다.

## 실행

`실행/작업지시.md`에 과목과 주제를 적고 원하는 단계의 bat을 실행합니다. API 키는 `.env.local`에 두고, 호출 비용은 `costs/`에 자동으로 쌓입니다.

Claude Code나 Codex 같은 에이전트에게 "3단계 해줘"라고 시켜도 됩니다. 산출물 경로가 같아서 단계마다 섞어 쓸 수 있습니다. 자세한 옵션은 `guide/run-generate-doc.md`를 보세요.

대량 생성 뒤에는 검사를 돌립니다. 볼드 안에 괄호가 있으면 빌드는 통과하는데 화면에서만 깨지는 식의 함정이 있어서, 자동 검사와 교정을 스크립트로 만들어뒀습니다.

```bash
node scripts/check-mdx.js content   # 규칙 위반 찾기
node scripts/fix-mdx.js content     # 자동 교정
```

## 구조

```
content/    사이트에 올라가는 MDX. 폴더 구조가 곧 메뉴 구조
prompts/    AI 지시문과 단계별 중간 산출물
scripts/    파이프라인 실행기, MDX 검사기, 홈 데이터 생성기
실행/       작업지시서와 단계별 실행 파일
guide/      기술 스택, 메뉴 구조, 실행법 문서
app/        Next.js 앱과 전역 컴포넌트(Quiz, CodePlayground 등)
```

홈의 과목 카드와 문서 수는 `content/`를 스캔해 자동으로 만들어집니다. 과목을 추가하면 홈에도 알아서 반영되니 직접 고치지 않습니다.

## 개발

```bash
npm run dev     # localhost:3000
npm run build   # 정적 빌드 + Pagefind 검색 인덱스
```

Next.js 15, Nextra 4, React 19, TypeScript, Tailwind CSS 4를 쓰고 KaTeX·Mermaid·Recharts·JSXGraph·React Flow·Sandpack으로 문서 안의 수식과 그림, 실행기를 붙였습니다. 자세한 건 `guide/tech-stack.md`에 있습니다.

main에 push하면 GitHub Actions가 빌드해서 GitHub Pages로 배포합니다.
