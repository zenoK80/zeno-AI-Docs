# 파이프라인 스크립트 직접 구현 가이드

과목 제작 5단계(학습방향→목차→초안→검수→최종완성)를 API로 자동 실행하는
`scripts/generate-doc.js`를 **직접 만들면서 배우는** 가이드입니다.
장 순서대로 파일을 하나씩 만들고, 각 장 끝의 **체크포인트**로 그때까지 만든 걸 검증하세요.

## 0장 — 전체 그림

### 목표 구조

```
scripts/
├── generate-doc.js        # CLI 진입점: 인자 파싱 → step 모듈 순차 호출
├── lib/
│   ├── env.js             # .env.local 로딩 (dotenv 설치 없이)
│   ├── api.js             # 제공자(AI 회사) 표 + chat() 공용 호출 함수
│   └── files.js           # plan 폴더 경로 계산, 파일 읽기/쓰기, 목차 표 파싱
└── steps/
    ├── step1-direction.js # 학습방향 초안 (Grok)
    ├── step2-toc.js       # 목차구성 (Perplexity)
    ├── step3-draft.js     # 초안작성 (GPT) — 편별 루프
    ├── step4-review.js    # 검수 (Gemini)
    └── step5-finalize.js  # MDX 변환 (Claude) + content 배치 + _meta.js + 빌드
```

### 핵심 아이디어 3가지

1. **모든 단계는 같은 패턴이다**: `입력 파일 읽기 → 프롬프트 조립(prompts/0N_*.md가 system) → API 호출 → 산출물 저장`. 그래서 공용 함수(lib/)를 먼저 만들고, 각 단계는 얇은 모듈로 만든다.
2. **5개 회사 API를 코드 하나로 부른다**: Perplexity·OpenAI·Gemini·xAI·Anthropic 전부 **OpenAI 호환 chat/completions** 엔드포인트를 제공한다. URL과 키만 다르고 요청·응답 모양이 같아서, `chat()` 함수 하나로 전부 커버된다.
3. **단계 사이의 산출물은 전부 파일**(`prompts/plan/[과목]/`)이다. 그래서 한 단계씩 돌리고 검토할 수도 있고(`--step 3`), 쭉 이어 돌릴 수도 있다(`--step 1-5`) — 이어 돌려도 산출물이 다 남아서 나중에 검토 가능.

### 시작 전 확인

- Node 18 이상 (`node --version`) — 내장 `fetch`를 쓰기 때문. 지금 24라 충분.
- `.env.local`에 키 5개: `PERPLEXITY_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `XAI_API_KEY`, `CLAUDE_API_KEY` ✅ 이미 있음
- 폴더 생성: `scripts/lib/`, `scripts/steps/`

---

## 1장 — lib/env.js (.env.local 로딩)

dotenv 패키지 없이 직접 파싱합니다. `KEY=VALUE` 줄을 정규식으로 읽어 `process.env`에 넣는 게 전부입니다.

```js
// scripts/lib/env.js
const fs = require('fs')
const path = require('path')

// __dirname = scripts/lib → 두 단계 위가 프로젝트 루트
const ROOT = path.join(__dirname, '..', '..')

function loadEnvLocal() {
  const envPath = path.join(ROOT, '.env.local')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    // "KEY=VALUE" 형태만 매칭. #주석·빈 줄은 자동으로 걸러짐
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) {
      // 값을 "..." 나 '...' 로 감쌌어도 벗겨서 저장
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  }
}

module.exports = { ROOT, loadEnvLocal }
```

읽는 법:
- `split(/\r?\n/)` — Windows(CRLF)·유닉스(LF) 줄바꿈 둘 다 처리.
- `!(m[1] in process.env)` — 터미널에서 직접 지정한 환경변수가 있으면 그걸 우선.
- `ROOT`를 여기서 export해 두면 다른 모듈이 경로 계산할 때 재사용.

**체크포인트 1**

```bash
node -e "const e=require('./scripts/lib/env'); e.loadEnvLocal(); console.log('키 로딩:', !!process.env.OPENAI_API_KEY)"
```

`키 로딩: true`가 나오면 통과.

---

## 2장 — lib/api.js (제공자 표 + 공용 호출기)

### 제공자 표

다섯 회사 모두 OpenAI 호환 엔드포인트가 있습니다. 이 표가 이 파일의 심장입니다.

| 제공자 | 엔드포인트 | 키 | 기본 모델 |
|--------|-----------|-----|----------|
| perplexity | `https://api.perplexity.ai/chat/completions` | PERPLEXITY_API_KEY | sonar-pro |
| openai | `https://api.openai.com/v1/chat/completions` | OPENAI_API_KEY | gpt-5.1 |
| gemini | `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions` | GEMINI_API_KEY | gemini-2.5-pro |
| grok | `https://api.x.ai/v1/chat/completions` | XAI_API_KEY | grok-4 |
| claude | `https://api.anthropic.com/v1/chat/completions` | CLAUDE_API_KEY | claude-sonnet-5 |

```js
// scripts/lib/api.js
const PROVIDERS = {
  perplexity: {
    url: 'https://api.perplexity.ai/chat/completions',
    keyEnv: 'PERPLEXITY_API_KEY',
    model: process.env.PPLX_MODEL || 'sonar-pro',
  },
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    keyEnv: 'OPENAI_API_KEY',
    model: process.env.OPENAI_MODEL || 'gpt-5.1',
  },
  gemini: {
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    keyEnv: 'GEMINI_API_KEY',
    model: process.env.GEMINI_MODEL || 'gemini-2.5-pro',
  },
  grok: {
    url: 'https://api.x.ai/v1/chat/completions',
    keyEnv: 'XAI_API_KEY',
    model: process.env.XAI_MODEL || 'grok-4',
  },
  claude: {
    url: 'https://api.anthropic.com/v1/chat/completions',
    keyEnv: 'CLAUDE_API_KEY',
    model: process.env.CLAUDE_MODEL || 'claude-sonnet-5',
  },
}

/**
 * 공용 챗 호출.
 * @param providerName PROVIDERS의 키 ('openai' 등)
 * @param systemPrompt prompts/0N_*.md 내용이 들어감
 * @param userPrompt   단계별 입력(학습방향, 목차, 초안 등)
 * @param overrides    { model } — CLI --model 덮어쓰기용
 */
async function chat(providerName, systemPrompt, userPrompt, overrides = {}) {
  const p = PROVIDERS[providerName]
  if (!p) throw new Error(`알 수 없는 제공자: ${providerName} (가능: ${Object.keys(PROVIDERS).join(', ')})`)
  const key = process.env[p.keyEnv]
  if (!key) throw new Error(`${p.keyEnv} 가 .env.local에 없습니다.`)
  const model = overrides.model || p.model

  console.log(`  → ${providerName} (${model}) 호출 중...`)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10 * 60 * 1000) // 10분 타임아웃
  try {
    const res = await fetch(p.url, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    })
    if (!res.ok) {
      throw new Error(`${providerName} API 오류 ${res.status}: ${(await res.text()).slice(0, 500)}`)
    }
    const data = await res.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) throw new Error(`${providerName} 응답에 내용 없음: ${JSON.stringify(data).slice(0, 300)}`)
    if (data.usage) {
      console.log(`  ← 완료 (입력 ${data.usage.prompt_tokens} / 출력 ${data.usage.completion_tokens} 토큰)`)
    }
    return content
  } finally {
    clearTimeout(timer)
  }
}

module.exports = { PROVIDERS, chat }
```

읽는 법:
- **모든 회사가 같은 요청 형식**: `{ model, messages: [{role, content}...] }`, 응답은 `choices[0].message.content`. 이게 "OpenAI 호환"의 의미.
- `AbortController` + `setTimeout` — fetch에는 기본 타임아웃이 없어서, 10분 넘게 매달리면 끊는다.
- `overrides.model` — 나중에 CLI의 `--model` 값이 여기로 들어온다.
- 에러는 `throw` — 종료 처리는 진입점(generate-doc.js)에서 한 번만.

**체크포인트 2** — 실제 API를 가장 싼 호출로 한 번 테스트:

```bash
node -e "require('./scripts/lib/env').loadEnvLocal(); require('./scripts/lib/api').chat('openai','한 단어로만 답하라','안녕이라고 말해봐').then(console.log)"
```

인사말이 출력되면 통과. (다른 제공자도 이름만 바꿔 같은 방식으로 테스트 가능)

---

## 3장 — lib/files.js (경로 규약 + 파일 IO + 목차 파싱)

```js
// scripts/lib/files.js
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./env')

const PROMPTS_DIR = path.join(ROOT, 'prompts')

/** 과목명 → 관련 경로 묶음 */
function subjectDirs(subject) {
  const plan = path.join(PROMPTS_DIR, 'plan', subject)
  return { plan, draft: path.join(plan, '03_초안') }
}

function readOrFail(file, hint) {
  if (!fs.existsSync(file)) {
    throw new Error(`${path.relative(ROOT, file)} 이 없습니다. ${hint || ''}`)
  }
  return fs.readFileSync(file, 'utf8')
}

/** 지시문(prompts/0N_*.md) 읽기 */
function readInstruction(name) {
  return readOrFail(path.join(PROMPTS_DIR, name))
}

function writeOut(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content.endsWith('\n') ? content : content + '\n', 'utf8')
  console.log(`  저장: ${path.relative(ROOT, file)}`)
}

/**
 * 02_목차.md의 목차 표에서 편 목록 추출.
 * "| 01_intro | 01. 개요 | ..." 형태의 행을 찾는다.
 */
function parseToc(tocMarkdown) {
  const episodes = []
  for (const line of tocMarkdown.split(/\r?\n/)) {
    const m = line.match(/^\|\s*(\d{2}_[A-Za-z0-9-]+)\s*\|\s*([^|]+)\|/)
    if (m) episodes.push({ file: m[1], title: m[2].trim() })
  }
  return episodes
}

module.exports = { PROMPTS_DIR, subjectDirs, readOrFail, readInstruction, writeOut, parseToc }
```

읽는 법:
- `parseToc`의 정규식: `^\|` 표 행 시작 → `(\d{2}_[A-Za-z0-9-]+)` 파일명(NN_kebab-case) → 다음 칸 `([^|]+)` 제목. prompts/02가 산출물 형식을 표로 고정해 놨기 때문에 이 파싱이 성립한다 — **지시문의 출력 형식과 파서는 한 몸**이니 02_목차구성.md의 표 형식을 바꾸면 여기도 같이 바꿔야 한다.
- `writeOut`은 폴더가 없으면 만들어서(`recursive: true`) 저장.

**체크포인트 3**

```bash
node -e "const f=require('./scripts/lib/files'); console.log(f.parseToc('| 01_intro | 01. 개요 | 선행 | x | - |'))"
```

`[ { file: '01_intro', title: '01. 개요' } ]` 나오면 통과.

---

## 4장 — steps/step1-direction.js (학습방향, Grok)

이제 단계 모듈. 모든 단계가 받는 인자를 통일합니다: `run(dirs, opts, chatFn)`.
- `dirs`: 3장의 `subjectDirs()` 결과
- `opts`: CLI 옵션 전체 (`subject`, `file`, `all`, `topic` 등)
- `chatFn(system, user)`: 제공자·모델이 이미 결정된 호출 함수 (9장에서 조립)

```js
// scripts/steps/step1-direction.js
const path = require('path')
const { readInstruction, writeOut } = require('../lib/files')

module.exports = {
  name: '학습방향',
  provider: 'grok',
  async run(dirs, opts, chat) {
    const instruction = readInstruction('01_학습방향.md')
    const topic = opts.topic || opts.subject
    const result = await chat(
      instruction,
      [
        `과목: ${topic}`,
        '',
        '위 과목에 대해 지시문의 6개 항목(대상 독자/학습 목표/범위/깊이/실습 비중/배치 경로)을',
        '전부 채운 학습 방향 문서 초안을 산출물 형식대로 작성하라.',
        '사용자와 대화할 수 없는 일괄 실행 상황이므로, 질문 대신 합리적인 초안을 제안하라.',
        `배치 경로의 과목 폴더명은 "${opts.subject}"를 사용하라.`,
      ].join('\n')
    )
    writeOut(path.join(dirs.plan, '01_학습방향.md'), result)
  },
}
```

읽는 법:
- 원래 1단계는 대화형인데, 일괄 실행에서는 대화가 불가능하므로 "질문 대신 초안 제안"으로 지시를 바꿔 태운다. **생성된 초안은 반드시 검토·수정할 것** (뒤 4개 단계가 전부 이 파일을 믿고 달린다).
- `--topic "리눅스 기초(LPIC 수준)"` 처럼 폴더명과 다른 상세 주제를 줄 수 있게 `opts.topic` 우선.

## 5장 — steps/step2-toc.js (목차구성, Perplexity)

```js
// scripts/steps/step2-toc.js
const path = require('path')
const { readInstruction, readOrFail, writeOut } = require('../lib/files')

module.exports = {
  name: '목차구성',
  provider: 'perplexity',
  async run(dirs, opts, chat) {
    const instruction = readInstruction('02_목차구성.md')
    const direction = readOrFail(
      path.join(dirs.plan, '01_학습방향.md'),
      '1단계를 먼저 실행하세요 (--step 1).'
    )
    const result = await chat(
      instruction,
      `다음은 이 과목의 학습 방향이다. 이 컨셉에 맞게 자료 조사와 목차 설계를 수행하라.\n\n${direction}`
    )
    writeOut(path.join(dirs.plan, '02_목차.md'), result)
  },
}
```

패턴이 보이죠? **지시문 = system, 이전 산출물 = user.** 이후 단계도 동일.

## 6장 — steps/step3-draft.js (초안, GPT — 편별 루프)

3단계만 특별합니다: 산출물이 파일 하나가 아니라 **편별 여러 파일**이라 루프가 필요합니다.

```js
// scripts/steps/step3-draft.js
const fs = require('fs')
const path = require('path')
const { readInstruction, readOrFail, writeOut, parseToc } = require('../lib/files')

module.exports = {
  name: '초안작성',
  provider: 'openai',
  async run(dirs, opts, chat) {
    const instruction = readInstruction('03_초안작성.md')
    const direction = readOrFail(path.join(dirs.plan, '01_학습방향.md'), '1단계를 먼저.')
    const toc = readOrFail(path.join(dirs.plan, '02_목차.md'), '2단계를 먼저.')

    let episodes = parseToc(toc)
    if (!episodes.length) throw new Error('02_목차.md에서 목차 표를 찾지 못했습니다.')

    if (opts.file) {
      // --file 05 또는 --file 05_full-name 둘 다 허용
      episodes = episodes.filter((e) => e.file === opts.file || e.file.startsWith(opts.file))
      if (!episodes.length) throw new Error(`--file ${opts.file} 에 해당하는 편이 없습니다.`)
    } else if (!opts.all) {
      // 기본: 이미 만든 편은 건너뛴다 (중간에 끊겨도 이어서 실행 가능)
      episodes = episodes.filter((e) => !fs.existsSync(path.join(dirs.draft, `${e.file}.md`)))
      if (!episodes.length) return console.log('  모든 초안이 이미 존재합니다 (--all로 재생성).')
    }

    console.log(`  총 ${episodes.length}편 생성`)
    for (const [i, ep] of episodes.entries()) {
      console.log(`  [${i + 1}/${episodes.length}] ${ep.file} — ${ep.title}`)
      const result = await chat(
        instruction,
        [
          '# 학습 방향', direction,
          '# 전체 목차', toc,
          '# 이번 작업',
          `위 목차 중 **${ep.file} (${ep.title})** 한 편의 초안만 지시문대로 작성하라.`,
          '다른 편에 배정된 내용을 여기서 미리 다 설명하지 말고 이 편의 개념에 집중하라.',
        ].join('\n\n')
      )
      writeOut(path.join(dirs.draft, `${ep.file}.md`), result)
    }
  },
}
```

읽는 법:
- 매 편마다 **전체 목차를 같이** 보낸다 — 어디까지가 자기 편인지 알아야 중복을 안 만든다.
- "없는 편만 생성"이 기본이라, 30편 돌리다 15편에서 끊겨도 같은 명령으로 이어진다.
- 루프는 순차(await) — 병렬로 쏘면 API 속도 제한(rate limit)에 걸리기 쉽다.

## 7장 — steps/step4-review.js (검수, Gemini)

```js
// scripts/steps/step4-review.js
const fs = require('fs')
const path = require('path')
const { readInstruction, readOrFail, writeOut } = require('../lib/files')

module.exports = {
  name: '검수',
  provider: 'gemini',
  async run(dirs, opts, chat) {
    const instruction = readInstruction('04_검수.md')
    const toc = readOrFail(path.join(dirs.plan, '02_목차.md'), '2단계를 먼저.')
    if (!fs.existsSync(dirs.draft)) throw new Error('03_초안/ 이 없습니다. 3단계를 먼저.')
    const files = fs.readdirSync(dirs.draft).filter((f) => f.endsWith('.md')).sort()
    if (!files.length) throw new Error('03_초안/ 이 비어 있습니다.')

    const drafts = files
      .map((f) => `\n\n===== 파일: ${f} =====\n\n${fs.readFileSync(path.join(dirs.draft, f), 'utf8')}`)
      .join('')

    console.log(`  초안 ${files.length}편 검수`)
    const result = await chat(
      instruction,
      `다음은 전체 목차와 초안 전체다. 체크리스트대로 전 파일을 검수하라.\n\n# 전체 목차\n${toc}\n\n# 초안 전체${drafts}`
    )
    // 교차 검수(--provider grok 등)를 돌리면 파일명을 분리해 원본을 보존
    const out = opts.provider ? `04_검수_${opts.provider}.md` : '04_검수.md'
    writeOut(path.join(dirs.plan, out), result)
  },
}
```

읽는 법:
- 초안 **전체를 한 번에** 보낸다 — 파일 간 중복·순서 문제는 전체를 봐야 잡힌다. Gemini를 검수에 배치한 이유(긴 컨텍스트).
- 편수가 아주 많아 컨텍스트 초과 에러가 나면, 절반씩 나눠 두 번 돌리는 개선을 나중에 추가하면 된다.

## 8장 — steps/step5-finalize.js (MDX 변환, Claude)

가장 긴 모듈. 하는 일: ① 초안+검수를 파일별로 Claude에 보내 MDX로 변환 ② `content/`에 저장 ③ 목차 기반으로 leaf `_meta.js` 자동 생성 ④ `npm run build` 실행.

```js
// scripts/steps/step5-finalize.js
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { ROOT } = require('../lib/env')
const { readInstruction, readOrFail, writeOut, parseToc } = require('../lib/files')

/** 02_목차.md에서 "배치 경로: content/..." 줄을 찾는다 */
function findContentPath(toc) {
  const m = toc.match(/content\/[A-Za-z0-9_\-/]+/)
  if (!m) throw new Error('02_목차.md에서 배치 경로(content/...)를 찾지 못했습니다.')
  return m[0].replace(/\/$/, '')
}

module.exports = {
  name: '최종완성',
  provider: 'claude',
  async run(dirs, opts, chat) {
    const instruction = readInstruction('05_최종완성.md')
    const toc = readOrFail(path.join(dirs.plan, '02_목차.md'), '2단계를 먼저.')
    const review = fs.existsSync(path.join(dirs.plan, '04_검수.md'))
      ? fs.readFileSync(path.join(dirs.plan, '04_검수.md'), 'utf8')
      : '(검수 결과 없음 — 초안을 그대로 변환)'
    const episodes = parseToc(toc)
    const contentDir = path.join(ROOT, findContentPath(toc))

    // ① 파일별 MDX 변환
    for (const [i, ep] of episodes.entries()) {
      const draftPath = path.join(dirs.draft, `${ep.file}.md`)
      if (!fs.existsSync(draftPath)) { console.log(`  건너뜀(초안 없음): ${ep.file}`); continue }
      const outPath = path.join(contentDir, `${ep.file}.mdx`)
      if (!opts.all && fs.existsSync(outPath)) { console.log(`  건너뜀(이미 변환됨): ${ep.file}`); continue }

      console.log(`  [${i + 1}/${episodes.length}] ${ep.file} MDX 변환`)
      const mdx = await chat(
        instruction,
        [
          '# 검수 결과 (이 파일에 해당하는 지적을 반영하라)', review,
          `# 변환 대상 초안: ${ep.file} (${ep.title})`, fs.readFileSync(draftPath, 'utf8'),
          '# 이번 작업',
          '위 초안을 지시문의 MDX 규칙(금지 규칙 전부 포함)에 따라 완성된 .mdx 파일 내용으로 변환하라.',
          '코드펜스로 감싸지 말고 mdx 파일 본문만 출력하라. frontmatter(title, description)부터 시작하라.',
        ].join('\n\n')
      )
      // 모델이 습관적으로 ```mdx 로 감쌌으면 벗긴다
      const clean = mdx.replace(/^```mdx?\r?\n/, '').replace(/\r?\n```\s*$/, '')
      writeOut(outPath, clean)
    }

    // ② leaf _meta.js 자동 생성 (목차 표 = 사이드바 순서)
    const metaBody = episodes.map((e) => `  '${e.file}': '${e.title.replace(/'/g, '')}',`).join('\n')
    writeOut(path.join(contentDir, '_meta.js'), `const meta = {\n${metaBody}\n}\nexport default meta\n`)

    // ③ 빌드 확인
    console.log('  npm run build 실행...')
    execSync('npm run build', { cwd: ROOT, stdio: 'inherit' })

    console.log(`
  남은 수동 작업:
  1. content/_meta.js(최상위)에 카테고리·과목 연결 (guide/menu-structure.md 참고)
  2. 브라우저에서 표본 확인 (볼드 깨짐은 빌드로 안 걸러짐)
  3. 커밋 (docs: 형식, AI 서명 금지)`)
  },
}
```

읽는 법:
- MDX 규칙 검증까지 API에 다 맡길 수는 없으니, **빌드가 최종 심판**이다. 빌드가 깨지면 해당 .mdx를 열어 05 지시문의 금지 규칙과 대조해 고친다 (Claude Code에게 맡겨도 됨).
- 최상위 `_meta.js` 연결은 카테고리 구조 판단이 필요해서 수동으로 남겼다 — leaf는 목차 그대로라 기계적으로 만들 수 있다.
- `--all` 없이는 이미 변환된 편을 건너뛰므로, 특정 편만 다시 변환하려면 그 .mdx를 지우고 재실행.

---

## 9장 — generate-doc.js (CLI 진입점: 단건·범위·모델 선택)

```js
// scripts/generate-doc.js
const { loadEnvLocal } = require('./lib/env')
loadEnvLocal() // PROVIDERS가 env를 읽기 전에 반드시 먼저!

const { chat } = require('./lib/api')
const { subjectDirs } = require('./lib/files')

const STEPS = {
  1: require('./steps/step1-direction'),
  2: require('./steps/step2-toc'),
  3: require('./steps/step3-draft'),
  4: require('./steps/step4-review'),
  5: require('./steps/step5-finalize'),
}

function parseArgs(argv) {
  const opts = { all: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--subject') opts.subject = argv[++i]
    else if (a === '--step') opts.step = argv[++i]
    else if (a === '--topic') opts.topic = argv[++i]
    else if (a === '--file') opts.file = argv[++i]
    else if (a === '--all') opts.all = true
    else if (a === '--provider') opts.provider = argv[++i]
    else if (a === '--model') opts.model = argv[++i]
    else { console.error(`알 수 없는 옵션: ${a}`); process.exit(1) }
  }
  return opts
}

/** "3" → [3], "1-5" → [1,2,3,4,5] */
function parseStepRange(s) {
  const m = String(s).match(/^([1-5])(?:-([1-5]))?$/)
  if (!m) return null
  const from = +m[1], to = +(m[2] || m[1])
  if (to < from) return null
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

function usage() {
  console.log(`사용법: node scripts/generate-doc.js --subject <과목폴더명> --step <N | N-M> [옵션]

  --step 3            3단계만 실행
  --step 1-5          1~5단계 연속 일괄 실행
  --topic "..."       1단계에 줄 상세 주제 (기본: subject)
  --file 05           3단계에서 특정 편만
  --all               이미 있는 산출물도 다시 생성
  --provider grok     이번 실행의 담당 AI 교체 (perplexity|openai|gemini|grok|claude)
  --model <id>        모델만 교체 (예: --model sonar-reasoning-pro)

기본 담당: 1 Grok / 2 Perplexity / 3 GPT / 4 Gemini / 5 Claude
단계 산출물: prompts/plan/<과목>/ — 각 단계 후 검토 권장`)
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const steps = opts.step && parseStepRange(opts.step)
  if (!opts.subject || !steps) { usage(); process.exit(opts.subject || opts.step ? 1 : 0) }

  const dirs = subjectDirs(opts.subject)
  for (const n of steps) {
    const step = STEPS[n]
    const provider = opts.provider || step.provider
    console.log(`\n===== ${n}단계 ${step.name} (${provider}) =====`)
    // 단계 모듈에는 "제공자·모델이 이미 결정된" chat 함수를 넘긴다
    const chatFn = (system, user) => chat(provider, system, user, { model: opts.model })
    await step.run(dirs, opts, chatFn)
  }
  console.log('\n완료. 산출물을 검토하세요: prompts/plan/' + opts.subject)
}

main().catch((e) => { console.error(`\n오류: ${e.message}`); process.exit(1) })
```

읽는 법:
- `STEPS` 표 + 각 모듈의 `{ name, provider, run }` 인터페이스 — 진입점은 단계 내용을 몰라도 된다. 단계를 고치고 싶으면 그 모듈만 열면 됨.
- `parseStepRange`가 "쭉쭉 일괄"(`1-5`)과 "단계별"(`3`)을 모두 처리. 범위 실행 중 한 단계가 throw하면 루프가 멈추고 어느 단계였는지 헤더 로그로 보인다. 이미 만든 산출물은 남아 있으니 고치고 같은 명령을 다시 돌리면 이어서 진행된다.
- `--provider`는 **실행하는 모든 단계**에 적용되므로, 담당 교체는 단건 실행(`--step 4 --provider grok`)과 함께 쓰는 게 자연스럽다.

**최종 체크포인트**

```bash
node scripts/generate-doc.js
```

사용법이 출력되면:

```bash
node scripts/generate-doc.js --subject __test__ --step 2
```

"1단계를 먼저 실행하세요" 오류가 나면 배선 완료. 이제 실전:

```bash
node scripts/generate-doc.js --subject git --topic "Git 기초부터 실무까지" --step 1
# → prompts/plan/git/01_학습방향.md 검토·수정 후
node scripts/generate-doc.js --subject git --step 2-4
# → 산출물 검토 후
node scripts/generate-doc.js --subject git --step 5
```

---

## 부록 — 흔한 문제

| 증상 | 원인·해결 |
|------|-----------|
| `401 Unauthorized` | 키 오타 또는 결제 미등록. `.env.local` 값 확인 |
| `404 model not found` | 모델명이 그 회사에 없음. `--model`이나 .env의 `*_MODEL`로 유효한 모델 지정 |
| `429 rate limit` | 잠시 후 재실행 (없는 편만 이어서 생성되므로 안전) |
| 컨텍스트 초과(4단계) | 초안이 매우 많을 때. 절반씩 나눠 검수하도록 개선 여지 |
| 5단계 빌드 실패 | 생성된 .mdx가 금지 규칙 위반. 에러에 찍힌 파일을 prompts/05 규칙과 대조해 수정 |
| 한글 깨짐 | 저장은 전부 `utf8` 명시라 정상. 터미널 표시 문제면 `chcp 65001` |
