import { ReactNode } from 'react'

export default function RenderingGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          &quot;리렌더&quot; 이 한 단어부터 확실히 잡자.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='⏯️'
          title='언제 다시 그려질까?'
          hook='state 또는 props가 바뀌면 그 컴포넌트와 자식들이 리렌더'
        >
          <p>리액트가 컴포넌트를 다시 그리는 순간은 크게 세 가지야.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🟢 <b>state가 바뀔 때</b> (<code>setState</code> 호출)
            </li>
            <li>
              🟢 <b>props가 바뀔 때</b> (부모가 새 값을 넘길 때)
            </li>
            <li>
              🟢 <b>부모가 리렌더될 때</b> (자식도 따라서 — 기본 동작)
            </li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구에서 부모 버튼 한 번 누를 때마다 자식 숫자가 올라가는 걸
            확인해봐.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🎬'
          title='Render → Commit 2단계'
          hook='머릿속 설계(Render) → 화면 실제 적용(Commit)'
        >
          <p>리렌더는 실제로 2단계야.</p>
          <ol className='mt-2 list-decimal space-y-1.5 pl-5 text-[13px]'>
            <li>
              <b>Render 단계</b>: 컴포넌트 함수 실행 → 새 가상 DOM 트리 계산. 이
              단계는 아직 화면에 아무 영향 없음.
            </li>
            <li>
              <b>Commit 단계</b>: 바뀐 부분만 실제 DOM에 반영 + useEffect 실행.
              여기서 화면이 진짜 바뀜.
            </li>
          </ol>
          <p className='mt-3 text-[12px] text-gray-500'>
            그래서 리렌더가 많아도 DOM이 안 바뀌면 사용자는 못 느껴. 하지만
            Render 단계 자체도 CPU를 쓰기 때문에 줄이는 게 좋아.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📉'
          title='메모이제이션이 왜 필요한지'
          hook='불필요한 리렌더를 건너뛰기 위한 장치'
        >
          <p>
            자식이 많거나 계산이 무거운 컴포넌트가 있을 때, 부모의 사소한
            변경으로 전체가 리렌더되면 브라우저가 바빠져.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🧙‍♂️ <code>useMemo</code>: 무거운 계산 결과 캐싱
            </li>
            <li>
              🎯 <code>useCallback</code>: 함수 참조 고정
            </li>
            <li>
              🛡️ <code>React.memo</code>: 자식 컴포넌트의 리렌더 스킵
            </li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            이 세 가지는 세트로 움직임. 다음 스테이지들에서 하나씩 깊게 다룸.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🧪'
          title='React.StrictMode의 역할'
          hook='개발 중 함수를 두 번 실행해 부작용을 드러냄'
        >
          <p>
            <code>&lt;StrictMode&gt;</code>로 감싼 트리는 <b>개발 모드에서만</b>{' '}
            컴포넌트 함수와 effect를 2번 실행해.
          </p>
          <p className='mt-2'>
            이건 버그가 아니라 기능. &quot;내 컴포넌트가 두 번 실행돼도
            안전한가?&quot;를 확인시켜 줘. side effect가 순수하지 않으면 여기서
            티 나.
          </p>
          <p className='mt-3 rounded-lg bg-amber-50 p-2 text-[12px] text-amber-900'>
            ⚠️ 프로덕션 빌드에선 한 번만 실행되니까 걱정 X
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
