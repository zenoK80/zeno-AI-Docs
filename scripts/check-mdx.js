//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. prompts/00_MDX규칙.md 의 금지 규칙을 자동으로 검사하는 도구
//    (빌드 전에 미리 걸러내기 위함 — 특히 "볼드 끝 문장부호 + 바로 글자"는
//     빌드를 통과하고 렌더링만 깨지므로 사람 눈으로는 못 잡는다.
//     조건의 실측 근거: insight/01_mdx-볼드-렌더링-깨짐.md)
// 2. 사용법: node scripts/check-mdx.js [경로...]
//    예) node scripts/check-mdx.js prompts/plan/web_apis/03_초안
//        node scripts/check-mdx.js content
//    경로를 안 주면 prompts/plan/*/03_초안 과 content 전체를 검사한다
// 3. 코드블록(``` ... ```)과 인라인 코드(`...`) 안은 검사에서 제외한다 —
//    그 안에서는 금지 문자가 정상이기 때문
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')

//----------------------------------------------------------------------------------
// [1] 검사 대상 .mdx 파일 수집
//----------------------------------------------------------------------------------
function collectFiles(target) {
  const abs = path.isAbsolute(target) ? target : path.join(ROOT, target)
  if (!fs.existsSync(abs)) return []
  if (fs.statSync(abs).isFile()) return abs.endsWith('.mdx') ? [abs] : []
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .flatMap((d) => collectFiles(path.join(abs, d.name)))
}

//----------------------------------------------------------------------------------
// [2] 코드·수식 영역 제거
// - 역할: 아래 영역은 금지 문자가 정상이므로 공백으로 치환해 검사에서 뺀다.
//         줄 번호가 어긋나지 않도록 줄바꿈은 보존한다.
//   ① ```펜스``` ② $$수식$$ / $수식$ (KaTeX)
//   ③ 백틱 템플릿 리터럴 (CodePlayground files 안의 여러 줄 코드 포함)
//----------------------------------------------------------------------------------
function blank(m) {
  return m.replace(/[^\n]/g, ' ')
}

function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/\$\$[\s\S]*?\$\$/g, blank)
    .replace(/`(?:\\`|[^`])*`/g, blank)
    .replace(/\$[^$\n]+\$/g, blank)
}

//----------------------------------------------------------------------------------
// [3] 규칙별 검사
// - 각 규칙은 { name, find(줄, 줄번호, 원본줄) } 형태로 위반 메시지를 돌려준다
//----------------------------------------------------------------------------------
const RULES = [
  {
    // 볼드 내용이 문장부호로 끝나고 닫는 ** 바로 뒤에 글자가 오면 볼드가 깨진다.
    // (CommonMark: 앞이 문장부호·뒤가 글자면 그 ** 는 "닫는 기호"로 인정되지 않는다)
    // 예) **"위치 기준"**이라는  →  **"위치 기준"** 이라는 / "위치 기준"이라는
    name: '볼드 끝 문장부호 + 바로 글자 (렌더링 깨짐)',
    find: (line) => {
      const parts = line.split('**')
      for (let i = 1; i < parts.length - 1; i += 2) {
        const inside = parts[i]
        const after = parts[i + 1]
        if (!inside || !after) continue
        const lastCh = inside[inside.length - 1]
        const nextCh = after[0]
        if (/[”’"'\)\]\}»….,!?%:;]/u.test(lastCh) && /[\p{L}\p{N}]/u.test(nextCh)) {
          return `**${inside.slice(-25)}**${after.slice(0, 6)}`
        }
      }
      return null
    },
  },
  {
    name: '산문에 raw 꺾쇠/중괄호 (빌드 에러)',
    find: (line, _n, raw) => {
      // 제외: JSX 태그 줄, frontmatter, 표 행
      if (/^\s*(<|\/>|---)/.test(raw)) return null
      if (/^\s*\|/.test(raw)) return null
      // 제외: JSX prop 줄 (key="..." / key={...}) — 속성값 안의 { } 와
      //       JS 표현식 안의 꺾쇠는 정상이다
      if (/^\s*[a-zA-Z]+=[{"]/.test(raw)) return null
      const m = line.match(/(?<![-=|])>(?!\s)|(?<!-)<(?![\s=])|\{[a-zA-Z_$]/)
      return m ? m[0] : null
    },
  },
  {
    name: '표 셀에 물결표 (빌드 에러)',
    find: (line, _n, raw) => (/^\s*\|/.test(raw) && line.includes('~') ? '~' : null),
  },
  {
    name: 'JSX prop 안 꺾쇠 (빌드 에러)',
    find: (_line, _n, raw) => {
      const m = raw.match(/(question|explanation|label|title|description)="[^"]*[<>][^"]*"/)
      return m ? m[0].slice(0, 60) : null
    },
  },
  {
    name: 'JSX prop 안 백슬래시 이스케이프 (빌드 에러)',
    find: (_line, _n, raw) => (/="[^"]*\\"/.test(raw) ? raw.trim().slice(0, 60) : null),
  },
]

//----------------------------------------------------------------------------------
// [4] 파일 단위 검사 (규칙 위반 + 구조 점검)
//----------------------------------------------------------------------------------
function checkFile(file) {
  const raw = fs.readFileSync(file, 'utf8')
  const stripped = stripCode(raw)
  const rawLines = raw.split(/\r?\n/)
  const lines = stripped.split(/\r?\n/)
  const issues = []

  // 구조: frontmatter 시작 / 참고 자료 종료 / import 금지
  // (홈 화면 index.mdx는 학습 문서가 아니므로 참고 자료 규칙에서 제외)
  const isIndex = path.basename(file) === 'index.mdx'
  if (!raw.startsWith('---')) issues.push({ line: 1, rule: '구조', text: 'frontmatter로 시작하지 않음' })
  if (!isIndex && !/^## 참고 자료/m.test(raw)) issues.push({ line: rawLines.length, rule: '구조', text: '## 참고 자료 섹션 없음' })
  // 코드블록 안의 import는 예시 코드이므로 제외 — 문서 본문(stripped)에서만 찾는다
  const imp = stripped.split(/\r?\n/).findIndex((l) => /^import\s/.test(l))
  if (imp >= 0) issues.push({ line: imp + 1, rule: '구조', text: 'import 문 사용 (전역 컴포넌트라 불필요)' })

  // Quiz correctAnswer 범위
  for (const m of raw.matchAll(/correctAnswer=\{(\d+)\}/g)) {
    const v = +m[1]
    if (v < 1 || v > 4) {
      issues.push({ line: raw.slice(0, m.index).split('\n').length, rule: 'Quiz', text: `correctAnswer=${v} (1~4 이어야 함)` })
    }
  }

  // 줄 단위 규칙
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      const hit = rule.find(line, i + 1, rawLines[i])
      if (hit) issues.push({ line: i + 1, rule: rule.name, text: hit.trim().slice(0, 70) })
    }
  })

  return issues
}

//----------------------------------------------------------------------------------
// [5] 메인
//----------------------------------------------------------------------------------
const targets = process.argv.slice(2)
const defaults = ['prompts/plan', 'content']
const files = (targets.length ? targets : defaults).flatMap(collectFiles)

if (!files.length) {
  console.log('검사할 .mdx 파일이 없습니다.')
  process.exit(0)
}

let totalIssues = 0
let badFiles = 0
for (const file of files.sort()) {
  const issues = checkFile(file)
  if (!issues.length) continue
  badFiles++
  totalIssues += issues.length
  console.log(`\n■ ${path.relative(ROOT, file)}`)
  for (const it of issues.slice(0, 8)) {
    console.log(`   ${String(it.line).padStart(4)}행 [${it.rule}] ${it.text}`)
  }
  if (issues.length > 8) console.log(`   ... 외 ${issues.length - 8}건`)
}

console.log(`\n검사 ${files.length}개 파일 / 문제 있는 파일 ${badFiles}개 / 총 ${totalIssues}건`)
if (!totalIssues) console.log('모든 파일이 MDX 규칙을 통과했습니다.')
