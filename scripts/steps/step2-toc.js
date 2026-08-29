//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 모든 단계의 공통 패턴: 이전 산출물 읽기 → 지시문(system) + 산출물(user)로 호출 → 저장
// 2. Perplexity 담당 이유: 실시간 웹 검색 + 출처 인용 → 자료 조사·참고 사이트 수집에 최적
//----------------------------------------------------------------------------------
const path = require('path')
const { readInstruction, readOrFail, writeOut } = require('../lib/files')

module.exports = {
  name: '목차구성',
  provider: 'perplexity',

  //--------------------------------------------------------------------------------
  // [1] 실행
  // - 입력: 01_학습방향.md
  // - 출력: prompts/plan/[과목]/02_목차.md (참고 자료 표 + 목차 표 포함)
  //--------------------------------------------------------------------------------
  async run(dirs, opts, chat) {
    //------------------------------------------------------------------------------
    // [0] 이어하기 보호: 이미 산출물이 있으면 건너뜀 (다시: 예 / --all 이면 재생성)
    //------------------------------------------------------------------------------
    const fs = require('fs')
    const outPath = path.join(dirs.plan, '02_목차.md')
    if (!opts.all && fs.existsSync(outPath)) {
      return console.log('  건너뜀: 02_목차.md 이 이미 있음 (다시 만들려면 "다시: 예")')
    }

    const instruction = readInstruction('02_목차구성.md')
    const direction = readOrFail(
      path.join(dirs.plan, '01_학습방향.md'),
      '1단계를 먼저 실행하세요 (--step 1).'
    )
    const pathNote = opts.path
      ? `\n\n배치 경로는 정확히 "${opts.path.trim().replace(/\/$/, '')}/" 로 표기하라.`
      : ''
    const result = await chat(
      instruction,
      `다음은 이 과목의 학습 방향이다. 이 컨셉에 맞게 자료 조사와 목차 설계를 수행하라.${pathNote}\n\n${direction}`
    )
    writeOut(path.join(dirs.plan, '02_목차.md'), result)
  },
}
