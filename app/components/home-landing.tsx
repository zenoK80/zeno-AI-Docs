'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from 'nextra/icons'
import styles from './home-landing-v2.module.css'

type PreviewKind = 'code' | 'browser' | 'sets' | 'chart' | 'sql'
type AccentColor = 'blue' | 'green' | 'red' | 'amber'
type LessonStage = 'concept' | 'practice' | 'quiz'

const lessonStages: Array<{ id: LessonStage; label: string; description: string }> = [
  { id: 'concept', label: '1. 개념 읽기', description: '핵심 개념과 용어를 먼저 살펴봅니다.' },
  { id: 'practice', label: '2. 직접 실행', description: '짧은 예제를 직접 실행해 확인합니다.' },
  { id: 'quiz', label: '3. 문제 확인', description: '문제로 이해한 내용을 점검합니다.' },
]

type Series = {
  title: string
  description: string
  href: string
  documentCount: number
  preview: PreviewKind
  accent: AccentColor
}

type SeriesGroup = {
  title: string
  description: string
  order: string
  series: Series[]
}

const groups: SeriesGroup[] = [
  {
    title: 'JavaScript',
    description: '언어의 규칙부터 브라우저 기능까지, 코드를 직접 실행하며 익힙니다.',
    order: '01',
    series: [
      {
        title: 'ECMAScript',
        description: 'JavaScript의 표준 문법과 실행 환경의 경계를 이해합니다.',
        href: '/javascript/ECMAscript/01_javascript-and-ecmascript',
        documentCount: 1,
        preview: 'code',
        accent: 'blue',
      },
      {
        title: 'Web APIs',
        description: 'DOM, 이벤트, 네트워크처럼 브라우저가 제공하는 기능을 배웁니다.',
        href: '/javascript/WebAPIs/01_what-are-web-apis',
        documentCount: 1,
        preview: 'browser',
        accent: 'green',
      },
    ],
  },
  {
    title: '독학사',
    description: '시험 범위를 작은 학습 단위로 나누고 개념 확인 문제까지 이어서 공부합니다.',
    order: '02',
    series: [
      {
        title: '1단계 일반수학',
        description: '집합과 함수부터 미분·적분까지 필요한 수학 개념을 쌓습니다.',
        href: '/독학사/basic_math/01_sets-and-operations',
        documentCount: 1,
        preview: 'sets',
        accent: 'red',
      },
      {
        title: '1단계 기초통계학',
        description: '자료의 종류부터 확률과 추정까지 통계의 흐름을 익힙니다.',
        href: '/독학사/basic_statics/01_population-sample-and-data-types',
        documentCount: 1,
        preview: 'chart',
        accent: 'amber',
      },
    ],
  },
  {
    title: '자격증',
    description: '시험 범위를 개념, 예제, 문제 풀이 순서로 나누어 실전까지 연결합니다.',
    order: '03',
    series: [
      {
        title: 'SQLD',
        description: '데이터 모델링부터 SQL 조회와 조인까지, 결과표를 읽으며 익힙니다.',
        href: '/자격증/SQLD/01_relational-database-and-table',
        documentCount: 1,
        preview: 'sql',
        accent: 'blue',
      },
      {
        title: '빅데이터분석기사 필기',
        description: '분석 기획부터 탐색·모델링·결과 해석까지 데이터의 흐름을 배웁니다.',
        href: '/자격증/빅데이터분석기사_필기/01_data-analysis-problem-definition',
        documentCount: 1,
        preview: 'chart',
        accent: 'green',
      },
    ],
  },
]

function SeriesPreview({ kind }: { kind: PreviewKind }) {
  if (kind === 'code') {
    return (
      <div className={styles.codePreview} aria-hidden="true">
        <div className={styles.windowBar}>
          <i /><i /><i />
          <span>index.js</span>
        </div>
        <code><b>const</b> topic = <em>&apos;ECMAScript&apos;</em></code>
        <code><b>function</b> understand(value) {'{'}</code>
        <code className={styles.indent}>return value.<strong>practice</strong>()</code>
        <code>{'}'}</code>
      </div>
    )
  }

  if (kind === 'sql') {
    return (
      <div className={styles.codePreview} aria-hidden="true">
        <div className={styles.windowBar}>
          <i /><i /><i />
          <span>orders.sql</span>
        </div>
        <code><b>SELECT</b> customer, product</code>
        <code><b>FROM</b> orders</code>
        <code><b>WHERE</b> order_id = <strong>103</strong></code>
        <code>→ 민지 · 마우스</code>
      </div>
    )
  }

  if (kind === 'browser') {
    return (
      <div className={styles.browserPreview} aria-hidden="true">
        <div className={styles.windowBar}>
          <i /><i /><i />
          <span>Browser</span>
        </div>
        <div className={styles.browserCanvas}>
          <div className={styles.flowNode}>JavaScript</div>
          <b>→</b>
          <div className={styles.flowNode}>DOM</div>
          <b>→</b>
          <div className={styles.flowNode}>화면</div>
        </div>
        <div className={styles.browserCode}>button.addEventListener(&apos;click&apos;, start)</div>
      </div>
    )
  }

  if (kind === 'sets') {
    return (
      <div className={styles.setPreview} aria-hidden="true">
        <p>집합의 관계를 그림으로 이해하기</p>
        <div className={styles.setA}>A</div>
        <div className={styles.setB}>B</div>
        <strong>A ∩ B</strong>
      </div>
    )
  }

  return (
    <div className={styles.chartPreview} aria-hidden="true">
      <div className={styles.chartHeading}>
        <span>표본 데이터</span>
        <b>평균 35분</b>
      </div>
      <div className={styles.bars}>
        {[42, 66, 54, 88, 74].map((height, index) => (
          <i key={index} style={{ height: `${height}%` }}>
            <span>{index + 1}</span>
          </i>
        ))}
      </div>
    </div>
  )
}

function StagePreview({
  stage,
  quizChoice,
  onQuizChoice,
}: {
  stage: LessonStage
  quizChoice: number | null
  onQuizChoice: (choice: number) => void
}) {
  if (stage === 'practice') {
    return (
      <div className={styles.practicePreview}>
        <header><span>playground.js</span><b>RUN</b></header>
        <code><i>01</i><b>const</b> next = study()</code>
        <code><i>02</i>next.<strong>practice</strong>()</code>
        <code><i>03</i>console.log(next)</code>
        <footer><span /> 실행 결과: 다음 단계로 이동합니다.</footer>
      </div>
    )
  }

  if (stage === 'quiz') {
    return (
      <div className={styles.quizPreview}>
        <header><span>QUICK CHECK</span><b>01 / 03</b></header>
        <p>표본에서 계산한 수치를 무엇이라고 할까요?</p>
        <button aria-pressed={quizChoice === 1} className={quizChoice === 1 ? styles.selectedChoice : undefined} onClick={() => onQuizChoice(1)} type="button">01　모수</button>
        <button aria-pressed={quizChoice === 2} className={quizChoice === 2 ? styles.selectedChoice : undefined} onClick={() => onQuizChoice(2)} type="button">02　통계량</button>
        <footer aria-live="polite">
          {quizChoice === null && '답을 선택하면 바로 해설을 확인할 수 있습니다.'}
          {quizChoice === 1 && '다시 생각해 보세요. 모수는 모집단의 특성을 나타내는 값입니다.'}
          {quizChoice === 2 && '정답입니다. 표본에서 계산한 값은 통계량입니다.'}
        </footer>
      </div>
    )
  }

  return (
    <div className={styles.conceptPreview}>
      <header><span>CORE CONCEPT</span><b>5 MIN</b></header>
      <div className={styles.conceptCopy}>
        <span>01</span>
        <div><small>일반수학 · 집합</small><strong>A ∪ B</strong><p>A 또는 B에 속하는 모든 원소를 모은 집합입니다.</p></div>
      </div>
      <div className={styles.conceptSets} aria-hidden="true"><span>A</span><span>B</span></div>
    </div>
  )
}

export function HomeLanding() {
  const [activeStage, setActiveStage] = useState<LessonStage>('concept')
  const [quizChoice, setQuizChoice] = useState<number | null>(null)

  return (
    <main className={`home-landing ${styles.home}`}>
      <div className={styles.frame}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy}>
            <div className={styles.badge}>
              <Image src="/zenoLogo.svg" alt="" width={20} height={20} />
              <span>ZENO AI DOCS</span>
            </div>
            <h1 id="home-title">학습 자료 정리<br />개인 문서입니다.</h1>
            <p>각 챕터는 5분 안에 빠르게 학습할 수 있도록 구성했습니다</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="#series">학습 시리즈 보기 <ArrowRightIcon aria-hidden="true" width="16" /></Link>
              <Link className={styles.secondaryAction} href="/javascript/ECMAscript/01_javascript-and-ecmascript">첫 문서 읽기</Link>
            </div>
          </div>

          <div className={styles.demoPanel}>
            <div className={styles.demoHeading}><span><i /> LIVE STUDY PREVIEW</span><b>01 / FLOW</b></div>
            <div className={styles.stageTabs} aria-label="학습 단계">
              {lessonStages.map((stage) => (
                <button aria-pressed={activeStage === stage.id} className={activeStage === stage.id ? styles.activeTab : undefined} key={stage.id} onClick={() => setActiveStage(stage.id)} type="button">
                  {stage.label}
                </button>
              ))}
            </div>
            <div className={styles.demoViewport}>
              <StagePreview onQuizChoice={setQuizChoice} quizChoice={quizChoice} stage={activeStage} />
            </div>
          </div>
        </section>

        <div className={styles.featureRail} aria-label="학습 방식">
          <span><b>01</b> 5분 단위 개념</span><span><b>02</b> 실행 가능한 예제</span><span><b>03</b> 바로 푸는 문제</span>
        </div>

        <section className={styles.catalog} id="series" aria-labelledby="series-title">
          <header className={styles.catalogHeader}>
            <span>LEARNING LIBRARY</span><h2 id="series-title">배울 내용을 선택하세요</h2><p>과목별 시리즈를 선택하면 해당 문서의 첫 단계부터 시작합니다.</p>
          </header>

          {groups.map((group) => (
            <section className={styles.group} key={group.title} aria-labelledby={`group-${group.order}`}>
              <header className={styles.groupHeader}><span>{group.order}</span><div><h3 id={`group-${group.order}`}>{group.title}</h3><p>{group.description}</p></div></header>
              <div className={styles.seriesGrid}>
                {group.series.map((series) => (
                  <Link className={styles.seriesCard} data-accent={series.accent} href={series.href} key={series.title}>
                    <div className={styles.cardBody}><div><span className={styles.count}>{String(series.documentCount).padStart(2, '0')} DOCUMENT</span><h4>{series.title}</h4><p>{series.description}</p></div><span className={styles.openLabel}>시작하기 <ArrowRightIcon aria-hidden="true" width="15" /></span></div>
                    <div className={styles.previewWrap}><SeriesPreview kind={series.preview} /></div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </section>

        <section className={styles.closing}><span>START SMALL, KEEP GOING</span><h2>하루 하루<br />가볍게 읽으세요.</h2><Link href="/javascript/ECMAscript/01_javascript-and-ecmascript">첫 문서 읽기 <ArrowRightIcon aria-hidden="true" width="16" /></Link></section>
      </div>
    </main>
  )
}
