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
  react: {
    title: 'React',
    type: 'menu',
    items: {
      react_1: {
        title: 'React 기초',
        href: '/react/react_1/01_react-as-a-ui-library',
      },
      react_2: {
        title: 'React 중급',
        href: '/react/react_2/01_component-composition-basics',
      },
      react_3: {
        title: 'React 실무',
        href: '/react/react_3/01_server-vs-client-state',
      },
    },
  },
  javascript: {
    title: 'JavaScript',
    type: 'menu',
    items: {
      ECMAscript: {
        title: 'ECMAScript',
        href: '/javascript/ECMAscript/01_ecmascript-overview',
      },
      web_apis: {
        title: 'Web APIs',
        href: '/javascript/web_apis/01_web-platform-basics',
      },
    },
  },
  자격증: {
    title: '자격증',
    type: 'menu',
    items: {
      빅데이터분석기사_필기: {
        title: '빅데이터분석기사 필기',
        href: '/자격증/빅데이터분석기사_필기/01_exam-overview',
      },
      리눅스마스터_1급_1차: {
        title: '리눅스마스터 1급 1차',
        href: '/자격증/리눅스마스터_1급_1차/01_exam-overview',
      },
      네트워크관리사_2급_실기: {
        title: '네트워크관리사 2급 실기',
        href: '/자격증/네트워크관리사_2급_실기/01_network-basics-for-practical-use',
      },
      PC정비사_2급_실기: {
        title: 'PC정비사 2급 실기',
        href: '/자격증/PC정비사_2급_실기/01_pc-exam-roadmap',
      },
    },
  },
}

export default meta
