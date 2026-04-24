import AccessibilityLab from './AccessibilityLab'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function A11yPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>키보드로만 움직여봐</div>
            <p className='mt-1 text-sm text-gray-700'>
              마우스 옆으로 치우고 Tab·Enter·ESC로만 버튼·모달·폼을 조작. 어디가
              잘 작동하고 어디가 막히는지가 곧 접근성 체크리스트야.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='♿'
        title='키보드 · ARIA · focus trap 4가지 데모'
        description='ARIA live region · focus trap 모달 · useId label-input · focus-visible 스타일.'
      >
        <AccessibilityLab />
      </PlaygroundSection>
    </div>
  )
}
