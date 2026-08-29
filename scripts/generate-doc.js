//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 명령어 옵션(--subject 등)으로 쓰는 진입점 — 터미널에 익숙한 경우용
//    ※ 더 쉬운 방법: 작업지시.md 에 할 일을 적고 실행.bat 더블클릭 (scripts/run.js)
// 2. 실제 단계 실행 루프는 lib/runner.js 에 공용화되어 있고, 여기선 인자 파싱만 함
//
// 사용 예:
//   node scripts/generate-doc.js --subject git --step 1
//   node scripts/generate-doc.js --subject git --step 2-4
//   node scripts/generate-doc.js --subject git --step 3 --file 05
//----------------------------------------------------------------------------------
const { loadEnvLocal } = require('./lib/env')
loadEnvLocal() // API 키를 먼저 로딩

const { runSteps, parseStepRange } = require('./lib/runner')

//----------------------------------------------------------------------------------
// [1] CLI 인자 파싱
// - 역할: --옵션 값 쌍을 opts 객체로 수집
//----------------------------------------------------------------------------------
function parseArgs(argv) {
  const opts = { all: false, skipBuild: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--subject') opts.subject = argv[++i]
    else if (a === '--step') opts.step = argv[++i]
    else if (a === '--topic') opts.topic = argv[++i]
    else if (a === '--path') opts.path = argv[++i]
    else if (a === '--file') opts.file = argv[++i]
    else if (a === '--all') opts.all = true
    else if (a === '--skip-build') opts.skipBuild = true
    else if (a === '--provider') opts.provider = argv[++i]
    else if (a === '--model') opts.model = argv[++i]
    else { console.error(`알 수 없는 옵션: ${a}`); process.exit(1) }
  }
  return opts
}

//----------------------------------------------------------------------------------
// [2] 사용법 출력
//----------------------------------------------------------------------------------
function usage() {
  console.log(`사용법: node scripts/generate-doc.js --subject <과목폴더명> --step <N | N-M> [옵션]

  --step 3            3단계만 실행
  --step 1-5          1~5단계 연속 일괄 실행
  --topic "..."       1단계에 줄 상세 주제 (기본: subject)
  --file 05           3단계에서 특정 편만
  --all               이미 있는 산출물도 다시 생성
  --skip-build        5단계에서 npm run build 생략
  --provider grok     이번 실행의 담당 AI 교체 (perplexity|openai|gemini|grok|claude)
  --model <id>        모델만 교체 (예: --model sonar-reasoning-pro)

더 쉬운 방법: 작업지시.md 에 할 일을 적고 실행.bat 더블클릭
기본 담당: 1 Grok / 2 Perplexity / 3 GPT / 4 Gemini / 5 Claude`)
}

//----------------------------------------------------------------------------------
// [3] 메인
//----------------------------------------------------------------------------------
async function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (!opts.subject || !opts.step || !parseStepRange(opts.step)) {
    usage()
    process.exit(opts.subject || opts.step ? 1 : 0)
  }
  await runSteps(opts)
  console.log('\n완료. 산출물을 검토하세요: prompts/plan/' + opts.subject)
}

main().catch((e) => { console.error(`\n오류: ${e.message}`); process.exit(1) })
