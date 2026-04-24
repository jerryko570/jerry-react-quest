import GoalViz from './GoalViz'
import MotionLab from './MotionLab'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function FramerMotionPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              CSS로 맛보고 Motion 코드로 제대로
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              번들 추가 없이 CSS만으로 4가지
              패턴(마운트/드래그/variants/스크롤)을 흉내 냈어. 각 데모 아래 실전
              Framer Motion 코드가 있으니 비교해봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🎭'
        title='4가지 모션 패턴 체험'
        description='AnimatePresence · Drag · Variants · Scroll — CSS 기반 mock + 실전 motion 코드.'
      >
        <MotionLab />
      </PlaygroundSection>
    </div>
  )
}
