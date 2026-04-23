import { ReactNode } from 'react'

export default function ReactMemoGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          memo는 &quot;props가 같으면 날 스킵하라&quot;는 약속일 뿐.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🛡️'
          title='React.memo 동작 원리'
          hook='얕은 비교(shallow compare)로 props 체크'
        >
          <p>
            <code>memo(Component)</code>로 감싸면 리액트가 <b>매 렌더 직전</b>{' '}
            props를 이전 props와 비교해. 같으면 리렌더를 건너뛰어.
          </p>
          <p className='mt-2'>
            비교는 <b>얕은 비교</b>. 각 prop에 대해 <code>Object.is</code>로
            체크. 원시값은 값으로, 객체·배열·함수는 <b>참조로</b>.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='💊'
          title='언제 효과적인가'
          hook='큰 컴포넌트 + 참조 안정된 props'
        >
          <p>memo가 의미 있는 조건:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🎯 렌더 자체가 <b>비용이 큰</b> 컴포넌트 (DOM 많거나 계산 많음)
            </li>
            <li>🎯 부모가 자주 리렌더되는데 이 자식은 가끔만 바뀜</li>
            <li>
              🎯 props 참조가 <b>안정</b>되어 있음 (useMemo/useCallback와 함께)
            </li>
          </ul>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🚫'
          title='언제 쓸모없는가'
          hook='가벼운 컴포넌트 + 불안정 props = 낭비'
        >
          <p>memo 자체도 비교 비용이 있어. 이럴 땐 오히려 손해.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>❌ 렌더링이 원래 가벼운 컴포넌트 (text, span 등)</li>
            <li>❌ props로 객체·배열·함수를 참조 고정 없이 넘기는 경우</li>
            <li>❌ 부모와 함께 거의 항상 같이 바뀌는 자식</li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 측정해보고 효과가 보일 때만.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🎪'
          title='3종 세트의 조합 효과'
          hook='memo + useMemo + useCallback 세트로'
        >
          <p>이 셋은 하나씩 쓰는 게 아니라 팀플레이야.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🧙‍♂️ <code>useMemo</code> → 넘기는 값(객체·배열) 참조 고정
            </li>
            <li>
              🎯 <code>useCallback</code> → 넘기는 함수 참조 고정
            </li>
            <li>
              🛡️ <code>React.memo</code> → 자식이 스킵할 권한 획득
            </li>
          </ul>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const Child = memo(ChildImpl)

function Parent() {
  const data = useMemo(() => build(), [])
  const onAction = useCallback(() => ..., [])
  return <Child data={data} onAction={onAction} />
}`}
          </pre>
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
