import { ReactNode } from 'react'

export default function AppRouterGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          Next.js App Router의 4가지 기초.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🖥️'
          title='Server vs Client 컴포넌트'
          hook='기본은 서버, 상호작용만 클라'
        >
          <p>
            App Router 파일의 <b>기본</b>은 Server Component. DB · 환경변수 ·
            비밀값을 바로 쓸 수 있고, 클라이언트 번들에 안 들어가.
          </p>
          <p className='mt-2'>
            <code>useState</code>·<code>onClick</code>·브라우저 API가 필요하면
            그 파일만 <code>&quot;use client&quot;</code>로 꺼내.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🚪'
          title="'use client' 경계 설정"
          hook='지시어는 파일 단위, 전염되듯 퍼진다'
        >
          <p>
            <code>&quot;use client&quot;</code>가 붙은 파일에서 import한
            파일들도 자동으로 클라 번들에 포함돼. 경계는{' '}
            <b>가능한 안쪽(leaf)에</b> 둬.
          </p>
          <p className='mt-2 text-[12px] text-gray-500'>
            💡 규칙: 서버 컴포넌트는 클라 컴포넌트를 props로 넘길 수 있지만, 그
            반대는 안 됨 (children으로는 가능).
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📨'
          title='Server Actions'
          hook='form이 곧 서버 함수 호출'
        >
          <p>
            <code>&quot;use server&quot;</code> 지시어로 만든 함수를 form의{' '}
            <code>action</code>에 연결. JS 없이도 submit 되고 있으면 더
            부드럽게.
          </p>
          <p className='mt-2 text-[12px] text-gray-500'>
            React 19 Actions(useActionState/useOptimistic/useFormStatus)와 짝.
          </p>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🗄️'
          title='캐싱 전략 (fetch + revalidate)'
          hook='기본 캐시 · revalidate · tags · no-store'
        >
          <p>
            Server Component의 <code>fetch</code>는 기본이 캐시 대상.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              ⏱ <code>{`{ next: { revalidate: 60 } }`}</code> 시간 기반
            </li>
            <li>
              🏷 <code>{`{ next: { tags: ['posts'] } }`}</code> +{' '}
              <code>revalidateTag</code>
            </li>
            <li>
              🔥 <code>{`{ cache: 'no-store' }`}</code> 매 요청마다 새로
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
