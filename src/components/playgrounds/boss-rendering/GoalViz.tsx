import { ReactNode } from 'react'

export default function BossRenderingGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          실전 디버깅은 &quot;측정 → 가설 → 수정 → 재측정&quot; 루프.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🔬'
          title='React DevTools Profiler'
          hook='어떤 컴포넌트가 왜 리렌더됐나'
        >
          <p>
            크롬 확장 <b>React DevTools</b>의 Profiler 탭에서{' '}
            <code>Record</code>를 누르고 문제 상황을 재현하면 각 컴포넌트의 렌더
            시간과 이유를 트리로 봐.
          </p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🎯 commit별 플레임 그래프 → 느린 구간 찾기</li>
            <li>🎯 리렌더 이유 (props 변경 · 부모 리렌더 · hook 변경)</li>
            <li>🎯 &quot;Why did this render?&quot; 체크박스</li>
          </ul>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🚦'
          title='Lighthouse'
          hook='프로덕션 체감 점수'
        >
          <p>
            크롬 DevTools의 <b>Lighthouse</b> 탭으로 Performance·Best
            Practices·SEO·Accessibility 점수를 확인. 모바일·데스크탑 두 시나리오
            모두 측정 가능.
          </p>
          <p className='mt-2 text-[12px] text-gray-500'>
            💡 70점 미만은 사용자가 체감할 정도. 90점 이상이 권장.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='📊'
          title='Web Vitals'
          hook='사용자가 느끼는 3가지 속도 지표'
        >
          <p>Google이 정의한 핵심 3지표:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              <b>LCP</b> (Largest Contentful Paint): 가장 큰 콘텐츠 렌더 시간.
              &lt; 2.5s 권장
            </li>
            <li>
              <b>INP</b> (Interaction to Next Paint, FID 후계): 상호작용 응답
              속도. &lt; 200ms
            </li>
            <li>
              <b>CLS</b> (Cumulative Layout Shift): 레이아웃이 튀는 정도. &lt;
              0.1
            </li>
          </ul>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='🛠️'
          title='디버깅 워크플로우'
          hook='감으로 고치지 말고 측정 루프'
        >
          <p>성능 버그는 감이 아니라 데이터로 고쳐.</p>
          <ol className='mt-2 list-decimal space-y-1 pl-5 text-[13px]'>
            <li>
              <b>재현</b> — 느린 순간을 확실히 만들기 (Profiler 녹화)
            </li>
            <li>
              <b>진단</b> — 어떤 컴포넌트/훅이 문제인지
            </li>
            <li>
              <b>가설</b> — memo · useMemo · 리스트 분할 · virtualization?
            </li>
            <li>
              <b>수정</b> — 한 번에 하나씩
            </li>
            <li>
              <b>재측정</b> — 정말 좋아졌는지 숫자로 확인
            </li>
          </ol>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 놀이기구의 &quot;미션&quot; 버튼을 이 순서대로 눌러봐.
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
