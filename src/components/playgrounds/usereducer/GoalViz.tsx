import { ReactNode } from 'react'

export default function UseReducerGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          상태가 복잡해지면 &quot;변화의 이름&quot;을 붙이자.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='⚖️'
          title='useState vs useReducer'
          hook='state 개수보다 "변화의 복잡도"가 기준'
        >
          <p>useState와 useReducer는 둘 다 state를 관리. 선택 기준은:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              📦 <b>useState</b> — 독립적인 단일 값 · 간단한 토글
            </li>
            <li>
              ⚙️ <b>useReducer</b> — 여러 state가 한 묶음 · 다양한 액션
            </li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            💡 &quot;toggle → filter 변경 → 완료 일괄 삭제&quot; 처럼 시나리오가
            많아지면 reducer 쪽이 훨씬 읽기 좋음.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🧠'
          title='복잡한 상태 로직 관리'
          hook='state 업데이트를 한 곳으로 모은다'
        >
          <p>
            useState 방식은 set 호출이 이벤트 핸들러마다 흩어져. 규칙이 깨지기
            쉬움.
          </p>
          <p className='mt-2'>
            reducer는 <b>모든 변화를 한 함수</b>에 모으고, 컴포넌트는 &quot;어떤
            일이 일어났는지&quot;만 선언 (<code>dispatch</code>). 관심사 분리가
            자연스러워.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📮'
          title='dispatch 패턴'
          hook='액션은 "일어난 일"의 이름'
        >
          <p>
            액션 타입은 도메인 이벤트로 이름 붙이자. <code>SET_TODOS</code>
            같은 setter 이름은 reducer의 장점을 깎아먹어.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// ❌ 값만 덮어쓰는 표현
dispatch({ type: 'SET_TODOS', payload: next })

// ✅ 의미를 드러내는 액션
dispatch({ type: 'add', text })
dispatch({ type: 'toggle', id })
dispatch({ type: 'clear-done' })`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🧪'
          title='reducer는 순수 함수'
          hook='테스트·디버깅 · 타임트래블이 쉽다'
        >
          <p>
            reducer는 <b>(state, action) → newState</b> 순수 함수. 외부 의존
            없음.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🧪 유닛 테스트: <code>reducer(state, action)</code>만 호출
            </li>
            <li>
              🔄 Redux Devtools · 타임트래블 디버깅 가능 (RTK와 같은 원리)
            </li>
            <li>
              🚫 reducer 안에서는 API 호출·setState 호출 금지 (사이드 이펙트는
              바깥에서)
            </li>
          </ul>
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
