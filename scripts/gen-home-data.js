//----------------------------------------------------------------------------------
// [핵심 개념]
// 1. 홈 화면 카드를 하드코딩하지 않는다 — content/ 폴더를 스캔해서
//    카테고리(영역) → 과목(시리즈) → 문서 수·첫 문서 링크·설명을 자동 수집
// 2. 결과를 app/components/home-data.json 으로 저장 → HomeLanding이 import
// 3. npm run dev / build 시작 시 자동 실행(package.json의 predev/prebuild)
//    → 과목 폴더가 생기거나 문서가 늘면 홈이 알아서 갱신됨
//----------------------------------------------------------------------------------
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CONTENT = path.join(ROOT, 'content')
const OUT = path.join(ROOT, 'app', 'components', 'home-data.json')

//----------------------------------------------------------------------------------
// [1] 유틸: 폴더 목록 / frontmatter 필드 / _meta.js 제목 추출
//----------------------------------------------------------------------------------
function dirsIn(p) {
  if (!fs.existsSync(p)) return []
  return fs.readdirSync(p, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
}

function mdxFilesIn(p) {
  return fs.readdirSync(p).filter((f) => f.endsWith('.mdx')).sort()
}

/** .mdx 상단 frontmatter에서 필드 하나 꺼내기 (예: description) */
function frontmatterField(file, field) {
  try {
    const head = fs.readFileSync(file, 'utf8').slice(0, 800)
    const m = head.match(new RegExp(`^${field}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'))
    return m ? m[1] : null
  } catch {
    return null
  }
}

/** _meta.js 텍스트에서 "키 → 표시 제목" 짝 추출 (key-value형과 { title: } 형 모두) */
function metaTitles(metaPath) {
  const titles = {}
  if (!fs.existsSync(metaPath)) return titles
  const text = fs.readFileSync(metaPath, 'utf8')
  for (const m of text.matchAll(/['"]?([\w.-]+)['"]?\s*:\s*['"]([^'"]+)['"]\s*,/g)) {
    titles[m[1]] = m[2]
  }
  // "{ title: '...' }" 형: title이 객체의 첫 속성일 때만 짝으로 인정 (중첩 객체 오인 방지)
  for (const m of text.matchAll(/['"]?([\w.-]+)['"]?\s*:\s*\{\s*title\s*:\s*['"]([^'"]+)['"]/g)) {
    titles[m[1]] = m[2]
  }
  return titles
}

//----------------------------------------------------------------------------------
// [2] 카드 장식 고르기 (미리보기 그림·색상)
// - 내용과 무관한 장식이므로 제목 키워드로 어울리는 걸 고르고, 색은 순환
//----------------------------------------------------------------------------------
function pickPreview(title) {
  const t = title.toLowerCase()
  if (/sql|데이터베이스|database/.test(t)) return 'sql'
  if (/네트워크|network|web|api|브라우저/.test(t)) return 'browser'
  if (/수학|집합|이산|math/.test(t)) return 'sets'
  if (/통계|데이터|머신|딥|분석|chart/.test(t)) return 'chart'
  return 'code'
}
const ACCENTS = ['blue', 'green', 'amber', 'red']

//----------------------------------------------------------------------------------
// [3] content/ 스캔 → 카테고리/과목 트리 구성
// - 카테고리 = content/ 바로 아래 폴더, 과목 = 그 아래 폴더 (mdx가 1개 이상인 것만)
// - 과목 제목: 카테고리 _meta.js에 있으면 그 표기, 없으면 폴더명
// - 과목 설명: 첫 문서 frontmatter description
//----------------------------------------------------------------------------------
const OVERRIDES_PATH = path.join(ROOT, 'app', 'components', 'home-overrides.json')
const OVERRIDES = fs.existsSync(OVERRIDES_PATH) ? JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8')) : {}

const topTitles = metaTitles(path.join(CONTENT, '_meta.js'))
const groups = []
let seriesTotal = 0
let accentIdx = 0

for (const cat of dirsIn(CONTENT)) {
  const catDir = path.join(CONTENT, cat)
  const subjectTitles = metaTitles(path.join(catDir, '_meta.js'))
  const series = []

  for (const subject of dirsIn(catDir)) {
    const subjDir = path.join(catDir, subject)
    const files = mdxFilesIn(subjDir)
    if (!files.length) continue

    const first = files[0]
    // 제목 우선순위: 카테고리 _meta.js > 최상위 _meta.js의 메뉴 항목 > 폴더명
    const title = subjectTitles[subject] || topTitles[subject] || subject
    // 카드 설명 우선순위: home-overrides.json(직접 지정) > 첫 문서 frontmatter > 기본 문구
    // (content/ 안에 .txt를 두면 nextra 빌드가 깨져서 오버라이드는 밖에 둔다)
    const about = OVERRIDES[subject] || null
    series.push({
      title,
      description:
        about ||
        frontmatterField(path.join(subjDir, first), 'description') ||
        `${title} 과목 — 총 ${files.length}편`,
      href: `/${cat}/${subject}/${first.replace(/\.mdx$/, '')}`,
      documentCount: files.length,
      preview: pickPreview(title),
      accent: ACCENTS[accentIdx++ % ACCENTS.length],
    })
  }

  // 카테고리 폴더 자체에 mdx가 바로 있는 경우(과목 폴더 없이)도 하나의 시리즈로 취급
  const directFiles = mdxFilesIn(catDir)
  if (!series.length && directFiles.length) {
    const first = directFiles[0]
    const title = topTitles[cat] || cat
    series.push({
      title,
      description: frontmatterField(path.join(catDir, first), 'description') || `${title} — 총 ${directFiles.length}편`,
      href: `/${cat}/${first.replace(/\.mdx$/, '')}`,
      documentCount: directFiles.length,
      preview: pickPreview(title),
      accent: ACCENTS[accentIdx++ % ACCENTS.length],
    })
  }

  if (!series.length) continue
  seriesTotal += series.length
  groups.push({
    title: topTitles[cat] || cat.charAt(0).toUpperCase() + cat.slice(1),
    description: `${series.length}개 시리즈 · 문서 ${series.reduce((n, s) => n + s.documentCount, 0)}편`,
    order: String(groups.length + 1).padStart(2, '0'),
    series,
  })
}

//----------------------------------------------------------------------------------
// [4] 저장
//----------------------------------------------------------------------------------
const data = { generatedAt: new Date().toISOString(), groupCount: groups.length, seriesCount: seriesTotal, groups }
fs.writeFileSync(OUT, JSON.stringify(data, null, 2) + '\n', 'utf8')
console.log(`홈 데이터 생성: ${path.relative(ROOT, OUT)} (영역 ${groups.length}개 · 시리즈 ${seriesTotal}개)`)
