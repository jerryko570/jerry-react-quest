import { ReactNode } from 'react'

export default function SuspenseUseGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          로딩 상태를 컴포넌트 밖으로 &quot;계단&quot;처럼 꺼내자.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🪜'
          title='Suspense boundary 설계'
          hook='어디에 로딩을 붙일지가 UX'
        >
          <p>
            boundary의 위치가 &quot;뭘 같이 기다릴지&quot;를 정해. 위쪽이면 큰
            영역이 한 번에, 아래쪽이면 조각조각 따로.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`<Suspense fallback={<PageSkeleton />}>
  <Suspense fallback={<HeaderSkeleton />}>
    <Header />
  </Suspense>
  <Suspense fallback={<ListSkeleton />}>
    <List />
  </Suspense>
</Suspense>`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            👉 놀이기구의 &quot;중첩 Suspense&quot; 토글로 둘을 비교.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🔓'
          title='use hook으로 Promise 언래핑'
          hook='"pending이면 Suspense에 throw" 를 약속한 훅'
        >
          <p>
            React 19의 <code>use(promise)</code>는 Promise가 아직 안 풀렸으면
            Suspense로 던지고, 풀렸으면 값을 반환해. useState+useEffect 왕복
            없이 바로.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`function Posts({ promise }: { promise: Promise<Post[]> }) {
  const posts = use(promise)  // pending → Suspense
  return <List items={posts} />
}`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            ⚠️ <code>use</code>는 조건부 호출 불가. &quot;훅 규칙&quot; 동일
            적용.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🧯'
          title='Suspense + Error Boundary 조합'
          hook='로딩은 Suspense, 실패는 Error Boundary'
        >
          <p>
            둘은 짝이야. <b>ErrorBoundary가 바깥, Suspense가 안쪽</b>이 일반적.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`<ErrorBoundary fallback={<ErrorView />}>
  <Suspense fallback={<Loading />}>
    <Posts />
  </Suspense>
</ErrorBoundary>`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            성공: Posts · 로딩: Loading · 실패: ErrorView. 컴포넌트는 세
            시나리오를 컴포지션으로 분리.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🌊'
          title='Streaming SSR'
          hook='HTML을 쪼개서 흘려보내기'
        >
          <p>
            Next.js App Router에서 Suspense는 Streaming SSR의 핵심. 서버가
            준비되는 부분부터 HTML을 흘려보내고, 나머지는 fallback로 자리잡은 뒤
            나중에 교체.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🌊 첫 페인트(FCP)·LCP 개선</li>
            <li>🌊 느린 부분이 빠른 부분을 막지 않음</li>
            <li>
              🌊 <code>loading.tsx</code>로 라우트 단위 fallback 자동 생성
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
