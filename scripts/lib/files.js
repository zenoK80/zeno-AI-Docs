//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 경로 규약: 중간 산출물은 전부 prompts/plan/[과목]/ 아래에 모임
// 2. 목차 표 파싱: prompts/02가 산출물 형식을 표로 고정해 놔서 정규식 파싱이 성립
//    (02_목차구성.md의 표 형식을 바꾸면 parseToc 정규식도 같이 바꿔야 함)
// 3. writeOut: 폴더가 없으면 만들어서(recursive) UTF-8로 저장
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { ROOT } = require('./env')

const PROMPTS_DIR = path.join(ROOT, 'prompts')

//----------------------------------------------------------------------------------
// [1] 과목명 → 관련 경로 묶음
// - 역할: plan 폴더와 03_초안 폴더 경로를 한 번에 계산
//----------------------------------------------------------------------------------
function subjectDirs(subject) {
  const plan = path.join(PROMPTS_DIR, 'plan', subject)
  return { plan, draft: path.join(plan, '03_초안') }
}

//----------------------------------------------------------------------------------
// [2] 파일 읽기 (없으면 안내 메시지와 함께 실패)
// - 역할: 이전 단계 산출물이 없을 때 "몇 단계를 먼저 하라"고 알려주기 위함
//----------------------------------------------------------------------------------
function readOrFail(file, hint) {
  if (!fs.existsSync(file)) {
    throw new Error(`${path.relative(ROOT, file)} 이 없습니다. ${hint || ''}`)
  }
  return fs.readFileSync(file, 'utf8')
}

//----------------------------------------------------------------------------------
// [3] 지시문 읽기
// - 역할: prompts/0N_*.md 를 system 프롬프트로 쓰기 위해 읽음
//----------------------------------------------------------------------------------
function readInstruction(name) {
  return readOrFail(path.join(PROMPTS_DIR, name))
}

//----------------------------------------------------------------------------------
// [4] 산출물 저장
// - 역할: 폴더 자동 생성 + 끝 개행 보정 + 저장 경로 로그
//----------------------------------------------------------------------------------
function writeOut(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content.endsWith('\n') ? content : content + '\n', 'utf8')
  console.log(`  저장: ${path.relative(ROOT, file)}`)
}

//----------------------------------------------------------------------------------
// [5] 목차 표 파싱
// - 역할: 02_목차.md에서 "| 01_intro | 01. 개요 | ..." 행을 찾아
//         { file: '01_intro', title: '01. 개요' } 목록으로 변환
// - 정규식: 행 시작 | → NN_kebab-case 파일명 → 다음 칸이 제목
//----------------------------------------------------------------------------------
function parseToc(tocMarkdown) {
  const episodes = []
  for (const line of tocMarkdown.split(/\r?\n/)) {
    const m = line.match(/^\|\s*(\d{2}_[A-Za-z0-9-]+)\s*\|\s*([^|]+)\|/)
    if (m) episodes.push({ file: m[1], title: m[2].trim() })
  }
  return episodes
}

//----------------------------------------------------------------------------------
// [6] 편 지정 해석
// - 역할: "편: 01 / 1-4 / 01,03,10 / 전부" 같은 지정을 편 목록으로 변환
// - 편을 지정했다는 것은 "그 편을 (다시) 만들어라"는 뜻 — 존재 여부와 무관하게 대상이 됨
//----------------------------------------------------------------------------------
function filterEpisodes(episodes, spec) {
  const s = String(spec).trim()
  if (['전부', '전체', '다', 'all'].includes(s.toLowerCase())) return [...episodes]
  const wanted = new Set()
  for (const part of s.split(',')) {
    const m = part.trim().match(/^(\d{1,2})(?:\s*[-~]\s*(\d{1,2}))?$/)
    if (!m) throw new Error(`편 지정이 잘못됨: "${part.trim()}" (가능: 01 / 1-4 / 01,03,10 / 전부)`)
    const from = +m[1], to = +(m[2] || m[1])
    if (to < from) throw new Error(`편 범위가 거꾸로임: "${part.trim()}"`)
    for (let n = from; n <= to; n++) wanted.add(n)
  }
  return episodes.filter((e) => wanted.has(parseInt(e.file.slice(0, 2), 10)))
}

module.exports = { PROMPTS_DIR, subjectDirs, readOrFail, readInstruction, writeOut, parseToc, filterEpisodes }
