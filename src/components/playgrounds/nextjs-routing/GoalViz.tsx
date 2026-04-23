import { ReactNode } from 'react'

export default function NextjsRoutingGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>폴더 이름이 곧 라우팅 문법.</p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🧩'
          title='Dynamic Routes'
          hook='[id] 폴더가 파라미터'
        >
          <p>
            <code>[id]</code>는 한 세그먼트, <code>[...slug]</code>는 여러
            세그먼트, <code>[[...optional]]</code>은 없을 수도.
            <code>generateStaticParams</code>로 빌드 타임 정적 생성.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='📁'
          title='Route Groups'
          hook='(folder) — URL 숨김'
        >
          <p>
            <code>(marketing)</code>처럼 괄호로 감싼 폴더는 URL에 안 나타남.
            서로 다른 layout을 적용하거나 파일 묶기 용도.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🔀'
          title='Parallel Routes'
          hook='@slot — 여러 영역 동시'
        >
          <p>
            <code>@team</code>·<code>@analytics</code> 같은 슬롯이 layout의
            prop으로 주입돼. 대시보드처럼 영역별 독립 로딩이 필요할 때.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🪟'
          title='Intercepting'
          hook='(..) — 경로 가로채기'
        >
          <p>
            인스타처럼 썸네일 클릭 시 모달로 열리고 새로고침하면 전체 페이지로
            열리는 UX를 한 트릭으로 구현.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='🎨'
          title='Loading·Error·NotFound UI'
          hook='파일 이름만 맞추면 자동'
        >
          <p>
            <code>loading.tsx</code>·<code>error.tsx</code>·
            <code>not-found.tsx</code>는 약속된 파일명. 각 라우트 폴더 안에 두면
            Suspense·ErrorBoundary로 자동 래핑.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🚦'
          title='Middleware'
          hook='라우트 도달 전 실행'
        >
          <p>
            <code>middleware.ts</code>는 Edge 런타임에서 모든 요청 전 먼저 실행.
            리다이렉트 · 헤더 추가 · i18n · 인증 가드에.
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
