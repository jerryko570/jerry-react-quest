import { ReactNode } from 'react'

export default function ErrorBoundaryGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          에러는 피할 수 없어. &quot;어떻게 격리하고 되살릴지&quot; 가 포인트.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🧯'
          title='잡는 것 / 못 잡는 것'
          hook='모든 에러를 잡는 마법이 아니다'
        >
          <p>
            Error Boundary가 <b>잡아주는</b> 영역:
          </p>
          <ul className='mt-1 space-y-0.5 text-[13px]'>
            <li>✅ 하위 트리의 렌더 중 throw</li>
            <li>✅ 라이프사이클 메서드 오류</li>
            <li>✅ 생성자 오류</li>
          </ul>
          <p className='mt-2'>
            반대로 <b>못 잡는</b> 영역:
          </p>
          <ul className='mt-1 space-y-0.5 text-[13px]'>
            <li>❌ 이벤트 핸들러 (onClick 등)</li>
            <li>❌ setTimeout / Promise / fetch 비동기</li>
            <li>❌ SSR 중에 발생한 오류</li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 비동기는 try/catch + toast, 이벤트 핸들러는 try/catch로 따로
            처리.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='📦'
          title='react-error-boundary 패키지'
          hook='클래스 컴포넌트 안 쓰고 훅으로 쓰는 표준'
        >
          <p>
            리액트 자체는 아직 Error Boundary를 <b>클래스 컴포넌트</b>로만
            제공해. 프로덕션에선{' '}
            <code className='bg-gray-100 px-1'>react-error-boundary</code>{' '}
            패키지가 사실상 표준.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`import { ErrorBoundary } from 'react-error-boundary'

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => resetApp()}
>
  <Dangerous />
</ErrorBoundary>`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            <code>useErrorBoundary()</code> 훅으로 수동 throw도 가능.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🎭'
          title='Suspense + Error Boundary 조합'
          hook='로딩은 Suspense, 실패는 Error Boundary'
        >
          <p>
            데이터 페칭에서는 둘을 함께 써. 순서는 <b>ErrorBoundary가 바깥</b>,
            Suspense가 안쪽.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`<ErrorBoundary fallback={<Err />}>
  <Suspense fallback={<Loading />}>
    <Posts />
  </Suspense>
</ErrorBoundary>`}
          </pre>
          <p className='mt-2 text-[12px] text-gray-500'>
            로딩 중엔 Loading, 실패하면 Err, 성공하면 Posts.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🔁'
          title='복구 가능한 폴백 UI'
          hook='에러 = 끝 아님. 다시 시도할 여지'
        >
          <p>좋은 폴백 UI는 세 가지를 갖춰야 해:</p>
          <ol className='mt-2 list-decimal space-y-1 pl-5 text-[13px]'>
            <li>
              <b>무엇이 잘못됐는지</b> 사용자 언어로 (&quot;서버와 연결이
              끊겼어요&quot;)
            </li>
            <li>
              <b>다시 시도 버튼</b> — 상태 리셋
            </li>
            <li>
              <b>피해 범위 격리</b> — 주변 UI는 유지
            </li>
          </ol>
          <p className='mt-3 text-[12px] text-gray-500'>
            놀이기구에서 &quot;🔁 다시 시도&quot; 버튼으로 state를 리셋해
            복구되는 흐름을 체험.
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
