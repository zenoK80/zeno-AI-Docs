//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 실행기 공용화: "단계들을 순서대로 실행하는 루프"를 한 곳에 두고
//    CLI(generate-doc.js)와 작업지시서(run.js) 양쪽에서 재사용
// 2. opts 하나로 통일: 과목/단계/편/다시생성 같은 설정을 어디서 받았든
//    (CLI 옵션이든 작업지시.md든) 같은 모양의 opts 객체로 만들어서 넘김
//----------------------------------------------------------------------------------
const { chat, costSummary, setCostContext } = require('./api')
const { subjectDirs } = require('./files')

//----------------------------------------------------------------------------------
// [1] 단계 표
// - 역할: 단계 번호 → 모듈 매핑. 기본 담당 AI는 각 모듈의 provider에 정의됨
//----------------------------------------------------------------------------------
const STEPS = {
  1: require('../steps/step1-direction'),
  2: require('../steps/step2-toc'),
  3: require('../steps/step3-draft'),
  4: require('../steps/step4-review'),
  5: require('../steps/step5-finalize'),
}

//----------------------------------------------------------------------------------
// [2] 단계 범위 파싱
// - 역할: "3" → [3], "1-5" → [1,2,3,4,5], 잘못된 값 → null
//----------------------------------------------------------------------------------
function parseStepRange(s) {
  const m = String(s).trim().match(/^([1-5])(?:\s*[-~]\s*([1-5]))?$/)
  if (!m) return null
  const from = +m[1], to = +(m[2] || m[1])
  if (to < from) return null
  return Array.from({ length: to - from + 1 }, (_, i) => from + i)
}

//----------------------------------------------------------------------------------
// [3] 단계 순차 실행
// - 역할: opts.step 범위의 단계들을 순서대로 실행
// - 단계 모듈에는 "제공자·모델이 이미 결정된" chat 함수를 만들어 넘김
// - 한 단계가 실패하면 거기서 멈춤 (이미 만든 산출물은 남아서 재실행 시 이어감)
//----------------------------------------------------------------------------------
async function runSteps(opts) {
  const steps = parseStepRange(opts.step)
  if (!opts.subject) throw new Error('과목이 지정되지 않았습니다.')
  if (!steps) throw new Error(`단계 값이 잘못됨: "${opts.step}" (가능: 1~5 또는 1-5 같은 범위)`)

  const dirs = subjectDirs(opts.subject)
  for (const n of steps) {
    const step = STEPS[n]
    const provider = opts.provider || step.provider
    // 모델 우선순위: 작업지시서의 "모델N:" > "모델:"/--model > api.js CONFIG 기본값
    const model = opts[`model${n}`] || opts.model
    console.log(`\n===== ${n}단계 ${step.name} (${provider}${model ? ` / ${model}` : ''}) =====`)
    setCostContext({ subject: opts.subject, step: n, stepName: step.name })
    const chatFn = (system, user) => chat(provider, system, user, { model })
    await step.run(dirs, opts, chatFn)
  }
  console.log(`\n${costSummary()}`)
  console.log('상세 기록: costs/ 폴더 (일별 표 + log.jsonl), 집계는 실행/비용보고서.bat')
}

module.exports = { STEPS, parseStepRange, runSteps }
