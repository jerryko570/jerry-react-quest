import BatchUpdate from './BatchUpdate'
import GoalViz from './GoalViz'
import StaleClosure from './StaleClosure'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseStatePlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              값 기반 vs 함수형 업데이트, 직접 실수해보자
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              두 놀이기구 다 &quot;왜 내 count가 이상하지?&quot; 를 재현하는
              실험이야. 빨간 버튼부터 먼저 눌러서 망가뜨려봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='📦'
        title='Batch 업데이트 실험'
        description='같은 이벤트 안에서 setState를 3번 연속 호출. 값 기반이면 +1만, 함수형이면 +3. React의 batching을 눈으로 확인.'
      >
        <BatchUpdate />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='⏳'
        title='Stale Closure 트랩'
        description='setTimeout 안의 state는 버튼 누른 순간에 얼어붙는다. 3초 기다리는 동안 count를 바꿔보고, 결과가 어느 시점 값인지 비교.'
      >
        <StaleClosure />
      </PlaygroundSection>
    </div>
  )
}
