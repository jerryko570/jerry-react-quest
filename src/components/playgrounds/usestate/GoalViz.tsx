import { ReactNode } from 'react'

export default function UseStateGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          단순해 보여도 의외로 함정이 많은 훅.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='📦'
          title='배치 업데이트 (batching)'
          hook='여러 setState를 묶어 한 번만 렌더'
        >
          <p>
            한 이벤트 핸들러 안에서 <code>setState</code>를 여러 번 호출해도
            리액트는 <b>한 번만 렌더</b>해. 그게 성능 최적화의 기본.
          </p>
          <p className='mt-2'>
            React 18부터는 <code>setTimeout</code>·<code>await</code>·Promise
            안에서도 batch가 작동해 (Automatic Batching).
          </p>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구 A에서 &quot;함수형 +3&quot; 눌러보고 렌더 횟수가 1만
            오르는지 확인.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🐌'
          title='게으른 초기화 (Lazy Init)'
          hook='초기값 계산이 무거우면 함수로 넘겨라'
        >
          <p>
            <code>useState(heavy())</code>는 <b>매 렌더마다</b> heavy()를 호출해
            (결과는 무시돼도). 반면 <code>useState(() =&gt; heavy())</code>는{' '}
            <b>처음 한 번만</b> 호출.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// ❌ 매 렌더마다 heavy() 실행
useState(heavy())

// ✅ 마운트 때 한 번만
useState(() => heavy())`}
          </pre>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🔄'
          title='함수형 vs 값 업데이트'
          hook='직전 state에 의존할 땐 함수형'
        >
          <p>
            <code>setCount(count + 1)</code>은 렌더 당시의 count에 의존. 여러 번
            쌓이거나 <code>setTimeout</code>에 들어가면 &quot;옛날 값&quot;으로
            계산돼.
          </p>
          <p>
            <code>setCount(c =&gt; c + 1)</code>은 &quot;지금 이 순간의 최신값에
            +1&quot;이란 약속이라 언제 실행돼도 안전.
          </p>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구 B가 이 차이를 극적으로 보여줌.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='⏱️'
          title='setState의 비동기 동작'
          hook='setState는 즉시 반영되지 않는다'
        >
          <p>
            <code>setCount(5)</code> 바로 뒤에 <code>console.log(count)</code>{' '}
            찍으면? 여전히 예전 값이야. count는 &quot;다음 렌더에&quot;
            업데이트돼.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`setCount(5)
console.log(count) // ❌ 아직 옛날 값`}
          </pre>
          <p className='mt-2'>
            업데이트 후의 값이 필요하면 <code>useEffect([count], ...)</code>{' '}
            에서 반응하거나, 함수형 업데이트 안에서 접근해.
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
