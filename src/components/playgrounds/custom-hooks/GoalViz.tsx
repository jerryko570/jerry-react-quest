import { ReactNode } from 'react'

export default function CustomHooksGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          복붙하던 로직을 &quot;내 훅&quot;으로 모으면 코드가 조용해진다.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🔧'
          title='커스텀 훅 설계 원칙'
          hook='use로 시작, 훅을 조합, 컴포넌트에서 쓰기 쉽게'
        >
          <p>커스텀 훅은 그냥 &quot;함수&quot;야. 세 가지만 지키면 돼.</p>
          <ol className='mt-2 list-decimal space-y-1 pl-5 text-[13px]'>
            <li>
              이름이 <code>use</code>로 시작 (ESLint가 훅 규칙 검사 가능)
            </li>
            <li>
              내부에서 다른 훅 자유롭게 호출 (<code>useState</code>,{' '}
              <code>useEffect</code>...)
            </li>
            <li>
              바깥에는 <b>최소한의 API</b>만 노출 (값 + 제어 함수 정도)
            </li>
          </ol>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🧩'
          title='HOC vs 커스텀 훅'
          hook='같은 재사용 문제, 훅이 대부분 승리'
        >
          <p>
            예전엔 <code>withAuth(Component)</code> 같은 HOC(고차 컴포넌트)로
            로직을 공유했어. 하지만 단점이 많았지.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>❌ HOC: prop 네이밍 충돌, 트리가 깊어짐, 타입이 꼬임</li>
            <li>✅ 훅: 트리 모양 유지, 반환값 이름 자유, 조합이 자연스러움</li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            💡 규칙: 로직만 공유하고 싶다 → 훅. 렌더 트리 자체를 감싸야 한다 →
            HOC 또는 Wrapper 컴포넌트.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📦'
          title='반환값 최적화 패턴'
          hook='useCallback·useMemo로 참조 안정 유지'
        >
          <p>
            커스텀 훅이 함수나 객체를 리턴하면, 쓰는 쪽에서 그 값을 다른 훅의
            deps로 받을 수 있어. 매번 새 참조면 하위 훅이 오동작.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`function useDialog() {
  const [open, setOpen] = useState(false)
  // ✅ 함수는 useCallback
  const show = useCallback(() => setOpen(true), [])
  const hide = useCallback(() => setOpen(false), [])
  return { open, show, hide }  // 또는 [open, show, hide] as const
}`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🎯'
          title='객체 반환 vs 배열 반환'
          hook='의미가 같은 값들 = 객체, 순서가 중요 = 배열'
        >
          <p>두 스타일 모두 표준적이야. 선택 기준:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              📦 <b>객체</b>: 필드가 많을 때, 쓰는 쪽이 일부만 골라쓸 때 (예:{' '}
              <code>{`{ data, error, loading }`}</code>)
            </li>
            <li>
              🎢 <b>배열</b>: 2~3개 값을 순서대로 쓸 때, 이름을 자유롭게 주고
              싶을 때 (<code>{`[value, setValue]`}</code>)
            </li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            💡 <code>useState</code>·<code>useReducer</code>가 배열을 돌려주는
            이유 — 이름을 자유롭게 받기 편해서.
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
