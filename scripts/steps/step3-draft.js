//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 비용 절감 구조: 예전엔 "마크다운 초안(GPT) → MDX 변환(Claude)" 2번 생성했지만,
//    지금은 Claude가 처음부터 완성 MDX를 1번만 쓴다 (5단계는 API 호출 없음)
//    → system 프롬프트에 03 지시문 + 05의 MDX 규칙 전문을 함께 넣는 이유
// 2. 3단계만 특수: 산출물이 파일 하나가 아니라 "편별 여러 파일" → 루프 필요
// 3. 매 편마다 전체 목차를 같이 보냄 — 자기 편의 경계를 알아야 중복을 안 만듦
// 4. 이어하기: 기본은 "없는 편만 생성" → 30편 돌리다 15편에서 끊겨도 같은 명령으로 재개
// 5. 순차 실행(await): 병렬로 쏘면 API 속도 제한(rate limit)에 걸리기 쉬움
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')
const { readInstruction, readOrFail, writeOut, parseToc, filterEpisodes } = require('../lib/files')

module.exports = {
  name: '본문작성(MDX)',
  provider: 'claude',

  //--------------------------------------------------------------------------------
  // [1] 실행
  // - 입력: 01_학습방향.md + 02_목차.md
  // - 출력: prompts/plan/[과목]/03_초안/NN_파일명.md (편별 1파일)
  // - opts.file: 특정 편만 (--file 05 또는 --file 05_full-name)
  // - opts.all: 이미 있는 편도 다시 생성
  //--------------------------------------------------------------------------------
  async run(dirs, opts, chat) {
    // 03 지시문 + 공통 MDX 규칙(00)을 하나의 system 프롬프트로 합친다
    const instruction =
      readInstruction('03_초안작성.md') +
      '\n\n---\n\n' +
      readInstruction('00_MDX규칙.md')
    const direction = readOrFail(path.join(dirs.plan, '01_학습방향.md'), '1단계를 먼저.')
    const toc = readOrFail(path.join(dirs.plan, '02_목차.md'), '2단계를 먼저.')

    //------------------------------------------------------------------------------
    // [2] 생성 대상 편 결정 (목차 파싱 → --file/--all 필터)
    //------------------------------------------------------------------------------
    let episodes = parseToc(toc)
    if (!episodes.length) throw new Error('02_목차.md에서 목차 표를 찾지 못했습니다.')

    if (opts.file) {
      // 편 지정: "편: 01 / 1-4 / 01,03,10 / 전부" — 지정된 편은 이미 있어도 다시 만든다 (수정용)
      episodes = filterEpisodes(episodes, opts.file)
      if (!episodes.length) throw new Error(`편: ${opts.file} 에 해당하는 편이 목차에 없습니다.`)
      console.log(`  편 지정: ${episodes.map((e) => e.file.slice(0, 2)).join(', ')}번 (있어도 재생성)`)
    } else if (!opts.all) {
      const nothingYet = episodes.every((e) => !fs.existsSync(path.join(dirs.draft, `${e.file}.mdx`)))
      episodes = episodes.filter((e) => !fs.existsSync(path.join(dirs.draft, `${e.file}.mdx`)))
      if (!episodes.length) return console.log('  모든 편이 이미 존재합니다 (다시 만들려면 "다시: 예").')

      //--------------------------------------------------------------------------
      // [2-1] 품질 게이트: 첫 실행이면 "1편만? 전부?"를 창에서 직접 물어본다
      // - 14편을 다 만들었는데 방향이 틀렸으면 14편치 비용을 날리기 때문
      // - 입력 불가 환경이면 안전하게 1편만 (전부: 예 로 질문 없이 전부)
      //--------------------------------------------------------------------------
      if (nothingYet && episodes.length > 1 && !opts.full) {
        const { ask } = require('../lib/ask')
        console.log(`  이 과목은 총 ${episodes.length}편입니다. 첫 실행이므로 선택하세요:`)
        const a = await ask('  [1] 1편만 만들어서 품질 확인 (권장)   [2] 전부 생성   → 번호 입력 후 엔터: ')
        if (a === '2') {
          console.log(`  전부 생성을 선택했습니다 (${episodes.length}편).`)
        } else {
          episodes = episodes.slice(0, 1)
          console.log('  1편만 생성합니다. 검토 후 같은 bat을 다시 누르면 나머지를 이어서 만듭니다.')
        }
      }
    }

    //------------------------------------------------------------------------------
    // [3] 편별 생성 루프
    //------------------------------------------------------------------------------
    console.log(`  총 ${episodes.length}편 생성`)
    for (const [i, ep] of episodes.entries()) {
      console.log(`  [${i + 1}/${episodes.length}편 (${Math.round((i / episodes.length) * 100)}% 완료)] ${ep.file} — ${ep.title}`)
      const result = await chat(
        instruction,
        [
          '# 학습 방향', direction,
          '# 전체 목차', toc,
          '# 이번 작업',
          `위 목차 중 **${ep.file} (${ep.title})** 한 편만 지시문대로 완성 MDX로 작성하라.`,
          '다른 편에 배정된 내용을 여기서 미리 다 설명하지 말고 이 편의 개념에 집중하라.',
          '코드펜스로 감싸지 말고 .mdx 파일 본문만 출력하라. frontmatter부터 시작하고, 맨 아래는 반드시 ## 참고 자료 섹션으로 끝내라.',
        ].join('\n\n')
      )
      // 모델이 습관적으로 ```mdx 로 감쌌으면 벗긴다
      const clean = result.replace(/^```mdx?\r?\n/, '').replace(/\r?\n```\s*$/, '')
      writeOut(path.join(dirs.draft, `${ep.file}.mdx`), clean)
    }
  },
}
