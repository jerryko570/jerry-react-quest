import { ReactNode } from 'react'

export default function TestingGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          &quot;사용자가 하는 대로&quot; 테스트하자.
        </p>
      </header>
      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🧭'
          title='RTL의 철학'
          hook='구현이 아니라 사용자가 보는 것을 테스트'
        >
          <p>
            클래스명·state 이름·내부 구조가 아니라 &quot;버튼 클릭하면 숫자가
            증가&quot; 처럼 사용자 관점의 결과를 검증. 리팩토링해도 테스트가
            살아남.
          </p>
        </GoalCard>
        <GoalCard
          index='2'
          emoji='🔎'
          title='쿼리 우선순위'
          hook='role → label → text → testid'
        >
          <p>
            접근성과도 일치. <code>getByRole(&apos;button&apos;)</code>이 최고.
            <code>getByTestId</code>는 마지막 수단.
          </p>
        </GoalCard>
        <GoalCard
          index='3'
          emoji='🎣'
          title='renderHook'
          hook='훅만 고립해서 테스트'
        >
          <p>
            UI 없이 훅의 반환값·상태 변화만 검증. 타이머가 있으면{' '}
            <code>vi.useFakeTimers()</code>로 시간 제어.
          </p>
        </GoalCard>
        <GoalCard
          index='4'
          emoji='🎭'
          title='MSW로 네트워크 모킹'
          hook='테스트 환경에서 fetch 가로채기'
        >
          <p>
            서비스 워커 같은 계층에서 실제 네트워크 레벨로 응답을 가짜로. 서비스
            코드는 수정 없이 테스트 통과.
          </p>
        </GoalCard>
        <GoalCard
          index='5'
          emoji='♿'
          title='접근성 친화적 테스트'
          hook='role 기반 쿼리가 곧 접근성 점검'
        >
          <p>
            <code>getByRole</code>이 잘 작동하면 스크린 리더도 그 요소를
            인식한다는 뜻. 테스트 작성 과정에서 접근성 부실이 드러남.
          </p>
        </GoalCard>
        <GoalCard
          index='6'
          emoji='📊'
          title='Coverage는 관찰 지표'
          hook='100% 추구는 독이 될 수 있음'
        >
          <p>
            중요한 로직과 엣지 케이스를 테스트했는지가 본질. 숫자 맞추려고 쓰는
            의미 없는 테스트는 유지 비용이 크고 버그 못 잡음.
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
