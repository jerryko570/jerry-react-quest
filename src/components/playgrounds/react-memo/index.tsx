import GoalViz from './GoalViz'
import MemoShallow from './MemoShallow'
import PlaygroundSection from '@/components/stages/PlaygroundSection'

export default function ReactMemoPlayground() {
  return (
    <div className='flex flex-col gap-12'>
      <div className='rounded-2xl bg-linear-to-br from-[#fff5f4] to-[#ffe8e3] p-5'>
        <div className='flex items-start gap-3'>
          <span className='text-3xl'>🎮</span>
          <div>
            <div className='font-extrabold'>
              세 자식 모두 memo. 카운트는 왜 달라지나?
            </div>
            <p className='mt-1 text-sm text-gray-700'>
              부모 리렌더 버튼을 연타하고 세 자식의 렌더 횟수를 비교해봐. 얕은
              비교의 규칙이 한눈에 들어올 거야.
            </p>
          </div>
        </div>
      </div>

      <GoalViz />

      <div className='border-t border-gray-200' />

      <PlaygroundSection
        index='A'
        emoji='🛡️'
        title='얕은 비교 시각화 — primitive · 새 객체 · 고정 객체'
        description='같은 memo 자식이지만 받는 props 성격이 다름. 어떤 경우에 memo가 진짜 스킵하고 어떤 경우 무력해지는지 확인.'
      >
        <MemoShallow />
      </PlaygroundSection>
    </div>
  )
}
