//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. bat 창에서 사용자에게 직접 물어보는 도구 (예: 1편만 만들까요? 전부 만들까요?)
// 2. 입력을 받을 수 없는 환경(자동 실행 등)에서는 빈 문자열이 돌아와서
//    호출한 쪽의 "안전한 기본값"이 선택된다
//----------------------------------------------------------------------------------
const readline = require('readline')

function ask(question) {
  return new Promise((resolve) => {
    let answered = false
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(question, (a) => {
      answered = true
      rl.close()
      resolve(a.trim())
    })
    rl.on('close', () => {
      if (!answered) resolve('') // 입력 불가 환경 → 기본값 선택
    })
  })
}

module.exports = { ask }
