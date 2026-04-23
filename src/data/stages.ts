export type Difficulty =
  | 'tutorial'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'boss'
  | 'bonus'

export type StageStatus = 'locked' | 'active' | 'completed'

export type StageProgress = {
  label: string
  current: number
  total: number
}

export type Stage = {
  id: string
  title: string
  subtitle: string
  emoji: string
  difficulty: Difficulty
  hours: number
  status: StageStatus
  goals: string[]
  examples: string[]
  examplesLabel: string
  progress?: StageProgress
  highlight?: string
  isBoss?: boolean
}

export type Section = {
  id: string
  label: string
  sublabel: string
  stages: Stage[]
}

export const sections: Section[] = [
  {
    id: 'basics',
    label: '🟢 기본기 다지기',
    sublabel: '리액트 렌더링의 기본 원리부터',
    stages: [
      {
        id: 'stage-1-rendering',
        title: 'STAGE 1 · 렌더링 기초',
        subtitle: '리액트는 언제 다시 그려질까?',
        emoji: '🎬',
        difficulty: 'tutorial',
        hours: 2,
        status: 'locked',
        goals: [
          '리액트가 언제 다시 렌더링되는지',
          '렌더링 프로세스 (Render → Commit)',
          '메모이제이션이 왜 필요한지',
          'React.StrictMode의 역할',
        ],
        examples: [
          '리렌더 카운트 시각화',
          '부모-자식 리렌더 전파',
          'Render vs Commit',
        ],
        examplesLabel: '만들 예제 (3개)',
        progress: { label: '📝 블로그 · 퀴즈 3문제', current: 0, total: 3 },
      },
    ],
  },
  {
    id: 'memoization',
    label: '🟡 메모이제이션 3종 + Compiler ⭐',
    sublabel:
      '지금 가장 궁금한 것 — useMemo · useCallback · React.memo · Compiler',
    stages: [
      {
        id: 'stage-2-usememo',
        title: 'STAGE · useMemo',
        subtitle: '값을 기억하는 마법',
        emoji: '🧙‍♂️',
        difficulty: 'easy',
        hours: 3,
        status: 'active',
        highlight: '⭐ 지금 시작!',
        goals: [
          'useMemo의 동작 원리',
          '언제 써야 하는지 결정 트리',
          '언제 쓰면 안 되는지',
          '참조 동일성(referential equality)',
          'useEffect 의존성과의 관계',
        ],
        examples: [
          'Chaos Mode vs Calm Mode',
          'Object Reference Trap',
          '의존성 배열 실험실',
          '❌ 잘못된 사용 안티패턴',
        ],
        examplesLabel: '만들 예제 (4개)',
        progress: { label: '📝 블로그 · 퀴즈 5문제', current: 0, total: 4 },
      },
      {
        id: 'stage-3-usecallback',
        title: 'STAGE · useCallback',
        subtitle: '함수를 기억하는 마법',
        emoji: '🎯',
        difficulty: 'easy',
        hours: 3,
        status: 'locked',
        goals: [
          'useCallback과 useMemo의 관계',
          '함수 참조 동일성이 중요한 이유',
          'React.memo와의 시너지',
          '커스텀 훅에서 useCallback 쓰는 이유',
        ],
        examples: [
          '자식 컴포넌트 괴롭히기',
          'useEffect 무한 루프',
          '커스텀 훅 실험실',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-4-react-memo',
        title: 'STAGE · React.memo',
        subtitle: '자식을 보호하는 방패',
        emoji: '🛡️',
        difficulty: 'medium',
        hours: 4,
        status: 'locked',
        goals: [
          'React.memo 동작 원리 (shallow compare)',
          '언제 효과적 / 언제 쓸모없는지',
          '3종 세트의 조합 효과',
          '객체/배열/함수 props의 함정',
        ],
        examples: [
          '3종 세트 실험실',
          '함정 예제: 리렌더 디버깅',
          'Shallow Compare 시각화',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-react-compiler',
        title: 'STAGE · React Compiler',
        subtitle: '수동 메모이제이션은 과거형이 된다',
        emoji: '🤖',
        difficulty: 'hard',
        hours: 4,
        status: 'locked',
        goals: [
          'React Compiler가 무엇을 자동화하는지',
          '언제 수동 useMemo / useCallback이 여전히 필요한지',
          'eslint-plugin-react-compiler 설정',
          '컴파일러 친화적 코드 스타일',
          '3종 세트와의 새로운 관계',
        ],
        examples: [
          'Before/After 컴파일 결과 비교',
          '자동 메모이제이션 확인',
          '컴파일러가 놓치는 케이스',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
    ],
  },
  {
    id: 'core-hooks',
    label: '🟠 핵심 훅 깊게 파기',
    sublabel: '매일 쓰는 훅, 제대로 이해하기',
    stages: [
      {
        id: 'stage-5-usestate',
        title: 'STAGE · useState 깊게',
        subtitle: '얕게 쓰다 당한 버그들',
        emoji: '📦',
        difficulty: 'medium',
        hours: 3,
        status: 'locked',
        goals: [
          '배치 업데이트(batching)',
          '게으른 초기화(Lazy Init)',
          '함수형 업데이트 vs 값 업데이트',
          'setState의 비동기 동작',
        ],
        examples: [
          'Batch 실험',
          '게으른 초기화 성능 비교',
          'Stale Closure 트랩',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-6-useeffect',
        title: 'STAGE · useEffect 깊게',
        subtitle: '안 써도 되는 경우가 더 많다',
        emoji: '⚡',
        difficulty: 'hard',
        hours: 4,
        status: 'locked',
        goals: [
          'useEffect는 생명주기 대체가 아니다',
          '의존성 배열의 진짜 의미',
          'Cleanup 함수의 역할',
          'Race Condition 방지',
          '언제 useEffect를 쓰지 말아야 하는지',
        ],
        examples: [
          'Cleanup 실험실 (메모리 누수)',
          'Race Condition 디버깅',
          '의존성 배열 트러블슈팅',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-error-boundary',
        title: 'STAGE · Error Boundary',
        subtitle: '망가지는 걸 품위있게 담아내기',
        emoji: '🧯',
        difficulty: 'easy',
        hours: 2,
        status: 'locked',
        goals: [
          'Error Boundary가 잡는 것 / 못 잡는 것',
          'react-error-boundary 패키지 활용',
          'Suspense + Error Boundary 조합',
          '복구 가능한 폴백 UI 설계',
          'async 에러 핸들링 패턴',
        ],
        examples: [
          '에러 바운더리 계층 실험',
          '폴백 UI + 다시 시도 버튼',
          'async 에러 잡아내기',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
    ],
  },
  {
    id: 'patterns',
    label: '🔵 실전 패턴',
    sublabel: '포트폴리오에 바로 쓸 수 있는 패턴들',
    stages: [
      {
        id: 'stage-7-custom-hooks',
        title: 'STAGE · 커스텀 훅',
        subtitle: '내 훅 만들기 실전',
        emoji: '🔨',
        difficulty: 'medium',
        hours: 5,
        status: 'locked',
        goals: [
          '커스텀 훅 설계 원칙',
          'HOC vs 커스텀 훅',
          '반환값 최적화 패턴',
          '객체 반환 vs 배열 반환',
        ],
        examples: [
          'useCopyToClipboard',
          'useScrollReveal',
          'useMediaQuery',
          'useDebounce',
          'useOnClickOutside',
          'usePrevious',
        ],
        examplesLabel: '만들 훅 (6개)',
      },
      {
        id: 'stage-8-useref',
        title: 'STAGE · useRef',
        subtitle: 'DOM과 값의 두 얼굴',
        emoji: '🎯',
        difficulty: 'easy',
        hours: 2,
        status: 'locked',
        goals: [
          'useRef의 2가지 용도',
          'useState와 뭐가 다른지',
          'forwardRef 패턴',
        ],
        examples: [
          'DOM 직접 조작 (포커스, 스크롤)',
          'usePrevious 훅',
          'forwardRef Input 컴포넌트',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-a11y',
        title: 'STAGE · 접근성 (a11y)',
        subtitle: '모두가 쓸 수 있어야 완성이야',
        emoji: '♿',
        difficulty: 'medium',
        hours: 4,
        status: 'locked',
        goals: [
          'ARIA 속성의 기본 원리',
          '키보드 네비게이션 (focus trap)',
          'useId로 label-input 연결',
          '스크린 리더 테스트 워크플로우',
          ':focus-visible · 포커스 관리',
        ],
        examples: [
          '키보드만으로 탐색하는 모달',
          '스크린 리더가 읽어주는 토스트',
          '접근 가능한 탭 컴포넌트',
          'Skip to content 링크',
        ],
        examplesLabel: '만들 예제 (4개)',
      },
      {
        id: 'stage-testing',
        title: 'STAGE · 테스트 (RTL + Vitest)',
        subtitle: '리팩토링 두려움 없애기',
        emoji: '🧪',
        difficulty: 'medium',
        hours: 5,
        status: 'locked',
        goals: [
          'React Testing Library 철학 (user-centric)',
          '쿼리 우선순위 (role > label > text)',
          '커스텀 훅 테스트 (renderHook)',
          'MSW로 네트워크 모킹',
          '접근성 친화적 테스트 작성',
        ],
        examples: [
          '카운터 컴포넌트 테스트',
          '커스텀 훅 테스트 (useDebounce)',
          'MSW로 API 목킹',
          'userEvent vs fireEvent',
        ],
        examplesLabel: '만들 예제 (4개)',
      },
    ],
  },
  {
    id: 'state',
    label: '🟣 상태 관리',
    sublabel: '규모가 커졌을 때 필요한 도구들',
    stages: [
      {
        id: 'stage-9-usecontext',
        title: 'STAGE · useContext',
        subtitle: '상태 관리 아니에요. 주입이에요.',
        emoji: '🌐',
        difficulty: 'medium',
        hours: 3,
        status: 'locked',
        goals: [
          'Context는 상태 관리 도구가 아니다',
          'Context의 리렌더 문제',
          '언제 Context / 언제 라이브러리',
        ],
        examples: ['테마 토글 (다크모드)', 'Context 리렌더 실험'],
        examplesLabel: '만들 예제 (2개)',
      },
      {
        id: 'stage-10-usereducer',
        title: 'STAGE · useReducer',
        subtitle: '복잡한 상태는 나눠 정복하라',
        emoji: '⚙️',
        difficulty: 'medium',
        hours: 3,
        status: 'locked',
        goals: [
          'useState vs useReducer 선택 기준',
          '복잡한 상태 로직 관리',
          'dispatch 패턴',
        ],
        examples: ['Todo 리스트 (두 버전 비교)', '폼 상태 관리'],
        examplesLabel: '만들 예제 (2개)',
      },
      {
        id: 'stage-tanstack-query',
        title: 'STAGE · TanStack Query',
        subtitle: '서버 상태는 별세계야',
        emoji: '🛰️',
        difficulty: 'medium',
        hours: 5,
        status: 'locked',
        goals: [
          '서버 상태 vs 클라이언트 상태',
          '캐싱 · invalidate · refetch 전략',
          'optimistic update 패턴',
          'infinite query · pagination',
          'useMutation 핵심',
        ],
        examples: [
          '캐시 타임라인 시각화',
          '낙관적 업데이트 vs 비관적',
          '무한 스크롤 구현',
          'Query + Mutation 전체 흐름',
        ],
        examplesLabel: '만들 예제 (4개)',
      },
    ],
  },
  {
    id: 'boss',
    label: '👑 최종 보스전',
    sublabel: '실전 버그를 디버깅하며 배운 것 총정리',
    stages: [
      {
        id: 'boss-rendering',
        title: 'BOSS · 렌더링 최적화 보스전',
        subtitle: '실전 프로젝트 버그를 고쳐라',
        emoji: '👑',
        difficulty: 'boss',
        hours: 5,
        status: 'locked',
        isBoss: true,
        goals: [
          'React DevTools Profiler 활용',
          'Lighthouse 점수 개선',
          'Web Vitals 이해',
          '실전 디버깅 워크플로우',
        ],
        examples: [
          'Mission 1: 1000개 리스트 최적화',
          'Mission 2: 느린 검색창 고치기',
          'Mission 3: 스크롤 프레임 드랍',
          'Mission 4: 무한 렌더 루프 잡기',
        ],
        examplesLabel: '보스 미션 (4개)',
      },
    ],
  },
  {
    id: 'modern',
    label: '🔮 Modern React 19 + Next.js 16',
    sublabel: '2026년을 살아남는 최신 감각',
    stages: [
      {
        id: 'stage-suspense-use',
        title: 'STAGE · Suspense + use',
        subtitle: '로딩 상태를 계단처럼 쌓기',
        emoji: '⏳',
        difficulty: 'hard',
        hours: 4,
        status: 'locked',
        goals: [
          'Suspense boundary 설계',
          '`use` hook으로 Promise 언래핑',
          'Suspense + Error Boundary 조합',
          'Streaming SSR 원리',
          '폴백 중첩 전략',
        ],
        examples: [
          'Suspense fallback 중첩 UI',
          '`use(fetchPromise)` 패턴',
          'Streaming 체험 데모',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'stage-react-19-actions',
        title: 'STAGE · React 19 Actions',
        subtitle: '폼 + 낙관적 UI의 새 표준',
        emoji: '🎬',
        difficulty: 'hard',
        hours: 4,
        status: 'locked',
        goals: [
          'useActionState의 동작',
          'useFormStatus로 pending UI',
          'useOptimistic로 즉각 반응',
          'Server Actions와의 연결',
          '에러 처리 패턴',
        ],
        examples: [
          '좋아요 버튼 (낙관적 UI)',
          '로그인 폼 (pending 상태)',
          'Server Action + 낙관적 UI 조합',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
      {
        id: 'bonus-app-router',
        title: 'BONUS · Next.js App Router',
        subtitle: '서버 컴포넌트의 신세계',
        emoji: '⚡',
        difficulty: 'bonus',
        hours: 5,
        status: 'locked',
        goals: [
          '서버 vs 클라이언트 컴포넌트',
          "'use client' 경계 설정",
          'Server Actions',
          '캐싱 전략 (fetch + revalidate)',
        ],
        examples: [
          'Client vs Server 비교',
          'Streaming + Suspense',
          'Server Actions로 폼',
        ],
        examplesLabel: '만들 예제 (3개)',
      },
    ],
  },
]

export const allStages: Stage[] = sections.flatMap((s) => s.stages)
export const totalStages = allStages.length
export const totalExamples = allStages.reduce(
  (sum, s) => sum + s.examples.length,
  0
)
