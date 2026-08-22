const meta = {
  index: {
    title: '홈',
    theme: {
      layout: 'full',
      sidebar: false,
      toc: false,
      breadcrumb: false,
      pagination: false,
      copyPage: false,
    },
  },
  javascript: {
    title: 'JavaScript',
    type: 'menu',
    items: {
      WebAPIs: {
        title: 'Web APIs',
        href: '/javascript/WebAPIs/01_what-are-web-apis',
      },
      ECMAscript: {
        title: 'ECMAScript',
        href: '/javascript/ECMAscript/01_javascript-and-ecmascript',
      },
    },
  },
  독학사: {
    title: '독학사',
    type: 'menu',
    items: {
      basic_statics: {
        title: '1단계: 기초통계학',
        href: '/독학사/basic_statics/01_population-sample-and-data-types',
      },
      basic_math: {
        title: '1단계: 일반수학',
        href: '/독학사/basic_math/01_sets-and-operations',
      },
    },
  },
  자격증: {
    title: '자격증',
    type: 'menu',
    items: {
      리눅스마스터_1급: {
        title: '리눅스마스터 1급',
        href: '/자격증/리눅스마스터_1급/01_linux-architecture-and-distribution',
      },
      SQLD: {
        title: 'SQLD',
        href: '/자격증/SQLD/01_relational-database-and-table',
      },
      빅데이터분석기사_필기: {
        title: '빅데이터분석기사 필기',
        href: '/자격증/빅데이터분석기사_필기/01_data-analysis-problem-definition',
      },
    },
  },
}

export default meta