import CompilerDemo from './CompilerDemo'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function ReactCompilerPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>useMemo는 과거형이 되어간다</div>
            <p className='mt-1 text-sm text-gray-700'>
              React 19부터 안정화된 Compiler가 수동 메모이제이션의 90%를 대체해.
              시나리오 4개를 Before/After로 훑고, 여전히 수동이 필요한 순간이
              언제인지 감 잡아보자.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🤖'
        title='Compiler Before/After 카드 넘기기'
        description='useMemo · useCallback · 인라인 객체 · 자동화 한계 4가지 시나리오. 버튼 눌러 같은 문제를 두 방식으로 바라보기.'
      >
        <CompilerDemo />
      </PlaygroundSection>
    </div>
  )
}
