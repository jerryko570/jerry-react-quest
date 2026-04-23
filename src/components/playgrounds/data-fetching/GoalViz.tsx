import { ReactNode } from 'react'

export default function DataFetchingGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          데이터는 서버에서, 상호작용은 클라에서.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🖥️'
          title='Server Component fetch'
          hook='초기 로드·SEO 최적'
        >
          <p>
            서버에서 fetch → HTML에 데이터 포함. 브라우저 JS 번들 작고 LCP 빨라.
            기본 캐시 정책은 <code>revalidate</code>로 세밀하게.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='🌐'
          title='Client TanStack Query'
          hook='인터랙션·폴링·무한 스크롤'
        >
          <p>
            사용자별 상태·무한 스크롤·자주 바뀌는 값. 서버가 초기 데이터를 넘겨
            hydrate하면 첫 로드도 빠름.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🌊'
          title='Streaming SSR'
          hook='빠른 부분부터 흘려보내기'
        >
          <p>
            Suspense boundary 단위로 HTML이 조각나서 전송. 느린 부분이 빠른
            부분을 막지 않음. TTFB·LCP 개선.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='⏱'
          title='Revalidation 전략'
          hook='시간·태그·경로로 무효화'
        >
          <p>
            ISR은 시간 기반, 태그는 사용자 액션 즉시 반영, <code>no-store</code>
            는 매 요청 새로. 각각 성격이 달라 혼합 가능.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='⚡'
          title='Optimistic Update'
          hook='UI 먼저 바꾸고 서버 확인은 나중'
        >
          <p>
            <code>useOptimistic</code> 훅이 서버 응답 실패 시 자동 롤백.
            좋아요·북마크 같은 &quot;빨라야 하는&quot; UX에.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='✏️'
          title='Mutation 패턴'
          hook='변경 + 관련 쿼리 재시작'
        >
          <p>
            TanStack Query의 <code>useMutation</code>은 optimistic + error
            rollback + invalidate 세트. Server Action이면{' '}
            <code>revalidateTag</code>가 동일 역할.
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
