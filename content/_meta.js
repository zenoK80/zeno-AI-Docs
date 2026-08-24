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
      ECMAscript: {
        title: 'ECMAScript',
        href: '/javascript/ECMAscript/01_javascript-and-ecmascript',
      },
      WebAPIs: {
        title: 'Web APIs',
        href: '/javascript/WebAPIs/01_what-are-web-apis',
      },
      React: {
        title: 'React',
        href: '/javascript/React/01_react-overview',
      },
      TypeScript: {
        title: 'TypeScript',
        href: '/javascript/TypeScript/01_typescript-overview',
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
      os: {
        title: '2단계: 운영체제',
        href: '/독학사/os/01_os-overview',
      },
      computer_architecture: {
        title: '2단계: 컴퓨터구조',
        href: '/독학사/computer_architecture/01_computer-architecture-overview',
      },
      data_structure: {
        title: '2단계: 자료구조',
        href: '/독학사/data_structure/01_data-structure-basics',
      },
      discrete_math: {
        title: '2단계: 이산수학',
        href: '/독학사/discrete_math/01_proposition-and-logic',
      },
      machine_learning: {
        title: '2단계: 머신러닝',
        href: '/독학사/machine_learning/01_ml-overview',
      },
      computer_network: {
        title: '3단계: 컴퓨터네트워크',
        href: '/독학사/computer_network/01_network-fundamentals',
      },
      deep_learning: {
        title: '3단계: 딥러닝',
        href: '/독학사/deep_learning/01_deep-learning-overview',
      },
      database: {
        title: '4단계: 데이터베이스',
        href: '/독학사/database/01_database-overview',
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
      네트워크관리사_2급_실기: {
        title: '네트워크관리사 2급 실기',
        href: '/자격증/네트워크관리사_2급_실기/01_osi-and-tcp-ip',
      },
      PC정비사_2급_실기: {
        title: 'PC정비사 2급 실기',
        href: '/자격증/PC정비사_2급_실기/01_pc-hardware-overview',
      },
      정보처리기사_필기: {
        title: '정보처리기사 필기',
        href: '/자격증/정보처리기사_필기/01_software-engineering-overview',
      },
      정보처리기사_실기: {
        title: '정보처리기사 실기',
        href: '/자격증/정보처리기사_실기/01_practical-overview',
      },
      서비스경험디자인기사_실기: {
        title: '서비스경험디자인기사 실기',
        href: '/자격증/서비스경험디자인기사_실기/01_sxd-overview',
      },
    },
  },
}

export default meta