import { ReactNode } from 'react'

export default function ErrorArchitectureGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          에러는 피할 수 없어. 대신 잘 대처할 수는 있어.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🏗️'
          title='Error Boundary 계층 설계'
          hook='전역·라우트·위젯 3단'
        >
          <p>
            가장 안쪽에서 잡을 수 있게. 전역(
            <code>global-error.tsx</code>)은 최후 방어선. 라우트(
            <code>error.tsx</code>)는 페이지 단위. 위젯은{' '}
            <code>react-error-boundary</code>로 한 섹션만 격리.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='📡'
          title='Sentry 연동'
          hook='프로덕션 에러 수집'
        >
          <p>
            stack trace + 사용자 context + 세션 리플레이. 에러 발생 순간
            사용자가 뭘 봤는지 재현 가능.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🏷'
          title='Network vs Logic 에러'
          hook='원인별로 분기 처리'
        >
          <p>
            커스텀 Error 클래스 (NetworkError · ValidationError · AuthError)로
            분류 → 사용자 메시지·재시도 로직 차별화.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='💌'
          title='사용자 친화적 메시지'
          hook='다음 행동을 안내'
        >
          <p>
            &quot;무엇&quot; + &quot;지금 뭘 하면 되는지&quot;. 기술 용어·stack
            trace는 개발 환경에서만.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='🔁'
          title='Retry 전략'
          hook='지수 백오프 + 최대 횟수'
        >
          <p>
            네트워크 오류는 재시도 가치. 멱등성 없는 POST는 조심. TanStack
            Query는 기본 retry 3회 · exponential.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🛟'
          title='Fallback UI 패턴'
          hook='복구 가능한 디자인'
        >
          <p>
            사실 전달 + 다음 행동(다시 시도 · 홈으로 · 고객센터) + 개발자
            정보(dev only).
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
