import GoalViz from './GoalViz'
import RenderFlow from './RenderFlow'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function RenderingPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>일단 부모 버튼부터 눌러봐</div>
            <p className='mt-1 text-sm text-gray-700'>
              아래 놀이기구에서 부모 리렌더 버튼을 연타한 뒤, React.memo 토글을
              켰다 껐다 해봐. 자식 카드의 숫자가 어떻게 바뀌는지가 오늘의 관찰
              포인트야.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🎢'
        title='리렌더 전파 시각화'
        description='부모 리렌더가 자식에게 어떻게 번지는지 자식 카드의 "내가 그려진 횟수"로 확인. React.memo를 켜면 전염이 끊긴다.'
      >
        <RenderFlow />
      </PlaygroundSection>
    </div>
  )
}
