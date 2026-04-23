import { ReactNode } from 'react'

export default function StateLibsGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          &quot;어떤 게 최고&quot;가 아니라 &quot;어떤 상황에 뭐가
          어울리나&quot;.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🐻'
          title='Zustand (가장 쉬움, 추천)'
          hook='Hook 기반 전역 store. Provider 없음'
        >
          <p>
            <code>create()</code> 한 줄로 store를 만들고, 컴포넌트는 훅처럼
            구독. 셀렉터로 부분만 골라 받으면 필요한 값 바뀔 때만 리렌더.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const count = useCounter(s => s.count)    // count만 구독
const inc = useCounter(s => s.inc)        // inc 함수만 구독`}
          </pre>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='⚛️'
          title='Jotai (atomic 패턴)'
          hook='작은 값 여러 개 = 여러 atom'
        >
          <p>
            state를 하나의 큰 store가 아니라 <b>여러 원자</b>로 나눠서 관리. 각
            원자를 독립적으로 구독·파생시킬 수 있어.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`const count = atom(0)
const doubled = atom(get => get(count) * 2)  // 파생

const [c] = useAtom(count)
const [d] = useAtom(doubled)  // c 바뀔 때만 여기도 바뀜`}
          </pre>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🧱'
          title='Redux Toolkit (전통, 여전히 쓰임)'
          hook='큰 팀의 규칙 강제 · 성숙한 devtools'
        >
          <p>
            &quot;액션 · 리듀서 · selector · 미들웨어&quot;의 정통파. RTK가
            Redux의 보일러플레이트를 줄이면서도 철학은 유지.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🎯 시간 여행 디버깅, action log가 필요할 때 최고</li>
            <li>🎯 RTK Query로 서버 상태도 한 스택에 통합 가능</li>
            <li>🎯 대규모 앱의 관례·패턴이 잘 문서화돼 있음</li>
          </ul>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🎯'
          title='언제 뭘 쓸지 결정 기준'
          hook='성능·보일러플레이트·DX 삼각 균형'
        >
          <table className='w-full text-[12px]'>
            <thead>
              <tr className='border-b border-gray-200 text-left text-gray-500'>
                <th className='py-1 pr-2'></th>
                <th className='py-1 pr-2'>Zustand</th>
                <th className='py-1 pr-2'>Jotai</th>
                <th className='py-1'>RTK</th>
              </tr>
            </thead>
            <tbody className='text-gray-700'>
              <tr className='border-b border-gray-100'>
                <td className='py-1 pr-2 font-semibold'>보일러</td>
                <td className='py-1 pr-2'>🟢 적음</td>
                <td className='py-1 pr-2'>🟢 적음</td>
                <td className='py-1'>🟡 중간</td>
              </tr>
              <tr className='border-b border-gray-100'>
                <td className='py-1 pr-2 font-semibold'>세밀 구독</td>
                <td className='py-1 pr-2'>🟢 셀렉터</td>
                <td className='py-1 pr-2'>🟢 atom</td>
                <td className='py-1'>🟢 selector</td>
              </tr>
              <tr>
                <td className='py-1 pr-2 font-semibold'>devtools</td>
                <td className='py-1 pr-2'>🟡 기본</td>
                <td className='py-1 pr-2'>🟡 기본</td>
                <td className='py-1'>🟢 최상</td>
              </tr>
            </tbody>
          </table>
          <p className='mt-3 text-[12px] text-gray-500'>
            💡 결정을 뒤집기 어려우니 팀 · 회사가 이미 쓰는 게 있으면 그대로
            따라가는 게 현실적.
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
