import { ReactNode } from 'react'

export default function DesignSystemGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          재사용이 핵심. 일관성은 자동으로 따라온다.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🎨'
          title='Design Tokens 설계'
          hook='색·타이포·간격의 단일 진실 원천'
        >
          <p>
            Tailwind v4의 <code>@theme</code>나 CSS 변수로 토큰을 한 곳에.
            컴포넌트는 값을 직접 쓰지 않고 토큰 이름만 참조.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='🧩'
          title='Compound Component 패턴'
          hook='부모 상태 + 자식 레이아웃 자유'
        >
          <p>
            Context로 상태를 숨기고, 자식들은 조립식 API를 제공. props 폭발 없이
            유연성 확보.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🧠'
          title='Headless UI'
          hook='Radix·Ark UI — 로직만 빌림'
        >
          <p>
            포커스 트랩·ARIA·키보드 네비처럼 &quot;어려운 정답&quot;만
            라이브러리가 제공. 스타일은 내 디자인 시스템으로.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🎛️'
          title='CVA로 Variants 관리'
          hook='타입 안전한 variant 조합'
        >
          <p>
            variant와 size를 타입으로 강제. 오타·불법 조합 불가.
            tailwind-merge와 함께 쓰면 클래스 충돌도 해결.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='📖'
          title='Storybook 구축'
          hook='컴포넌트 카탈로그 + 소통 창구'
        >
          <p>
            모든 variant·state를 한 화면에 시각화. 디자이너·QA·개발자가 같은
            뷰를 본다. visual regression (Chromatic) · a11y addon까지.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🌗'
          title='Theme 전략'
          hook='CSS 변수 + class 토글'
        >
          <p>
            라이트·다크는 CSS 변수로 선언하고 <code>.dark</code> 클래스로
            스위치. SSR FOUC 방지는 <code>next-themes</code>가 표준.
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
