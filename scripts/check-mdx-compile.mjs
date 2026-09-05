//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. check-mdx.js는 우리가 정한 "금지 규칙"만 본다. 그래서 규칙에 없는 MDX 구문 오류
//    (예: 파일 끝에 남은 `</content>` 같은 짝 없는 닫는 태그)는 통과시켜 버린다.
//    실제로 그 상태로 npm run build를 돌리면 6개 파일이 컴파일 실패했다.
// 2. 이 도구는 실제 MDX 컴파일러를 그대로 돌려 구문 오류를 미리 잡는다.
//    빌드 전체(수십 초)를 돌리지 않고도 어느 파일 몇 행이 문제인지 바로 알 수 있다.
// 3. 사용법: node scripts/check-mdx-compile.mjs [경로...]
//    예) node scripts/check-mdx-compile.mjs content
//        node scripts/check-mdx-compile.mjs "prompts/plan/SQLD/03_초안"
//    경로를 안 주면 content 전체를 검사한다.
//----------------------------------------------------------------------------------
import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// nextra가 쓰는 것과 같은 remark 플러그인을 걸어야 한다.
// 안 걸면 표(gfm)와 수식($...$ 안의 중괄호)을 JSX 표현식으로 오해해 멀쩡한 파일을 실패로 잡는다.
const REMARK_PLUGINS = [remarkGfm, remarkMath]

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

function collectFiles(target) {
  const abs = path.isAbsolute(target) ? target : path.join(ROOT, target)
  if (!fs.existsSync(abs)) return []
  if (fs.statSync(abs).isFile()) return abs.endsWith('.mdx') ? [abs] : []
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .flatMap((d) => collectFiles(path.join(abs, d.name)))
}

const targets = process.argv.slice(2)
const files = (targets.length ? targets : ['content']).flatMap(collectFiles)

let failed = 0
for (const file of files) {
  // frontmatter는 nextra가 따로 처리하므로 떼고 본문만 컴파일한다
  const source = fs.readFileSync(file, 'utf8').replace(/^---[\s\S]*?---\n/, '')
  try {
    await compile(source, { jsx: true, remarkPlugins: REMARK_PLUGINS })
  } catch (error) {
    failed++
    console.log(`\n■ ${path.relative(ROOT, file)}`)
    console.log(`   ${error.line}행 ${error.column}열 — ${error.message}`)
  }
}

console.log(`\n검사 ${files.length}개 파일 / 컴파일 실패 ${failed}개`)
if (failed) {
  console.log('빌드가 깨집니다. 위 위치를 고친 뒤 다시 실행하세요.')
  process.exit(1)
}
console.log('모든 파일이 MDX 컴파일을 통과했습니다.')
