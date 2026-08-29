//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 명령어 옵션 대신 "작업지시.md" 파일을 읽어서 실행하는 진입점
//    → 사용자는 파일에 할 일을 적고 실행.bat 더블클릭만 하면 됨
// 2. 작업 여러 개 지원: "## 작업 1" 헤딩이나 "1." 번호 줄이 새 작업의 시작
// 3. "키: 값" 줄만 해석하고 나머지 설명 문장은 전부 무시 → 자유롭게 메모 가능
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { loadEnvLocal, ROOT } = require('./lib/env')
loadEnvLocal() // API 키를 먼저 로딩

const { runSteps } = require('./lib/runner')

//----------------------------------------------------------------------------------
// [1] 키 이름 표 (한국어/영어 둘 다 허용)
// - 역할: 작업지시.md의 "과목: git" 을 opts.subject = 'git' 으로 변환
//----------------------------------------------------------------------------------
const KEY_MAP = {
  '과목': 'subject', 'subject': 'subject',
  '주제': 'topic', 'topic': 'topic',
  '경로': 'path', 'path': 'path',
  '단계': 'step', 'step': 'step',
  '편': 'file', 'file': 'file',
  '다시': 'all', 'all': 'all',
  '빌드': 'build', 'build': 'build',
  '보강': 'enhance', 'enhance': 'enhance',
  '전부': 'full', 'full': 'full',
  '담당': 'provider', 'provider': 'provider',
  '모델': 'model', 'model': 'model',
  // 단계별 모델 지정: "모델1: grok-4.6" → 1단계에만 적용
  '모델1': 'model1', '모델2': 'model2', '모델3': 'model3', '모델4': 'model4', '모델5': 'model5',
}

// "예/네/yes/o/ㅇ/true" → true 로 해석
const YES = ['예', '네', 'yes', 'y', 'o', 'ㅇ', 'true', '응']

//----------------------------------------------------------------------------------
// [2] 작업지시.md 파싱
// - 역할: 파일 내용을 작업(job) 목록으로 변환
// - 새 작업의 시작: "## ..." 헤딩 또는 "1." 같은 번호 줄
// - 그 외에는 "키: 값" 줄만 수집, 설명 문장은 무시
//----------------------------------------------------------------------------------
function parseJobs(text) {
  const jobs = []
  let cur = null
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()

    // 새 작업 시작 신호: "## 작업 1" 또는 "1. ..." 또는 "1)"
    if (/^##\s/.test(line) || /^\d+[.)]/.test(line)) {
      cur = {}
      jobs.push(cur)
      // "1. 과목: git / 단계: 2" 처럼 번호 줄에 바로 적은 경우도 처리
      const rest = line.replace(/^##\s*|^\d+[.)]\s*/, '')
      for (const part of rest.split('/')) collectKeyValue(part, cur)
      continue
    }

    if (!cur) { cur = {}; jobs.push(cur) } // 헤딩 없이 바로 "과목: ..." 부터 시작해도 됨
    collectKeyValue(line, cur)
  }
  // 키가 하나도 안 잡힌 빈 작업은 버림
  return jobs.filter((j) => Object.keys(j).length > 0)
}

//----------------------------------------------------------------------------------
// [3] "키: 값" 한 줄 해석
// - 역할: KEY_MAP에 있는 키만 골라 opts 필드로 저장 (모르는 키·설명 문장은 무시)
//----------------------------------------------------------------------------------
function collectKeyValue(line, job) {
  const m = line.trim().match(/^([A-Za-z가-힣]+[0-9]?)\s*[:：]\s*(.+)$/)
  if (!m) return
  const key = KEY_MAP[m[1].toLowerCase()] || KEY_MAP[m[1]]
  if (!key) return
  const value = m[2].trim()

  if (key === 'all') job.all = YES.includes(value.toLowerCase())
  else if (key === 'build') job.skipBuild = ['생략', '스킵', '안함', 'no', 'skip'].includes(value.toLowerCase())
  else if (key === 'enhance') job.skipEnhance = ['생략', '스킵', '안함', 'no', 'skip'].includes(value.toLowerCase())
  else if (key === 'full') job.full = YES.includes(value.toLowerCase())
  else job[key] = value
}

//----------------------------------------------------------------------------------
// [4] 메인: 작업지시.md 읽기 → 작업 순차 실행
// - 단계 결정 규칙: bat 파일이 넘겨준 번호(process.argv[2])가 최우선
//   (실행_1단계.bat → "node scripts/run.js 1" → 모든 작업을 1단계로 실행)
//   bat 번호가 없으면 작업지시.md 안의 "단계:" 값을 사용
//----------------------------------------------------------------------------------
async function main() {
  const stepOverride = process.argv[2] // 예: "1", "2-4", "1-5" (없을 수도 있음)

  // 작업지시.md 는 실행/ 폴더에 있다 (루트에 있어도 인식 — 하위 호환)
  let orderPath = path.join(ROOT, '실행', '작업지시.md')
  if (!fs.existsSync(orderPath)) orderPath = path.join(ROOT, '작업지시.md')
  if (!fs.existsSync(orderPath)) {
    console.error('실행/작업지시.md 가 없습니다. 파일을 만들고 과목·주제를 적어주세요.')
    process.exit(1)
  }
  const jobs = parseJobs(fs.readFileSync(orderPath, 'utf8'))
  if (!jobs.length) {
    console.error('작업지시.md 에서 실행할 작업을 찾지 못했습니다. "과목: ..." 을 적어주세요.')
    process.exit(1)
  }

  console.log(`${path.relative(ROOT, orderPath)} 에서 ${jobs.length}개 작업을 읽었습니다.` + (stepOverride ? ` (실행 단계: ${stepOverride})` : ''))
  for (const [i, job] of jobs.entries()) {
    const step = stepOverride || job.step
    if (!step) {
      console.error(`작업 ${i + 1}: 단계를 알 수 없습니다. 단계별 bat 파일로 실행하거나 작업지시.md에 "단계: N"을 적어주세요.`)
      process.exit(1)
    }
    console.log(`\n########## 작업 ${i + 1}/${jobs.length}: 과목=${job.subject || '?'} 단계=${step} ##########`)
    await runSteps({ all: false, skipBuild: false, ...job, step })
  }
  console.log('\n모든 작업 완료. 산출물: prompts/plan/<과목>/ 및 content/')
}

//----------------------------------------------------------------------------------
// [5] 직접 실행할 때만 main 구동 (다른 파일에서 require로 parseJobs만 테스트 가능)
//----------------------------------------------------------------------------------
if (require.main === module) {
  main().catch((e) => { console.error(`\n오류: ${e.message}`); process.exit(1) })
}

module.exports = { parseJobs }
