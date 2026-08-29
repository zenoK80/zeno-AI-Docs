//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 초안 전체를 한 번에 보냄 — 파일 간 중복·순서 문제는 전체를 봐야 잡힘
//    (Gemini를 검수에 배치한 이유: 긴 컨텍스트)
// 2. 교차 검수: --provider grok 등으로 다른 모델을 지정하면
//    산출물 파일명을 분리(04_검수_grok.md)해서 원본 검수를 보존
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { readInstruction, readOrFail, writeOut } = require('../lib/files')

module.exports = {
  name: '검수',
  provider: 'gemini',

  //--------------------------------------------------------------------------------
  // [1] 실행
  // - 입력: 02_목차.md + 03_초안/ 전체
  // - 출력: prompts/plan/[과목]/04_검수.md (교차 검수 시 04_검수_[제공자].md)
  //--------------------------------------------------------------------------------
  async run(dirs, opts, chat) {
    //------------------------------------------------------------------------------
    // [0] 이어하기 보호: 이미 산출물이 있으면 건너뜀 (다시: 예 / --all 이면 재생성)
    //------------------------------------------------------------------------------
    const outName0 = opts.provider ? `04_검수_${opts.provider}.md` : '04_검수.md'
    if (!opts.all && fs.existsSync(path.join(dirs.plan, outName0))) {
      return console.log(`  건너뜀: ${outName0} 이 이미 있음 (다시 만들려면 "다시: 예")`)
    }

    const instruction = readInstruction('04_검수.md')
    const toc = readOrFail(path.join(dirs.plan, '02_목차.md'), '2단계를 먼저.')
    if (!fs.existsSync(dirs.draft)) throw new Error('03_초안/ 이 없습니다. 3단계를 먼저.')
    const files = fs.readdirSync(dirs.draft).filter((f) => f.endsWith('.md') || f.endsWith('.mdx')).sort()
    if (!files.length) throw new Error('03_초안/ 이 비어 있습니다.')

    //------------------------------------------------------------------------------
    // [2] 초안 전체를 구분선과 함께 하나의 문자열로 합침
    //------------------------------------------------------------------------------
    const drafts = files
      .map((f) => `\n\n===== 파일: ${f} =====\n\n${fs.readFileSync(path.join(dirs.draft, f), 'utf8')}`)
      .join('')

    console.log(`  초안 ${files.length}편 검수`)
    const result = await chat(
      instruction,
      `다음은 전체 목차와 초안 전체다. 체크리스트대로 전 파일을 검수하라.\n\n# 전체 목차\n${toc}\n\n# 초안 전체${drafts}`
    )
    const out = opts.provider ? `04_검수_${opts.provider}.md` : '04_검수.md'
    writeOut(path.join(dirs.plan, out), result)
  },
}
