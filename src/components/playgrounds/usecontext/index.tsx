import GoalViz from './GoalViz'
import ThemeTree from './ThemeTree'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseContextPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              깊은 트리까지 값을 내려보는 통로
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              Provider 아래 3단 깊이의 자식까지 테마가 내려가는 걸 확인. value
              useMemo 토글로 리렌더 범위가 어떻게 바뀌는지도 함께.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🌲'
        title='ThemeTree — Provider · 구독 · 리렌더'
        description='Context Provider + 깊은 자식 + useMemo로 value 안정화. 구독자와 비구독자의 리렌더 횟수 차이까지 한눈에.'
      >
        <ThemeTree />
      </PlaygroundSection>
    </div>
  )
}
