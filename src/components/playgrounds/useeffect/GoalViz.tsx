import { ReactNode } from 'react'

export default function UseEffectGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          useEffect는 &quot;모든 것&quot;이 아니라 &quot;외부 세계와
          동기화&quot;의 훅.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🎭'
          title='생명주기 대체가 아니다'
          hook='"mount 때 이거 해라"가 아니라 "이 상태와 바깥 세상을 맞춰라"'
        >
          <p>
            예전 클래스 컴포넌트의 <code>componentDidMount</code>·
            <code>componentWillUnmount</code>를 직접 대응시키려 하면 대부분
            버그.
          </p>
          <p>
            useEffect의 진짜 질문은 &quot;이 값들이 바뀔 때마다, 외부 세계(DOM,
            타이머, 서버)를 어떻게 따라가게 할까?&quot;야.
          </p>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 deps 배열에 들어간 값들이 바뀌면 cleanup → 재실행. 매
            &quot;동기화 사이클&quot;마다.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='📋'
          title='의존성 배열의 진짜 의미'
          hook='ESLint 시키는 대로 다 넣어라, 진짜로'
        >
          <p>
            deps에 빠뜨린 값이 있으면 effect가 오래된 값으로 동작 (Stale
            Closure와 같은 원리).
          </p>
          <p className='mt-2'>
            &quot;너무 자주 실행된다&quot; 싶으면 deps에서 빼지 말고{' '}
            <b>왜 자주 바뀌는지를 고쳐</b>야 해 (useMemo/useCallback).
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// ❌ user를 빠뜨림
useEffect(() => log(user), [])

// ✅ 정직하게 다 넣기
useEffect(() => log(user), [user])`}
          </pre>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🧹'
          title='Cleanup 함수의 역할'
          hook='effect가 남긴 흔적을 치우는 청소부'
        >
          <p>
            effect가 setInterval, addEventListener, WebSocket 같은 &quot;외부
            자원&quot;을 열었다면 반드시 닫아줘야 해. 안 그러면 언마운트 후에도
            계속 살아서 메모리 누수·버그 원인.
          </p>
          <p className='mt-2'>
            cleanup은 <b>언마운트 시</b>는 물론 <b>deps가 바뀔 때도</b> 돌아.
            &quot;다시 동기화하기 전에 이전 상태 정리&quot; 순서라고 보면 돼.
          </p>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구 A에서 cleanup 토글 껐다 켰다 해봐.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🏁'
          title='Race Condition & 안 써도 되는 경우'
          hook='비동기는 가드. 그리고 useEffect 남발 금지'
        >
          <p>
            데이터 페칭은 race condition 주의. 새 요청이 시작될 때 이전
            요청/결과를 무효화해야 해 (AbortController + cancelled flag).
          </p>
          <p className='mt-2'>
            또 <b>렌더 중 계산</b>·<b>이벤트 핸들러</b>·<b>파생 상태</b>로 풀 수
            있는 문제를 굳이 useEffect로 끌어오지 마. 그건 과한 쓰임.
          </p>
          <p className='mt-3 rounded-lg bg-amber-50 p-2 text-[12px] text-amber-900'>
            ⚠️ &quot;useEffect 없이 풀 수 있나?&quot; 한 번 더 물어보자
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
