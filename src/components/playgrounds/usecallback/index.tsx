import CallbackTrap from './CallbackTrap'
import GoalViz from './GoalViz'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function UseCallbackPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              memo 자식에 콜백 넘길 때 같이 온다
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              좌우 자식 모두 memo야. 어느 쪽이 리렌더를 먹고 어느 쪽이
              스킵하는지, 🎲 부모 리렌더 버튼을 연타하며 카운트 차이를 직접
              느껴봐.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🪞'
        title='Fresh vs Stable 콜백 참조 비교'
        description='같은 memo 자식 2개. 한 쪽엔 매 렌더마다 새 함수, 한 쪽엔 useCallback으로 고정. 카운트가 갈라지는 걸 눈으로 확인.'
      >
        <CallbackTrap />
      </PlaygroundSection>
    </div>
  )
}
