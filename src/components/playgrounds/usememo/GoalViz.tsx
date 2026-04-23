import { ReactNode } from 'react'

export default function UseMemoGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          공식을 외우지 말고, 버튼 먼저 눌러보고 직관부터 잡자.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        {/* 1 */}
        <GoalCard
          index='1'
          emoji='🧠'
          title='useMemo가 하는 일'
          hook='계산기 다시 두드리기 vs 종이에 답 적어두기'
        >
          <p>
            리액트는 화면이 바뀔 때마다 컴포넌트 함수를{' '}
            <b>처음부터 다시 실행</b>해 (= 리렌더). 그 안에 무거운 계산이 있으면
            매번 또 돌려야 해서 느려질 수 있어.
          </p>
          <p>
            <code className='bg-gray-100 px-1'>useMemo</code>는 &quot;입력이
            그대로면 지난번 답 그대로 줘&quot;라고 약속하는 장치야. 쉽게 말해
            <b>결과를 종이에 적어두고 다음번에 재사용</b>(메모이제이션)하는
            거야.
          </p>
          <div className='mt-3 flex items-center gap-2 rounded-lg bg-white p-3 font-mono text-xs ring-1 ring-gray-200'>
            <span className='rounded bg-gray-100 px-2 py-1'>입력 [a, b]</span>
            <span>→</span>
            <span className='rounded bg-amber-100 px-2 py-1'>🧮 계산</span>
            <span>→</span>
            <span className='rounded bg-emerald-100 px-2 py-1'>💾 저장</span>
          </div>
          <p className='mt-2 text-[11px] text-gray-500'>
            다음 렌더에서 입력이 같으면 🧮 단계 건너뛰고 💾에서 바로 꺼내 씀
          </p>
        </GoalCard>

        {/* 2 */}
        <GoalCard
          index='2'
          emoji='🌲'
          title='언제 써야 할까?'
          hook='감으로 쓰지 말고, 이유가 있을 때만'
        >
          <p className='text-[13px]'>
            다음 세 가지 중 하나라도 해당하면 useMemo 후보야.
          </p>
          <ul className='mt-2 space-y-1.5 text-[13px]'>
            <li>
              <b>Q1.</b> 실제로 측정했을 때 느린 계산인가?
            </li>
            <li>
              <b>Q2.</b> 자식이나 훅에 넘기는{' '}
              <b>객체·배열·함수를 안정적으로 유지</b>해야 하나?
            </li>
            <li>
              <b>Q3.</b> 이 값이 <code>useEffect</code>의 주시 목록(deps)에
              들어가나?
            </li>
          </ul>
          <p className='mt-3 rounded-lg bg-emerald-50 p-3 text-[13px] text-emerald-900'>
            ✅ 하나라도 <b>YES</b>면 useMemo 고려
          </p>
          <p className='mt-2 rounded-lg bg-red-50 p-3 text-[13px] text-red-900'>
            ❌ 전부 <b>NO</b>면 그냥 계산해 — 오히려 방해가 됨
          </p>
        </GoalCard>

        {/* 3 */}
        <GoalCard
          index='3'
          emoji='🚫'
          title='쓰면 안 되는 경우'
          hook='쉬운 일을 감싸면 오히려 느려진다'
        >
          <p>
            useMemo 자체도 <b>비교하고 저장하는 비용</b>이 있어. 2+2처럼
            순식간에 끝나는 계산을 감싸면 브라우저가 일을 더 많이 하게 돼.
          </p>
          <p>
            또 주시 목록에 매번 새로 만들어지는 값을 넣으면 저장한 답이{' '}
            <b>한 번도 재사용되지 않아</b>. 그럴 땐 감싸지 않느니만 못해.
          </p>
          <pre className='rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// 이런 건 감싸지 마세요
const total = useMemo(() => a + b, [a, b])`}
          </pre>
        </GoalCard>

        {/* 4 */}
        <GoalCard
          index='4'
          emoji='🔗'
          title='같은 물건인지 확인 (참조 동일성)'
          hook='내용이 같아도 "같은 물건"은 아닐 수 있다'
        >
          <p>
            자바스크립트에서 <code>{`{a: 1} === {a: 1}`}</code>은 결과가{' '}
            <b>false</b>야. 리액트는 props나 주시 목록을 비교할 때 이 규칙을 써.
          </p>
          <div className='mt-3 grid grid-cols-2 gap-2 text-center text-xs'>
            <div className='rounded-lg bg-red-50 p-3'>
              <div className='font-mono text-gray-700'>{`{ limit: 10 }`}</div>
              <div className='mt-1 text-[11px] text-red-600'>
                첫 렌더의 객체
              </div>
            </div>
            <div className='rounded-lg bg-red-50 p-3'>
              <div className='font-mono text-gray-700'>{`{ limit: 10 }`}</div>
              <div className='mt-1 text-[11px] text-red-600'>
                두 번째 렌더의 객체
              </div>
            </div>
          </div>
          <p className='mt-2 text-center font-mono text-sm text-red-600'>
            === <b>false</b>
          </p>
          <p className='mt-2'>
            <code className='bg-gray-100 px-1'>useMemo</code>로 감싸면 렌더가
            반복돼도 <b>같은 물건(같은 참조)</b>을 돌려받아서 하위가 &quot;안
            바뀌었네&quot; 하고 넘어갈 수 있어.
          </p>
        </GoalCard>

        {/* 5 */}
        <GoalCard
          index='5'
          emoji='🪢'
          title='useEffect와의 찰떡 관계'
          hook='주시 목록에 객체를 넣으면 참조로 비교된다'
        >
          <p>
            <code className='bg-gray-100 px-1'>useEffect(fn, [config])</code>는{' '}
            <b>주시 목록(deps) 안의 값이 바뀔 때만</b> 실행돼. 근데 그 값이 매
            렌더마다 새로 만들어진 객체면? 실제로 안 바뀌었어도 리액트는
            &quot;바뀐 것 같은데&quot;라며 effect를 또 돌려.
          </p>
          <div className='mt-3 space-y-1 text-xs'>
            <div className='flex items-center gap-2'>
              <span className='w-14 font-semibold text-red-600'>🔥 Chaos</span>
              <span className='font-mono'>🔴 🔴 🔴 🔴 🔴</span>
              <span className='text-gray-400'>매 렌더마다 effect 실행</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='w-14 font-semibold text-emerald-600'>
                ❄️ Calm
              </span>
              <span className='font-mono'>🔴 ⚪ ⚪ ⚪ ⚪</span>
              <span className='text-gray-400'>진짜 바뀔 때만 실행</span>
            </div>
          </div>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구 B에서 직접 눌러보며 effect 카운터로 확인
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
