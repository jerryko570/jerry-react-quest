import { ReactNode } from 'react'

export default function ReactCompilerGoalViz() {
  return (
    <section>
      <header className='mb-4'>
        <h3 className='text-lg font-extrabold'>🎯 학습 목표 — 풀어서 보기</h3>
        <p className='text-sm text-gray-500'>
          Compiler를 이해하면 오히려 memo 3종 세트가 언제 불필요한지가 선명해짐.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        <GoalCard
          index='1'
          emoji='🤖'
          title='Compiler가 자동화하는 것'
          hook='빌드 시점에 useMemo·useCallback·React.memo 상당 부분을 주입'
        >
          <p>React Compiler는 빌드 타임에 코드를 분석해서:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>🎯 비싼 계산을 자동으로 메모이즈</li>
            <li>🎯 인라인 객체·배열·함수를 참조 안정화</li>
            <li>🎯 자식 컴포넌트의 불필요한 리렌더 방지</li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            기존에 수동으로 감싸던 90% 이상이 자동화 대상.
          </p>
        </GoalCard>

        <GoalCard
          index='2'
          emoji='🧑‍🔬'
          title='수동이 여전히 필요한 순간'
          hook='Compiler가 분석 못 하는 동적 코드'
        >
          <p>Compiler는 정적 분석이라 한계가 있어.</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>❌ 외부 함수·라이브러리로 감싼 값 (불투명)</li>
            <li>❌ 런타임에 결정되는 함수 변형</li>
            <li>❌ React의 규칙 위반 (hooks of hooks, 조건부 훅 등)</li>
          </ul>
          <p className='mt-3 text-[12px] text-gray-500'>
            👉 이럴 땐 기존처럼 수동 useMemo/useCallback. 개발자 판단 필요.
          </p>
        </GoalCard>

        <GoalCard
          index='3'
          emoji='🔌'
          title='eslint-plugin-react-compiler'
          hook='컴파일러가 포기한 코드에 경고'
        >
          <p>
            <code>eslint-plugin-react-compiler</code>는 Compiler가 메모이즈 못
            한 파일에 경고를 띄워.
          </p>
          <p className='mt-2'>
            이 경고가 뜨면 &quot;이 부분은 Compiler가 못 도와줄 테니 수동으로
            최적화할지, 코드 구조를 바꿀지 결정&quot;하는 신호야.
          </p>
          <pre className='mt-3 rounded-lg bg-gray-50 p-3 font-mono text-[11px] whitespace-pre-wrap text-gray-700'>
            {`// package.json
"eslint-plugin-react-compiler": "^19.x"

// eslint.config
rules: {
  "react-compiler/react-compiler": "error"
}`}
          </pre>
        </GoalCard>

        <GoalCard
          index='4'
          emoji='📜'
          title='3종 세트와의 새로운 관계'
          hook='문법은 그대로, 용도는 좁아짐'
        >
          <p>Compiler를 쓰는 프로젝트에서 3종 세트의 역할:</p>
          <ul className='mt-2 space-y-1 text-[13px]'>
            <li>
              🧙‍♂️ <code>useMemo</code> → 여전히 유용하지만 대부분 생략 가능
            </li>
            <li>
              🎯 <code>useCallback</code> → 특수 경우만 (외부 라이브러리 deps
              등)
            </li>
            <li>
              🛡️ <code>React.memo</code> → 큰 리스트·차트 같은 자산은 명시적으로
              유지
            </li>
          </ul>
          <p className='mt-3 rounded-lg bg-amber-50 p-2 text-[12px] text-amber-900'>
            ⚠️ Compiler를 &quot;안 쓴다&quot;는 전제의 튜토리얼·회사 코드도
            여전히 많음. 두 방식 모두 읽을 줄 알아야 함.
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
