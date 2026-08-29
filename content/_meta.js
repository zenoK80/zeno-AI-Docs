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
}

export default meta
