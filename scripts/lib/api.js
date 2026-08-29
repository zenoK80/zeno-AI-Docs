//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 이 파일의 [0] CONFIG 블록이 "설정판" — 모델·max_tokens·temperature를 여기서 고른다
//    (.env.local의 PPLX_MODEL 등으로도 덮어쓰기 가능, CLI --model이 최우선)
// 2. 각 회사 모델 후보는 아래 카탈로그 주석에 가격·성능과 함께 정리 (2026-08 조사 기준)
//    ※ AI 가격은 자주 바뀌므로 큰 작업 전에 각사 공식 pricing 페이지 재확인 권장
// 3. 호출마다 토큰 사용량 × 단가로 비용(USD)을 계산해 로그로 찍고 누적한다
// 4. Perplexity/OpenAI/Gemini/xAI는 OpenAI 호환 chat/completions 형식,
//    Claude(Anthropic)만 자사 네이티브 /v1/messages 형식 → kind로 구분해 처리
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [0] 사용자 설정판 — 모델을 바꾸고 싶으면 여기만 고치면 된다
// - model: 아래 각 회사 카탈로그에서 골라 넣기
// - max_tokens: 응답 최대 길이(출력 토큰 상한). null이면 회사 기본값 사용
//   (Claude는 네이티브 API 필수값이라 숫자 필요)
// - temperature: 창의성(0=일관적 ~ 1=다양). null이면 회사 기본값 사용
//----------------------------------------------------------------------------------
const CONFIG = {
  perplexity: { model: 'sonar-pro',            max_tokens: null,  temperature: null },
  openai:     { model: 'gpt-5-6-terra',        max_tokens: null,  temperature: null },
  gemini:     { model: 'gemini-3.1-pro-preview', max_tokens: null, temperature: null },
  grok:       { model: 'grok-4.6',             max_tokens: null,  temperature: null },
  claude:     { model: 'claude-sonnet-5',      max_tokens: 32000, temperature: null },
}

//----------------------------------------------------------------------------------
// [1] 모델 카탈로그 (2026-08 조사 — 가격은 1M 토큰당 USD, 입력/출력)
//
// ▶ Perplexity (2단계 목차·자료조사 담당 — 실시간 웹검색+출처가 강점)
//   'sonar-pro'            $3 / $15   검색 품질 최고, 목차·자료조사 표준 ← 기본값
//   'sonar-reasoning-pro'  $2 / $8    검색+추론, 복잡한 조사에 강함 (추론토큰 +$3/M)
//   'sonar'                $1 / $1    가벼운 검색, 품질 낮음
//   ※ 토큰 외에 검색 요청당 요금이 따로 붙음 (요청 1천 건당 수 달러 수준)
//
// ▶ OpenAI (5단계 보강 담당 — 편별로 검수 반영+내용·섹션 보강. 편수만큼 호출)
//   'gpt-5-6-sol'          $5 / $30   플래그십, 최고 품질
//   'gpt-5-6-terra'        $2.50/$15  실무 표준, 품질/가격 균형 ← 기본값
//   'gpt-5-6-luna'         $1 / $6    경량
//   'gpt-5-4-mini'         $0.75/$4.5 저가형, 테스트용
//
// ▶ Gemini (4단계 검수 담당 — 긴 컨텍스트로 초안 전체를 한 번에 읽어야 함)
//   'gemini-3.1-pro-preview' $2 / $12  추론 최상급, 검수 적합 ← 기본값 (200K 초과분 $4/$18)
//   'gemini-3.6-flash'       $1.50/$7.50 중간급, 빠름
//   'gemini-2.5-pro'         $1.25/$10  구세대 Pro, 저렴
//   'gemini-2.5-flash'       $0.30/$2.50 저가형, 테스트용
//
// ▶ xAI Grok (1단계 학습방향 담당 — 호출 1번뿐이라 비용 부담 적음)
//   'grok-4.6'             $2 / $6    플래그십 ← 기본값
//   'grok-4-1-fast'        $0.20/$0.50 초저가, 컨텍스트 2M (ID는 xAI 문서 재확인 권장)
//
// ▶ Claude / Anthropic (3단계 본문 작성 담당 — MDX 규칙 준수하며 완성본을 직접 씀.
//   편수만큼 호출돼서 비용 최대 구간 → 단가 중요. 5단계는 API 호출 없음)
//   'claude-opus-5'        $5 / $25   최상급 — 품질 최우선일 때
//   'claude-sonnet-5'      $2 / $10   상급, 비용 절반 이하 ← 기본값
//   'claude-haiku-4-5'     $1 / $5    경량, 테스트용
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
// [2] 가격표 (비용 계산용 — 위 카탈로그와 같은 출처, 모델 추가하면 여기도 추가)
//----------------------------------------------------------------------------------
const PRICES = {
  'sonar-pro':              { in: 3,    out: 15 },
  'sonar-reasoning-pro':    { in: 2,    out: 8 },
  'sonar':                  { in: 1,    out: 1 },
  'gpt-5-6-sol':            { in: 5,    out: 30 },
  'gpt-5-6-terra':          { in: 2.5,  out: 15 },
  'gpt-5-6-luna':           { in: 1,    out: 6 },
  'gpt-5-4-mini':           { in: 0.75, out: 4.5 },
  'gemini-3.1-pro-preview': { in: 2,    out: 12 },
  'gemini-3.6-flash':       { in: 1.5,  out: 7.5 },
  'gemini-2.5-pro':         { in: 1.25, out: 10 },
  'gemini-2.5-flash':       { in: 0.3,  out: 2.5 },
  'grok-4.6':               { in: 2,    out: 6 },
  'grok-4-1-fast':          { in: 0.2,  out: 0.5 },
  'claude-opus-5':          { in: 5,    out: 25 },
  'claude-sonnet-5':        { in: 2,    out: 10 },
  'claude-haiku-4-5':       { in: 1,    out: 5 },
}

//----------------------------------------------------------------------------------
// [3] 제공자(AI 회사) 표 — 엔드포인트/키/요청 형식(kind)
// - 모델은 CONFIG에서 가져오고, .env.local의 *_MODEL이 있으면 그걸 우선
//----------------------------------------------------------------------------------
const PROVIDERS = {
  perplexity: {
    kind: 'openai',
    url: 'https://api.perplexity.ai/chat/completions',
    keyEnv: 'PERPLEXITY_API_KEY',
    get model() { return process.env.PPLX_MODEL || CONFIG.perplexity.model },
    config: CONFIG.perplexity,
  },
  openai: {
    kind: 'openai',
    url: 'https://api.openai.com/v1/chat/completions',
    keyEnv: 'OPENAI_API_KEY',
    get model() { return process.env.OPENAI_MODEL || CONFIG.openai.model },
    config: CONFIG.openai,
  },
  gemini: {
    kind: 'openai',
    url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    keyEnv: 'GEMINI_API_KEY',
    get model() { return process.env.GEMINI_MODEL || CONFIG.gemini.model },
    config: CONFIG.gemini,
  },
  grok: {
    kind: 'openai',
    url: 'https://api.x.ai/v1/chat/completions',
    keyEnv: 'XAI_API_KEY',
    get model() { return process.env.XAI_MODEL || CONFIG.grok.model },
    config: CONFIG.grok,
  },
  claude: {
    kind: 'anthropic', // Anthropic 네이티브 /v1/messages 형식 사용
    url: 'https://api.anthropic.com/v1/messages',
    keyEnv: 'CLAUDE_API_KEY',
    get model() { return process.env.CLAUDE_MODEL || CONFIG.claude.model },
    config: CONFIG.claude,
  },
}

//----------------------------------------------------------------------------------
// [4] 비용 누적기 + 파일 기록
// - 역할: 호출마다 usage × 단가로 USD 계산 → 로그 + 세션 누적 + costs/ 폴더에 기록
// - 기록 위치: costs/log.jsonl (집계용 원본) + costs/연-월/연-월-일.md (사람이 읽는 표)
// - setCostContext(): runner가 단계 시작 전에 과목·단계를 알려줌 (기록에 같이 남김)
// - costSummary(): 실행 끝에 총액을 보여주기 위해 runner가 호출
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./env')

let totalUSD = 0
let unknownPriceModels = new Set()
let costContext = {} // { subject, step, stepName }

function setCostContext(ctx) {
  costContext = ctx || {}
}

function recordCost(entry) {
  try {
    const d = new Date()
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const ymd = `${ym}-${String(d.getDate()).padStart(2, '0')}`
    const monthDir = path.join(ROOT, 'costs', ym)
    fs.mkdirSync(monthDir, { recursive: true })

    // 집계용 원본 (한 줄 = 호출 1번)
    fs.appendFileSync(path.join(ROOT, 'costs', 'log.jsonl'), JSON.stringify(entry) + '\n', 'utf8')

    // 사람이 읽는 일별 표
    const mdPath = path.join(monthDir, `${ymd}.md`)
    if (!fs.existsSync(mdPath)) {
      fs.writeFileSync(mdPath, `# ${ymd} API 비용 기록\n\n| 시각 | 과목 | 단계 | 모델 | 입력토큰 | 출력토큰 | 비용(USD) |\n|---|---|---|---|---|---|---|\n`, 'utf8')
    }
    const usdStr = entry.usd == null ? '?(가격표 없음)' : `$${entry.usd.toFixed(4)}`
    fs.appendFileSync(mdPath, `| ${entry.time} | ${entry.subject || '-'} | ${entry.step || '-'} | ${entry.model} | ${entry.inTok} | ${entry.outTok} | ${usdStr} |\n`, 'utf8')
  } catch (e) {
    console.log(`  (비용 기록 실패: ${e.message} — 실행은 계속합니다)`)
  }
}

function addCost(model, inputTokens, outputTokens) {
  const price = PRICES[model]
  if (!price) {
    unknownPriceModels.add(model)
    return null
  }
  const usd = (inputTokens * price.in + outputTokens * price.out) / 1_000_000
  totalUSD += usd
  return usd
}

function costSummary() {
  let msg = `이번 실행 총 비용: $${totalUSD.toFixed(4)}`
  if (unknownPriceModels.size) {
    msg += `\n  ※ 가격표에 없어 계산 못 한 모델: ${[...unknownPriceModels].join(', ')} — api.js의 PRICES에 단가를 추가하세요`
  }
  return msg
}

//----------------------------------------------------------------------------------
// [5] 공용 챗 호출 함수
// - 역할: 제공자 이름 + system/user 프롬프트 → 응답 텍스트
// - kind가 'openai'면 chat/completions 형식, 'anthropic'이면 /v1/messages 형식으로
//   요청·응답을 맞춰준다 (형식만 다르고 하는 일은 같음)
//----------------------------------------------------------------------------------
async function chat(providerName, systemPrompt, userPrompt, overrides = {}) {
  const p = PROVIDERS[providerName]
  if (!p) throw new Error(`알 수 없는 제공자: ${providerName} (가능: ${Object.keys(PROVIDERS).join(', ')})`)
  const key = process.env[p.keyEnv]
  if (!key) throw new Error(`${p.keyEnv} 가 .env.local에 없습니다.`)
  const model = overrides.model || p.model

  //--------------------------------------------------------------------------------
  // [5-1] 요청 본문·헤더 조립 (회사 형식에 맞게)
  //--------------------------------------------------------------------------------
  let headers, body
  if (p.kind === 'anthropic') {
    headers = { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' }
    body = {
      model,
      max_tokens: p.config.max_tokens || 32000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }
    if (p.config.temperature != null) body.temperature = p.config.temperature
  } else {
    headers = { 'content-type': 'application/json', authorization: `Bearer ${key}` }
    body = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }
    if (p.config.max_tokens != null) body.max_tokens = p.config.max_tokens
    if (p.config.temperature != null) body.temperature = p.config.temperature
  }

  //--------------------------------------------------------------------------------
  // [5-2] 호출 (10분 타임아웃) → 응답 텍스트·사용량 꺼내기 → 비용 로그
  //--------------------------------------------------------------------------------
  console.log(`  → ${providerName} (${model}) 호출 중... (긴 문서는 1~5분 걸릴 수 있음)`)
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 10 * 60 * 1000)
  // 기다리는 동안 15초마다 경과 시간을 찍어준다 (멈춘 게 아니라는 신호)
  const startedAt = Date.now()
  const ticker = setInterval(() => {
    console.log(`     ... ${Math.round((Date.now() - startedAt) / 1000)}초 경과 (응답 작성 중)`)
  }, 15 * 1000)
  try {
    const res = await fetch(p.url, { method: 'POST', signal: controller.signal, headers, body: JSON.stringify(body) })
    if (!res.ok) {
      throw new Error(`${providerName} API 오류 ${res.status}: ${(await res.text()).slice(0, 500)}`)
    }
    const data = await res.json()

    let content, inTok, outTok
    if (p.kind === 'anthropic') {
      content = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('')
      inTok = data.usage?.input_tokens ?? 0
      outTok = data.usage?.output_tokens ?? 0
    } else {
      content = data.choices?.[0]?.message?.content
      inTok = data.usage?.prompt_tokens ?? 0
      outTok = data.usage?.completion_tokens ?? 0
    }
    if (!content) throw new Error(`${providerName} 응답에 내용 없음: ${JSON.stringify(data).slice(0, 300)}`)

    const usd = addCost(model, inTok, outTok)
    const costMsg = usd == null ? '비용 계산 불가(가격표에 모델 없음)' : `비용 $${usd.toFixed(4)} | 누적 $${totalUSD.toFixed(4)}`
    console.log(`  ← 완료 (입력 ${inTok} / 출력 ${outTok} 토큰 | ${costMsg})`)

    const now = new Date()
    recordCost({
      ts: now.toISOString(),
      time: now.toTimeString().slice(0, 8),
      subject: costContext.subject,
      step: costContext.step,
      provider: providerName,
      model,
      inTok,
      outTok,
      usd,
    })
    return content
  } finally {
    clearTimeout(timer)
    clearInterval(ticker)
  }
}

module.exports = { PROVIDERS, CONFIG, PRICES, chat, costSummary, setCostContext }
