//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. check-mdx.js 가 찾아낸 위반 중 "기계적으로 안전하게 고칠 수 있는 것"만 자동 교정한다.
//    사람 판단이 필요한 항목(내용 수정)은 건드리지 않고 check-mdx.js 가 계속 보고한다.
// 2. 사용법: node scripts/fix-mdx.js [경로...]   (--dry 를 붙이면 미리보기만)
// 3. 교정 대상 3가지
//    ① 볼드 끝 문장부호+글자 **"X"**이기 → "**X**"이기   (따옴표를 볼드 밖으로)
//                           **X.**이기   → **X**.이기
//    ② JSX prop 안 꺾쇠      question="a => b" → question="a =&gt; b"
//    ※ "볼드 안 괄호"는 실측 결과 정상 렌더링이라 교정 대상이 아니다
//       (insight/01_mdx-볼드-렌더링-깨짐.md)
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const DRY = process.argv.includes('--dry')

function collectFiles(target) {
  const abs = path.isAbsolute(target) ? target : path.join(ROOT, target)
  if (!fs.existsSync(abs)) return []
  if (fs.statSync(abs).isFile()) return abs.endsWith('.mdx') ? [abs] : []
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((d) => collectFiles(path.join(abs, d.name)))
}

//----------------------------------------------------------------------------------
// [1] 코드 영역인지 판정하기 위한 펜스 추적
// - 역할: ``` 안의 줄은 교정 대상에서 제외한다 (코드에서는 금지 문자가 정상)
//----------------------------------------------------------------------------------
function isCodeLine(lines, idx) {
  let inFence = false
  for (let i = 0; i < idx; i++) {
    if (/^\s*```/.test(lines[i])) inFence = !inFence
  }
  return inFence || /^\s*```/.test(lines[idx])
}

const PUNCT_END = /[”’")\]\}»….,!?%:;]/u
const LETTER = /[\p{L}\p{N}]/u

//----------------------------------------------------------------------------------
// [2] 한 줄 교정
//----------------------------------------------------------------------------------
function fixLine(line) {
  const notes = []
  let out = line

  // ① 볼드 끝 문장부호 + 바로 글자
  {
    const parts = out.split('**')
    let changed = false
    for (let i = 1; i < parts.length - 1; i += 2) {
      const inside = parts[i]
      const after = parts[i + 1]
      if (!inside || !after) continue
      const last = inside[inside.length - 1]
      if (!PUNCT_END.test(last) || !LETTER.test(after[0])) continue

      const first = inside[0]
      if ((first === '"' || first === '“' || first === "'" || first === '‘') && last === (first === '“' ? '”' : first === '‘' ? '’' : first)) {
        // 따옴표로 감싼 경우: 따옴표를 볼드 바깥으로  **"X"**이기 → "**X**"이기
        parts[i] = inside.slice(1, -1)
        parts[i - 1] = parts[i - 1] + first
        parts[i + 1] = last + after
      } else {
        // 그 외 문장부호: 볼드 밖으로  **X.**이기 → **X**.이기
        parts[i] = inside.slice(0, -1)
        parts[i + 1] = last + after
      }
      changed = true
    }
    if (changed) {
      notes.push('볼드 끝 문장부호')
      out = parts.join('**')
    }
  }

  // ② JSX prop 안 꺾쇠 → HTML entity
  {
    const next = out.replace(
      /(question|explanation|label|title|description)="([^"]*)"/g,
      (m, key, val) => {
        if (!/[<>]/.test(val)) return m
        return `${key}="${val.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"`
      }
    )
    if (next !== out) {
      notes.push('prop 안 꺾쇠')
      out = next
    }
  }

  return { out, notes }
}

//----------------------------------------------------------------------------------
// [3] 파일 교정
//----------------------------------------------------------------------------------
const targets = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const files = (targets.length ? targets : ['content', 'prompts/plan']).flatMap(collectFiles)

let totalFixes = 0
let touched = 0

for (const file of files.sort()) {
  const raw = fs.readFileSync(file, 'utf8')
  const lines = raw.split(/\r?\n/)
  const fixedLines = [...lines]
  const fileNotes = []

  lines.forEach((line, i) => {
    if (isCodeLine(lines, i)) return
    const { out, notes } = fixLine(line)
    if (out !== line) {
      fixedLines[i] = out
      fileNotes.push(`${i + 1}행 [${notes.join(', ')}]`)
    }
  })

  if (!fileNotes.length) continue
  touched++
  totalFixes += fileNotes.length
  console.log(`\n■ ${path.relative(ROOT, file)} — ${fileNotes.length}건`)
  fileNotes.slice(0, 5).forEach((n) => console.log(`   ${n}`))
  if (fileNotes.length > 5) console.log(`   ... 외 ${fileNotes.length - 5}건`)

  if (!DRY) fs.writeFileSync(file, fixedLines.join('\n'), 'utf8')
}

console.log(`\n${DRY ? '[미리보기] ' : ''}파일 ${touched}개 / 총 ${totalFixes}건 교정${DRY ? ' 예정' : ' 완료'}`)
