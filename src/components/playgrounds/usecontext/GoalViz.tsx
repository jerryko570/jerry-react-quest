import { ReactNode } from 'react'

export default function UseContextGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          Context는 &quot;주입 통로&quot;, 상태 관리 아님.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🚇'
          title='Context는 상태 관리 도구가 아니다'
          hook='값을 깊이 전달하는 통로일 뿐'
        >
          <p>
            Context가 하는 일은{' '}
            <b>Provider에 꽂힌 값을 하위 트리 어디서든 꺼내쓰게</b> 해주는 것.
            state를 &quot;만들어&quot; 주진 않아.
          </p>
          <p className='mt-2'>
            state는 여전히 <code>useState</code>/<code>useReducer</code>로
            관리하고, 그 값과 업데이트 함수를 Context로 내려보내는 구조야.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const ThemeContext = createContext<ThemeValue | null>(null)

function Provider({ children }) {
  const [theme, setTheme] = useState('light')   // ← state는 여기
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}`}
          </pre>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='📡'
          title='Context의 리렌더 문제'
          hook='value가 새 참조면 모든 구독자 리렌더'
        >
          <p>
            Provider의 value가 <b>참조로 비교</b>돼. 매 렌더마다 인라인 객체로
            넘기면 구독자 전원이 리렌더.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🔧 해결: <code>useMemo</code>/<code>useCallback</code>으로 안정화
            </li>
            <li>🔧 심화: Context를 여러 개로 쪼개기 (값 빈도별 분리)</li>
            <li>
              🔧 극단: <code>use-context-selector</code> 같은 셀렉터 패턴
            </li>
          </ul>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🎚️'
          title='언제 Context / 언제 라이브러리'
          hook='가벼운 전역값 = Context, 복잡한 상태 = 라이브러리'
        >
          <p>Context가 적합한 경우:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>✅ 테마 · 로케일 · 로그인 유저 정보 (드물게 바뀌는 전역값)</li>
            <li>✅ 한두 Provider로 끝나는 작은 앱</li>
            <li>✅ 디자인 시스템 테마 토큰 주입</li>
          </ul>
          <p className='mt-2'>라이브러리가 나은 경우:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🌊 자주 바뀌는 값, 수십 개 컴포넌트가 선택적 구독</li>
            <li>🌊 Devtools · 타임트래블 · 미들웨어 필요</li>
            <li>🌊 서버 상태 (그땐 TanStack Query로)</li>
          </ul>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🧩'
          title='Provider 컴포지션 패턴'
          hook='여러 Context를 섞어 쓸 때의 팁'
        >
          <p>
            앱 루트에 Provider가 쌓이면 읽기 어려워져. 감싸는 헬퍼를 만들자.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`function AppProviders({ children }: Props) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            + 각 Provider는 자체 <code>useTheme</code> 같은 훅을 export해서
            접근을 숨기면 더 안전해.
          </p>
        </GoalCard>
      </div>
    </section>
  )
}

function GoalCard({
  index,
  emoji,
  title,
  hook,
  children,
}: {
  index: string
  emoji: string
  title: string
  hook: string
  children: ReactNode
}) {
  return (
    <article className='rounded-2xl border-2 border-gray-100 bg-white p-5'>
      <header className='mb-3 flex items-start gap-3'>
        <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 font-mono text-xs font-bold text-white'>
          {index}
        </span>
        <div>
          <h4 className='font-extrabold'>
            <span className='mr-1'>{emoji}</span>
            {title}
          </h4>
          <p className='mt-0.5 text-xs text-[#ff5e48]'>💡 {hook}</p>
        </div>
      </header>
      <div className='space-y-2 text-sm text-gray-700'>{children}</div>
    </article>
  )
}
