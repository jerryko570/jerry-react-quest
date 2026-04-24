import { ReactNode } from 'react'

export default function A11yGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          &quot;나만 쓸 수 있는 UI&quot;는 완성이 아니야.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🧠'
          title='ARIA 기본 원리'
          hook='semantic HTML이 1순위, ARIA는 보조'
        >
          <p>
            &quot;No ARIA is better than bad ARIA&quot;. 가장 좋은 접근성은{' '}
            <code>button</code>, <code>label</code>, <code>nav</code> 같은
            정직한 HTML. ARIA는 네이티브로 표현 불가능한
            상태(expanded/selected/live)에만.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='⌨️'
          title='키보드 네비게이션'
          hook='마우스 없이도 모든 것을 할 수 있어야'
        >
          <p>
            Tab/Shift+Tab 순서가 시각 순서와 일치, Enter/Space로 활성화, ESC로
            모달 닫기. 모달 열면 <b>focus trap</b>으로 바깥으로 못 나가게.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🪪'
          title='useId로 label-input 연결'
          hook='서버·클라 공통 unique id'
        >
          <p>
            React 18+ 기본 훅. SSR 환경에서도 충돌 없는 id 생성. label의
            <code>htmlFor</code>와 input의 <code>id</code>를 맞추고,
            <code>aria-describedby</code>로 도움말을 묶어.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🔍'
          title='스크린 리더 테스트'
          hook='개발자가 한 번쯤은 실제로 써봐야 함'
        >
          <ul className='space-y-1 text-[13px]'>
            <li>
              🍎 macOS: <b>VoiceOver</b> (Cmd+F5)
            </li>
            <li>
              🪟 Windows: <b>NVDA</b> (무료)
            </li>
            <li>🧪 axe-core · Lighthouse로 자동 감지 병행</li>
          </ul>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='✨'
          title='focus-visible'
          hook='키보드만 ring, 마우스는 조용히'
        >
          <p>
            <code>:focus-visible</code>은 브라우저가 &quot;키보드로 포커스가
            왔다&quot; 판단한 경우만 매칭. 마우스 클릭 때 ring이 사라지지 않아
            깔끔.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='🎯'
          title='Skip to content 링크'
          hook='네비게이션을 건너뛰는 "첫 링크"'
        >
          <p>
            페이지 맨 앞에 숨겨진 링크. Tab 한 번으로 나타나서, 네비 메뉴를
            건너뛰고 본문으로 바로 점프.
          </p>
          <pre className='mt-2 rounded-lg bg-gray-50 p-2 font-mono text-[10px] whitespace-pre-wrap text-gray-700'>
            {`<a href='#main'
   className='sr-only focus:not-sr-only'>
  본문 바로가기
</a>
<main id='main'>...</main>`}
          </pre>
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
