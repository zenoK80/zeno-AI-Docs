//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. costs/log.jsonl (호출 1번 = 한 줄)을 읽어 세 가지 표로 집계해 보여준다:
//    ① 월별 총액 (한 달에 얼마 썼나)
//    ② 과목별 총액 (react-1 만드는 데 총 얼마 들었나)
//    ③ 과목×단계별 총액 (그중 3단계 초안에 얼마, 5단계 변환에 얼마)
// 2. 실행: 비용보고서.bat 더블클릭 (또는 node scripts/cost-report.js)
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./lib/env')

//----------------------------------------------------------------------------------
// [1] 기록 읽기
//----------------------------------------------------------------------------------
const logPath = path.join(ROOT, 'costs', 'log.jsonl')
if (!fs.existsSync(logPath)) {
  console.log('아직 비용 기록이 없습니다. (파이프라인을 실행하면 costs/ 에 자동 기록됩니다)')
  process.exit(0)
}
const entries = fs
  .readFileSync(logPath, 'utf8')
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => JSON.parse(line))

//----------------------------------------------------------------------------------
// [2] 집계 도우미
// - 역할: key 뽑는 함수를 받아 { key: {usd, calls, inTok, outTok} } 로 합산
//----------------------------------------------------------------------------------
function groupBy(keyFn) {
  const acc = {}
  for (const e of entries) {
    const k = keyFn(e)
    if (!acc[k]) acc[k] = { usd: 0, calls: 0, inTok: 0, outTok: 0 }
    acc[k].usd += e.usd || 0
    acc[k].calls += 1
    acc[k].inTok += e.inTok || 0
    acc[k].outTok += e.outTok || 0
  }
  return acc
}

function printTable(title, grouped) {
  console.log(`\n■ ${title}`)
  console.log('  구분                          | 호출수 | 입력토큰    | 출력토큰    | 비용(USD)')
  console.log('  ------------------------------|--------|-------------|-------------|----------')
  let total = 0
  for (const [key, v] of Object.entries(grouped).sort()) {
    total += v.usd
    console.log(
      `  ${key.padEnd(30)}| ${String(v.calls).padStart(6)} | ${v.inTok.toLocaleString().padStart(11)} | ${v.outTok.toLocaleString().padStart(11)} | $${v.usd.toFixed(4)}`
    )
  }
  console.log(`  합계: $${total.toFixed(4)}`)
}

//----------------------------------------------------------------------------------
// [3] 세 가지 표 출력
//----------------------------------------------------------------------------------
console.log(`API 비용 보고서 — 기록 ${entries.length}건 (costs/log.jsonl 기준)`)

printTable('월별 비용', groupBy((e) => e.ts.slice(0, 7)))
printTable('과목별 비용', groupBy((e) => e.subject || '(미지정)'))
printTable('과목 × 단계별 비용', groupBy((e) => `${e.subject || '(미지정)'} ${e.step || '?'}단계`))

const unknown = entries.filter((e) => e.usd == null)
if (unknown.length) {
  console.log(`\n※ 가격표에 없어 $0으로 잡힌 호출 ${unknown.length}건 (모델: ${[...new Set(unknown.map((e) => e.model))].join(', ')})`)
  console.log('  scripts/lib/api.js 의 PRICES 에 단가를 추가하면 다음 실행부터 계산됩니다.')
}
