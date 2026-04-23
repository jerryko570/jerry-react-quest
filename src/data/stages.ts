export type Difficulty =
  | 'tutorial'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'boss'
  | 'bonus'

export type StageStatus = 'locked' | 'active' | 'completed'

export type CategoryId = 'hooks' | 'perf' | 'state' | 'api' | 'infra'

export type StageProgress = {
  label: string
  current: number
  total: number
}

export type Stage = {
  id: string
  category: CategoryId
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

export type CategoryMeta = {
  id: CategoryId
  emoji: string
  label: string
  sublabel: string
  badge?: string
}

export const categoryMeta: CategoryMeta[] = [
  {
    id: 'hooks',
    emoji: '🎣',
    label: '훅',
    sublabel: '매일 쓰는 훅 제대로 이해하기',
  },
  {
    id: 'perf',
    emoji: '⚡',
    label: '성능',
    sublabel: '메모이제이션부터 Compiler까지',
    badge: '⭐',
  },
  {
    id: 'state',
    emoji: '🗂',
    label: '상태 관리',
    sublabel: '클라이언트부터 서버 상태까지',
  },
  {
    id: 'api',
    emoji: '🌊',
    label: 'API',
    sublabel: '비동기 · Suspense · 서버 컴포넌트',
  },
  {
    id: 'infra',
    emoji: '🛠',
    label: '인프라',
    sublabel: '접근성 · 테스트 · 품질',
  },
]

export const allStages: Stage[] = [
  // ────────── 🎣 훅 ──────────
  {
    id: 'stage-1-rendering',
    category: 'hooks',
    title: 'STAGE · 렌더링 기초',
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
  {
    id: 'stage-5-usestate',
    category: 'hooks',
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
    examples: ['Batch 실험', '게으른 초기화 성능 비교', 'Stale Closure 트랩'],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-6-useeffect',
    category: 'hooks',
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
    id: 'stage-7-custom-hooks',
    category: 'hooks',
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
    category: 'hooks',
    title: 'STAGE · useRef',
    subtitle: 'DOM과 값의 두 얼굴',
    emoji: '🎯',
    difficulty: 'easy',
    hours: 2,
    status: 'locked',
    goals: ['useRef의 2가지 용도', 'useState와 뭐가 다른지', 'forwardRef 패턴'],
    examples: [
      'DOM 직접 조작 (포커스, 스크롤)',
      'usePrevious 훅',
      'forwardRef Input 컴포넌트',
    ],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-error-boundary',
    category: 'hooks',
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

  // ────────── ⚡ 성능 ──────────
  {
    id: 'stage-2-usememo',
    category: 'perf',
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
    category: 'perf',
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
    category: 'perf',
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
    category: 'perf',
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
  {
    id: 'boss-rendering',
    category: 'perf',
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
  {
    id: 'stage-perf-advanced',
    category: 'perf',
    title: 'STAGE · 성능 최적화 심화',
    subtitle: '실제로 느린 앱을 빠르게 만드는 법',
    emoji: '🚀',
    difficulty: 'hard',
    hours: 6,
    status: 'locked',
    goals: [
      '코드 스플리팅 (dynamic import)',
      'React.lazy + Suspense',
      'Image 최적화 (Next/Image)',
      '폰트 최적화 (next/font)',
      'Bundle Analyzer로 크기 분석',
      'Web Vitals 개선 (LCP · FID · CLS)',
    ],
    examples: [
      '포폴 Lighthouse 70 → 95+ 만들기',
      '번들 사이즈 30% 줄이기',
      '초기 로딩 1초 이내',
    ],
    examplesLabel: '미션 (3개)',
  },

  // ────────── 🗂 상태 관리 ──────────
  {
    id: 'stage-9-usecontext',
    category: 'state',
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
    category: 'state',
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
    category: 'state',
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
  {
    id: 'stage-state-libs',
    category: 'state',
    title: 'STAGE · Zustand vs Jotai vs Redux Toolkit',
    subtitle: '언제 뭘 쓸지 결정하는 기준',
    emoji: '🏛️',
    difficulty: 'medium',
    hours: 4,
    status: 'locked',
    goals: [
      'Zustand (가장 쉬움, 추천)',
      'Jotai (atomic 패턴)',
      'Redux Toolkit (전통, 여전히 쓰임)',
      '언제 뭘 쓸지 결정 기준',
    ],
    examples: [
      '같은 Todo 앱을 3가지로 만들기',
      '성능 · 보일러플레이트 · DX 비교',
    ],
    examplesLabel: '비교 예제 (2개)',
  },

  // ────────── 🌊 API ──────────
  {
    id: 'stage-suspense-use',
    category: 'api',
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
    category: 'api',
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
    category: 'api',
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
  {
    id: 'stage-nextjs-routing',
    category: 'api',
    title: 'STAGE · Next.js 라우팅 마스터',
    subtitle: 'App Router의 모든 것',
    emoji: '🗺️',
    difficulty: 'medium',
    hours: 5,
    status: 'locked',
    goals: [
      'Dynamic Routes ([id], [...slug])',
      'Route Groups (그룹화)',
      'Parallel Routes (@slot)',
      'Intercepting Routes (모달 패턴)',
      'Loading · Error · Not Found UI',
      'Middleware',
    ],
    examples: [
      '블로그 상세 페이지 (Dynamic)',
      '모달 라우팅 (Instagram 스타일)',
      '인증 가드 (Middleware)',
    ],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-data-fetching',
    category: 'api',
    title: 'STAGE · Server vs Client Data Fetching',
    subtitle: '언제 서버, 언제 클라이언트?',
    emoji: '🔀',
    difficulty: 'hard',
    hours: 5,
    status: 'locked',
    goals: [
      'Server Component에서 fetch',
      'Client Component에서 TanStack Query',
      'Streaming SSR',
      'Revalidation 전략',
      'Optimistic Update',
      'Mutation 패턴',
    ],
    examples: [
      '블로그 목록 (SSG)',
      '댓글 (CSR + Optimistic)',
      '실시간 검색 (Debounce + Query)',
    ],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-auth-patterns',
    category: 'api',
    title: 'STAGE · Auth 패턴',
    subtitle: '로그인·권한·보호된 라우트',
    emoji: '🔐',
    difficulty: 'hard',
    hours: 5,
    status: 'locked',
    goals: [
      'NextAuth.js (Auth.js v5)',
      'JWT vs Session',
      'Protected Routes (Middleware)',
      'OAuth 구현 (Google · GitHub)',
      'Role-based Access Control',
    ],
    examples: [
      'GitHub OAuth 로그인 플로우',
      '보호된 라우트 미들웨어',
      '역할별 접근 제어',
    ],
    examplesLabel: '만들 예제 (3개)',
  },

  // ────────── 🛠 인프라 ──────────
  {
    id: 'stage-a11y',
    category: 'infra',
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
    category: 'infra',
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
  {
    id: 'stage-rhf-zod',
    category: 'infra',
    title: 'STAGE · React Hook Form + Zod',
    subtitle: '실무에서 매일 쓰는 폼 라이브러리',
    emoji: '📝',
    difficulty: 'medium',
    hours: 4,
    status: 'locked',
    goals: [
      'react-hook-form 기본 사용법',
      'Zod로 스키마 검증',
      'useFormContext로 깊은 컴포넌트 접근',
      'controlled vs uncontrolled 컴포넌트',
      '에러 메시지 처리',
    ],
    examples: [
      '회원가입 폼 (실시간 유효성 검증)',
      '다단계 폼 (Stepper)',
      '동적 필드 추가/삭제 (useFieldArray)',
    ],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-framer-motion',
    category: 'infra',
    title: 'STAGE · Framer Motion 마스터',
    subtitle: 'Motion의 언어로 UI를 생동감 있게',
    emoji: '🎭',
    difficulty: 'medium',
    hours: 5,
    status: 'locked',
    goals: [
      'AnimatePresence (mount/unmount)',
      'Shared Layout Animations',
      'Scroll 기반 애니메이션',
      'Gesture 애니메이션 (drag · hover)',
      'Variants 패턴',
    ],
    examples: [
      '페이지 전환 애니메이션',
      'Shared Element Transition (Hero)',
      'Drag & Drop 인터랙션',
      'Parallax Scroll',
    ],
    examplesLabel: '만들 예제 (4개)',
  },
  {
    id: 'stage-error-architecture',
    category: 'infra',
    title: 'STAGE · 에러 처리 아키텍처',
    subtitle: '프로덕션에서 망가져도 되살리기',
    emoji: '🚨',
    difficulty: 'hard',
    hours: 4,
    status: 'locked',
    goals: [
      'Error Boundary 계층 설계',
      'Sentry 연동',
      'Network 에러 vs Logic 에러 구분',
      '사용자 친화적 에러 메시지',
      'Retry 전략',
      'Fallback UI 패턴',
    ],
    examples: [
      'Global Error Boundary',
      '네트워크 끊김 감지',
      '에러 리포팅 시스템',
    ],
    examplesLabel: '만들 예제 (3개)',
  },
  {
    id: 'stage-design-system',
    category: 'infra',
    title: 'STAGE · 디자인 시스템 실전',
    subtitle: '디자이너 강점을 코드로',
    emoji: '🎨',
    difficulty: 'hard',
    hours: 6,
    status: 'locked',
    goals: [
      'Design Tokens 설계',
      'Compound Component 패턴',
      'Headless UI (Radix · Ark UI)',
      'Storybook 구축',
      'CVA로 Variants 관리',
      'Theme (라이트·다크) 전략',
    ],
    examples: [
      'Button 컴포넌트 (모든 variant)',
      'Modal (a11y + portal)',
      'Select (키보드 네비게이션)',
      'DataTable',
    ],
    examplesLabel: '만들 예제 (4개)',
  },
]

export const stagesByCategory = (category: CategoryId): Stage[] =>
  allStages.filter((s) => s.category === category)

export const isCategoryId = (
  value: string | null | undefined
): value is CategoryId =>
  value === 'hooks' ||
  value === 'perf' ||
  value === 'state' ||
  value === 'api' ||
  value === 'infra'

export const totalStages = allStages.length
export const totalExamples = allStages.reduce(
  (sum, s) => sum + s.examples.length,
  0
)
