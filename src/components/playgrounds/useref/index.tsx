import FocusDemo from './FocusDemo'
import GoalViz from './GoalViz'
import PreviousDemo from './PreviousDemo'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseRefPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              ref는 &quot;리렌더 없이&quot;가 매력
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              첫 놀이기구에서 DOM에 직접 닿는 경험, 두 번째에서 렌더와 무관한 값
              저장소로서의 쓰임을 확인하자.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🎯'
        title='DOM 직접 조작 (포커스 · 스크롤)'
        description='input에 포커스, 컨테이너 스크롤을 ref로 직접. state 없이도 리액트가 DOM을 넘겨준다.'
      >
        <FocusDemo />
      </PlaygroundSection>

      <PlaygroundSection
        index='B'
        emoji='🕓'
        title='usePrevious — 이전 값 추적'
        description='useRef + useEffect 조합으로 "한 박자 늦게" 갱신되는 저장소. 렌더와 무관한 값 저장소로서의 ref.'
      >
        <PreviousDemo />
      </PlaygroundSection>
    </div>
  )
}
