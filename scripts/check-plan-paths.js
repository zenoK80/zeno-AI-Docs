//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. prompts/plan/<과목>/01·02에 적힌 "배치 경로"가 과목 폴더명과 어긋나면
//    3단계에서 엉뚱한 위치에 문서가 쌓인다. 실제로 여러 과목이 어긋나 있었다
//    (예: 3단계 딥러닝의 경로가 2단계_웹프로그래밍으로 적혀 있었다).
// 2. 검사 항목
//    - 01과 02의 배치 경로가 서로 같은가
//    - 경로 마지막 폴더명이 plan 폴더명과 맞는가 (공백은 언더스코어로 본다)
//    - 경로에 공백이나 하이픈이 있는가 (_meta.js 키에서 문법 오류를 낸다)
// 3. 사용법: node scripts/check-plan-paths.js
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const PLAN = path.join(ROOT, 'prompts', 'plan')

/** 파일에서 "배치 경로" 값을 뽑는다 (백틱으로 감싼 경우도 처리) */
function readPath(file) {
  if (!fs.existsSync(file)) return null
  const m = fs.readFileSync(file, 'utf8').match(/^-\s*\*\*배치 경로\*\*:\s*`?([^\s`]+)`?\s*$/m)
  return m ? m[1].replace(/\/$/, '') : null
}

const problems = []
let checked = 0

for (const subject of fs.readdirSync(PLAN, { withFileTypes: true })) {
  if (!subject.isDirectory()) continue
  const dir = path.join(PLAN, subject.name)
  const p1 = readPath(path.join(dir, '01_학습방향.md'))
  const p2 = readPath(path.join(dir, '02_목차.md'))

  if (!p1 && !p2) {
    problems.push(`${subject.name}: 01·02 어디에도 배치 경로가 없다`)
    continue
  }
  checked++

  if (p1 && p2 && p1 !== p2) {
    problems.push(`${subject.name}: 01과 02의 경로가 다르다\n    01: ${p1}\n    02: ${p2}`)
  }

  const target = p1 || p2
  const last = target.split('/').pop()
  // plan 폴더명을 경로 규칙에 맞춘 형태(공백 → 언더스코어)
  const expected = subject.name.replace(/\s+/g, '_')

  if (last !== expected && !expected.endsWith(last)) {
    problems.push(`${subject.name}: 경로 끝(${last})이 폴더명(${expected})과 다르다 → ${target}`)
  }
  if (/[ -]/.test(last)) {
    problems.push(`${subject.name}: 경로에 공백 또는 하이픈이 있다 (_meta.js 키 오류) → ${target}`)
  }
}

console.log(`검사한 과목: ${checked}개`)
if (problems.length) {
  console.log(`\n문제 ${problems.length}건\n`)
  for (const p of problems) console.log('  ■ ' + p)
  process.exit(1)
}
console.log('배치 경로가 모두 폴더명·표기 규칙과 일치합니다.')
