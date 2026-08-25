'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from 'nextra/icons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DiIllustrator, DiPhotoshop } from 'react-icons/di'
import {
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNextra,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import styles from './home-landing-v2.module.css'

type PreviewKind = 'code' | 'browser' | 'sets' | 'chart' | 'sql'
type AccentColor = 'blue' | 'green' | 'red' | 'amber'
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

const techLogos = [
  { label: 'HTML', Icon: SiHtml5, color: '#e34f26' },
  { label: 'CSS', Icon: SiCss, color: '#1572b6' },
  { label: 'JavaScript', Icon: SiJavascript, color: '#d4a900' },
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178c6' },
  { label: 'React', Icon: SiReact, color: '#149eca' },
  { label: 'Next.js', Icon: SiNextdotjs, color: '#151515' },
  { label: 'Nextra', Icon: SiNextra, color: '#4913ec' },
  { label: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { label: 'Figma', Icon: SiFigma, color: '#f24e1e' },
  { label: 'Photoshop', Icon: DiPhotoshop, color: '#31a8ff' },
  { label: 'Illustrator', Icon: DiIllustrator, color: '#ff9a00' },
]
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
        documentCount: 22,
        preview: 'code',
        accent: 'blue',
      },
      {
        title: 'Web APIs',
        description: 'DOM, 이벤트, 네트워크처럼 브라우저가 제공하는 기능을 배웁니다.',
        href: '/javascript/WebAPIs/01_what-are-web-apis',
        documentCount: 15,
        preview: 'browser',
        accent: 'green',
      },
      {
        title: 'React',
        description: '컴포넌트와 훅으로 상태를 관리하며 인터랙티브 UI를 직접 만들어봅니다.',
        href: '/javascript/React/01_html-css-for-react',
        documentCount: 22,
        preview: 'code',
        accent: 'amber',
      },
      {
        title: 'TypeScript',
        description: '타입 시스템으로 JavaScript 코드에 안전장치를 더합니다.',
        href: '/javascript/TypeScript/01_typescript-overview',
        documentCount: 18,
        preview: 'code',
        accent: 'red',
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
        href: '/독학사/basic_math/01_numbers-and-real-line',
        documentCount: 37,
        preview: 'sets',
        accent: 'red',
      },
      {
        title: '1단계 기초통계학',
        description: '자료의 종류부터 확률과 추정까지 통계의 흐름을 익힙니다.',
        href: '/독학사/basic_statics/01_numbers-and-fractions',
        documentCount: 31,
        preview: 'chart',
        accent: 'amber',
      },
      {
        title: '2단계 운영체제',
        description: '프로세스, 메모리, 파일 시스템까지 컴퓨터가 작업을 처리하는 원리를 배웁니다.',
        href: '/독학사/os/01_computer-hardware-basics',
        documentCount: 15,
        preview: 'code',
        accent: 'blue',
      },
      {
        title: '2단계 컴퓨터구조',
        description: '논리 회로부터 CPU와 메모리 구조까지 하드웨어 동작 원리를 이해합니다.',
        href: '/독학사/computer_architecture/01_number-systems',
        documentCount: 15,
        preview: 'code',
        accent: 'green',
      },
      {
        title: '2단계 자료구조',
        description: '배열부터 트리·그래프까지 데이터를 효율적으로 다루는 구조를 익힙니다.',
        href: '/독학사/data_structure/01_variables-and-memory',
        documentCount: 18,
        preview: 'code',
        accent: 'amber',
      },
      {
        title: '2단계 이산수학',
        description: '집합, 명제, 그래프 이론 등 컴퓨터 과학의 수학적 기초를 다집니다.',
        href: '/독학사/discrete_math/01_sets-basics',
        documentCount: 16,
        preview: 'sets',
        accent: 'red',
      },
      {
        title: '2단계 머신러닝',
        description: '통계 기초부터 회귀·분류 모델까지 머신러닝의 흐름을 따라갑니다.',
        href: '/독학사/machine_learning/01_statistics-for-ml',
        documentCount: 18,
        preview: 'chart',
        accent: 'blue',
      },
      {
        title: '3단계 컴퓨터네트워크',
        description: 'OSI 7계층부터 프로토콜까지 네트워크가 동작하는 원리를 배웁니다.',
        href: '/독학사/computer_network/01_binary-and-hex',
        documentCount: 18,
        preview: 'browser',
        accent: 'green',
      },
      {
        title: '3단계 딥러닝',
        description: '퍼셉트론부터 신경망 학습까지 딥러닝의 핵심 개념을 다룹니다.',
        href: '/독학사/deep_learning/01_ml-review',
        documentCount: 22,
        preview: 'chart',
        accent: 'amber',
      },
      {
        title: '4단계 데이터베이스',
        description: '관계형 모델부터 정규화, SQL까지 데이터베이스 설계와 활용을 배웁니다.',
        href: '/독학사/database/01_relational-model-basics',
        documentCount: 17,
        preview: 'sql',
        accent: 'red',
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
        documentCount: 30,
        preview: 'sql',
        accent: 'blue',
      },
      {
        title: '빅데이터분석기사 필기',
        description: '분석 기획부터 탐색·모델링·결과 해석까지 데이터의 흐름을 배웁니다.',
        href: '/자격증/빅데이터분석기사_필기/01_statistics-basics',
        documentCount: 33,
        preview: 'chart',
        accent: 'green',
      },
      {
        title: '리눅스마스터 1급',
        description: '리눅스 아키텍처부터 명령어, 시스템 관리까지 실무 중심으로 정리합니다.',
        href: '/자격증/리눅스마스터_1급/01_linux-architecture-and-distribution',
        documentCount: 36,
        preview: 'code',
        accent: 'amber',
      },
      {
        title: '네트워크관리사 2급 실기',
        description: 'OSI 모델과 TCP/IP부터 네트워크 장비 설정까지 실기 시험을 준비합니다.',
        href: '/자격증/네트워크관리사_2급_실기/01_osi-and-tcp-ip',
        documentCount: 17,
        preview: 'browser',
        accent: 'red',
      },
      {
        title: 'PC정비사 2급 실기',
        description: '하드웨어 구성부터 조립·점검까지 PC 정비 실기를 단계별로 익힙니다.',
        href: '/자격증/PC정비사_2급_실기/01_pc-hardware-overview',
        documentCount: 15,
        preview: 'code',
        accent: 'blue',
      },
      {
        title: '정보처리기사 필기',
        description: '소프트웨어 공학부터 데이터베이스, 네트워크까지 필기 전 범위를 다룹니다.',
        href: '/자격증/정보처리기사_필기/01_software-engineering-overview',
        documentCount: 32,
        preview: 'code',
        accent: 'green',
      },
      {
        title: '정보처리기사 실기',
        description: '알고리즘 구현부터 SQL, 전산 영어까지 실기 시험 유형을 연습합니다.',
        href: '/자격증/정보처리기사_실기/01_practical-overview',
        documentCount: 22,
        preview: 'code',
        accent: 'amber',
      },
      {
        title: '서비스경험디자인기사 실기',
        description: '사용자 리서치부터 프로토타입까지 서비스 경험 디자인 실기를 준비합니다.',
        href: '/자격증/서비스경험디자인기사_실기/01_sxd-overview',
        documentCount: 18,
        preview: 'sets',
        accent: 'red',
      },
    ],
  },
]

function GridJunctions({ bottom = false, top = false }: { bottom?: boolean; top?: boolean }) {
  return (
    <>
      {top && <span aria-hidden="true" className={`${styles.gridJunction} ${styles.gridJunctionLeft} ${styles.gridJunctionTop}`} data-grid-junction />}
      {top && <span aria-hidden="true" className={`${styles.gridJunction} ${styles.gridJunctionRight} ${styles.gridJunctionTop}`} data-grid-junction />}
      {bottom && <span aria-hidden="true" className={`${styles.gridJunction} ${styles.gridJunctionLeft} ${styles.gridJunctionBottom}`} data-grid-junction />}
      {bottom && <span aria-hidden="true" className={`${styles.gridJunction} ${styles.gridJunctionRight} ${styles.gridJunctionBottom}`} data-grid-junction />}
    </>
  )
}
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

export function HomeLanding() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { duration: 0.6, ease: 'power2.out' } })
        .from('[data-gsap="hero-copy"]', { autoAlpha: 0, x: -18 })
        .from('[data-gsap="hero-video"]', { autoAlpha: 0, x: 18 }, 0.08)
        .from('[data-gsap="feature-rail"]', { autoAlpha: 0, y: 12 }, 0.22)

      gsap.utils.toArray<HTMLElement>('[data-gsap="scroll-reveal"]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 18,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        })
      })
    }, root)

    return () => context.revert()
  }, [])

  useEffect(() => {
    document.body.classList.add('home-page')
    const junctions = document.querySelectorAll<HTMLElement>('[data-grid-junction]')
    let lastRotation = 0

    const rotateJunctions = () => {
      const now = window.performance.now()
      if (now - lastRotation < 650) return
      lastRotation = now

      junctions.forEach((junction) => {
        delete junction.dataset.active
        void junction.offsetWidth
        junction.dataset.active = 'true'
      })
    }

    window.addEventListener('scroll', rotateJunctions, { passive: true })
    return () => {
      window.removeEventListener('scroll', rotateJunctions)
      document.body.classList.remove('home-page')
    }
  }, [])

  const showComingSoon = (name: string) => {
    window.alert(`${name}는 준비 중입니다.`)
  }

  return (
    <main ref={rootRef} className={`home-landing ${styles.home}`}>
      <div className={styles.frame}>
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.heroCopy} data-gsap="hero-copy">
            <div className={styles.badge}>
              <Image src="/zenoLogo.svg" alt="" width={20} height={20} />
              <span>ZENO AI DOCS</span>
            </div>
            <h1 id="home-title">학습 자료 정리<br />개인 문서입니다.</h1>
            <p>각 챕터는 5분 안에 빠르게 학습할 수 있도록 구성했습니다.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="#series">학습 시리즈 보기 <ArrowRightIcon aria-hidden="true" width="16" /></Link>
              <Link className={styles.secondaryAction} href="/javascript/ECMAscript/01_javascript-and-ecmascript">첫 문서 읽기</Link>
            </div>
          </div>

          <div className={styles.heroVideoPanel} data-gsap="hero-video" aria-hidden="true">
            <video autoPlay className={styles.heroVideo} loop muted playsInline preload="metadata">
              <source src="/pong-work.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        <div className={styles.featureRail} data-gsap="feature-rail" aria-label="학습 방식">
          <span><b>01</b> 5분 단위 개념</span><span><b>02</b> 실행 가능한 예제</span><span><b>03</b> 바로 푸는 문제</span>
          <GridJunctions bottom />
        </div>

        <section className={styles.catalog} id="series" aria-labelledby="series-title">
          <header className={styles.catalogHeader} data-gsap="scroll-reveal">
            <span>LEARNING LIBRARY</span><h2 id="series-title">배울 내용을 선택하세요</h2><p>과목별 시리즈를 선택하면 해당 문서의 첫 단계부터 시작합니다.</p>
          </header>

          {groups.map((group) => (
            <section className={styles.group} data-gsap="scroll-reveal" key={group.title} aria-labelledby={`group-${group.order}`}>
              <header className={styles.groupHeader}><span>{group.order}</span><div><h3 id={`group-${group.order}`}>{group.title}</h3><p>{group.description}</p></div></header>
                <span className={`${styles.groupJoint} ${styles.groupJointLeft}`} aria-hidden="true" data-grid-junction />
                <span className={`${styles.groupJoint} ${styles.groupJointRight}`} aria-hidden="true" data-grid-junction />
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


        <section className={styles.closing} data-gsap="scroll-reveal" aria-labelledby="closing-title">
          <GridJunctions top />
          <div className={styles.closingCopy}>
            <span>STUDY ROUTINE</span>
            <h2 id="closing-title">오늘의 한 문서가<br />내일의 감각이 됩니다.</h2>
            <p>짧게 읽고, 직접 확인하고, 다시 꺼내 보는 학습 기록을 쌓아갑니다.</p>
          </div>
          <div className={styles.closingSignal} aria-hidden="true">
              <div className={styles.signalStep}><span>01</span><div><b>READ</b><small>핵심 개념</small></div></div>
              <div className={styles.signalStep}><span>02</span><div><b>TRY</b><small>짧은 실행</small></div></div>
              <div className={styles.signalStep}><span>03</span><div><b>CHECK</b><small>문제 확인</small></div></div>
            </div>
            <div className={styles.closingAction}>
            <p>새로운 과목과 문서는 같은 학습 흐름 안에서 계속 추가됩니다.</p>
            <div className={styles.closingLinks}>
              <Link href="/javascript/ECMAscript/01_javascript-and-ecmascript">첫 문서 읽기 <ArrowRightIcon aria-hidden="true" width="16" /></Link>
              <Link href="#series">시리즈 전체 보기 <ArrowRightIcon aria-hidden="true" width="16" /></Link>
            </div>
            <small>현재 3개 영역 · 22개 학습 시리즈</small>
          </div>
        </section>

        <footer className={styles.siteFooter}>
          <GridJunctions top />
          <div className={styles.footerIdentity}>
            <span><Image src="/zenoLogo.svg" alt="" width={20} height={20} /> Zeno AI Docs</span>
            <p>읽고, 실행하고, 내 것으로 만드는 개인 학습 문서.</p>
          </div>
          <nav aria-label="외부 링크" className={styles.footerNav}>
              <Link href="/blog" onClick={(event) => { event.preventDefault(); showComingSoon('Blog') }}>Blog</Link>
              <Link href="/portfolio" onClick={(event) => { event.preventDefault(); showComingSoon('Portfolio') }}>Portfolio</Link>
              <a href="https://github.com/zenoK80" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
          <small className={styles.copyright}>© 2026 Zeno AI Docs</small>
          <div className={styles.studyTicker} aria-hidden="true">
            <div className={styles.tickerTrack}>
            {[0, 1].map((set) => (
              <div className={styles.tickerSet} key={set}>
                {techLogos.map(({ label, Icon, color }) => (
                  <span key={`${set}-${label}`}>
                    <Icon style={{ color }} />
                    <b>{label}</b>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        </footer>
      </div>
    </main>
  )
}
