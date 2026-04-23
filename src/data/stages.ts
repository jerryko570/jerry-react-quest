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
  bookRef: string
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
        bookRef: '책 2.4 ~ 2.5 · p.172~188',
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
    label: '🟡 메모이제이션 3종 세트 ⭐',
    sublabel: '지금 가장 궁금한 것 — useMemo, useCallback, React.memo',
    stages: [
      {
        id: 'stage-2-usememo',
        title: 'STAGE 2 · useMemo',
        subtitle: '값을 기억하는 마법',
        emoji: '🧙‍♂️',
        difficulty: 'easy',
        hours: 3,
        bookRef: '책 3.1.3 · p.208~209',
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
        title: 'STAGE 3 · useCallback',
        subtitle: '함수를 기억하는 마법',
        emoji: '🎯',
        difficulty: 'easy',
        hours: 3,
        bookRef: '책 3.1.4 · p.210~215',
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
        title: 'STAGE 4 · React.memo',
        subtitle: '자식을 보호하는 방패',
        emoji: '🛡️',
        difficulty: 'medium',
        hours: 4,
        bookRef: '책 2.5 심화 · p.182~188',
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
    ],
  },
  {
    id: 'core-hooks',
    label: '🟠 핵심 훅 깊게 파기',
    sublabel: '매일 쓰는 훅, 제대로 이해하기',
    stages: [
      {
        id: 'stage-5-usestate',
        title: 'STAGE 5 · useState 깊게',
        subtitle: '얕게 쓰다 당한 버그들',
        emoji: '📦',
        difficulty: 'medium',
        hours: 3,
        bookRef: '책 3.1.1 · p.189~195',
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
        title: 'STAGE 6 · useEffect 깊게',
        subtitle: '안 써도 되는 경우가 더 많다',
        emoji: '⚡',
        difficulty: 'hard',
        hours: 4,
        bookRef: '책 3.1.2 · p.196~207',
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
    ],
  },
  {
    id: 'patterns',
    label: '🔵 실전 패턴',
    sublabel: '포트폴리오에 바로 쓸 수 있는 패턴들',
    stages: [
      {
        id: 'stage-7-custom-hooks',
        title: 'STAGE 7 · 커스텀 훅',
        subtitle: '내 훅 만들기 실전',
        emoji: '🔨',
        difficulty: 'medium',
        hours: 5,
        bookRef: '책 3.2 · p.239~251',
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
        title: 'STAGE 8 · useRef',
        subtitle: 'DOM과 값의 두 얼굴',
        emoji: '🎯',
        difficulty: 'easy',
        hours: 2,
        bookRef: '책 3.1.5 · p.216~218',
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
    ],
  },
  {
    id: 'state',
    label: '🟣 상태 관리',
    sublabel: '규모가 커졌을 때 필요한 도구들',
    stages: [
      {
        id: 'stage-9-usecontext',
        title: 'STAGE 9 · useContext',
        subtitle: '상태 관리 아니에요. 주입이에요.',
        emoji: '🌐',
        difficulty: 'medium',
        hours: 3,
        bookRef: '책 3.1.6 · p.219~224',
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
        title: 'STAGE 10 · useReducer',
        subtitle: '복잡한 상태는 나눠 정복하라',
        emoji: '⚙️',
        difficulty: 'medium',
        hours: 3,
        bookRef: '책 3.1.7 · p.225~228',
        status: 'locked',
        goals: [
          'useState vs useReducer 선택 기준',
          '복잡한 상태 로직 관리',
          'dispatch 패턴',
        ],
        examples: ['Todo 리스트 (두 버전 비교)', '폼 상태 관리'],
        examplesLabel: '만들 예제 (2개)',
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
        bookRef: '종합 · 실전 디버깅',
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
    id: 'bonus',
    label: '🎁 BONUS · Next.js 16 특별판',
    sublabel: '나래님이 쓰고 있는 스택의 최신 기능',
    stages: [
      {
        id: 'bonus-app-router',
        title: 'BONUS · Next.js App Router',
        subtitle: '서버 컴포넌트의 신세계',
        emoji: '⚡',
        difficulty: 'bonus',
        hours: 5,
        bookRef: '책 11장 · p.715~774',
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
