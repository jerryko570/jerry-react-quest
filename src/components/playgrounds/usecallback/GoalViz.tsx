import { ReactNode } from 'react'

export default function UseCallbackGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          useCallback은 &quot;useMemo의 함수판&quot;이야. 쌍으로 이해하면 빠름.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🪞'
          title='useCallback = useMemo의 함수판'
          hook='"같은 함수를 또 돌려줘" 약속'
        >
          <p>
            <code>useCallback(fn, deps)</code>는{' '}
            <code>useMemo(() =&gt; fn, deps)</code>와 똑같아. 다만 함수가
            값이라서 문법적으로 편한 전용 버전이야.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// 둘은 같은 의미
const fn = useCallback(() => doIt(x), [x])
const fn = useMemo(() => () => doIt(x), [x])`}
          </pre>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🔗'
          title='함수 참조 동일성이 왜 중요한가'
          hook='넘겨받는 쪽이 참조로 비교하면 매번 다르다'
        >
          <p>
            JS에서 <code>{`(() => {}) === (() => {})`}</code> 은 항상{' '}
            <b>false</b>. 리액트는 props와 deps를 참조로 비교해. 그래서
            &quot;같은 일을 하는 함수&quot; 여도 매번 다르게 판정돼.
          </p>
          <p className='mt-2 text-[12px] text-gray-500'>
            👉 놀이기구에서 Fresh 자식 vs Stable 자식 카운트 차이로 확인.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🛡️'
          title='React.memo와의 시너지'
          hook='memo 혼자로는 반쪽, useCallback이 짝'
        >
          <p>
            <code>React.memo</code>로 자식을 감싸도 부모가 새 함수를 props로
            내려주면 의미 없음. <b>둘이 같이 있어야</b> 리렌더 스킵이 작동.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const Child = memo(ChildImpl)

function Parent() {
  const onClick = useCallback(fn, [])  // ← 이 짝이 있어야 memo 효과
  return <Child onClick={onClick} />
}`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🧩'
          title='커스텀 훅에서 왜 쓰는가'
          hook='훅이 돌려주는 함수도 참조가 흔들리면 안 됨'
        >
          <p>
            커스텀 훅이 <code>return fn</code>을 해주는데 그 함수를 다른 훅
            deps로 받아쓴다면, useCallback으로 감싸야 의도대로 동작해.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`function useToggle(initial: boolean) {
  const [v, setV] = useState(initial)
  const toggle = useCallback(() => setV(x => !x), [])
  return [v, toggle] as const
}`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            호출자가 <code>toggle</code>을 useEffect deps에 넣어도 무한 루프 안
            생김.
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
