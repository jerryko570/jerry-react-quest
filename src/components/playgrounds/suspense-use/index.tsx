import GoalViz from './GoalViz'
import SuspenseLab from './SuspenseLab'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function SuspenseUsePlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              로딩을 &quot;컴포넌트가 아니라 경계&quot;에서
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              두 Promise가 각자 속도로 풀려. 중첩 Suspense 토글을 눌러가며
              스켈레톤이 조각조각 교체되는지, 한꺼번에 나타나는지를 비교해봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🪜'
        title='Suspense 중첩 vs 하나의 boundary'
        description='React 19 use hook + 두 속도의 Promise. 같은 데이터를 중첩 Suspense로 조각내 보여줄 때와 한 boundary로 묶을 때 UX 차이를 몸으로.'
      >
        <SuspenseLab />
      </PlaygroundSection>
    </div>
  )
}
